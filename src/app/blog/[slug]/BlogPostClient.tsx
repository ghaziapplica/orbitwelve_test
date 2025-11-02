'use client';

import {
  DASHBOARD_STORAGE_KEYS,
  parseStoredPosts,
  type BlogRecord,
} from "@/lib/blogStorage";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BlogPostClientProps = {
  slug: string;
  fallback: BlogRecord | null;
};

export default function BlogPostClient({ slug, fallback }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogRecord | null>(fallback);
  const [isReady, setIsReady] = useState(Boolean(fallback));
  const [isTrashed, setIsTrashed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadFromStorage = () => {
      const published = parseStoredPosts(
        window.localStorage.getItem(DASHBOARD_STORAGE_KEYS.published),
      );
      const trashed = parseStoredPosts(
        window.localStorage.getItem(DASHBOARD_STORAGE_KEYS.trash),
      );

      const trashedMatch = trashed.find((item) => item.slug === slug);
      if (trashedMatch) {
        setIsTrashed(true);
        setPost(null);
        setIsReady(true);
        return;
      }

      const match = published.find((item) => item.slug === slug) || fallback;
      setPost(match ?? null);
      setIsTrashed(false);
      setIsReady(true);
    };

    loadFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key &&
        event.key !== DASHBOARD_STORAGE_KEYS.published &&
        event.key !== DASHBOARD_STORAGE_KEYS.trash
      ) {
        return;
      }
      loadFromStorage();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [fallback, slug]);

  const paragraphs = useMemo(() => {
    if (!post) return [] as string[];
    return post.content.split("\n\n");
  }, [post]);

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

  if (!post) {
    if (!isReady) {
      return (
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <p className="text-center text-sm text-gray-500">Loading article…</p>
          </div>
        </main>
      );
    }

    if (isTrashed) {
      return (
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900">This article is in the trash</h1>
            <p className="text-sm text-gray-500">
              Restore it from the dashboard to make it visible again.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-[#1098D5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d7cad]"
            >
              Back to Blog
            </Link>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Post not found</h1>
          <p className="text-sm text-gray-500">It may have been removed or unpublished.</p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-[#1098D5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d7cad]"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <article className="bg-white">
          {post.topic && (
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[#1098D5] text-white text-sm font-semibold rounded-lg">
                {post.topic}
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <User size={16} className="text-gray-400" />
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

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

          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, idx) => {
              if (!para.trim()) return null;

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
