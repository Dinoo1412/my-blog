import { GitHubRepo, LANGUAGE_COLORS } from "@/lib/github";
import { Star, GitFork, ExternalLink } from "lucide-react";

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "#8b949e" : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white/85 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/8 dark:border-blue-900/70 dark:bg-[#0a1d38]/85"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/70 transition-transform duration-500 group-hover:scale-125 dark:bg-blue-900/30" />
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="relative font-bold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
          {repo.name}
        </h3>
        <ExternalLink className="relative mt-0.5 h-4 w-4 shrink-0 text-blue-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
      </div>

      <p className="relative mb-4 line-clamp-2 flex-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {repo.description || "No description"}
      </p>

      {repo.topics.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-950 dark:text-blue-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-center gap-4 border-t border-blue-50 pt-3 text-xs text-slate-400 dark:border-blue-900/50">
        {langColor && (
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks_count}
        </span>
      </div>
    </a>
  );
}
