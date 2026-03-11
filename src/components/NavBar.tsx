"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/contact", label: "联系" },
];

interface NavBarProps {
  currentPath?: string;
}

export default function NavBar({ currentPath = "/" }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
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

      {/* 移动端菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 md:hidden border-b border-[var(--border-color)] bg-[var(--background)] z-50"
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
    </nav>
  );
}
