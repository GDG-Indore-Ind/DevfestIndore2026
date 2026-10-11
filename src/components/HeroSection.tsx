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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[var(--page-bg,#000000)] bg-grid-pattern">
      {/* Animated ambient cosmic halos */}
      {/* <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full bg-[#4285f4]/25 blur-3xl pointer-events-none -z-10 animate-pulse-halo" /> */}
      {/* <div className="absolute top-28 right-1/4 w-80 h-80 rounded-full bg-[#f9ab00]/20 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "1s" }} /> */}
      {/* <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#34a853]/20 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "2s" }} /> */}
      {/* <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-[#ea4335]/15 blur-3xl pointer-events-none -z-10" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Animated CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 reveal-on-scroll">
            {/* Space Edition Eyebrow badge with Google 4-dots */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full telemetry-card google-pill-shadow mb-6 hover:scale-105 transition-transform">
              <span className="text-[#f9ab00] cosmic-sparkle text-xs font-black">✦</span>
              <span className="text-xs font-black tracking-wide uppercase text-white">
                Google Developer Group Indore
              </span>
              <span className="text-xs text-white/40 font-bold">|</span>
              <span className="text-xs font-bold text-[#4285f4]">DevFest 2026 Space Edition</span>
              <div className="hidden sm:flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285f4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              </div>
            </div>

            {/* Main Creative Title — cosmic gradient on dark */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {/* DEVFEST — per-letter rainbow gradient matching theme poster */}
              <span className="block relative">
                <span className="absolute -top-6 -left-3 text-lg text-[#f9ab00] cosmic-sparkle select-none pointer-events-none">✦</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#34a853] via-30% via-[#f9ab00] to-[#ea4335]"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #4285f4 0%, #57caff 15%, #34a853 30%, #5cdb6d 45%, #f9ab00 60%, #ffd427 72%, #ea4335 85%, #ff7daf 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  DEVFEST
                </span>
              </span>
              <span className="block mt-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#f9ab00] to-[#34a853] hover:brightness-110 transition-all">
                INDORE 2026
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-xl text-white/75 font-medium max-w-2xl mb-6 leading-relaxed">
              Central India's premier gathering of <strong className="text-white">1,500+ builders</strong>, engineers, and creators.
              Discover breakthroughs in <strong className="text-white">GenAI, Cloud, Web, Android & Open Source</strong> — right in the heart of
              India's cleanest and most vibrant city!
            </p>

            {/* Event Key Facts Bar with Calendar & Google Dots like poster */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl telemetry-card text-xs font-bold text-white shadow-sm hover:translate-y-[-2px] transition-transform">
                <Calendar className="w-4 h-4 text-[#4285f4]" />
                <span>28th November 2026</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl telemetry-card text-xs font-bold text-white shadow-sm hover:translate-y-[-2px] transition-transform">
                <MapPin className="w-4 h-4 text-[#ea4335]" />
                <span>Essentia Luxury Hotel Indore</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#34a853]/20 border border-[#34a853]/50 text-xs font-extrabold text-[#34a853]">
                <Flame className="w-4 h-4" />
                <span>Registrations Open</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl telemetry-card">
                <span className="w-2 h-2 rounded-full bg-[#4285f4]" />
                <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
                <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
                <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#tickets"
                onClick={triggerHeroConfetti}
                className="glow-btn"
              >
                <span className="glow-btn__surface group !bg-[#4285f4] !text-white !border-none !py-3.5 !px-8 shadow-[0_0_25px_rgba(66,133,244,0.5)]">
                  <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="roll-text-container">
                    <span className="roll-text-top">Get Tickets Now</span>
                    <span className="roll-text-bottom">Claim Your Pass →</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="https://sessionize.com/devfest-indore-2026/"
                target="_blank"
                rel="noreferrer"
                className="space-proposal-btn group"
              >
                <span className="space-proposal-btn__inner">
                  <span className="text-[#f9ab00] cosmic-sparkle text-sm">✦</span>
                  <span className="roll-text-container">
                    <span className="roll-text-top">Submit your proposal (CFP)</span>
                    <span className="roll-text-bottom text-[#4285f4]">Apply on Sessionize →</span>
                  </span>
                </span>
              </a>
            </div>

            {/* Live Countdown Timer — Space Telemetry Card */}
            <div className="w-full max-w-lg telemetry-card p-4 sm:p-5 rounded-2xl google-pill-shadow spotlight-card">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${
                  isDark ? "text-white/70" : "text-gray-700"
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
                  isDark ? "bg-[#4285f4]/15 border-[#4285f4]/40" : "bg-[#4285f4]/10 border-[#4285f4]/35 shadow-sm"
                }`}>
                  <span className={`block text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-[#4285f4]"}`}>
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    Days
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#f9ab00]/15 border-[#f9ab00]/40" : "bg-[#f9ab00]/10 border-[#f9ab00]/35 shadow-sm"
                }`}>
                  <span className={`block text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-[#f9ab00]"}`}>
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    Hours
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#34a853]/15 border-[#34a853]/40" : "bg-[#34a853]/10 border-[#34a853]/35 shadow-sm"
                }`}>
                  <span className={`block text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-[#34a853]"}`}>
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    Minutes
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border transition-transform hover:scale-105 ${
                  isDark ? "bg-[#ea4335]/15 border-[#ea4335]/40" : "bg-[#ea4335]/10 border-[#ea4335]/35 shadow-sm"
                }`}>
                  <span className="block text-2xl sm:text-3xl font-black text-[#ea4335]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-[#ea4335]/60" : "text-[#ea4335]/80"}`}>
                    Seconds
                  </span>
                </div>
              </div>

              {/* Spaceport coordinates footer */}
              <div className="mt-3 pt-2.5 border-t border-black/8 dark:border-white/10 flex items-center justify-between text-[10px] font-mono font-bold text-gray-500 dark:text-white/40">
                <span>SECTOR: MP-INDORE // ORBIT-01</span>
                <span>LAT 22.7196° N • LON 75.8577° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilt Card (Astronaut Mascot with Mountain Sunset Visor) */}
          <div className="lg:col-span-5 relative flex justify-center items-center reveal-on-scroll delay-200">
            {/* Concentric Celestial Orbit Ring backdrop */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#4285f4]/25 dark:border-[#4285f4]/30 pointer-events-none -z-10 animate-spin-slow" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-[#f9ab00]/20 pointer-events-none -z-10" />
            {/* Floating Celestial Stickers */}
            <div className="absolute -top-4 -left-6 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#f9ab00]/15 border border-[#f9ab00]/50 animate-float hover:rotate-6 cursor-pointer transition-transform backdrop-blur-md">
              <span className="text-base">🏆</span>
              <span className="text-xs font-extrabold text-[#f9ab00]">#1 Cleanest City Vibe</span>
            </div>

            <div className="absolute top-1/4 -right-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#34a853]/15 border border-[#34a853]/50 animate-float-alt hover:-rotate-6 cursor-pointer transition-transform backdrop-blur-md">
              <span className="text-base">⚡</span>
              <span className="text-xs font-extrabold text-[#34a853]">GenAI & Cloud Cosmos</span>
            </div>

            <div className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#4285f4]/15 border border-[#4285f4]/50 animate-float hover:rotate-3 cursor-pointer transition-transform backdrop-blur-md">
              <Users className="w-4 h-4 text-[#4285f4]" />
              <span className="text-xs font-extrabold text-[#4285f4]">1,500+ Tech Pioneers</span>
            </div>

            <div className="absolute -bottom-6 right-8 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ea4335]/15 border border-[#ea4335]/50 animate-float-alt hover:-rotate-3 cursor-pointer transition-transform backdrop-blur-md">
              <span className="text-base">🍲</span>
              <span className="text-xs font-extrabold text-[#ea4335]">Poha, Jalebi & Code</span>
            </div>

            {/* Central Astronaut Mascot 3D Tilt Card — adapts to light / dark poster theme */}
            <CardTilt className={`w-full max-w-md telemetry-card rounded-3xl p-5 shadow-[0_0_50px_rgba(66,133,244,0.25)] group relative transition-colors duration-300 ${
              isDark ? "bg-[#0d0d0d]/85 border-white/15" : "!bg-white !border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            }`}>
              {/* Poster 4-point sparkle star overlay */}
              <div className={`absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center text-lg cosmic-sparkle shadow-lg ${
                isDark ? "bg-black/80 border border-white/20 text-[#f9ab00]" : "bg-white border border-gray-300 text-gray-900 shadow-md"
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
                <span className={`text-xs font-mono font-bold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                  indore.devfest.2026/space
                </span>
              </div>

              {/* Astronaut Mascot Artwork — dynamically switches to crisp white vector in Light Mode matching the poster */}
              <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border shadow-inner ${
                isDark
                  ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] border-white/10"
                  : "!bg-white !border-gray-100"
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
                  <h2 className={`font-extrabold text-sm flex items-center gap-1.5 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    <span>DevFest Indore 2026</span>
                    <span className="text-xs text-[#f9ab00]">✦</span>
                  </h2>
                  <p className={`text-xs ${isDark ? "text-white/55" : "text-gray-500"}`}>
                    Essentia Luxury Hotel Indore • Nov 28
                  </p>
                </div>
                <button
                  onClick={triggerHeroConfetti}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 hover:scale-105 shadow-sm ${
                    isDark
                      ? "bg-[#f9ab00]/20 hover:bg-[#f9ab00]/35 border-white/20 text-white"
                      : "bg-[#f9ab00]/15 hover:bg-[#f9ab00]/25 border-[#f9ab00]/40 text-gray-900"
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
