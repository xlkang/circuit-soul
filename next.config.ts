import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 包导入优化：减少客户端 bundle 大小
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gray-matter", "remark", "remark-html"],
  },

  // 图片优化：优先使用 avif/webp
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
