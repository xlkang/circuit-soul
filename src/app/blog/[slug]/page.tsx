import { getPostData, getAllPostSlugs } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";
import { Metadata } from "next";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  const siteUrl = "https://circuit-soul.vercel.app";

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - ${post.readTime}阅读`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - ${post.readTime}阅读`,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Circuit Soul"],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt || `${post.title} - ${post.readTime}阅读`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <BlogPostClient
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      tags={post.tags}
    >
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
    </BlogPostClient>
  );
}
