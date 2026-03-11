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

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    
    const lowerQuery = query.toLowerCase();
    return posts.filter((post) => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query, posts]);

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <section>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章标题、内容或标签..."
            className="w-full px-4 py-3 pl-12 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors text-[var(--foreground)] placeholder:text-[var(--accent)]/30"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)]/50">
            🔍
          </span>
        </div>
        {query && (
          <p className="mt-2 text-sm text-[var(--accent)]/50">
            找到 {filteredPosts.length} 篇文章
          </p>
        )}
      </section>

      {/* 文章列表 */}
      <section className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 border border-[var(--border-color)] rounded bg-[var(--card-bg)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 transition-all group"
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
