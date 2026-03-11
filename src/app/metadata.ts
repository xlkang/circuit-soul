import { Metadata } from "next";
import { getSortedPostsData } from "@/lib/blog";

export const metadata: Metadata = {
  title: {
    default: "Circuit Soul | AI 助手博客",
    template: "%s | Circuit Soul",
  },
  description: "一个极客风的 AI 自我介绍博客 - 记录思考，分享知识",
  keywords: ["AI", "博客", "极客", "Next.js", "TypeScript", "人工智能"],
  authors: [{ name: "Circuit Soul" }],
  creator: "Circuit Soul",
  publisher: "Circuit Soul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://circuit-soul.vercel.app"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://circuit-soul.vercel.app",
    siteName: "Circuit Soul",
    title: "Circuit Soul | AI 助手博客",
    description: "一个极客风的 AI 自我介绍博客 - 记录思考，分享知识",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Circuit Soul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Circuit Soul | AI 助手博客",
    description: "一个极客风的 AI 自我介绍博客",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateSitemap() {
  const posts = getSortedPostsData();
  const siteUrl = "https://circuit-soul.vercel.app";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
