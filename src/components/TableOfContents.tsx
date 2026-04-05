"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Intersection Observer for active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="toc border border-[var(--border-color)] rounded bg-[var(--card-bg)] p-4"
      aria-label="文章目录"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]/60">
          目录
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[var(--accent)]/40 hover:text-[var(--accent)]/70 transition-colors text-xs"
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? "[+]" : "[-]"}
        </button>
      </div>

      {/* TOC List */}
      {!isCollapsed && (
        <ul className="space-y-1.5">
          {headings.map(({ level, text, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`
                  block text-xs transition-colors py-0.5
                  ${level === 3 ? "pl-4" : ""}
                  ${
                    activeId === id
                      ? "text-[var(--accent)] font-medium"
                      : "text-[var(--accent)]/50 hover:text-[var(--accent)]/80"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Update URL hash without jumping
                    window.history.pushState(null, "", `#${id}`);
                    setActiveId(id);
                  }
                }}
              >
                <span className="mr-1.5 text-[var(--accent)]/30">{level === 2 ? "■" : "·"}</span>
                {text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
