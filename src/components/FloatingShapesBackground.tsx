"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

export default function FloatingShapesBackground() {
  const { isDark } = useTheme();

  const strokeGrid = isDark ? "rgba(255, 255, 255, 0.025)" : "rgba(15, 23, 42, 0.035)";
  const strokeCrosshair = isDark ? "rgba(66, 133, 244, 0.12)" : "rgba(66, 133, 244, 0.06)";

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Dark Mode Exclusive: Single Photorealistic Mars in Deep Space Void */}
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none">
          {/* Pitch-black void backdrop */}
          <div className="absolute inset-0 bg-[#000000]" />

          {/* High-definition Mars planet backdrop image */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden">
            <Image
              src="/images/mars-bg.jpg"
              alt="Deep Space Mars Cosmos"
              fill
              priority
              className="object-cover object-center scale-105"
              sizes="100vw"
            />
          </div>

          {/* Vignette edge fade for cinematic deep dark focus */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        </div>
      ) : (
        /* Light Mode: Crisp Snowy Winter Atmosphere with Drifting Snowflakes */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle soft snowy sky atmospheric tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#e8f1fc]/70 via-[#f0f6ff]/50 to-[#ffffff]/90" />

          {/* Soft glowing ambient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4285f4]/8 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#38bdf8]/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] rounded-full bg-[#93c5fd]/8 blur-[140px] pointer-events-none" />

          {/* Falling Snowflakes Layer 1 (Small & Fast) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[12, 28, 44, 62, 78, 91, 5, 36, 55, 72, 85, 96].map((leftPct, i) => (
              <div
                key={`snow-s-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white/90 border border-blue-200/50 shadow-[0_0_8px_rgba(147,197,253,0.8)] animate-snow-1"
                style={{
                  left: `${leftPct}%`,
                  top: `-${10 + (i * 12)}px`,
                  animationDelay: `${(i * 1.1) % 7}s`,
                  animationDuration: `${7 + ((i * 1.3) % 5)}s`,
                }}
              />
            ))}
          </div>

          {/* Falling Snowflakes Layer 2 (Medium & Drifting) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[8, 22, 38, 52, 68, 82, 94, 17, 48, 65, 88].map((leftPct, i) => (
              <div
                key={`snow-m-${i}`}
                className="absolute w-3 h-3 rounded-full bg-white/95 border border-sky-200/60 shadow-[0_0_12px_rgba(96,165,250,0.9)] animate-snow-2"
                style={{
                  left: `${leftPct}%`,
                  top: `-${20 + (i * 15)}px`,
                  animationDelay: `${(i * 1.5) % 9}s`,
                  animationDuration: `${11 + ((i * 1.7) % 6)}s`,
                }}
              />
            ))}
          </div>

          {/* Falling Snowflakes Layer 3 (Delicate Flakes with Glow) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[15, 33, 58, 75, 92].map((leftPct, i) => (
              <div
                key={`snow-l-${i}`}
                className="absolute w-4 h-4 rounded-full bg-white border border-blue-300/60 shadow-[0_0_14px_rgba(59,130,246,0.6)] animate-snow-3"
                style={{
                  left: `${leftPct}%`,
                  top: `-${30 + (i * 20)}px`,
                  animationDelay: `${(i * 2.3) % 11}s`,
                  animationDuration: `${14 + ((i * 2) % 6)}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Precision Space Telemetry Coordinate Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="telemetry-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={strokeGrid}
              strokeWidth="0.8"
            />
            {/* Minimal crosshairs */}
            <path
              d="M 40 37 L 40 43 M 37 40 L 43 40"
              fill="none"
              stroke={strokeCrosshair}
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#telemetry-grid)" />
      </svg>
    </div>
  );
}
