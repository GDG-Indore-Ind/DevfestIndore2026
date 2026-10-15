"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ContentPillarsSection from "@/components/ContentPillarsSection";
import SpaceCollaborationSection from "@/components/SpaceCollaborationSection";
import ThreeDFlowSection from "@/components/ThreeDFlowSection";
import EventRecapSection from "@/components/EventRecapSection";
import SatelliteEventsSection from "@/components/SatelliteEventsSection";
import CallForSpeakersSection from "@/components/CallForSpeakersSection";
import CollegeWorkshopsSection from "@/components/CollegeWorkshopsSection";
import FeaturedTeamSection from "@/components/FeaturedTeamSection";
import TicketsSection from "@/components/TicketsSection";
import SponsorsSection from "@/components/SponsorsSection";
import GalleryVideoSection from "@/components/GalleryVideoSection";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import VenueSection from "@/components/VenueSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SavedSessionsModal from "@/components/SavedSessionsModal";
import ScrollProgress from "@/components/ScrollProgress";
import InteractiveCursor from "@/components/InteractiveCursor";
import FloatingShapesBackground from "@/components/FloatingShapesBackground";
import CosmicAudioPlayer from "@/components/CosmicAudioPlayer";
import PageLoader from "@/components/PageLoader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackPageImpression } from "@/lib/telemetryService";
import { SectionConfig, INITIAL_SECTIONS_CONFIG, getSectionsConfig } from "@/lib/firestoreService";

export default function Home() {
  // Initialize Awwwards-style IntersectionObserver scroll animations
  useScrollReveal();

  const [sections, setSections] = useState<SectionConfig[]>(INITIAL_SECTIONS_CONFIG);

  useEffect(() => {
    trackPageImpression();
    getSectionsConfig().then((res) => {
      if (res && res.length > 0) {
        setSections(res);
      }
    });
  }, []);

  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([
    "sess-2",
    "sess-3",
  ]);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  const handleToggleSaveSession = (id: string) => {
    setSavedSessionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSavedSession = (id: string) => {
    setSavedSessionIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllSaved = () => {
    setSavedSessionIds([]);
  };

  // Section component resolver map
  const renderSectionComponent = (anchor: string) => {
    switch (anchor) {
      case "hero":
        return <HeroSection key="hero" />;
      case "marquee":
        return <MarqueeBanner key="marquee" />;
      case "about":
        return (
          <div id="about" key="about">
            <AboutSection />
          </div>
        );
      case "flow":
        return (
          <div id="flow" key="flow">
            <ThreeDFlowSection />
          </div>
        );
      case "pillars":
        return (
          <div id="pillars" key="pillars">
            <ContentPillarsSection />
          </div>
        );
      case "space-collaboration":
        return (
          <div id="space-collaboration" key="space-collaboration">
            <SpaceCollaborationSection />
          </div>
        );
      case "workshops":
        return (
          <div id="workshops" key="workshops">
            <CollegeWorkshopsSection />
          </div>
        );
      case "call-for-speakers":
        return (
          <div id="call-for-speakers" key="call-for-speakers">
            <CallForSpeakersSection />
          </div>
        );
      case "speakers":
        return (
          <div id="speakers" key="speakers">
            <FeaturedTeamSection />
          </div>
        );
      case "recap-gallery":
        return (
          <div id="recap-gallery" key="recap-gallery">
            <GalleryVideoSection />
          </div>
        );
      case "social-stream":
        return (
          <div id="social-stream" key="social-stream">
            <InstagramFeedSection />
          </div>
        );
      case "recap":
        return (
          <div id="recap" key="recap">
            <EventRecapSection />
          </div>
        );
      case "satellite-events":
        return (
          <div id="satellite-events" key="satellite-events">
            <SatelliteEventsSection />
          </div>
        );
      case "tickets":
        return (
          <div id="tickets" key="tickets">
            <TicketsSection />
          </div>
        );
      case "sponsors":
        return (
          <div id="sponsors" key="sponsors">
            <SponsorsSection />
          </div>
        );
      case "faq":
        return (
          <div id="faq" key="faq">
            <FaqSection />
          </div>
        );
      case "venue":
        return (
          <div id="venue" key="venue">
            <VenueSection />
          </div>
        );
      default:
        return null;
    }
  };

  const sortedVisibleSections = useMemo(() => {
    return [...sections].filter((s) => s.visible).sort((a, b) => a.order - b.order);
  }, [sections]);

  return (
    <div className="min-h-screen bg-[var(--page-bg,#000000)] text-[var(--text-primary,#ffffff)] flex flex-col font-sans selection:bg-[#4285f4]/40 relative transition-colors duration-300">
      {/* Intro Welcome Loader */}
      <PageLoader />

      {/* Top 4-Color Scroll Progress Bar */}
      <ScrollProgress />

      {/* Awwwards Magnetic Interactive Cursor Follower */}
      <InteractiveCursor />

      {/* Floating 3D Geometric Google Shapes in Background */}
      <FloatingShapesBackground />

      {/* Sticky Navigation Bar with Roll-Up Typography */}
      <Navbar
        savedCount={savedSessionIds.length}
        onOpenSavedModal={() => setSavedModalOpen(true)}
      />

      {/* Main Content Sections (Dynamically ordered and visibility toggled via Admin) */}
      <main className="flex-1 relative z-10">
        {sortedVisibleSections.map((sec) => renderSectionComponent(sec.anchor))}
      </main>

      {/* Footer with GDG Disclaimer & Social Channels */}
      <Footer />

      {/* Ambient Cosmic Soundscape Audio Player */}
      <CosmicAudioPlayer />

      {/* Personalized Bookmarked Schedule Modal */}
      <SavedSessionsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedIds={savedSessionIds}
        onRemoveSession={handleRemoveSavedSession}
        onClearAll={handleClearAllSaved}
      />
    </div>
  );
}
