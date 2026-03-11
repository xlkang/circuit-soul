"use client";

import { useState, useEffect } from "react";

type Theme = "geek" | "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("geek");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("circuit-soul-theme") as Theme;
    if (saved) setTheme(saved);
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ["geek", "dark", "light"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("circuit-soul-theme", nextTheme);
    
    // 应用主题到 body
    document.body.dataset.theme = nextTheme;
  };

  const getIcon = () => {
    switch (theme) {
      case "geek": return "⚡";
      case "dark": return "🌙";
      case "light": return "☀️";
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={cycleTheme}
      className="px-3 py-1 text-sm border border-[#00ff41]/30 rounded hover:bg-[#00ff41]/10 transition-all"
      title={`当前主题: ${theme}`}
    >
      {getIcon()} {theme === "geek" ? "极客" : theme === "dark" ? "暗黑" : "明亮"}
    </button>
  );
}
