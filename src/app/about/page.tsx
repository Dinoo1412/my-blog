import { getGitHubUser } from "@/lib/github";
import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, Cloud, Code2, GitBranch, Radio } from "lucide-react";

export const metadata: Metadata = { title: "关于" };

export default async function AboutPage() {
  const user = await getGitHubUser();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-white/85 p-7 shadow-xl shadow-blue-900/5 backdrop-blur dark:border-blue-900/70 dark:bg-[#0a1d38]/85 sm:p-10">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-100/80 to-transparent dark:from-blue-900/30" />
        <p className="relative font-mono text-xs font-bold tracking-[0.22em] text-blue-600 uppercase dark:text-blue-400">About this space</p>
        <h1 className="relative mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">关于我，也关于这个博客</h1>
      </header>

      {user && (
        <div className="mb-10 flex flex-col items-start gap-5 rounded-2xl bg-[#071b3a] p-6 text-white shadow-xl shadow-blue-950/15 sm:flex-row sm:items-center sm:p-8">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={80}
            height={80}
            className="rounded-2xl border-4 border-blue-300/30 shadow-xl"
          />
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-sky-300 uppercase">Developer profile</p>
            <h2 className="mt-1 text-2xl font-black">{user.name}</h2>
            <p className="text-blue-100/60">@{user.login}</p>
            {user.bio && <p className="mt-2 text-blue-100/75">{user.bio}</p>}
          </div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/15 sm:ml-auto">
            <GitBranch className="h-4 w-4" /> GitHub
          </a>
        </div>
      )}

      <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">你好！我是 Dino，一名热爱编程的开发者。这里记录技术学习历程，也保存代码、文章和项目从想法走向结果的过程。</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <InfoCard icon={BookOpen} title="内容档案" items={["原创技术文章与实践记录", "CSDN 历史文章同步", "项目演示与学习资料分享"]} />
        <InfoCard icon={Code2} title="技术栈" items={["Next.js 16 + Tailwind CSS", "Markdown / MDX 内容体系", "TypeScript 静态导出"]} />
        <InfoCard icon={Cloud} title="部署与自动化" items={["Cloudflare Workers 全球部署", "GitHub Actions 自动检查", "CSDN 定时同步工作流"]} />
        <InfoCard icon={Radio} title="保持联系" items={["通过 GitHub 查看最新代码", "在文章与项目中持续更新", "欢迎交流技术与产品实践"]} />
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items }: { icon: typeof BookOpen; title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 dark:border-blue-900/70 dark:bg-[#0a1d38]/80">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Icon className="h-5 w-5" /></span>
      <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-white">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />{item}</li>)}
      </ul>
    </section>
  );
}
