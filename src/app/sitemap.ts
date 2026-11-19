import { ARCHIVED_EVENTS } from "@/content/archive";
import { EVENT } from "@/content/event";
import { SITE } from "@/content/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = EVENT.links.website;
  const entry = (path: string, changeFrequency: "weekly" | "monthly", priority: number) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  });

  return [
    entry("", "weekly", 1.0),
    entry("/tickets", "weekly", 0.9),
    entry("/flight-deck", "weekly", 0.8),
    entry("/badge", "weekly", 0.8),
    entry("/agenda", "weekly", 0.9),
    ...["/faq", "/partners", "/venue", "/ambassadors"].map((path) => entry(path, "weekly", 0.8)),
    ...(SITE.missionsEnabled ? [entry("/missions", "weekly", 0.8)] : []),
    entry("/press", "weekly", 0.7),
    entry("/team", "monthly", 0.6),
    entry("/archive", "monthly", 0.6),
    ...ARCHIVED_EVENTS.map((event) => entry(`/archive/${event.id}`, "monthly", 0.5)),
  ];
}
