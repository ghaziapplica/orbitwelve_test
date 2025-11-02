import blogPosts from "@/data/blog";
import { User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const paragraphs = post.content.split("\n\n");

  // Check if a paragraph is a quote (starts and ends with quotes)
  const isQuote = (text: string) => {
    const trimmed = text.trim();
    return (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    );
  };

  const idFor = (heading: string) =>
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  return (
    <main className="min-h-screen bg-white">
      {/* Single column centered layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <article className="bg-white">
          {/* Category Tag */}
          {post.topic && (
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[#1098D5] text-white text-sm font-semibold rounded-lg">
                {post.topic}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <User size={16} className="text-gray-400" />
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={520}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, idx) => {
              // Skip empty paragraphs
              if (!para.trim()) return null;

              // Headings (##)
              if (para.startsWith("## ")) {
                const heading = para.replace(/^##\s+/, "");
                return (
                  <h2
                    id={idFor(heading)}
                    key={idx}
                    className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-sans"
                  >
                    {heading}
                  </h2>
                );
              }

              // Subheadings (###)
              if (para.startsWith("### ")) {
                const sub = para.replace(/^###\s+/, "");
                return (
                  <h3
                    id={idFor(sub)}
                    key={idx}
                    className="text-xl font-bold text-gray-900 mt-6 mb-3 font-sans"
                  >
                    {sub}
                  </h3>
                );
              }

              // Quote blocks
              if (isQuote(para)) {
                const quoteText = para.replace(/^["']|["']$/g, "");
                return (
                  <blockquote
                    key={idx}
                    className="my-6 p-6 bg-gray-100 border border-gray-200 rounded-lg italic text-gray-700 leading-relaxed"
                  >
                    {quoteText}
                  </blockquote>
                );
              }

              // Regular paragraphs
              return (
                <p
                  key={idx}
                  className="text-gray-800 leading-relaxed mb-4 text-base"
                  style={{ fontFamily: "serif" }}
                >
                  {para}
                </p>
              );
            })}
          </div>
        </article>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1098D5] transition-colors"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
