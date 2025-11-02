'use client';

import { useEffect, useMemo, useState } from "react";

type BlogDraft = {
  title: string;
  slug: string;
  author: string;
  date: string;
  topic: string;
  excerpt: string;
  image: string;
  content: string;
  featured: boolean;
};

const DASHBOARD_USERNAME = "orbitwelve-admin";
const DASHBOARD_PASSWORD = "OrbitwelveBlog#2024";

const emptyDraft: BlogDraft = {
  title: "",
  slug: "",
  author: "Orbitwelve Team",
  date: "",
  topic: "",
  excerpt: "",
  image: "",
  content: "",
  featured: false,
};

const storage = {
  auth: "orbitwelve-dashboard-auth",
  drafts: "orbitwelve-dashboard-drafts",
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function DashboardClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [draft, setDraft] = useState<BlogDraft>(emptyDraft);
  const [drafts, setDrafts] = useState<BlogDraft[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedAuth = window.sessionStorage.getItem(storage.auth);
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }

    const storedDrafts = window.localStorage.getItem(storage.drafts);
    if (storedDrafts) {
      try {
        const parsed = JSON.parse(storedDrafts) as BlogDraft[];
        setDrafts(parsed);
      } catch {
        // If stored data can't be parsed we ignore it
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storage.drafts, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    if (!statusMessage) return;
    const timeout = window.setTimeout(() => setStatusMessage(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      credentials.username === DASHBOARD_USERNAME &&
      credentials.password === DASHBOARD_PASSWORD
    ) {
      setIsAuthenticated(true);
      setLoginError("");
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(storage.auth, "true");
      }
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleFieldChange = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const preparedDraft: BlogDraft = {
      ...draft,
      slug: draft.slug || toSlug(draft.title),
      date: draft.date || new Date().toISOString().slice(0, 10),
    };

    setDrafts((prev) => [preparedDraft, ...prev]);
    setDraft({ ...emptyDraft, author: draft.author });
    setStatusMessage("Draft saved locally. Copy the JSON to update src/data/blog.ts.");
  };

  const handleCopyDraft = async (item: BlogDraft) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(item, null, 2));
      setStatusMessage("Draft copied to clipboard");
    } catch (error) {
      setStatusMessage("Unable to copy draft. Please copy manually.");
    }
  };

  const jsonPreview = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-slate-950 text-white pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-semibold text-center">Orbitwelve Dashboard</h1>
          <p className="text-sm text-slate-400 text-center mt-2">
            Sign in with the provided credentials to manage blog content.
          </p>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                value={credentials.username}
                onChange={(event) =>
                  setCredentials((prev) => ({ ...prev, username: event.target.value }))
                }
                placeholder="orbitwelve-admin"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="OrbitwelveBlog#2024"
                required
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-400" role="alert">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1098D5] py-2 text-sm font-semibold text-white transition hover:bg-[#0d7cad]"
            >
              Access dashboard
            </button>
          </form>
          <div className="mt-6 rounded-lg bg-slate-950/60 p-4 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">Credentials</p>
            <p className="mt-2">
              <span className="text-slate-300">Username:</span> {DASHBOARD_USERNAME}
            </p>
            <p>
              <span className="text-slate-300">Password:</span> {DASHBOARD_PASSWORD}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Blog Publishing Dashboard</h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Use this dashboard to prepare blog posts for orbitwelve.com. Drafts are saved locally in your browser so you can copy
            them into <code className="rounded bg-slate-900 px-1 py-0.5">src/data/blog.ts</code> when you are ready to publish.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
              Logged in as <span className="text-slate-200">{DASHBOARD_USERNAME}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(false);
                if (typeof window !== "undefined") {
                  window.sessionStorage.removeItem(storage.auth);
                }
              }}
              className="rounded-full border border-slate-800 px-3 py-1 transition hover:border-[#1098D5] hover:text-[#1098D5]"
            >
              Sign out
            </button>
          </div>
        </header>

        {statusMessage && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
            {statusMessage}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create new blog draft</h2>
              <button
                type="button"
                onClick={() => handleFieldChange("slug", toSlug(draft.title))}
                className="text-xs rounded-full border border-slate-700 px-3 py-1 text-slate-300 transition hover:border-[#1098D5] hover:text-[#1098D5]"
              >
                Generate slug
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span>Title</span>
                <input
                  value={draft.title}
                  onChange={(event) => handleFieldChange("title", event.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>Slug</span>
                <input
                  value={draft.slug}
                  onChange={(event) => handleFieldChange("slug", event.target.value)}
                  placeholder="my-new-post"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>Author</span>
                <input
                  value={draft.author}
                  onChange={(event) => handleFieldChange("author", event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>Date</span>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(event) => handleFieldChange("date", event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200 focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span>Topic / Category</span>
                <input
                  value={draft.topic}
                  onChange={(event) => handleFieldChange("topic", event.target.value)}
                  placeholder="Security, Marketing, ..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>Cover image URL</span>
                <input
                  value={draft.image}
                  onChange={(event) => handleFieldChange("image", event.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm">
              <span>Excerpt</span>
              <textarea
                value={draft.excerpt}
                onChange={(event) => handleFieldChange("excerpt", event.target.value)}
                rows={3}
                placeholder="A short summary of the post"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                required
              />
            </label>

            <label className="block space-y-2 text-sm">
              <span>Content (Markdown supported)</span>
              <textarea
                value={draft.content}
                onChange={(event) => handleFieldChange("content", event.target.value)}
                rows={10}
                placeholder="Write or paste the blog content here..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-[#1098D5] focus:outline-none focus:ring-2 focus:ring-[#1098D5]/40"
                required
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) => handleFieldChange("featured", event.target.checked)}
                className="h-4 w-4 rounded border border-slate-700 bg-slate-950"
              />
              Mark as featured post
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="reset"
                onClick={() => setDraft({ ...emptyDraft, author: draft.author })}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-red-400 hover:text-red-300"
              >
                Reset form
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1098D5] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#0d7cad]"
              >
                Save draft
              </button>
            </div>
          </form>

          <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold">Live JSON preview</h2>
            <p className="text-xs text-slate-400">
              Update the form to see the structure that should be pasted into your blog
              data file.
            </p>
            <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
              {jsonPreview}
            </pre>
          </aside>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Saved drafts</h2>
            <button
              type="button"
              onClick={() => setDrafts([])}
              className="text-xs rounded-full border border-slate-700 px-3 py-1 text-slate-300 transition hover:border-red-400 hover:text-red-300"
            >
              Clear all
            </button>
          </div>
          {drafts.length === 0 ? (
            <p className="text-sm text-slate-500">
              Drafts you save will appear here. They are stored locally in your browser.
            </p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {drafts.map((item, index) => (
                <li key={`${item.slug}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {item.date} • {item.author}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyDraft(item)}
                      className="text-xs rounded-full border border-slate-700 px-3 py-1 text-slate-300 transition hover:border-[#1098D5] hover:text-[#1098D5]"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-400 overflow-hidden text-ellipsis">
                    {item.excerpt}
                  </p>
                  <dl className="mt-3 grid gap-2 text-xs text-slate-400">
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Slug:</dt>
                      <dd className="text-slate-200">{item.slug}</dd>
                    </div>
                    {item.topic && (
                      <div className="flex gap-2">
                        <dt className="text-slate-500">Topic:</dt>
                        <dd className="text-slate-200">{item.topic}</dd>
                      </div>
                    )}
                    {item.image && (
                      <div className="flex gap-2">
                        <dt className="text-slate-500">Image:</dt>
                        <dd className="truncate text-slate-200">{item.image}</dd>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Featured:</dt>
                      <dd className="text-slate-200">{item.featured ? "Yes" : "No"}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}
