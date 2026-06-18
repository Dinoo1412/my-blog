import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "文章" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; source?: string }>;
}) {
  const params = await searchParams;
  const allPosts = await getAllPosts();
  const tags = getAllTags();

  const filtered = allPosts.filter((p) => {
    if (params.tag && !p.tags.includes(params.tag)) return false;
    if (params.source && p.source !== params.source) return false;
    return true;
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">文章</h1>
      <p className="mb-6 text-zinc-500">共 {allPosts.length} 篇，包含本地原创和 CSDN 同步文章</p>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/blog"
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            !params.tag && !params.source
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          全部
        </a>
        <a
          href="/blog?source=local"
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            params.source === "local"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          原创
        </a>
        <a
          href="/blog?source=csdn"
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            params.source === "csdn"
              ? "bg-red-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          CSDN
        </a>
        {tags.map((tag) => (
          <a
            key={tag}
            href={`/blog?tag=${tag}`}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              params.tag === tag
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            #{tag}
          </a>
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
    </div>
  );
}
