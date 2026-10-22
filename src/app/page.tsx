import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExploreSection from "@/components/ExploreSection";
import GalleryVideoSection from "@/components/GalleryVideoSection";
import SponsorShowcase from "@/components/SponsorShowcase";
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";

// Deliberate attendee narrative order:
// Event, programme, partners, community and venue. Tickets remain in navigation.
const audienceSections = ["hero", "flow", "sponsors", "archive", "venue"] as const;

export default function Home() {
  const visibleAnchors = [...audienceSections];

  const content = {
    hero: <HeroSection />,
    flow: <ExploreSection />,
    "archive": <GalleryVideoSection />,
    sponsors: <SponsorShowcase />,
    venue: <VenueSection />,
  };

  return (
    <div className="audience-site engineering-home">
      <Navbar visibleAnchors={[...visibleAnchors]} flightStops />
      <main id="main-content">
        {visibleAnchors.map((anchor) => (
          <div key={anchor} id={["hero", "archive", "sponsors"].includes(anchor) ? anchor : undefined}>
            {content[anchor]}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
