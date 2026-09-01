import type { Metadata } from "next";
import {
  ArrowUpRight,
  Download,
  FileArchive,
  FileText,
  FolderOpen,
  Presentation,
  Shapes,
  Sparkles,
} from "lucide-react";
import { getDemoCollections, type DemoAccent, type ResourceKind } from "@/lib/demo-collections";

export const metadata: Metadata = {
  title: "演示资料",
  description: "页面设计演示、演讲资料与 Agent Skill 实践资源。",
};

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

export default function DemosPage() {
  const collections = getDemoCollections();
  const demoCount = collections.reduce((total, collection) => total + collection.demos.length, 0);
  const resourceCount = collections.reduce((total, collection) => total + collection.resources.length, 0);

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-950 px-6 py-12 text-white shadow-2xl shadow-zinc-950/10 sm:px-10 sm:py-16 dark:border-zinc-800">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Demo archive · {collections.length} collections
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            每个文件夹，
            <span className="text-emerald-300">都是一间展厅。</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            资料按主题文件夹持续扩展。现在收录 {demoCount} 个在线案例和 {resourceCount} 份配套资料。
          </p>
        </div>
      </section>

      {collections.length > 1 && (
        <nav className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="资料文件夹">
          {collections.map((collection, index) => (
            <a
              key={collection.slug}
              href={`#${collection.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <FolderOpen className="h-4 w-4" />
              {String(index + 1).padStart(2, "0")} · {collection.title}
            </a>
          ))}
        </nav>
      )}

      {collections.map((collection, collectionIndex) => (
        <section
          id={collection.slug}
          key={collection.slug}
          className="mt-16 scroll-mt-24 border-t border-zinc-200 pt-10 first:border-t-0 first:pt-0 dark:border-zinc-800"
        >
          <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">
                Collection {String(collectionIndex + 1).padStart(2, "0")} · {collection.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{collection.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {collection.description}
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              {collection.demos.length} DEMOS / {collection.resources.length} FILES
            </div>
          </div>

          {collection.demos.length > 0 && (
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
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {demo.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-300 dark:text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
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
          )}

          {collection.resources.length > 0 && (
            <div className="mt-8 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
              {collection.resources.map((resource) => {
                const Icon = resourceIcons[resource.kind];
                return (
                  <a
                    key={resource.href}
                    href={resource.href}
                    download
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-zinc-900 dark:text-white">{resource.title}</span>
                      <span className="mt-0.5 block text-xs text-zinc-400">{resource.detail}</span>
                    </span>
                    <Download className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-emerald-500" />
                  </a>
                );
              })}
            </div>
          )}
        </section>
      ))}

      {collections.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <FolderOpen className="mx-auto h-8 w-8 text-zinc-300" />
          <p className="mt-4 font-medium">还没有资料文件夹</p>
        </div>
      )}
    </div>
  );
}
