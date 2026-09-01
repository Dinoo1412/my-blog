import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import PostCard from "@/components/PostCard";
import RepoCard from "@/components/RepoCard";
import { ArrowRight, BookOpen, Code2, Layers3, Sparkles } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function HomePage() {
  const [posts, user, repos] = await Promise.all([getAllPosts(), getGitHubUser(), getGitHubRepos(6)]);
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-[2.25rem] bg-[#071b3a] px-6 py-10 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.35),transparent_26rem)]" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border-[54px] border-blue-400/10" />
        <div className="absolute right-8 top-7 font-mono text-xs tracking-[0.28em] text-blue-200/55">BUILD · WRITE · SHARE</div>

        <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-blue-200 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Developer notes & experiments
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.04em] sm:text-6xl">
              把代码写进现实，
              <span className="text-sky-300">把过程留在这里。</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100/70 sm:text-lg">
              {user?.bio || "记录技术思考、工程实践与持续生长的项目。"}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {user && (
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-400">
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
                <BookOpen className="h-4 w-4" />
                阅读文章
              </Link>
              <Link href="/demos" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
                <Layers3 className="h-4 w-4" />
                项目分享
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {user?.avatar_url ? (
                <Image src={user.avatar_url} alt={user.name || user.login} width={72} height={72} className="rounded-2xl border border-white/20 shadow-xl" />
              ) : (
                <span className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-blue-500"><Code2 /></span>
              )}
              <div>
                <p className="text-xs font-medium tracking-wider text-blue-200/60 uppercase">Profile</p>
                <h2 className="mt-1 text-xl font-black">{user?.name || "Dino"}</h2>
                <p className="text-sm text-blue-100/60">@{user?.login || "Dinoo1412"}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center">
              <div><strong className="block text-xl text-sky-300">{posts.length}</strong><span className="text-[10px] text-blue-100/50">POSTS</span></div>
              <div><strong className="block text-xl text-sky-300">{user?.public_repos || repos.length}</strong><span className="text-[10px] text-blue-100/50">REPOS</span></div>
              <div><strong className="block text-xl text-sky-300">{user?.followers || 0}</strong><span className="text-[10px] text-blue-100/50">FOLLOWERS</span></div>
            </div>
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <SectionHeading eyebrow="Latest writing" title="最新文章" href="/blog" linkLabel="全部文章" />
          <div className="grid gap-5 sm:grid-cols-2">{recentPosts.map((post) => <PostCard key={post.slug} post={post} />)}</div>
        </section>
      )}

      {repos.length > 0 && (
        <section>
          <SectionHeading eyebrow="Open source" title="开源项目" href="/projects" linkLabel="全部项目" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}</div>
        </section>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href: string; linkLabel: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h2>
      </div>
      <Link href={href} className="group flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">
        {linkLabel}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
