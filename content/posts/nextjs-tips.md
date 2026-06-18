---
title: "Next.js App Router 实用技巧"
date: "2025-02-15"
tags: ["Next.js", "React", "前端"]
summary: "整理 Next.js App Router 模式下的常用技巧，包括数据获取、缓存策略、Server Components 使用方法。"
---

# Next.js App Router 实用技巧

## Server Components vs Client Components

App Router 中默认所有组件都是 Server Components，只有需要交互（useState、useEffect、事件处理）时才加 `"use client"`。

```tsx
// Server Component（默认）
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  return <div>{/* ... */}</div>;
}

// Client Component
"use client";
import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## 数据获取与缓存

```tsx
// 静态数据（构建时缓存）
const data = await fetch(url, { cache: "force-cache" });

// 动态数据（每次请求）
const data = await fetch(url, { cache: "no-store" });

// ISR（增量静态再生）
const data = await fetch(url, { next: { revalidate: 3600 } }); // 1小时刷新
```

## 并行数据获取

```tsx
// ✅ 并行请求，性能更好
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);

// ❌ 串行请求，慢
const user = await fetchUser();
const posts = await fetchPosts();
```

## generateStaticParams

```tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
```

这样 Next.js 会在构建时预渲染所有文章页面。
