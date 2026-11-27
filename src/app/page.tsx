import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import PassportStrip from "@/components/home/PassportStrip";
import ExploreSection from "@/components/home/ExploreSection";
import AgendaPreview from "@/components/home/AgendaPreview";
import CommunitySupporters from "@/components/home/CommunitySupporters";
import GalleryVideoSection from "@/components/home/GalleryVideoSection";
import SponsorShowcase from "@/components/home/SponsorShowcase";
import TicketStrip from "@/components/home/TicketStrip";
import MissionStrip from "@/components/home/MissionStrip";
import VenueSection from "@/components/home/VenueSection";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { OPEN_PASSES } from "@/content/tickets";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${EVENT.name} | ${EVENT_SHORT_DATE}`,
    description: `${EVENT.name}, ${EVENT_SHORT_DATE} at ${EVENT.venue.name}: from intelligent software to systems in deep space.`,
    url: "/",
    siteName: EVENT.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: EVENT.name }],
  },
};

// Rail stops follow the page order; the ticket strip only appears while passes are open.
const flightStops = [
  { id: "hero", label: "Launch" },
  { id: "passport", label: "Passport" },
  { id: "flow", label: "Themes" },
  { id: "agenda-preview", label: "Speakers" },
  { id: "sponsors", label: "Partners" },
  ...(OPEN_PASSES.length ? [{ id: "home-tickets", label: "Passes" }] : []),
  { id: "community-partners", label: "Community" },
  { id: "venue", label: "Venue" },
  { id: "archive", label: "History" },
];

export default function Home() {
  return (
    <div className="audience-site engineering-home">
      <Navbar flightStops={flightStops} />
      <main id="main-content">
        <div id="hero">
          <HeroSection />
        </div>
        <PassportStrip />
        <ExploreSection />
        <AgendaPreview />
        <div id="sponsors">
          <SponsorShowcase />
        </div>
        <TicketStrip />
        <MissionStrip />
        <div id="community-partners" className="audience-section">
          <div className="audience-wrap">
            <CommunitySupporters headingLevel={2} />
          </div>
        </div>
        <VenueSection />
        <div id="archive">
          <GalleryVideoSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
