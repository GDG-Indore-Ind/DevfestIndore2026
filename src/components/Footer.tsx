"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ArrowUp,
  Heart,
  CheckCircle,
  Sparkles,
  Rocket,
  Compass,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, InstagramIcon, YoutubeIcon, GithubIcon } from "./SocialIcons";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`border-t relative pt-16 pb-8 overflow-hidden transition-colors ${
      isDark ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10" : "bg-white/90 backdrop-blur-md border-black/10"
    }`}>
      {/* Background Celestial Orbital Arc */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50%" cy="10%" rx="650" ry="160" fill="none" stroke="#4285f4" strokeWidth="1" strokeDasharray="8 8" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Panoramic Lunar Base Mission Control Banner */}
        <div className="mb-14 reveal-on-scroll">
          <div className={`relative rounded-3xl overflow-hidden border transition-all ${
            isDark
              ? "bg-[#0d0d0d] border-white/15 shadow-[0_0_40px_rgba(66,133,244,0.15)]"
              : "bg-white border-gray-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
          }`}>
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[32/11] min-h-[220px] max-h-[360px]">
              <Image
                src="/images/footer-lunar-base-illustration.jpg"
                alt="DevFest Indore Lunar Base Mission Control Horizon"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-bottom"
                unoptimized
              />
              {/* Subtle gradient vignette to blend top/bottom cleanly */}
              <div className={`absolute inset-0 pointer-events-none ${
                isDark
                  ? "bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent"
                  : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
              }`} />

              {/* Floating telemetry chips */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#ffffff] !text-[#ffffff] text-[11px] font-mono font-bold border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#34a853] animate-ping" />
                  <span className="text-[#ffffff] !text-[#ffffff]" style={{ color: "#ffffff" }}>
                    INDORE LUNAR BASE // MISSION CONTROL
                  </span>
                </div>
                <span
                  className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#ffffff] !text-[#ffffff] text-[10px] font-mono font-black border border-white/15"
                  style={{ color: "#ffffff" }}
                >
                  ✦ NOV 28, 2026
                </span>
              </div>

              {/* Bottom callout over image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                <div className="bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 max-w-lg text-[#ffffff] !text-[#ffffff] shadow-lg">
                  <h4 className="text-sm sm:text-lg font-black mb-0.5 flex items-center gap-2 text-[#ffffff] !text-[#ffffff]">
                    <span className="text-[#ffffff] !text-[#ffffff]" style={{ color: "#ffffff" }}>See You at Mission Launch!</span>
                    <Sparkles className="w-4 h-4 text-[#f9ab00] cosmic-sparkle" />
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#ffffff] !text-[#ffffff]" style={{ color: "#ffffff" }}>
                    Connecting 800+ builders, creators, and innovators from Indore to the cosmos.
                  </p>
                </div>

                <a
                  href="#tickets"
                  className="px-5 py-2.5 rounded-xl bg-white text-gray-900 font-extrabold text-xs uppercase tracking-wider hover:bg-white/90 transition-transform hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Rocket className="w-3.5 h-3.5 text-[#ea4335]" />
                  <span>Secure Space Pass</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14 reveal-on-scroll">
          {/* Brand & Community Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl telemetry-card shadow-[0_0_12px_rgba(66,133,244,0.2)] group-hover:scale-105 group-hover:rotate-6 transition-transform">
                  <span className="text-[#4285f4] font-bold text-lg font-mono">{"<"}</span>
                  <span className="text-[#ea4335] font-bold text-xs">/</span>
                  <span className="text-[#34a853] font-bold text-lg font-mono">{">"}</span>
                </div>
                <div>
                  <span className={`block font-black text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                    GDG Indore
                  </span>
                  <span className={`block text-[13px] font-semibold ${isDark ? "text-white/75" : "text-gray-600"}`}>
                    DevFest Indore 2026 Space Edition
                  </span>
                </div>
              </Link>

              <p className={`text-sm font-normal leading-relaxed mb-6 ${
                isDark ? "text-white/85" : "text-gray-700"
              }`}>
                Google Developer Group Indore is an open, community-run group of developers, designers,
                and technology enthusiasts dedicated to learning, sharing, and building impactful digital solutions.
              </p>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://x.com/GDG_Indore"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm ${
                    isDark ? "border-white/15 bg-[#4285f4]/15" : "border-gray-200 bg-[#4285f4]/10"
                  }`}
                  title="Twitter / X"
                >
                  <TwitterIcon className={`w-4 h-4 ${isDark ? "text-white/80" : "text-gray-800"}`} />
                </a>
                <a
                  href="https://linkedin.com/company/gdg-indore"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:rotate-6 transition-transform shadow-sm ${
                    isDark ? "border-white/15 bg-[#4285f4]/15" : "border-gray-200 bg-[#4285f4]/10"
                  }`}
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#4285f4]" />
                </a>
                <a
                  href="https://instagram.com/gdgindore"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm ${
                    isDark ? "border-white/15 bg-[#ea4335]/15" : "border-gray-200 bg-[#ea4335]/10"
                  }`}
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-[#ea4335]" />
                </a>
                <a
                  href="https://youtube.com/GDGIndore"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:rotate-6 transition-transform shadow-sm ${
                    isDark ? "border-white/15 bg-[#ea4335]/15" : "border-gray-200 bg-[#ea4335]/10"
                  }`}
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4 text-[#ea4335]" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <span className={`block text-xs font-black uppercase tracking-wider mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Navigation
            </span>
            <ul className={`space-y-2.5 text-sm font-semibold ${
              isDark ? "text-white/75" : "text-gray-700"
            }`}>
              {["About", "Sponsors", "Tickets", "Venue", "Faq"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} className={`group inline-block transition-colors ${
                    isDark ? "hover:text-white" : "hover:text-gray-900"
                  }`}>
                    <span className="roll-text-container">
                      <span className="roll-text-top">{item}</span>
                      <span className="roll-text-bottom text-[#4285f4]">{item} →</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="lg:col-span-2">
            <span className={`block text-xs font-black uppercase tracking-wider mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Community
            </span>
            <ul className={`space-y-2.5 text-sm font-semibold ${
              isDark ? "text-white/75" : "text-gray-700"
            }`}>
              <li>
                <a
                  href="https://developers.google.com/community-guidelines"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#34a853] transition-colors"
                >
                  Code of Conduct
                </a>
              </li>
              <li>
                <a
                  href="https://sessionize.com/devfest-indore-2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#34a853] transition-colors"
                >
                  Call for Speakers (CFP)
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-[#34a853] transition-colors">
                  Partner / Sponsor Deck
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box — space telemetry card */}
          <div className={`telemetry-card p-6 rounded-3xl spotlight-card ${
            isDark ? "bg-[#0d0d0d]/90 border-white/15" : "!bg-white !border-gray-200/90 shadow-md"
          } lg:col-span-4`}>
            <span className={`block text-xs font-black uppercase tracking-wider mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Stay in the Loop
            </span>
            <p className={`text-sm font-normal leading-relaxed mb-4 ${
              isDark ? "text-white/80" : "text-gray-700"
            }`}>
              Get timely notifications on speaker reveals, workshop prerequisites, and hackathon problem statements.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-[#4285f4] ${
                    isDark
                      ? "border border-white/15 bg-[#1a1a1a] text-white placeholder:text-white/45"
                      : "border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border border-[#4285f4]/50 shadow-[0_0_15px_rgba(66,133,244,0.4)] hover:bg-[#3367d6] transition-all cursor-pointer"
                >
                  Subscribe to Updates
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[#34a853]/20 border border-[#34a853]/40 flex items-center gap-2 text-xs font-bold text-[#34a853] animate-bounce">
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className={`pt-8 border-t text-xs leading-relaxed mb-6 ${
          isDark ? "border-white/10 text-white/70" : "border-gray-200 text-gray-600"
        }`}>
          <p>
            <strong className={isDark ? "text-white/85" : "text-gray-800"}>Disclaimer:</strong> GDG Indore is an independent developer community.
            Activities and opinions expressed here should in no way be linked to Google, the corporation.
            To learn more about the Google Developer Groups program, visit{" "}
            <a
              href="https://gdg.community.dev/gdg-indore"
              target="_blank"
              rel="noreferrer"
              className="text-[#4285f4] underline"
            >
              gdg.community.dev/gdg-indore
            </a>
            .
          </p>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] font-bold ${
          isDark ? "text-white/80" : "text-gray-700"
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ea4335] fill-[#ea4335] animate-pulse" />
            <span>by GDG Indore Organizers</span>
            <span className="hidden md:inline text-gray-400">•</span>
            <span className="hidden md:inline font-mono text-xs text-[#4285f4]">
              ✦ MISSION CONTROL: 22.7196° N, 75.8577° E
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all hover:scale-105 cursor-pointer text-xs font-bold ${
              isDark
                ? "bg-white/8 border-white/15 hover:bg-white/15 text-white"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 shadow-sm"
            }`}
          >
            <span>Back to orbit</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Google 4-Color Wave Bar — brand anchor at bottom */}
      <div className="mt-8 h-2 flex w-full">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>
    </footer>
  );
}
