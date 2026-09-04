import { getGitHubUser } from "@/lib/github";
import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, Cloud, Code2, GitBranch, Radio } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "关于" };

export default async function AboutPage() {
  const user = await getGitHubUser();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="hero-copy relative mb-14 grid gap-8 border-y border-stone-300 py-12 sm:grid-cols-[1fr_auto] sm:items-end dark:border-stone-700">
        <div><p className="text-sm font-medium text-[#637986] dark:text-[#aebdc5]">人物档案 / 01</p><h1 className="font-editorial mt-4 max-w-2xl text-5xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl">我和这个持续更新的小站</h1></div>
        <p className="max-w-52 text-sm leading-6 text-stone-500">记录学习轨迹，也记录一个项目如何慢慢长成。</p>
      </header>

      {user && (
        <div className="article-heading mb-14 grid gap-7 sm:grid-cols-[12rem_1fr]">
          <div className="relative"><span className="absolute -left-3 -top-3 h-full w-full border border-[#788b99]" />
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={192}
            height={192}
            className="relative aspect-square w-full object-cover grayscale-[20%]"
          /></div>
          <div className="border-t-2 border-stone-700 pt-6 dark:border-stone-300">
            <span className="font-mono text-[10px] text-stone-400">AUTHOR / DEVELOPER</span><h2 className="font-editorial mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{user.name}</h2>
            <p className="text-slate-500">@{user.login}</p>
            {user.bio && <p className="mt-2 text-slate-600 dark:text-slate-400">{user.bio}</p>}
          </div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#788b99] text-sm font-medium text-stone-700 dark:text-stone-300">
            <GitBranch className="h-4 w-4" /> GitHub
          </a>
        </div>
      )}

      <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">你好！我是 Jay，一名热爱编程的开发者。这里记录技术学习历程，也保存代码、文章和项目从想法走向结果的过程。</p>

      <Reveal><div className="about-grid grid border-y border-stone-300 sm:grid-cols-2 dark:border-stone-700">
        <InfoCard icon={BookOpen} title="内容档案" items={["原创技术文章与实践记录", "CSDN 历史文章同步", "项目演示与学习资料分享"]} />
        <InfoCard icon={Code2} title="技术栈" items={["Next.js 16 + Tailwind CSS", "Markdown / MDX 内容体系", "TypeScript 静态导出"]} />
        <InfoCard icon={Cloud} title="部署与自动化" items={["Cloudflare Workers 全球部署", "GitHub Actions 自动检查", "CSDN 定时同步工作流"]} />
        <InfoCard icon={Radio} title="保持联系" items={["通过 GitHub 查看最新代码", "在文章与项目中持续更新", "欢迎交流技术与产品实践"]} />
      </div></Reveal>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items }: { icon: typeof BookOpen; title: string; items: string[] }) {
  return (
    <section className="border-b border-stone-300 p-6 odd:sm:border-r dark:border-stone-700">
      <span className="text-[#637986] dark:text-[#aebdc5]"><Icon className="h-5 w-5" /></span>
      <h2 className="font-editorial mt-5 text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#788b99]" />{item}</li>)}
      </ul>
    </section>
  );
}
