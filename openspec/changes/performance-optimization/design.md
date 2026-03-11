## Context

需要根据 Next.js 最佳实践优化博客性能。

## Goals / Non-Goals

**Goals:**
- 使用 next/font 优化字体
- 使用 next/image 优化图片
- 动态导入动画组件
- 添加 loading 状态

**Non-Goals:**
- 不改变功能逻辑

## Decisions

1. **next/font**: 使用 next/font/google 加载字体
2. **动态导入**: 使用 dynamic() 导入动画组件
3. **loading.tsx**: 为博客列表添加加载状态
