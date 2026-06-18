import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dino's Blog",
    template: "%s | Dino's Blog",
  },
  description: "记录技术思考与代码实践",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Dino's Blog",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-zinc-200 py-8 text-center text-sm text-zinc-400 dark:border-zinc-800">
          <p>
            Built with Next.js · 同步自{" "}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
              GitHub
            </a>{" "}
            &amp;{" "}
            <a href="https://csdn.net" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              CSDN
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
