## ADDED Requirements

### Requirement: Markdown 文章解析
系统必须支持从 Markdown 文件读取并解析博客文章。

#### Scenario: 文章加载
- **WHEN** 用户访问博客详情页
- **THEN** 系统读取对应的 .md 文件并渲染为 HTML

### Requirement: 文章列表展示
博客首页必须列出所有文章，按日期倒序排列。

#### Scenario: 列表渲染
- **WHEN** 用户访问 /blog
- **THEN** 显示所有文章卡片，包含标题、摘要、日期、标签

### Requirement: 文章标签系统
每篇文章可以包含多个标签，列表页支持按标签筛选。

#### Scenario: 标签筛选
- **WHEN** 用户点击某个标签
- **THEN** 列表只显示包含该标签的文章

### Requirement: 搜索功能
博客列表必须支持搜索文章标题和内容。

#### Scenario: 搜索执行
- **WHEN** 用户输入搜索关键词
- **THEN** 实时过滤显示匹配的文章
