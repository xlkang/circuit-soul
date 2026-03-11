## Context

Circuit Soul 博客需要提升用户体验和视觉吸引力。当前博客功能完整但缺乏动效和交互细节。

## Goals / Non-Goals

**Goals:**
- 添加流畅的页面切换动画
- 实现滚动触发动画效果
- 改善首次加载体验（骨架屏）
- 优化深色/亮色主题细节
- 添加实用交互功能（返回顶部、阅读进度）

**Non-Goals:**
- 不添加复杂的 3D 效果
- 不添加视频/音频播放
- 不添加用户评论系统（后续版本）

## Decisions

1. **Framer Motion**: 使用 Framer Motion 处理动画，React 生态最成熟的动画库

2. **客户端动画**: 所有动画在客户端执行，不影响服务端渲染性能

3. **CSS 优先**: 简单动画使用 CSS，复杂交互使用 Framer Motion

4. **性能优先**: 动画使用 `will-change` 优化，使用 `prefers-reduced-motion` 尊重用户偏好

## Risks / Trade-offs

- [风险] 过多动画影响性能 → 解决：使用 CSS transform 和 opacity，避免 layout shifts
- [风险] 动画库增加 bundle 大小 → 解决：使用动态导入 `dynamic()` 加载动画组件

## Migration Plan

1. 安装 framer-motion
2. 创建动画组件
3. 应用到各个页面
4. 测试和优化
