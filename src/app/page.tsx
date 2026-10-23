import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ExhibitsSection from "@/components/home/ExhibitsSection";
import ExploreSection from "@/components/home/ExploreSection";
import GalleryVideoSection from "@/components/home/GalleryVideoSection";
import SponsorShowcase from "@/components/home/SponsorShowcase";
import VenueSection from "@/components/home/VenueSection";
import Footer from "@/components/layout/Footer";

const visibleAnchors = ["hero", "flow", "exhibits", "sponsors", "archive", "venue"];

export default function Home() {
  return (
    <div className="audience-site engineering-home">
      <Navbar visibleAnchors={visibleAnchors} flightStops />
      <main id="main-content">
        <div id="hero">
          <HeroSection />
        </div>
        <div>
          <ExploreSection />
        </div>
        <ExhibitsSection />
        <div id="sponsors">
          <SponsorShowcase />
        </div>
        <div id="archive">
          <GalleryVideoSection />
        </div>
        <div>
          <VenueSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
