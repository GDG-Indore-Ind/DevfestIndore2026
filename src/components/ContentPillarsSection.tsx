"use client";

import { useState } from "react";
import {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Activity,
  Globe2,
} from "lucide-react";
import { CONTENT_PILLARS } from "@/data/ecosystemData";
import { useTheme } from "@/contexts/ThemeContext";

const iconMap: Record<string, any> = {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
};

const pillarAccents = {
  blue: {
    color: "#4285f4",
    border: "border-[#4285f4]",
    text: "text-[#4285f4]",
    glow: "shadow-[0_0_40px_rgba(66,133,244,0.25)]",
    tag: "ORBITAL TELEMETRY",
  },
  red: {
    color: "#ea4335",
    border: "border-[#ea4335]",
    text: "text-[#ea4335]",
    glow: "shadow-[0_0_40px_rgba(234,67,53,0.25)]",
    tag: "NEURAL SWARMS",
  },
  yellow: {
    color: "#f9ab00",
    border: "border-[#f9ab00]",
    text: "text-[#f9ab00]",
    glow: "shadow-[0_0_40px_rgba(249,171,0,0.25)]",
    tag: "EDGE SILICON",
  },
  green: {
    color: "#34a853",
    border: "border-[#34a853]",
    text: "text-[#34a853]",
    glow: "shadow-[0_0_40px_rgba(52,168,83,0.25)]",
    tag: "CLOUD NATIVE",
  },
};

export default function ContentPillarsSection() {
  const { isDark } = useTheme();
  const [activePillarId, setActivePillarId] = useState<string>("space-tech");

  const activePillar =
    CONTENT_PILLARS.find((p) => p.id === activePillarId) || CONTENT_PILLARS[0];
  const activeAccent = pillarAccents[activePillar.color] || pillarAccents.blue;
  const ActiveIcon = iconMap[activePillar.icon] || Sparkles;

  return (
    <section id="pillars" className="py-16 md:py-24 bg-transparent transition-colors relative overflow-hidden">
      {/* Ambient Radial Mesh (Awwwards Event Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#4285f4]/10 via-[#ea4335]/5 to-[#f9ab00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-3 hover:scale-105 transition-transform">
              <Activity className="w-3.5 h-3.5 text-[#4285f4]" />
              <span className={isDark ? "text-white" : "text-gray-900"}>Core Curriculum Architecture • Spatial Matrix</span>
              <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-[1.08]">
              <span className={isDark ? "text-white" : "text-gray-950"}>5 Strategic</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
                Content Pillars
              </span>
            </h2>
          </div>

          <p className={`text-sm sm:text-base font-medium max-w-md ${isDark ? "text-white/75" : "text-gray-600"}`}>
            Curated to connect space tech, generative & physical AI, scalable data foundations, and enterprise venture adoption in Central India.
          </p>
        </div>

        {/* Master Awwwards Interactive Spatial Radar & Expandable Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Vertical Minimalist Interactive Navigation Track */}
          <div className="lg:col-span-5 space-y-3">
            {CONTENT_PILLARS.map((pillar, idx) => {
              const isSelected = pillar.id === activePillarId;
              const accent = pillarAccents[pillar.color] || pillarAccents.blue;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  onMouseEnter={() => setActivePillarId(pillar.id)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? isDark
                        ? `bg-[#0d1117] ${accent.border} ${accent.glow} translate-x-2`
                        : `bg-white border-[#111827] shadow-xl translate-x-2`
                      : isDark
                        ? "bg-[#0d0d0d]/60 border-white/10 hover:border-white/25 hover:bg-[#121212]"
                        : "bg-white/80 border-gray-200 hover:border-gray-400 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#4285f4] text-white dark:bg-white dark:text-black shadow-md"
                        : isDark
                          ? "bg-white/5 text-white/60"
                          : "bg-gray-100 text-gray-700"
                    }`}>
                      0{idx + 1}
                    </span>

                    <div>
                      <h4 className={`text-base font-black transition-colors ${
                        isSelected
                          ? isDark ? "text-white" : "text-gray-950"
                          : isDark ? "text-white/70 group-hover:text-white" : "text-gray-700 group-hover:text-black"
                      }`}>
                        {pillar.title}
                      </h4>
                      <span className={`text-[11px] font-mono font-bold tracking-wider uppercase block ${
                        isSelected ? accent.text : isDark ? "text-white/40" : "text-gray-400"
                      }`}>
                        {accent.tag}
                      </span>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                    isSelected ? "translate-x-1" : "opacity-30 group-hover:opacity-70"
                  }`}>
                    <ChevronRight className={`w-5 h-5 ${isSelected ? accent.text : isDark ? "text-white" : "text-black"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 Cols): Thematic Spatial Projection Lounge (Dynamic Reactive Showcase) */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border-2 transition-all relative overflow-hidden ${
              isDark
                ? `bg-[#0a0d14] ${activeAccent.border} ${activeAccent.glow}`
                : `bg-white border-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.08)]`
            }`}>
              {/* Giant Background Watermark Number */}
              <div className="absolute right-4 bottom-0 text-[140px] font-mono font-black opacity-[0.04] dark:opacity-[0.06] select-none pointer-events-none leading-none">
                0{CONTENT_PILLARS.findIndex((p) => p.id === activePillarId) + 1}
              </div>

              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: activeAccent.color }}
                    className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg"
                  >
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-black tracking-widest uppercase text-gray-400 block">
                      CURRICULUM SPECIFICATION
                    </span>
                    <span className={`text-xs font-mono font-black uppercase ${activeAccent.text}`}>
                      {activeAccent.tag} • SECTOR 2026
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-mono font-black px-3 py-1.5 rounded-full border ${
                  isDark
                    ? "bg-white/5 border-white/15 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                }`}>
                  PILLAR #0{CONTENT_PILLARS.findIndex((p) => p.id === activePillarId) + 1}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className={`text-2xl sm:text-4xl font-black mb-2 tracking-tight ${
                isDark ? "text-white" : "text-gray-950"
              }`}>
                {activePillar.title}
              </h3>
              <div className={`text-xs sm:text-sm font-black mb-5 uppercase tracking-wider ${activeAccent.text}`}>
                {activePillar.subtitle}
              </div>

              <p className={`text-sm sm:text-base leading-relaxed mb-8 ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}>
                {activePillar.description}
              </p>

              {/* Key Deliverables & Focus Points */}
              <div className="mb-8">
                <div className={`text-xs font-mono font-black uppercase tracking-wider mb-3 ${
                  isDark ? "text-white/60" : "text-gray-500"
                }`}>
                  Core Exploration Tracks:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePillar.focusPoints.map((point, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-2.5 ${
                        isDark
                          ? "bg-white/5 border-white/10 hover:border-white/20"
                          : "bg-gray-50 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <CheckCircle2
                        style={{ color: activeAccent.color }}
                        className="w-4 h-4 shrink-0 mt-0.5"
                      />
                      <span className={`text-xs font-bold leading-snug ${
                        isDark ? "text-white/85" : "text-gray-800"
                      }`}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecosystem Contributors Strip */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isDark ? "bg-black/40 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className={`text-xs font-semibold ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    <strong className={isDark ? "text-white" : "text-black"}>Participants:</strong>{" "}
                    {activePillar.potentialContributors}
                  </span>
                </div>

                <a
                  href="#sessions-split"
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all hover:scale-105 shadow-sm ${
                    isDark
                      ? "bg-white text-black border-white"
                      : "bg-[#4285f4] text-white border-[#4285f4] hover:bg-[#3367d6]"
                  }`}
                >
                  <span>Explore Track</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
