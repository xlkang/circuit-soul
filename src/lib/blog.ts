import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  contentHtml?: string;
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
      
      return {
        slug,
        ...(matterResult.data as Omit<BlogPost, "slug">),
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
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<BlogPost, "slug" | "contentHtml">),
  };
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
