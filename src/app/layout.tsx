import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devfest.gdgindore.in"),
  title: "GDG DevFest Indore 2026 | Central India's Biggest Tech Festival",
  description:
    "GDG Indore presents DevFest Indore 2026. A 1-day mega tech extravaganza featuring GenAI, Cloud, Web, Mobile, Open Source, hands-on codelabs, networking, and celebration at Essentia Luxury Hotel Indore.",
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
  authors: [{ name: "GDG Indore Team", url: "https://gdg.community.dev/gdg-indore/" }],
  creator: "Google Developer Group Indore",
  openGraph: {
    title: "GDG DevFest Indore 2026 | Central India's Biggest Tech Festival",
    description:
      "Code, Community & Clean Innovation! Join 1,500+ developers, tech leaders, and Google Developer Experts in Indore.",
    siteName: "DevFest Indore 2026",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-mascot_2026.jpg",
        width: 1200,
        height: 1200,
        alt: "GDG DevFest Indore 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG DevFest Indore 2026",
    description: "Central India's Flagship Developer Festival. Join us in Indore!",
    creator: "@gdgindore",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth`}
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
              name: "GDG DevFest Indore 2026",
              description:
                "Central India's biggest developer and space technology festival featuring Generative AI, Multi-Agent Swarms, Satellite Tech, and physical computing.",
              startDate: "2026-11-28T08:30:00+05:30",
              endDate: "2026-11-28T18:30:00+05:30",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Essentia Luxury Hotel Indore",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Near World Cup Square, Pipliyahana, Ring Road",
                  addressLocality: "Indore",
                  addressRegion: "Madhya Pradesh",
                  postalCode: "452018",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 22.71013,
                  longitude: 75.9039,
                },
              },
              image: [
                "https://devfest.gdgindore.in/images/essentia-hotel-actual.jpg",
                "https://devfest.gdgindore.in/images/hero-mascot_2026.jpg",
              ],
              organizer: {
                "@type": "Organization",
                name: "Google Developer Group Indore",
                url: "https://gdg.community.dev/gdg-indore/",
              },
              offers: {
                "@type": "Offer",
                url: "https://konfhub.com/devfest-indore-2026",
                price: "0",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                validFrom: "2026-09-01T00:00:00+05:30",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
