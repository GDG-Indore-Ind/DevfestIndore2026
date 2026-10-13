"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Play,
  Maximize2,
  Users,
  Mic,
  LayoutGrid,
  Laptop,
  Trophy,
  Cpu,
  Globe,
  Cloud,
  Smartphone,
  Share2,
  Heart,
  Briefcase,
  Rocket,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroSection() {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 44,
    hours: 8,
    minutes: 32,
    seconds: 15,
  });

  // Real-time countdown to DevFest Indore: Nov 28, 2026
  useEffect(() => {
    const targetDate = new Date("2026-11-28T09:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerHeroConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
    });
  };

  const topicPills = [
    { label: "AI", icon: Cpu, color: "text-[#22d3ee] border-[#22d3ee]/40 bg-[#22d3ee]/10" },
    { label: "Web", icon: Globe, color: "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10" },
    { label: "Cloud", icon: Cloud, color: "text-[#60a5fa] border-[#60a5fa]/40 bg-[#60a5fa]/10" },
    { label: "Android", icon: Smartphone, color: "text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/10" },
    { label: "Open Source", icon: Share2, color: "text-[#fb923c] border-[#fb923c]/40 bg-[#fb923c]/10" },
    { label: "Community", icon: Heart, color: "text-[#e879f9] border-[#e879f9]/40 bg-[#e879f9]/10" },
    { label: "Career", icon: Briefcase, color: "text-[#f472b6] border-[#f472b6]/40 bg-[#f472b6]/10" },
    { label: "Startups", icon: Rocket, color: "text-[#f87171] border-[#f87171]/40 bg-[#f87171]/10" },
  ];

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden min-h-[92vh] flex flex-col justify-between">
      {/* DYNAMIC ATMOSPHERIC HERO BACKGROUND */}
      {isDark ? (
        /* Dark Mode: Full-Width HD Keynote Arena on the right fading cleanly to deep black on the left */
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-[#000000]">
          {/* Main Full-width HD Stage Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/devfest-stage-fullwidth-dark.jpg"
              alt="DevFest Indore Keynote Arena Stage"
              fill
              priority
              quality={100}
              className="object-cover object-right md:object-center w-full h-full opacity-90 scale-100 transition-all duration-700"
            />
          </div>

          {/* Smooth horizontal gradient: deep black on left (for text readability) seamlessly fading into the stage on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 w-full sm:w-2/3" />
          
          {/* Top and Bottom soft vignette fades */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />

          {/* Glowing electric cyan and violet ambient light cones */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0070f3]/25 rounded-full blur-[140px] z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#d946ef]/15 rounded-full blur-[130px] z-10 pointer-events-none" />
        </div>
      ) : (
        /* Light Mode: Airy Blue Breeze with DevFest Community Group backdrop & Subtle Space Research India Accents */
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-[#e8f2fe] via-[#f0f6fc] to-[#ffffff]">
          <Image
            src="/images/devfest-group-hero-light.jpg"
            alt="DevFest Indore Community & Builders"
            fill
            priority
            className="object-cover object-center opacity-22 mix-blend-multiply scale-102 transition-all duration-700"
          />
          {/* Subtle Airy Breeze Swirling Gradient Glows */}
          <div className="absolute -top-32 left-1/3 w-[650px] h-[650px] bg-gradient-to-tr from-[#c8e2fc]/60 via-[#e1f0fe]/50 to-transparent rounded-full blur-[100px] animate-breeze-glow" />
          <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-[#dbeafe]/70 rounded-full blur-[110px]" />

          {/* Ultra-subtle Indian Space Research Achievements Blueprint telemetry */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-45">
            <div className="absolute top-28 right-8 lg:right-16 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#4285f4]/25 backdrop-blur-sm text-[11px] font-mono text-[#1a73e8] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00] animate-pulse" />
              <span>ISRO ADITYA-L1 // HALO ORBIT 1.5M KM</span>
            </div>
            <div className="absolute top-1/2 left-4 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[#34a853]/25 backdrop-blur-sm text-[10px] font-mono text-[#137333]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              <span>CHANDRAYAAN-3 // LUNAR SOUTH POLE 69.37° S</span>
            </div>
            <div className="absolute bottom-28 right-12 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[#ea4335]/25 backdrop-blur-sm text-[10px] font-mono text-[#c5221f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea4335]" />
              <span>GAGANYAAN CREW // 400 KM LEO TRAJECTORY</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-1 flex flex-col justify-center">
        <div className={`grid grid-cols-1 ${!isDark ? "lg:grid-cols-12" : "lg:grid-cols-12"} gap-8 lg:gap-12 items-center`}>
          {/* Main Hero Column (Occupies 7 cols on Light mode when card is present, or 8-9 cols on Dark mode with right callout) */}
          <div className={`${!isDark ? "lg:col-span-7" : "lg:col-span-8"} flex flex-col items-start text-left z-10`}>
            {/* Pill: A Google Developer Groups Initiative */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-4 sm:mb-5 transition-transform hover:scale-105 border ${
              isDark
                ? "bg-[#0d1526]/80 border-[#0070f3]/40 text-[#57caff] shadow-[0_0_20px_rgba(0,112,243,0.3)]"
                : "bg-white/95 border-[#4285f4]/30 text-[#1a73e8] shadow-sm"
            }`}>
              <span className="text-[#f9ab00] text-xs font-black">✦</span>
              <span className="text-xs font-semibold tracking-wide">
                A Google Developer Groups Initiative
              </span>
            </div>

            {/* Title: DevFest Indore 2026 */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1] mb-4">
              <span className="text-white drop-shadow-md">DevFest</span>{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ea4335 0%, #f9ab00 35%, #34a853 65%, #4285f4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Indore
              </span>{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #4285f4 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                2026
              </span>
            </h1>

            {/* Sub-headline: Build Together for a Smarter Tomorrow. */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3">
              Build Together for a Smarter Tomorrow.
            </h2>

            {/* Description Paragraph */}
            <p className={`text-sm sm:text-base max-w-xl mb-6 font-normal leading-relaxed ${
              isDark ? "text-white/80" : "text-gray-700"
            }`}>
              A flagship community event bringing together developers, creators, researchers and industry leaders to learn, build and grow with the latest in AI, Cloud, Web, Android and more.
            </p>

            {/* Event Date & Location Info Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8 text-sm">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isDark ? "bg-[#0070f3]/15 border-[#0070f3]/40 text-[#0070f3]" : "bg-blue-50 border-blue-200 text-[#4285f4]"
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    Sat, 28 November 2026
                  </span>
                  <span className={`block text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>
                    9:00 AM – 6:00 PM IST
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isDark ? "bg-[#ea4335]/15 border-[#ea4335]/40 text-[#ea4335]" : "bg-red-50 border-red-200 text-[#ea4335]"
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    Essentia Luxury Hotel
                  </span>
                  <span className={`block text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>
                    Indore, Madhya Pradesh
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Book Your Pass Now → & View Schedule */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#tickets"
                onClick={triggerHeroConfetti}
                className="px-7 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#0070f3] to-[#00a3ff] text-white hover:brightness-110 flex items-center gap-2 shadow-[0_0_30px_rgba(0,112,243,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book Your Pass Now</span>
                <span className="text-base font-black">→</span>
              </a>

              <a
                href="#sessions-split"
                className={`px-6 py-3.5 rounded-full font-bold text-sm border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isDark
                    ? "bg-[#0a0d14]/80 border-white/20 text-white hover:bg-white/10"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm"
                }`}
              >
                <span>View Schedule</span>
              </a>
            </div>

            {/* Social Proof: Avatars + 1,500+ developers are already registered */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-[#4285f4] flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-[#ea4335] flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-[#f9ab00] flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-[#34a853] flex items-center justify-center text-white text-xs font-bold">
                  K
                </div>
              </div>
              <span className={`text-xs sm:text-sm font-semibold ${isDark ? "text-white/85" : "text-gray-700"}`}>
                <strong className={isDark ? "text-white" : "text-black"}>1,500+</strong> developers are already registered
              </span>
            </div>
          </div>

          {/* Right Column: */}
          {/* IN DARK MODE: We hide the astronaut card and show the sleek "More Than Just an Event" floating video card + "Build Learn Network Create Impact" script */}
          {/* IN LIGHT MODE: We show the requested light mode Astronaut card with blue breeze! */}
          {isDark ? (
            <div className="lg:col-span-4 flex flex-col items-end justify-center relative mt-6 lg:mt-0">
              {/* Handwritten style slogan */}
              <div className="hidden xl:block text-right mb-6 transform -rotate-3 select-none pointer-events-none">
                <span className="font-serif italic text-3xl xl:text-4xl text-white/90 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                  Build
                </span>
                <span className="font-serif italic text-3xl xl:text-4xl text-white/90 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                  Learn
                </span>
                <span className="font-serif italic text-3xl xl:text-4xl text-white/90 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                  Network
                </span>
                <span className="font-serif italic text-3xl xl:text-4xl text-white/90 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                  Create Impact
                </span>
              </div>

              {/* Floating Dark Glass Event Highlight Card matching Reference Screenshot */}
              <div className="w-full max-w-sm rounded-3xl p-4 sm:p-5 bg-[#0a0d14]/85 backdrop-blur-xl border border-white/15 shadow-[0_0_40px_rgba(0,112,243,0.35)] relative group hover:scale-[1.02] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={triggerHeroConfetti}
                      className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg cursor-pointer"
                      title="Play Preview"
                    >
                      <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
                    </button>
                    <div>
                      <h4 className="text-sm font-bold text-white">More Than</h4>
                      <h3 className="text-base font-extrabold text-white">Just an Event</h3>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed pl-1">
                  A movement of builders, for a better tomorrow.
                </p>
              </div>
            </div>
          ) : (
            /* LIGHT MODE: Central Astronaut Mascot Card with Airy Blue Breeze */
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#4285f4]/35 pointer-events-none -z-10 animate-spin-slow" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-[#38bdf8]/35 pointer-events-none -z-10" />

              <CardTilt className="w-full max-w-md rounded-3xl p-5 group relative transition-all duration-300 border bg-white/95 border-[#4285f4]/25 shadow-[0_16px_40px_rgba(66,133,244,0.12)]">
                {/* Poster sparkle star overlay */}
                <div className="absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center text-lg cosmic-sparkle shadow-lg bg-white border border-blue-200 text-[#4285f4]">
                  ✦
                </div>

                {/* Card Header with Google 4 Dots */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="w-3 h-3 rounded-full bg-[#34a853] animate-bounce" style={{ animationDelay: "450ms" }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-600">
                    indore.devfest.2026/space
                  </span>
                </div>

                {/* Light mode artwork */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-blue-100 shadow-inner bg-gradient-to-b from-blue-50/60 to-white">
                  <Image
                    src="/images/astronaut-mascot-light.jpg"
                    alt="GDG DevFest Indore Astronaut Mascot"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />
                </div>

                {/* Card Footer Callout */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm flex items-center gap-1.5 text-gray-900">
                      <span>DevFest Indore 2026</span>
                      <span className="text-xs text-[#f9ab00]">✦</span>
                    </h3>
                    <p className="text-[13px] font-medium text-gray-600">
                      Essentia Luxury Hotel Indore • Nov 28
                    </p>
                  </div>
                  <button
                    onClick={triggerHeroConfetti}
                    className="p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 hover:scale-105 shadow-sm bg-[#4285f4]/10 hover:bg-[#4285f4]/20 border-[#4285f4]/30 text-[#4285f4]"
                    title="Celebrate with Confetti!"
                  >
                    🎉 Pop!
                  </button>
                </div>
              </CardTilt>
            </div>
          )}
        </div>

        {/* BOTTOM METRICS STRIP (Matching the Reference Screenshot in Dark Mode) */}
        <div className="mt-12 pt-6">
          <div className={`rounded-2xl p-4 sm:p-5 border transition-all ${
            isDark
              ? "bg-[#080d19]/80 backdrop-blur-xl border-[#0070f3]/25 shadow-[0_0_35px_rgba(0,112,243,0.2)]"
              : "bg-white/95 border-gray-200/90 shadow-md"
          }`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {/* Metric 1: 1,500+ Expected Attendees */}
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-2">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-[#0070f3]/20 border-[#0070f3]/40 text-[#0070f3]" : "bg-blue-50 border-blue-200 text-[#4285f4]"
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    1,500+
                  </span>
                  <span className={`block text-xs font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}>
                    Expected Attendees
                  </span>
                </div>
              </div>

              {/* Metric 2: 20+ Expert Speakers */}
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-6">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-[#ea4335]/20 border-[#ea4335]/40 text-[#ea4335]" : "bg-red-50 border-red-200 text-[#ea4335]"
                }`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    20+
                  </span>
                  <span className={`block text-xs font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}>
                    Expert Speakers
                  </span>
                </div>
              </div>

              {/* Metric 3: 05 Tracks */}
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-6">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-[#34a853]/20 border-[#34a853]/40 text-[#34a853]" : "bg-green-50 border-green-200 text-[#34a853]"
                }`}>
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    05
                  </span>
                  <span className={`block text-xs font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}>
                    Tracks
                  </span>
                </div>
              </div>

              {/* Metric 4: 30+ Hands-on Sessions */}
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-6">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-[#f9ab00]/20 border-[#f9ab00]/40 text-[#f9ab00]" : "bg-amber-50 border-amber-200 text-[#f9ab00]"
                }`}>
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    30+
                  </span>
                  <span className={`block text-xs font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}>
                    Hands-on Sessions
                  </span>
                </div>
              </div>

              {/* Metric 5: #1 Developer Community Event in Indore */}
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-6 col-span-2 sm:col-span-1">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-[#a855f7]/20 border-[#a855f7]/40 text-[#a855f7]" : "bg-purple-50 border-purple-200 text-[#a855f7]"
                }`}>
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    #1
                  </span>
                  <span className={`block text-xs font-medium ${isDark ? "text-white/65" : "text-gray-600"}`}>
                    Developer Community Event in Indore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TOPICS PILL FILTER BAR (AI, Web, Cloud, Android, Open Source, Community, Career, Startups) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {topicPills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-transform hover:scale-105 ${
                    isDark
                      ? `${pill.color} backdrop-blur-md`
                      : "bg-white border-gray-200 text-gray-800 shadow-sm hover:border-blue-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
