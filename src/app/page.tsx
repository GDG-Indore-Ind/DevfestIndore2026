import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ExhibitsSection from "@/components/home/ExhibitsSection";
import ExploreSection from "@/components/home/ExploreSection";
import GalleryVideoSection from "@/components/home/GalleryVideoSection";
import SponsorShowcase from "@/components/home/SponsorShowcase";
import TicketStrip from "@/components/home/TicketStrip";
import VenueSection from "@/components/home/VenueSection";
import CommunitySupporters from "@/components/home/CommunitySupporters";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { OPEN_PASSES } from "@/content/tickets";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${EVENT.name} | ${EVENT_SHORT_DATE}`,
    description: `Space technology, AI agents and the systems we build. Join talks, hands-on labs and the GDG Indore community on ${EVENT_SHORT_DATE}.`,
    url: "/",
    siteName: EVENT.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: EVENT.name }],
  },
};

const visibleAnchors = ["hero", "flow", "archive", "sponsors", "exhibits", "venue"];

// Rail stops follow the page order; the ticket strip only appears while passes are open.
const flightStops = [
  { id: "hero", label: "Launch" },
  { id: "flow", label: "Themes" },
  { id: "archive", label: "Community" },
  { id: "sponsors", label: "Partners" },
  ...(OPEN_PASSES.length ? [{ id: "home-tickets", label: "Passes" }] : []),
  { id: "exhibits", label: "Exhibits" },
  { id: "venue", label: "Venue" },
];

export default function Home() {
  return (
    <div className="audience-site engineering-home">
      <Navbar visibleAnchors={visibleAnchors} flightStops={flightStops} />
      <main id="main-content">
        <div id="hero">
          <HeroSection />
        </div>
        <div>
          <ExploreSection />
        </div>
        <div id="archive">
          <GalleryVideoSection />
        </div>
        <div id="sponsors">
          <SponsorShowcase />
        </div>
        <TicketStrip />
        <ExhibitsSection />
        <div>
          <VenueSection />
        </div>
        <CommunitySupporters />
      </main>
      <Footer />
    </div>
  );
}
