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
      {/* Outer Sleek Trailing Ring Follower */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: hovered ? "52px" : "36px",
          height: hovered ? "52px" : "36px",
          border: hovered
            ? "1.5px solid rgba(66, 133, 244, 0.85)"
            : "1px solid rgba(66, 133, 244, 0.4)",
          background: hovered
            ? "radial-gradient(circle, rgba(66, 133, 244, 0.12) 0%, transparent 70%)"
            : "transparent",
          boxShadow: hovered
            ? "0 0 20px rgba(66, 133, 244, 0.45), inset 0 0 10px rgba(66, 133, 244, 0.2)"
            : "0 0 10px rgba(66, 133, 244, 0.15)",
          transform: `translate(-50%, -50%) scale(${hovered ? 1.15 : 1})`,
        }}
      />

      {/* Center Precision Target Dot */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hovered ? "10px" : "7px",
          height: hovered ? "10px" : "7px",
          background: hovered ? "#4285f4" : "#38bdf8",
          boxShadow: hovered
            ? "0 0 14px #4285f4, 0 0 4px #ffffff"
            : "0 0 8px #38bdf8",
          transform: `translate(-50%, -50%) scale(${hovered ? 1.3 : 1})`,
        }}
      />
    </>
  );
}
