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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
