"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowUp,
  Heart,
  CheckCircle,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, InstagramIcon, YoutubeIcon, GithubIcon } from "./SocialIcons";

export default function Footer() {
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
    <footer className="bg-[#0a0a0a] border-t border-white/10 relative pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14 reveal-on-scroll">
          {/* Brand & Community Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#0d0d0d] border border-white/15 shadow-[0_0_12px_rgba(66,133,244,0.2)] group-hover:scale-105 group-hover:rotate-6 transition-transform">
                  <span className="text-[#4285f4] font-bold text-lg font-mono">{"<"}</span>
                  <span className="text-[#ea4335] font-bold text-xs">/</span>
                  <span className="text-[#34a853] font-bold text-lg font-mono">{">"}</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-white">GDG Indore</span>
                  <span className="block text-xs font-bold text-white/45">DevFest Indore 2026</span>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-white/50 font-medium leading-relaxed mb-6">
                Google Developer Group Indore is an open, community-run group of developers, designers,
                and technology enthusiasts dedicated to learning, sharing, and building impactful digital solutions.
              </p>

              <div className="flex items-center gap-2.5 text-white">
                <a
                  href="https://x.com/GDG_Indore"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl border border-white/15 bg-[#4285f4]/15 flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4 text-white/70" />
                </a>
                <a
                  href="https://linkedin.com/company/gdg-indore"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl border border-white/15 bg-[#4285f4]/15 flex items-center justify-center hover:scale-115 hover:rotate-6 transition-transform shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#4285f4]" />
                </a>
                <a
                  href="https://instagram.com/gdgindore"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl border border-white/15 bg-[#ea4335]/15 flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-[#ea4335]" />
                </a>
                <a
                  href="https://youtube.com/GDGIndore"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl border border-white/15 bg-[#ea4335]/15 flex items-center justify-center hover:scale-115 hover:rotate-6 transition-transform shadow-sm"
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4 text-[#ea4335]" />
                </a>
                {/* <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl border border-white/15 bg-[#34a853]/15 flex items-center justify-center hover:scale-115 hover:-rotate-6 transition-transform shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4 text-white/70" />
                </a> */}
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <span className="block text-xs font-black uppercase tracking-wider text-white mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs font-bold text-white/50">
              {["About", "Sponsors", "Tickets", "Venue", "Faq"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="group inline-block hover:text-white transition-colors">
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
            <span className="block text-xs font-black uppercase tracking-wider text-white mb-4">
              Community
            </span>
            <ul className="space-y-2.5 text-xs font-bold text-white/50">
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
              {/* <li>
                <a
                  href="https://forms.gle"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#34a853] transition-colors"
                >
                  Volunteer with Us
                </a>
              </li> */}
              <li>
                <a href="#sponsors" className="hover:text-[#34a853] transition-colors">
                  Partner / Sponsor Deck
                </a>
              </li>
              {/* <li>
                <a href="#indore-vibe" className="hover:text-[#34a853] transition-colors">
                  Indore Travel & Food
                </a>
              </li> */}
            </ul>
          </div>

          {/* Newsletter Box — dark glass */}
          <div className="lg:col-span-4 bg-[#0d0d0d] border border-white/10 p-6 rounded-3xl spotlight-card">
            <span className="block text-xs font-black uppercase tracking-wider text-white mb-2">
              Stay in the Loop
            </span>
            <p className="text-xs text-white/50 font-medium leading-relaxed mb-4">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] text-xs font-bold text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
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
        <div className="pt-8 border-t border-white/8 text-[11px] text-white/35 leading-relaxed mb-6">
          <p>
            <strong className="text-white/50">Disclaimer:</strong> GDG Indore is an independent developer community.
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-white/60">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ea4335] fill-[#ea4335] animate-pulse" />
            <span>by GDG Indore Community Organisers</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 hover:bg-white/12 hover:scale-105 transition-all cursor-pointer text-white/60"
          >
            <span>Back to top</span>
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
