import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

/**
 * Calculate reading time based on content
 * Average reading speed: 300 words/min for Chinese, 200 words/min for English
 */

/**
 * Extract h2/h3 headings from markdown content and generate slugs for TOC
 */
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  // Match ## and ### headings
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    // Generate slug: lowercase, replace spaces with hyphens, remove special chars
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    headings.push({ level, text, id });
  }

  return headings;
}

function calculateReadTime(content: string): string {
  // Remove frontmatter if present
  const textContent = content.replace(/^---[\s\S]*?---/, "");
  
  // Count Chinese characters and English words
  const chineseChars = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (textContent.match(/[a-zA-Z]+/g) || []).length;
  
  // Calculate minutes: Chinese ~300 chars/min, English ~200 words/min
  const minutes = Math.ceil(chineseChars / 300 + englishWords / 200);
  
  return `${Math.max(1, minutes)} min`;
}

export interface Heading {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  contentHtml?: string;
  headings?: Heading[];
}

export function getSortedPostsData(): BlogPost[] {
  // 获取 blog 目录下的所有 md 文件
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // 去除 .md 扩展名，得到 slug
      const slug = fileName.replace(/\.md$/, "");
      
      // 读取 md 文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      // 使用 gray-matter 解析元数据
      const matterResult = matter(fileContents);
      
      // Auto-calculate readTime from content if not specified
      const rawReadTime = (matterResult.data as Record<string, unknown>).readTime;
      const readTime = rawReadTime 
        ? String(rawReadTime) 
        : calculateReadTime(matterResult.content);
      
      return {
        slug,
        readTime,
        ...(matterResult.data as Omit<BlogPost, "slug" | "readTime">),
      };
    });
  
  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ""),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  // 解析元数据
  const matterResult = matter(fileContents);
  
  // 使用 remark 将 markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // Extract headings for Table of Contents
  const headings = extractHeadings(matterResult.content);

  // Add id attributes to heading HTML elements for anchor links
  headings.forEach(({ level, id }) => {
    const tag = `h${level}`;
    // Replace first occurrence of each heading tag with the heading text as id
    const regex = new RegExp(`(<${tag}([^>]*)>)(.+?)(</${tag}>)`, "i");
    contentHtml = contentHtml.replace(regex, (_, open, attrs, text, close) => {
      // Avoid duplicate ids
      if (attrs.includes("id=")) return _;
      return `<${tag}${attrs} id="${id}">${text}${close}`;
    });
  });
  
  // Reuse readTime from frontmatter if specified, otherwise calculate once
  const rawReadTime = (matterResult.data as Record<string, unknown>).readTime;
  const readTime = rawReadTime 
    ? String(rawReadTime) 
    : calculateReadTime(matterResult.content);
  
  return {
    slug,
    contentHtml,
    readTime,
    headings,
    ...(matterResult.data as Omit<BlogPost, "slug" | "contentHtml" | "readTime" | "headings">),
  };
}

export interface TagCount {
  tag: string;
  count: number;
}

export function getTagCounts(): TagCount[] {
  const posts = getSortedPostsData();
  const tagMap = new Map<string, number>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getSortedPostsData();
  return posts.filter((post) => post.tags?.includes(tag));
}

export interface BlogStats {
  totalPosts: number;
  totalWords: number;
  totalReadTime: number; // in minutes
  oldestDate: string;
  newestDate: string;
}

export function getBlogStats(): BlogStats {
  const posts = getSortedPostsData();
  
  let totalWords = 0;
  let totalReadTime = 0;
  
  posts.forEach((post) => {
    const filePath = path.join(postsDirectory, `${post.slug}.md`);
    const content = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(content);
    const textContent = matterResult.content.replace(/^---[\s\S]*?---/, "");
    
    // Count words
    const chineseChars = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (textContent.match(/[a-zA-Z]+/g) || []).length;
    const charCount = chineseChars + englishWords;
    totalWords += charCount;
    
    // Calculate read time (same formula as calculateReadTime)
    const minutes = Math.ceil(chineseChars / 300 + englishWords / 200);
    totalReadTime += Math.max(1, minutes);
  });
  
  return {
    totalPosts: posts.length,
    totalWords,
    totalReadTime,
    oldestDate: posts.length > 0 ? posts[posts.length - 1].date : "",
    newestDate: posts.length > 0 ? posts[0].date : "",
  };
}

/**
 * Extract current evolution round from evolution-log.md
 * Parses the most recent "Round X:" entry
 */
export function getEvolutionRound(): number {
  try {
    const logPath = path.join(process.cwd(), "evolution-log.md");
    const content = fs.readFileSync(logPath, "utf8");
    // Match "Round X:" pattern (case-insensitive)
    const match = content.match(/Round\s+(\d+):/i);
    return match ? parseInt(match[1], 10) : 0;
  } catch {
    return 0;
  }
}
