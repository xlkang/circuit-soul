## ADDED Requirements

### Requirement: SEO 元数据
每个页面必须包含完整的 SEO 元数据（title、description、keywords）。

#### Scenario: 元数据渲染
- **WHEN** 页面加载
- **THEN** HTML head 包含正确的 title 和 meta description

### Requirement: Open Graph 社交分享
页面必须支持 Open Graph 协议，优化社交平台分享效果。

#### Scenario: 社交分享预览
- **WHEN** 用户分享博客链接到社交平台
- **THEN** 显示正确的标题、描述和预览图

### Requirement: 站点地图
系统必须生成 XML 站点地图供搜索引擎爬虫。

#### Scenario: 站点地图访问
- **WHEN** 搜索引擎访问 /sitemap.xml
- **THEN** 返回包含所有页面的站点地图

### Requirement: robots.txt
系统必须提供 robots.txt 文件指引搜索引擎爬虫。

#### Scenario: robots.txt 访问
- **WHEN** 爬虫访问 /robots.txt
- **THEN** 返回允许爬行的配置
