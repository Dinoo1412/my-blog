"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/demos", label: "演示" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/75 shadow-[0_1px_20px_rgba(37,99,235,0.04)] backdrop-blur-xl dark:border-blue-900/60 dark:bg-[#061225]/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5 font-black tracking-tight text-slate-950 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-rotate-6">
            <Code2 className="h-4.5 w-4.5" />
          </span>
          <span>Dino&apos;s <span className="text-blue-600 dark:text-blue-400">Blog</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                isActive(link.href)
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-blue-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {GITHUB_USERNAME && (
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full border border-blue-100 bg-white p-2 text-slate-500 transition hover:border-blue-300 hover:text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-slate-300"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-xl border border-blue-100 bg-white p-2 text-blue-700 shadow-sm dark:border-blue-900 dark:bg-blue-950 sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-blue-100 bg-white/95 px-4 py-3 dark:border-blue-900 dark:bg-[#061225]/95 sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-2.5 text-sm font-semibold ${
                isActive(link.href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
