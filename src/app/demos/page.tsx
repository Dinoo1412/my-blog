import type { Metadata } from "next";
import {
  ArrowUpRight,
  Download,
  FileArchive,
  FileText,
  Presentation,
  Shapes,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "演示资料",
  description: "页面设计演示、演讲资料与 Agent Skill 实践资源。",
};

const demos = [
  {
    title: "Pulse",
    subtitle: "专注，从第一秒开始",
    description: "带有编辑感排版与产品叙事节奏的专注设备首页。",
    href: "/demo-materials/pulse-product-home.html",
    accent: "from-orange-400 to-rose-500",
    label: "产品首页",
  },
  {
    title: "DataLens",
    subtitle: "一站式数据分析平台",
    description: "围绕数据洞察、指标与转化路径构建的 SaaS 落地页。",
    href: "/demo-materials/datalens-product-home.html",
    accent: "from-cyan-400 to-blue-600",
    label: "数据产品",
  },
  {
    title: "曲尺 AI · 轻量版",
    subtitle: "开放平台产品首页",
    description: "基于自定义设计系统完成的紧凑型 AI 平台首页。",
    href: "/demo-materials/quchiai-simple-product-home.html",
    accent: "from-emerald-400 to-teal-600",
    label: "设计系统",
  },
  {
    title: "墨痕 Inktrace",
    subtitle: "使用通用 Frontend Skill",
    description: "展示通用设计技能如何塑造更鲜明的写作产品气质。",
    href: "/demo-materials/examples/general-skill-inktrace.html",
    accent: "from-amber-300 to-yellow-600",
    label: "通用 Skill",
  },
  {
    title: "曲尺 AI · 完整版",
    subtitle: "使用自定义 Design System Skill",
    description: "按品牌令牌、组件和布局规范生成的完整产品页面。",
    href: "/demo-materials/examples/custom-skill-quchiai.html",
    accent: "from-lime-400 to-emerald-600",
    label: "自定义 Skill",
  },
  {
    title: "FlowNote",
    subtitle: "未使用设计 Skill",
    description: "作为对照组，观察无专用设计约束时的页面表现。",
    href: "/demo-materials/examples/without-skill-flownote.html",
    accent: "from-zinc-400 to-zinc-700",
    label: "对照实验",
  },
  {
    title: "曲尺 AI · 页面样例",
    subtitle: "产品首页交付版本",
    description: "可独立打开和演示的曲尺 AI 产品首页成果。",
    href: "/demo-materials/examples/quchiai-product-homepage.html",
    accent: "from-teal-400 to-cyan-700",
    label: "交付样例",
  },
];

const resources = [
  {
    title: "演示文稿",
    detail: "PowerPoint · 4.5 MB",
    href: "/demo-materials/downloads/demo-slides.pptx",
    icon: Presentation,
  },
  {
    title: "演讲逐字稿",
    detail: "Word 文档",
    href: "/demo-materials/downloads/speech-script.docx",
    icon: FileText,
  },
  {
    title: "逐字稿 Markdown",
    detail: "Markdown 文档",
    href: "/demo-materials/downloads/speech-script.md",
    icon: FileText,
  },
  {
    title: "Skill 资源汇总",
    detail: "工具与资源索引",
    href: "/demo-materials/downloads/skill-resources.md",
    icon: Shapes,
  },
  {
    title: "完整演示资料包",
    detail: "ZIP · 含全部原始文件",
    href: "/demo-materials/downloads/demo-materials.zip",
    icon: FileArchive,
  },
];

export default function DemosPage() {
  return (
    <div className="pb-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-950 px-6 py-12 text-white shadow-2xl shadow-zinc-950/10 sm:px-10 sm:py-16 dark:border-zinc-800">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Demo archive · 2026
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            设计不是描述，
            <span className="text-emerald-300">是可以打开的结果。</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            收录产品首页、Skill 对照实验、演示文稿与逐字稿。在线查看页面结果，或下载完整资料继续研究。
          </p>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">
              Live demos
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">在线页面演示</h2>
          </div>
          <span className="font-mono text-sm text-zinc-400">07 CASES</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {demos.map((demo, index) => (
            <a
              key={demo.href}
              href={demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${demo.accent}`} />
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
      </section>

      <section className="mt-16">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">
            Resources
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">演示资料下载</h2>
        </div>

        <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {resources.map((resource) => {
            const Icon = resource.icon;
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
      </section>
    </div>
  );
}
