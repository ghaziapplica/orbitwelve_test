import blogPosts from "@/data/blog";
import type { Metadata } from "next";

import BlogPostClient from "./BlogPostClient";
import { normalizeBlogPost } from "@/lib/blogStorage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const fallback = blogPosts.find((p) => p.slug === slug);

  const normalizedFallback = fallback
    ? normalizeBlogPost({
        ...fallback,
        topic: fallback.topic,
        image: fallback.image,
      })
    : null;

  return <BlogPostClient slug={slug} fallback={normalizedFallback} />;
}
