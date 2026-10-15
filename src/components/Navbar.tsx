"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Menu, X, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { NavItem, INITIAL_NAV_ITEMS, getNavItems, subscribeToNavItems } from "@/lib/firestoreService";

interface NavbarProps {
  savedCount?: number;
  onOpenSavedModal?: () => void;
}

export default function Navbar({ savedCount = 0, onOpenSavedModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>(INITIAL_NAV_ITEMS);

  useEffect(() => {
    const unsub = subscribeToNavItems((items) => {
      if (items && items.length > 0) setNavItems(items);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile navigation drawer is open to prevent background scrolling and overlapping
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
    import("@/lib/telemetryService").then(({ trackDevFestEvent }) => {
      trackDevFestEvent("get_tickets_click", { location: "navbar_pill", method: "konfhub_modal_launch" });
      trackDevFestEvent("ticket_checkout_click", { location: "navbar", method: "konfhub_widget_opened" });
    });
  };

  // Visible items for desktop navbar (FAQ removed, Instagram Feed added)
  const visibleNavItems = navItems.filter((i) => i.visible);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Identity (Larger Logo) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile / Compact Explore Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden px-2.5 py-1.5 rounded-2xl border transition-all flex items-center gap-1.5 cursor-pointer ${isDark
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-black/15 bg-white text-gray-900 shadow-sm hover:bg-gray-50"
                }`}
              aria-label="Toggle Global Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#ea4335]" /> : <Menu className="w-4 h-4 text-[#4285f4]" />}
              <span className="text-[11px] font-mono font-bold tracking-wider">
                {mobileMenuOpen ? "CLOSE" : "MENU"}
              </span>
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border shadow-md group-hover:scale-105 transition-transform shrink-0 overflow-hidden ${isDark
                  ? "bg-[#0d0d0d] border-white/20 shadow-[0_0_20px_rgba(66,133,244,0.35)]"
                  : "bg-white border-black/15 shadow-[0_4px_12px_rgba(66,133,244,0.2)]"
                  }`}
              >
                <Image
                  src="/gdglogo-removebg-preview.png"
                  alt="GDG DevFest Indore Logo"
                  width={56}
                  height={56}
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain scale-110"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-black text-sm sm:text-base tracking-tight leading-none ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                  Google Developer Groups
                </span>
                <span className={`text-xs font-semibold leading-none mt-1 ${isDark ? "text-white/80" : "text-gray-600"}`}>
                  Indore • DevFest 2026
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Dynamically configured from Admin, FAQ removed, Instagram Feed added) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold">
            {visibleNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors whitespace-nowrap ${
                  isDark ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-[#4285f4]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Theme Toggle & Glowing "Get Tickets →" CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 justify-end shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${isDark
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-black/5 border-black/15 text-gray-800 hover:bg-black/10"
                }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#f9ab00]" /> : <Moon className="w-4 h-4 text-[#4285f4]" />}
            </button>

            {/* Glowing Get Tickets Pill */}
            <button
              onClick={handleOpenCheckout}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isDark
                  ? "bg-gradient-to-r from-[#0070f3] to-[#7928ca] text-white shadow-[0_0_25px_rgba(0,112,243,0.7)] border border-blue-400/40 hover:shadow-[0_0_35px_rgba(0,112,243,0.9)]"
                  : "bg-[#4285f4] text-white shadow-[0_4px_14px_rgba(66,133,244,0.35)] hover:bg-[#3367d6]"
              }`}
            >
              <span>Get Tickets</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Slide-Over Navigation Cart Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Solid Opaque Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
          />

          {/* Left Side Panel / Navigation Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10 z-[101]">
            <div
              className={`w-screen max-w-md shadow-2xl flex flex-col border-r animate-in slide-in-from-left duration-300 ${
                isDark
                  ? "bg-[#0a0d14] border-white/15 text-white"
                  : "bg-[#ffffff] border-gray-300 text-gray-900"
              }`}
            >
              {/* Drawer Header */}
              <div className={`px-7 py-6 border-b flex items-center justify-between shrink-0 ${
                isDark ? "border-white/10 bg-[#0a0d14]" : "border-black/10 bg-white"
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
                  className={`p-2.5 rounded-full border transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
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
              <div className={`px-7 py-3 border-b flex items-center justify-between text-xs font-mono shrink-0 ${
                isDark ? "border-white/5 bg-white/[0.02] text-white/60" : "border-black/5 bg-gray-50 text-gray-600"
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#ea4335]" /> Essentia Luxury Arena
                </span>
                <span className="font-bold text-[#34a853] bg-[#34a853]/15 px-2.5 py-0.5 rounded-full border border-[#34a853]/30">
                  28 NOV 2026
                </span>
              </div>

              {/* Drawer Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto px-7 py-6 space-y-1">
                {visibleNavItems.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group py-3.5 px-3 rounded-2xl transition-all flex items-center justify-between ${
                      isDark
                        ? "hover:bg-white/5 text-white/90 hover:text-white"
                        : "hover:bg-gray-100 text-gray-900 hover:text-black"
                    }`}
                  >
                    <div>
                      <div className="text-xl sm:text-2xl font-serif font-medium tracking-tight group-hover:translate-x-1.5 transition-transform flex items-center gap-2">
                        <span>{link.name}</span>
                      </div>
                      {link.desc && (
                        <div className={`text-[11px] font-sans mt-0.5 line-clamp-1 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                          {link.desc}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 group-hover:text-[#4285f4] text-lg font-mono opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      ›
                    </span>
                  </Link>
                ))}
              </div>

              {/* Drawer Footer Actions */}
              <div className={`p-7 border-t space-y-3.5 shrink-0 ${
                isDark ? "border-white/10 bg-[#0a0d14]" : "border-black/10 bg-white"
              }`}>
                <div className="flex items-center gap-3">
                  <Link
                    href="/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-colors ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                        : "bg-[#4285f4]/10 border-[#4285f4]/30 text-[#4285f4] hover:bg-[#4285f4]/20"
                    }`}
                  >
                    Organizers & Alumni
                  </Link>

                  <button
                    onClick={() => toggleTheme()}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
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
                  href="/#tickets"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenCheckout();
                  }}
                  className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-[#4285f4] text-white hover:bg-[#3367d6] dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Ticket className="w-4 h-4 text-white dark:text-[#4285f4]" />
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
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-md p-3 pt-24 sm:p-5 sm:pt-28 md:pt-32 animate-in fade-in duration-150"
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
    </>
  );
}
