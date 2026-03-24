"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${url}`
    : url;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-[var(--accent)]/60">分享到：</span>
      
      {/* Twitter/X */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors"
        aria-label="分享到 Twitter"
      >
        <span>🐦</span>
        <span>Twitter</span>
      </a>

      {/* 复制链接 */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[var(--border-color)] rounded hover:bg-[var(--accent)]/10 transition-colors"
        aria-label="复制链接"
      >
        <span>{copied ? "✓" : "🔗"}</span>
        <span>{copied ? "已复制" : "复制链接"}</span>
      </button>
    </div>
  );
}
