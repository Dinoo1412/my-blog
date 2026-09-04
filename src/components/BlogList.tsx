"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import Reveal from "./Reveal";

export default function BlogList({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const filtered = useMemo(() => posts.filter((post) => (!activeTag || post.tags.includes(activeTag)) && (!activeSource || post.source === activeSource)), [posts, activeTag, activeSource]);
  const choose = (tag: string | null, source: string | null) => { setActiveTag(tag); setActiveSource(source); };
  const title = activeTag ? `#${activeTag}` : activeSource === "csdn" ? "CSDN 同步" : activeSource === "local" ? "原创文章" : "全部文章";
  const itemClass = (active: boolean) => `flex min-h-11 w-full items-center justify-between border-b border-stone-300 text-left text-sm transition-colors dark:border-stone-700 ${active ? "font-medium text-[#526b78]" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-100"}`;

  return (
    <div className="py-4 md:grid md:grid-cols-[12rem_1fr] md:gap-x-12 lg:gap-x-16">
      <aside className="mb-10 md:mb-0">
        <div className="md:sticky md:top-12">
          <div className="border-t-4 border-[#788b99] pt-5">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#6f8189]">VOL. 02 / ARCHIVE</p>
            <div className="mt-5 flex items-end gap-3"><strong className="font-editorial text-6xl font-semibold text-[#35434a] dark:text-stone-100">{String(posts.length).padStart(2, "0")}</strong><span className="pb-2 text-xs text-stone-500">篇手记</span></div>
          </div>
          <div className="mt-10">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#6f8189]"><Filter className="h-3.5 w-3.5" />目录筛选</div>
            <div className="grid grid-cols-3 gap-x-4 md:block"><button onClick={() => choose(null, null)} className={itemClass(!activeTag && !activeSource)}><span>全部</span><span>{posts.length}</span></button><button onClick={() => choose(null, "local")} className={itemClass(activeSource === "local")}><span>原创</span><span>{posts.filter((p) => p.source === "local").length}</span></button><button onClick={() => choose(null, "csdn")} className={itemClass(activeSource === "csdn")}><span>CSDN</span><span>{posts.filter((p) => p.source === "csdn").length}</span></button></div>
            <div className="mt-7 hidden md:block">{tags.slice(0, 8).map((tag) => <button key={tag} onClick={() => choose(tag, null)} className={itemClass(activeTag === tag)}><span className="truncate">#{tag}</span></button>)}</div>
          </div>
        </div>
      </aside>

      <div>
        <header className="hero-copy relative min-h-60 border-t border-stone-300 pb-12 pt-5 dark:border-stone-700">
          <span className="absolute right-0 top-0 font-mono text-[8rem] leading-none text-[#788b99]/8 sm:text-[11rem]">02</span>
          <p className="text-sm text-[#637986] dark:text-[#aebdc5]">文章归档</p>
          <h1 className="font-editorial mt-4 text-5xl font-semibold tracking-tight text-stone-800 dark:text-stone-100 sm:text-7xl">技术记录与思考</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400">原创内容与从 CSDN 同步的历史文章，按时间持续整理。</p>
        </header>
        <section>
          <div className="mb-2 flex items-center justify-between border-b-2 border-stone-700 pb-4 dark:border-stone-300"><span className="font-editorial text-2xl text-stone-800 dark:text-stone-100">{title}</span><span className="font-mono text-xs text-stone-400">{String(filtered.length).padStart(2, "0")} ENTRIES</span></div>
          {filtered.length === 0 ? <p className="py-20 text-center text-stone-500">当前分类还没有文章</p> : <div key={`${activeTag}-${activeSource}`} className="divide-y divide-stone-300 dark:divide-stone-700">{filtered.map((post, index) => <Reveal key={post.slug} delay={Math.min(index, 5) * 55}><PostCard post={post} /></Reveal>)}</div>}
        </section>
      </div>
    </div>
  );
}
