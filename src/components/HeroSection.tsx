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

export default function HeroSection() {
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#000000] bg-grid-pattern">
      {/* Animated ambient color halos — vivid on dark */}
      <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full bg-[#4285f4]/25 blur-3xl pointer-events-none -z-10 animate-pulse-halo" />
      <div className="absolute top-28 right-1/4 w-80 h-80 rounded-full bg-[#f9ab00]/20 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#34a853]/20 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-[#ea4335]/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Animated CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 reveal-on-scroll">
            {/* Eyebrow badge — dark glass */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-6 hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] -ml-5" />
              <span className="text-xs font-black tracking-wide uppercase text-white">
                Google Developer Group Indore
              </span>
              <span className="text-xs text-white/40 font-bold">|</span>
              <span className="text-xs font-bold text-[#4285f4]">Annual Flagship Techfest</span>
            </div>

            {/* Main Creative Title — holographic on dark */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {/* DEVFEST — per-letter rainbow gradient matching theme.jpg */}
              <span className="block">
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

            {/* Event Key Facts Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-sm hover:translate-y-[-2px] transition-transform">
                <Calendar className="w-4 h-4 text-[#4285f4]" />
                <span>Saturday, Nov 28, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-sm hover:translate-y-[-2px] transition-transform">
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

              {/* <a
                href="#agenda"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#f9ab00]/15 text-[#f9ab00] font-extrabold text-sm uppercase tracking-wider border border-[#f9ab00]/40 hover:bg-[#f9ab00]/25 transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span className="roll-text-container">
                  <span className="roll-text-top">Explore Agenda</span>
                  <span className="roll-text-bottom text-[#ea4335]">View 20+ Sessions</span>
                </span>
              </a> */}

              <a
                href="https://sessionize.com/devfest-indore-2026/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider border border-white/20 hover:bg-white/10 transition-colors"
              >
                <span className="roll-text-container">
                  <span className="roll-text-top">Call for Speakers (CFP)</span>
                  <span className="roll-text-bottom text-[#4285f4]">Apply on Papercall →</span>
                </span>
              </a>
            </div>

            {/* Live Countdown Timer — dark glass card */}
            <div className="w-full max-w-lg bg-[#0d0d0d] p-4 sm:p-5 rounded-2xl border border-white/10 google-pill-shadow spotlight-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold tracking-wider uppercase text-white/45 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f9ab00]" />
                  Countdown to DevFest Indore 2026
                </span>
                <span className="text-[11px] font-bold text-[#34a853] bg-[#34a853]/20 px-2 py-0.5 rounded-md animate-pulse">
                  Live Clock
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-[#4285f4]/15 border border-[#4285f4]/40 p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/60">
                    Days
                  </span>
                </div>
                <div className="bg-[#f9ab00]/15 border border-[#f9ab00]/40 p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/60">
                    Hours
                  </span>
                </div>
                <div className="bg-[#34a853]/15 border border-[#34a853]/40 p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/60">
                    Minutes
                  </span>
                </div>
                <div className="bg-[#ea4335]/15 border border-[#ea4335]/40 p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-[#ea4335]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#ea4335]/60">
                    Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilt Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center reveal-on-scroll delay-200">
            {/* Floating Stickers — dark neon */}
            <div className="absolute -top-4 -left-6 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#f9ab00]/15 border border-[#f9ab00]/50 animate-float hover:rotate-6 cursor-pointer transition-transform">
              <span className="text-base">🏆</span>
              <span className="text-xs font-extrabold text-[#f9ab00]">#1 Cleanest City Vibe</span>
            </div>

            <div className="absolute top-1/4 -right-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#34a853]/15 border border-[#34a853]/50 animate-float-alt hover:-rotate-6 cursor-pointer transition-transform">
              <span className="text-base">⚡</span>
              <span className="text-xs font-extrabold text-[#34a853]">GenAI & Cloud Labs</span>
            </div>

            <div className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#4285f4]/15 border border-[#4285f4]/50 animate-float hover:rotate-3 cursor-pointer transition-transform">
              <Users className="w-4 h-4 text-[#4285f4]" />
              <span className="text-xs font-extrabold text-[#4285f4]">1,500+ Devs</span>
            </div>

            <div className="absolute -bottom-6 right-8 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ea4335]/15 border border-[#ea4335]/50 animate-float-alt hover:-rotate-3 cursor-pointer transition-transform">
              <span className="text-base">🍲</span>
              <span className="text-xs font-extrabold text-[#ea4335]">Poha, Jalebi & Code</span>
            </div>

            {/* Central Mascot 3D Tilt Card — dark glass */}
            <CardTilt className="w-full max-w-md bg-[#0d0d0d] rounded-3xl p-5 border border-white/10 shadow-[0_0_40px_rgba(66,133,244,0.2)] group">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#34a853] animate-bounce" style={{ animationDelay: "450ms" }} />
                </div>
                <span className="text-xs font-mono font-bold text-white/40">
                  indore.devfest.2026
                </span>
              </div>

              {/* Mascot Artwork */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] border border-white/8">
                <Image
                  src="/images/hero-mascot_2026.jpg"
                  alt="GDG DevFest Mascot & Tech Shapes"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  unoptimized
                />
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-sm text-white">
                    Devfest Indore 2026
                  </h2>
                  <p className="text-xs text-white/45">
                    Essentia Luxury Hotel Indore • Nov 28
                  </p>
                </div>
                <button
                  onClick={triggerHeroConfetti}
                  className="p-2.5 rounded-xl bg-[#f9ab00]/20 hover:bg-[#f9ab00]/35 border border-white/20 text-xs font-bold transition-all active:scale-90 hover:scale-105 shadow-sm"
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
