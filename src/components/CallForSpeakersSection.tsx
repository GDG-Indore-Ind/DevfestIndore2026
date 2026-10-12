"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mic,
  QrCode,
  ArrowRight,
  Send,
  Star,
  Users,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function CallForSpeakersSection() {
  const { isDark } = useTheme();
  const [copiedLink, setCopiedLink] = useState(false);

  const triggerCfpConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://sessionize.com/devfest-indore-2026/");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const tracks = [
    { name: "GenAI & LLMs", color: "#4285f4", desc: "Agentic AI, Gemini 1.5, RAG & PyTorch" },
    { name: "Cloud & DevOps", color: "#34a853", desc: "Google Cloud Platform, K8s & Infra" },
    { name: "Mobile & Android", color: "#34a853", desc: "Jetpack Compose, Flutter & Kotlin" },
    { name: "Web & Frameworks", color: "#ea4335", desc: "Next.js 16, Turbopack & Performance" },
    { name: "Open Source", color: "#f9ab00", desc: "Community tools & Developer Experience" },
  ];

  const speakerPerks = [
    "Full All-Access VIP Pass to DevFest Indore 2026",
    "Exclusive Speaker & Google Experts Dinner",
    "Limited-Edition Astronaut Space Merchandise & Swag Kit",
    "Accommodation Support at Essentia Luxury Hotel Indore",
    "Dedicated 1:1 Mentorship for First-Time Speakers",
  ];

  return (
    <section
      id="call-for-speakers"
      className="py-20 md:py-28 relative overflow-hidden transition-colors duration-300 bg-transparent"
    >
      {/* Anchor for legacy #speakers navigation */}
      <span id="speakers" className="absolute -top-24 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="text-[#f9ab00] cosmic-sparkle text-sm font-black">✦</span>
            <span className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Speaker Call Open
            </span>
            <span className="text-xs text-gray-400 font-bold">|</span>
            <span className="text-xs font-bold text-[#4285f4]">DevFest Indore 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#f9ab00] to-[#ea4335]">
              Call for Speakers
            </span>
          </h2>
          <p className={`mt-3 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-white/70" : "text-gray-600"
          }`}>
            Share your ideas, inspire the next wave of 1,500+ builders, and take the stage in Central India's biggest tech festival.
          </p>
        </div>

        {/* Master Showcase: The Poster Card Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-on-scroll">
          {/* Left/Main Column: The DevFest Indore Space Poster Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <CardTilt
              className={`rounded-3xl p-6 sm:p-10 border transition-all relative overflow-hidden flex flex-col justify-between h-full shadow-xl ${
                isDark
                  ? "bg-[#0a0a0a]/90 border-white/15 shadow-[0_0_50px_rgba(66,133,244,0.15)]"
                  : "!bg-white !border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              }`}
            >
              {/* Poster Top Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200 dark:border-white/10">
                {/* Google Developer Group Indore Brand */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-6 rounded-full bg-[#4285f4] -rotate-12" />
                    <span className="w-2.5 h-6 rounded-full bg-[#ea4335] rotate-12" />
                    <span className="w-2.5 h-6 rounded-full bg-[#34a853] -rotate-12" />
                  </div>
                  <div>
                    <span className={`block text-xs sm:text-sm font-black tracking-tight leading-none ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      Google Developer Group
                    </span>
                    <span className="text-[11px] font-bold text-gray-500">Indore</span>
                  </div>
                </div>

                {/* { DevFest } Indore 2026 Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5">
                  <span className="font-mono font-black text-xs text-[#4285f4]">{"{"}</span>
                  <span className={`font-black text-xs ${isDark ? "text-white" : "text-gray-900"}`}>DevFest</span>
                  <span className="font-mono font-black text-xs text-[#34a853]">{"}"}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black">
                    इंदौर 2026
                  </span>
                </div>
              </div>

              {/* Poster Core Content: Bold Poster Headline & Space Astronaut Mascot */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4">
                {/* Headline Text */}
                <div className="sm:col-span-7 flex flex-col justify-center">
                  <div className="relative">
                    <span className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] block text-gray-900 dark:text-white">
                      Call for
                    </span>
                    <span className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] block text-gray-900 dark:text-white mt-1">
                      Speakers
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base font-semibold text-gray-600 dark:text-white/70 max-w-sm">
                    Share your ideas, inspire the next wave
                  </p>

                  {/* Poster 4-Color Dots Accent */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-pulse" />
                    <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-pulse" style={{ animationDelay: "200ms" }} />
                    <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-pulse" style={{ animationDelay: "400ms" }} />
                    <span className="w-3 h-3 rounded-full bg-[#34a853] animate-pulse" style={{ animationDelay: "600ms" }} />
                    <span className="text-xs font-mono font-bold text-gray-400 dark:text-white/40 ml-2">
                      Indore Tech Universe
                    </span>
                  </div>
                </div>

                {/* Astronaut Mascot Illustration with 4-Point Star Sparkle */}
                <div className="sm:col-span-5 relative flex flex-col items-center justify-center">
                  {/* Floating 4-Point Sparkle Star from Poster */}
                  <div className="absolute -top-3 right-6 z-20 animate-bounce">
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-7 h-7 fill-current ${isDark ? "text-[#f9ab00]" : "text-gray-900"}`}
                      aria-hidden="true"
                    >
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>

                  {/* Astronaut Mascot Artwork */}
                  <div className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isDark ? "bg-black/50" : "bg-white"
                  }`}>
                    <Image
                      src={isDark ? "/images/astronaut-mascot-dark.jpg" : "/images/astronaut-mascot-light.jpg"}
                      alt="DevFest Indore Space Astronaut Illustration - Call for Speakers"
                      fill
                      sizes="(max-width: 640px) 176px, 208px"
                      className="object-contain p-1 hover:scale-105 transition-transform duration-500"
                      priority
                      unoptimized
                    />
                  </div>

                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase mt-2 ${
                    isDark ? "text-white/40" : "text-gray-400"
                  }`}>
                    Official Poster Mascot
                  </span>
                </div>
              </div>

              {/* Poster Bottom Bar: Date & Submit Proposal Button */}
              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                {/* 28th November 2026 Badge with Clock Icon */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white">
                    <Calendar className="w-5 h-5 text-[#4285f4]" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono font-bold uppercase text-gray-400 dark:text-white/50">
                      Conference Date
                    </span>
                    <span className={`text-sm font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      28th November 2026
                    </span>
                  </div>
                </div>

                {/* Poster Pill Button: "Submit your proposal" with Gradient Border */}
                <a
                  href="https://sessionize.com/devfest-indore-2026/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerCfpConfetti}
                  className="space-proposal-btn group shrink-0"
                >
                  <span className="space-proposal-btn__inner !py-3 !px-7">
                    <span className="text-[#f9ab00] cosmic-sparkle text-sm">✦</span>
                    <span className="roll-text-container">
                      <span className="roll-text-top">Submit your proposal</span>
                      <span className="roll-text-bottom text-[#4285f4]">Apply on Sessionize →</span>
                    </span>
                  </span>
                </a>
              </div>
            </CardTilt>
          </div>

          {/* Right Column: Interactive Details, Tracks & QR Quick-Apply */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick QR & Mobile Apply Card */}
            <div
              className={`rounded-3xl p-6 border transition-all ${
                isDark
                  ? "bg-[#0d0d0d]/90 border-white/15 shadow-md"
                  : "!bg-white !border-gray-200/90 shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4285f4]/15 text-[#4285f4] text-xs font-bold mb-1">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Sessionize CFP Platform</span>
                  </div>
                  <h3 className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    Scan & Apply in 2 Minutes
                  </h3>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
                  title="Copy CFP Link"
                >
                  {copiedLink ? "✓ Link Copied" : "Copy Link"}
                </button>
              </div>

              {/* QR Code Graphic Box with Poster Styling */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <div className="relative w-24 h-24 rounded-xl bg-white p-2 border border-gray-300 dark:border-white/20 shrink-0 shadow-sm flex flex-col items-center justify-center text-center">
                  <QrCode className="w-16 h-16 text-gray-900" />
                  <span className="text-[9px] font-mono font-bold text-gray-600">Scan to Apply</span>
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    Open your smartphone camera to access our official <strong>Sessionize Proposal Portal</strong> directly.
                  </p>
                  <a
                    href="https://sessionize.com/devfest-indore-2026/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4285f4] hover:underline mt-2"
                  >
                    <span>Open sessionize.com link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Talk Tracks & Themes */}
            <div
              className={`rounded-3xl p-6 border transition-all flex-1 ${
                isDark
                  ? "bg-[#0d0d0d]/90 border-white/15 shadow-md"
                  : "!bg-white !border-gray-200/90 shadow-md"
              }`}
            >
              <h3 className={`text-base font-black mb-3 flex items-center justify-between ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <span>Focus Tracks & Themes</span>
                <span className="text-xs font-normal text-gray-500">5 Tracks</span>
              </h3>

              <div className="space-y-2.5">
                {tracks.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className={`text-xs font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 text-right truncate max-w-[170px]">
                      {t.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Speaker Perks Callout */}
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase text-gray-400 dark:text-white/50 block mb-2">
                  Speaker Benefits & VIP Perks
                </span>
                <ul className="space-y-1.5">
                  {speakerPerks.slice(0, 3).map((perk, idx) => (
                    <li
                      key={idx}
                      className={`text-xs font-medium flex items-center gap-2 ${
                        isDark ? "text-white/75" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
