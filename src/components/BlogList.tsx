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

  const btnClass = (active: boolean, color = "blue") =>
    `cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all ${
      active
        ? color === "red"
          ? "border-red-500 bg-red-500 text-white shadow-md shadow-red-500/15"
          : "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/15"
        : "border-blue-100 bg-white/80 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-slate-300"
    }`;

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-blue-100 bg-white/65 p-3 backdrop-blur dark:border-blue-900/60 dark:bg-blue-950/20">
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
        <p className="rounded-2xl border border-dashed border-blue-200 bg-white/50 p-12 text-center text-slate-400">暂无文章</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
