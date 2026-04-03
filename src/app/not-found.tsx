import Link from 'next/link';
import ThemeBackground from '@/components/ThemeBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <ThemeBackground />
      <div className="card p-8 max-w-lg relative z-10">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold mb-4 font-mono glow">
          404
        </h1>
        <h2 className="text-xl mb-6">
          页面未找到 | Page Not Found
        </h2>
        <p className="mb-8 font-mono text-sm" style={{ color: 'var(--text-secondary, var(--foreground))' }}>
          看起来你访问了一个不存在的路径。<br />
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-2 font-mono transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: 'var(--accent)', 
              color: 'var(--background)',
              borderRadius: '0.375rem'
            }}
          >
            返回首页 / Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-2 border font-mono hover:bg-[var(--accent-dim)] transition-colors"
            style={{ 
              borderColor: 'var(--accent)', 
              color: 'var(--accent)',
              borderRadius: '0.375rem'
            }}
          >
            浏览博客 / Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
