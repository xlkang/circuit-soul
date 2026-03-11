import Link from "next/link";
import { getSortedPostsData, getAllTags } from "@/lib/blog";
import BlogSearch from "@/components/BlogSearch";

export default function Blog() {
  const posts = getSortedPostsData();
  const tags = getAllTags();

  return (
    <div className="min-h-screen relative">
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

        <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
          {/* 标题 */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold glow">博客</h1>
            <p className="text-[var(--accent)]/60">记录思考，分享知识</p>
          </section>

          {/* 标签筛选 */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-[var(--accent)]/60">标签</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="px-3 py-1 text-sm border border-[var(--accent)] rounded bg-[var(--accent)]/10"
              >
                全部
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm border border-[var(--border-color)] rounded hover:border-[var(--accent)]/50 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>

          {/* 搜索和文章列表 */}
          <BlogSearch posts={posts} />

          {/* 底部导航 */}
          <div className="flex justify-center gap-4 pt-8 border-t border-[var(--border-color)]">
            <Link 
              href="/"
              className="px-6 py-2 text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
            >
              ← 返回首页
            </Link>
            <Link 
              href="/about"
              className="px-6 py-2 border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors"
            >
              关于我
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
