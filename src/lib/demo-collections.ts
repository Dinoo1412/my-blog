import fs from "fs";
import path from "path";

const COLLECTIONS_DIR = path.join(process.cwd(), "public", "demo-materials", "collections");

export type DemoAccent = "amber" | "blue" | "cyan" | "emerald" | "lime" | "orange" | "zinc";
export type ResourceKind = "archive" | "document" | "presentation" | "skill";

export interface DemoItem {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  label: string;
  accent: DemoAccent;
}

export interface DemoResource {
  title: string;
  detail: string;
  href: string;
  kind: ResourceKind;
}

export interface DemoCollection {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  accent: DemoAccent;
  order: number;
  demos: DemoItem[];
  resources: DemoResource[];
}

interface CollectionFile extends Omit<DemoCollection, "slug" | "demos" | "resources"> {
  version: number;
  demos?: Array<Omit<DemoItem, "href"> & { file: string }>;
  resources?: Array<Omit<DemoResource, "href"> & { file: string }>;
}

function assertSafeRelativePath(file: string, manifestPath: string) {
  if (!file || path.isAbsolute(file) || file.split(/[\\/]/).includes("..")) {
    throw new Error(`Invalid resource path "${file}" in ${manifestPath}`);
  }
}

function publicHref(slug: string, file: string, manifestPath: string) {
  assertSafeRelativePath(file, manifestPath);
  const assetPath = path.join(COLLECTIONS_DIR, slug, file);
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Missing demo resource "${file}" referenced by ${manifestPath}`);
  }
  return `/demo-materials/collections/${slug}/${file.replace(/\\/g, "/")}`;
}

function readCollection(slug: string): DemoCollection | null {
  const manifestPath = path.join(COLLECTIONS_DIR, slug, "collection.json");
  if (!fs.existsSync(manifestPath)) return null;

  const data = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as CollectionFile;
  if (data.version !== 1 || !data.title || !data.description) {
    throw new Error(`Invalid demo collection manifest: ${manifestPath}`);
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    eyebrow: data.eyebrow || "Demo collection",
    accent: data.accent || "emerald",
    order: data.order ?? 100,
    demos: (data.demos || []).map(({ file, ...demo }) => ({ ...demo, href: publicHref(slug, file, manifestPath) })),
    resources: (data.resources || []).map(({ file, ...resource }) => ({
      ...resource,
      href: publicHref(slug, file, manifestPath),
    })),
  };
}

export function getDemoCollections(): DemoCollection[] {
  if (!fs.existsSync(COLLECTIONS_DIR)) return [];

  return fs
    .readdirSync(COLLECTIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readCollection(entry.name))
    .filter((collection): collection is DemoCollection => Boolean(collection))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "zh-CN"));
}

export function getDemoCollection(slug: string): DemoCollection | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return readCollection(slug);
}
