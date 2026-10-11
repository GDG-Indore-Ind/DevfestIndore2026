"use client";

import confetti from "canvas-confetti";

export default function FloatingShapesBackground() {
  const triggerShapePop = (x: number, y: number, color: string) => {
    confetti({
      particleCount: 36,
      spread: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [color, "#4285f4", "#f9ab00", "#34a853", "#ea4335", "#ffffff"],
    });
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Subtle Orbital Trajectory Blueprint Arcs (NASA/Space Mission Style) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="15%"
          cy="20%"
          rx="320"
          ry="90"
          fill="none"
          stroke="#4285f4"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <ellipse
          cx="85%"
          cy="48%"
          rx="460"
          ry="130"
          fill="none"
          stroke="#ea4335"
          strokeWidth="1"
          strokeDasharray="8 8"
        />
        <ellipse
          cx="25%"
          cy="78%"
          rx="520"
          ry="150"
          fill="none"
          stroke="#34a853"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <circle
          cx="90%"
          cy="12%"
          r="180"
          fill="none"
          stroke="#f9ab00"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Constellation Starfield (4-Point Retro Sparkle Stars Matching Poster) */}
      <div className="absolute inset-0 opacity-75 dark:opacity-70 pointer-events-none">
        {/* Crisp black stars in light mode, cosmic gold in dark mode (from poster) */}
        <span className="absolute top-[6%] left-[8%] text-sm text-gray-900 dark:text-[#f9ab00] animate-pulse">✦</span>
        <span className="absolute top-[11%] right-[14%] text-lg text-[#4285f4] animate-pulse" style={{ animationDelay: "1s" }}>✦</span>
        <span className="absolute top-[22%] left-[18%] text-base text-[#34a853] animate-pulse" style={{ animationDelay: "2s" }}>✦</span>
        <span className="absolute top-[31%] right-[6%] text-sm text-[#ea4335] animate-pulse" style={{ animationDelay: "0.8s" }}>✦</span>
        <span className="absolute top-[41%] left-[6%] text-lg text-gray-900 dark:text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.6s" }}>✦</span>
        <span className="absolute top-[53%] right-[16%] text-base text-[#4285f4] animate-pulse" style={{ animationDelay: "2.4s" }}>✦</span>
        <span className="absolute top-[64%] left-[12%] text-sm text-[#34a853] animate-pulse" style={{ animationDelay: "1.2s" }}>✦</span>
        <span className="absolute top-[75%] right-[22%] text-lg text-gray-900 dark:text-[#f9ab00] animate-pulse" style={{ animationDelay: "2.8s" }}>✦</span>
        <span className="absolute top-[84%] left-[24%] text-base text-[#4285f4] animate-pulse" style={{ animationDelay: "1.4s" }}>✦</span>
        <span className="absolute top-[93%] right-[10%] text-sm text-[#ea4335] animate-pulse" style={{ animationDelay: "2.1s" }}>✦</span>
        <span className="absolute top-[16%] left-[48%] text-xs text-gray-800 dark:text-white/60 animate-pulse" style={{ animationDelay: "0.5s" }}>✦</span>
        <span className="absolute top-[68%] left-[45%] text-xs text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.9s" }}>✦</span>

        {/* Twinkling Google-colored stardust dots */}
        <div className="absolute top-[14%] left-[35%] w-1.5 h-1.5 rounded-full bg-[#4285f4] shadow-[0_0_8px_#4285f4] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[28%] right-[28%] w-1.5 h-1.5 rounded-full bg-[#f9ab00] shadow-[0_0_6px_#f9ab00] animate-pulse" />
        <div className="absolute top-[48%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#34a853] shadow-[0_0_8px_#34a853] animate-pulse" style={{ animationDuration: "2.5s" }} />
        <div className="absolute top-[62%] right-[38%] w-1.5 h-1.5 rounded-full bg-[#ea4335] shadow-[0_0_6px_#ea4335] animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-[82%] left-[38%] w-1.5 h-1.5 rounded-full bg-[#4285f4] shadow-[0_0_6px_#4285f4] animate-pulse" style={{ animationDuration: "3.5s" }} />
      </div>

      {/* Top Left: 4-Point Cosmic Star (Poster Aesthetic) */}
      <div
        className="pointer-events-auto absolute top-24 left-[2.5%] hidden md:flex flex-col items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white dark:bg-[#070d1e]/90 border border-black/12 dark:border-[#4285f4]/40 shadow-md dark:shadow-[0_0_24px_rgba(66,133,244,0.3)] animate-float cursor-pointer hover:scale-125 hover:rotate-45 active:scale-95 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#4285f4");
        }}
        title="Cosmic Star • Click to ignite!"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 lg:w-7 lg:h-7 text-[#4285f4] fill-current" aria-hidden="true">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* Top Right: Ringed Celestial Planet (Saturn / Orbit) */}
      <div
        className="pointer-events-auto absolute top-28 right-[2.5%] hidden md:flex items-center justify-center w-13 h-13 lg:w-16 lg:h-16 rounded-full bg-white dark:bg-[#120a22]/90 border border-black/12 dark:border-[#f9ab00]/50 shadow-md dark:shadow-[0_0_25px_rgba(249,171,0,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 32, "#f9ab00");
        }}
        title="Ringed Tech Planet • Click to pop!"
      >
        <div className="relative flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-tr from-[#ea4335] to-[#f9ab00]">
          <div className="absolute w-11 h-2.5 lg:w-12 lg:h-3 border-2 border-[#ffd427] rounded-[50%] -rotate-25 shadow-[0_0_10px_rgba(255,212,39,0.5)]" />
        </div>
      </div>

      {/* Mid Left: Astronaut Helmet Icon / Space Badge */}
      <div
        className="pointer-events-auto absolute top-[48%] -left-1 hidden lg:flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white dark:bg-[#06121f]/90 border border-black/12 dark:border-[#34a853]/40 shadow-md dark:shadow-[0_0_20px_rgba(52,168,83,0.3)] animate-float cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#34a853");
        }}
        title="Astronaut Telemetry • Click to explore!"
      >
        <span className="text-xl lg:text-2xl select-none">👨‍🚀</span>
      </div>

      {/* Mid Right: 4-Point Cosmic Gold Sparkle */}
      <div
        className="pointer-events-auto absolute top-[58%] -right-1 hidden lg:flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white dark:bg-[#1f0d14]/90 border border-black/12 dark:border-[#ea4335]/40 shadow-md dark:shadow-[0_0_20px_rgba(234,67,53,0.3)] animate-float-alt cursor-pointer hover:scale-125 hover:rotate-180 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#ea4335");
        }}
        title="Stardust Sparkle • Click to ignite!"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 lg:w-7 lg:h-7 text-[#f9ab00] fill-current" aria-hidden="true">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
        </svg>
      </div>

      {/* Bottom Left: Orbit Capsule / Satellite */}
      <div
        className="pointer-events-auto absolute bottom-[14%] left-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#07132a]/90 border border-black/12 dark:border-[#4285f4]/40 shadow-md dark:shadow-[0_0_20px_rgba(66,133,244,0.3)] animate-float cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#4285f4");
        }}
        title="Space Orbiter • Click to launch!"
      >
        <span className="text-lg lg:text-xl select-none">🛰️</span>
      </div>

      {/* Bottom Right: Rocket Explorer */}
      <div
        className="pointer-events-auto absolute bottom-[22%] right-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#131b08]/90 border border-black/12 dark:border-[#34a853]/40 shadow-md dark:shadow-[0_0_20px_rgba(52,168,83,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-transform backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#34a853");
        }}
        title="Cosmic Rocket • Click to blast off!"
      >
        <span className="text-lg lg:text-xl select-none">🚀</span>
      </div>
    </div>
  );
}
