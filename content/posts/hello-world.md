---
title: "Hello World - 博客搭建记录"
date: "2025-01-01"
tags: ["Next.js", "博客", "技术"]
summary: "记录这个个人博客的搭建过程，技术选型和部署方案。"
---

# Hello World

欢迎来到我的个人博客！这是第一篇文章，记录一下博客的搭建过程。

## 技术栈

本博客使用以下技术构建：

- **Next.js 16** — App Router + Server Components
- **Tailwind CSS** — 原子化 CSS，快速构建 UI
- **MDX** — 支持在 Markdown 中嵌入 React 组件
- **gray-matter** — 解析文章 Front Matter
- **Vercel** — 自动部署和 CDN

## 内容来源

### 原创文章

存放在 `content/posts/` 目录，使用 Markdown 格式编写。

### CSDN 同步

通过 `scripts/sync-csdn.js` 脚本定期从 CSDN 抓取文章，存放于 `content/csdn/`。

```bash
node scripts/sync-csdn.js your_csdn_username
```

## GitHub 集成

首页和项目页会通过 GitHub API 自动展示：

- 个人信息（头像、Bio、统计数据）
- 公开仓库列表，按 Star 数排列

配置方式：在 `.env.local` 中设置：

```env
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_token
```

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 自动部署完成！

希望这个博客能帮助我记录和分享技术。
