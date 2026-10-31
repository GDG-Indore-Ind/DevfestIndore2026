import { EVENT } from "@/content/event";
import type { MetadataRoute } from "next";

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = EVENT.links.website;
  const now = new Date();
  const entry = (
    path: string,
    changeFrequency: "daily" | "weekly" | "monthly",
    priority: number,
  ) => ({ url: `${baseUrl}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", "daily", 1.0),
    entry("/tickets", "daily", 0.9),
    entry("/agenda", "daily", 0.9),
    ...["/faq", "/partners", "/venue", "/ambassadors", "/events"].map((path) =>
      entry(path, "weekly", 0.8),
    ),
    entry("/team", "monthly", 0.6),
    entry("/archive", "monthly", 0.6),
  ];
}
