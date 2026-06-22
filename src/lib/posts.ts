import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const CSDN_DIR = path.join(process.cwd(), "content/csdn");

/** 将任意字符串转为纯 ASCII 安全 slug，避免静态托管平台对 Unicode 路径处理不一致导致 404 */
function toAsciiSlug(raw: string): string {
  const ascii = raw
    .split("")
    .map((ch) => (/[a-zA-Z0-9]/.test(ch) ? ch : "-"))
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  if (/^[\x00-\x7F]+$/.test(raw)) return ascii || raw;

  const hash = crypto.createHash("md5").update(raw).digest("hex").slice(0, 8);
  return ascii ? `${ascii}-${hash}` : hash;
}

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

    const rawSlug = source === "csdn" ? `csdn-${slug}` : slug;

    return {
      slug: toAsciiSlug(rawSlug),
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
