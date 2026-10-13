"use client";

import { SPONSORS } from "@/data/devfestData";
import { Handshake, Download, Mail, Sparkles, Rocket } from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function SponsorsSection() {
  const { isDark } = useTheme();

  return (
    <section id="sponsors" className="py-12 md:py-16 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Handshake className="w-4 h-4 text-[#34a853]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"
              }`}>
              Mission Ground Support • Ecosystem
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Sponsors <span className="text-[#4285f4]"></span>
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"
            }`}>
            Proudly supported by organizations championing open developer communities,
            inclusive technology, and student innovation across India.
          </p>
        </div>

        {/* Title Sponsor Banner — space telemetry glass */}
        <div className="reveal-on-scroll mb-12">
          <CardTilt className={`telemetry-card rounded-3xl google-card-shadow p-8 sm:p-12 text-center transition-all ${isDark ? "bg-[#4285f4]/8 border-[#4285f4]/25" : "!bg-white !border-blue-200/80 shadow-xl"
            }`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285f4] text-white text-xs font-black uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Title Sponsor</span>
            </div>

            <div className={`max-w-md mx-auto py-6 px-8 rounded-2xl google-pill-shadow mb-4 hover:scale-105 transition-transform border ${isDark ? "bg-[#0d0d0d] border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
              <span className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#f9ab00]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
                <span className={`text-xl font-normal ml-1 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  for Developers
                </span>
              </span>
            </div>
            <p className={`text-sm max-w-xl mx-auto font-normal leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"
              }`}>
              Empowering developers with the tools, SDKs, and platform APIs to build the next generation of intelligent software worldwide.
            </p>
          </CardTilt>
        </div>

        {/* Community Partners Grid */}
        <div className="mb-16 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#34a853]/15 text-[#34a853] border border-[#34a853]/40">
              ✦ Collaborating Community & Campus Chapters ✦
            </span>
          </div>
          {SPONSORS.communityPartners?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SPONSORS.communityPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-all text-center h-28 ${isDark ? "bg-[#0d0d0d] border-white/10 hover:border-white/30" : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                    }`}
                >
                  {partner.icon !== "" && (
                    <img
                      src={partner.icon}
                      alt={partner.name}
                      className="h-12 w-auto object-contain max-w-[180px]"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sponsor Callout Box */}
        <CardTilt className={`p-8 sm:p-10 rounded-3xl google-card-shadow flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll border ${isDark ? "bg-[#f9ab00]/8 border-[#f9ab00]/25" : "bg-amber-50/70 border-amber-200/80 shadow-md"
          }`}>
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#f9ab00] text-black text-xs font-black uppercase tracking-wider mb-2">
              Opportunities Open
            </span>
            <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Partner with DevFest Indore 2026
            </h3>
            <p className={`text-sm font-normal leading-relaxed max-w-xl mt-1.5 ${isDark ? "text-white/85" : "text-gray-700"
              }`}>
              Gain direct visibility among 1,500+ top software developers, tech architects, and hiring-ready engineering talent from Central India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:organizers@gdgindore.in?subject=DevFest%20Indore%202026%20Sponsorship%20Inquiry"
              className="px-6 py-3 rounded-2xl bg-[#4285f4] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#3367d6] hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Organizers</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1bjqfMjXgin7pjslttbJmnryaoioAkHFG/view?usp=sharing"
              className={`px-6 py-3 rounded-2xl text-xs sm:text-[13px] font-bold uppercase tracking-wider border google-pill-shadow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer ${isDark ? "bg-white/5 text-white border-white/20 hover:bg-white/10" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                }`}
            >
              <Download className="w-4 h-4" />
              <span>Sponsor Deck</span>
            </a>
          </div>
        </CardTilt>
      </div>
    </section>
  );
}
