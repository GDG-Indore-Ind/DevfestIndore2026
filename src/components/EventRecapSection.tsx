"use client";

import { Award, Users, BookOpen, Rocket, CheckCircle2, HeartHandshake } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function EventRecapSection() {
  const { isDark } = useTheme();

  const recapMetrics = [
    {
      metric: "600+",
      label: "Professional Attendees",
      sub: "Engineers, founders & enterprise leaders",
      color: "text-[#4285f4]",
      lightBg: "bg-blue-50 border-blue-200",
      darkBg: "bg-[#4285f4]/10 border-[#4285f4]/25",
    },
    {
      metric: "5 Pillars",
      label: "Integrated Curriculum",
      sub: "Space Tech, Agentic AI, Physical AI, Data & Enterprise",
      color: "text-[#ea4335]",
      lightBg: "bg-red-50 border-red-200",
      darkBg: "bg-[#ea4335]/10 border-[#ea4335]/25",
    },
    {
      metric: "2 Parallel",
      label: "Hands-on Workshop Tracks",
      sub: "Autonomous Agents & Satellite / Edge Sensors",
      color: "text-[#f9ab00]",
      lightBg: "bg-amber-50 border-amber-200",
      darkBg: "bg-[#f9ab00]/10 border-[#f9ab00]/25",
    },
    {
      metric: "1 Key Initiative",
      label: "Space Club of India Alliance",
      sub: "Unlocking space-data & aerospace awareness in MP",
      color: "text-[#34a853]",
      lightBg: "bg-emerald-50 border-emerald-200",
      darkBg: "bg-[#34a853]/10 border-[#34a853]/25",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-transparent transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 sm:p-12 rounded-3xl border-2 transition-all ${
          isDark
            ? "bg-[#0d0d0d]/90 border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            : "bg-white border-gray-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
        }`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-4 hover:scale-105 transition-transform">
              <Award className="w-3.5 h-3.5 text-[#34a853]" />
              <span className={isDark ? "text-white" : "text-gray-900"}>Executive Summary & Impact</span>
              <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
              DevFest Indore 2026 Comprehensive Recap
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Designed not merely as a talk-track conference, but as the cornerstone catalyst for Central India's burgeoning technology, robotics, and aerospace ecosystem.
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recapMetrics.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? item.darkBg : item.lightBg
                }`}
              >
                <div>
                  <div className={`text-3xl sm:text-4xl font-black mb-1 ${item.color}`}>
                    {item.metric}
                  </div>
                  <div className={`font-black text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Commitments */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t text-xs ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4285f4] shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sm font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Verified Professional Profile
                </strong>
                <p className={`leading-relaxed ${isDark ? "text-white/75" : "text-gray-600"}`}>
                  Carefully vetted participant profile prioritizing software engineers, enterprise architects, and technology innovators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-[#ea4335] shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sm font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Madhya Pradesh Orbit
                </strong>
                <p className={`leading-relaxed ${isDark ? "text-white/75" : "text-gray-600"}`}>
                  Connecting grassroots students and developers with real aerospace entrepreneurs and private space ventures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sm font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Tangible Next Steps
                </strong>
                <p className={`leading-relaxed ${isDark ? "text-white/75" : "text-gray-600"}`}>
                  Protected time for product demos, startup angel conversations, and follow-through collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
