"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Handshake,
  Download,
  Mail,
  Sparkles,
  Rocket,
  Award,
  Users,
  Building2,
  Tv,
  CheckCircle2,
  TrendingUp,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

// Key Noteworthy Statistics from Sponsorship Deck (Page 8)
const DECK_STATISTICS = [
  { value: "1,500+", label: "DevFest Footfall", sub: "Engineers & leaders", color: "text-[#4285f4]" },
  { value: "10,000+", label: "Social Reach", sub: "Digital tech audience", color: "text-[#ea4335]" },
  { value: "12,000+", label: "Attendees Served", sub: "Across community years", color: "text-[#f9ab00]" },
  { value: "100+", label: "Distinguished Speakers", sub: "GDEs, founders & architects", color: "text-[#34a853]" },
  { value: "40+", label: "Corporate Collaborations", sub: "Enterprises & tech brands", color: "text-[#4285f4]" },
  { value: "300+", label: "Technical Meetups", sub: "Hands-on workshops & summits", color: "text-[#ea4335]" },
];

// Curated Past Sponsors from Deck (Page 5)
const PAST_SPONSORS_FEATURED = [
  { name: "Google for Developers", category: "Global Tech", tier: "Title Partner" },
  { name: "FlutterFlow", category: "Low-Code AI", tier: "Gold Partner" },
  { name: "JetBrains", category: "Dev Tools", tier: "Developer Ecosystem" },
  { name: "GitHub", category: "DevOps & Open Source", tier: "Global Partner" },
  { name: "Diaspark", category: "Enterprise IT", tier: "Corporate Partner" },
  { name: "QuillBot", category: "AI & Productivity", tier: "AI Innovation" },
  { name: "MSI", category: "Hardware & Compute", tier: "Hardware Partner" },
  { name: "GenieTalk.ai", category: "Conversational AI", tier: "AI Partner" },
  { name: "Softude (Systematix)", category: "Cloud & Digital", tier: "Enterprise Partner" },
  { name: "ProtonsHub", category: "Tech Labs", tier: "Ecosystem Partner" },
  { name: "Webllisto", category: "Web3 & Cloud", tier: "Technology Partner" },
  { name: "GraffersID", category: "Product Dev", tier: "Startup Partner" },
  { name: "Coding Blocks", category: "EdTech", tier: "Learning Partner" },
  { name: "Workie Coworks", category: "Community Spaces", tier: "Venue Partner" },
  { name: "Next Coworks", category: "Tech Hub", tier: "Community Partner" },
];

// Past Media Partners from Deck (Page 6)
const PAST_MEDIA_PARTNERS = [
  { name: "Dainik Bhaskar", type: "Print & Digital Daily", scope: "Statewide Coverage" },
  { name: "Naidunia", type: "Leading Hindi Daily", scope: "Central India" },
  { name: "Dainik Jagran", type: "National Daily", scope: "Regional Bureau" },
  { name: "Indore HD", type: "Digital Media Hub", scope: "Social Multiplier" },
  { name: "Indore Talk", type: "Community Network", scope: "600k+ Reach" },
  { name: "StartupNews.fyi", type: "Tech Journalism", scope: "Pan-India Startup Press" },
  { name: "Apna Indore", type: "Regional Broadcast", scope: "City Broadcast" },
  { name: "MIST Media", type: "Media Marketing", scope: "Creator Reach" },
];

// Community & College Partners from Deck (Page 7)
const COMMUNITY_PARTNERS = [
  { name: "KonfHub", role: "Official Ticketing & Event Tech Platform" },
  { name: "The Hackers Meetup", role: "Cybersecurity & InfoSec Community" },
  { name: "Indore Entrepreneurs Network (IEN)", role: "Founder & Investor Ecosystem" },
  { name: "Indore Software Association", role: "Industry & Enterprise IT Council" },
  { name: "Headstart Indore", role: "Startup Accelerator & Founder Network" },
  { name: "Code Vipassana", role: "Deep Engineering Practice & Coding" },
  { name: "BSides Indore", role: "Security & Defensive Cyber Operations" },
  { name: "Open Network", role: "Decentralized Tech Innovation" },
  { name: "Apache Local Community Indore", role: "Open Source Infrastructure" },
  { name: "GDG on Campus (10+ Institutes)", role: "University Student Developer Chapters" },
];

export default function SponsorsSection() {
  const { isDark } = useTheme();
  const [activePartnerTab, setActivePartnerTab] = useState<"sponsors" | "media" | "community">("sponsors");

  return (
    <section id="sponsors" className="py-14 md:py-20 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
            <Handshake className="w-4 h-4 text-[#34a853]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Partner Ecosystem • GDG Network & Industry Coalitions
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Backed by Industry Titans & Visionary Brands
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            DevFest Indore convenes global tech giants, Central India&apos;s leading software organizations, high-impact media partners, and premier academic developer hubs.
          </p>
        </div>

        {/* Noteworthy Statistics Grid (From Sponsorship Deck) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14 reveal-on-scroll">
          {DECK_STATISTICS.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border text-center transition-transform hover:-translate-y-1 ${
                isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
              }`}
            >
              <div className={`text-2xl sm:text-3xl font-black ${stat.color} tracking-tight`}>
                {stat.value}
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.label}
              </div>
              <div className={`text-[10px] mt-0.5 line-clamp-1 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Title Sponsor Spotlight — Google for Developers */}
        <div className="reveal-on-scroll mb-14">
          <CardTilt
            className={`telemetry-card rounded-3xl google-card-shadow p-8 sm:p-12 text-center transition-all ${
              isDark ? "bg-[#4285f4]/8 border-[#4285f4]/25" : "!bg-white !border-blue-200/80 shadow-xl"
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285f4] text-white text-xs font-black uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Title Sponsor & Global Backing</span>
            </div>

            <div
              className={`max-w-md mx-auto py-6 px-8 rounded-2xl google-pill-shadow mb-4 hover:scale-105 transition-transform border ${
                isDark ? "bg-[#0d0d0d] border-white/10" : "bg-gray-50 border-gray-200"
              }`}
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#f9ab00]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
                <span className={`text-xl font-normal ml-1 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  for Developers
                </span>
              </span>
            </div>
            <p className={`text-sm max-w-xl mx-auto font-normal leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Empowering engineers with Google Cloud, Vertex AI, Gemini models, Android, and Web platforms to drive next-generation intelligent applications.
            </p>
          </CardTilt>
        </div>

        {/* Triple Ecosystem Chapters Strip */}
        <div className="mb-14 reveal-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4285f4]/40" />
            <span className="text-xs font-mono font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-[#4285f4]/15 text-[#4285f4] border border-[#4285f4]/40">
              ✦ Core Organizing Chapters & Initiatives ✦
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4285f4]/40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Women Techmakers */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${
              isDark ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#4285f4]/40" : "bg-white border-gray-200 hover:border-blue-300 shadow-md"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4285f4]/15 text-[#4285f4] border border-[#4285f4]/30">
                  Diversity & Leadership
                </span>
                <span className="text-xs text-gray-400 font-mono">Central India</span>
              </div>
              <div className="h-20 flex items-center justify-center py-2">
                <img
                  src="/images/WTM_ Horizontal.png"
                  alt="Women Techmakers Indore"
                  className="max-h-12 w-auto object-contain filter group-hover:scale-105 transition-transform"
                />
              </div>
              <p className={`text-xs mt-3 text-center leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                Empowering women in technology through visibility, community mentorship, and leadership stages.
              </p>
            </div>

            {/* GDG Cloud Indore */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${
              isDark ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#ea4335]/40" : "bg-white border-gray-200 hover:border-red-300 shadow-md"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ea4335]/15 text-[#ea4335] border border-[#ea4335]/30">
                  Cloud & Infrastructure
                </span>
                <span className="text-xs text-gray-400 font-mono">Dev Community</span>
              </div>
              <div className="h-20 flex items-center justify-center py-2">
                <img
                  src="/images/gdg cloud indore logo.jpg"
                  alt="GDG Cloud Indore"
                  className="max-h-14 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <p className={`text-xs mt-3 text-center leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                Fostering cloud architecture, Kubernetes mastery, and enterprise Google Cloud deployments.
              </p>
            </div>

            {/* ML Indore */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${
              isDark ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#f9ab00]/40" : "bg-white border-gray-200 hover:border-amber-300 shadow-md"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f9ab00]/15 text-[#f9ab00] border border-[#f9ab00]/30">
                  AI & Research Chapter
                </span>
                <span className="text-xs text-gray-400 font-mono">Open Source</span>
              </div>
              <div className="h-20 flex items-center justify-center py-2">
                <img
                  src="/images/mlindore.png"
                  alt="Machine Learning Indore"
                  className="max-h-14 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <p className={`text-xs mt-3 text-center leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                Driving hands-on neural network research, computer vision, LLM architectures, and data science sprints.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Multi-Category Partner Showcase (Tabs) */}
        <div className="mb-14 reveal-on-scroll">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285f4] block mb-1">
                COALITIONS // PAST & CURRENT
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                Trusted by 40+ Industry & Media Collaborators
              </h3>
            </div>

            {/* Category Toggle Tabs */}
            <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 ${
              isDark ? "bg-[#0d0d0d] border-white/15" : "bg-gray-100 border-gray-300"
            }`}>
              <button
                onClick={() => setActivePartnerTab("sponsors")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePartnerTab === "sponsors"
                    ? "bg-[#4285f4] text-white shadow-sm"
                    : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                }`}
              >
                Past Sponsors ({PAST_SPONSORS_FEATURED.length})
              </button>
              <button
                onClick={() => setActivePartnerTab("media")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePartnerTab === "media"
                    ? "bg-[#4285f4] text-white shadow-sm"
                    : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                }`}
              >
                Media Partners ({PAST_MEDIA_PARTNERS.length})
              </button>
              <button
                onClick={() => setActivePartnerTab("community")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePartnerTab === "community"
                    ? "bg-[#4285f4] text-white shadow-sm"
                    : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                }`}
              >
                Community Partners ({COMMUNITY_PARTNERS.length})
              </button>
            </div>
          </div>

          {/* TAB 1: PAST SPONSORS CARDS + HIGH-RES GRID */}
          {activePartnerTab === "sponsors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {PAST_SPONSORS_FEATURED.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col justify-between transition-all hover:scale-105 ${
                      isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#4285f4] uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h4>
                    </div>
                    <span className={`text-[11px] font-medium mt-3 px-2 py-0.5 rounded-lg border inline-block w-fit ${
                      isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}>
                      {item.tier}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified High-Resolution Visual Brand Grid from Official Deck */}
              <div className={`p-4 sm:p-6 rounded-3xl border overflow-hidden ${
                isDark ? "bg-[#0d0d0d] border-white/10" : "bg-white border-gray-200/90 shadow-md"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                    Official Sponsor Brand Roster (DevFest Indore Series)
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285f4] font-bold border border-blue-200">
                    Verified Deck Roster
                  </span>
                </div>
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[32/11] rounded-2xl overflow-hidden bg-white p-2">
                  <Image
                    src="/images/deck_logos/past_sponsors_grid.png"
                    alt="GDG DevFest Indore Past Sponsors Grid"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAST MEDIA PARTNERS */}
          {activePartnerTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {PAST_MEDIA_PARTNERS.map((media, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all hover:scale-105 ${
                      isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
                    }`}
                  >
                    <Tv className="w-4 h-4 text-[#ea4335] mb-2" />
                    <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      {media.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#ea4335] font-semibold block mt-0.5">
                      {media.type}
                    </span>
                    <span className={`text-[10px] block mt-2 ${isDark ? "text-white/60" : "text-gray-500"}`}>
                      {media.scope}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visual Media Strip */}
              <div className={`p-4 sm:p-6 rounded-3xl border overflow-hidden ${
                isDark ? "bg-[#0d0d0d] border-white/10" : "bg-white border-gray-200/90 shadow-md"
              }`}>
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[32/11] rounded-2xl overflow-hidden bg-white p-2">
                  <Image
                    src="/images/deck_logos/past_media_grid.png"
                    alt="GDG DevFest Indore Media Partners Grid"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY & COLLEGE ALLIANCES */}
          {activePartnerTab === "community" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {COMMUNITY_PARTNERS.map((cp, idx) => (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 transition-all hover:scale-102 ${
                      isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {cp.name}
                      </h4>
                      <p className={`text-xs mt-1 leading-snug ${isDark ? "text-white/70" : "text-gray-600"}`}>
                        {cp.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Community Grid */}
              <div className={`p-4 sm:p-6 rounded-3xl border overflow-hidden ${
                isDark ? "bg-[#0d0d0d] border-white/10" : "bg-white border-gray-200/90 shadow-md"
              }`}>
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[32/11] rounded-2xl overflow-hidden bg-white p-2">
                  <Image
                    src="/images/deck_logos/community_partners_grid.png"
                    alt="GDG DevFest Indore Community Partners Grid"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sponsor Callout & Download Deck Box */}
        <CardTilt
          className={`p-6 sm:p-8 rounded-3xl google-card-shadow flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll border ${
            isDark ? "bg-[#f9ab00]/8 border-[#f9ab00]/25" : "bg-amber-50/70 border-amber-200/80 shadow-md"
          }`}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#f9ab00] text-black text-xs font-black uppercase tracking-wider mb-2">
              Partnerships Open
            </span>
            <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Partner with DevFest Indore 2026
            </h3>
            <p className={`text-sm font-normal leading-relaxed max-w-xl mt-1.5 ${isDark ? "text-white/85" : "text-gray-700"}`}>
              Connect directly with 1,500+ developers, tech founders, and AI practitioners. Bespoke Platinum, Gold, Silver, and Community track packages are available upon request.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:organizers@gdgindore.in?subject=DevFest%20Indore%202026%20Sponsorship%20Inquiry"
              className="px-6 py-3 rounded-2xl bg-[#4285f4] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#3367d6] hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Organizers</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1bjqfMjXgin7pjslttbJmnryaoioAkHFG/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className={`px-6 py-3 rounded-2xl text-xs sm:text-[13px] font-bold uppercase tracking-wider border google-pill-shadow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer ${
                isDark ? "bg-white/5 text-white border-white/20 hover:bg-white/10" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download Sponsor Deck</span>
            </a>
          </div>
        </CardTilt>
      </div>
    </section>
  );
}
