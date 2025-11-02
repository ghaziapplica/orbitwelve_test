import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Blog Dashboard | Orbitwelve",
  description:
    "Manage blog content for Orbitwelve with a focused dashboard experience.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
