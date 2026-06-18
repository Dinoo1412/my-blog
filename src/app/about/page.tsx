import { getGitHubUser } from "@/lib/github";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "关于" };

export default async function AboutPage() {
  const user = await getGitHubUser();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">关于我</h1>

      {user && (
        <div className="mb-8 flex items-center gap-5">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={80}
            height={80}
            className="rounded-full border-4 border-white shadow dark:border-zinc-800"
          />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-zinc-500">@{user.login}</p>
            {user.bio && <p className="mt-1 text-zinc-500">{user.bio}</p>}
          </div>
        </div>
      )}

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <p>
          你好！我是 Dino，一名热爱编程的开发者。这个博客用来记录我的技术学习历程，分享编程经验和思考。
        </p>
        <h2>博客内容</h2>
        <ul>
          <li>原创技术文章（存放于 <code>content/posts/</code>）</li>
          <li>从 CSDN 同步的历史文章（存放于 <code>content/csdn/</code>）</li>
          <li>GitHub 开源项目展示</li>
        </ul>
        <h2>技术栈</h2>
        <ul>
          <li>本博客使用 <strong>Next.js 16</strong> + Tailwind CSS 构建</li>
          <li>文章使用 Markdown / MDX 格式编写</li>
          <li>部署于 <strong>Cloudflare Workers</strong>，自动 CI/CD</li>
          <li>通过脚本定期同步 CSDN 文章</li>
        </ul>
        <h2>联系我</h2>
        <p>
          欢迎通过{" "}
          <a href={user?.html_url || "https://github.com"} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          与我联系。
        </p>
      </div>
    </div>
  );
}
