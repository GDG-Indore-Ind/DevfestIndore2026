"use client";

import Link from "next/link";
import { Compass, Rocket, Home, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden ${
      theme === "dark" ? "bg-[#060913] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
    }`}>
      {/* Background celestial / geometric orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4285f4]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#ea4335]/15 blur-3xl pointer-events-none" />

      {/* Floating 404 Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335] animate-ping" />
        <span className="text-xs font-black tracking-widest uppercase">Deep Space Error</span>
        <span className="text-xs font-bold text-[#5f6368]">|</span>
        <span className="text-xs font-bold text-[#4285f4]">Coordinates Unreachable</span>
      </div>

      <div className="relative mb-6">
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
          404
        </h1>
        <div className="absolute -top-3 -right-6 animate-bounce">
          <Rocket className="w-12 h-12 text-[#38bdf8] rotate-45 drop-shadow-md" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
        Lost in the Orbit of Indore?
      </h2>
      <p className="max-w-md text-sm sm:text-base text-[#5f6368] dark:text-gray-300 mb-8 leading-relaxed">
        The mission path or page you are navigating to does not exist in the DevFest Indore 2026 telemetry. Let's redirect your thrusters back to home base!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4" />
          <span>Return to DevFest Hub</span>
        </Link>

        <Link
          href="/#pillars"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-white text-[#1e1e1e] border-2 border-[#1e1e1e] hover:bg-gray-50 transition-colors"
        >
          <Compass className="w-4 h-4 text-[#34a853]" />
          <span>Explore 5 Pillars</span>
        </Link>
      </div>
    </div>
  );
}
