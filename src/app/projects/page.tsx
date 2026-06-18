import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import RepoCard from "@/components/RepoCard";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "项目" };

export default async function ProjectsPage() {
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos(30)]);

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

  return (
    <div>
      {/* GitHub profile summary */}
      {user && (
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold text-zinc-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-zinc-500">@{user.login} · {user.public_repos} 个公开仓库 · {user.followers} 位关注者</p>
            {user.bio && <p className="mt-1 text-sm text-zinc-500">{user.bio}</p>}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700"
          >
            查看 GitHub
          </a>
        </div>
      )}

      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">开源项目</h1>
      <p className="mb-6 text-zinc-500">
        共 {repos.length} 个仓库，按 Star 数排列
        {languages.length > 0 && `，涉及 ${languages.join("、")} 等语言`}
      </p>

      {repos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-zinc-400 dark:border-zinc-700">
          <p>未配置 GitHub 用户名，请在 .env.local 中设置 NEXT_PUBLIC_GITHUB_USERNAME</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
