## ADDED Requirements

### Requirement: 返回顶部按钮
页面滚动一定距离后必须显示返回顶部按钮。

#### Scenario: 按钮显示
- **WHEN** 用户滚动页面超过 300px
- **THEN** 页面右下角显示返回顶部按钮

### Requirement: 按钮隐藏
滚动回顶部后按钮应隐藏。

#### Scenario: 按钮隐藏
- **WHEN** 用户滚动回页面顶部
- **THEN** 返回顶部按钮淡出隐藏

### Requirement: 平滑滚动
点击按钮后页面应平滑滚动到顶部。

#### Scenario: 平滑滚动
- **WHEN** 用户点击返回顶部按钮
- **THEN** 页面平滑滚动到顶部，而不是瞬间跳转
