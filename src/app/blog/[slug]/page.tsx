import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Calendar, Clock, ExternalLink, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl rounded-[2rem] border border-blue-100 bg-white/85 px-5 py-7 shadow-xl shadow-blue-900/5 backdrop-blur dark:border-blue-900/70 dark:bg-[#0a1d38]/85 sm:px-10 sm:py-10">
      {/* Back */}
      <Link href="/blog" className="mb-7 inline-flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-blue-600">
        ← 返回文章列表
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600 dark:bg-blue-950 dark:text-blue-300"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
          {post.source === "csdn" && (
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400">
              CSDN 同步
            </span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 border-b border-blue-100 pb-7 text-sm text-slate-400 dark:border-blue-900/60">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readingTime}
          </span>
          {post.csdnUrl && (
            <a
              href={post.csdnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              查看 CSDN 原文 <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-a:text-blue-600 prose-code:before:content-none prose-code:after:content-none prose-img:rounded-2xl prose-img:border prose-img:border-blue-100 prose-img:shadow-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
          components={{
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={typeof src === "string" ? src : undefined}
                alt={alt || ""}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ),
            a: ({ href, children, ...props }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
