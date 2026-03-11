## Why

当前博客功能基础但缺乏互动性和视觉冲击力。为了提升用户体验和展示效果，需要增强页面交互、动画效果和视觉体验，同时遵循 Next.js 最佳实践进行性能优化。

## What Changes

- 添加页面切换动画效果
- 增强首页终端动画体验
- 添加滚动动画和过渡效果
- 优化深色/亮色主题细节
- 添加页面加载骨架屏
- 性能优化（图片优化、懒加载）
- 添加返回顶部按钮
- 添加阅读进度指示器

## Capabilities

### New Capabilities
- `page-animations`: 页面切换动画和过渡效果
- `scroll-animations`: 滚动触发动画
- `loading-skeleton`: 骨架屏加载体验
- `back-to-top`: 返回顶部按钮
- `reading-progress`: 阅读进度指示器

### Modified Capabilities
- `theme-switcher`: 优化深色/亮色主题细节

## Impact

- 新增依赖：framer-motion (动画库)
- 影响文件：src/app/*, src/components/*
- 需要遵循 Next.js 最佳实践进行性能优化
