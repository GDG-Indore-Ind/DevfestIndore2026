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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const primaryLinks = [
    { name: "Sessions", href: "#sessions-split" },
    { name: "Pillars", href: "#pillars" },
    { name: "CFP", href: "#call-for-speakers" },
    { name: "Gallery", href: "#recap-gallery" },
    { name: "Tickets", href: "#tickets" },
    { name: "Venue", href: "#venue" },
  ];

  const allDrawerLinks = [
    { name: "Overview & Vision", href: "#flow", desc: "DevFest 2026 flagship vision & collective flow" },
    { name: "Sessions & Live CLI", href: "#sessions-split", desc: "Curated session architectures & live terminal feed" },
    { name: "Content Pillars", href: "#pillars", desc: "Space Tech, AI, Robotics, Data & Enterprise" },
    { name: "Space Club of India", href: "#space-collaboration", desc: "Emerging Madhya Pradesh space tech alliance" },
    { name: "Venue & 9 Zones", href: "#zones", desc: "Qualcomm showcase, lounges & workshop halls" },
    { name: "Call for Speakers", href: "#call-for-speakers", desc: "Submit your session proposal on Sessionize" },
    { name: "Photo Archive & Cinema", href: "#recap-gallery", desc: "Previous editions photography & 4K video player" },
    { name: "Satellite Events", href: "#satellite-events", desc: "Indore pre-events & community hackathons" },
    { name: "Tickets & Passes", href: "#tickets", desc: "Reserve your seat via KonfHub" },
    { name: "Essentia Hotel Venue", href: "#venue", desc: "World Cup Square, Pipliyahana, Indore" },
    { name: "Sponsors & Partners", href: "#sponsors", desc: "Ecosystem catalysts & tech showcases" },
    { name: "Team & Past Speakers", href: "/team", desc: "Core organizers & distinguished speakers" },
    { name: "FAQ", href: "#faq", desc: "Common questions & guidelines" },
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
        className={`fixed top-2 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? isDark
            ? "bg-black/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/10 py-2.5"
            : "bg-white/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-black/10 py-2.5"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
          {/* Left: Hamburger & Menu Trigger Button */}
          <div className="flex items-center gap-2 justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`px-3 py-2 rounded-2xl border transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 ${isDark
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-black/15 bg-white text-gray-900 shadow-sm hover:bg-gray-50"
                }`}
              aria-label="Toggle Global Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#ea4335]" /> : <Menu className="w-4 h-4 text-[#4285f4] group-hover:rotate-90 transition-transform" />}
              <span className="text-xs font-mono font-bold tracking-wider">
                {mobileMenuOpen ? "CLOSE" : "EXPLORE"}
              </span>
            </button>

            {/* Quick Pill for Solar Ecosystem */}
            <a
              href="#solar-ecosystem"
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isDark ? "bg-white/5 border-white/10 text-white/80 hover:text-white" : "bg-black/5 border-black/10 text-gray-700 hover:text-black"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00] animate-pulse" />
              <span>3D Orbit</span>
            </a>
          </div>

          {/* Center: Prestigious GDG Indore Centered Brand Identity */}
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center gap-2.5 group text-center">
              <div
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border shadow-sm group-hover:scale-105 transition-transform ${isDark
                  ? "bg-[#0d0d0d] border-white/20"
                  : "bg-white border-black/15 shadow-[0_2px_8px_rgba(66,133,244,0.15)]"
                  }`}
              >
                <span className="text-[#4285f4] font-bold text-base sm:text-lg font-mono">{"<"}</span>
                <span className="text-[#ea4335] font-bold text-xs">/</span>
                <span className="text-[#34a853] font-bold text-base sm:text-lg font-mono">{">"}</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className={`font-black text-sm sm:text-base tracking-tight ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                    GDG Indore
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#f9ab00]/20 text-[#f9ab00] border border-[#f9ab00]/50 hidden sm:inline">
                    2026
                  </span>
                </div>
                <span className={`text-[11px] font-semibold -mt-0.5 flex items-center gap-1.5 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  <span className="text-[#4285f4] font-bold">DevFest</span>
                  <span className="w-1 h-1 rounded-full bg-[#34a853]" />
                  <span className="text-[#34a853] font-bold">Nov 28</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Theme Toggle & Primary Action CTA */}
          <div className="flex items-center gap-2.5 justify-end">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              className={`p-2 rounded-xl border transition-all ${isDark
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-black/5 border-black/15 text-gray-800 hover:bg-black/10"
                }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#f9ab00]" /> : <Moon className="w-4 h-4 text-[#4285f4]" />}
            </button>

            {/* Clean Premium DevFest Tickets Button */}
            <button
              onClick={handleOpenCheckout}
              className="px-4 py-2 rounded-full font-black text-xs tracking-wider uppercase flex items-center gap-2 border-2 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer bg-[#111827] text-white border-[#111827] dark:bg-white dark:text-black dark:border-white"
            >
              <Ticket className="w-3.5 h-3.5 text-[#4285f4]" />
              <span>Tickets</span>
            </button>
          </div>
        </div>

        {/* Global Slide-Over Navigation Cart Drawer (Inspired by Optrar.com Minimalist Clean Aesthetic) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            />

            {/* Right Side Panel / Cart Drawer */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <div
                className={`w-screen max-w-md shadow-2xl flex flex-col border-l animate-in slide-in-from-right duration-300 ${
                  isDark
                    ? "bg-[#0a0d14] border-white/15 text-white"
                    : "bg-[#faf9f6] border-gray-300 text-gray-900"
                }`}
              >
                {/* Drawer Header */}
                <div className={`px-7 py-6 border-b flex items-center justify-between ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#4285f4] font-black block mb-0.5">
                      NAVIGATION // MENU
                    </span>
                    <h3 className="text-xl font-black tracking-tight font-serif italic">
                      DevFest Indore
                    </h3>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2.5 rounded-full border transition-transform hover:scale-110 active:scale-95 ${
                      isDark
                        ? "border-white/20 bg-white/5 hover:bg-white/15 text-white"
                        : "border-black/15 bg-white hover:bg-gray-100 text-gray-900 shadow-sm"
                    }`}
                    aria-label="Close menu drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Quick Details Strip */}
                <div className={`px-7 py-3 border-b flex items-center justify-between text-xs font-mono ${
                  isDark ? "border-white/5 bg-white/[0.02] text-white/60" : "border-black/5 bg-black/[0.02] text-gray-600"
                }`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Essentia Luxury Arena
                  </span>
                  <span className="font-bold text-[#34a853] bg-[#34a853]/15 px-2.5 py-0.5 rounded-full border border-[#34a853]/30">
                    28 NOV 2026
                  </span>
                </div>

                {/* Drawer Scrollable Navigation Links (Optrar-inspired Large Editorial Serif / Clean Sans) */}
                <div className="flex-1 overflow-y-auto px-7 py-6 space-y-1">
                  {allDrawerLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group py-3.5 px-3 rounded-2xl transition-all flex items-center justify-between ${
                        isDark
                          ? "hover:bg-white/5 text-white/90 hover:text-white"
                          : "hover:bg-black/5 text-gray-900 hover:text-black"
                      }`}
                    >
                      <div>
                        <div className="text-xl sm:text-2xl font-serif font-medium tracking-tight group-hover:translate-x-1.5 transition-transform flex items-center gap-2">
                          <span>{link.name}</span>
                        </div>
                        <div className={`text-[11px] font-sans mt-0.5 line-clamp-1 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                          {link.desc}
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-[#4285f4] text-lg font-mono opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        ›
                      </span>
                    </a>
                  ))}
                </div>

                {/* Drawer Footer Actions */}
                <div className={`p-7 border-t space-y-3.5 ${
                  isDark ? "border-white/10 bg-black/60" : "border-black/10 bg-white"
                }`}>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/team"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-colors ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                          : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      Organizers & Alumni
                    </Link>

                    <button
                      onClick={() => toggleTheme()}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-colors ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                          : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {isDark ? (
                        <><Sun className="w-3.5 h-3.5 text-[#f9ab00]" /><span>Light</span></>
                      ) : (
                        <><Moon className="w-3.5 h-3.5 text-[#4285f4]" /><span>Dark</span></>
                      )}
                    </button>
                  </div>

                  <a
                    href="#tickets"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenCheckout();
                    }}
                    className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-[#111827] text-white dark:bg-white dark:text-black shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-[#4285f4]" />
                    <span>Reserve DevFest Pass</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single Registration Checkout Modal — dark glass */}
        {isCheckoutOpen && (
          <div
            onClick={() => setIsCheckoutOpen(false)}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-3 pt-24 sm:p-5 sm:pt-28 md:pt-32 animate-in fade-in duration-150"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              className="checkout-modal-scrollbar relative my-0 sm:my-auto w-full max-w-3xl max-h-[calc(100dvh-7rem)] sm:max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0d0d0d] p-4 sm:p-6 md:p-8 google-card-shadow"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute right-3 top-3 sm:right-5 sm:top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white hover:bg-white/15 cursor-pointer transition-colors"
                aria-label="Close registration checkout"
              >
                ✕
              </button>

              {/* Checkout Header */}
              <div className="mb-4 pr-9 sm:mb-5">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#34a853]/40 bg-[#34a853]/20 px-3 py-1 text-[10px] sm:text-xs font-black text-[#34a853]">
                  <Ticket className="h-3.5 w-3.5" />
                  <span>Registration Checkout</span>
                </div>

                <h3
                  id="checkout-title"
                  className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight"
                >
                  Select Your Tickets
                </h3>

                <p className="mt-2 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-white/80">
                  Be a part of DevFest Indore 2026. Choose your ticket and
                  complete your registration securely with KonfHub.
                </p>
              </div>

              {/* KonfHub Widget */}
              <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0d0d0d]">
                <iframe
                  src="https://konfhub.com/widget/id/9ed5736d-0044-4e00-a5e3-76f0b58e4fe6"
                  id="konfhub-widget"
                  title="Select tickets for GDG DevFest Indore 2026"
                  width="100%"
                  height="420"
                  allow="payment"
                  className="block h-[360px] w-full border-0 sm:h-[400px] md:h-[420px]"
                  loading="lazy"
                />
              </div>

              <p className="mt-3 text-center text-xs font-medium text-white/65">
                Ticket selection and payment are handled securely by KonfHub.
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
