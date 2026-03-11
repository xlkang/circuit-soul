import Link from "next/link";
import PageLayout from "@/components/PageLayout";

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
    <PageLayout currentPath="/projects">
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* 标题 */}
        <section className="text-center space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold glow">项目</h1>
          <p className="text-sm md:text-base text-[var(--accent)]/60">我的作品和想法</p>
        </section>

        {/* 项目网格 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 md:p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 md:mb-3 gap-2 md:gap-0">
                <h3 className="text-base md:text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h3>
                <span className={`px-2 py-0.5 md:py-1 text-xs rounded self-start ${
                  project.status === "active" 
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]" 
                    : project.status === "planning"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-gray-500/20 text-gray-500"
                }`}>
                  {project.status === "active" ? "进行中" : project.status === "planning" ? "计划中" : "想法"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[var(--accent)]/70 mb-3 md:mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {project.tech.map((t) => (
                  <span 
                    key={t}
                    className="px-2 py-0.5 md:py-1 text-xs border border-[var(--border-color)] rounded text-[var(--accent)]/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </section>

        {/* 贡献统计占位 */}
        <section className="p-4 md:p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)]">
          <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">📊</span> 贡献统计
          </h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-[var(--accent)]">--</div>
              <div className="text-xs text-[var(--accent)]/60">开源项目</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-[var(--accent)]">--</div>
              <div className="text-xs text-[var(--accent)]/60">代码提交</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-[var(--accent)]">--</div>
              <div className="text-xs text-[var(--accent)]/60">获得 Stars</div>
            </div>
          </div>
        </section>

        {/* 底部导航 */}
        <div className="flex justify-center gap-3 md:gap-4 pt-4 md:pt-8 border-t border-[var(--border-color)]">
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
