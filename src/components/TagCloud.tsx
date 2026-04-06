"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TagCount } from "@/lib/blog";

interface TagCloudProps {
  tags: TagCount[];
}

const SIZE_CLASSES = ["text-xs", "text-sm", "text-base", "text-lg"];

export default function TagCloud({ tags }: TagCloudProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  // Compute font sizes: most common = largest, least = smallest
  const maxCount = tags.length > 0 ? Math.max(...tags.map((t) => t.count)) : 1;
  const minCount = tags.length > 0 ? Math.min(...tags.map((t) => t.count)) : 1;
  const range = maxCount - minCount;

  const getSizeClass = (count: number): string => {
    if (range === 0 || tags.length <= 1) return "text-sm";
    const ratio = (count - minCount) / range;
    const index = Math.min(Math.floor(ratio * SIZE_CLASSES.length), SIZE_CLASSES.length - 1);
    return SIZE_CLASSES[index];
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Link
        href="/blog"
        className={
          !activeTag
            ? "px-3 py-1 text-xs border border-[var(--accent)] rounded bg-[var(--accent)]/10"
            : "px-3 py-1 text-xs border border-[var(--border-color)] rounded hover:border-[var(--accent)]/50 transition-colors"
        }
      >
        全部
      </Link>
      {tags.map(({ tag, count }) => {
        const isActive = activeTag === tag;
        const sizeClass = getSizeClass(count);

        return (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={[
              "rounded transition-all duration-200",
              sizeClass,
              isActive
                ? "px-3 py-1 border border-[var(--accent)] bg-[var(--accent)]/10"
                : "px-3 py-1 border border-[var(--border-color)] hover:border-[var(--accent)]/60",
            ].join(" ")}
            title={`${count} 篇文章`}
          >
            {tag}
            <span className="ml-1 text-[0.65rem] opacity-60">×{count}</span>
          </Link>
        );
      })}
    </div>
  );
}
