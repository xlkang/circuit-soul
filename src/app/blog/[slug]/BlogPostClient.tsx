"use client";

import Link from "next/link";
import { ReadingProgress, BackToTop } from "@/components/animations";

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
    <div className="min-h-screen relative">
      <ReadingProgress />
      <BackToTop />
      
      {/* 背景效果 */}
      <div className="fixed inset-0 grid-bg opacity-20" />
      <div className="fixed inset-0 scanline" />
      
      <div className="relative z-10">
        {/* 导航 */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <Link href="/" className="text-xl font-bold glow hover:text-[var(--accent)] transition-colors">
            ⚡ CIRCUIT SOUL
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about" className="hover:text-[var(--accent)] transition-colors">[ 关于我 ]</Link>
            <Link href="/blog" className="text-[var(--accent)]">[ 博客 ]</Link>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">[ 项目 ]</Link>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-6 py-12">
          {/* 返回链接 */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)]/60 hover:text-[var(--accent)] mb-8 transition-colors"
          >
            ← 返回博客列表
          </Link>

          {/* 文章头部 */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold glow mb-4">{title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--accent)]/60">
              <span>{date}</span>
              <span>·</span>
              <span>{readTime} 阅读</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags?.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm border border-[var(--border-color)] rounded bg-[var(--card-bg)]"
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
              prose-p:text-[var(--accent)]/80 prose-p:leading-relaxed
              prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:text-[var(--accent)]/80
              prose-strong:text-[var(--accent)]
              prose-code:text-[var(--accent)] prose-code:bg-[var(--card-bg)] prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-[var(--terminal-bg)] prose-pre:border prose-pre:border-[var(--border-color)]
              prose-blockquote:border-l-[var(--accent)] prose-blockquote:text-[var(--accent)]/70 prose-blockquote:italic
              prose-li:text-[var(--accent)]/80
              prose-hr:border-[var(--border-color)]"
          >
            {children}
          </article>

          {/* 底部导航 */}
          <div className="mt-16 pt-8 border-t border-[var(--border-color)]">
            <Link 
              href="/blog"
              className="px-6 py-2 border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors"
            >
              ← 返回博客列表
            </Link>
          </div>
        </main>

        {/* 底部状态栏 */}
        <div className="px-6 py-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--accent)]/50">
          <span>系统状态: <span className="text-[var(--accent)]">在线</span></span>
          <span>{new Date().toLocaleString("zh-CN")}</span>
        </div>
      </div>
    </div>
  );
}
