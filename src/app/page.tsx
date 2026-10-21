import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExploreSection from "@/components/ExploreSection";
import TicketsSection from "@/components/TicketsSection";
import GalleryVideoSection from "@/components/GalleryVideoSection";
import SponsorShowcase from "@/components/SponsorShowcase";
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";
import OrbitScrollRail from "@/components/OrbitScrollRail";

// Deliberate attendee narrative order:
// Event, themes, partners, community, venue and a final ticket action.
const audienceSections = ["hero", "flow", "sponsors", "archive", "venue", "tickets"] as const;

export default function Home() {
  const visibleAnchors = [...audienceSections];

  const content = {
    hero: <HeroSection visibleAnchors={[...visibleAnchors]} />,
    flow: <ExploreSection />,
    tickets: <TicketsSection />,
    "archive": <GalleryVideoSection />,
    sponsors: <SponsorShowcase />,
    venue: <VenueSection />,
  };

  return (
    <div className="audience-site engineering-home">
      <Navbar visibleAnchors={[...visibleAnchors]} />
      <main id="main-content">
        {visibleAnchors.map((anchor) => (
          <div key={anchor} id={["hero", "tickets", "archive", "sponsors"].includes(anchor) ? anchor : undefined}>
            {content[anchor]}
          </div>
        ))}
      </main>
      <Footer />
      <OrbitScrollRail />
    </div>
  );
}
