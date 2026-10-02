import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  themeColor: "#4285f4",
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
        url: "/images/hero-mascot.jpg",
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
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#fafbfc] text-[#1e1e1e] antialiased selection:bg-[#ffe7a5] selection:text-[#1e1e1e]">
        {children}
      </body>
    </html>
  );
}
