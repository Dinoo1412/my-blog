import { GitHubRepo, LANGUAGE_COLORS } from "@/lib/github";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "#788b99" : null;
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group grid min-h-28 gap-4 py-5 transition-colors hover:bg-[#e7e8e2] sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:px-4 dark:hover:bg-[#303838]">
      <span className="font-mono text-xs text-stone-400">{String(repo.id).slice(-2)}</span>
      <span><strong className="font-editorial block text-xl font-semibold text-stone-800 group-hover:text-[#637986] dark:text-stone-100">{repo.name}</strong><span className="mt-1 line-clamp-1 block text-sm text-stone-500">{repo.description || "暂无项目说明"}</span></span>
      <span className="flex items-center gap-4 text-xs text-stone-500">{langColor && <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ backgroundColor: langColor }} />{repo.language}</span>}<span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stargazers_count}</span><span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{repo.forks_count}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 group-hover:border-[#788b99] dark:border-stone-700"><ArrowUpRight className="h-4 w-4" /></span></span>
    </a>
  );
}
