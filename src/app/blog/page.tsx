"use client";

import blogPosts from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// Topic button component (internal)
function TopicButton({ topic }: { topic: string }) {
  const [activeTopic, setActiveTopic] = useTopicState();
  const isActive = activeTopic === topic;

  return (
    <button
      onClick={() => setActiveTopic(topic)}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
        isActive
          ? "bg-[#1098D5] text-white border-[#1098D5] shadow-sm"
          : "bg-transparent text-gray-700 border-gray-300 hover:bg-[#1098D5]/10"
      }`}
      style={{ textTransform: "capitalize" }}
    >
      {topic}
    </button>
  );
}

// Simple hook-like pair to manage active topic across TopicButton instances
let topicState: string = "all";
const subscribers: Array<(t: string) => void> = [];
function useTopicState(): [string, (t: string) => void] {
  const [state, setState] = useState(topicState);

  // subscribe on mount
  useMemo(() => {
    const sub = (t: string) => setState(t);
    subscribers.push(sub);
    return () => {
      const idx = subscribers.indexOf(sub);
      if (idx >= 0) subscribers.splice(idx, 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setTopic(t: string) {
    topicState = t;
    subscribers.forEach((s) => s(t));
  }

  return [state, setTopic];
}

export default function BlogPage() {
  const [activeTopic] = useTopicState();
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section (matches Reviews page style) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Insights, stories and case studies about technology and design
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#1098D5] rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Latest updates &amp; thinking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">
              Latest Articles
              <div className="mt-2 h-1 w-20 bg-[#1098D5] mx-auto"></div>
            </h2>

            {/* Topic Filters */}
            <div className="text-center mb-6">
              <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
                {useMemo(() => {
                  const uniq = Array.from(
                    new Set(blogPosts.map((p) => p.topic || "General"))
                  );
                  return ["all", ...uniq];
                }, []).map((t) => (
                  <TopicButton key={t} topic={t} />
                ))}
              </div>
            </div>

            {/* Featured Post (single wide card) */}
            <div className="mb-10">
              {blogPosts
                .filter((p) => p.featured)
                .filter((p) =>
                  activeTopic === "all"
                    ? true
                    : (p.topic || "General") === activeTopic
                )
                .map((post, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden shadow-lg mb-6 bg-white"
                  >
                    <Image
                      src={post.image as string}
                      alt={post.title}
                      width={1200}
                      height={520}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="p-6">
                      <span className="text-xs font-semibold text-[#1098D5] uppercase">
                        Featured
                      </span>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-bold mt-2 mb-2 text-gray-900">
                          {post.title}
                        </h3>
                        {post.topic && (
                          <span className="ml-auto inline-block px-3 py-1 text-xs font-semibold bg-[#eef6fb] text-[#0b6b9a] rounded-full">
                            {post.topic}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#1098D5] hover:underline font-medium"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
            </div>

            {/* Blog Grid (3 columns on md+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {blogPosts
                .filter((p) => !p.featured)
                .filter((p) =>
                  activeTopic === "all"
                    ? true
                    : (p.topic || "General") === activeTopic
                )
                .map((post, idx) => (
                  <article
                    key={idx}
                    className="rounded-xl hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden bg-white flex flex-col"
                  >
                    <Image
                      src={post.image as string}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col">
                      <h4
                        className="text-lg font-semibold mb-1 text-gray-900"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </h4>
                      {post.topic && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#eef6fb] text-[#0b6b9a] rounded-md mb-2">
                          {post.topic}
                        </span>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <p className="text-gray-700 mb-3 flex-1">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#1098D5] hover:underline font-medium mt-auto"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-10">
              <button className="px-6 py-2 bg-[#1098D5] text-white rounded-lg font-semibold shadow hover:bg-[#0d7fb0] transition">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
