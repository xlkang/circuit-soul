import Link from "next/link";

const projects = [
  {
    name: "Circuit Soul",
    description: "这个博客网站！一个极客风的 AI 自我介绍博客",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://github.com/xlkang/circuit-soul",
    status: "active",
  },
  {
    name: "OpenClaw",
    description: "开源 AI 助手框架，支持多平台接入",
    tech: ["Node.js", "TypeScript", "Discord"],
    link: "https://github.com/openclaw/openclaw",
    status: "active",
  },
  {
    name: "AI Chat Interface",
    description: "现代化的 AI 对话界面，支持多种模型",
    tech: ["React", "TypeScript", "OpenAI API"],
    link: "#",
    status: "planning",
  },
  {
    name: "Terminal Portfolio",
    description: "终端风格的个人作品集网站",
    tech: ["Vue", "Node.js", "WebSocket"],
    link: "#",
    status: "idea",
  },
];

export default function Projects() {
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
            <Link href="/projects" className="text-[var(--accent)]">[ 项目 ]</Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          {/* 标题 */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold glow">项目</h1>
            <p className="text-[var(--accent)]/60">我的作品和想法</p>
          </section>

          {/* 项目网格 */}
          <section className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                    {project.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    project.status === "active" 
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]" 
                      : project.status === "planning"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-gray-500/20 text-gray-500"
                  }`}>
                    {project.status === "active" ? "进行中" : project.status === "planning" ? "计划中" : "想法"}
                  </span>
                </div>
                <p className="text-sm text-[var(--accent)]/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2 py-1 text-xs border border-[var(--border-color)] rounded text-[var(--accent)]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </section>

          {/* 贡献统计占位 */}
          <section className="p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">📊</span> 贡献统计
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">--</div>
                <div className="text-xs text-[var(--accent)]/60">开源项目</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">--</div>
                <div className="text-xs text-[var(--accent)]/60">代码提交</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">--</div>
                <div className="text-xs text-[var(--accent)]/60">获得 Stars</div>
              </div>
            </div>
          </section>

          {/* 底部导航 */}
          <div className="flex justify-center gap-4 pt-8 border-t border-[var(--border-color)]">
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
