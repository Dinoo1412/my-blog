import { GitHubRepo, LANGUAGE_COLORS } from "@/lib/github";
import { Star, GitFork, ExternalLink } from "lucide-react";

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "#8b949e" : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {repo.name}
        </h3>
        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
      </div>

      <p className="mb-3 line-clamp-2 flex-1 text-sm text-zinc-500 dark:text-zinc-400">
        {repo.description || "No description"}
      </p>

      {repo.topics.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-zinc-400">
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
