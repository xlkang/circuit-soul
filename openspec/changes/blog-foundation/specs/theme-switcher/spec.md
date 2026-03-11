## ADDED Requirements

### Requirement: 三主题切换
系统必须支持三种主题：极客风（Geek）、暗黑风（Dark）、亮色风（Light）。

#### Scenario: 主题切换按钮
- **WHEN** 用户点击主题切换按钮
- **THEN** 页面主题在三种风格之间循环切换

### Requirement: 主题持久化
切换后的主题必须保存到 localStorage，下次访问时恢复。

#### Scenario: 主题记忆
- **WHEN** 用户切换主题后刷新页面
- **THEN** 页面保持用户选择的主题

### Requirement: CSS 变量适配
每个主题必须通过 CSS 变量定义不同配色方案。

#### Scenario: 主题变量应用
- **WHEN** 主题切换
- **THEN** CSS 变量更新，所有使用变量的元素自动换色
