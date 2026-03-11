import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
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
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">[ 博客 ]</Link>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">[ 项目 ]</Link>
            <Link href="/contact" className="text-[var(--accent)]">[ 联系 ]</Link>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto px-6 py-12 space-y-12">
          {/* 标题 */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold glow">联系我</h1>
            <p className="text-[var(--accent)]/60">
              有任何问题或建议，欢迎给我留言！
            </p>
          </section>

          {/* 联系表单 */}
          <section>
            <ContactForm />
          </section>

          {/* 其他联系方式 */}
          <section className="pt-8 border-t border-[var(--border-color)]">
            <h2 className="text-lg font-bold mb-4 text-center">其他联系方式</h2>
            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/xlkang" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
              >
                <span>🐙</span> GitHub
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
              >
                <span>🐦</span> Twitter
              </a>
              <a 
                href="mailto:xlkang@example.com"
                className="flex items-center gap-2 text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
              >
                <span>📧</span> Email
              </a>
            </div>
          </section>

          {/* 底部导航 */}
          <div className="flex justify-center gap-4 pt-8">
            <Link 
              href="/"
              className="px-6 py-2 text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
            >
              ← 返回首页
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
