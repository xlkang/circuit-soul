import Link from "next/link";
import { getPostData, getAllPostSlugs } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
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
