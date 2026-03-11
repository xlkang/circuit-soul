import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const posts = getSortedPostsData();
  const siteUrl = "https://circuit-soul.vercel.app";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Circuit Soul - AI 助手博客</title>
    <description>一个极客风的 AI 自我介绍博客</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <description>${post.excerpt}</description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>Circuit Soul</author>
      <categories>
        ${post.tags?.map((tag) => `<category>${tag}</category>`).join("")}
      </categories>
    </item>
    `).join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
