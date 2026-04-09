import Link from "next/link";
import type { RelatedPost } from "@/lib/blog";

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-color)]">
      <h2 className="text-sm font-bold text-[var(--accent)]/60 uppercase tracking-wider mb-4">
        相关文章
      </h2>
      <div className="grid gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 border border-[var(--border-color)] rounded-lg bg-[var(--card-bg)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all"
          >
            <h3 className="text-sm font-semibold text-[var(--accent)] group-hover:glow transition-all mb-1">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[var(--accent)]/50">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              {post.sharedTags.length > 0 && (
                <>
                  <span>·</span>
                  <span className="text-[var(--accent)]/40">
                    共同标签: {post.sharedTags.join(", ")}
                  </span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
