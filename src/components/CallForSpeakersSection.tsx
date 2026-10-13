"use client";

import Image from "next/image";
import { Mic, ArrowRight, Sparkles, ExternalLink, QrCode, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function CallForSpeakersSection() {
  const { isDark } = useTheme();

  return (
    <section id="call-for-speakers" className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
            <Mic className="w-4 h-4 text-[#ea4335]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Official Call for Speakers • CFP Portal
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            <span className={isDark ? "text-white" : "text-gray-900"}>Take the Stage at</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
              DevFest Indore 2026
            </span>
          </h2>

          <p className={`mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            Submit your session directly via our official Sessionize portal. Whether you are leading advancements in GenAI, building resilient Cloud systems, or pioneering Space Tech, Central India's premier stage awaits you.
          </p>
        </div>

        {/* Master Showcase Card: Full-Width Prominent Poster & Sessionize Action */}
        <div className="reveal-on-scroll">
          <CardTilt
            className={`rounded-3xl p-6 sm:p-10 md:p-12 border-2 transition-all relative overflow-hidden shadow-2xl ${
              isDark
                ? "bg-[#0d0d0d]/90 border-white/15 shadow-[0_0_60px_rgba(66,133,244,0.15)]"
                : "bg-white border-gray-200/90 shadow-[0_20px_50px_rgba(66,133,244,0.08)]"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Big Visual Mascot Poster Artwork */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-[380px] rounded-3xl overflow-hidden border-2 border-black/10 dark:border-white/15 shadow-2xl bg-gradient-to-b from-blue-500/10 to-transparent p-4 group">
                  <Image
                    src={isDark ? "/images/astronaut-mascot-dark.jpg" : "/images/astronaut-mascot-light.jpg"}
                    alt="GDG DevFest Indore 2026 Space Edition Speaker Mascot"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold">
                    OFFICIAL CFP ARTWORK
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#34a853] text-white text-[10px] font-mono font-black shadow-lg">
                    SUBMISSIONS OPEN
                  </div>
                </div>
              </div>

              {/* Right Column: Key Details, Perks & Grand Sessionize CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#4285f4]/15 text-[#4285f4] border border-[#4285f4]/30 text-xs font-mono font-black uppercase tracking-wider">
                      Hosted on Sessionize.com
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#ea4335]/15 text-[#ea4335] border border-[#ea4335]/30 text-xs font-mono font-black uppercase tracking-wider">
                      28 Nov 2026
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#34a853]/15 text-[#34a853] border border-[#34a853]/30 text-xs font-mono font-black uppercase tracking-wider">
                      Essentia Luxury Hotel
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    Share Your Engineering Breakthrough with 1,500+ Developers
                  </h3>

                  <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
                    All speaker proposals are curated through our official Sessionize review board. Submit your session abstract, bio, and technical prerequisites directly on Sessionize for prompt evaluation by the GDG Indore review committee.
                  </p>
                </div>

                {/* Speaker Perks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? "bg-white/5 border-white/10" : "bg-blue-50/60 border-blue-200/80"
                  }`}>
                    <CheckCircle2 className="w-5 h-5 text-[#4285f4] mb-2" />
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      600+ In-Hall Audience
                    </span>
                    <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? "text-white/70" : "text-gray-600"}`}>
                      Professional engineers, founders & decision makers.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isDark ? "bg-white/5 border-white/10" : "bg-red-50/60 border-red-200/80"
                  }`}>
                    <Award className="w-5 h-5 text-[#ea4335] mb-2" />
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      VIP Speaker Reception
                    </span>
                    <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? "text-white/70" : "text-gray-600"}`}>
                      Exclusive dinner & networking at Essentia Luxury Hotel.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isDark ? "bg-white/5 border-white/10" : "bg-emerald-50/60 border-emerald-200/80"
                  }`}>
                    <Sparkles className="w-5 h-5 text-[#34a853] mb-2" />
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      Full Speaker Kit
                    </span>
                    <p className={`text-[11px] mt-0.5 leading-snug ${isDark ? "text-white/70" : "text-gray-600"}`}>
                      Official DevFest Space Edition swags & digital credentials.
                    </p>
                  </div>
                </div>

                {/* Grand Action Strip */}
                <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500">
                    <Calendar className="w-4 h-4 text-[#ea4335]" />
                    <span>Evaluation Period: Ongoing • Review Rounds Weekly</span>
                  </div>

                  <a
                    href="https://sessionize.com/devfest-indore-2026/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer bg-[#4285f4] text-white hover:bg-[#3367d6]"
                  >
                    <span>Submit Proposal on Sessionize</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  );
}
