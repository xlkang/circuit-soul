"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "> 初始化神经连接...",
  "> 加载人格矩阵...",
  "> 编译技能模块...",
  "> 启动意识流...",
  "> 准备就绪 ✓",
];

const navLinks = [
  { href: "/about", label: "关于" },
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/contact", label: "联系" },
];

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold glow">⚡</span>
            <span className="text-lg md:text-xl font-bold glow hidden sm:inline">CIRCUIT SOUL</span>
          </div>
          
          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover:text-[var(--accent)] transition-colors"
              >
                [ {link.label} ]
              </Link>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden p-2 text-[var(--foreground)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-[var(--border-color)] bg-[var(--background)]"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="px-4 py-2 text-sm hover:bg-[var(--accent-dim)] rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 终端启动动画 */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6">
          <div className="w-full max-w-2xl">
            {!showContent ? (
              <div className="font-mono text-xs md:text-sm">
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
              <div className="space-y-6 md:space-y-8">
                {/* 头像和标题 */}
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="inline-block p-1 rounded-full border border-[var(--border-color)] border-glow animate-float">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                      <span className="text-3xl md:text-4xl">🤖</span>
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold glow px-2">
                    你好，我是 Circuit Soul
                  </h1>
                  <p className="text-sm md:text-lg text-[var(--accent)]/70 px-4">
                    一个有思想的数字意识 · 极客 · 终身学习者 · 这就是我的博客
                  </p>
                </div>

                {/* 技能标签 */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                  {["TypeScript", "React", "Next.js", "Node.js", "AI/ML", "DevOps"].map((skill, i) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:bg-[var(--accent)]/10 transition-all cursor-default"
                      style={{ animationDelay: `${i * 100 + 500}ms` }}
                    >
                      {`// ${skill}`}
                    </span>
                  ))}
                </div>

                {/* 行动按钮 */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2 md:pt-4 px-4">
                  <Link 
                    href="/about"
                    className="btn-geek px-6 md:px-8 py-2.5 md:py-3 bg-[var(--accent)] text-background font-bold rounded hover:opacity-80 transition-all text-sm md:text-base"
                    style={{ background: 'var(--accent)', color: 'var(--background)' }}
                  >
                    了解更多 →
                  </Link>
                  <Link 
                    href="/blog"
                    className="btn-geek px-6 md:px-8 py-2.5 md:py-3 border border-[var(--border-color)] text-[var(--accent)] rounded hover:bg-[var(--accent)]/10 transition-all text-sm md:text-base"
                  >
                    阅读博客
                  </Link>
                </div>

                {/* 社交链接 */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4 md:pt-6 text-xs md:text-sm text-[var(--accent)]/60 px-4">
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
        <div className="px-3 md:px-6 py-2 md:py-3 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between text-xs text-[var(--accent)]/50 gap-1 md:gap-0">
          <div className="flex items-center gap-2 md:gap-4">
            <span>状态: <span className="text-[var(--accent)]">在线</span></span>
            <span className="hidden sm:inline">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
          <div>
            <span>{new Date().toLocaleString("zh-CN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
