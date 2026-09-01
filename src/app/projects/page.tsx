import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import RepoCard from "@/components/RepoCard";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, GitBranch, Orbit } from "lucide-react";

export const metadata: Metadata = { title: "项目" };

export default async function ProjectsPage() {
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos(30)]);

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

  return (
    <div>
      <header className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-6 py-10 text-white shadow-2xl shadow-blue-900/15 sm:px-10 sm:py-12">
        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[42px] border-white/10" />
        <Orbit className="absolute bottom-6 right-10 h-20 w-20 text-white/10" />
        <p className="relative font-mono text-xs font-bold tracking-[0.22em] text-blue-100 uppercase">Open source laboratory</p>
        <h1 className="relative mt-3 text-4xl font-black tracking-tight sm:text-5xl">开源项目</h1>
        <p className="relative mt-4 max-w-2xl text-blue-50/80">
          共 {repos.length} 个仓库，按 Star 数排列{languages.length > 0 && `，涉及 ${languages.join("、")} 等语言`}。
        </p>
      </header>

      {/* GitHub profile summary */}
      {user && (
        <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-blue-100 bg-white/85 p-5 shadow-lg shadow-blue-900/5 backdrop-blur dark:border-blue-900/70 dark:bg-[#0a1d38]/85 sm:flex-row sm:items-center">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={64}
            height={64}
            className="rounded-2xl border-4 border-blue-50 shadow-md dark:border-blue-950"
          />
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-blue-500 uppercase">GitHub profile</p>
            <h2 className="mt-1 font-black text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-slate-500">@{user.login} · {user.public_repos} 个公开仓库 · {user.followers} 位关注者</p>
            {user.bio && <p className="mt-1 text-sm text-slate-500">{user.bio}</p>}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 sm:ml-auto"
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
