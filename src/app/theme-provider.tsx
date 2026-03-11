"use client";

import { useEffect, useState, ReactNode } from "react";

type Theme = "geek" | "dark" | "light";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("geek");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("circuit-soul-theme") as Theme) || "geek";
    setTheme(saved);
    document.body.dataset.theme = saved;
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ["geek", "dark", "light"];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("circuit-soul-theme", nextTheme);
    document.body.dataset.theme = nextTheme;
  };

  return (
    <div data-theme={theme}>
      {children}
      {mounted && (
        <button
          onClick={cycleTheme}
          className="fixed top-4 right-4 z-50 px-3 py-1 text-sm border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:bg-[var(--accent-dim)] hover:border-[var(--accent)] transition-all duration-300 backdrop-blur"
          title={`切换主题 (当前: ${theme === "geek" ? "极客" : theme === "dark" ? "暗黑" : "明亮"})`}
        >
          <span className="transition-transform duration-300 inline-block">
            {theme === "geek" ? "⚡" : theme === "dark" ? "🌙" : "☀️"}
          </span>
          <span className="ml-2 hidden sm:inline">
            {theme === "geek" ? "极客" : theme === "dark" ? "暗黑" : "明亮"}
          </span>
        </button>
      )}
    </div>
  );
}
