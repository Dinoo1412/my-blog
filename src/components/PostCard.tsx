import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Post } from "@/lib/posts";

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={`group relative overflow-hidden p-6 transition-colors ${featured ? "rounded-[1.5rem] bg-[#788b99] text-white shadow-lg shadow-[#35434a]/10 md:row-span-2" : "border-b border-stone-300 before:absolute before:inset-y-5 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-[#788b99] before:transition-transform hover:before:scale-y-100 dark:border-stone-700"}`}>
      <div className={`flex items-center gap-2 text-xs ${featured ? "text-white/75" : "text-slate-500"}`}><time>{new Date(post.date).toLocaleDateString("zh-CN")}</time><span>·</span><span>{post.readingTime}</span>{post.source === "csdn" && <span className="ml-auto">CSDN</span>}</div>
      <Link href={`/blog/${post.slug}`} className="mt-8 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#788b99]">
        <h2 className={`font-semibold leading-snug ${featured ? "text-2xl text-white sm:text-3xl" : "text-xl text-stone-800 group-hover:text-[#637986] dark:text-stone-100"}`}>{post.title}</h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-6 ${featured ? "text-white/75" : "text-slate-600 dark:text-slate-400"}`}>{post.summary}</p>
        <span className={`mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium ${featured ? "text-white" : "text-[#637986] dark:text-[#aebdc5]"}`}>阅读全文 <ArrowRight className="h-4 w-4" /></span>
      </Link>
      {!featured && post.csdnUrl && <a href={post.csdnUrl} target="_blank" rel="noopener noreferrer" aria-label="查看 CSDN 原文" className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center text-stone-400 hover:text-[#637986]"><ArrowUpRight className="h-4 w-4" /></a>}
    </article>
  );
}
