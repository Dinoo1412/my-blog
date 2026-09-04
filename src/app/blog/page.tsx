import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "文章" };

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const tags = getAllTags();

  return <BlogList posts={allPosts} tags={tags} />;
}
