import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, FileText, FolderOpen } from "lucide-react";
import { getDemoCollections, type DemoAccent } from "@/lib/demo-collections";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "项目分享", description: "设计实践、技术实验和项目交付资料的分享集合。" };

const accents: Record<DemoAccent, string> = {
  amber: "bg-[#9b8f7c]", blue: "bg-[#788b99]", cyan: "bg-[#789399]", emerald: "bg-[#879589]", lime: "bg-[#98a08a]", orange: "bg-[#aa7f6f]", zinc: "bg-[#747b7c]",
};

export default function DemosPage() {
  const collections = getDemoCollections();
  const demoCount = collections.reduce((total, collection) => total + collection.demos.length, 0);
  return (
    <div className="pb-10">
      <header className="hero-copy relative overflow-hidden bg-[#35434a] px-6 py-12 text-white sm:px-10 sm:py-16 [clip-path:polygon(0_0,96%_0,100%_12%,100%_100%,0_100%)]">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-2xl"><p className="text-sm font-medium text-[#bcc8ce]">项目分享</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">不是截图，是可以打开的项目。</h1><p className="mt-5 max-w-xl leading-7 text-stone-300">设计成果、技术实验、演示页面和交付资料都按项目独立整理。</p></div>
          <div className="flex gap-6 text-sm text-slate-400"><span><strong className="block text-3xl font-semibold text-white">{collections.length}</strong>个项目</span><span><strong className="block text-3xl font-semibold text-white">{demoCount}</strong>个演示</span></div>
        </div>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {collections.map((collection, index) => (
          <Reveal key={collection.slug} delay={index * 90} className={index === 0 ? "md:col-span-2" : ""}><Link href={`/demos/${collection.slug}`} className={`folder-sheet group mt-3 block p-7 transition duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_#d9ded8] dark:hover:shadow-[10px_10px_0_#35403f] sm:p-8 ${index === 0 ? "md:grid md:grid-cols-[1fr_1fr] md:gap-12" : ""}`}>
            <span className={`absolute inset-x-0 top-0 h-1 ${accents[collection.accent]}`} />
            <div className="flex items-start justify-between"><span className="font-mono text-sm text-slate-400">{String(index + 1).padStart(2, "0")}</span><ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-[#637986]" /></div>
            <p className="mt-10 text-xs font-medium tracking-wider text-[#637986] uppercase dark:text-[#aebdc5]">{collection.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{collection.title}</h2>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{collection.description}</p>
            <div className="mt-7 flex gap-5 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800"><span className="flex items-center gap-1.5"><Boxes className="h-3.5 w-3.5" />{collection.demos.length} 个在线案例</span><span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{collection.resources.length} 份资料</span></div>
          </Link></Reveal>
        ))}
      </section>
      {collections.length === 0 && <div className="mt-10 border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><FolderOpen className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-4 font-medium">还没有项目分享</p></div>}
    </div>
  );
}
