# Jay's Blog

个人技术博客，同步 GitHub 项目展示与 CSDN 文章，部署于 Cloudflare Workers。

## 技术栈

- **Next.js 16** — App Router + 静态导出（Static Export）
- **Tailwind CSS v4** — 样式
- **gray-matter** — 解析 Markdown Front Matter
- **react-markdown** — 渲染文章正文
- **Cloudflare Workers** — 托管部署，国内可访问

## 项目结构

```
├── content/
│   ├── posts/          # 原创文章（Markdown）
│   └── csdn/           # CSDN 同步文章（脚本自动生成）
├── scripts/
│   └── sync-csdn.js    # CSDN 爬虫同步脚本
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # UI 组件
│   └── lib/            # 工具函数（posts、github API）
└── wrangler.toml       # Cloudflare Workers 配置
```

## 分支策略

| 分支 | 用途 |
|------|------|
| `main` | 生产分支，推送后自动触发 Cloudflare 部署 |
| `dev` | 日常开发分支，功能完成后合并到 main |
| `feature/*` | 新功能开发，从 dev 切出，完成后合并回 dev |

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 环境变量

在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_GITHUB_USERNAME=Dinoo1412
GITHUB_TOKEN=your_github_token   # 可选，提高 API 频率限制
```

## 同步 CSDN 文章

```bash
npm run sync:csdn -- 你的CSDN用户名
```

脚本会将文章抓取后保存到 `content/csdn/`，然后正常提交推送即可上线。

## 部署

推送到 `main` 分支后，Cloudflare Workers 自动构建并部署。

构建命令：`npm run build`  
输出目录：`out`（静态导出）

## 写新文章

在 `content/posts/` 新建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2025-01-01"
tags: ["标签1", "标签2"]
summary: "文章摘要"
---

正文内容...
```

推送到 `main` 后自动上线。
