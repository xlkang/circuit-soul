## ADDED Requirements

### Requirement: 博客列表骨架屏
博客列表加载时必须显示骨架屏。

#### Scenario: 列表加载
- **WHEN** 博客列表页面加载
- **THEN** 显示卡片形状的骨架屏占位

### Requirement: 骨架屏动画
骨架屏必须有闪烁动画模拟加载状态。

#### Scenario: 闪烁效果
- **WHEN** 骨架屏显示
- **THEN** 背景有从左到右的闪烁动画

### Requirement: 内容加载后过渡
内容加载完成后，骨架屏淡出显示实际内容。

#### Scenario: 内容过渡
- **WHEN** 数据加载完成
- **THEN** 骨架屏淡出，内容淡入显示
