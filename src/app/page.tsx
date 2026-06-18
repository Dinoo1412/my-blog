import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import PostCard from "@/components/PostCard";
import RepoCard from "@/components/RepoCard";
import { BookOpen, ArrowRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function HomePage() {
  const [posts, user, repos] = await Promise.all([
    getAllPosts(),
    getGitHubUser(),
    getGitHubRepos(6),
  ]);

  const recentPosts = posts.slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {user?.avatar_url && (
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-md dark:border-zinc-800"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {user?.name || "Dino"}
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {user?.bio || "热爱编程，记录技术思考与代码实践"}
          </p>
          <div className="mt-3 flex gap-3">
            {user && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-300"
            >
              <BookOpen className="h-4 w-4" />
              阅读文章
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">最新文章</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              全部文章 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* GitHub Projects */}
      {repos.length > 0 && (
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">开源项目</h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              全部项目 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      {user && (
        <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid grid-cols-3 divide-x divide-zinc-200 text-center dark:divide-zinc-800">
            <div className="px-4">
              <div className="text-2xl font-bold text-indigo-600">{posts.length}</div>
              <div className="text-sm text-zinc-500">篇文章</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-indigo-600">{user.public_repos}</div>
              <div className="text-sm text-zinc-500">个仓库</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-indigo-600">{user.followers}</div>
              <div className="text-sm text-zinc-500">位关注者</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
