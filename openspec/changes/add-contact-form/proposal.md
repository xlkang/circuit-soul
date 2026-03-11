## Why

当前博客缺少与访客互动的渠道。需要添加联系表单，让访问者可以发送消息或反馈，增强博客的互动性和实用性。

## What Changes

- 添加联系页面 (/contact)
- 创建联系表单组件
- 表单字段：姓名、邮箱、主题、消息
- 表单验证
- 提交成功后显示确认消息

## Capabilities

### New Capabilities
- `contact-form`: 联系表单功能

### Modified Capabilities
（无）

## Impact

- 新增页面：src/app/contact/page.tsx
- 新增组件：src/components/ContactForm.tsx
- 无需后端（可使用 mailto 或后续集成邮件服务）
