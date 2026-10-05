"use client";

import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

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

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
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
