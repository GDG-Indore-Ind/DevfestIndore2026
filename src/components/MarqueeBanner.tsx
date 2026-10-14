"use client";

import {
  GoogleCloudLogo,
  FirebaseLogo,
  GeminiLogo,
  FlutterLogo,
  AndroidLogo,
  SatelliteLogo,
  KubernetesLogo,
  TensorFlowLogo,
  GitHubLogo,
  NextjsLogo,
} from "./TechLogos";
import { useTheme } from "@/contexts/ThemeContext";

export default function MarqueeBanner() {
  const { isDark } = useTheme();

  // Row 1: High-res Tech Ecosystem Logos (Firebase, Google Cloud, Gemini, Flutter, Satellite, Android, etc.)
  const techLogosRow = [
    { label: "Google Cloud", Logo: GoogleCloudLogo, border: "hover:border-[#4285f4]" },
    { label: "Firebase", Logo: FirebaseLogo, border: "hover:border-[#f9ab00]" },
    { label: "Gemini AI", Logo: GeminiLogo, border: "hover:border-[#a855f7]" },
    { label: "Flutter & Dart", Logo: FlutterLogo, border: "hover:border-[#02569b]" },
    { label: "Satellite Comms", Logo: SatelliteLogo, border: "hover:border-[#4285f4]" },
    { label: "Android 15", Logo: AndroidLogo, border: "hover:border-[#3ddc84]" },
    { label: "Kubernetes GKE", Logo: KubernetesLogo, border: "hover:border-[#326ce5]" },
    { label: "TensorFlow", Logo: TensorFlowLogo, border: "hover:border-[#ff6f00]" },
    { label: "Next.js 16", Logo: NextjsLogo, border: "hover:border-[#4285f4]" },
    { label: "GitHub", Logo: GitHubLogo, border: "hover:border-white/50" },
  ];

  // Row 2: DevFest Indore Metrics & Space Vibe Pills
  const vibeRow = [
    { label: "1,500+ Astronaut Builders", color: "border-[#4285f4] text-[#4285f4]", badge: "🚀" },
    { label: "Indore: India's Cleanest City #1", color: "border-[#34a853] text-[#34a853]", badge: "🏆" },
    { label: "28+ Global GDEs & Speakers", color: "border-[#ea4335] text-[#ea4335]", badge: "✨" },
    { label: "Orbit Telemetry Online", color: "border-[#4285f4] text-[#4285f4]", badge: "🛰️" },
    { label: "Essentia Luxury Launchpad", color: "border-[#f9ab00] text-[#f9ab00]", badge: "📍" },
    { label: "Hands-on AI Codelabs", color: "border-[#34a853] text-[#34a853]", badge: "💻" },
    { label: "Poha, Jalebi & Food Culture", color: "border-[#ea4335] text-[#ea4335]", badge: "❤️" },
    { label: "₹2,50,000+ Hackathon Bounties", color: "border-[#f9ab00] text-[#f9ab00]", badge: "💎" },
  ];

  return (
    <div
      className={`py-6 border-y overflow-hidden space-y-4 transition-colors relative z-20 ${
        isDark
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10"
          : "bg-white/95 backdrop-blur-md border-black/10 shadow-sm"
      }`}
    >
      {/* Track 1: Moving left with Authentic High-Resolution Logos */}
      <div className="flex overflow-hidden mask-fade-edges">
        <div className="animate-marquee flex gap-4 shrink-0 py-1">
          {techLogosRow.concat(techLogosRow).map((item, idx) => {
            const LogoComponent = item.Logo;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm ${
                  isDark
                    ? "bg-[#111827]/90 border-white/15 text-white hover:bg-[#1f2937]"
                    : "bg-white border-gray-200 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                } ${item.border}`}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <LogoComponent className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 2: Moving right with Space & Indore Ecosystem Tags */}
      <div className="flex overflow-hidden mask-fade-edges">
        <div className="animate-marquee-reverse flex gap-4 shrink-0 py-1">
          {vibeRow.concat(vibeRow).map((item, idx) => (
            <div
              key={idx}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs sm:text-[13px] font-black tracking-wide uppercase shadow-sm ${
                isDark ? "bg-[#111] " + item.color : "bg-white " + item.color + " shadow-sm"
              }`}
            >
              <span className="text-sm">{item.badge}</span>
              <span className="whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
