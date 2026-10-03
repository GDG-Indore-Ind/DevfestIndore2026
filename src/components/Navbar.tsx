"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket, Menu, X, Bookmark, MapPin } from "lucide-react";

interface NavbarProps {
  savedCount?: number;
  onOpenSavedModal?: () => void;
}

export default function Navbar({ savedCount = 0, onOpenSavedModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
<<<<<<< Updated upstream
=======
    { name: "Satellite Events", href: "#satellite-events" },
    // { name: "Agenda", href: "#agenda" },
    // { name: "Speakers", href: "#speakers" },
>>>>>>> Stashed changes
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
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 flex w-full">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>

      <header
        className={`fixed top-1.5 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-gray-200/80 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Animated Brackets */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border-2 border-[#1e1e1e] google-pill-shadow group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <span className="text-[#4285f4] font-bold text-lg font-mono">&lt;</span>
              <span className="text-[#ea4335] font-bold text-xs">/</span>
              <span className="text-[#34a853] font-bold text-lg font-mono">&gt;</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#1e1e1e]">
                  GDG Indore
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#ffe7a5] text-[#1e1e1e] border border-[#ffd427]">
                  2026
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#5f6368] -mt-0.5 flex items-center gap-1">
                <span>DevFest</span>
                <span className="w-1 h-1 rounded-full bg-[#34a853]" />
                <span className="text-[#34a853]">Nov 28</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with DevFest Chennai Roll-up Typography */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f0f0f0]/90 p-1.5 rounded-full border border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group px-3.5 py-1.5 text-xs font-bold text-[#1e1e1e] hover:bg-white rounded-full transition-all duration-150"
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-[#c3ecf6] text-[#1e1e1e] border border-[#57caff] hover:bg-[#57caff]/40 transition-transform active:scale-95 animate-pulse-ring"
                title="View Bookmarked Sessions"
              >
                <Bookmark className="w-3.5 h-3.5 fill-[#4285f4] text-[#4285f4]" />
                <span>{savedCount} Saved</span>
              </button>
            )}

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
            className="lg:hidden p-2 rounded-xl border-2 border-[#1e1e1e] bg-white text-[#1e1e1e] google-pill-shadow"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b-2 border-[#1e1e1e] shadow-xl p-5 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-[#5f6368] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Essentia Luxury Hotel Indore
                </span>
                <span className="text-xs font-bold text-[#34a853] bg-[#ccf6c5] px-2 py-0.5 rounded-full">
                  Nov 28, 2026
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#1e1e1e] hover:bg-[#c3ecf6]/40 hover:text-[#4285f4] transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="#tickets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-bold text-sm bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow flex items-center justify-center gap-2"
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
