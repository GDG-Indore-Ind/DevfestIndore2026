"use client";

import { useEffect, useRef } from "react";
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
import { useTheme } from "@/contexts/ThemeContext";

const iconMap: Record<string, any> = {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
};

const colorBorderMap = {
  blue: "hover:border-[#4285f4] border-gray-200 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(66,133,244,0.18)]",
  red: "hover:border-[#ea4335] border-gray-200 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(234,67,53,0.18)]",
  yellow: "hover:border-[#f9ab00] border-gray-200 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(249,171,0,0.18)]",
  green: "hover:border-[#34a853] border-gray-200 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(52,168,83,0.18)]",
};

const colorBgMap = {
  blue: "bg-[#4285f4]",
  red: "bg-[#ea4335]",
  yellow: "bg-[#f9ab00]",
  green: "bg-[#34a853]",
};

export default function ContentPillarsSection() {
  const { isDark } = useTheme();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-trigger reveal animation for pillars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pillars" className="py-12 md:py-16 bg-transparent transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-3 hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-[#4285f4]" />
            <span className={isDark ? "text-white" : "text-gray-900"}>Core Curriculum & Strategy</span>
            <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            5 Strategic Content Pillars
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            Curated to connect space tech, generative & physical AI, scalable data foundations, and enterprise venture adoption in Central India.
          </p>
        </div>

        {/* Pillars Grid with scroll-triggered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{ transitionDelay: `${idx * 120}ms` }}
                className={`p-7 rounded-3xl border-2 transition-all duration-700 opacity-0 translate-y-8 flex flex-col justify-between ${
                  isDark
                    ? "bg-[#0d0d0d]/90 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    : "bg-white shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                } ${colorBorderMap[pillar.color]}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${
                        colorBgMap[pillar.color]
                      } text-white flex items-center justify-center shadow-md transition-transform hover:scale-110`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isDark ? "bg-white/10 text-white/80 border-white/15" : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}>
                      Pillar #{pillar.id.slice(0, 5)}
                    </span>
                  </div>

                  <h3 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-black text-[#4285f4] mb-3 uppercase tracking-wider">
                    {pillar.subtitle}
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? "text-white/75" : "text-gray-600"}`}>
                    {pillar.description}
                  </p>

                  <div className="mb-6">
                    <div className={`text-xs font-black uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <span>Key Focus Points:</span>
                    </div>
                    <ul className="space-y-2">
                      {pillar.focusPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] shrink-0 mt-0.5" />
                          <span className={isDark ? "text-white/80" : "text-gray-700"}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`pt-4 border-t mt-2 ${isDark ? "border-white/10" : "border-gray-100"}`}>
                  <div className={`text-[11px] font-semibold flex items-start gap-1.5 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    <Users className="w-3.5 h-3.5 text-[#ea4335] shrink-0 mt-0.5" />
                    <span>
                      <strong className={isDark ? "text-white" : "text-gray-900"}>Contributors:</strong> {pillar.potentialContributors}
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
