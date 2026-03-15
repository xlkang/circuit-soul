import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
      <div className="geek-border p-8 max-w-lg">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-[#00ff41] mb-4 font-mono">
          404
        </h1>
        <h2 className="text-xl text-gray-300 mb-6">
          页面未找到 | Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 font-mono text-sm">
          看起来你访问了一个不存在的路径。<br />
          The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-2 bg-[#00ff41] text-black font-mono hover:bg-[#00cc33] transition-colors"
          >
            返回首页 / Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-2 border border-[#00ff41] text-[#00ff41] font-mono hover:bg-[#00ff41]/10 transition-colors"
          >
            浏览博客 / Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
