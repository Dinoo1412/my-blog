import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "文章" };

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">文章</h1>
      <p className="mb-6 text-zinc-500">
        共 {allPosts.length} 篇，包含本地原创和 CSDN 同步文章
      </p>
      <BlogList posts={allPosts} tags={tags} />
    </div>
  );
}
