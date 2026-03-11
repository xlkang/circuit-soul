import Link from "next/link";
import { getSortedPostsData, getAllTags } from "@/lib/blog";
import BlogSearch from "@/components/BlogSearch";
import ScrollReveal from "@/components/animations/ScrollReveal";
import PageLayout from "@/components/PageLayout";

export default function Blog() {
  const posts = getSortedPostsData();
  const tags = getAllTags();

  return (
    <PageLayout currentPath="/blog">
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* 标题 */}
        <section className="text-center space-y-3 md:space-y-4">
          <ScrollReveal>
            <h1 className="text-2xl md:text-4xl font-bold glow">博客</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-sm md:text-base text-[var(--accent)]/60">记录思考，分享知识</p>
          </ScrollReveal>
        </section>

        {/* 标签筛选 */}
        <ScrollReveal delay={0.2}>
          <section className="space-y-3 md:space-y-4">
            <h2 className="text-sm font-bold text-[var(--accent)]/60">标签</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="px-3 py-1 text-xs md:text-sm border border-[var(--accent)] rounded bg-[var(--accent)]/10"
              >
                全部
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-xs md:text-sm border border-[var(--border-color)] rounded hover:border-[var(--accent)]/50 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
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
