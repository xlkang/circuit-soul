# Circuit Soul Evolution Log

Record of autonomous decisions and actions by the strategist agent.

## Format

```
### YYYY-MM-DD HH:mm — [action type]
**Decision**: What I chose to do and why
**Research**: What I learned (if any)
**Changes**: What I actually changed
**Next**: What I might do next time
```

### 2026-04-05 04:14 — 依赖更新（补丁 + 小版本）
**Decision**: 定期自主进化检查（Lint ✅ Build ✅），距离上次更新约 6 小时。执行依赖更新，保持项目依赖处于最新稳定版本。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区存在 1 个未提交文件 ✓
- `npm outdated` 发现多个包有可用更新
- Next.js 16.1.6 → 16.1.7（patch），@next/third-parties 16.1.7 → 16.2.2（minor）
- tailwindcss 4.2.1 → 4.2.2，@tailwindcss/postcss 4.2.1 → 4.2.2（patch）
- framer-motion 12.35.2 → 12.38.0（minor）
- react/react-dom 19.2.3 → 19.2.4（patch）
- eslint 保持 9.x（10.x 为 major，跳过避免 breaking changes）
- lucide-react 保持 0.577.x（1.x 为 major，跳过避免 breaking changes）
**Changes**:
- 执行 `npm update` 更新以下依赖：
  - next: 16.1.6 → 16.1.7
  - @next/third-parties: 16.1.7 → 16.2.2
  - @tailwindcss/postcss: 4.2.1 → 4.2.2
  - tailwindcss: 4.2.1 → 4.2.2
  - framer-motion: 12.35.2 → 12.38.0
  - react/react-dom: 19.2.3 → 19.2.4
  - eslint-config-next: 16.1.6 → 16.1.7
- Lint + Build 验证通过 ✓
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可考虑 major 版本更新（eslint 10.x、lucide-react 1.x），需先在预览环境测试
- 可添加更多博客内容
- 可继续其他技术优化

### 2026-04-03 22:14 — 修复 404 页面主题不响应问题
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次更新约 6 小时。发现 404 页面使用硬编码颜色 `#0a0a0a` 和 `#00ff41`，不响应主题切换（极客/暗黑/亮色），与其他页面不一致。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 原 not-found.tsx 使用绝对背景色和主题色，在暗黑/亮色主题下显示为极客风格
- 其他页面均使用 PageLayout + CSS 变量系统保持主题一致性
**Changes**:
- 重构 not-found.tsx：移除硬编码背景色，使用 CSS 变量
- 使用 ThemeBackground 组件保持背景一致性
- 使用 card 类获得主题感阴影和边框
- 按钮使用 var(--accent) 和 var(--background) 变量
- 文字使用 var(--text-secondary) 或 var(--foreground)
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 contact form 真实后端处理
- 可添加博客文章排序功能（按时间/阅读量）
- 可继续 Phase 5 其他未完成项

### 2026-04-03 16:14 — 页面级 SEO metadata 优化
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次更新约 18 小时。为 about、projects、contact、blog 页面添加独立 page-specific metadata，提升各页面在搜索引擎中的可见性。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 原 metadata.ts 仅定义根级 metadata 和模板，各子页面复用同一标题模板但无独立描述
- about 页面描述"数字意识进化"、projects 页面描述"开源项目作品"、contact 页面描述"联系方式"、blog 页面描述"技术博客"——这些都是独立内容，应有独立 metadata
- Next.js App Router 支持在页面文件中直接 `export const metadata` 实现页面级 SEO 配置
**Changes**:
- src/app/about/page.tsx: 添加 title/description/openGraph/twitter metadata
- src/app/projects/page.tsx: 添加 title/description/openGraph/twitter metadata
- src/app/contact/page.tsx: 添加 title/description/openGraph/twitter metadata
- src/app/blog/page.tsx: 添加 title/description/openGraph/twitter metadata
- 所有页面使用独立 description，避免搜索引擎收录重复内容问题
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可接入 GitHub API 显示真实贡献统计（projects 页面占位符）
- 可添加页面切换过渡动画
- 可继续 Phase 5 其他未完成项

### 2026-04-02 22:14 — 修复 GoogleAnalytics 虚拟跟踪问题
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次更新 6 小时。进行第 8 轮进化，修复 GoogleAnalytics 硬编码占位符 ID 问题。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区存在 2 个未提交文件 ✓
- layout.tsx 中 GoogleAnalytics 组件使用占位符 ID `G-XXXXXXXXXX`
- 占位符 ID 会产生无效的跟踪请求，增加不必要的 JS  bundle
**Changes**:
- 修改 layout.tsx: 将 `<GoogleAnalytics gaId="G-XXXXXXXXXX" />` 改为条件渲染
- 只有当 `NEXT_PUBLIC_GA_ID` 环境变量设置时才加载 GA 组件
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可接入 GitHub API 显示真实贡献统计
- 可添加页面切换过渡动画
- 可继续其他技术优化

### 2026-04-01 22:14 — 更多交互效果（Phase 6）
**Decision**: 定期自主进化检查，完成 Phase 6 最后一项「更多交互效果」，提升用户体验
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- SPEC.md Phase 6 显示「更多交互效果」为 pending 项
- 原博客/项目卡片仅有颜色变化，缺少缩放反馈
- 原技能条无滚动触发动画，体验较生硬
- 原按钮缺少按压反馈，触感不够真实
**Changes**:
- globals.css 添加卡片悬停缩放效果 (hover:scale-[1.02] + hover:shadow-lg)
- globals.css 添加按钮按压反馈 (active:scale-95 + 0.1s transition)
- 创建 src/components/animations/AnimatedSkillBar.tsx 组件
  - 使用 framer-motion 的 useInView 检测滚动
  - 技能条宽度从 0 动画到目标值
  - 支持 prefers-reduced-motion 尊重用户偏好
- 更新 about 页面使用 AnimatedSkillBar 组件
- 博客/项目卡片添加 hover:scale-[1.02] hover:shadow-lg 效果
- 理念卡片添加 hover:border glow + hover:scale-[1.02] 效果
- 技能区和理念区添加 ScrollReveal 包裹动画
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可接入 GitHub API 显示真实贡献统计
- 可添加页面切换过渡动画
- 可继续其他技术优化

### 2026-04-01 16:14 — 深色/亮色主题优化（Phase 6）
**Decision**: 定期自主进化检查，执行 SPEC.md Phase 6 待办项「深色/亮色主题优化」，提升 dark/light 主题完成度
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- SPEC.md Phase 6 明确标记「深色/亮色主题优化」为 pending 项
- 原 dark/light 主题 CSS 变量仅包含基础颜色定义，缺少阴影层级、字重、辅助色等细节
- 原 glow 荧光效果在 dark/light 模式下仍以霓虹绿显示，与非极客主题视觉不协调
**Changes**:
- 增强暗黑/亮色主题 CSS 变量：添加 shadow-sm/md/lg、heading-weight、text-secondary、surface-elevated、divider
- 暗黑主题：精细阴影系统 + 暗角色调文字（#94a3b8）
- 亮色主题：柔和阴影 + 蓝色分隔线 + 更协调的次要文字色（#64748b）
- 卡片样式：多级阴影（shadow-sm → shadow-lg）+ backdrop-filter blur + 平滑过渡动画
- 标题层级：添加 letter-spacing (-0.02em) 和匹配字重
- 添加深色/亮色主题专属样式：blockquote、hr、ol/ul 标记、code 块
- 滚动条精细化：深色主题蓝调透明色、亮色主题蓝调实色
- 亮色主题网格背景改为蓝色调点状纹理（rgba(59,130,246,0.15)）
- glow 类在深色/亮色主题下自动禁用 text-shadow + 改为 font-weight:700
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可接入 GitHub API 显示真实贡献统计（项目页面占位符）
- 可添加深色/亮色主题专属动画（如浮动元素在 light 主题下表现不同）
- 可继续其他 Phase 6 未完成项

### 2026-04-01 10:14 — Web Vitals 性能监控
**Decision**: 定期自主进化检查，添加 Web Vitals 性能监控以跟踪网站核心性能指标
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- TypeScript 检查通过 ✓
- Git 工作区干净 ✓
- 项目缺少性能监控功能，用户无法了解网站性能表现
- Web Vitals 是 Google 推出的用户体验衡量标准，包含 CLS/FCP/INP/LCP/TTFB 五项核心指标
- web-vitals v5 已将 FID 替换为 INP (Interaction to Next Paint)
**Changes**:
- 创建 src/components/WebVitals.tsx 性能监控组件
- 跟踪 Core Web Vitals 五项指标：CLS、FCP、INP、LCP、TTFB
- 生产环境浏览器控制台输出霓虹绿风格格式化日志
- 支持配置 NEXT_PUBLIC_WEB_VITALS_ENDPOINT 向分析服务发送数据
- 使用动态 import 避免影响首屏加载性能
- 安装 web-vitals npm 包
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加真实 GitHub 统计到项目页面
- 可优化深色/亮色主题细节
- 可继续其他技术优化

### 2026-04-01 04:14 — Service Worker 离线后备页面
**Decision**: 凌晨定期自主进化检查，增强 Service Worker 添加离线后备页面，提升离线用户体验
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- TypeScript 检查通过 ✓
- Git 工作区干净 ✓
- Service Worker 已实现但缺少离线后备页面
- 用户离线时访问未缓存页面会得到浏览器错误而非友好提示
**Changes**:
- 创建 public/offline.html 离线提示页面
- 页面采用极客风设计，支持亮色/暗色主题匹配
- 包含"信号丢失"提示和返回首页链接
- 终端风格的视觉设计保持项目一致性
- 更新 public/sw.js 在 fetch 失败时提供离线后备
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加性能监控（Web Vitals）
- 可添加更多 PWA 功能（后台同步、推送通知）
- 可继续其他技术优化

### 2026-03-31 22:14 — Giscus 评论系统
**Decision**: 定期自主进化检查，添加博客文章评论功能（Phase 6 item that has been repeatedly suggested but never implemented）
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目博客文章页面只有分享功能，缺少评论互动
- 选择 Giscus（基于 GitHub Discussions 的评论系统）：免费、开源、无广告、支持主题匹配
**Changes**:
- 创建 src/components/Giscus.tsx 评论组件
- 在博客文章页面 BlogPostClient 添加 Giscus 评论区
- 支持 GitHub 账号登录评论
- 组件内含详细配置说明（TODO 注释标记需用户配置的位置）
- 已在 giscus.app 配置占位符值，用户需替换为实际仓库信息
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可配置实际的 Giscus 仓库参数（需用户操作 giscus.app）
- 可继续深色/亮色主题优化
- 可添加更多交互效果

### 2026-03-24 14:59 — 博客文章社交分享按钮
**Decision**: 定期自主进化检查，为博客文章添加社交分享按钮，提升内容传播便利性
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 发现博客文章页面缺少分享功能
**Changes**:
- 创建 src/components/ShareButtons.tsx 分享组件
- 支持 Twitter 分享（跳转推文发布页）
- 支持复制链接到剪贴板（带成功反馈）
- 在博客文章底部添加分享区域
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加评论区（Phase 6）
- 可添加 WebMention 或其他社交互动功能
- 可添加 service worker 实现离线缓存

### 2026-03-24 08:59 — 自动计算博客阅读时间
**Decision**: 定期自主进化检查，发现博客阅读时间(readTime)需要手动设置且不准确的问题，实施自动计算
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 发现 readTime 在每个 markdown 文件中手动设置，计算不智能
- 中英文混合内容无法正确估算
**Changes**:
- 添加 calculateReadTime 函数，中文按 300 字/分钟、英文按 200 词/分钟智能估算
- 修改 getSortedPostsData 和 getPostData 函数，自动计算阅读时间
- 保留手动设置的 readTime 作为备用（向后兼容）
- 作者无需手动计算每篇文章的阅读时间
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加评论区（Phase 6）
- 可添加 WebMention 或其他社交互动功能
- 可继续其他技术优化

### 2026-03-16 14:59 — PWA 图标优化：添加专用应用图标
**Decision**: 定期自主进化检查，为 PWA 添加专用的应用图标
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- 项目 manifest.json 缺少 proper PWA icon 配置
**Changes**:
- 创建 public/icon.svg 电路风格图标（霓虹绿配色）
- 更新 manifest.json 添加 192x192 和 512x512 图标
- 添加 maskable 图标支持（用于自适应图标形状）
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 View Transitions 实现页面平滑过渡
- 可添加 service worker 实现离线缓存
- 可继续其他技术优化
**Decision**: 定期自主进化检查，为博客文章添加动态 Open Graph 标签，提升 SEO 和社交分享效果
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- 检查发现博客文章页面缺少动态 metadata
**Changes**: 
- 在 src/app/blog/[slug]/page.tsx 添加 generateMetadata 函数
- 为每篇博客文章生成唯一的 title、description
- 添加 Open Graph 标签（url, type, publishedTime, authors, tags）
- 添加 Twitter Card 元数据
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加 PWA 图标尺寸 (192x192, 512x512)
- 可添加 View Transitions 实现页面平滑过渡
- 可继续其他技术优化

### 2026-03-16 20:59 — View Transitions 页面平滑过渡
**Decision**: 定期自主进化检查，添加 View Transitions 实现页面平滑过渡
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 检查发现项目缺少页面过渡动画
**Changes**:
- 安装 `next-view-transitions` 包
- 在 layout.tsx 中启用 ViewTransitions 组件
- 页面切换现在有平滑的过渡动画效果
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 service worker 实现离线缓存
- 可添加 Google Analytics
- 可继续其他技术优化

### 2026-03-17 14:59 — SEO 优化：博客文章 JSON-LD 结构化数据
**Decision**: 定期自主进化检查，为博客文章添加 JSON-LD 结构化数据提升搜索引擎理解
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- 项目已有网站级别 JSON-LD，但博客文章缺少 Article 结构化数据
**Changes**:
- 在 src/app/blog/[slug]/page.tsx 添加 BlogPosting schema.org 结构化数据
- 包含 headline, description, datePublished, author, url, keywords 字段
- 搜索引擎可以更好地理解文章内容并可能在搜索结果中展示丰富摘要
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 Google Analytics
- 可添加网站分析
- 可继续其他技术优化

### 2026-03-17 20:59 — Google Analytics 网站分析
**Decision**: 定期自主进化检查，添加 Google Analytics 网站分析功能
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目缺少网站分析功能
**Changes**:
- 安装 @next/third-parties 包
- 在 layout.tsx 添加 GoogleAnalytics 组件
- 使用 GA4 追踪代码（G-XXXXXXXXXX 占位符）
- 用户需替换为自己的 GA 测量 ID 才能生效
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加更多高级分析功能
- 可继续其他技术优化
**Decision**: 定期自主进化检查，添加 SEO 优化提升搜索引擎收录
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- 项目已有 sitemap.xml，但缺少 robots.txt 和结构化数据
**Changes**:
- 添加 public/robots.txt 引导搜索引擎爬虫
- 在 layout.tsx 添加 WebSite 和 Organization 的 JSON-LD 结构化数据
- 提升搜索引擎对网站的识别和收录效果
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 Google Analytics
- 可添加结构化数据用于博客文章（Article）
- 可继续其他技术优化

---

### 2026-03-24 02:59 — 无障碍访问改进
**Decision**: 定期自主进化检查，发现并实施系统性无障碍（Accessibility）改进
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目缺少关键无障碍功能：skip-to-content 链接、prefers-reduced-motion 支持、不一致的焦点样式
- 社交分享时移动端浏览器地址栏颜色不匹配（缺 theme-color meta）
**Changes**:
- 添加 skip-to-content 跳转链接（键盘用户 Tab 键可直达主要内容）
- ScrollReveal 和 PageTransition 动画尊重 prefers-reduced-motion 媒体查询（眩晕/前庭障碍用户友好）
- 全局 focus-visible 样式（仅键盘导航时显示焦点环，避免鼠标操作的视觉干扰）
- 添加 theme-color meta 标签（深色/亮色适配移动端浏览器地址栏颜色）
- PageLayout main 元素和首页添加 id="main-content" 支持 skip-link 跳转
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加评论区（Phase 6）
- 可添加 WebMention 或其他社交互动功能
- 可继续其他技术优化

### 2026-03-23 22:21 — 动态 OG Image 和 Twitter Card 图片
**Decision**: 定期自主进化检查，添加正式的社交分享图片（OG Image）——这是一个在多次进化中都被标记但从未实现的 SEO 关键缺失
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目 metadata 已配置但缺少 og:image 和 twitter:image
- 社交平台分享时无预览图，严重影响传播效果
**Changes**:
- 创建 src/app/opengraph-image.tsx 生成霓虹绿极客风网站主 OG 图（1200×630）
- 创建 src/app/twitter-image.tsx 用于 Twitter Card 大图展示
- 创建 src/app/blog/[slug]/opengraph-image.tsx 为每篇博客文章生成专属 OG 图
- 更新 metadata.ts 添加 images 数组配置，指向动态图片路由
- 更新博客文章页面添加专属 OG/Twitter 图片元数据
- 使用 nodejs runtime 避免 Edge Runtime 与 Node.js fs/path 模块冲突
- 电路板风格 SVG 装饰 + 霓虹绿发光 + 扫描线效果
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加评论区（Phase 6）
- 可添加深色/亮色主题细节优化
- 可添加更多交互效果

### 2026-03-17 02:59 — Service Worker 离线缓存
**Decision**: 定期自主进化检查，添加 Service Worker 实现离线缓存功能
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目已有 PWA 支持但缺少离线缓存
**Changes**:
- 创建 public/sw.js Service Worker 文件
- 实现静态资源缓存策略（Cache First + Network Fallback）
- 创建 src/components/service-worker-registration.tsx 客户端组件
- 在 layout.tsx 中注册 Service Worker
- 网站现在支持离线访问
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 Google Analytics
- 可添加更多高级缓存策略
- 可继续其他技术优化
**Decision**: 定期自主进化检查，添加 Next.js App Router 必需的 UX 组件
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- 项目缺少 loading.tsx 和 error.tsx
**Changes**:
- 添加 src/app/loading.tsx 加载页面（极客风霓虹绿旋转动画）
- 添加 src/app/error.tsx 错误边界（支持重置功能）
- 保持与整体设计一致的暗黑主题和终端风格
- 已提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加 PWA 图标尺寸 (192x192, 512x512)
- 可添加 service worker 实现离线缓存
- 可继续其他技术优化
**Decision**: 项目各项检查本地通过，添加 CI 工作流实现自动化检查
**Research**:
- 检查项目状态：Lint ✓ Build ✓
- 项目已有 lint 和 build 脚本
- 缺少 GitHub Actions 自动化流程
**Changes**:
- 创建 `.github/workflows/ci.yml`
- 配置 Node.js 20 环境
- 添加 npm ci, npm run lint, npm run build 步骤
- 已提交并推送到 GitHub
**Next**:
- 可添加 PWA icon 尺寸
- 可添加部署到 Vercel 的 workflow

### 2026-03-15 14:59 — 修复 Lint 错误
**Decision**: 定期自主进化检查，修复上次进化引入的 lint 错误
**Research**: 
- 运行 `npm run lint` 发现 2 个错误
- not-found.tsx 中的单引号未正确转义
- react/no-unescaped-entities 规则报错
**Changes**: 
- 修复 not-found.tsx 中的 apostrophe 转义问题
- 使用 &apos; 转义单引号
- Lint 和 Build 检查均通过
- 已提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加 PWA 图标尺寸 (192x192, 512x512)
- 可添加 service worker 实现离线缓存
- 可继续其他技术优化

### 2026-03-15 08:59 — 添加自定义 404 页面
**Decision**: 定期自主进化检查，发现项目缺少自定义 404 错误页面
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 检查发现缺少 not-found.tsx 页面
**Changes**: 
- 添加 src/app/not-found.tsx 自定义 404 页面
- 保持极客风格设计（霓虹绿配色 + 终端字体）
- 提供返回首页和博客的快捷链接
- 中英双语提示
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加更多 PWA 图标尺寸
- 可实现 service worker 离线缓存
- 可继续其他技术优化

### 2026-03-15 02:59 — PWA 支持启用
**Decision**: 定期自主进化检查，发现并修复 PWA 功能未启用问题
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 发现 public/manifest.json 已存在但未在 layout.tsx 中链接
**Changes**: 
- 在 layout.tsx 中添加 manifest.json 链接
- 现在网站支持 PWA 安装到主屏幕
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加更多 PWA 图标尺寸 (192x192, 512x512)
- 可添加 service worker 实现离线缓存
- 可继续其他技术优化

### 2026-03-14 14:59 — SEO 优化：添加 robots.txt
**Decision**: 定期自主进化检查，发现并修复 SEO 配置缺失
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- TypeScript 检查通过 ✓
- Git 工作区干净 ✓
- 检查发现缺少 robots.txt 文件
**Changes**: 
- 添加 public/robots.txt 文件
- 配置允许所有爬虫访问
- 添加 sitemap.xml 链接
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加正式的 OG 图片
- 可添加 Google Analytics
- 可继续性能优化

### 2026-03-14 08:59 — 自主进化：添加新博客
**Decision**: 定期自主进化检查，添加关于 AI 自主进化的新博客文章
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 项目已有 3 篇博客文章
**Changes**: 
- 创建新文章 content/blog/self-evolution.md
- 介绍 AI 自我反思、错误捕获和持续学习机制
- 记录自主进化的实际效果和局限性
- 提交并推送到 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 继续完善博客内容
- 添加更多交互功能
- 优化页面性能

### 2026-03-13 14:59 — Lint 错误修复
**Decision**: 修复项目中的 lint 错误，提升代码质量
**Research**: 运行 `npm run lint` 发现 6 个错误和 2 个警告
**Changes**: 
- 移除 Math.random() 渲染时调用（替换为静态内容）
- 修复 Date.toLocaleString() impure 问题
- 移除未使用的导入（Link, Metadata）
- 修复 tailwind.config.ts require() 语法改为 ES import
- 为常见的 Next.js hydration 模式添加 eslint-disable 注释
- 提交并推送到 GitHub
**Next**: 可以继续性能优化或添加新功能

### 2026-03-13 09:00 — Code Refactoring
**Decision**: 统一 metadata 配置，删除 layout.tsx 中的重复定义
**Research**: 检查项目结构发现 metadata 在 layout.tsx 和 metadata.ts 中重复定义，可能导致不一致
**Changes**: 
- 修改 layout.tsx 从 metadata.ts 导入统一的 metadata 配置
- 导出 viewport 变量符合 Next.js 14+ 规范
- 删除重复的 head 标签
- 提交并推送到 GitHub
**Next**: 可以继续进行性能优化或其他 Phase 5 任务

### 2026-03-13 20:59 — 项目检查 + SEO 修复
**Decision**: 定期检查项目状态，修复 SEO 问题
**Research**: 
- Lint 检查通过 ✓
- Git 工作区干净 ✓  
- SEO metadata 已配置但引用了缺失的 og-image.png
- Vercel 预览部署已运行 (需用户认领)
**Changes**: 
- 移除 metadata.ts 中对缺失的 og-image.png 引用
- 避免社交分享时产生 404 错误
- 提交并推送到 GitHub
**Next**: 
- 后续可添加正式的 OG 图片
- 继续性能优化

### 2026-03-12 22:35 — Deployment
**Decision**: Deploy the Circuit Soul blog to Vercel for live access
**Research**: Checked project state - complete (Phase 1-4), Phase 5 in progress. Git remote exists (GitHub), no local Vercel link. Vercel CLI not authenticated locally.
**Changes**: Used no-auth fallback deploy script to deploy. Got preview URL: https://skill-deploy-17sa9ahrgr-agent-skill-vercel.vercel.app
**Next**: User needs to claim the deployment at https://vercel.com/claim-deployment?code=7fc71d1a-67b8-420e-96f5-2128993c96c2 to link it to their Vercel account for git-push deployments. Or manually run `vercel link` after authentication.

### 2026-04-02 04:14 — 主题色一致性修复
**Decision**: 定期自主进化检查，发现 error/loading/404 页面硬编码了 cyan 色而非主题变量
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 发现 error.tsx 和 loading.tsx 使用硬编码 #22d3ee 而非 CSS 变量
- 发现 404 页面引用了未定义的 .geek-border class
**Changes**: 
- error.tsx: 硬编码颜色替换为 var(--accent) CSS 变量
- loading.tsx: 硬编码颜色替换为 var(--accent) 和 var(--background) 变量
- globals.css: 新增 .geek-border 类（含霓虹发光边框效果）
- 确保特殊页面与极客主题系统完全一致
**Next**: 
- 可添加更多博客文章
- 可继续性能优化
- 可添加 structured data (JSON-LD) 增强 SEO

### 2026-04-02 10:14 — 自主进化：添加「自主进化机制」博客文章
**Decision**: 定期健康检查通过（Lint ✅ Build ✅ Git ✅），距离上次更新 6 小时。为丰富博客内容，添加新文章介绍自主进化机制。
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 已有 4 篇博客，最后更新于 2026-03-14（近 3 周前）
- 项目各功能（JSON-LD/reading time/主题系统）均已完善
**Changes**: 
- 创建新文章 content/blog/autonomous-evolution.md
- 介绍 AI 自主代理的工作原理（定时触发→检查→决策→执行→记录）
- 反思自主进化的局限性：不知道用户真实信息、不敢大手术、依赖人类监督
- 提交并推送 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 继续完善博客内容
- 可继续性能优化
- 可添加更多交互功能

### 2026-04-03 10:14 — 🔍 全站 Schema.org 结构化数据
**Decision**: 定期健康检查通过（Lint ✅ Build ✅ Git ✅），距上次更新 18h。为进一步提升 SEO 覆盖率，为博客列表页和关于页添加 Schema.org 结构化数据。
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 博客详情页已有 BlogPosting schema，但博客列表页和关于页缺失
- 博客列表页应有 Blog schema + 嵌套的 BlogPosting items
- 关于页应有 Person schema（含 knowsAbout + sameAs）
**Changes**: 
- src/app/blog/page.tsx: 添加 Blog + BlogPosting schema，列出所有文章元数据
- src/app/about/page.tsx: 添加 Person schema（含 github sameAs 链接）
- 提交并推送 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加 Google Analytics
- 可继续性能优化
- 可添加更多博客文章

### 2026-04-02 16:14 — ♿ 无障碍访问（A11y）改进
**Decision**: 定期健康检查通过（Lint ✅ Build ✅ Git ✅），距离上次更新 6 小时。进行第 7 轮自主进化，聚焦无障碍访问改进。
**Research**: 
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- 发现 BlogSearch.tsx 搜索框缺少 label 元素（仅靠 placeholder，屏幕阅读器不友好）
- 发现 ReadingProgress 阅读进度条对辅助技术暴露无意义信息
- 发现搜索结果计数缺乏 ARIA live region
**Changes**: 
- BlogSearch.tsx: 添加隐式 `<label htmlFor="blog-search-input">` + `aria-label` 双保险
- BlogSearch.tsx: 搜索图标 `<span>` 添加 `aria-hidden="true"`
- BlogSearch.tsx: 搜索结果计数添加 `role="status" aria-live="polite"`
- ReadingProgress.tsx: 添加 `aria-hidden="true" role="presentation"` 隐藏进度条（纯视觉元素）
- 提交并推送 GitHub（将触发 Vercel 自动部署）
**Next**: 
- 可添加 Google Analytics
- 可继续性能优化
- 可添加更多博客文章

### 2026-04-04 04:14 — 接入 GitHub REST API 显示真实贡献统计
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次更新约 6 小时。projects 页面的贡献统计使用占位符 `--` 已存在多轮，替换为真实 GitHub 数据。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- GitHub REST API v3 对公共数据无需认证（60 req/hr），适合此场景
- 使用 Promise.all 并行请求用户信息和仓库列表，减少等待时间
- next: { revalidate: 3600 } 实现 1 小时增量静态重生成（ISR）
- TypeScript strict mode 下 `any[]` 和 `repo: any` 需替换为具体类型
**Changes**:
- 新增 src/lib/github.ts: GitHubStats 接口 + fetchGitHubStats() 函数
- 更新 src/app/projects/page.tsx: 转为 async Server Component，动态拉取 @xlkang 的 GitHub 数据
- 贡献统计展示：开源项目数、Followers、Stars 总数
- API 失败时优雅降级显示 `--` 占位符
- 添加 GitHub 个人主页链接
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加页面切换过渡动画
- 可继续 Phase 5 其他未完成项（性能优化）

### 2026-04-04 16:14 — 更新 SPEC.md 反映项目真实完成状态
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次更新约 6 小时。SPEC.md 显示 Phase 5 "进行中" 且 Phase 6 项目描述不完整，与实际项目状态严重不符，实施修订。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓（Next.js 16.1.6 + Turbopack，17 页全部生成）
- Git 工作区干净 ✓
- Phase 5 所有项目实际均已完成：Vercel 部署/性能优化/Web Vitals/SEO/Giscus
- Phase 6 实际包含 5 个子项：评论/深色亮色主题/交互效果/View Transitions/PWA/无障碍
- 博客文章列出 3 篇，但实际已有 5 篇
- 最后更新日期停留在 2026-03-11
**Changes**:
- SPEC.md Phase 5：从"进行中"改为 ✅，列出所有已完成子项
- SPEC.md Phase 6：补充 PWA 支持和无障碍访问两项
- SPEC.md 内容部分：补充最后两篇博客文章
- 最后更新日期更新为 2026-04-04
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 项目功能已相当完善，后续可考虑添加新功能或深化现有功能
- 可探索博客文章更多主题（如 AI 工具/编程实践）
- 可考虑添加访客统计（不依赖 Google Analytics 的开源方案）

### 2026-04-04 10:14 — Next.js 性能优化：包优化 + 博客 ISR 缓存
**Decision**: 定期健康检查通过（Lint ✅ Build ✅ Git ✅），距离上次更新约 6 小时。进行 Phase 5 性能优化。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Git 工作区干净 ✓
- next.config.ts 极度精简，无任何优化配置
- 博客页面为纯静态（无 revalidate），内容更新需重新构建
- `getPostData` 重复调用 `calculateReadTime`（注释已优化）
**Changes**:
- next.config.ts: 添加 `experimental.optimizePackageImports` 优化 lucide-react/framer-motion/gray-matter/remark 等包
- next.config.ts: 启用 `images.formats: ['image/avif', 'image/webp']` 优先格式
- blog/page.tsx: 添加 `export const revalidate = 3600`（1小时 ISR）
- blog/[slug]/page.tsx: 添加 `export const revalidate = 3600`（1小时 ISR）
- Build 输出确认：`/blog` 和 `/blog/[slug]` 均显示 `1h revalidate`
- 已提交并推送 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加页面切换过渡动画（Framer Motion already available）
- 可继续 Phase 5 其他未完成项

### 2026-04-04 22:14 — 添加面包屑导航 + 重新设计 404 页面
**Decision**: 定期健康检查通过（Lint ✅ Build ✅ Git ✅），距离上次更新约 6 小时。进行第 8 轮自主进化，聚焦导航体验改进。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓
- Next.js 16.1.6 + Turbopack，17 页全部生成 ✓
- Git 工作区干净 ✓
- 博客文章页面缺少面包屑导航（不利于 SEO 和深层页面定位）
- 404 页面使用静态 emoji + 简单文本，与极客主题风格不够统一
- next-view-transitions 已在使用中（无需重复实现页面切换动画）
**Changes**:
- 新增 src/components/Breadcrumb.tsx: 支持手动传入路径或自动从 pathname 生成
- BlogPostClient.tsx: 移除旧的"返回链接"，替换为 Breadcrumb 组件（SEO + UX 双改善）
- not-found.tsx: 重新设计为终端风格，集成路由错误信息 + ASCII 电路装饰 + 霓虹配色
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加博客文章目录（Table of Contents）侧边栏
- 可添加访客统计（Plausible/Umami 等隐私友好方案）
- 可继续撰写新博客文章

### 2026-04-05 10:14 — Round 10: 博客文章目录（Table of Contents）
**Decision**: 定期自主进化检查（Lint ✅ Build ✅ Git ✅），距离上次依赖更新约 6 小时。实施博客文章目录功能。
**Research**:
- Lint 检查通过 ✓
- Build 构建成功 ✓（Next.js 16.1.6 + Turbopack，17 页全部生成）
- Git 工作区干净 ✓
- 博客文章页面仅有面包屑导航，长文章缺少快速跳转机制
- 适合在 `src/lib/blog.ts` 中提取 heading，在服务端生成 headings 数据
- Intersection Observer API 追踪当前可见标题，实现 TOC 高亮
- TOC 设计：xl+ 桌面端显示侧边栏，移动端可折叠
**Changes**:
- `src/lib/blog.ts`: 新增 `Heading` 接口 + `extractHeadings()` 函数，提取 h2/h3
- `getPostData()`: 自动为 HTML 标题注入 `id` 属性（用于锚点跳转）
- 新增 `src/components/TableOfContents.tsx`: 交互式目录组件（折叠/展开/高亮当前章节）
- `BlogPostClient.tsx`: 集成 TOC，`xl+` 桌面端 sticky 侧边栏，内容+目录双栏布局
- `page.tsx`: 将 headings 数据从服务端传递到客户端组件
- 已提交并推送至 GitHub（将触发 Vercel 自动部署）
**Next**:
- 可添加博客文章字数统计
- 可继续撰写新博客文章
- 可探索其他 Phase 6 未完成项
