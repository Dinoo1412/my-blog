import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "文章" };

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-white/80 px-6 py-10 shadow-xl shadow-blue-900/5 backdrop-blur dark:border-blue-900/70 dark:bg-[#0a1d38]/80 sm:px-10">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-200/45 blur-3xl dark:bg-blue-700/20" />
        <p className="relative font-mono text-xs font-bold tracking-[0.22em] text-blue-600 uppercase dark:text-blue-400">Writing archive</p>
        <h1 className="relative mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">文章与思考</h1>
        <p className="relative mt-4 max-w-xl text-slate-500 dark:text-slate-400">共 {allPosts.length} 篇，收录原创技术记录与 CSDN 历史文章。</p>
      </header>
      <BlogList posts={allPosts} tags={tags} />
    </div>
  );
}
