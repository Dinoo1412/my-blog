import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileArchive,
  FileText,
  Presentation,
  Shapes,
  Sparkles,
} from "lucide-react";
import {
  getDemoCollection,
  getDemoCollections,
  type DemoAccent,
  type ResourceKind,
} from "@/lib/demo-collections";

const accentClasses: Record<DemoAccent, string> = {
  amber: "from-amber-300 to-yellow-600",
  blue: "from-cyan-400 to-blue-600",
  cyan: "from-teal-400 to-cyan-700",
  emerald: "from-emerald-400 to-teal-600",
  lime: "from-lime-400 to-emerald-600",
  orange: "from-orange-400 to-rose-500",
  zinc: "from-zinc-400 to-zinc-700",
};

const resourceIcons: Record<ResourceKind, typeof FileText> = {
  archive: FileArchive,
  document: FileText,
  presentation: Presentation,
  skill: Shapes,
};

export function generateStaticParams() {
  return getDemoCollections().map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getDemoCollection(slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description };
}

export default async function DemoCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getDemoCollection(slug);
  if (!collection) notFound();

  return (
    <div className="pb-10">
      <Link
        href="/demos"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        返回项目分享集合
      </Link>

      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-950 px-6 py-12 text-white shadow-2xl shadow-zinc-950/10 sm:px-10 sm:py-16 dark:border-zinc-800">
        <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses[collection.accent]} opacity-15`} />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[44px] border-white/5" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            {collection.eyebrow}
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">{collection.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">{collection.description}</p>
          <div className="mt-7 flex gap-5 font-mono text-xs text-zinc-400">
            <span>{collection.demos.length} DEMOS</span>
            <span>{collection.resources.length} FILES</span>
          </div>
        </div>
      </section>

      {collection.demos.length > 0 && (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">Live demos</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">在线页面演示</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {collection.demos.map((demo, index) => (
              <a
                key={demo.href}
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentClasses[demo.accent]}`} />
                <div className="mb-8 flex items-start justify-between">
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{demo.label}</span>
                  <span className="font-mono text-xs text-zinc-300 dark:text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{demo.title}</h3>
                <p className="mt-1 text-sm font-medium text-zinc-500">{demo.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{demo.description}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  打开演示
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {collection.resources.length > 0 && (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">Resources</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">项目资料下载</h2>
          </div>
          <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {collection.resources.map((resource) => {
              const Icon = resourceIcons[resource.kind];
              return (
                <a key={resource.href} href={resource.href} download className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/70">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-zinc-900 dark:text-white">{resource.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-400">{resource.detail}</span>
                  </span>
                  <Download className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-emerald-500" />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
