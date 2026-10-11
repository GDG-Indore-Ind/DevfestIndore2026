"use client";

import confetti from "canvas-confetti";

export default function FloatingShapesBackground() {
  const triggerShapePop = (x: number, y: number, color: string) => {
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [color, "#4285f4", "#f9ab00", "#34a853", "#ea4335", "#ffffff"],
    });
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Background Starfield Twinkling Layer */}
      <div className="absolute inset-0 opacity-60 dark:opacity-70">
        {/* Randomized Cosmic Stars (4-point sparkle stars & dots matching poster aesthetic) */}
        <span className="absolute top-[8%] left-[12%] text-xs text-gray-800 dark:text-[#f9ab00] animate-pulse">✦</span>
        <span className="absolute top-[14%] right-[18%] text-base text-[#4285f4] animate-pulse" style={{ animationDelay: "1.2s" }}>✦</span>
        <span className="absolute top-[28%] left-[22%] text-sm text-[#34a853] animate-pulse" style={{ animationDelay: "2.4s" }}>✦</span>
        <span className="absolute top-[42%] right-[8%] text-xs text-[#ea4335] animate-pulse" style={{ animationDelay: "0.8s" }}>✦</span>
        <span className="absolute top-[65%] left-[10%] text-sm text-gray-800 dark:text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.8s" }}>✦</span>
        <span className="absolute top-[78%] right-[24%] text-xs text-[#4285f4] animate-pulse" style={{ animationDelay: "2.9s" }}>✦</span>
        <span className="absolute top-[88%] left-[30%] text-sm text-[#34a853] animate-pulse" style={{ animationDelay: "1.5s" }}>✦</span>

        {/* Tiny twinkling stardust dots */}
        <div className="absolute top-[18%] left-[45%] w-1.5 h-1.5 rounded-full bg-blue-500/80 dark:bg-white shadow-[0_0_8px_#4285f4] dark:shadow-[0_0_8px_#ffffff] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[35%] right-[32%] w-1 h-1 rounded-full bg-[#f9ab00] shadow-[0_0_6px_#f9ab00] animate-pulse" />
        <div className="absolute top-[52%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#4285f4] shadow-[0_0_8px_#4285f4] animate-pulse" style={{ animationDuration: "2.5s" }} />
        <div className="absolute top-[72%] right-[42%] w-1 h-1 rounded-full bg-[#34a853] shadow-[0_0_6px_#34a853] animate-ping" style={{ animationDuration: "4s" }} />
      </div>

      {/* Top Left: 4-Point Cosmic Star (Poster Aesthetic) */}
      <div
        className="pointer-events-auto absolute top-24 left-[3.5%] hidden lg:flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white/90 dark:bg-[#070d1e]/80 border border-black/10 dark:border-[#4285f4]/40 shadow-lg dark:shadow-[0_0_24px_rgba(66,133,244,0.3)] animate-float cursor-pointer hover:scale-125 hover:rotate-45 active:scale-95 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#4285f4");
        }}
        title="Cosmic Star • Click to ignite!"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#4285f4] fill-current" aria-hidden="true">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* Top Right: Ringed Celestial Planet (Saturn / Orbit) */}
      <div
        className="pointer-events-auto absolute top-32 right-[4%] hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-white/90 dark:bg-[#120a22]/80 border border-black/10 dark:border-[#f9ab00]/50 shadow-lg dark:shadow-[0_0_25px_rgba(249,171,0,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 32, "#f9ab00");
        }}
        title="Ringed Tech Planet • Click to pop!"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#ea4335] to-[#f9ab00]">
          {/* Planetary Ring */}
          <div className="absolute w-12 h-3 border-2 border-[#ffd427] rounded-[50%] -rotate-25 shadow-[0_0_10px_rgba(255,212,39,0.5)]" />
        </div>
      </div>

      {/* Mid Left: Astronaut Helmet Icon / Space Badge */}
      <div
        className="pointer-events-auto absolute top-[52%] -left-2 hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/90 dark:bg-[#06121f]/80 border border-black/10 dark:border-[#34a853]/40 shadow-lg dark:shadow-[0_0_20px_rgba(52,168,83,0.3)] animate-float cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#34a853");
        }}
        title="Astronaut Telemetry • Click to explore!"
      >
        <span className="text-2xl select-none">👨‍🚀</span>
      </div>

      {/* Mid Right: 4-Point Cosmic Gold Sparkle */}
      <div
        className="pointer-events-auto absolute top-[62%] -right-1 hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/90 dark:bg-[#1f0d14]/80 border border-black/10 dark:border-[#ea4335]/40 shadow-lg dark:shadow-[0_0_20px_rgba(234,67,53,0.3)] animate-float-alt cursor-pointer hover:scale-125 hover:rotate-180 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#ea4335");
        }}
        title="Stardust Sparkle • Click to ignite!"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#f9ab00] fill-current" aria-hidden="true">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
        </svg>
      </div>

      {/* Bottom Left: Orbit Capsule / Satellite */}
      <div
        className="pointer-events-auto absolute bottom-[18%] left-[2.5%] hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/90 dark:bg-[#07132a]/80 border border-black/10 dark:border-[#4285f4]/40 shadow-lg dark:shadow-[0_0_20px_rgba(66,133,244,0.3)] animate-float cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#4285f4");
        }}
        title="Space Orbiter • Click to launch!"
      >
        <span className="text-xl select-none">🛰️</span>
      </div>

      {/* Top Right Sky: Rocket Explorer */}
      <div
        className="pointer-events-auto absolute top-[18%] right-[2.5%] hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/90 dark:bg-[#131b08]/80 border border-black/10 dark:border-[#34a853]/40 shadow-lg dark:shadow-[0_0_20px_rgba(52,168,83,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#34a853");
        }}
        title="Cosmic Rocket • Click to blast off!"
      >
        <span className="text-xl select-none">🚀</span>
      </div>
    </div>
  );
}
