"use client";

import { Sparkles, Terminal, Cpu, Cloud, Smartphone, Globe, Code, Heart, Trophy, Rocket, Radio } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function MarqueeBanner() {
  const { isDark } = useTheme();

  const techRow = [
    { label: "Gemini 2.5 Flash & Vertex AI", color: "border-[#4285f4] text-[#4285f4]", icon: Cpu },
    { label: "Flutter 3.24 & Dart", color: "border-[#34a853] text-[#34a853]", icon: Smartphone },
    { label: "Google Kubernetes Engine (GKE)", color: "border-[#ea4335] text-[#ea4335]", icon: Cloud },
    { label: "✦ Space Exploration & AI ✦", color: "border-[#f9ab00] text-[#f9ab00]", icon: Rocket },
    { label: "Android 15 & Jetpack Compose", color: "border-[#4285f4] text-[#4285f4]", icon: Smartphone },
    { label: "Next.js 16 & Server Actions", color: "border-[#34a853] text-[#34a853]", icon: Globe },
    { label: "Multi-Agent Workflows", color: "border-[#ea4335] text-[#ea4335]", icon: Terminal },
    { label: "Firebase & Cloud Run", color: "border-[#f9ab00] text-[#f9ab00]", icon: Code },
    { label: "Open Source Tech Cosmos", color: "border-[#4285f4] text-[#4285f4]", icon: Sparkles },
  ];

  const vibeRow = [
    { label: "Indore: India's Cleanest City #1", color: "border-[#34a853] text-[#34a853]", icon: Trophy },
    { label: "1,500+ Astronaut Builders", color: "border-[#4285f4] text-[#4285f4]", icon: Rocket },
    { label: "28+ Global Speakers & GDEs", color: "border-[#ea4335] text-[#ea4335]", icon: Sparkles },
    { label: "🛰️ Satellite Comms Online", color: "border-[#4285f4] text-[#4285f4]", icon: Radio },
    { label: "Poha, Jalebi & Sarafa Food Culture", color: "border-[#f9ab00] text-[#f9ab00]", icon: Heart },
    { label: "Essentia Luxury Launchpad Indore", color: "border-[#4285f4] text-[#4285f4]", icon: Globe },
    { label: "Hands-on Codelabs & Cloud Credits", color: "border-[#34a853] text-[#34a853]", icon: Terminal },
    { label: "₹2,50,000+ Hackathon & Bounties", color: "border-[#ea4335] text-[#ea4335]", icon: Trophy },
  ];

  return (
    <div className={`py-6 border-y overflow-hidden space-y-3 transition-colors ${
      isDark ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/10" : "bg-white/80 backdrop-blur-md border-black/10 shadow-sm"
    }`}>
      {/* Track 1: Moving left */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex gap-4 shrink-0 py-1">
          {techRow.concat(techRow).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs sm:text-[13px] font-black tracking-wide uppercase shadow-sm ${
                  isDark ? "bg-[#111] " + item.color : "bg-white " + item.color + " shadow-sm"
                }`}
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs sm:text-[13px] font-extrabold tracking-wide uppercase shadow-sm ${
                  isDark ? "bg-[#111] " + item.color : "bg-white " + item.color + " shadow-sm"
                }`}
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
