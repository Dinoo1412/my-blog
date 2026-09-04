import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import RepoCard from "@/components/RepoCard";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "项目" };

export default async function ProjectsPage() {
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos(30)]);

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

  return (
    <div>
      <header className="hero-copy relative mb-10 overflow-hidden border-y border-stone-300 py-12 dark:border-stone-700">
        <span className="absolute right-0 top-2 font-mono text-[7rem] leading-none text-[#788b99]/10 sm:text-[10rem]">GIT</span>
        <p className="font-mono text-sm text-[#637986] dark:text-[#aebdc5]">github.com/Dinoo1412</p>
        <h1 className="font-editorial mt-5 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">代码仓库</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
          共 {repos.length} 个仓库，按 Star 数排列{languages.length > 0 && `，涉及 ${languages.join("、")} 等语言`}。
        </p>
      </header>

      {/* GitHub profile summary */}
      {user && (
        <div className="article-heading mb-12 grid gap-6 bg-[#35434a] p-6 text-stone-100 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={64}
            height={64}
            className="rounded-2xl ring-4 ring-white/10"
          />
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#aebdc5]"><Terminal className="h-3.5 w-3.5" />REMOTE ORIGIN</div><h2 className="font-editorial mt-2 text-xl font-semibold">{user.name}</h2><p className="text-sm text-stone-400">@{user.login} · {user.public_repos} 个公开仓库 · {user.followers} 位关注者</p>
            {user.bio && <p className="mt-1 text-sm text-stone-400">{user.bio}</p>}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-4 text-sm font-medium text-white transition hover:bg-white/10 sm:ml-auto"
          >
            <GitBranch className="h-4 w-4" /> 查看 GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {repos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-zinc-400 dark:border-zinc-700">
          <p>未配置 GitHub 用户名，请在 .env.local 中设置 NEXT_PUBLIC_GITHUB_USERNAME</p>
        </div>
      ) : (
        <div className="divide-y divide-stone-300 border-y border-stone-300 dark:divide-stone-700 dark:border-stone-700">
          {repos.map((repo, index) => (
            <Reveal key={repo.id} delay={Math.min(index, 6) * 55}><RepoCard repo={repo} /></Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
