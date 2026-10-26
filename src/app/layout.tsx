import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import type { Metadata, Viewport } from "next";
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
    default: EVENT.name,
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
        url: "/images/android-astronaut-2026.webp",
        width: 1254,
        height: 1254,
        alt: EVENT.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT.name,
    description: `AI, cloud, modern systems and hands-on labs. ${EVENT_SHORT_DATE}, ${EVENT.venue.fullName}.`,
    creator: "@gdgindore",
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
      className="scroll-smooth"
    >
      <head>
        <link
          rel="preload"
          href="/fonts/google-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
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
        {/* Google Tag Manager Container */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-53S9M7C9');`,
          }}
        />
        {/* Google Analytics 4 (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PRRCSRF36D" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PRRCSRF36D', { page_path: window.location.pathname });`,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2138056533460853');
fbq('track', 'PageView');`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased transition-colors duration-300">
        {/* Meta Pixel (noscript fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2138056533460853&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53S9M7C9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
