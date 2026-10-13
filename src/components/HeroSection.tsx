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
  Ticket,
  UserCheck,
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
        /* Dark Mode: Full-Width 4K Vibrant Keynote Arena across the background with electric stage beams */
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-[#000000]">
          {/* Main Full-width 4K Stage Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/devfest-hero-live-stage-4k.jpg"
              alt="DevFest Indore Keynote Arena Stage"
              fill
              priority
              quality={98}
              className="object-cover object-right lg:object-center w-full h-full opacity-95 transition-all duration-700"
            />
          </div>

          {/* Gentle smooth gradient on far left to guarantee white text contrast without dimming the stage */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />
          
          {/* Top and Bottom soft vignette fades */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Glowing electric cyan and violet ambient light cones */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0070f3]/20 rounded-full blur-[140px] z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#d946ef]/15 rounded-full blur-[130px] z-10 pointer-events-none" />
        </div>
      ) : (
        /* Light Mode: 4K Vivid Airy Space Earth Background matching user design reference */
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-[#f0f6ff]">
          <Image
            src="/images/devfest-light-space-earth-bg-4k.jpg"
            alt="DevFest Indore Light Space Earth Atmosphere"
            fill
            priority
            quality={98}
            className="object-cover object-right md:object-center w-full h-full opacity-95 transition-all duration-700"
          />
          {/* Subtle soft gradient fade on left for crisp text legibility */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-2/5 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/70 to-transparent z-10 pointer-events-none" />
        </div>
      )}

      {/* Main Content Area - Full Width with Generous Responsive Edge Padding */}
      <div className="w-full max-w-[1750px] mx-auto px-5 sm:px-8 md:px-12 lg:px-14 xl:px-20 relative z-20 flex-1 flex flex-col justify-center">
        <div className={`grid grid-cols-1 ${!isDark ? "lg:grid-cols-12" : "lg:grid-cols-12"} gap-8 lg:gap-12 items-center`}>
          {/* Main Hero Column */}
          <div className={`${!isDark ? "lg:col-span-7" : "lg:col-span-8"} flex flex-col items-start text-left z-10`}>
            {/* Top Badge Pill */}
            {isDark ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-4 sm:mb-5 transition-transform hover:scale-105 border bg-[#0d1526]/80 border-[#0070f3]/40 text-[#57caff] shadow-[0_0_20px_rgba(0,112,243,0.3)]">
                <span className="text-[#f9ab00] text-xs font-black">✦</span>
                <span className="text-xs font-semibold tracking-wide">
                  A Google Developer Groups Initiative
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 sm:mb-5 transition-transform hover:scale-105 border bg-white/95 border-gray-200 shadow-sm text-gray-800">
                <span className="text-[#f9ab00] text-xs font-black">✦</span>
                <span className="text-xs font-bold tracking-wider font-mono uppercase">
                  GOOGLE DEVELOPER GROUP INDORE
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-semibold text-[#1a73e8]">
                  DevFest 2026 Space Edition
                </span>
                <div className="flex items-center gap-1 ml-1">
                  <span className="w-2 h-2 rounded-full bg-[#4285f4]" />
                  <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
                  <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
                  <span className="w-2 h-2 rounded-full bg-[#34a853]" />
                </div>
              </div>
            )}

            {/* Title: DevFest Indore 2026 */}
            {isDark ? (
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
            ) : (
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight leading-[1.02] mb-4">
                <span
                  className="block text-transparent bg-clip-text font-black"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #0070f3 0%, #00c6ff 25%, #f9ab00 55%, #ea4335 80%, #d946ef 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  DEVFEST
                </span>
                <span className="block text-[#111827] font-black tracking-tight">
                  INDORE 2026
                </span>
              </h1>
            )}

            {/* Sub-headline: Build Together for a Smarter Tomorrow (Only in Dark Mode as per user screenshot) */}
            {isDark && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3">
                Build Together for a Smarter Tomorrow.
              </h2>
            )}

            {/* Description Paragraph */}
            <p className={`text-sm sm:text-base max-w-xl mb-6 leading-relaxed ${
              isDark ? "text-white/80 font-normal" : "text-[#374151] font-medium"
            }`}>
              {isDark ? (
                "A flagship community event bringing together developers, creators, researchers and industry leaders to learn, build and grow with the latest in AI, Cloud, Web, Android and more."
              ) : (
                <>
                  Central India&apos;s premier gathering of{" "}
                  <strong className="text-[#111827] font-extrabold">1,500+ builders</strong>,
                  engineers, and creators. Discover breakthroughs in{" "}
                  <strong className="text-[#111827] font-extrabold">
                    GenAI, Cloud, Web, Android & Open Source
                  </strong>{" "}
                  — right in the heart of India&apos;s cleanest and most vibrant city!
                </>
              )}
            </p>

            {/* Event Date & Location Info Row */}
            {isDark ? (
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center border bg-[#0070f3]/15 border-[#0070f3]/40 text-[#0070f3]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-white">
                      Sat, 28 November 2026
                    </span>
                    <span className="block text-xs text-white/60">
                      9:00 AM – 6:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center border bg-[#ea4335]/15 border-[#ea4335]/40 text-[#ea4335]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-white">
                      Essentia Luxury Hotel
                    </span>
                    <span className="block text-xs text-white/60">
                      Indore, Madhya Pradesh
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Light Mode Info Pills matching exact Reference Screenshot */
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-gray-200/90 shadow-sm text-xs font-semibold text-gray-800">
                  <Calendar className="w-4 h-4 text-[#1a73e8]" />
                  <span>28th November 2026</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-gray-200/90 shadow-sm text-xs font-semibold text-gray-800">
                  <MapPin className="w-4 h-4 text-[#ea4335]" />
                  <span>Essentia Luxury Hotel Indore</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#e6f4ea] border border-[#ceead6] shadow-sm text-xs font-bold text-[#137333]">
                  <UserCheck className="w-4 h-4 text-[#137333]" />
                  <span>Registrations Open</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isDark ? (
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
                  className="px-6 py-3.5 rounded-full font-bold text-sm border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-[#0a0d14]/80 border-white/20 text-white hover:bg-white/10"
                >
                  <span>View Schedule</span>
                </a>
              </div>
            ) : (
              /* Light Mode Buttons matching exact Reference Screenshot */
              <div className="flex flex-wrap items-center gap-4 mb-7">
                <a
                  href="#tickets"
                  onClick={triggerHeroConfetti}
                  className="px-7 py-3.5 rounded-full font-bold text-sm bg-[#1a73e8] hover:bg-[#1557b0] text-white flex items-center gap-2.5 shadow-[0_6px_20px_rgba(26,115,232,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span className="tracking-wide">GET TICKETS NOW</span>
                  <span className="text-base font-black">→</span>
                </a>

                <a
                  href="#call-for-speakers"
                  className="px-6 py-3.5 rounded-full font-bold text-sm bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-[#f9ab00]">✦</span>
                  <span>Submit your proposal (CFP)</span>
                </a>
              </div>
            )}

            {/* Social Proof (Dark Mode) OR Telemetry Card (Light Mode) */}
            {isDark ? (
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
                <span className="text-xs sm:text-sm font-semibold text-white/85">
                  <strong className="text-white">1,500+</strong> developers are already registered
                </span>
              </div>
            ) : (
              /* Light Mode: Mission Telemetry Countdown Card matching exact Screenshot */
              <div className="w-full max-w-md rounded-2xl p-4 bg-white/95 border border-gray-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-gray-800">
                    <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>MISSION TELEMETRY • T-MINUS LAUNCH</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34a853] animate-pulse" />
                    LIVE ORBIT CLOCK
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {/* Days */}
                  <div className="rounded-xl p-2.5 text-center bg-[#e8f0fe] border border-[#d2e3fc]">
                    <span className="block text-2xl font-black text-[#1a73e8] leading-none mb-1">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      DAYS
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="rounded-xl p-2.5 text-center bg-[#fef7e0] border border-[#feefc3]">
                    <span className="block text-2xl font-black text-[#e37400] leading-none mb-1">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      HOURS
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="rounded-xl p-2.5 text-center bg-[#e6f4ea] border border-[#ceead6]">
                    <span className="block text-2xl font-black text-[#137333] leading-none mb-1">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      MINUTES
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="rounded-xl p-2.5 text-center bg-[#fce8e6] border border-[#fad2cf]">
                    <span className="block text-2xl font-black text-[#d93025] leading-none mb-1">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      SECONDS
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: */}
          {/* IN DARK MODE: We keep the right area open and clean so the full 4K keynote stage visual shines through unobstructed without the floating box */}
          {/* IN LIGHT MODE: We show the exact Astronaut card with Browser Frame, sparkles, and Prapti badge! */}
          {isDark ? (
            <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center relative pointer-events-none select-none">
              {/* Subtle ambient stage perspective callout matching theme */}
              <div className="text-right pr-4 transform -rotate-2 opacity-80 hover:opacity-100 transition-opacity">
                <span className="font-serif italic text-2xl xl:text-3xl text-white/80 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
                  Build
                </span>
                <span className="font-serif italic text-2xl xl:text-3xl text-white/80 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
                  Learn
                </span>
                <span className="font-serif italic text-2xl xl:text-3xl text-white/80 tracking-wide block drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
                  Network
                </span>
                <span className="font-serif italic text-2xl xl:text-3xl text-[#57caff] font-bold tracking-wide block drop-shadow-[0_2px_20px_rgba(0,112,243,0.6)]">
                  Create Impact
                </span>
              </div>
            </div>
          ) : (
            /* LIGHT MODE: Exact Astronaut Card in Browser Window matching Reference Screenshot */
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <CardTilt className="w-full max-w-md rounded-3xl p-5 group relative transition-all duration-300 border bg-white/95 border-gray-200/90 shadow-[0_20px_60px_rgba(66,133,244,0.18)]">
                {/* Browser / OS Window Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f9ab00]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34a853]" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-gray-500">
                    indore.devfest.2026/space
                  </span>
                </div>

                {/* Astronaut Artwork */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gradient-to-b from-blue-50/50 to-white">
                  <Image
                    src="/images/astronaut-mascot-light.jpg"
                    alt="GDG DevFest Indore Space Mascot"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Card Footer Callout */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm flex items-center gap-1.5 text-gray-900">
                      <span>DevFest Indore 2026</span>
                      <span className="text-xs text-[#f9ab00]">✦</span>
                    </h3>
                    <p className="text-xs font-medium text-gray-600 mt-0.5">
                      Essentia Luxury Hotel Indore • Nov 28
                    </p>
                  </div>

                  {/* Prapti Badge matching Screenshot */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-amber-50/80 border-amber-200 text-amber-900 text-xs font-bold shadow-sm">
                    <span className="text-xs">👩‍🚀</span>
                    <span>Prapti</span>
                  </div>
                </div>
              </CardTilt>
            </div>
          )}
        </div>

        {/* BOTTOM METRICS STRIP (Shown in Dark Mode as requested; Light Mode has the Telemetry Clock Card inside hero) */}
        {isDark && (
        <div className="mt-12 pt-6">
          <div className="rounded-2xl p-4 sm:p-5 border transition-all bg-[#080d19]/80 backdrop-blur-xl border-[#0070f3]/25 shadow-[0_0_35px_rgba(0,112,243,0.2)]">
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
        )}
      </div>
    </section>
  );
}
