## ADDED Requirements

### Requirement: RSS 2.0 订阅
系统必须提供 RSS 2.0 格式的订阅源。

#### Scenario: RSS 订阅访问
- **WHEN** 用户访问 /feed.xml
- **THEN** 返回符合 RSS 2.0 标准的 XML 内容

### Requirement: 文章内容摘要
RSS 源必须包含文章标题、摘要、发布日期、链接等必要信息。

#### Scenario: RSS 内容完整性
- **WHEN** RSS 阅读器解析 feed.xml
- **THEN** 能够正确显示所有文章的基本信息

### Requirement: 分类标签
RSS 源必须包含文章的分类标签信息。

#### Scenario: 标签包含
- **WHEN** RSS 解析文章项
- **THEN** 能够看到文章所属的分类
