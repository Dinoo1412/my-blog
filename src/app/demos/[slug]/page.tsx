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
} from "lucide-react";
import {
  getDemoCollection,
  getDemoCollections,
  type DemoAccent,
  type ResourceKind,
} from "@/lib/demo-collections";
import Reveal from "@/components/Reveal";

const accentClasses: Record<DemoAccent, string> = {
  amber: "from-[#b2a58f] to-[#897b69]",
  blue: "from-[#aab8c0] to-[#6f8491]",
  cyan: "from-[#9fb5b6] to-[#6d898c]",
  emerald: "from-[#a9b3a7] to-[#748577]",
  lime: "from-[#b4b99f] to-[#899275]",
  orange: "from-[#c2a092] to-[#986f61]",
  zinc: "from-[#a6aaaa] to-[#687071]",
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
        className="mb-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#637986] dark:hover:text-[#aebdc5]"
      >
        <ArrowLeft className="h-4 w-4" />
        返回项目分享集合
      </Link>

      <section className="article-heading page-intro relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 [clip-path:polygon(0_0,97%_0,100%_16%,100%_100%,0_100%)]">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentClasses[collection.accent]}`} />
        <div className="relative max-w-2xl">
          <p className="text-sm font-medium text-[#637986] dark:text-[#aebdc5]">{collection.eyebrow}</p>
          <h1 className="font-editorial mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{collection.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">{collection.description}</p>
          <div className="mt-7 flex gap-5 text-sm text-slate-500">
            <span>{collection.demos.length} 个演示</span>
            <span>{collection.resources.length} 份资料</span>
          </div>
        </div>
      </section>

      {collection.demos.length > 0 && (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-sm font-medium text-[#637986] dark:text-[#aebdc5]">在线演示</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">查看项目页面</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {collection.demos.map((demo, index) => (
              <Reveal key={demo.href} delay={index * 80}><a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="folder-sheet group mt-3 p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#d9ded8] dark:hover:shadow-[8px_8px_0_#35403f]"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentClasses[demo.accent]}`} />
                <div className="mb-8 flex items-start justify-between">
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{demo.label}</span>
                  <span className="font-mono text-xs text-zinc-300 dark:text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{demo.title}</h3>
                <p className="mt-1 text-sm font-medium text-zinc-500">{demo.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{demo.description}</p>
                <div className="mt-6 flex min-h-11 items-center gap-1 text-sm font-medium text-[#637986] dark:text-[#aebdc5]">
                  打开演示
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a></Reveal>
            ))}
          </div>
        </section>
      )}

      {collection.resources.length > 0 && (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-sm font-medium text-[#637986] dark:text-[#aebdc5]">项目资料</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">下载相关文件</h2>
          </div>
          <div className="surface-card divide-y divide-slate-200 overflow-hidden dark:divide-slate-800">
            {collection.resources.map((resource, index) => {
              const Icon = resourceIcons[resource.kind];
              return (
                <Reveal key={resource.href} delay={Math.min(index, 7) * 45}><a href={resource.href} download className="group flex min-h-16 items-center gap-4 px-5 py-4 transition-colors hover:bg-[#e2e6e3] dark:hover:bg-[#35403f]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#dfe3e1] text-[#637986] dark:bg-[#3a4443] dark:text-[#aebdc5]"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-zinc-900 dark:text-white">{resource.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-400">{resource.detail}</span>
                  </span>
                  <Download className="h-4 w-4 text-stone-300 transition-colors group-hover:text-[#637986]" />
                </a></Reveal>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
