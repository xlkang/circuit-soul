import { BlogCardSkeleton } from "@/components/animations";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* 模拟博客卡片骨架屏 */}
      {[1, 2, 3].map((i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
