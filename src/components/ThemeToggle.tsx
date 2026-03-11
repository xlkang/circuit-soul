"use client";

import { useState, useEffect } from "react";

type Theme = "geek" | "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("geek");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("circuit-soul-theme") as Theme;
    if (saved) {
      setTheme(saved);
      document.body.dataset.theme = saved;
    }
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ["geek", "dark", "light"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("circuit-soul-theme", nextTheme);
    document.body.dataset.theme = nextTheme;
  };

  const getIcon = () => {
    switch (theme) {
      case "geek": return "⚡";
      case "dark": return "🌙";
      case "light": return "☀️";
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "geek": return "极客";
      case "dark": return "暗黑";
      case "light": return "明亮";
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-300 hover:scale-105"
      title={`当前主题: ${theme}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        color: 'var(--foreground)',
      }}
    >
      <span className="mr-2">{getIcon()}</span>
      {getLabel()}
    </button>
  );
}
