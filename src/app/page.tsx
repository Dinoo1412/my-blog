import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, Terminal } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import PostCard from "@/components/PostCard";
import RepoCard from "@/components/RepoCard";
import Reveal from "@/components/Reveal";

export default async function HomePage() {
  const [posts, user, repos] = await Promise.all([getAllPosts(), getGitHubUser(), getGitHubRepos(6)]);
  return (
    <div className="space-y-28">
      <section className="relative grid min-h-[34rem] gap-12 py-10 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div className="hero-copy relative border-l border-stone-300 pl-7 sm:pl-12 dark:border-stone-700">
          <span className="absolute -left-3 top-0 bg-[var(--background)] py-2 font-mono text-xs text-[#788b99] [writing-mode:vertical-rl]">VOL. 01 / 2026</span>
          <p className="text-sm tracking-[0.18em] text-[#637986]">DEVELOPER · WRITER · BUILDER</p>
          <h1 className="font-editorial mt-8 max-w-3xl text-5xl font-semibold leading-[1.24] tracking-[-0.04em] text-stone-800 sm:text-7xl dark:text-stone-100">代码是结果，<br />过程值得被记录。</h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-400">{user?.bio || "技术文章、开源仓库，以及从想法做到上线的项目过程。"}</p>
          <div className="mt-10 flex items-center gap-8 text-sm font-medium"><Link href="/blog" className="group inline-flex min-h-11 items-center gap-3 text-stone-800 dark:text-stone-100">翻阅文章 <span className="grid h-9 w-9 place-items-center rounded-full border border-[#788b99] transition group-hover:bg-[#788b99] group-hover:text-white"><ArrowDownRight className="h-4 w-4" /></span></Link><Link href="/demos" className="border-b border-stone-400 pb-1 text-stone-500 hover:text-[#637986]">项目分享</Link></div>
        </div>

        <aside className="profile-float relative mx-auto w-full max-w-[18rem] pt-8">
          <div className="absolute right-3 top-0 h-24 w-24 rounded-full bg-[#c9d1d1] dark:bg-[#465250]" />
          <div className="folder-sheet relative p-6 shadow-[12px_14px_0_#d9ded8] dark:shadow-[12px_14px_0_#35403f]">
            <div className="flex items-start justify-between"><span className="font-mono text-[10px] text-stone-400">PROFILE / INDEX</span><Terminal className="h-4 w-4 text-[#788b99]" /></div>
            {user && <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="mt-7 block"><Image src={user.avatar_url} alt={user.name || user.login} width={72} height={72} className="rounded-full grayscale-[25%]" /><h2 className="font-editorial mt-5 text-2xl font-semibold text-stone-800 dark:text-stone-100">{user.name || user.login}</h2><p className="mt-1 font-mono text-xs text-stone-500">@{user.login}</p></a>}
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-stone-300 pt-5 dark:border-stone-700"><div><dt className="text-xs text-stone-500">文章</dt><dd className="font-editorial text-2xl">{posts.length}</dd></div><div><dt className="text-xs text-stone-500">仓库</dt><dd className="font-editorial text-2xl">{user?.public_repos || repos.length}</dd></div></dl>
          </div>
        </aside>
      </section>

      {posts.length > 0 && <Reveal><section className="journal-rule pt-8"><SectionHead number="02" title="近期手记" href="/blog" /><div className="mt-8 grid gap-x-10 gap-y-0 md:grid-cols-[1.05fr_.95fr]">{posts.slice(0, 4).map((post, index) => <PostCard key={post.slug} post={post} featured={index === 0} />)}</div></section></Reveal>}
      {repos.length > 0 && <Reveal><section className="journal-rule pt-8"><SectionHead number="03" title="代码目录" href="/projects" /><div className="mt-8 divide-y divide-stone-300 border-y border-stone-300 dark:divide-stone-700 dark:border-stone-700">{repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}</div></section></Reveal>}
    </div>
  );
}

function SectionHead({ number, title, href }: { number: string; title: string; href: string }) {
  return <div className="flex items-end justify-between gap-4"><div className="flex items-baseline gap-4"><span className="font-mono text-xs text-[#788b99]">{number}</span><h2 className="font-editorial text-4xl font-semibold text-stone-800 dark:text-stone-100">{title}</h2></div><Link href={href} className="group inline-flex min-h-11 items-center gap-2 text-sm text-stone-500 hover:text-[#637986]">查看目录 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>;
}
