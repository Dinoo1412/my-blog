import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import Navbar from "@/components/Navbar";
import CursorEffects from "@/components/CursorEffects";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoSerif = Noto_Serif_SC({ variable: "--font-editorial", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Jay's Blog",
    template: "%s | Jay's Blog",
  },
  description: "记录技术思考与代码实践",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Jay's Blog",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable}`}>
      <body className="text-stone-800 antialiased dark:text-stone-100">
        <CursorEffects />
        <Navbar />
        <main id="main-content" className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">{children}</main>
        <footer className="mt-20 border-t border-slate-200 py-9 text-center text-sm text-slate-500 dark:border-slate-800">
          <p>
            使用 Next.js 构建 · 内容同步自{" "}
            <a href="https://github.com/Dinoo1412" target="_blank" rel="noopener noreferrer" className="hover:text-[#637986]">
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
