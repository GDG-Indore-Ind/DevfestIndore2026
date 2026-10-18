"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Handshake,
  Download,
  Mail,
  Sparkles,
  Tv,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";
import {
  GoogleCloudLogo,
  FlutterLogo,
  JetBrainsLogo,
  GitHubLogo,
  FirebaseLogo,
  AndroidLogo,
  TensorFlowLogo,
  DiasparkLogo,
  QuillBotLogo,
  MSILogo,
  GenieTalkLogo,
  SoftudeLogo,
  ProtonsHubLogo,
  GraffersIDLogo,
  CodingBlocksLogo,
} from "./TechLogos";
import { PartnerItem, INITIAL_PARTNERS } from "@/data/partnersData";
import { getPartners, subscribeToPartners } from "@/lib/firestoreService";

// Key Noteworthy Statistics from Sponsorship Deck (Page 8)
const DECK_STATISTICS = [
  { value: "1,500+", label: "DevFest Footfall", sub: "Engineers & leaders", color: "text-[#4285f4]" },
  { value: "10,000+", label: "Social Reach", sub: "Digital tech audience", color: "text-[#ea4335]" },
  { value: "12,000+", label: "Attendees Served", sub: "Across community years", color: "text-[#f9ab00]" },
  { value: "100+", label: "Distinguished Speakers", sub: "GDEs, founders & architects", color: "text-[#34a853]" },
  { value: "40+", label: "Corporate Collaborations", sub: "Enterprises & tech brands", color: "text-[#4285f4]" },
  { value: "300+", label: "Technical Meetups", sub: "Hands-on workshops & summits", color: "text-[#ea4335]" },
];

// Curated Past Sponsors with Authentic Logos
const PAST_SPONSORS_FEATURED = [
  { name: "Google for Developers", category: "Global Tech", tier: "Title Partner", Logo: GoogleCloudLogo },
  { name: "FlutterFlow", category: "Low-Code AI", tier: "Gold Partner", Logo: FlutterLogo },
  { name: "JetBrains", category: "Dev Tools", tier: "Developer Ecosystem", Logo: JetBrainsLogo },
  { name: "GitHub", category: "DevOps & Open Source", tier: "Global Partner", Logo: GitHubLogo },
  { name: "Firebase", category: "App Development", tier: "Cloud Partner", Logo: FirebaseLogo },
  { name: "Android", category: "Mobile OS", tier: "Platform Partner", Logo: AndroidLogo },
  { name: "TensorFlow", category: "Machine Learning", tier: "AI Partner", Logo: TensorFlowLogo },
  { name: "Diaspark", category: "Enterprise IT", tier: "Corporate Partner" },
  { name: "QuillBot", category: "AI & Productivity", tier: "AI Innovation" },
  { name: "MSI", category: "Hardware & Compute", tier: "Hardware Partner" },
  { name: "GenieTalk.ai", category: "Conversational AI", tier: "AI Partner" },
  { name: "Softude (Systematix)", category: "Cloud & Digital", tier: "Enterprise Partner" },
  { name: "ProtonsHub", category: "Tech Labs", tier: "Ecosystem Partner" },
  { name: "GraffersID", category: "Product Dev", tier: "Startup Partner" },
  { name: "Coding Blocks", category: "EdTech", tier: "Learning Partner" },
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
  const [partners, setPartners] = useState<PartnerItem[]>(INITIAL_PARTNERS);

  useEffect(() => {
    const unsub = subscribeToPartners((items) => {
      if (items && items.length > 0) setPartners(items);
    });
    return () => unsub();
  }, []);

  const sponsorsList = partners.filter((p) => p.type === "sponsor");
  const mediaList = partners.filter((p) => p.type === "media");
  const communityList = partners.filter((p) => p.type === "community");

  // Helper to match built-in vector logos if logoUrl isn't provided
  const getBuiltinLogo = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("google")) return GoogleCloudLogo;
    if (lower.includes("flutter")) return FlutterLogo;
    if (lower.includes("jetbrains")) return JetBrainsLogo;
    if (lower.includes("github")) return GitHubLogo;
    if (lower.includes("firebase")) return FirebaseLogo;
    if (lower.includes("android")) return AndroidLogo;
    if (lower.includes("tensorflow")) return TensorFlowLogo;
    if (lower.includes("diaspark")) return DiasparkLogo;
    if (lower.includes("quillbot")) return QuillBotLogo;
    if (lower.includes("msi")) return MSILogo;
    if (lower.includes("genie")) return GenieTalkLogo;
    if (lower.includes("softude") || lower.includes("systematix")) return SoftudeLogo;
    if (lower.includes("protons")) return ProtonsHubLogo;
    if (lower.includes("graffers")) return GraffersIDLogo;
    if (lower.includes("coding blocks")) return CodingBlocksLogo;
    return null;
  };

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

        {/* Noteworthy Statistics Grid */}
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
              className={`max-w-md mx-auto py-5 px-8 rounded-2xl google-pill-shadow mb-4 hover:scale-105 transition-transform border flex items-center justify-center ${
                isDark ? "bg-[#0d0d0d] border-white/10" : "bg-gray-50 border-gray-200"
              }`}
            >
              <img
                src="/images/google-for-developers.png"
                alt="Google for Developers"
                className="h-14 sm:h-16 w-auto max-w-full object-contain filter drop-shadow-md"
              />
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
            <div className="flex flex-wrap items-center gap-2">
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
                  Sponsors ({sponsorsList.length})
                </button>
                <button
                  onClick={() => setActivePartnerTab("media")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePartnerTab === "media"
                      ? "bg-[#4285f4] text-white shadow-sm"
                      : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                  }`}
                >
                  Media ({mediaList.length})
                </button>
                <button
                  onClick={() => setActivePartnerTab("community")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePartnerTab === "community"
                      ? "bg-[#4285f4] text-white shadow-sm"
                      : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                  }`}
                >
                  Community ({communityList.length})
                </button>
              </div>
            </div>
          </div>

          {/* TAB 1: SPONSORS WITH PROMINENT LOGOS + HIGH IMPACT CARDS */}
          {activePartnerTab === "sponsors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                {sponsorsList.map((item) => {
                  const BuiltinLogo = getBuiltinLogo(item.name);
                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                        isDark
                          ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#4285f4]/50 hover:shadow-[0_0_25px_rgba(66,133,244,0.18)]"
                          : "bg-white border-gray-200/90 shadow-sm hover:border-[#4285f4]/60 hover:shadow-lg"
                      }`}
                    >
                      {/* Subtle Ambient Glow Behind Logo */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#4285f4]/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

                      <div>
                        {/* Top Metadata: Category & External Link */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono font-bold text-[#4285f4] uppercase tracking-wider truncate max-w-[130px]">
                            {item.category}
                          </span>
                          {item.websiteUrl && (
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-[#4285f4] transition-colors p-1 rounded-md hover:bg-white/5"
                              title={`Visit ${item.name}`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Heroic Logo Display Area */}
                        <div
                          className={`w-full h-24 sm:h-28 rounded-2xl border flex items-center justify-center p-3 mb-4 transition-all duration-300 group-hover:scale-105 ${
                            isDark
                              ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/10 shadow-inner"
                              : "bg-gradient-to-b from-gray-50 to-gray-100/60 border-gray-200/80 shadow-inner"
                          }`}
                        >
                          {item.logoUrl ? (
                            <img
                              src={item.logoUrl}
                              alt={item.name}
                              className="max-h-16 max-w-[85%] w-auto object-contain drop-shadow"
                            />
                          ) : BuiltinLogo ? (
                            <BuiltinLogo className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow" />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-[#4285f4]/15 border border-[#4285f4]/30 flex items-center justify-center">
                              <span className="text-[#4285f4] text-2xl font-black">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Sponsor Name */}
                        <h4 className={`text-base sm:text-lg font-black text-center tracking-tight leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Tier Pill */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
                        <span className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border text-center truncate max-w-full tracking-wide ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white/80"
                            : "bg-gray-100 border-gray-200 text-gray-700"
                        }`}>
                          {item.tier || "Ecosystem Partner"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA PARTNERS WITH ENLARGED LOGOS */}
          {activePartnerTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {mediaList.map((media) => (
                  <div
                    key={media.id}
                    className={`p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group overflow-hidden ${
                      isDark
                        ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#ea4335]/50 hover:shadow-[0_0_25px_rgba(234,67,53,0.18)]"
                        : "bg-white border-gray-200/90 shadow-sm hover:border-[#ea4335]/60 hover:shadow-lg"
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-[#ea4335]">
                          <Tv className="w-4 h-4" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            Media Voice
                          </span>
                        </div>
                        {media.websiteUrl && (
                          <a
                            href={media.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[#ea4335] transition-colors p-1"
                            title={`Visit ${media.name}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Prominent Media Logo / Identity Stage */}
                      <div
                        className={`w-full h-20 sm:h-24 rounded-2xl border flex items-center justify-center p-3 mb-3.5 transition-all duration-300 group-hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/10"
                            : "bg-gradient-to-b from-gray-50 to-gray-100/60 border-gray-200/80"
                        }`}
                      >
                        {media.logoUrl ? (
                          <img
                            src={media.logoUrl}
                            alt={media.name}
                            className="max-h-14 max-w-[85%] w-auto object-contain drop-shadow"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-[#ea4335]/15 border border-[#ea4335]/30 flex items-center justify-center">
                            <span className="text-[#ea4335] text-xl font-black">
                              {media.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <h4 className={`text-base font-black text-center ${isDark ? "text-white" : "text-gray-900"}`}>
                        {media.name}
                      </h4>
                      <span className="text-xs font-mono text-[#ea4335] font-semibold block text-center mt-1">
                        {media.category || "Media Partner"}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 text-center">
                      <span className={`text-[11px] block truncate ${isDark ? "text-white/60" : "text-gray-500"}`}>
                        {media.scope || "Regional Coverage"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY & COLLEGE ALLIANCES WITH PROMINENT LOGOS */}
          {activePartnerTab === "community" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {communityList.map((cp) => (
                  <div
                    key={cp.id}
                    className={`p-5 rounded-3xl border flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${
                      isDark
                        ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#34a853]/50 hover:shadow-[0_0_25px_rgba(52,168,83,0.18)]"
                        : "bg-white border-gray-200/90 shadow-sm hover:border-[#34a853]/60 hover:shadow-lg"
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-[#34a853]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            Alliance
                          </span>
                        </div>
                        {cp.websiteUrl && (
                          <a
                            href={cp.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[#34a853] transition-colors p-1"
                            title={`Visit ${cp.name}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Prominent Logo Area */}
                      <div
                        className={`w-full h-20 sm:h-24 rounded-2xl border flex items-center justify-center p-3 mb-3.5 transition-all duration-300 group-hover:scale-105 ${
                          isDark
                            ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/10"
                            : "bg-gradient-to-b from-gray-50 to-gray-100/60 border-gray-200/80"
                        }`}
                      >
                        {cp.logoUrl ? (
                          <img
                            src={cp.logoUrl}
                            alt={cp.name}
                            className="max-h-14 max-w-[85%] w-auto object-contain drop-shadow"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-[#34a853]/15 border border-[#34a853]/30 flex items-center justify-center">
                            <span className="text-[#34a853] text-xl font-black">
                              {cp.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <h4 className={`text-base font-black text-center ${isDark ? "text-white" : "text-gray-900"}`}>
                        {cp.name}
                      </h4>
                      <p className={`text-xs mt-2 text-center leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
                        {cp.description || cp.category}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-center">
                      <span className={`text-[10px] font-mono font-medium ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        Developer Network Partner
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sponsor Callout & Download Deck Box */}

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
