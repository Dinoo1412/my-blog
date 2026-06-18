import Link from "next/link";
import { Post } from "@/lib/posts";
import { Calendar, Clock, ExternalLink } from "lucide-react";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
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
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {post.title}
        </h2>
      </Link>

      <p className="mb-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
        {post.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-400"
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
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-indigo-500"
          >
            原文 <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}
