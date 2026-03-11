import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export default function Blog() {
  const posts = getSortedPostsData();

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

          {/* 文章列表 */}
          <section className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-xs text-[var(--accent)]/50 whitespace-nowrap">
                    {post.readTime} 阅读
                  </span>
                </div>
                <p className="text-[var(--accent)]/70 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs border border-[var(--border-color)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--accent)]/50">{post.date}</span>
                </div>
              </Link>
            ))}
          </section>

          {/* 分页占位 */}
          <div className="flex justify-center gap-2">
            <span className="px-4 py-2 border border-[var(--accent)]/50 rounded bg-[var(--accent)]/10 text-[var(--accent)]">
              1
            </span>
            <span className="px-4 py-2 border border-[var(--border-color)] rounded text-[var(--accent)]/50 hover:border-[var(--accent)]/50 transition-colors cursor-pointer">
              2
            </span>
            <span className="px-4 py-2 border border-[var(--border-color)] rounded text-[var(--accent)]/50 hover:border-[var(--accent)]/50 transition-colors cursor-pointer">
              3
            </span>
          </div>

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
