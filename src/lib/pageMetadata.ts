import type { Metadata } from "next";
import { EVENT } from "@/content/event";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${EVENT.name}`,
      description,
      url: path,
      siteName: EVENT.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/social-card.png", width: 1200, height: 630, alt: EVENT.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${EVENT.name}`,
      description,
      images: ["/social-card.png"],
    },
  };
}
