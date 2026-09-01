import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, FileText, FolderOpen, Sparkles } from "lucide-react";
import { getDemoCollections, type DemoAccent } from "@/lib/demo-collections";

export const metadata: Metadata = {
  title: "项目分享",
  description: "设计实践、技术实验和项目交付资料的分享集合。",
};

const accentClasses: Record<DemoAccent, string> = {
  amber: "from-amber-300 via-orange-400 to-yellow-600",
  blue: "from-cyan-400 via-blue-500 to-indigo-700",
  cyan: "from-teal-300 via-cyan-500 to-blue-700",
  emerald: "from-emerald-300 via-emerald-500 to-teal-700",
  lime: "from-lime-300 via-green-500 to-emerald-700",
  orange: "from-orange-300 via-orange-500 to-rose-600",
  zinc: "from-zinc-300 via-zinc-500 to-zinc-800",
};

export default function DemosPage() {
  const collections = getDemoCollections();
  const demoCount = collections.reduce((total, collection) => total + collection.demos.length, 0);

  return (
    <div className="pb-10">
      <section className="relative overflow-hidden border-b border-zinc-200 pb-12 pt-5 dark:border-zinc-800 sm:pb-16 sm:pt-10">
        <div className="absolute right-0 top-0 font-mono text-[7rem] font-black leading-none text-zinc-100 dark:text-zinc-900 sm:text-[11rem]">
          {String(collections.length).padStart(2, "0")}
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-emerald-600 uppercase dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Project showcase
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-7xl">
            项目分享<span className="text-emerald-500">集合</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500 dark:text-zinc-400 sm:text-lg">
            每个文件夹对应一个独立项目。进入子页面查看设计成果、技术实验、演示文稿与完整交付资料。
          </p>
          <div className="mt-7 flex gap-6 font-mono text-xs text-zinc-400">
            <span>{collections.length} PROJECTS</span>
            <span>{demoCount} LIVE DEMOS</span>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid gap-5 md:grid-cols-2">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/demos/${collection.slug}`}
              className="group relative min-h-80 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-950/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-zinc-950/15 dark:border-zinc-800 sm:p-9"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses[collection.accent]} opacity-20 transition duration-500 group-hover:opacity-30`} />
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-white/5 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-zinc-300 uppercase backdrop-blur">
                    <FolderOpen className="h-3.5 w-3.5" />
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <div className="mt-auto pt-16">
                  <p className="text-xs font-semibold tracking-[0.18em] text-emerald-300 uppercase">
                    {collection.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{collection.title}</h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300">{collection.description}</p>
                  <div className="mt-7 flex gap-5 border-t border-white/10 pt-5 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Boxes className="h-3.5 w-3.5" />
                      {collection.demos.length} 个在线案例
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      {collection.resources.length} 份资料
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <FolderOpen className="mx-auto h-8 w-8 text-zinc-300" />
            <p className="mt-4 font-medium">还没有项目分享</p>
          </div>
        )}
      </section>
    </div>
  );
}
