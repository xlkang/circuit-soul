## ADDED Requirements

### Requirement: 主题切换动画
主题切换时必须有平滑的过渡效果。

#### Scenario: 过渡动画
- **WHEN** 用户点击切换主题按钮
- **THEN** 页面颜色平滑过渡，而不是瞬间变化

### Requirement: 过渡时长
过渡动画时长必须适中。

#### Scenario: 时长合适
- **WHEN** 主题切换
- **THEN** 过渡时长约 0.3 秒，不过于缓慢

### Requirement: 尊重减少动画
如果用户系统设置减少动画，主题过渡应简化。

#### Scenario: 减少动画
- **WHEN** 用户系统设置减少动画
- **THEN** 主题过渡变为瞬间切换
