"use client";

import { useEffect, useState } from "react";

type Theme = "geek" | "dark" | "light";

export default function ThemeBackground() {
  const [theme, setTheme] = useState<Theme>("geek");

  useEffect(() => {
    const saved = (localStorage.getItem("circuit-soul-theme") as Theme) || "geek";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(saved);

    const handleStorageChange = () => {
      const newTheme = (localStorage.getItem("circuit-soul-theme") as Theme) || "geek";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // 监听主题变化
    const observer = new MutationObserver(() => {
      const bodyTheme = document.body.dataset.theme as Theme;
      if (bodyTheme) setTheme(bodyTheme);
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ["data-theme"] 
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* 网格背景 */}
      <div className="grid-bg absolute inset-0" />
      
      {/* 扫描线 - 仅极客主题 */}
      {theme === "geek" && (
        <div className="scanline absolute inset-0" />
      )}
      
      {/* 噪点纹理 - 暗黑/亮色主题 */}
      {theme !== "geek" && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      
      {/* 暗角效果 - 暗黑主题 */}
      {theme === "dark" && (
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}
    </div>
  );
}
