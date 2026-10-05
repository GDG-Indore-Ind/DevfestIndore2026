"use client";

import confetti from "canvas-confetti";

export default function FloatingShapesBackground() {
  const triggerShapePop = (x: number, y: number, color: string) => {
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [color, "#ffffff"],
    });
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top Left: 3D Google Blue Cube — neon glow on dark */}
      <div
        className="pointer-events-auto absolute top-24 left-[4%] hidden lg:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4285f4]/30 to-[#4285f4] border border-[#4285f4]/50 shadow-[0_0_20px_rgba(66,133,244,0.5)] animate-float cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 32, "#4285f4");
        }}
        title="Click to pop!"
      >
        <span className="font-mono font-black text-white text-base">{"</>"}</span>
      </div>

      {/* Top Right: Google Yellow Donut / Ring — neon glow */}
      <div
        className="pointer-events-auto absolute top-36 right-[5%] hidden lg:flex items-center justify-center w-14 h-14 rounded-full border-8 border-[#f9ab00] bg-[#f9ab00]/10 shadow-[0_0_15px_rgba(249,171,0,0.4)] animate-float-alt cursor-pointer hover:rotate-45 hover:scale-110 transition-all"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#f9ab00");
        }}
        title="Click to pop!"
      />

      {/* Mid Left: Google Red 3D Diamond — neon glow */}
      <div
        className="pointer-events-auto absolute top-[55%] -left-3 hidden xl:flex items-center justify-center w-14 h-14 rounded-xl rotate-45 bg-[#ea4335]/15 border border-[#ea4335]/60 shadow-[0_0_15px_rgba(234,67,53,0.4)] animate-float cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#ea4335");
        }}
        title="Click to pop!"
      >
        <span className="-rotate-45 text-sm">⚡</span>
      </div>

      {/* Mid Right: Google Green Android Pill — neon glow */}
      <div
        className="pointer-events-auto absolute top-[65%] -right-2 hidden xl:flex items-center justify-center w-16 h-8 rounded-full bg-[#34a853]/15 border border-[#34a853]/60 shadow-[0_0_15px_rgba(52,168,83,0.4)] animate-float-alt cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 16, "#34a853");
        }}
        title="Click to pop!"
      >
        <span className="text-xs font-mono font-bold text-white">{"{ }"}</span>
      </div>

      {/* Bottom Left: Android mascot hint — holographic green */}
      <div
        className="pointer-events-auto absolute bottom-[15%] left-[3%] hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-[#34a853]/10 border border-[#34a853]/40 shadow-[0_0_18px_rgba(52,168,83,0.35)] animate-float cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#34a853");
        }}
        title="Click to pop!"
      >
        <span className="text-xl">🤖</span>
      </div>

      {/* Top Right corner: Web Globe hint — holographic blue */}
      <div
        className="pointer-events-auto absolute top-[20%] right-[3%] hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4285f4]/10 border border-[#4285f4]/40 shadow-[0_0_18px_rgba(66,133,244,0.35)] animate-float-alt cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#4285f4");
        }}
        title="Click to pop!"
      >
        <span className="text-xl">🌐</span>
      </div>
    </div>
  );
}
