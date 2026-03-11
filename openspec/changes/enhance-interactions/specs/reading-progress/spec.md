## ADDED Requirements

### Requirement: 阅读进度条
博客文章页面必须显示阅读进度指示器。

#### Scenario: 进度显示
- **WHEN** 用户在博客详情页
- **THEN** 页面顶部显示进度条，随阅读位置更新

### Requirement: 进度计算
进度条基于页面滚动位置计算。

#### Scenario: 滚动计算
- **WHEN** 用户滚动博客文章
- **THEN** 进度条宽度 = 已滚动距离 / 文章总高度

### Requirement: 主题适配
进度条颜色必须适配当前主题。

#### Scenario: 主题颜色
- **WHEN** 主题切换
- **THEN** 进度条颜色随之变化
