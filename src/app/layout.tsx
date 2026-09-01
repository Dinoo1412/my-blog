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
      <body className="text-slate-900 antialiased dark:text-blue-50">
        <Navbar />
        <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
        <footer className="mt-20 border-t border-blue-100/80 bg-white/55 py-9 text-center text-sm text-slate-400 backdrop-blur dark:border-blue-900/60 dark:bg-[#07172c]/70">
          <p className="font-mono text-xs tracking-wide">
            BUILT WITH NEXT.JS · SYNCED FROM{" "}
            <a href="https://github.com/Dinoo1412" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
              GITHUB
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
