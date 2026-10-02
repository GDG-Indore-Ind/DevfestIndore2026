"use client";

import { Sparkles, Terminal, Cpu, Cloud, Smartphone, Globe, Code, Heart, Trophy, Rocket } from "lucide-react";

export default function MarqueeBanner() {
  const techRow = [
    { label: "Gemini 2.5 Flash & Vertex AI", color: "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]", icon: Cpu },
    { label: "Flutter 3.24 & Dart", color: "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]", icon: Smartphone },
    { label: "Google Kubernetes Engine (GKE)", color: "bg-[#f8d8d8] text-[#1e1e1e] border-[#ff7daf]", icon: Cloud },
    { label: "Android 15 & Jetpack Compose", color: "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]", icon: Smartphone },
    { label: "Next.js 16 & Server Components", color: "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]", icon: Globe },
    { label: "Multi-Agent Workflows", color: "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]", icon: Terminal },
    { label: "Firebase & Cloud Run", color: "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]", icon: Code },
    { label: "Open Source Ecosystem", color: "bg-[#f8d8d8] text-[#1e1e1e] border-[#ff7daf]", icon: Sparkles },
  ];

  const vibeRow = [
    { label: "Indore: India's Cleanest City #1", color: "bg-[#34a853] text-white border-[#1e1e1e]", icon: Trophy },
    { label: "1,500+ Builders & Engineers", color: "bg-[#4285f4] text-white border-[#1e1e1e]", icon: Rocket },
    { label: "28+ Global Speakers & GDEs", color: "bg-[#ea4335] text-white border-[#1e1e1e]", icon: Sparkles },
    { label: "Poha, Jalebi & Sarafa Food Culture", color: "bg-[#f9ab00] text-[#1e1e1e] border-[#1e1e1e]", icon: Heart },
    { label: "Essentia Luxury Hotel Indore, Pipliyahana", color: "bg-[#4285f4] text-white border-[#1e1e1e]", icon: Globe },
    { label: "Hands-on Codelabs & Cloud Credits", color: "bg-[#34a853] text-white border-[#1e1e1e]", icon: Terminal },
    { label: "₹2,50,000+ Hackathon & Bounties", color: "bg-[#ea4335] text-white border-[#1e1e1e]", icon: Trophy },
  ];

  return (
    <div className="py-6 bg-white border-y-2 border-[#1e1e1e] overflow-hidden space-y-3">
      {/* Track 1: Moving left */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex gap-4 shrink-0 py-1">
          {techRow.concat(techRow).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-black tracking-wide uppercase shadow-sm ${item.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 2: Moving right */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-reverse flex gap-4 shrink-0 py-1">
          {vibeRow.concat(vibeRow).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-extrabold tracking-wide uppercase shadow-sm ${item.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
