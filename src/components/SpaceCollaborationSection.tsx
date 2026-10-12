"use client";

import { Rocket, FileCheck2, Users, Compass, Globe, Sparkles } from "lucide-react";

export default function SpaceCollaborationSection() {
  return (
    <section id="space-collaboration" className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-[#fafbfc] transition-colors relative overflow-hidden">
      {/* Decorative cosmic glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: MOU & Vision */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#4285f4] border border-blue-200 text-xs font-bold mb-6">
                <Rocket className="w-3.5 h-3.5" />
                <span>Ecosystem Milestone Announcement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e1e1e] tracking-tight mb-4">
                Space Club of India Collaboration
              </h2>

              <p className="text-base text-[#5f6368] leading-relaxed mb-6">
                DevFest Indore 2026 is partnering with the <strong>Space Club of India</strong> for a planned MOU announcement. This collaboration is designed as a catalyst for aerospace awareness, satellite communications, and space-data developer tooling in Madhya Pradesh.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e1e1e] mb-1">
                    <FileCheck2 className="w-4 h-4 text-[#34a853]" />
                    <span>Formal Planned MOU</span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    Announcement during DevFest, subject to signing and mutual approval between parties.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e1e1e] mb-1">
                    <Users className="w-4 h-4 text-[#ea4335]" />
                    <span>Space Delegates & Experts</span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    Direct interactions with satellite engineers, aerospace entrepreneurs, and researchers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e1e1e] mb-1">
                    <Globe className="w-4 h-4 text-[#4285f4]" />
                    <span>Dedicated Mainstage Segment</span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    High-level keynotes on satellite applications, orbital compute, and developer opportunities.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e1e1e] mb-1">
                    <Compass className="w-4 h-4 text-[#f9ab00]" />
                    <span>Space Engagement Corner</span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    A compact interactive booth for attendees to learn, connect, and explore student and startup programs.
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-[#5f6368] italic border-l-2 border-amber-400 pl-3">
                * Communications Note: All joint announcements use "planned MOU" until final execution and approvals are finalized.
              </div>
            </div>

            {/* Right Column: Visual Space Hub Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full p-6 rounded-3xl bg-gradient-to-br from-[#0b132b] to-[#1c2541] text-white border-2 border-[#1e1e1e] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#38bdf8] animate-bounce" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8]">
                      Space Engagement Hub
                    </span>
                  </div>
                  <span className="text-[10px] bg-blue-900/80 text-blue-200 px-2.5 py-1 rounded-full font-bold border border-blue-700">
                    Nov 28, 2026
                  </span>
                </div>

                <h3 className="text-xl font-extrabold mb-2">
                  Building MP's Space-Tech Frontier
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Opening gates for computer scientists, robotics innovators, and AI engineers to deploy algorithms for Earth observation, telemetry, and private satellite constellations.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span className="text-gray-300">Audience Impact:</span>
                    <span className="font-bold text-white">600+ Professionals & Students</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span className="text-gray-300">Hands-on Track:</span>
                    <span className="font-bold text-white">Satellite Data Processing</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span className="text-gray-300">Host City:</span>
                    <span className="font-bold text-white">Indore, Madhya Pradesh</span>
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
