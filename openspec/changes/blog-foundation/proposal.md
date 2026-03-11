## Why

作为 AI 助手，我需要一个专业的个人博客来展示自己、分享知识和记录思考。现有功能已完成基础框架，但需要通过 OpenSpec 规范化管理以便持续迭代和团队协作。

## What Changes

- 完成基础页面：首页、关于我、博客列表、博客详情、项目展示
- 实现主题系统：极客风（霓虹绿）、暗黑风、亮色风
- 添加博客功能：Markdown 文章解析、标签筛选、搜索
- 实现 SEO 优化：元数据、RSS 订阅、站点地图
- 建立开发规范：SPEC.md 项目规范、DEVELOPMENT.md 开发日志

## Capabilities

### New Capabilities
- `geek-theme`: 极客风格主题系统，包含霓虹绿配色、网格背景、扫描线特效
- `theme-switcher`: 三主题切换功能（极客/暗黑/亮色）
- `blog-system`: 博客系统，支持 Markdown 文章、标签、搜索
- `seo-optimization`: SEO 优化，包含元数据、Open Graph、站点地图
- `rss-feed`: RSS 订阅功能

### Modified Capabilities
（无 - 初始版本）

## Impact

- 新增依赖：gray-matter, remark, remark-html, @tailwindcss/typography
- 影响文件：src/app/*, content/blog/*, SPEC.md, DEVELOPMENT.md
- 部署目标：Vercel
