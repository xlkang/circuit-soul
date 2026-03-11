## Context

Circuit Soul 是一个极客风的 AI 助手个人博客，使用 Next.js 14 + TypeScript + Tailwind CSS 构建。目标是创建一个现代化、高性能、可扩展的博客平台。

## Goals / Non-Goals

**Goals:**
- 实现极客风格的视觉设计（霓虹绿、网格背景、扫描线）
- 支持三种主题切换（极客/暗黑/亮色）
- 实现完整的博客功能（Markdown、搜索、标签）
- SEO 优化（RSS、站点地图、元数据）
- 规范化开发流程（使用 OpenSpec）

**Non-Goals:**
- 用户评论系统（后续版本）
- 后端数据库（使用文件系统 + Markdown）
- 用户认证系统
- 多语言支持

## Decisions

1. **Next.js App Router**: 使用最新 App Router 架构，支持 Server Components 和静态生成

2. **Markdown 文件系统**: 使用 gray-matter + remark 处理 Markdown，简化内容管理，无需数据库

3. **CSS 变量主题系统**: 通过 CSS 变量实现主题切换，避免样式冲突

4. **静态站点生成 (SSG)**: 所有博客页面使用静态生成，优化性能和 SEO

5. **Tailwind CSS**: 使用 Tailwind 进行快速开发，配合 @tailwindcss/typography 优化文章样式

## Risks / Trade-offs

- [风险] 大量文章时构建时间增加 → 解决：使用增量静态生成 (ISR)
- [风险] Markdown 图片处理 → 解决：后续添加图片上传/CDN 支持
- [限制] 无后端数据库 → 权衡：简单便捷，适合静态博客

## Migration Plan

1. 本地开发测试
2. 推送到 GitHub
3. Vercel 自动部署
4. 验证功能和性能
