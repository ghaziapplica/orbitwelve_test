import type { BlogPost } from "@/data/blog";

export type BlogRecord = BlogPost & {
  content: string;
};

export const DASHBOARD_STORAGE_KEYS = {
  auth: "orbitwelve-dashboard-auth",
  drafts: "orbitwelve-dashboard-drafts",
  published: "orbitwelve-dashboard-published",
  trash: "orbitwelve-dashboard-trash",
} as const;

type PostWithMaybeArrayContent = Omit<BlogRecord, "content"> & {
  content: string | string[] | undefined;
};

export function normalizeBlogPost(post: PostWithMaybeArrayContent): BlogRecord {
  const { content, ...rest } = post;

  return {
    ...rest,
    content: Array.isArray(content)
      ? content.join("\n\n")
      : content ?? "",
  };
}

export function parseStoredPosts(
  value: string | null,
  fallback: BlogRecord[] = [],
): BlogRecord[] {
  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value) as PostWithMaybeArrayContent[];
    return parsed.map(normalizeBlogPost);
  } catch {
    return fallback;
  }
}
