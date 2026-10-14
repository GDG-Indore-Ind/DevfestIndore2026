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
} from "./TechLogos";
import { PartnerItem, INITIAL_PARTNERS } from "@/data/partnersData";
import { getPartners, savePartner, removePartner } from "@/lib/firestoreService";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Plus, Edit3, Trash2, X, Upload } from "lucide-react";

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

  // Edit/Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<"sponsor" | "media" | "community">("sponsor");
  const [formCategory, setFormCategory] = useState("");
  const [formTier, setFormTier] = useState("");
  const [formScope, setFormScope] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");
  const [formWebsiteUrl, setFormWebsiteUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    getPartners().then((res) => {
      if (res && res.length > 0) setPartners(res);
    });
  }, []);

  const sponsorsList = partners.filter((p) => p.type === "sponsor");
  const mediaList = partners.filter((p) => p.type === "media");
  const communityList = partners.filter((p) => p.type === "community");

  const openAddModal = (presetType?: "sponsor" | "media" | "community") => {
    const targetType = presetType || (activePartnerTab === "sponsors" ? "sponsor" : activePartnerTab);
    setEditingPartner(null);
    setFormName("");
    setFormType(targetType);
    setFormCategory(targetType === "media" ? "Digital Media" : targetType === "community" ? "Tech Community" : "Cloud & AI");
    setFormTier(targetType === "sponsor" ? "Ecosystem Partner" : "");
    setFormScope(targetType === "media" ? "Regional Coverage" : "");
    setFormDescription("");
    setFormLogoUrl("");
    setFormWebsiteUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: PartnerItem) => {
    setEditingPartner(p);
    setFormName(p.name);
    setFormType(p.type);
    setFormCategory(p.category || "");
    setFormTier(p.tier || "");
    setFormScope(p.scope || "");
    setFormDescription(p.description || "");
    setFormLogoUrl(p.logoUrl || "");
    setFormWebsiteUrl(p.websiteUrl || "");
    setIsModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const item: PartnerItem = {
      id: editingPartner ? editingPartner.id : `partner-${Date.now()}`,
      name: formName.trim(),
      type: formType,
      category: formCategory.trim() || undefined,
      tier: formTier.trim() || undefined,
      scope: formScope.trim() || undefined,
      description: formDescription.trim() || undefined,
      logoUrl: formLogoUrl.trim() || undefined,
      websiteUrl: formWebsiteUrl.trim() || undefined,
    };

    await savePartner(item);
    setPartners((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? item : p));
      }
      return [item, ...prev];
    });

    setStatusMsg("Partner updated successfully!");
    setTimeout(() => {
      setStatusMsg(null);
      setIsModalOpen(false);
    }, 1200);
  };

  const handleDeletePartner = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    await removePartner(id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

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

            {/* Category Toggle Tabs + Add Button */}
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

              <button
                onClick={() => openAddModal(activePartnerTab === "sponsors" ? "sponsor" : activePartnerTab)}
                className="px-3.5 py-2.5 rounded-2xl bg-[#34a853] hover:bg-[#2d9247] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Add Partner / Sponsor"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add {activePartnerTab === "sponsors" ? "Sponsor" : activePartnerTab === "media" ? "Media Partner" : "Community Partner"}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SPONSORS WITH VECTOR/UPLOADED LOGOS + CARDS */}
          {activePartnerTab === "sponsors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {sponsorsList.map((item) => {
                  const BuiltinLogo = getBuiltinLogo(item.name);
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between transition-all hover:scale-102 group relative ${
                        isDark ? "bg-[#0d0d0d]/80 border-white/10 hover:border-white/20" : "bg-white border-gray-200/90 shadow-sm hover:border-blue-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 min-h-[28px]">
                          <span className="text-[10px] font-mono font-bold text-[#4285f4] uppercase tracking-wider truncate mr-1">
                            {item.category}
                          </span>
                          {item.logoUrl ? (
                            <img
                              src={item.logoUrl}
                              alt={item.name}
                              className="max-w-[32px] max-h-[32px] object-contain group-hover:scale-110 transition-transform"
                            />
                          ) : BuiltinLogo ? (
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <BuiltinLogo className="w-5 h-5 object-contain" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-[#4285f4] text-xs font-bold flex items-center justify-center">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                          {item.name}
                        </h4>
                      </div>
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-lg border inline-block w-fit truncate max-w-[90px] ${
                          isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-gray-50 border-gray-200 text-gray-600"
                        }`}>
                          {item.tier}
                        </span>

                        <div className="flex items-center gap-1">
                          {item.websiteUrl && (
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-[#4285f4] transition-colors p-1"
                              title="Visit Website"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1 text-gray-400 hover:text-[#4285f4] transition-colors cursor-pointer"
                            title="Edit Sponsor Details"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeletePartner(item.id, item.name)}
                            className="p-1 text-gray-400 hover:text-[#ea4335] transition-colors cursor-pointer"
                            title="Delete Sponsor"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA PARTNERS */}
          {activePartnerTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {mediaList.map((media) => (
                  <div
                    key={media.id}
                    className={`p-4 rounded-2xl border transition-all hover:scale-102 flex flex-col justify-between group ${
                      isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Tv className="w-4 h-4 text-[#ea4335]" />
                        {media.logoUrl && (
                          <img src={media.logoUrl} alt={media.name} className="max-w-[28px] max-h-[28px] object-contain" />
                        )}
                      </div>
                      <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {media.name}
                      </h4>
                      <span className="text-[11px] font-mono text-[#ea4335] font-semibold block mt-0.5">
                        {media.category || "Media Partner"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                      <span className={`text-[10px] block truncate max-w-[110px] ${isDark ? "text-white/60" : "text-gray-500"}`}>
                        {media.scope || "Regional Coverage"}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(media)}
                          className="p-1 text-gray-400 hover:text-[#4285f4] transition-colors cursor-pointer"
                          title="Edit Media Partner"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeletePartner(media.id, media.name)}
                          className="p-1 text-gray-400 hover:text-[#ea4335] transition-colors cursor-pointer"
                          title="Delete Media Partner"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY & COLLEGE ALLIANCES */}
          {activePartnerTab === "community" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {communityList.map((cp) => (
                  <div
                    key={cp.id}
                    className={`p-4 sm:p-5 rounded-2xl border flex items-start justify-between gap-3 transition-all hover:scale-102 group ${
                      isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle2 className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm sm:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                            {cp.name}
                          </h4>
                          {cp.logoUrl && (
                            <img src={cp.logoUrl} alt={cp.name} className="max-w-[28px] max-h-[28px] object-contain ml-2" />
                          )}
                        </div>
                        <p className={`text-xs mt-1 leading-snug ${isDark ? "text-white/70" : "text-gray-600"}`}>
                          {cp.description || cp.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      <button
                        onClick={() => openEditModal(cp)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#4285f4] hover:bg-white/5 transition-colors cursor-pointer"
                        title="Edit Community Partner"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePartner(cp.id, cp.name)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#ea4335] hover:bg-white/5 transition-colors cursor-pointer"
                        title="Delete Community Partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add / Edit Partner with Logo Uploader */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-[#111111] border-white/15 text-white" : "bg-white border-gray-200 text-gray-900"
            }`}>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-[#4285f4]" />
                  <h3 className="text-lg font-black">
                    {editingPartner ? "Edit Partner Details" : "Add New Partner / Sponsor"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {statusMsg && (
                <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold text-center">
                  {statusMsg}
                </div>
              )}

              <form onSubmit={handleSavePartner} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Partner Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. JetBrains, FlutterFlow"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Partner Type *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                    >
                      <option value="sponsor" className="text-black">Sponsor & Tech Titan</option>
                      <option value="media" className="text-black">Media Partner</option>
                      <option value="community" className="text-black">Community & College</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Category / Domain</label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. Cloud & AI, DevOps, Print & Digital"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">
                      {formType === "sponsor" ? "Tier Badge" : formType === "media" ? "Coverage Scope" : "Role"}
                    </label>
                    <input
                      type="text"
                      value={formType === "sponsor" ? formTier : formScope}
                      onChange={(e) => formType === "sponsor" ? setFormTier(e.target.value) : setFormScope(e.target.value)}
                      placeholder={formType === "sponsor" ? "e.g. Gold Partner, Ecosystem" : "e.g. Statewide Daily"}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">Description / Focus</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Short description of partnership or collaborative initiative..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                  />
                </div>

                {/* Logo Upload (Cloudinary) or Direct URL */}
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">Partner Logo (Direct Cloudinary Upload)</label>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-[#4285f4] text-xs font-bold cursor-pointer transition-colors border border-blue-500/30">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingLogo ? "Uploading..." : "Upload Logo PNG/SVG"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingLogo}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            setUploadingLogo(true);
                            const url = await uploadToCloudinary(file);
                            setFormLogoUrl(url);
                          } catch (err: any) {
                            alert(err.message || "Failed to upload logo");
                          } finally {
                            setUploadingLogo(false);
                          }
                        }}
                      />
                    </label>

                    {formLogoUrl && (
                      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                        <img src={formLogoUrl} alt="Preview" className="w-8 h-8 object-contain rounded" />
                        <span className="text-[10px] text-green-400 font-bold">Logo Ready</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    value={formLogoUrl}
                    onChange={(e) => setFormLogoUrl(e.target.value)}
                    placeholder="Or enter logo URL directly (https://...)"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">Website Link</label>
                  <input
                    type="url"
                    value={formWebsiteUrl}
                    onChange={(e) => setFormWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/15 bg-transparent text-xs"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] hover:bg-[#3367d6] text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {editingPartner ? "Update Partner" : "Save Partner"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
