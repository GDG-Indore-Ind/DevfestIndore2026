"use client";

import { Rocket, FileCheck2, Users, Compass, Globe, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SpaceCollaborationSection() {
  const { isDark } = useTheme();

  return (
    <section id="space-collaboration" className="py-12 md:py-16 bg-transparent transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`p-8 sm:p-12 rounded-3xl border-2 transition-all ${
          isDark
            ? "bg-[#0d0d0d]/90 border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            : "bg-white border-gray-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Vision & Initiatives */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-4 hover:scale-105 transition-transform">
                <Rocket className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className={isDark ? "text-white" : "text-gray-900"}>Ecosystem Milestone Initiative</span>
                <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                Space Club of India Collaboration
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                DevFest Indore 2026 is collaborating with the <strong>Space Club of India</strong>. This initiative is designed as a catalyst for aerospace awareness, satellite communications, and space-data developer tooling in Madhya Pradesh.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <FileCheck2 className="w-4 h-4 text-[#34a853]" />
                    <span>Space Tech Collaboration</span>
                  </div>
                  <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    Joint academic and community initiatives connecting Central India developers to the private space economy.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <Users className="w-4 h-4 text-[#ea4335]" />
                    <span>Space Delegates & Experts</span>
                  </div>
                  <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    Direct interactions with satellite engineers, aerospace entrepreneurs, and researchers.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <Globe className="w-4 h-4 text-[#4285f4]" />
                    <span>Dedicated Mainstage Segment</span>
                  </div>
                  <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    High-level keynotes on satellite applications, orbital compute, and developer opportunities.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <Compass className="w-4 h-4 text-[#f9ab00]" />
                    <span>Space Engagement Corner</span>
                  </div>
                  <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    A compact interactive booth for attendees to learn, connect, and explore student and startup programs.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Space Hub Card (High Contrast GDG Theme) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className={`w-full p-6 sm:p-7 rounded-3xl border-2 transition-all relative overflow-hidden shadow-xl ${
                isDark
                  ? "bg-[#0d1117] border-white/20 text-white shadow-[0_0_40px_rgba(56,189,248,0.15)]"
                  : "bg-white border-[#111827] text-gray-950 shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
              }`}>
                {/* Decorative Google / Aerospace gradient blur */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#4285f4]/15 rounded-full blur-2xl pointer-events-none" />

                <div className={`flex items-center justify-between pb-4 mb-4 border-b ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#4285f4] animate-bounce" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider text-[#4285f4]">
                      Space Engagement Hub
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono font-black px-2.5 py-1 rounded-full border ${
                    isDark
                      ? "bg-[#4285f4]/20 text-[#38bdf8] border-[#4285f4]/40"
                      : "bg-[#111827] text-white border-[#111827]"
                  }`}>
                    Nov 28, 2026
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black mb-2.5 ${
                  isDark ? "text-white" : "text-gray-950"
                }`}>
                  Building MP's Space-Tech Frontier
                </h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed mb-5 ${
                  isDark ? "text-white/80" : "text-gray-700"
                }`}>
                  Opening gates for computer scientists, robotics innovators, and AI engineers to deploy algorithms for Earth observation, telemetry, and private satellite constellations.
                </p>

                <div className="space-y-2.5 text-xs font-medium">
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}>
                    <span className={isDark ? "text-white/70" : "text-gray-600"}>Audience Impact:</span>
                    <span className="font-black text-[#4285f4]">600+ Professionals & Students</span>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}>
                    <span className={isDark ? "text-white/70" : "text-gray-600"}>Hands-on Track:</span>
                    <span className="font-black text-[#34a853]">Satellite Data Processing</span>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}>
                    <span className={isDark ? "text-white/70" : "text-gray-600"}>Host City:</span>
                    <span className="font-black text-[#ea4335]">Indore, Madhya Pradesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
