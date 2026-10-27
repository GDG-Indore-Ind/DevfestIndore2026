import {
  DIRECTORY_ENABLED,
  APPROVED_PERSON_IDS,
  getPublicOrganizations,
  getTalks,
} from "@/content/directory";
import { EVENT } from "@/content/event";
import type { MetadataRoute } from "next";
import { DEVFEST_EDITIONS } from "@/content/archive";

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
    ...["/guidelines", "/partners", "/venue", "/ambassadors"].map((path) => ({
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
      url: `${baseUrl}${DIRECTORY_ENABLED ? "/talks" : "/past-speakers"}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...[
      "/past-events",
      ...(DIRECTORY_ENABLED ? [] : ["/past-sponsors"]),
      ...DEVFEST_EDITIONS.map((event) => `/past-events/${event.date.slice(0, 4)}`),
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

  const profileRoutes: MetadataRoute.Sitemap = [
    ...APPROVED_PERSON_IDS.map((id) => `/people/${id}`),
    ...getPublicOrganizations()
      .filter((item) => item.approved)
      .map((item) => `/organizations/${item.id}`),
    ...getTalks("all")
      .filter(
        (talk) =>
          DIRECTORY_ENABLED || talk.speakerIds.every((id) => APPROVED_PERSON_IDS.includes(id)),
      )
      .map((talk) => `/talks/${talk.id}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...coreRoutes, ...profileRoutes];
}
