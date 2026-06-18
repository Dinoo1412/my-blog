import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "img-blog.csdnimg.cn" },
      { protocol: "https", hostname: "picx.zhimg.com" },
    ],
  },
};

export default nextConfig;
