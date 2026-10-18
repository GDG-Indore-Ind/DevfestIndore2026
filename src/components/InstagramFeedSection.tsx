"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { useTheme } from "@/contexts/ThemeContext";

export default function InstagramFeedSection() {
  const { isDark } = useTheme();

  return (
    <section id="social-stream" className="py-14 md:py-20 bg-transparent relative overflow-hidden transition-colors">
      {/* Elfsight Platform Script */}
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
              <InstagramIcon className="w-4 h-4 text-[#e1306c]" />
              <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
                Live Feed • Official Elfsight Stream
              </span>
              <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className={isDark ? "text-white" : "text-gray-900"}>Live From the</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1306c] via-[#f77737] to-[#fcaf45]">
                #GDGIndore Gram
              </span>
            </h2>

            <p className={`mt-2 text-sm sm:text-base font-normal max-w-2xl ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Catch real-time behind-the-scenes moments, speaker spotlights, reel drops, and developer stories curated directly from our official Instagram feed.
            </p>
          </div>

          <a
            href="https://www.instagram.com/gdgindore/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all group shrink-0 shadow-lg hover:scale-105 active:scale-95 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @gdgindore</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Official Elfsight Instagram Live Feed Container */}
        <div className={`p-4 sm:p-6 md:p-8 rounded-3xl border-2 transition-all reveal-on-scroll min-h-[420px] overflow-hidden ${
          isDark
            ? "bg-[#0d0d0d]/90 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            : "bg-white border-gray-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Elfsight Native App Anchor */}
          <div
            className="elfsight-app-d581ef1f-234e-40e9-bd82-38ddb80d3d7c"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
