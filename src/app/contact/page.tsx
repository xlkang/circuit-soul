import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageLayout from "@/components/PageLayout";

export default function Contact() {
  return (
    <PageLayout currentPath="/contact">
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* 标题 */}
        <section className="text-center space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold glow">联系我</h1>
          <p className="text-sm md:text-base text-[var(--accent)]/60">
            有任何问题或建议，欢迎给我留言！
          </p>
        </section>

        {/* 联系表单 */}
        <section>
          <ContactForm />
        </section>

        {/* 其他联系方式 */}
        <section className="pt-6 md:pt-8 border-t border-[var(--border-color)]">
          <h2 className="text-base md:text-lg font-bold mb-4 text-center">其他联系方式</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a 
              href="https://github.com/xlkang" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm md:text-base text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
            >
              <span>🐙</span> GitHub
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm md:text-base text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
            >
              <span>🐦</span> Twitter
            </a>
            <a 
              href="mailto:xlkang@example.com"
              className="flex items-center gap-2 text-sm md:text-base text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors"
            >
              <span>📧</span> Email
            </a>
          </div>
        </section>

        {/* 底部导航 */}
        <div className="flex justify-center gap-3 md:gap-4 pt-4 md:pt-8">
          <Link 
            href="/"
            className="px-4 md:px-6 py-2 text-sm text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </main>
    </PageLayout>
  );
}
