"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Ticket,
  Sparkles,
  ArrowRight,
  Code2,
  Users,
  Flame,
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
    const targetDate = new Date("2026-11-28T08:30:00+05:30").getTime();

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

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* DYNAMIC ATMOSPHERIC HERO BACKGROUND — Switches seamlessly with Theme Toggle */}
      {isDark ? (
        /* Dark Mode: Real DevFest Indore Stage with Keynote Screen & Packed Audience */
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[#000000]/70 z-10" />
          <Image
            src="/devfestindore.png"
            alt="DevFest Indore Grand Stage Keynote & Community Arena"
            fill
            priority
            className="object-cover object-center opacity-65 scale-105 transition-all duration-700"
          />
          {/* Volumetric stage light cones matching Google colors */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4285f4]/25 rounded-full blur-[140px] z-10" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#34a853]/20 rounded-full blur-[130px] z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />
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

          {/* Ultra-subtle Indian Space Research Achievements Blueprint telemetry (Chandrayaan-3, Aditya-L1, Gaganyaan) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-45">
            {/* Top-Right: Aditya-L1 Solar Halo Orbit Pill */}
            <div className="absolute top-28 right-8 lg:right-16 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#4285f4]/25 backdrop-blur-sm text-[11px] font-mono text-[#1a73e8] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00] animate-pulse" />
              <span>ISRO ADITYA-L1 // HALO ORBIT 1.5M KM</span>
            </div>

            {/* Center-Left: Chandrayaan-3 Lunar South Pole Coordinate */}
            <div className="absolute top-1/2 left-4 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[#34a853]/25 backdrop-blur-sm text-[10px] font-mono text-[#137333]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              <span>CHANDRAYAAN-3 // LUNAR SOUTH POLE 69.37° S</span>
            </div>

            {/* Bottom-Right: Gaganyaan Orbital Flight Vector */}
            <div className="absolute bottom-28 right-12 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[#ea4335]/25 backdrop-blur-sm text-[10px] font-mono text-[#c5221f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea4335]" />
              <span>GAGANYAAN CREW // 400 KM LEO TRAJECTORY</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Animated CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 reveal-on-scroll">
            {/* Space Edition Eyebrow badge with Google 4-dots */}
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 hover:scale-105 transition-transform border ${
              isDark
                ? "bg-black/60 border-white/15 text-white shadow-[0_0_15px_rgba(66,133,244,0.2)]"
                : "bg-white/95 border-[#4285f4]/30 text-gray-900 shadow-sm"
            }`}>
              <span className="text-[#f9ab00] cosmic-sparkle text-xs font-black">✦</span>
              <span className="text-xs font-black tracking-wide uppercase">
                Google Developer Group Indore
              </span>
              <span className="text-xs text-gray-400 font-bold">|</span>
              <span className="text-xs font-bold text-[#4285f4]">DevFest 2026 Space Edition</span>
              <div className="hidden sm:flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285f4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              </div>
            </div>

            {/* Main Creative Title — cosmic gradient on dark, crisp radiant gradient on light */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="block relative">
                <span className="absolute -top-6 -left-3 text-lg text-[#f9ab00] cosmic-sparkle select-none pointer-events-none">✦</span>
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(90deg, #4285f4 0%, #57caff 15%, #34a853 30%, #5cdb6d 45%, #f9ab00 60%, #ffd427 72%, #ea4335 85%, #ff7daf 100%)"
                      : "linear-gradient(90deg, #1a73e8 0%, #34a853 30%, #f9ab00 65%, #ea4335 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  DEVFEST
                </span>
              </span>
              <span
                className="block mt-1 font-black text-transparent bg-clip-text hover:brightness-110 transition-all"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(90deg, #4285f4, #f9ab00, #34a853)"
                    : "linear-gradient(90deg, #1a73e8, #0d652d, #1a73e8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                INDORE 2026
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className={`text-lg sm:text-xl font-normal max-w-2xl mb-6 leading-relaxed ${
              isDark ? "text-white/85" : "text-gray-700"
            }`}>
              Central India&apos;s premier gathering of <strong className={isDark ? "text-white" : "text-black"}>1,500+ builders</strong>, engineers, and creators.
              Discover breakthroughs in <strong className={isDark ? "text-white" : "text-black"}>GenAI, Cloud, Web, Android & Open Source</strong> — right in the heart of
              India&apos;s cleanest and most vibrant city!
            </p>

            {/* Event Key Facts Bar with Calendar & Google Dots */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold border transition-transform hover:-translate-y-0.5 ${
                isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-blue-200 text-gray-900 shadow-sm"
              }`}>
                <Calendar className="w-4 h-4 text-[#4285f4]" />
                <span>28th November 2026</span>
              </div>
              <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold border transition-transform hover:-translate-y-0.5 ${
                isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-red-200 text-gray-900 shadow-sm"
              }`}>
                <MapPin className="w-4 h-4 text-[#ea4335]" />
                <span>Essentia Luxury Hotel Indore</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#34a853]/20 border border-[#34a853]/50 text-xs font-extrabold text-[#34a853]">
                <Flame className="w-4 h-4" />
                <span>Registrations Open</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#tickets"
                onClick={triggerHeroConfetti}
                className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-[#4285f4] text-white hover:bg-[#3367d6] flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Tickets Now →</span>
              </a>

              <a
                href="https://sessionize.com/devfest-indore-2026/"
                target="_blank"
                rel="noreferrer"
                className={`px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-wider border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    : "bg-white border-[#4285f4]/40 text-[#4285f4] hover:bg-blue-50 shadow-sm"
                }`}
              >
                <span className="text-[#f9ab00] cosmic-sparkle text-sm">✦</span>
                <span>Submit your proposal (CFP)</span>
              </a>
            </div>

            {/* Live Countdown Timer — Space Telemetry Card */}
            <div className={`w-full max-w-lg p-4 sm:p-5 rounded-2xl border transition-all ${
              isDark
                ? "bg-[#0d0d0d]/90 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-white/95 border-gray-200/90 shadow-md"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${
                  isDark ? "text-white/85" : "text-gray-800"
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#f9ab00] animate-spin-slow" />
                  Mission Telemetry • T-Minus Launch
                </span>
                <span className="text-[11px] font-mono font-bold text-[#34a853] bg-[#34a853]/20 px-2 py-0.5 rounded-md animate-pulse">
                  ● LIVE ORBIT CLOCK
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center font-mono">
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#4285f4]/15 border-[#4285f4]/40 text-white" : "bg-[#4285f4]/10 border-[#4285f4]/35 text-[#4285f4] shadow-sm"
                }`}>
                  <span className="block text-2xl sm:text-3xl font-black">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/75" : "text-gray-700"}`}>
                    Days
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#f9ab00]/15 border-[#f9ab00]/40 text-white" : "bg-[#f9ab00]/10 border-[#f9ab00]/35 text-[#f9ab00] shadow-sm"
                }`}>
                  <span className="block text-2xl sm:text-3xl font-black">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/75" : "text-gray-700"}`}>
                    Hours
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#34a853]/15 border-[#34a853]/40 text-white" : "bg-[#34a853]/10 border-[#34a853]/35 text-[#34a853] shadow-sm"
                }`}>
                  <span className="block text-2xl sm:text-3xl font-black">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/75" : "text-gray-700"}`}>
                    Minutes
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#ea4335]/15 border-[#ea4335]/40 text-white" : "bg-[#ea4335]/10 border-[#ea4335]/35 text-[#ea4335] shadow-sm"
                }`}>
                  <span className="block text-2xl sm:text-3xl font-black text-[#ea4335]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-[#ea4335]/80" : "text-[#ea4335]/90"}`}>
                    Seconds
                  </span>
                </div>
              </div>

              {/* Spaceport coordinates footer */}
              <div className="mt-3 pt-2.5 border-t border-black/8 dark:border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-gray-600 dark:text-white/65">
                <span>SECTOR: MP-INDORE // ORBIT-01</span>
                <span>LAT 22.7196° N • LON 75.8577° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Hero Focal Card — adapts between Dark Arena and Light Airy Aesthetic */}
          <div className="lg:col-span-5 relative flex justify-center items-center reveal-on-scroll delay-200">
            {/* Concentric Celestial Orbit Ring backdrop */}
            <div className={`absolute w-[440px] h-[440px] rounded-full border border-dashed pointer-events-none -z-10 animate-spin-slow ${
              isDark ? "border-[#4285f4]/30" : "border-[#4285f4]/35"
            }`} />
            <div className={`absolute w-[320px] h-[320px] rounded-full border pointer-events-none -z-10 ${
              isDark ? "border-[#f9ab00]/20" : "border-[#38bdf8]/35"
            }`} />

            {/* Central Mascot / Venue Card — Dynamically transitions between Light and Dark themes */}
            <CardTilt
              className={`w-full max-w-md rounded-3xl p-5 group relative transition-all duration-300 border ${
                isDark
                  ? "bg-[#0d0d0d]/85 border-white/15 shadow-[0_0_50px_rgba(66,133,244,0.25)]"
                  : "bg-white/95 border-[#4285f4]/25 shadow-[0_16px_40px_rgba(66,133,244,0.12)]"
              }`}
            >
              {/* Poster sparkle star overlay */}
              <div className={`absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center text-lg cosmic-sparkle shadow-lg ${
                isDark ? "bg-black/80 border border-white/20 text-[#f9ab00]" : "bg-white border border-blue-200 text-[#4285f4]"
              }`}>
                ✦
              </div>

              {/* Card Header with Google 4 Dots */}
              <div className={`flex items-center justify-between pb-3 mb-3 border-b ${
                isDark ? "border-white/10" : "border-gray-100"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#34a853] animate-bounce" style={{ animationDelay: "450ms" }} />
                </div>
                <span className={`text-xs font-mono font-bold ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  indore.devfest.2026/space
                </span>
              </div>

              {/* Dynamic Artwork — switches between deep space mascot (Dark) and crisp airy daylight poster (Light) */}
              <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border shadow-inner ${
                isDark
                  ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] border-white/10"
                  : "bg-gradient-to-b from-blue-50/60 to-white border-blue-100"
              }`}>
                <Image
                  src={isDark ? "/images/astronaut-mascot-dark.jpg" : "/images/astronaut-mascot-light.jpg"}
                  alt="GDG DevFest Indore Astronaut Mascot & Cosmic Visor"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={`${isDark ? "object-cover" : "object-contain p-2"} group-hover:scale-105 transition-transform duration-500`}
                  priority
                  unoptimized
                />
              </div>

              {/* Card Footer Callout */}
              <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                isDark ? "border-white/10" : "border-gray-100"
              }`}>
                <div>
                  <h2 className={`font-extrabold text-sm flex items-center gap-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span>DevFest Indore 2026</span>
                    <span className="text-xs text-[#f9ab00]">✦</span>
                  </h2>
                  <p className={`text-[13px] font-medium ${isDark ? "text-white/75" : "text-gray-600"}`}>
                    Essentia Luxury Hotel Indore • Nov 28
                  </p>
                </div>
                <button
                  onClick={triggerHeroConfetti}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 hover:scale-105 shadow-sm ${
                    isDark
                      ? "bg-[#f9ab00]/20 hover:bg-[#f9ab00]/35 border-white/20 text-white"
                      : "bg-[#4285f4]/10 hover:bg-[#4285f4]/20 border-[#4285f4]/30 text-[#4285f4]"
                  }`}
                  title="Celebrate with Confetti!"
                >
                  🎉 Pop!
                </button>
              </div>
            </CardTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
