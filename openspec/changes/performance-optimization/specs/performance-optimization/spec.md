## ADDED Requirements

### Requirement: next/font 优化
必须使用 next/font 优化字体加载。

#### Scenario: 字体加载
- **WHEN** 页面加载
- **THEN** 使用 next/font 加载字体，无 FOIT

### Requirement: 动态导入动画
动画组件必须使用动态导入。

#### Scenario: 动态导入
- **WHEN** 页面渲染
- **THEN** 动画组件通过 dynamic() 导入，减少初始 bundle

### Requirement: Loading 状态
博客列表必须显示加载状态。

#### Scenario: 加载显示
- **WHEN** 博客列表加载中
- **THEN** 显示骨架屏或加载提示
