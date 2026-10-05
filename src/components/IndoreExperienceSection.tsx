"use client";

import { INDORE_HIGHLIGHTS } from "@/data/devfestData";
import { Trophy, Utensils, Building2, GraduationCap, MapPin } from "lucide-react";
import CardTilt from "./CardTilt";

export default function IndoreExperienceSection() {
  const iconList = [Trophy, Utensils, Building2, GraduationCap];

  return (
    <section id="indore-vibe" className="py-20 md:py-28 bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="text-base">📍</span>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              The Host City Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why DevFest in <span className="text-[#34a853]">Indore</span> is Unmatched
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 font-medium leading-relaxed">
            Famous across the world for unbeatable civic cleanliness, warmth, and legendary culinary culture —
            here is why traveling to Indore for DevFest is an unforgettable experience!
          </p>
        </div>

        {/* 4 Cards Grid — dark neon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {INDORE_HIGHLIGHTS.map((item, idx) => {
            const Icon = iconList[idx] || Trophy;
            const bgClass =
              item.color === "green"
                ? "bg-[#34a853]/10 border-[#34a853]/35"
                : item.color === "yellow"
                ? "bg-[#f9ab00]/10 border-[#f9ab00]/35"
                : item.color === "blue"
                ? "bg-[#4285f4]/10 border-[#4285f4]/35"
                : "bg-[#ea4335]/10 border-[#ea4335]/35";

            const badgeBg =
              item.color === "green"
                ? "bg-[#34a853] text-white"
                : item.color === "yellow"
                ? "bg-[#f9ab00] text-black"
                : item.color === "blue"
                ? "bg-[#4285f4] text-white"
                : "bg-[#ea4335] text-white";

            return (
              <div
                key={idx}
                className="reveal-on-scroll"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <CardTilt
                  className={`p-6 sm:p-8 rounded-3xl border-2 google-card-shadow flex flex-col justify-between h-full ${bgClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl animate-float-subtle">{item.emoji}</span>
                      <span
                        className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 ${badgeBg}`}
                      >
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-sm font-medium text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/70">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Indore, Madhya Pradesh
                    </span>
                    <span className="text-white/40">Indore Community Pride</span>
                  </div>
                </CardTilt>
              </div>
            );
          })}
        </div>

        {/* Extra Card: Pre-DevFest Workshop — dark neon blue */}
        <div className="reveal-on-scroll mb-16" style={{ transitionDelay: "480ms" }}>
          <CardTilt className="p-6 sm:p-8 rounded-3xl border-2 border-[#4285f4]/35 google-card-shadow flex flex-col justify-between bg-[#4285f4]/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl animate-float-subtle">💻</span>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 bg-[#4285f4] text-white">
                  Pre-DevFest Workshop
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                Pre-DevFest Hands-on Series Workshops
              </h3>
              <p className="text-sm font-medium text-white/70 leading-relaxed">
                Pre-DevFest Hands-on Series Workshops were a set of interactive, practical learning sessions conducted before DevFest to help participants gain real-world experience with modern technologies, tools, and development practices. These workshops enabled attendees to build, experiment, and strengthen their technical skills, ensuring they were well-prepared to maximize learning and engagement during the main DevFest event.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/70">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Indore, Madhya Pradesh
              </span>
              <span className="text-white/40">Indore Community Pride</span>
            </div>
          </CardTilt>
        </div>

        {/* Fun Local Culture Badges Strip — dark glass */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6 rounded-3xl google-pill-shadow flex flex-wrap items-center justify-around gap-4 text-center reveal-on-scroll">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">🥣</span>
            <div className="text-left">
              <span className="block text-xs font-black text-white">Indori Poha & Jalebi</span>
              <span className="block text-[11px] text-white/45">Served hot at morning check-in</span>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">🌙</span>
            <div className="text-left">
              <span className="block text-xs font-black text-white">Sarafa Night Food Walk</span>
              <span className="block text-[11px] text-white/45">Post-conference community crawl</span>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">🧹</span>
            <div className="text-left">
              <span className="block text-xs font-black text-white">Zero Litter Conference</span>
              <span className="block text-[11px] text-white/45">Eco-friendly & 100% segregated</span>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">🤝</span>
            <div className="text-left">
              <span className="block text-xs font-black text-white">Bhiya Ram Culture!</span>
              <span className="block text-[11px] text-white/45">Heartfelt Central India hospitality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
