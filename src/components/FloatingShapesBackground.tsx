"use client";

import { useState } from "react";
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
      {/* Top Left: 3D Google Blue Cube */}
      <div
        className="pointer-events-auto absolute top-24 left-[4%] hidden lg:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c3ecf6] to-[#4285f4] border-2 border-[#1e1e1e] google-pill-shadow animate-float cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 32, "#4285f4");
        }}
        title="Click to pop!"
      >
        <span className="font-mono font-black text-white text-base">&lt;/&gt;</span>
      </div>

      {/* Top Right: Google Yellow Donut / Ring */}
      <div
        className="pointer-events-auto absolute top-36 right-[5%] hidden lg:flex items-center justify-center w-14 h-14 rounded-full border-8 border-[#ffd427] bg-[#ffe7a5]/50 google-pill-shadow animate-float-alt cursor-pointer hover:rotate-45 hover:scale-110 transition-all"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#f9ab00");
        }}
        title="Click to pop!"
      />

      {/* Mid Left: Google Red 3D Octahedron / Diamond */}
      <div
        className="pointer-events-auto absolute top-[55%] -left-3 hidden xl:flex items-center justify-center w-14 h-14 rounded-xl rotate-45 bg-[#f8d8d8] border-2 border-[#ea4335] google-pill-shadow animate-float cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 28, rect.top + 28, "#ea4335");
        }}
        title="Click to pop!"
      >
        <span className="-rotate-45 text-sm">⚡</span>
      </div>

      {/* Mid Right: Google Green Android Pill */}
      <div
        className="pointer-events-auto absolute top-[65%] -right-2 hidden xl:flex items-center justify-center w-16 h-8 rounded-full bg-[#ccf6c5] border-2 border-[#34a853] google-pill-shadow animate-float-alt cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 32, rect.top + 16, "#34a853");
        }}
        title="Click to pop!"
      >
        <span className="text-xs font-mono font-bold text-[#1e1e1e]">{"{ }"}</span>
      </div>
    </div>
  );
}
