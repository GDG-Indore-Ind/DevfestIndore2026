"use client";

import { useState } from "react";
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
import { useEffect } from "react";
import { trackPageImpression } from "@/lib/telemetryService";

export default function Home() {
  // Initialize Awwwards-style IntersectionObserver scroll animations
  useScrollReveal();

  useEffect(() => {
    trackPageImpression();
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
        {/* Full-Screen 3D Hero Section */}
        <HeroSection />

        {/* Double-decker Animated Marquee Banner with Brand Logos */}
        <MarqueeBanner />

        {/* About Section (Fixed: Anchor target for Navigation #about) */}
        <div id="about">
          <AboutSection />
        </div>

        {/* 3D Journey & Collective Flow Component */}
        <div id="flow">
          <ThreeDFlowSection />
        </div>

        {/* 5 Strategic Content Pillars (Space Tech, Agentic AI, Physical AI, Data, Enterprise) */}
        <div id="pillars">
          <ContentPillarsSection />
        </div>

        {/* Space Club of India Collaboration */}
        <div id="space-collaboration">
          <SpaceCollaborationSection />
        </div>

        {/* Official Call for Speakers — Space Edition Poster & Sessionize Portal */}
        <div id="call-for-speakers">
          <CallForSpeakersSection />
        </div>

        {/* Featured Core Organizers & Continuous Scrolling Past Speakers Ticker (Includes Speakers Coming Soon) */}
        <div id="speakers">
          <FeaturedTeamSection />
        </div>

        {/* High-Impact Previous Editions Photo Stream Carousel (Video Player hidden as requested) */}
        <div id="recap-gallery">
          <GalleryVideoSection />
        </div>

        {/* Live Instagram Feed & Social Reels Stream (Official Elfsight Widget) */}
        <div id="social-stream">
          <InstagramFeedSection />
        </div>

        {/* High-Impact Executive Event Recap Section */}
        <div id="recap">
          <EventRecapSection />
        </div>

        {/* Pre-DevFest Satellite Events & City Activations */}
        <div id="satellite-events">
          <SatelliteEventsSection />
        </div>

        {/* Tickets, Pricing & Interactive Digital Badge Generator */}
        <div id="tickets">
          <TicketsSection />
        </div>

        {/* Sponsors, Google for Developers & Community Partners */}
        <div id="sponsors">
          <SponsorsSection />
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* Mission Launchpad • Coordinates & Essentia Luxury Hotel (Positioned Right Above Footer) */}
        <div id="venue">
          <VenueSection />
        </div>
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
