import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { googleSans } from "./fonts";
import "./globals.css";
import "./audience.css";
import "./engineering.css";
import "./space.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(EVENT.links.website),
  title: {
    default: `${EVENT.name} | ${EVENT_SHORT_DATE} | GDG Indore`,
    template: `%s | ${EVENT.name}`,
  },
  description: `Join GDG Indore on ${EVENT_SHORT_DATE} at ${EVENT.venue.name} for space technology, AI agents, cloud architecture, hands-on labs and community networking.`,
  keywords: [
    "DevFest Indore",
    "GDG Indore",
    "Google Developer Groups",
    "Indore Tech Conference",
    "GenAI Indore",
    "DevFest 2026",
    "Tech Events Indore",
    "Madhya Pradesh Tech Community",
  ],
  authors: [{ name: "GDG Indore Team", url: EVENT.links.chapter }],
  creator: EVENT.organizer,
  openGraph: {
    title: `${EVENT.name} | ${EVENT_SHORT_DATE}`,
    description: `Space technology, AI agents and the systems we build. Join talks, hands-on labs and the GDG Indore community on ${EVENT_SHORT_DATE}.`,
    siteName: EVENT.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: EVENT.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT.name,
    description: `AI, cloud, modern systems and hands-on labs. ${EVENT_SHORT_DATE}, ${EVENT.venue.fullName}.`,
    creator: "@GDG_Indore",
    images: ["/social-card.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`scroll-smooth ${googleSans.variable}`}
    >
      <head>
        {/* FOWT-prevention: read localStorage before first paint and apply data-theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('devfest-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        {/* Structured Data (JSON-LD) for SEO / AEO / GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: EVENT.name,
              description:
                "A GDG Indore developer conference with keynotes, technical tracks, hands-on labs and community networking.",
              startDate: EVENT.startsAt,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: EVENT.venue.fullName,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: EVENT.venue.streetAddress,
                  addressLocality: EVENT.venue.city,
                  addressRegion: EVENT.venue.region,
                  postalCode: EVENT.venue.postalCode,
                  addressCountry: EVENT.venue.country,
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: EVENT.venue.latitude,
                  longitude: EVENT.venue.longitude,
                },
              },
              image: [
                `${EVENT.links.website}${EVENT.venue.photo}`,
                `${EVENT.links.website}/images/android-astronaut-2026.webp`,
              ],
              organizer: {
                "@type": "Organization",
                name: EVENT.organizer,
                url: EVENT.links.chapter,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
