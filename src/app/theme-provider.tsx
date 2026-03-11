"use client";

import { useEffect, useState, ReactNode } from "react";

import ThemeToggle from "@/components/ThemeToggle";

type Theme = "geek" | "dark" | "light";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("circuit-soul-theme") as Theme) || "geek";
    document.body.dataset.theme = saved;
  }, []);

  return (
    <div data-theme={mounted ? localStorage.getItem("circuit-soul-theme") || "geek" : "geek"}>
      {children}
      {mounted && (
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}
