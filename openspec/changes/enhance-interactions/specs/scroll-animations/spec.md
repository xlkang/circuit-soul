## ADDED Requirements

### Requirement: 元素入场动画
元素进入视口时必须触发动画。

#### Scenario: 滚动入场
- **WHEN** 用户滚动页面，元素进入视口
- **THEN** 元素以淡入+上移方式显示

### Requirement: 交错动画
列表元素应有交错入场效果。

#### Scenario: 列表交错
- **WHEN** 博客列表加载
- **THEN** 每个卡片依次入场，有延迟差异

### Requirement: 悬停动画
交互元素悬停时有动画反馈。

#### Scenario: 按钮悬停
- **WHEN** 用户悬停在按钮上
- **THEN** 按钮有缩放或发光效果
