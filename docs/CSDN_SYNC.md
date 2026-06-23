# CSDN 文章同步操作文档

本文档说明本项目如何将 CSDN 博客文章同步为站内 Markdown 文章，包括手动同步、自动同步、原理说明与常见问题排查。

## 1. 原理概述

同步脚本位于 [`scripts/sync-csdn.js`](../scripts/sync-csdn.js)，工作流程：

1. 请求 `https://blog.csdn.net/<用户名>/article/list/<页码>`，用 `cheerio` 解析文章列表（标题、链接、发布日期）。
2. 逐篇请求文章详情页，提取正文 HTML，并做以下转换：
   - 代码块 `<pre><code>` → Markdown 三个反引号代码块（尽量保留语言标识）
   - 标题 `<h1>~<h6>` → Markdown `#` 标题
   - 链接 `<a>` → `[文字](链接)`
   - 图片 `<img>` → `![alt](src)`
3. 根据标题生成文件名（中文文件名直接保留），写入 `content/csdn/<标题>.md`，并附带 frontmatter：

   ```yaml
   ---
   title: "文章标题"
   date: "2026-01-01"
   tags: ["标签1", "标签2"]
   csdnUrl: "https://blog.csdn.net/xxx/article/details/xxx"
   source: csdn
   ---
   ```

4. **已存在同名文件的文章会被跳过**，因此重复运行脚本不会产生重复内容，只会拉取新文章。
5. 站内页面读取 `content/csdn/` 下的所有 `.md` 文件，在 [`src/lib/posts.ts`](../src/lib/posts.ts) 中统一解析展示，slug 使用 `toAsciiSlug()` 转换为纯 ASCII + hash，避免中文路径在静态托管平台上出现 404。

## 2. 手动同步（本地）

```bash
cd my-blog
node scripts/sync-csdn.js <CSDN用户名>
# 例如：
node scripts/sync-csdn.js weixin_63110324
```

运行后会在终端看到每篇文章的处理结果：

- `✓ 已保存: xxx.md` — 新文章，已写入 `content/csdn/`
- `⏭ 已存在，跳过: xxx.md` — 已同步过，跳过

同步完成后，检查变更并提交：

```bash
git status content/csdn          # 查看是否有新文件
git add content/csdn
git commit -m "chore: sync new CSDN article"
git push origin dev              # 推送到 dev 分支

git checkout main
git merge dev
git push origin main             # 合并到 main，触发 Cloudflare 自动部署
```

> 注意：脚本每篇文章间隔 2 秒（`DELAY_MS`），避免请求过快被 CSDN 限流/封禁，请勿随意调小。

## 3. 自动同步（GitHub Actions）

配置文件：[`.github/workflows/sync-csdn.yml`](../.github/workflows/sync-csdn.yml)

- **定时触发**：每年 1 月 1 日、7 月 1 日 00:00 UTC（约半年一次），对应 cron `0 0 1 1,7 *`
- **手动触发**：在 GitHub 仓库页面 → Actions → "Sync CSDN Articles" → "Run workflow"，可随时手动跑一次同步，无需等到下一个定时周期
- 触发后会自动执行：
  1. checkout `main` 分支
  2. 安装依赖、运行 `node scripts/sync-csdn.js weixin_63110324`
  3. 若 `content/csdn` 有新增/变更文件，自动 `git commit` + `git push` 到 `main`
  4. push 到 `main` 会被 Cloudflare 自动检测并重新构建部署

如需更改默认抓取的 CSDN 用户名，可在仓库 Settings → Secrets and variables → Actions → Variables 中添加变量 `CSDN_USERNAME`，工作流会优先使用该变量（见 workflow 中 `${{ vars.CSDN_USERNAME || 'weixin_63110324' }}`）。

### 手动触发步骤（GitHub 网页操作）

1. 打开仓库页面 → 顶部 "Actions" 标签
2. 左侧选择 "Sync CSDN Articles"
3. 右侧点击 "Run workflow" 按钮 → 选择分支 `main` → 点击绿色 "Run workflow"
4. 等待运行完成（通常 1~3 分钟，取决于文章数量），若有新文章会自动提交到 `main` 并触发部署

## 4. 新写了 CSDN 文章后如何同步到博客

两种方式任选：

- **被动等待**：每半年的自动同步周期会抓到（最长等待约 6 个月）
- **主动触发**：在 GitHub Actions 页面手动 "Run workflow"，几分钟内即可同步上线，无需本地操作

## 5. 已知限制与排查

| 问题 | 原因 | 处理方式 |
|---|---|---|
| 文章正文图片加载不出来 | CSDN 图片 CDN（`i-blog.csdnimg.cn`）对外部 Referer 做防盗链拦截 | 已在 [`src/app/blog/[slug]/page.tsx`](../src/app/blog/[slug]/page.tsx) 给所有 `<img>` 设置 `referrerPolicy="no-referrer"` 绕过，个别文章仍可能因 CSDN 额外校验而失败，只能跳转原文查看 |
| 文章日期解析失败 | CSDN 详情页日期文本格式不固定（可能含"于"等修饰字）| 脚本用正则提取 `\d{4}-\d{2}-\d{2}`，解析失败时回退为当前日期 |
| 中文标题导致博客详情页 404 | 静态托管平台的资源索引按磁盘文件名匹配，Unicode/编码后的路径和浏览器请求路径不一致 | `posts.ts` 中 `toAsciiSlug()` 把所有 slug 转成纯 ASCII（字母数字+8位 hash），彻底规避编码问题 |
| 抓取被 CSDN 限流/封禁 | 请求过于频繁 | 已设置 2 秒请求间隔（`DELAY_MS`），不要改小；如频繁失败可适当调大 |
| 重复同步产生重复文章 | 不会发生 | 脚本按标题生成的文件名已存在时会直接跳过，详见脚本 `saveMarkdown()` 函数 |
