import { ARCHIVED_EVENTS } from "@/content/archive";
import { EVENT } from "@/content/event";
import { PARTNER_PROFILES, partnerProfileHref } from "@/content/partners";
import { SITE } from "@/content/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = EVENT.links.website;
  const entry = (path: string, changeFrequency: "weekly" | "monthly", priority: number) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  });

  return [
    entry("", "weekly", 1.0),
    entry("/pass", "weekly", 0.9),
    entry("/tickets", "weekly", 0.9),
    entry("/badge", "weekly", 0.8),
    entry("/agenda", "weekly", 0.9),
    ...["/faq", "/partners", "/venue", "/ambassadors"].map((path) => entry(path, "weekly", 0.8)),
    ...(SITE.missionsEnabled ? [entry("/missions", "weekly", 0.8)] : []),
    entry("/press", "weekly", 0.7),
    entry("/team", "monthly", 0.6),
    entry("/archive", "monthly", 0.6),
    ...PARTNER_PROFILES.map(({ organizationId }) =>
      entry(partnerProfileHref(organizationId), "monthly", 0.6),
    ),
    ...ARCHIVED_EVENTS.map((event) => entry(`/archive/${event.id}`, "monthly", 0.5)),
  ];
}
