"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>;
}

const links = [{ href: "/", label: "首页" }, { href: "/blog", label: "文章" }, { href: "/projects", label: "项目" }, { href: "/demos", label: "演示" }, { href: "/about", label: "关于" }];
const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  return (
    <>
      <aside aria-label="主导航" className="fixed left-7 top-1/2 z-50 hidden -translate-y-1/2 xl:flex xl:w-14 xl:flex-col xl:items-center">
        <Link href="/" aria-label="Jay 的首页" className="mb-5 font-editorial text-lg font-semibold text-[#637986]">J.</Link>
        <nav className="relative flex flex-col gap-2 before:absolute before:bottom-5 before:left-1/2 before:top-5 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {links.map((link, index) => <Link key={link.href} href={link.href} aria-label={link.label} className={`group relative grid h-9 w-9 place-items-center font-mono text-[9px] transition duration-200 ${active(link.href) ? "text-white" : "text-stone-400 hover:text-[#526b78]"}`}><span className={`relative z-10 grid place-items-center rounded-full transition-all ${active(link.href) ? "h-7 w-7 bg-[#788b99] shadow-sm" : "h-4 w-4 bg-[var(--background)] group-hover:bg-[#d9ded8] dark:group-hover:bg-[#3a4443]"}`}>0{index + 1}</span><span className="pointer-events-none absolute left-11 origin-left translate-x-1 whitespace-nowrap border-l-2 border-[#788b99] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs text-stone-700 opacity-0 shadow-sm transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-stone-200">{link.label}</span></Link>)}
        </nav>
        {username && <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" aria-label="访问 GitHub 主页" className="mt-5 grid h-9 w-9 place-items-center text-stone-400 transition hover:text-[#637986]"><GithubIcon className="h-4 w-4" /></a>}
      </aside>

      <header className="sticky top-0 z-50 px-3 py-3 xl:hidden">
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-stone-300/80 bg-[#f8f6f1]/92 px-3 shadow-[0_8px_30px_-20px_rgba(53,67,74,.5)] backdrop-blur-xl dark:border-stone-700 dark:bg-[#2e3435]/92">
          <Link href="/" className="flex min-h-12 items-center gap-3 px-2 font-semibold text-stone-800 dark:text-stone-100"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#788b99] font-mono text-xs text-white">J</span><span>Jay&apos;s Journal</span></Link>
          <div className="hidden items-center md:flex">{links.map((link, index) => <Link key={link.href} href={link.href} className={`relative flex min-h-12 items-center px-3 text-sm ${active(link.href) ? "text-stone-900 dark:text-stone-100" : "text-stone-500"}`}><span className="mr-1 font-mono text-[9px] text-[#879589]">0{index + 1}</span>{link.label}{active(link.href) && <span className="nav-marker absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[#788b99]" />}</Link>)}</div>
          <button aria-label={open ? "关闭导航菜单" : "打开导航菜单"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-12 w-11 place-items-center text-stone-700 md:hidden dark:text-stone-200">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </nav>
        {open && <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-stone-300 bg-[#f8f6f1] p-3 shadow-xl dark:border-stone-700 dark:bg-[#2e3435]">{links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center border-l-2 px-3 text-sm ${active(link.href) ? "border-[#788b99] text-stone-900" : "border-transparent text-stone-500"}`}><span className="mr-3 font-mono text-[10px] text-[#879589]">0{index + 1}</span>{link.label}</Link>)}</div>}
      </header>
    </>
  );
}
