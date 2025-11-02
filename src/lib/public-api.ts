export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://v0-portfolio-dashboard-api.vercel.app";

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export type Client = { id: string; name: string; logoUrl: string };
export type Review = { id: string; author: string; comment: string };
export type Project = { id: string; name: string; imageUrl: string };
export type TeamMember = { id: string; name: string; imageUrl: string };

export const getClients = () => getJson<Client[]>("/api/public/clients", { cache: "no-store" });
export const getReviews = () => getJson<Review[]>("/api/public/reviews", { cache: "no-store" });
export const getProjects = () => getJson<Project[]>("/api/public/projects", { cache: "no-store" });
export const getTeam = () => getJson<TeamMember[]>("/api/public/team", { cache: "no-store" });
