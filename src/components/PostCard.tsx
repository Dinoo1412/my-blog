import Link from "next/link";
import { Post } from "@/lib/posts";
import { Calendar, Clock, ExternalLink } from "lucide-react";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/85 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/8 dark:border-blue-900/70 dark:bg-[#0a1d38]/85">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
        <Calendar className="h-3.5 w-3.5" />
        <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
        <span>·</span>
        <Clock className="h-3.5 w-3.5" />
        <span>{post.readingTime}</span>
        {post.source === "csdn" && (
          <>
            <span>·</span>
            <span className="rounded bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400">
              CSDN
            </span>
          </>
        )}
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="mb-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {post.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
        {post.csdnUrl && (
          <a
            href={post.csdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600"
          >
            原文 <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}
