"use client";

import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on mobile/touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsTouch(false);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button, a, input, select, .google-card-shadow, .glow-btn, .group")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const animateTrailing = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      setTrailingPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animateTrailing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Trailing Orbital Atmosphere Glow & Orbit Ring */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-transform duration-200 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: hovered ? "68px" : "46px",
          height: hovered ? "68px" : "46px",
          border: hovered ? "1.5px dashed #38bdf8" : "1px solid rgba(56, 189, 248, 0.4)",
          boxShadow: hovered
            ? "0 0 25px rgba(56, 189, 248, 0.6), inset 0 0 15px rgba(56, 189, 248, 0.3)"
            : "0 0 15px rgba(56, 189, 248, 0.25)",
          transform: `translate(-50%, -50%) rotate(${trailingPos.x * 0.5}deg) scale(${hovered ? 1.2 : 1})`,
        }}
      >
        {/* Tiny Orbiting Satellite / Moon */}
        <div
          className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#f9ab00] shadow-[0_0_8px_#f9ab00] -translate-x-1/2"
        />
      </div>

      {/* Main 3D Spherical Earth Cursor with Atmospheric Shading */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 overflow-hidden flex items-center justify-center"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hovered ? "36px" : "26px",
          height: hovered ? "36px" : "26px",
          background: "radial-gradient(circle at 35% 35%, #93c5fd 0%, #2563eb 45%, #1e3a8a 80%, #0f172a 100%)",
          boxShadow: hovered
            ? "0 0 20px rgba(56, 189, 248, 0.9), inset -4px -4px 8px rgba(0,0,0,0.8), inset 3px 3px 6px rgba(255,255,255,0.8)"
            : "0 0 12px rgba(56, 189, 248, 0.6), inset -3px -3px 6px rgba(0,0,0,0.7), inset 2px 2px 4px rgba(255,255,255,0.7)",
          transform: `translate(-50%, -50%) scale(${hovered ? 1.15 : 1})`,
        }}
      >
        {/* Continents & Cloud Texture Overlay */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full opacity-85 mix-blend-screen animate-spin-slow"
          style={{ animationDuration: "14s" }}
        >
          {/* Continents outlines */}
          <path
            d="M20,40 Q25,25 40,30 T60,25 T80,45 Q75,65 55,60 T30,70 Z"
            fill="#34a853"
            opacity="0.9"
          />
          <path
            d="M35,60 Q50,75 65,70 T80,80 Q60,95 40,85 Z"
            fill="#22c55e"
            opacity="0.85"
          />
          {/* Swirling white cloud streaks */}
          <path
            d="M10,30 Q30,15 60,35 T90,30 Q70,50 40,40 Z"
            fill="#ffffff"
            opacity="0.6"
          />
          <path
            d="M15,65 Q45,50 75,65 T85,55"
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
            opacity="0.5"
          />
        </svg>

        {/* Specular atmospheric highlight */}
        <div className="absolute top-1 left-1.5 w-2 h-1.5 rounded-full bg-white/70 blur-[0.5px]" />
      </div>
    </>
  );
}
