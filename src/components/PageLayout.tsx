"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/contact", label: "联系" },
];

interface PageLayoutProps {
  children: ReactNode;
  currentPath?: string;
}

export default function PageLayout({ children, currentPath = "/" }: PageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* 背景效果 */}
      <div className="fixed inset-0 grid-bg opacity-20" />
      <div className="fixed inset-0 scanline" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 导航 */}
        <nav className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[var(--border-color)] bg-[var(--background)]">
          <Link href="/" className="text-lg md:text-xl font-bold glow hover:text-[var(--accent)] transition-colors flex items-center gap-2">
            <span>⚡</span>
            <span className="hidden sm:inline">CIRCUIT SOUL</span>
          </Link>
          
          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-colors hover:text-[var(--accent)] ${
                  isActive(link.href) ? "text-[var(--accent)]" : "text-[var(--foreground)]/70"
                }`}
              >
                {link.label}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-b border-[var(--border-color)] bg-[var(--background)]"
            >
              <div className="flex flex-col p-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`px-4 py-3 text-sm rounded transition-colors ${
                      isActive(link.href) 
                        ? "bg-[var(--accent-dim)] text-[var(--accent)]" 
                        : "hover:bg-[var(--accent-dim)]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主内容 */}
        <main className="flex-1">
          {children}
        </main>

        {/* 底部状态栏 */}
        <div className="px-4 md:px-6 py-2 md:py-3 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between text-xs text-[var(--accent)]/50 gap-1 md:gap-0">
          <span>状态: <span className="text-[var(--accent)]">在线</span></span>
          <span>{new Date().toLocaleString("zh-CN")}</span>
        </div>
      </div>
    </div>
  );
}
