"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function FloatingShapesBackground() {
  const { isDark } = useTheme();

  const strokeGrid = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.04)";
  const strokeCrosshair = isDark ? "rgba(66, 133, 244, 0.12)" : "rgba(66, 133, 244, 0.08)";

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Ultra-Subtle Cosmic Radial Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4285f4]/5 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#f9ab00]/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] rounded-full bg-[#34a853]/5 blur-[140px] pointer-events-none" />
      </div>

      {/* 2. Precision Space Telemetry Coordinate Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
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
