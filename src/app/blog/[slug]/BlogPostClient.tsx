"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ReadingProgress, BackToTop } from "@/components/animations";
import PageLayout from "@/components/PageLayout";
import ShareButtons from "@/components/ShareButtons";
import Giscus from "@/components/Giscus";
import Breadcrumb from "@/components/Breadcrumb";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import type { Heading, RelatedPost } from "@/lib/blog";

export default function BlogPostClient({ 
  children,
  title,
  date,
  readTime,
  tags,
  headings,
  relatedPosts
}: { 
  children: React.ReactNode;
  title: string;
  date: string;
  readTime: string;
  tags?: string[];
  headings?: Heading[];
  relatedPosts?: RelatedPost[];
}) {
  const params = useParams();
  const slug = params.slug as string;
  const hasHeadings = headings && headings.length > 0;
  
  return (
    <PageLayout currentPath="/blog">
      <ReadingProgress />
      <BackToTop />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 面包屑导航 */}
        <Breadcrumb />
        
        {/* 文章头部 */}
        <header className="mb-8 md:mb-12 max-w-3xl">
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

        {/* Content + TOC layout */}
        <div className="relative flex gap-8">
          {/* 文章内容 */}
          <article 
            className="flex-1 min-w-0 max-w-3xl prose prose-invert max-w-none
              prose-headings:text-[var(--accent)] prose-headings:font-bold prose-headings:scroll-mt-20
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

          {/* Table of Contents — desktop sidebar */}
          {hasHeadings && (
            <aside className="hidden xl:block w-56 flex-shrink-0">
              <div className="sticky top-20">
                <TableOfContents headings={headings!} />
              </div>
            </aside>
          )}
        </div>

        {/* 分享按钮 */}
        <div className="mt-8 pt-6 border-t border-[var(--border-color)] max-w-3xl">
          <ShareButtons title={title} url={`/blog/${slug}`} />
        </div>

        {/* Giscus 评论 */}
        <Giscus />

        {/* 相关文章推荐 */}
        <RelatedPosts posts={relatedPosts || []} />

        {/* 底部导航 */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-color)] max-w-3xl">
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
