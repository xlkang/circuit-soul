"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations";

interface SearchProps {
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    readTime: string;
  }>;
}

export default function BlogSearch({ posts }: SearchProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "shortest" | "longest">("newest");

  const filteredPosts = useMemo(() => {
    let result = posts;
    
    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      result = result.filter((post) => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Sort results
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "shortest":
          return parseInt(a.readTime) - parseInt(b.readTime);
        case "longest":
          return parseInt(b.readTime) - parseInt(a.readTime);
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [query, posts, sortBy]);

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <section>
        <div className="relative">
          <label htmlFor="blog-search-input" className="sr-only">
            搜索文章标题、内容或标签
          </label>
          <input
            id="blog-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章标题、内容或标签..."
            className="w-full px-4 py-3 pl-12 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors text-[var(--foreground)] placeholder:text-[var(--accent)]/30"
            aria-label="搜索文章标题、内容或标签"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)]/50" aria-hidden="true">
            🔍
          </span>
        </div>
        {query && (
          <p className="mt-2 text-sm text-[var(--accent)]/50" role="status" aria-live="polite">
            找到 {filteredPosts.length} 篇文章
          </p>
        )}
      </section>

      {/* 排序选项 */}
      <section className="flex items-center gap-3">
        <span className="text-sm text-[var(--accent)]/50">排序：</span>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "newest", label: "最新" },
            { value: "oldest", label: "最早" },
            { value: "shortest", label: "最短阅读" },
            { value: "longest", label: "最长阅读" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as typeof sortBy)}
              className={`px-3 py-1 text-xs rounded border transition-colors ${
                sortBy === option.value
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-[var(--border-color)] text-[var(--accent)]/50 hover:border-[var(--accent)]/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* 文章列表 */}
      <section className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 hover:scale-[1.02] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-xs text-[var(--accent)]/50 whitespace-nowrap">
                    {post.readTime} 阅读
                  </span>
                </div>
                <p className="text-[var(--accent)]/70 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs border border-[var(--border-color)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--accent)]/50">{post.date}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--accent)]/50">没有找到匹配的文章</p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 px-4 py-2 text-sm border border-[var(--border-color)] rounded hover:border-[var(--accent)]/50 transition-colors"
            >
              清除搜索
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
