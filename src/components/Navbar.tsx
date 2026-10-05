"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket, Menu, X, Bookmark, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  savedCount?: number;
  onOpenSavedModal?: () => void;
}

export default function Navbar({ savedCount = 0, onOpenSavedModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tickets", href: "#tickets" },
    { name: "Badge Maker", href: "#badge-generator" },
    { name: "Indore Spirit", href: "#indore-vibe" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Venue", href: "#venue" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* Top Google 4-Color Accent Band */}
      <div className="fixed top-0 left-0 right-0 z-50 h-2 flex w-full">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>

      <header
        className={`fixed top-2 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-black/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-white/10 py-2.5"
              : "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border-b border-black/10 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Animated Brackets */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-2xl border shadow-[0_0_12px_rgba(66,133,244,0.3)] group-hover:scale-105 group-hover:rotate-3 transition-transform ${
                isDark
                  ? "bg-[#0d0d0d] border-white/20"
                  : "bg-white border-black/15 shadow-[0_2px_8px_rgba(66,133,244,0.2)]"
              }`}
            >
              <span className="text-[#4285f4] font-bold text-lg font-mono">{"<"}</span>
              <span className="text-[#ea4335] font-bold text-xs">/</span>
              <span className="text-[#34a853] font-bold text-lg font-mono">{">"}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`font-extrabold text-base tracking-tight ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                  GDG Indore
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#f9ab00]/20 text-[#f9ab00] border border-[#f9ab00]/50">
                  2026
                </span>
              </div>
              <span className={`text-[11px] font-semibold -mt-0.5 flex items-center gap-1 ${isDark ? "text-white/50" : "text-black/40"}`}>
                <span>DevFest</span>
                <span className="w-1 h-1 rounded-full bg-[#34a853]" />
                <span className="text-[#34a853]">Nov 28</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Roll-up Typography */}
          <nav
            className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border ${
              isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-150 ${
                  isDark
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-black/70 hover:bg-black/10 hover:text-black"
                }`}
              >
                <span className="roll-text-container">
                  <span className="roll-text-top">{link.name}</span>
                  <span className="roll-text-bottom text-[#4285f4] font-extrabold">{link.name}</span>
                </span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {savedCount > 0 && (
              <button
                onClick={onOpenSavedModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-[#4285f4]/20 text-white border border-[#4285f4]/50 hover:bg-[#4285f4]/30 transition-transform active:scale-95"
                title="View Bookmarked Sessions"
              >
                <Bookmark className="w-3.5 h-3.5 fill-[#4285f4] text-[#4285f4]" />
                <span>{savedCount} Saved</span>
              </button>
            )}

            {/* ☀️/🌙 Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 active:scale-95 ${
                isDark
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-black/10 border-black/20 text-[#1a1a1a] hover:bg-black/20"
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#f9ab00]" />
                  <span className="hidden xl:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#4285f4]" />
                  <span className="hidden xl:inline">Dark</span>
                </>
              )}
            </button>

            {/* Glowing Interactive DevFest Button */}
            <a href="#tickets" className="glow-btn">
              <span className="glow-btn__surface group">
                <Ticket className="w-3.5 h-3.5 text-[#4285f4] group-hover:rotate-12 transition-transform" />
                <span className="roll-text-container">
                  <span className="roll-text-top">Get Tickets</span>
                  <span className="roll-text-bottom text-[#4285f4]">Get Tickets →</span>
                </span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border google-pill-shadow ${
              isDark
                ? "border-white/20 bg-[#0d0d0d] text-white"
                : "border-black/15 bg-white text-[#1a1a1a] shadow-sm"
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden fixed inset-x-0 top-[65px] border-b shadow-xl p-5 z-50 animate-in fade-in slide-in-from-top-4 duration-200 ${
              isDark
                ? "bg-[#0d0d0d] border-white/10"
                : "bg-white border-black/10"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className={`flex items-center justify-between pb-3 mb-2 border-b ${isDark ? "border-white/8" : "border-black/8"}`}>
                <span className={`text-xs font-bold flex items-center gap-1 ${isDark ? "text-white/50" : "text-black/40"}`}>
                  <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Essentia Luxury Hotel Indore
                </span>
                <span className="text-xs font-bold text-[#34a853] bg-[#34a853]/20 px-2 py-0.5 rounded-full">
                  Nov 28, 2026
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isDark
                      ? "text-white/80 hover:bg-[#4285f4]/15 hover:text-[#4285f4]"
                      : "text-black/70 hover:bg-[#4285f4]/10 hover:text-[#4285f4]"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className={`pt-3 mt-2 border-t flex flex-col gap-2 ${isDark ? "border-white/8" : "border-black/8"}`}>
                {/* Mobile Theme Toggle */}
                <button
                  onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      : "bg-black/8 border-black/15 text-[#1a1a1a] hover:bg-black/15"
                  }`}
                >
                  {isDark ? (
                    <><Sun className="w-4 h-4 text-[#f9ab00]" /><span>Switch to Light Theme</span></>
                  ) : (
                    <><Moon className="w-4 h-4 text-[#4285f4]" /><span>Switch to Dark Theme</span></>
                  )}
                </button>

                <a
                  href="#tickets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-bold text-sm bg-[#4285f4] text-white border border-[#4285f4]/50 shadow-[0_0_20px_rgba(66,133,244,0.4)] flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Get DevFest Tickets</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
