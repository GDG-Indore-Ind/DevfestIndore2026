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
      {/* Mode-Responsive Celestial Space & AI Neural Background Artworks */}
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

          {/* Deep Space AI Neural Constellation Overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-screen overflow-hidden">
            <Image
              src="/images/space-ai-neural-dark.jpg"
              alt="Deep Space AI Neural Network"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-70"
            />
          </div>

          {/* Vignette edge fade for cinematic deep dark focus */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        </div>
      ) : (
        /* Light Mode: Atmospheric Celestial Sky-Blue Space AI Constellation Artwork */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle soft snowy sky atmospheric tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#e8f1fc]/80 via-[#f0f6ff]/60 to-[#ffffff]/90" />

          {/* Sky-Blue Space & AI Neural Constellation Backdrop Image */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply overflow-hidden">
            <Image
              src="/images/space-ai-neural-light.jpg"
              alt="Atmospheric Space & AI Neural Constellations"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Soft glowing sky-bluish ambient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#38bdf8]/15 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0284c7]/12 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] rounded-full bg-[#7dd3fc]/15 blur-[140px] pointer-events-none" />
        </div>
      )}

      {/* Light Mode High-Visibility Snow Flurry Layer (Elevated Fixed Overlay z-20) */}
      {!isDark && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none" aria-hidden="true">
          {/* Layer 1: Crystalline Snowflake Stars (Fast & Small) */}
          {[6, 16, 26, 36, 46, 56, 66, 76, 86, 96, 12, 32, 52, 72, 92].map((leftPct, i) => (
            <div
              key={`snow-flake-1-${i}`}
              className="absolute text-blue-400/80 drop-shadow-[0_0_6px_rgba(66,133,244,0.6)] animate-snow-1 select-none"
              style={{
                left: `${leftPct}%`,
                top: `-${15 + (i * 8)}px`,
                fontSize: `${10 + (i % 5) * 2}px`,
                animationDelay: `${(i * 0.7) % 8}s`,
                animationDuration: `${8 + ((i * 1.2) % 4)}s`,
              }}
            >
              ❄
            </div>
          ))}

          {/* Layer 2: Glowing Ice Flakes (Medium & Drifting) */}
          {[10, 24, 38, 54, 68, 82, 94, 18, 44, 70, 88].map((leftPct, i) => (
            <div
              key={`snow-flake-2-${i}`}
              className="absolute text-sky-400/90 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] animate-snow-2 select-none"
              style={{
                left: `${leftPct}%`,
                top: `-${25 + (i * 10)}px`,
                fontSize: `${14 + (i % 4) * 3}px`,
                animationDelay: `${(i * 1.1) % 10}s`,
                animationDuration: `${12 + ((i * 1.5) % 5)}s`,
              }}
            >
              ❅
            </div>
          ))}

          {/* Layer 3: Soft Drifting Snow Pellets (Large & Translucent) */}
          {[14, 30, 48, 64, 80, 90].map((leftPct, i) => (
            <div
              key={`snow-flake-3-${i}`}
              className="absolute w-3 h-3 rounded-full bg-white/95 border border-blue-300 shadow-[0_0_12px_rgba(66,133,244,0.7)] animate-snow-3"
              style={{
                left: `${leftPct}%`,
                top: `-${30 + (i * 15)}px`,
                animationDelay: `${(i * 1.8) % 12}s`,
                animationDuration: `${16 + ((i * 1.8) % 6)}s`,
              }}
            />
          ))}
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
