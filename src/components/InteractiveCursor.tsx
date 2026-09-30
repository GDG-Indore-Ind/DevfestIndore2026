"use client";

import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices
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

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button, a, input, select, .google-card-shadow, .glow-btn")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const animateTrailing = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
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
      {/* Trailing Soft Halo */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-all duration-200 -translate-x-1/2 -translate-y-1/2 border border-[#4285f4]/40"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: hovered ? "52px" : "32px",
          height: hovered ? "52px" : "32px",
          backgroundColor: hovered ? "rgba(66, 133, 244, 0.12)" : "rgba(66, 133, 244, 0.05)",
          transform: `translate(-50%, -50%) scale(${hovered ? 1.25 : 1})`,
        }}
      />

      {/* Main Sharp Google Core Dot */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hovered ? "10px" : "7px",
          height: hovered ? "10px" : "7px",
          backgroundColor: hovered ? "#ea4335" : "#4285f4",
          boxShadow: "0 0 10px rgba(66, 133, 244, 0.5)",
        }}
      />
    </>
  );
}
