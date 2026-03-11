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

  // 提供给子组件的上下文
  return (
    <div data-theme={theme}>
      {children}
      {mounted && (
        <button
          onClick={cycleTheme}
          className="fixed top-4 right-4 z-50 px-3 py-1 text-sm border border-[#00ff41]/30 rounded bg-black/50 hover:bg-[#00ff41]/10 transition-all backdrop-blur"
          title={`切换主题 (当前: ${theme === "geek" ? "极客" : theme === "dark" ? "暗黑" : "明亮"})`}
        >
          {theme === "geek" ? "⚡" : theme === "dark" ? "🌙" : "☀️"}
        </button>
      )}
    </div>
  );
}
