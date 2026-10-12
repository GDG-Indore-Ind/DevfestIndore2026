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

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-[#4285f4] border-blue-200",
  red: "bg-red-100 text-[#ea4335] border-red-200",
  yellow: "bg-yellow-100 text-amber-700 border-yellow-200",
  green: "bg-green-100 text-[#34a853] border-green-200",
};

export default function ShowcaseZonesSection() {
  return (
    <section id="showcase-zones" className="py-20 bg-[#fafbfc] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#34a853]" />
            <span>Venue Experience & Floor Plan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1e1e] mb-4">
            Venue Experience & 9 Dedicated Zones
          </h2>
          <p className="text-base sm:text-lg text-[#5f6368] leading-relaxed">
            From the Qualcomm showcase to the Experts' and Community lounges, explore how the Essentia Hotel floor plan is designed for maximum connection and discovery.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUE_ZONES.map((zone) => {
            const Icon = iconMap[zone.icon] || Sparkles;
            return (
              <div
                key={zone.id}
                className="p-6 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#1e1e1e] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-[#1e1e1e] flex items-center justify-center border border-gray-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                        badgeColorMap[zone.color] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {zone.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e1e1e] mb-1">
                    {zone.name}
                  </h3>
                  <div className="text-xs font-extrabold text-[#4285f4] mb-3">
                    {zone.highlight}
                  </div>
                  <p className="text-xs text-[#5f6368] leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#5f6368]">
                  <span>Essentia Hotel Floor Plan</span>
                  <span className="font-bold text-[#1e1e1e]">Zone #{zone.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
