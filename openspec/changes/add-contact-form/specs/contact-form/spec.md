## ADDED Requirements

### Requirement: 联系表单字段
联系表单必须包含必要的字段。

#### Scenario: 表单字段
- **WHEN** 用户访问联系页面
- **THEN** 显示姓名、邮箱、主题、消息四个字段

### Requirement: 表单验证
表单提交前必须验证必填字段。

#### Scenario: 验证触发
- **WHEN** 用户点击提交按钮
- **THEN** 验证所有必填字段，错误时显示提示

### Requirement: 邮箱格式验证
邮箱字段必须验证格式。

#### Scenario: 邮箱验证
- **WHEN** 用户输入邮箱
- **THEN** 检查邮箱格式，无效时提示

### Requirement: 提交成功
表单验证通过后执行提交。

#### Scenario: 提交处理
- **WHEN** 表单验证通过
- **THEN** 打开邮件客户端，准备发送

### Requirement: 主题适配
表单样式必须适配当前主题。

#### Scenario: 主题切换
- **WHEN** 用户切换主题
- **THEN** 表单颜色随之变化
