"use client";

import { useState, useEffect } from "react";
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
import { SocialLinks, INITIAL_SOCIAL_LINKS, getSocialLinks } from "@/lib/firestoreService";

export default function Footer() {
  const { isDark } = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [socials, setSocials] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);

  useEffect(() => {
    getSocialLinks().then((res) => {
      if (res) setSocials(res);
    });
  }, []);

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
        {/* Unified Master Conference Terminal Card */}
        <div className={`rounded-3xl border overflow-hidden transition-all shadow-xl mb-12 ${
          isDark
            ? "bg-[#0d0d0d] border-white/15 shadow-[0_0_50px_rgba(66,133,244,0.12)]"
            : "bg-white border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Integrated Top Hero Horizon Canvas */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] md:aspect-[32/10] min-h-[220px] max-h-[320px] overflow-hidden">
            <Image
              src={isDark ? "/images/space-ai-neural-dark.jpg" : "/images/space-ai-neural-light.jpg"}
              alt="DevFest Indore Space & AI Neural Architecture Horizon"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              unoptimized
            />
            {/* Seamless blended bottom gradient into the card's body */}
            <div className={`absolute inset-0 pointer-events-none ${
              isDark
                ? "bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent"
                : "bg-gradient-to-t from-white via-white/40 to-transparent"
            }`} />

            {/* Top Telemetry Tag Strip */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-6 flex flex-wrap items-center gap-2">
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

            {/* Bottom Callout Floating Elements */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
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
                onClick={() => {
                  import("@/lib/telemetryService").then(({ trackDevFestEvent }) => {
                    trackDevFestEvent("get_tickets_click", { location: "footer_banner", method: "scroll_to_tickets" });
                  });
                }}
                className="px-6 py-3 rounded-xl bg-[#f9ab00] hover:bg-[#e09900] text-black font-black text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-black" />
                <span>Claim Space Pass</span>
              </a>
            </div>
          </div>

          {/* Integrated Lower Conference Directory & Guidelines Body */}
          <div className="p-6 sm:p-10 border-t border-gray-100 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Brand & Community Mission */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <Link href="/" className="inline-flex items-center gap-3.5 mb-4 group">
                    <div className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border shadow-md group-hover:scale-105 group-hover:rotate-6 transition-transform overflow-hidden ${
                      isDark ? "bg-[#141414] border-white/20 shadow-[0_0_25px_rgba(66,133,244,0.35)]" : "bg-white border-black/15 shadow-[0_4px_16px_rgba(66,133,244,0.2)]"
                    }`}>
                      <Image
                        src="/gdglogo-removebg-preview.png"
                        alt="GDG DevFest Indore Logo"
                        width={60}
                        height={60}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain scale-110"
                      />
                    </div>
                    <div>
                      <span className={`block font-black text-xl sm:text-2xl ${isDark ? "text-white" : "text-gray-900"}`}>
                        GDG Indore
                      </span>
                      <span className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-white/75" : "text-gray-600"}`}>
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
                      href={socials.twitter || "https://x.com/GDG_Indore"}
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
                      href={socials.linkedin || "https://linkedin.com/company/gdg-indore"}
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
                      href={socials.instagram || "https://instagram.com/gdgindore"}
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
                      href={socials.youtube || "https://youtube.com/@GDGIndore"}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:rotate-6 transition-transform shadow-sm ${
                        isDark ? "border-white/15 bg-[#ea4335]/15" : "border-gray-200 bg-[#ea4335]/10"
                      }`}
                      title="YouTube"
                    >
                      <YoutubeIcon className="w-4 h-4 text-[#ea4335]" />
                    </a>
                    <a
                      href={socials.github || "https://github.com/GDG-Indore"}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm ${
                        isDark ? "border-white/15 bg-[#34a853]/15" : "border-gray-200 bg-[#34a853]/10"
                      }`}
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4 text-[#34a853]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Nav Links (All Core Sections) */}
              <div className="lg:col-span-3">
                <span className={`block text-xs font-black uppercase tracking-wider mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Conference Sections
                </span>
                <ul className={`space-y-2 text-sm font-semibold ${
                  isDark ? "text-white/75" : "text-gray-700"
                }`}>
                  {[
                    { name: "About DevFest", href: "/#about" },
                    { name: "Content Pillars", href: "/#pillars" },
                    { name: "Space Alliance", href: "/#space-collaboration" },
                    { name: "Campus Workshops", href: "/#workshops" },
                    { name: "Featured Speakers", href: "/past-speakers" },
                    { name: "Previous Editions", href: "/gallery" },
                    { name: "Satellite Events", href: "/#satellite-events" },
                    { name: "Essentia Hotel Venue", href: "/#venue" },
                    { name: "Sponsors & Partners", href: "/#sponsors" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={`group inline-block transition-colors ${
                        isDark ? "hover:text-white" : "hover:text-gray-900"
                      }`}>
                        <span className="roll-text-container">
                          <span className="roll-text-top">{item.name}</span>
                          <span className="roll-text-bottom text-[#4285f4]">{item.name} →</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Guidelines Column */}
              <div className="lg:col-span-2">
                <span className={`block text-xs font-black uppercase tracking-wider mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Community & Guidelines
                </span>
                <ul className={`space-y-2 text-sm font-semibold ${
                  isDark ? "text-white/75" : "text-gray-700"
                }`}>
                  <li>
                    <Link href="/team" className="hover:text-[#4285f4] transition-colors">
                      Organizing Team & Leads
                    </Link>
                  </li>
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
                    <a href="/#sponsors" className="hover:text-[#34a853] transition-colors">
                      Partner / Sponsor Deck
                    </a>
                  </li>
                  <li>
                    <Link href="/#social-stream" className="hover:text-[#e1306c] transition-colors">
                      Instagram Live Feed
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dedicated FAQ Card */}
              <div className={`p-6 rounded-3xl border ${
                isDark ? "bg-[#141414] border-white/10" : "bg-gray-50 border-gray-200 shadow-sm"
              } lg:col-span-3 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#f9ab00] animate-ping" />
                    <span className={`text-xs font-black tracking-widest text-[#f9ab00] uppercase`}>
                      KNOWLEDGE BASE
                    </span>
                  </div>
                  <h4 className={`text-base font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    FREQUENTLY ASKED QUESTIONS
                  </h4>
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    Everything you need to know about passes, badges, schedule, venue accessibility, and speaker requirements.
                  </p>
                </div>

                <a
                  href="/#faq"
                  className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 bg-[#4285f4] text-white hover:bg-[#3367d6] cursor-pointer"
                >
                  <span>EXPLORE ALL FAQ</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>
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
