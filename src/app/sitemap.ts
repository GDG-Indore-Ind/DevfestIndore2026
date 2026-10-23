import { EVENT } from "@/content/event";
import type { MetadataRoute } from "next";
import { DEVFEST_EDITIONS } from "@/content/archive";

import { AMBASSADORS } from "@/lib/referral";

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = EVENT.links.website;
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tickets`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...["/guidelines", "/partners", "/venue"].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/past-speakers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...[
      "/past-events",
      "/past-sponsors",
      ...DEVFEST_EDITIONS.map((event) => `/past-events/${event.id}`),
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const ambassadorRoutes: MetadataRoute.Sitemap = Object.keys(AMBASSADORS).map((slug) => ({
    url: `${baseUrl}/invite/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...coreRoutes, ...ambassadorRoutes];
}
