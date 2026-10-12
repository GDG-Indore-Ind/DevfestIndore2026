"use client";

import {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CONTENT_PILLARS, ContentPillar } from "@/data/ecosystemData";

const iconMap: Record<string, any> = {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
};

const colorBorderMap = {
  blue: "hover:border-[#4285f4] border-gray-200",
  red: "hover:border-[#ea4335] border-gray-200",
  yellow: "hover:border-[#f9ab00] border-gray-200",
  green: "hover:border-[#34a853] border-gray-200",
};

const colorBgMap = {
  blue: "bg-[#4285f4]",
  red: "bg-[#ea4335]",
  yellow: "bg-[#f9ab00]",
  green: "bg-[#34a853]",
};

export default function ContentPillarsSection() {
  return (
    <section id="pillars" className="py-20 bg-[#fafbfc] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4285f4]" />
            <span>Core Curriculum & Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1e1e] mb-4">
            5 Strategic Content Pillars
          </h2>
          <p className="text-base sm:text-lg text-[#5f6368] leading-relaxed">
            Curated to connect space tech, generative & physical AI, scalable data foundations, and enterprise venture adoption in Central India.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={pillar.id}
                className={`p-7 rounded-3xl bg-white border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between ${
                  colorBorderMap[pillar.color]
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${
                        colorBgMap[pillar.color]
                      } text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] px-2.5 py-1 rounded-full bg-gray-100">
                      Pillar #{pillar.id.slice(0, 5)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1e1e1e] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-extrabold text-[#4285f4] mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-bold text-[#1e1e1e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>Key Focus Points:</span>
                    </div>
                    <ul className="space-y-1.5">
                      {pillar.focusPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#5f6368]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-2">
                  <div className="text-[11px] font-semibold text-[#5f6368] flex items-start gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#ea4335] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1e1e1e]">Contributors:</strong> {pillar.potentialContributors}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
