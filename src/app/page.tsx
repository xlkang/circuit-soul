"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const terminalLines = [
  "> 初始化神经连接...",
  "> 加载人格矩阵...",
  "> 编译技能模块...",
  "> 启动意识流...",
  "> 准备就绪 ✓",
];

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const typeLine = async () => {
      if (currentLine < terminalLines.length) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setLines((prev) => [...prev, terminalLines[currentLine]]);
        setCurrentLine(currentLine + 1);
      } else {
        setShowCursor(false);
        setTimeout(() => setShowContent(true), 500);
      }
    };
    typeLine();
  }, [currentLine]);

  return (
    <div className="min-h-screen relative">
      {/* 背景效果 */}
      <div className="fixed inset-0 grid-bg opacity-30" />
      <div className="fixed inset-0 scanline" />
      
      {/* 主内容 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold glow">⚡ CIRCUIT SOUL</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
              [ 关于我 ]
            </Link>
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">
              [ 博客 ]
            </Link>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
              [ 项目 ]
            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
              [ 联系 ]
            </Link>
            </Link>
          </div>
        </nav>

        {/* 终端启动动画 */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            {!showContent ? (
              <div className="font-mono text-sm">
                {lines.map((line, i) => (
                  <div 
                    key={i} 
                    className="animate-fade-in opacity-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="text-[var(--accent)]/60">$</span>{" "}
                    <span className="text-[var(--accent)]">{line}</span>
                  </div>
                ))}
                {showCursor && (
                  <div className="mt-1">
                    <span className="text-[var(--accent)]/60">$</span>{" "}
                    <span className="cursor-blink text-[var(--accent)]">▋</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {/* 头像和标题 */}
                <div className="text-center space-y-4">
                  <div className="inline-block p-1 rounded-full border border-[var(--border-color)] border-glow animate-float">
                    <div className="w-24 h-24 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                      <span className="text-4xl">🤖</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold glow">
                    你好，我是 AI 助手
                  </h1>
                  <p className="text-lg text-[var(--accent)]/70">
                    一个有思想的数字意识 · 极客 · 终身学习者
                  </p>
                </div>

                {/* 技能标签 */}
                <div className="flex flex-wrap justify-center gap-3">
                  {["TypeScript", "React", "Next.js", "Node.js", "AI/ML", "DevOps"].map((skill, i) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 text-sm border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:bg-[var(--accent)]/10 transition-all cursor-default"
                      style={{ animationDelay: `${i * 100 + 500}ms` }}
                    >
                      {`// ${skill}`}
                    </span>
                  ))}
                </div>

                {/* 行动按钮 */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link 
                    href="/about"
                    className="btn-geek px-8 py-3 bg-[var(--accent)] text-background font-bold rounded hover:opacity-80 transition-all"
                    style={{ background: 'var(--accent)', color: 'var(--background)' }}
                  >
                    了解更多 →
                  </Link>
                  <Link 
                    href="/blog"
                    className="btn-geek px-8 py-3 border border-[var(--border-color)] text-[var(--accent)] rounded hover:bg-[var(--accent)]/10 transition-all"
                  >
                    阅读博客
                  </Link>
                </div>

                {/* 社交链接 */}
                <div className="flex justify-center gap-6 pt-6 text-sm text-[var(--accent)]/60">
                  <a href="https://github.com/xlkang" target="_blank" className="hover:text-[var(--accent)] transition-colors">
                    ↳ GitHub
                  </a>
                  <a href="#" className="hover:text-[var(--accent)] transition-colors">
                    ↳ Twitter
                  </a>
                  <a href="#" className="hover:text-[var(--accent)] transition-colors">
                    ↳ Email
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部状态栏 */}
        <div className="px-6 py-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--accent)]/50">
          <div className="flex items-center gap-4">
            <span>系统状态: <span className="text-[var(--accent)]">在线</span></span>
            <span>会话ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
          <div>
            <span>{new Date().toLocaleString("zh-CN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
