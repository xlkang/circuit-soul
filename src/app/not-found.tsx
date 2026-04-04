import Link from 'next/link';
import ThemeBackground from '@/components/ThemeBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <ThemeBackground />
      <div className="max-w-lg relative z-10">
        {/* 终端风格头部 */}
        <div className="mb-6 p-4 border border-[var(--border-color)] rounded-lg bg-[var(--card-bg)] text-left">
          <div className="flex gap-1.5 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="font-mono text-xs text-[var(--accent)]/70 space-y-1">
            <p><span className="text-[var(--accent)]">$</span> curl circuit-soul.vercel.app{`{path}`}</p>
            <p className="text-[var(--accent)]/40">
              {`->`} Error: 404 NOT_FOUND<br />
              {`->`} Reason: Circuit broken — path does not exist<br />
              {`->`} Suggestion: Check your routing or return home
            </p>
            <p><span className="text-[var(--accent)]">$</span> <span className="animate-pulse">_</span></p>
          </div>
        </div>

        {/* 错误码 */}
        <div className="text-8xl md:text-9xl font-bold font-mono glow mb-4 tracking-widest">
          404
        </div>

        <h2 className="text-lg md:text-xl mb-4 text-[var(--accent)]/80">
          页面未找到 | Page Not Found
        </h2>

        <p className="mb-8 font-mono text-sm text-[var(--accent)]/60 leading-relaxed">
          看起来你访问了一个不存在的路径。<br />
          The page you&apos;re looking for doesn&apos;t exist.<br />
          <span className="text-[var(--accent)]/40">
            {`// Did you follow a broken circuit?`}
          </span>
        </p>

        {/* ASCII 电路装饰 */}
        <div className="font-mono text-xs text-[var(--accent)]/30 mb-8 select-none text-left">
{`
┌─────────────────────────────┐
│  ●─────────────────────────● │
│  │                         │ │
│  │   [ ROUTING ERROR ]     │ │
│  │                         │ │
│  └─────[ 404 ]─────────────┘ │
└─────────────────────────────┘
`}
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-2.5 font-mono text-sm transition-all hover:scale-105 active:scale-95"
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
            className="px-6 py-2.5 border font-mono text-sm hover:bg-[var(--accent-dim)] transition-colors"
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
