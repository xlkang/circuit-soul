import Link from "next/link";
import { Suspense } from "react";
import { getSortedPostsData, getTagCounts, getBlogStats } from "@/lib/blog";
import BlogSearch from "@/components/BlogSearch";
import TagCloud from "@/components/TagCloud";
import ScrollReveal from "@/components/animations/ScrollReveal";
import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "Circuit Soul 的技术博客 — 记录思考，分享知识。涵盖 AI、Next.js、TypeScript 等技术话题。",
  openGraph: {
    title: "博客 | Circuit Soul",
    description: "记录思考，分享知识。涵盖 AI、Next.js、TypeScript 等技术话题。",
    url: "https://circuit-soul.vercel.app/blog",
  },
  twitter: {
    title: "博客 | Circuit Soul",
    description: "记录思考，分享知识。",
  },
};

// ISR: 每小时增量静态重生成
export const revalidate = 3600;

export default function Blog() {
  const posts = getSortedPostsData();
  const tagCounts = getTagCounts();
  const stats = getBlogStats();
  const siteUrl = "https://circuit-soul.vercel.app";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Circuit Soul 博客",
    "description": "记录思考，分享知识",
    "url": `${siteUrl}/blog`,
    "author": {
      "@type": "Person",
      "name": "Circuit Soul",
      "url": siteUrl,
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || `${post.title} - ${post.readTime}阅读`,
      "datePublished": post.date,
      "url": `${siteUrl}/blog/${post.slug}`,
      "keywords": post.tags?.join(", "),
    })),
  };

  return (
    <PageLayout currentPath="/blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* 标题 */}
        <section className="text-center space-y-3 md:space-y-4">
          <ScrollReveal>
            <h1 className="text-2xl md:text-4xl font-bold glow">博客</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-sm md:text-base text-[var(--accent)]/60">记录思考，分享知识</p>
          </ScrollReveal>
          {/* 博客统计 */}
          <ScrollReveal delay={0.15}>
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm text-[var(--foreground)]/50 mt-2">
              <span>{stats.totalPosts} 篇文章</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">{stats.totalWords.toLocaleString()} 字</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">{stats.totalReadTime} 分钟阅读</span>
              <span className="md:hidden">{stats.totalWords.toLocaleString()} 字 · {stats.totalReadTime} 分钟</span>
            </div>
          </ScrollReveal>
        </section>

        {/* 标签云 */}
        <ScrollReveal delay={0.2}>
          <section className="space-y-3 md:space-y-4">
            <h2 className="text-sm font-bold text-[var(--accent)]/60">标签云</h2>
            <Suspense fallback={
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs border border-[var(--border-color)] rounded animate-pulse">加载中...</span>
              </div>
            }>
              <TagCloud tags={tagCounts} />
            </Suspense>
          </section>
        </ScrollReveal>

        {/* 搜索和文章列表 */}
        <ScrollReveal delay={0.3}>
          <BlogSearch posts={posts} />
        </ScrollReveal>

        {/* 底部导航 */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-[var(--border-color)]">
            <Link 
              href="/"
              className="px-4 md:px-6 py-2 text-sm text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
            >
              ← 返回首页
            </Link>
            <Link 
              href="/about"
              className="px-4 md:px-6 py-2 text-sm border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors"
            >
              关于我
            </Link>
          </div>
        </ScrollReveal>
      </main>
    </PageLayout>
  );
}
