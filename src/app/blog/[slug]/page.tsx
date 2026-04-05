// ISR: 每小时增量静态重生成
export const revalidate = 3600;

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
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `${post.title} - ${post.readTime}阅读`,
      images: [`/blog/${slug}/opengraph-image`],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const siteUrl = "https://circuit-soul.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || `${post.title} - ${post.readTime}阅读`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Circuit Soul"
    },
    "url": `${siteUrl}/blog/${slug}`,
    "keywords": post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        title={post.title}
        date={post.date}
        readTime={post.readTime}
        tags={post.tags}
        headings={post.headings || []}
      >
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
      </BlogPostClient>
    </>
  );
}
