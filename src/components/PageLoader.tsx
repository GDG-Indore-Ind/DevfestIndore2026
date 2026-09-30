"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this session (optional, but keep it smooth for testing)
    const hasSeen = sessionStorage.getItem("devfest-indore-loader-seen");
    if (hasSeen === "true") {
      setRemoved(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem("devfest-indore-loader-seen", "true");
            setTimeout(() => setRemoved(true), 900); // Remove from DOM after exit slide
          }, 300);
          return 100;
        }
        // Smooth non-linear acceleration
        const increment = prev < 50 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsDone(true);
    sessionStorage.setItem("devfest-indore-loader-seen", "true");
    setTimeout(() => setRemoved(true), 600);
  };

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#fafbfc] flex flex-col items-center justify-center p-6 select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      aria-label="Welcome Central India Techfest Loader"
    >
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-60" />

      {/* Ambient Google colored halos */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#c3ecf6]/40 blur-3xl pointer-events-none -z-10 animate-pulse-halo" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#ffe7a5]/40 blur-3xl pointer-events-none -z-10 animate-pulse-halo" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Animated Google Brackets Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-3xl bg-white border-3 border-[#1e1e1e] google-card-shadow flex items-center justify-center shadow-lg animate-float-subtle">
            <span className="text-[#4285f4] font-bold text-2xl font-mono">&lt;</span>
            <span className="text-[#ea4335] font-bold text-base">/</span>
            <span className="text-[#34a853] font-bold text-2xl font-mono">&gt;</span>
          </div>

          {/* Orbiting Google 4 dots */}
          <div className="absolute -inset-3 flex items-center justify-between pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-ping" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4">
          <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
            GDG Indore Presents
          </span>
        </div>

        {/* Main Requested Welcome Headline */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#1e1e1e] tracking-tight leading-tight mb-2">
          WELCOME TO
        </h1>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] via-[#f9ab00] to-[#34a853] mb-4">
          CENTRAL INDIA&#39;S BIGGEST TECH FEST
        </h2>

        {/* Festival Tagline */}
        <p className="text-xs sm:text-sm font-bold text-[#5f6368] mb-8">
          DevFest Indore 2026 • Code, Community &amp; Clean Innovation
        </p>

        {/* Bouncing 4-Dots Animation (DevFest Chennai style) */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3.5 h-3.5 rounded-full bg-[#4285f4] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ea4335] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#f9ab00] animate-bounce" style={{ animationDelay: "300ms" }} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#34a853] animate-bounce" style={{ animationDelay: "450ms" }} />
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="w-full bg-white p-4 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow">
          <div className="flex items-center justify-between text-xs font-black text-[#1e1e1e] mb-2">
            <span className="flex items-center gap-1.5 text-[#5f6368]">
              <Sparkles className="w-3.5 h-3.5 text-[#f9ab00]" />
              Preparing the Experience...
            </span>
            <span className="font-mono text-sm text-[#4285f4]">{progress}%</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-[#4285f4] via-[#ea4335] via-[#f9ab00] to-[#34a853] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-6 text-xs font-extrabold text-[#5f6368] hover:text-[#1e1e1e] transition-colors uppercase tracking-wider py-1 px-3 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Bottom Color Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-2 flex w-full">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>
    </div>
  );
}
