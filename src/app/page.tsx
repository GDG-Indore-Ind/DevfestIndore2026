"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import SatelliteEventsSection from "@/components/SatelliteEventsSection";
// import ScheduleSection from "@/components/ScheduleSection";
// import SpeakersSection from "@/components/SpeakersSection";
import TicketsSection from "@/components/TicketsSection";
// import IndoreExperienceSection from "@/components/IndoreExperienceSection";
import SponsorsSection from "@/components/SponsorsSection";
import VenueSection from "@/components/VenueSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SavedSessionsModal from "@/components/SavedSessionsModal";
import ScrollProgress from "@/components/ScrollProgress";
import InteractiveCursor from "@/components/InteractiveCursor";
import FloatingShapesBackground from "@/components/FloatingShapesBackground";
import PageLoader from "@/components/PageLoader";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  // Initialize Awwwards-style IntersectionObserver scroll animations
  useScrollReveal();

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

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Live Countdown, 3D Mascot & CTAs */}
        <HeroSection />

        {/* Double-decker Animated Marquee Banner */}
        <MarqueeBanner />

        {/* About DevFest Indore & Indore Cultural Tech Spirit */}
        <AboutSection />

        {/* Pre-DevFest Satellite Events & City Activations (Mumbai Tech Week Style) */}
        <SatelliteEventsSection />

        {/* Schedule & Agenda with Track Filtering and Bookmarking */}
        {/* <ScheduleSection
          savedSessionIds={savedSessionIds}
          onToggleSaveSession={handleToggleSaveSession}
        /> */}

        {/* Featured Speakers Grid with 3D Tilt & Bio Modals */}
        {/* <SpeakersSection /> */}

        {/* Tickets, Pricing & Interactive Digital Badge Generator */}
        <TicketsSection />

        {/* The Unique Indore City & Food Culture Experience */}
        {/* <IndoreExperienceSection /> */}

        {/* Sponsors, Google for Developers & Community Partners */}
        <SponsorsSection />

        {/* Venue, Essentia Luxury Hotel Indore & Transit Guide */}
        <VenueSection />

        {/* Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* Footer with GDG Disclaimer & Social Channels */}
      <Footer />

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
