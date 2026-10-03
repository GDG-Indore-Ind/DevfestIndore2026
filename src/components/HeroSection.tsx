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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#fafbfc] bg-grid-pattern">
      {/* Animated ambient color halos */}
      <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full bg-[#c3ecf6]/40 blur-3xl pointer-events-none -z-10 animate-pulse-halo" />
      <div className="absolute top-28 right-1/4 w-80 h-80 rounded-full bg-[#ffe7a5]/40 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#ccf6c5]/40 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-[#f8d8d8]/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Animated CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 reveal-on-scroll">
            {/* Eyebrow badge with live pulse */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-6 hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] -ml-5" />
              <span className="text-xs font-black tracking-wide uppercase text-[#1e1e1e]">
                Google Developer Group Indore
              </span>
              <span className="text-xs text-[#5f6368] font-bold">|</span>
              <span className="text-xs font-bold text-[#4285f4]">Annual Flagship Techfest</span>
            </div>

            {/* Main Creative Title with Roll-up Text Mask */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1e1e1e] leading-[1.05] mb-6">
              <span className="block">DEVFEST</span>
              <span className="block mt-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00] hover:brightness-110 transition-all">
                INDORE 2026
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-xl text-[#1e1e1e]/85 font-medium max-w-2xl mb-6 leading-relaxed">
              Central India's premier gathering of <strong>1,500+ builders</strong>, engineers, and creators.
              Discover breakthroughs in <strong>GenAI, Cloud, Web, Android & Open Source</strong> — right in the heart of
              India's cleanest and most vibrant city!
            </p>

            {/* Event Key Facts Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm hover:translate-y-[-2px] transition-transform">
                <Calendar className="w-4 h-4 text-[#4285f4]" />
                <span>Saturday, Nov 28, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm hover:translate-y-[-2px] transition-transform">
                <MapPin className="w-4 h-4 text-[#ea4335]" />
                <span>Essentia Luxury Hotel Indore</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ccf6c5] border border-[#5cdb6d] text-xs font-extrabold text-[#1e1e1e]">
                <Flame className="w-4 h-4 text-[#34a853]" />
                <span>Registrations Open</span>
              </div>
            </div>

            {/* Primary Action Buttons with Roll-up Text & Glow */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#tickets"
                onClick={triggerHeroConfetti}
                className="glow-btn"
              >
                <span className="glow-btn__surface group !bg-[#4285f4] !text-white !border-none !py-3.5 !px-8">
                  <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="roll-text-container">
                    <span className="roll-text-top">Get Tickets Now</span>
                    <span className="roll-text-bottom">Claim Your Pass →</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#agenda"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#ffe7a5] text-[#1e1e1e] font-extrabold text-sm uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#ffd427] transition-all"
              >
                <Code2 className="w-4 h-4 text-[#1e1e1e]" />
                <span className="roll-text-container">
                  <span className="roll-text-top">Explore Agenda</span>
                  <span className="roll-text-bottom text-[#ea4335]">View 20+ Sessions</span>
                </span>
              </a>

              <a
                href="https://sessionize.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-[#1e1e1e] font-bold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] hover:bg-[#f0f0f0] transition-colors"
              >
                <span className="roll-text-container">
                  <span className="roll-text-top">Call for Speakers (CFP)</span>
                  <span className="roll-text-bottom text-[#4285f4]">Apply on Papercall →</span>
                </span>
              </a>
            </div>

            {/* Live Countdown Timer Section */}
            <div className="w-full max-w-lg bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow spotlight-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold tracking-wider uppercase text-[#5f6368] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f9ab00]" />
                  Countdown to DevFest Indore 2026
                </span>
                <span className="text-[11px] font-bold text-[#34a853] bg-[#ccf6c5] px-2 py-0.5 rounded-md animate-pulse">
                  Live Clock
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-[#c3ecf6] border border-[#57caff] p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-[#1e1e1e]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1e1e1e]/70">
                    Days
                  </span>
                </div>
                <div className="bg-[#ffe7a5] border border-[#ffd427] p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-[#1e1e1e]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1e1e1e]/70">
                    Hours
                  </span>
                </div>
                <div className="bg-[#ccf6c5] border border-[#5cdb6d] p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-[#1e1e1e]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1e1e1e]/70">
                    Minutes
                  </span>
                </div>
                <div className="bg-[#f8d8d8] border border-[#ff7daf] p-2.5 rounded-xl hover:scale-105 transition-transform">
                  <span className="block text-2xl sm:text-3xl font-black text-[#ea4335]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#ea4335]/70">
                    Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Creative 3D Tilt Card & Interactive Stickers */}
          <div className="lg:col-span-5 relative flex justify-center items-center reveal-on-scroll delay-200">
            {/* Floating Stickers with Animaker & Phlox playful physics */}
            <div className="absolute -top-4 -left-6 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ffe7a5] border-2 border-[#1e1e1e] google-pill-shadow animate-float hover:rotate-6 cursor-pointer transition-transform">
              <span className="text-base">🏆</span>
              <span className="text-xs font-extrabold text-[#1e1e1e]">#1 Cleanest City Vibe</span>
            </div>

            <div className="absolute top-1/4 -right-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ccf6c5] border-2 border-[#1e1e1e] google-pill-shadow animate-float-alt hover:-rotate-6 cursor-pointer transition-transform">
              <span className="text-base">⚡</span>
              <span className="text-xs font-extrabold text-[#1e1e1e]">GenAI & Cloud Labs</span>
            </div>

            <div className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#c3ecf6] border-2 border-[#1e1e1e] google-pill-shadow animate-float hover:rotate-3 cursor-pointer transition-transform">
              <Users className="w-4 h-4 text-[#4285f4]" />
              <span className="text-xs font-extrabold text-[#1e1e1e]">1,500+ Devs</span>
            </div>

            <div className="absolute -bottom-6 right-8 z-20 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#f8d8d8] border-2 border-[#1e1e1e] google-pill-shadow animate-float-alt hover:-rotate-3 cursor-pointer transition-transform">
              <span className="text-base">🍲</span>
              <span className="text-xs font-extrabold text-[#ea4335]">Poha, Jalebi & Code</span>
            </div>

            {/* Central Mascot 3D Tilt Card */}
            <CardTilt className="w-full max-w-md bg-white rounded-3xl p-5 border-3 border-[#1e1e1e] google-card-shadow group">
              {/* Card Header with Google 4 Dots */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="w-3 h-3 rounded-full bg-[#34a853] animate-bounce" style={{ animationDelay: "450ms" }} />
                </div>
                <span className="text-xs font-mono font-bold text-[#5f6368]">
                  indore.devfest.2026
                </span>
              </div>

              {/* Generated Mascot Artwork with Zoom Hover */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] border border-gray-200">
                <Image
                  src="/images/hero-mascot_2026.jpg"
                  alt="GDG DevFest Mascot & Tech Shapes"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Card Footer Callout */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-sm text-[#1e1e1e]">
                    Devfest Indore 2026
                  </h2>
                  <p className="text-xs text-[#5f6368]">
                    Essentia Luxury Hotel Indore • Nov 28
                  </p>
                </div>
                <button
                  onClick={triggerHeroConfetti}
                  className="p-2.5 rounded-xl bg-[#ffe7a5] hover:bg-[#ffd427] border border-[#1e1e1e] text-xs font-bold transition-all active:scale-90 hover:scale-105 shadow-sm"
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
