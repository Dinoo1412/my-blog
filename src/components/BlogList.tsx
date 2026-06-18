"use client";

import { useState, useMemo } from "react";
import { Post } from "@/lib/posts";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
  tags: string[];
}

export default function BlogList({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (activeSource && p.source !== activeSource) return false;
      return true;
    });
  }, [posts, activeTag, activeSource]);

  const btnClass = (active: boolean, color = "indigo") =>
    `rounded-full px-3 py-1 text-sm font-medium cursor-pointer transition-colors ${
      active
        ? color === "red"
          ? "bg-red-600 text-white"
          : "bg-indigo-600 text-white"
        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
    }`;

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setActiveTag(null); setActiveSource(null); }}
          className={btnClass(!activeTag && !activeSource)}
        >
          全部
        </button>
        <button
          onClick={() => { setActiveSource("local"); setActiveTag(null); }}
          className={btnClass(activeSource === "local")}
        >
          原创
        </button>
        <button
          onClick={() => { setActiveSource("csdn"); setActiveTag(null); }}
          className={btnClass(activeSource === "csdn", "red")}
        >
          CSDN
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => { setActiveTag(tag); setActiveSource(null); }}
            className={btnClass(activeTag === tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-400">暂无文章</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
