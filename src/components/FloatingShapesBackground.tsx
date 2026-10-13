"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function FloatingShapesBackground() {
  const { isDark } = useTheme();

  const strokeGrid = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.035)";
  const strokeCrosshair = isDark ? "rgba(66, 133, 244, 0.1)" : "rgba(66, 133, 244, 0.06)";

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

      {/* 3. Dark Mode Exclusive: Delicate Twinkling Stars & Distant Orbital Satellites */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle twinkling distant stars positioned outside the hero core */}
          <div className="absolute top-[38%] left-[8%] w-1 h-1 rounded-full bg-white opacity-40 animate-pulse" />
          <div className="absolute top-[48%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] opacity-50 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute top-[62%] left-[14%] w-1 h-1 rounded-full bg-[#f9ab00] opacity-35 animate-pulse" style={{ animationDelay: "1.2s" }} />
          <div className="absolute top-[78%] right-[15%] w-1 h-1 rounded-full bg-white opacity-40 animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[88%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#34a853] opacity-30 animate-pulse" style={{ animationDelay: "0.8s" }} />

          {/* Minimalist Micro Satellite Telemetry Vector in Mid-Section */}
          <div className="absolute top-[52%] left-[4%] opacity-20 hidden lg:block">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="18" y="18" width="12" height="12" rx="2" stroke="#4285f4" strokeWidth="1" />
              <line x1="6" y1="24" x2="18" y2="24" stroke="#ffffff" strokeWidth="0.8" />
              <rect x="6" y="20" width="8" height="8" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="30" y1="24" x2="42" y2="24" stroke="#ffffff" strokeWidth="0.8" />
              <rect x="34" y="20" width="8" height="8" stroke="#38bdf8" strokeWidth="0.8" />
              <path d="M 24 14 L 24 18" stroke="#f9ab00" strokeWidth="1" />
            </svg>
          </div>

          <div className="absolute top-[72%] right-[5%] opacity-20 hidden lg:block">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" stroke="#64748b" strokeWidth="0.6" strokeDasharray="2 3" />
              <circle cx="20" cy="6" r="1.5" fill="#34a853" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
