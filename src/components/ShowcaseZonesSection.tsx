"use client";

import {
  Sparkles,
  Terminal,
  Layers,
  Cpu,
  Box,
  Rocket,
  Users,
  Heart,
  Compass,
} from "lucide-react";
import { VENUE_ZONES } from "@/data/ecosystemData";
import { useTheme } from "@/contexts/ThemeContext";

const iconMap: Record<string, any> = {
  Sparkles,
  Terminal,
  Layers,
  Cpu,
  Box,
  Rocket,
  Users,
  Heart,
  Compass,
};

const badgeColorMap: Record<string, { light: string; dark: string }> = {
  blue: {
    light: "bg-blue-50 text-[#4285f4] border-blue-200",
    dark: "bg-[#4285f4]/15 text-[#38bdf8] border-[#4285f4]/30",
  },
  red: {
    light: "bg-red-50 text-[#ea4335] border-red-200",
    dark: "bg-[#ea4335]/15 text-[#f87171] border-[#ea4335]/30",
  },
  yellow: {
    light: "bg-amber-50 text-amber-800 border-amber-200",
    dark: "bg-[#f9ab00]/15 text-[#fbbf24] border-[#f9ab00]/30",
  },
  green: {
    light: "bg-emerald-50 text-[#34a853] border-emerald-200",
    dark: "bg-[#34a853]/15 text-[#4ade80] border-[#34a853]/30",
  },
};

export default function ShowcaseZonesSection() {
  const { isDark } = useTheme();

  return (
    <section id="zones" className="py-12 md:py-16 bg-transparent transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-3 hover:scale-105 transition-transform">
            <Cpu className="w-3.5 h-3.5 text-[#34a853]" />
            <span className={isDark ? "text-white" : "text-gray-900"}>Venue Experience & Floor Plan</span>
            <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Venue Experience & 9 Dedicated Zones
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            From the Qualcomm showcase to the Experts' and Community lounges, explore how the Essentia Hotel floor plan is designed for maximum connection and discovery.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUE_ZONES.map((zone) => {
            const Icon = iconMap[zone.icon] || Sparkles;
            const badgeStyle = badgeColorMap[zone.color] || badgeColorMap.blue;

            return (
              <div
                key={zone.id}
                className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                  isDark
                    ? "bg-[#0d0d0d]/90 border-white/10 hover:border-white/25 shadow-[0_0_24px_rgba(0,0,0,0.5)]"
                    : "bg-white border-gray-200/90 hover:border-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${
                      isDark ? "bg-white/10 text-white border-white/15" : "bg-gray-100 text-gray-900 border-gray-200"
                    }`}>
                      <Icon className="w-5 h-5 text-[#4285f4]" />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${
                        isDark ? badgeStyle.dark : badgeStyle.light
                      }`}
                    >
                      {zone.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {zone.name}
                  </h3>
                  <div className="text-xs font-black text-[#4285f4] mb-3 uppercase tracking-wider">
                    {zone.highlight}
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? "text-white/75" : "text-gray-600"}`}>
                    {zone.description}
                  </p>
                </div>

                <div className={`pt-3.5 border-t flex items-center justify-between text-[11px] font-bold ${
                  isDark ? "border-white/10 text-white/60" : "border-gray-100 text-gray-500"
                }`}>
                  <span>Essentia Hotel Floor Plan</span>
                  <span className={`font-mono font-black ${isDark ? "text-white" : "text-gray-900"}`}>Zone #{zone.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
