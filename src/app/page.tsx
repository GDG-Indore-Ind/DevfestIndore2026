"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ContentPillarsSection from "@/components/ContentPillarsSection";
import SpaceCollaborationSection from "@/components/SpaceCollaborationSection";
import ShowcaseZonesSection from "@/components/ShowcaseZonesSection";
import ThreeDFlowSection from "@/components/ThreeDFlowSection";
import EventRecapSection from "@/components/EventRecapSection";
import SatelliteEventsSection from "@/components/SatelliteEventsSection";
import CallForSpeakersSection from "@/components/CallForSpeakersSection";
import FeaturedTeamSection from "@/components/FeaturedTeamSection";
// import ScheduleSection from "@/components/ScheduleSection";
import TicketsSection from "@/components/TicketsSection";
import SponsorsSection from "@/components/SponsorsSection";
import SplitSessionsSection from "@/components/SplitSessionsSection";
import GalleryVideoSection from "@/components/GalleryVideoSection";
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
      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Full-Screen 3D Hero Section */}
        <HeroSection />

        {/* Double-decker Animated Marquee Banner */}
        <MarqueeBanner />

        {/* 3D Journey & Collective Flow Component */}
        <div id="flow">
          <ThreeDFlowSection />
        </div>

        {/* 5 Strategic Content Pillars (Space Tech, Agentic AI, Physical AI, Data, Enterprise) */}
        <div id="pillars">
          <ContentPillarsSection />
        </div>

        {/* Split Sessions Section: Left Scrollable Sessions & Right Sticky Live Agentic Terminal Console */}
        <div id="sessions-split">
          <SplitSessionsSection />
        </div>

        {/* Space Club of India Collaboration */}
        <div id="space-collaboration">
          <SpaceCollaborationSection />
        </div>

        {/* Venue Experience & 9 Dedicated Zones */}
        <div id="zones">
          <ShowcaseZonesSection />
        </div>

        {/* Official Call for Speakers — Space Edition Poster & Proposal Portal */}
        <CallForSpeakersSection />

        {/* Featured Core Organizers & Continuous Scrolling Past Speakers Ticker */}
        <FeaturedTeamSection />

        {/* High-Impact Previous Editions Photo Stream & 4K Event Cinema Video */}
        <div id="recap-gallery">
          <GalleryVideoSection />
        </div>

        {/* High-Impact Executive Event Recap Section */}
        <div id="recap">
          <EventRecapSection />
        </div>

        {/* Pre-DevFest Satellite Events & City Activations */}
        <SatelliteEventsSection />

        {/* Tickets, Pricing & Interactive Digital Badge Generator */}
        <TicketsSection />

        {/* Sponsors, Google for Developers & Community Partners */}
        <SponsorsSection />

        {/* Venue, Essentia Luxury Hotel Indore & Transit Guide */}
        <VenueSection />

        {/* Frequently Asked Questions Accordion */}
        <FaqSection />
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
