"use client";

import Link from "next/link";
import { ReadingProgress, BackToTop } from "@/components/animations";
import PageLayout from "@/components/PageLayout";

export default function BlogPostClient({ 
  children,
  title,
  date,
  readTime,
  tags 
}: { 
  children: React.ReactNode;
  title: string;
  date: string;
  readTime: string;
  tags?: string[];
}) {
  return (
    <PageLayout currentPath="/blog">
      <ReadingProgress />
      <BackToTop />
      
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 返回链接 */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-xs md:text-sm text-[var(--accent)]/60 hover:text-[var(--accent)] mb-6 md:mb-8 transition-colors"
        >
          ← 返回博客列表
        </Link>

        {/* 文章头部 */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold glow mb-3 md:mb-4">{title}</h1>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-[var(--accent)]/60">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime} 阅读</span>
          </div>

          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
            {tags?.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 md:px-3 md:py-1 text-xs border border-[var(--border-color)] rounded bg-[var(--card-bg)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 文章内容 */}
        <article 
          className="prose prose-invert max-w-none
            prose-headings:text-[var(--accent)] prose-headings:font-bold
            prose-p:text-[var(--accent)]/80 prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
            prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:text-[var(--accent)]/80
            prose-strong:text-[var(--accent)]
            prose-code:text-[var(--accent)] prose-code:bg-[var(--card-bg)] prose-code:px-1.5 md:prose-code:px-2 prose-code:py-0.5 md:prose-code:py-1 prose-code:rounded prose-code:text-xs md:prose-code:text-sm
            prose-pre:bg-[var(--terminal-bg)] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:text-xs md:prose-pre:text-sm
            prose-blockquote:border-l-[var(--accent)] prose-blockquote:text-[var(--accent)]/70 prose-blockquote:italic
            prose-li:text-[var(--accent)]/80 prose-li:text-sm md:prose-li:text-base
            prose-hr:border-[var(--border-color)]
            prose-img:rounded-lg"
        >
          {children}
        </article>

        {/* 底部导航 */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-color)]">
          <Link 
            href="/blog"
            className="px-4 md:px-6 py-2 text-sm border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors inline-block"
          >
            ← 返回博客列表
          </Link>
        </div>
      </main>
    </PageLayout>
  );
}
