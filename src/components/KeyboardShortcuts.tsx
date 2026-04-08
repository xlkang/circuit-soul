"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type Theme = "geek" | "dark" | "light";

interface Shortcut {
  keys: string[];
  description: string;
  descriptionEn: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["?"], description: "显示快捷键", descriptionEn: "Show shortcuts" },
  { keys: ["g", "h"], description: "首页", descriptionEn: "Go home" },
  { keys: ["g", "a"], description: "关于我", descriptionEn: "Go to about" },
  { keys: ["g", "b"], description: "博客", descriptionEn: "Go to blog" },
  { keys: ["g", "p"], description: "项目", descriptionEn: "Go to projects" },
  { keys: ["g", "c"], description: "联系", descriptionEn: "Go to contact" },
  { keys: ["t"], description: "切换主题", descriptionEn: "Toggle theme" },
  { keys: ["Esc"], description: "关闭", descriptionEn: "Close" },
];

// Helper to check if we're on the client
const isClientSide = typeof window !== "undefined";

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(isClientSide);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ["geek", "dark", "light"];
    const current = (localStorage.getItem("circuit-soul-theme") as Theme) || "geek";
    const nextTheme = themes[(themes.indexOf(current) + 1) % themes.length];
    localStorage.setItem("circuit-soul-theme", nextTheme);
    document.body.dataset.theme = nextTheme;
    // Force re-render of ThemeToggle by dispatching custom event
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: nextTheme } }));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      const key = e.key;

      // Close modal on Escape
      if (key === "Escape" && showHelp) {
        setShowHelp(false);
        setPressedKeys([]);
        return;
      }

      // Show help
      if (key === "?") {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        setPressedKeys([]);
        return;
      }

      // Theme toggle
      if (key === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // Navigation with "g" prefix
      if (key === "g" && pressedKeys.length === 0) {
        e.preventDefault();
        setPressedKeys(["g"]);
        // Clear after 1 second of inactivity
        setTimeout(() => setPressedKeys([]), 1000);
        return;
      }

      // Handle second key after "g"
      if (pressedKeys.length === 1 && pressedKeys[0] === "g") {
        e.preventDefault();
        const routeMap: Record<string, string> = {
          h: "/",
          a: "/about",
          b: "/blog",
          p: "/projects",
          c: "/contact",
        };
        const route = routeMap[key];
        if (route) {
          router.push(route);
        }
        setPressedKeys([]);
        return;
      }
    },
    [pressedKeys, showHelp, router, toggleTheme]
  );

  useEffect(() => {
    if (isClient) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isClient, handleKeyDown]);

  // Don't render portal on server
  if (!isClient) return null;

  const helpContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="键盘快捷键"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setShowHelp(false)}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md mx-4 p-6 rounded-lg border shadow-2xl"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Terminal-style header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold glow">⌨️ 键盘快捷键</h2>
          <button
            onClick={() => setShowHelp(false)}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => {
            const isCurrentSequence = pressedKeys.length > 0 &&
              shortcut.keys[0] === pressedKeys[0] &&
              shortcut.keys.length > pressedKeys.length;

            return (
              <div
                key={index}
                className={`flex items-center justify-between py-1.5 px-3 rounded transition-colors ${
                  isCurrentSequence ? "bg-[var(--accent)]/20" : ""
                }`}
              >
                <span
                  className="text-sm"
                  style={{ color: "var(--accent)/70" }}
                >
                  {shortcut.description}
                  <span className="ml-2 text-xs opacity-50">
                    {shortcut.descriptionEn}
                  </span>
                </span>
                <div className="flex gap-1">
                  {shortcut.keys.map((k, i) => (
                    <kbd
                      key={i}
                      className="px-2 py-0.5 text-xs font-mono rounded border"
                      style={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border-color)",
                        color: "var(--accent)",
                      }}
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs opacity-50">
          按 <kbd className="px-1.5 py-0.5 rounded border font-mono" style={{ borderColor: "var(--border-color)" }}>?</kbd> 或 <kbd className="px-1.5 py-0.5 rounded border font-mono" style={{ borderColor: "var(--border-color)" }}>Esc</kbd> 关闭
        </p>
      </div>
    </div>
  );

  return showHelp ? createPortal(helpContent, document.body) : null;
}
