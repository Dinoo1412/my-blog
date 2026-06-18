import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const CSDN_DIR = path.join(process.cwd(), "content/csdn");

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  source: "local" | "csdn";
  readingTime: string;
  csdnUrl?: string;
  content: string;
}

function readPostsFromDir(dir: string, source: "local" | "csdn"): Post[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: source === "csdn" ? `csdn-${slug}` : slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      summary: data.summary || data.description || content.slice(0, 120).replace(/[#*`]/g, "") + "...",
      tags: data.tags || [],
      source,
      readingTime: stats.text,
      csdnUrl: data.csdnUrl,
      content,
    };
  });
}

export function getAllPosts(): Post[] {
  const local = readPostsFromDir(POSTS_DIR, "local");
  const csdn = readPostsFromDir(CSDN_DIR, "csdn");
  return [...local, ...csdn].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags);
  return [...new Set(tags)];
}
