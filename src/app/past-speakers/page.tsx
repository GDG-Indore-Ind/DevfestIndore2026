"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Layers,
  GraduationCap,
  Briefcase,
  X,
  Share2
} from "lucide-react";
import { PastSpeaker } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { getPastSpeakers } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import {
  TwitterIcon,
  LinkedInIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
  GlobeIcon,
  BookOpenIcon,
} from "@/components/SocialIcons";

export default function PastSpeakersPage() {
  const { isDark } = useTheme();
  const [speakers, setSpeakers] = useState<PastSpeaker[]>(DEV_FEST_PAST_SPEAKERS_FULL);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [activeModalSpeaker, setActiveModalSpeaker] = useState<PastSpeaker | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getPastSpeakers().then((res) => {
      if (res && res.length > 0) {
        setSpeakers(res);
      }
    });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tracks = useMemo(() => {
    const set = new Set<string>();
    speakers.forEach((s) => {
      if (s.track) set.add(s.track);
      else if (s.category) set.add(s.category);
    });
    return ["All", ...Array.from(set)];
  }, [speakers]);

  const years = ["All", "2025", "2024", "2023", "2022"];

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((sp) => {
      // Year filter
      if (selectedYear !== "All" && sp.year !== selectedYear) return false;

      // Track filter
      if (selectedTrack !== "All") {
        const matchesTrack = sp.track === selectedTrack;
        const matchesCategory = sp.category === selectedTrack;
        if (!matchesTrack && !matchesCategory) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = sp.name.toLowerCase().includes(q);
        const inRole = sp.role.toLowerCase().includes(q);
        const inCompany = sp.company.toLowerCase().includes(q);
        const inTopic = sp.topic.toLowerCase().includes(q);
        const inDesc = sp.description?.toLowerCase().includes(q) || false;
        const inBio = sp.bio?.toLowerCase().includes(q) || false;
        if (!inName && !inRole && !inCompany && !inTopic && !inDesc && !inBio) {
          return false;
        }
      }

      return true;
    });
  }, [speakers, selectedYear, selectedTrack, searchQuery]);

  // Badge Color Helper
  const getBadgeStyle = (badge: string) => {
    if (badge.includes("Google Developer Expert") || badge.includes("GDE")) {
      return "bg-[#4285f4]/10 text-[#4285f4] border-[#4285f4]/30";
    }
    if (badge.includes("Founder") || badge.includes("Executive")) {
      return "bg-[#ea4335]/10 text-[#ea4335] border-[#ea4335]/30";
    }
    if (badge.includes("Engineering") || badge.includes("Leader")) {
      return "bg-[#34a853]/10 text-[#34a853] border-[#34a853]/30";
    }
    return "bg-[#f9ab00]/10 text-[#f9ab00] border-[#f9ab00]/30";
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? "bg-[#000000] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
      }`}
    >
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-4xl mx-auto mb-14">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm mb-5 border ${
                isDark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white border-gray-200 text-[#1e1e1e]"
              }`}
            >
              <Award className="w-4 h-4 text-[#f9ab00]" />
              <span className="tracking-wide uppercase">GDG DevFest Alumni & Hall of Fame</span>
            </div>

            <h1
              className={`text-4xl sm:text-6xl font-black tracking-tight mb-5 ${
                isDark ? "text-white" : "text-[#1e1e1e]"
              }`}
            >
              Featured Keynotes & Speakers
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
                isDark ? "text-white/80" : "text-[#5f6368]"
              }`}
            >
              Explore the visionary leaders, Google Developer Experts, aerospace architects, and tech innovators who have headlined the DevFest Indore mainstage.
            </p>
          </div>

          {/* Interactive Search & Filter Toolbar */}
          <div
            className={`p-5 sm:p-6 rounded-3xl mb-12 border shadow-lg backdrop-blur-md ${
              isDark
                ? "bg-[#0d0d0d]/90 border-white/10"
                : "bg-white/95 border-gray-200/90"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search input */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by speaker, topic, company, or technology..."
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium border outline-none transition-all ${
                    isDark
                      ? "bg-white/5 border-white/15 text-white placeholder-white/40 focus:border-[#4285f4] focus:bg-white/10"
                      : "bg-gray-50 border-gray-200 text-[#1e1e1e] placeholder-gray-400 focus:border-[#4285f4] focus:bg-white"
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Year pills */}
              <div className="md:col-span-3 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold uppercase text-gray-400 mr-1 hidden sm:inline">Year:</span>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedYear === year
                        ? "bg-[#4285f4] text-white shadow-md scale-105"
                        : isDark
                        ? "bg-white/5 text-white/70 hover:bg-white/10"
                        : "bg-gray-100 text-[#5f6368] hover:bg-gray-200"
                    }`}
                  >
                    {year === "All" ? "All Years" : year}
                  </button>
                ))}
              </div>

              {/* Track filter */}
              <div className="md:col-span-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold border outline-none cursor-pointer ${
                    isDark
                      ? "bg-[#141414] border-white/15 text-white"
                      : "bg-gray-50 border-gray-200 text-[#1e1e1e]"
                  }`}
                >
                  <option value="All">All Tracks & Domains ({speakers.length})</option>
                  {tracks
                    .filter((t) => t !== "All")
                    .map((track) => (
                      <option key={track} value={track}>
                        Track: {track}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Results counter */}
            <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between text-xs text-gray-400 border-gray-200 dark:border-white/10">
              <div>
                Showing <strong className="text-[#4285f4]">{filteredSpeakers.length}</strong> of{" "}
                <strong>{speakers.length}</strong> accepted & past speakers
              </div>
              {(searchQuery || selectedTrack !== "All" || selectedYear !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTrack("All");
                    setSelectedYear("All");
                  }}
                  className="text-xs text-[#ea4335] hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Speakers Detailed Grid (Larger, High-Profile Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpeakers.map((sp) => {
              const isExpanded = !!expandedCards[sp.id];
              const hasLongDesc = (sp.description?.length || 0) > 160;

              return (
                <div
                  key={sp.id}
                  className={`rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-2xl ${
                    isDark
                      ? "bg-[#0d0d0d] border-white/10 hover:border-[#4285f4]/50 hover:-translate-y-1"
                      : "bg-white border-gray-200 hover:border-[#4285f4] hover:-translate-y-1 shadow-sm"
                  }`}
                >
                  {/* Card Top: Avatar + Badges + Identity */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Avatar Image with High-Res Frame */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-white/10 shadow-md bg-gray-100 dark:bg-zinc-900">
                        <img
                          src={sp.avatar}
                          alt={sp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-black text-white tracking-wide">
                          {sp.year}
                        </span>
                      </div>

                      {/* Header details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wider ${getBadgeStyle(
                              sp.spotlightBadge
                            )}`}
                          >
                            {sp.spotlightBadge}
                          </span>
                          {sp.track && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                              {sp.track}
                            </span>
                          )}
                        </div>

                        <h3
                          className={`text-xl font-black leading-tight tracking-tight mb-1 truncate ${
                            isDark ? "text-white" : "text-[#1e1e1e]"
                          }`}
                          title={sp.name}
                        >
                          {sp.name}
                        </h3>

                        <div className="text-xs font-bold text-[#4285f4] line-clamp-1 mb-1" title={sp.role}>
                          {sp.role}
                        </div>

                        <div
                          className={`text-[12px] font-semibold flex items-center gap-1.5 ${
                            isDark ? "text-white/60" : "text-[#5f6368]"
                          }`}
                        >
                          <Briefcase className="w-3.5 h-3.5 text-[#34a853] shrink-0" />
                          <span className="truncate">{sp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Talk Section Box */}
                    <div
                      className={`p-4 rounded-2xl border transition-colors mb-4 ${
                        isDark
                          ? "bg-white/[0.03] border-white/10 group-hover:border-white/20"
                          : "bg-gray-50/80 border-gray-200 group-hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#ea4335] mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#ea4335]" />
                        <span>Accepted Keynote / Session</span>
                      </div>

                      <h4
                        className={`text-sm font-bold leading-snug mb-2 ${
                          isDark ? "text-white" : "text-[#1e1e1e]"
                        }`}
                      >
                        "{sp.topic}"
                      </h4>

                      {sp.description && (
                        <div className="text-xs leading-relaxed text-gray-400 dark:text-white/70">
                          <p className={isExpanded ? "" : "line-clamp-3"}>
                            {sp.description}
                          </p>
                          {hasLongDesc && (
                            <button
                              onClick={() => toggleExpand(sp.id)}
                              className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-[#4285f4] hover:underline cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  Show Less <ChevronUp className="w-3 h-3" />
                                </>
                              ) : (
                                <>
                                  Read Full Abstract <ChevronDown className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Speaker Bio Teaser if Available */}
                    {sp.bio && sp.bio !== sp.role && (
                      <div
                        className={`text-[11px] italic leading-relaxed px-1 mb-3 line-clamp-2 ${
                          isDark ? "text-white/50" : "text-gray-500"
                        }`}
                      >
                        "{sp.bio}"
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Social Media Links + Modal Launcher */}
                  <div
                    className={`p-4 sm:px-6 border-t flex items-center justify-between gap-2 ${
                      isDark ? "border-white/10 bg-white/[0.01]" : "border-gray-100 bg-gray-50/50"
                    }`}
                  >
                    {/* Social Media Channels */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {sp.socials?.linkedin && (
                        <a
                          href={sp.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-500/10 text-[#4285f4] hover:bg-[#4285f4] hover:text-white transition-all shadow-sm"
                          title="LinkedIn Profile"
                          aria-label={`${sp.name} LinkedIn`}
                        >
                          <LinkedInIcon className="w-4 h-4 fill-current" />
                        </a>
                      )}

                      {sp.socials?.twitter && (
                        <a
                          href={sp.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-500/10 text-gray-700 dark:text-gray-200 hover:bg-black hover:text-white transition-all shadow-sm"
                          title="Twitter / X"
                          aria-label={`${sp.name} Twitter`}
                        >
                          <TwitterIcon className="w-4 h-4 fill-current" />
                        </a>
                      )}

                      {sp.socials?.website && (
                        <a
                          href={sp.socials.website}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-500/10 text-[#34a853] hover:bg-[#34a853] hover:text-white transition-all shadow-sm"
                          title="Official Website / Company"
                          aria-label={`${sp.name} Website`}
                        >
                          <GlobeIcon className="w-4 h-4" />
                        </a>
                      )}

                      {sp.socials?.blog && (
                        <a
                          href={sp.socials.blog}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500/10 text-[#f9ab00] hover:bg-[#f9ab00] hover:text-white transition-all shadow-sm"
                          title="Technical Blog / Articles"
                          aria-label={`${sp.name} Blog`}
                        >
                          <BookOpenIcon className="w-4 h-4" />
                        </a>
                      )}

                      {sp.socials?.email && (
                        <a
                          href={sp.socials.email}
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-500/10 text-[#ea4335] hover:bg-[#ea4335] hover:text-white transition-all shadow-sm"
                          title="Contact Speaker"
                          aria-label={`${sp.name} Email`}
                        >
                          <MailIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* View Full Profile Modal Button */}
                    <button
                      onClick={() => setActiveModalSpeaker(sp)}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? "bg-white/5 border-white/15 text-white hover:bg-white/10"
                          : "bg-white border-gray-200 text-[#1e1e1e] hover:border-gray-400"
                      }`}
                    >
                      <span>Full Bio</span>
                      <ExternalLink className="w-3 h-3 text-[#4285f4]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSpeakers.length === 0 && (
            <div className="text-center py-24">
              <p className="text-lg text-gray-400 mb-4">
                No speakers found matching your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTrack("All");
                  setSelectedYear("All");
                }}
                className="px-6 py-2.5 rounded-full bg-[#4285f4] text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Bottom Call to Action for CFP */}
          <div
            className={`mt-20 p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-b from-[#0d0d0d] to-black border-white/10"
                : "bg-gradient-to-b from-white to-gray-50 border-gray-200 shadow-xl"
            }`}
          >
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#34a853]/10 text-[#34a853] border border-[#34a853]/30 inline-block mb-3">
                Join the Hall of Fame
              </span>
              <h2
                className={`text-2xl sm:text-4xl font-black mb-3 ${
                  isDark ? "text-white" : "text-[#1e1e1e]"
                }`}
              >
                Want to Speak at DevFest Indore 2026?
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                Our Call for Proposals is open on Sessionize. Share your work in Space Tech, Agentic AI, Robotics, Flutter, Cloud, or Enterprise Scaling with over 1,500 engineers.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://sessionize.com/devfest-indore-2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#4285f4] hover:bg-[#3367d6] text-white text-xs font-black tracking-wide uppercase shadow-lg transition-transform hover:scale-105"
                >
                  Submit Proposal on Sessionize
                </a>
                <Link
                  href="/team"
                  className={`px-6 py-3 rounded-full text-xs font-black tracking-wide uppercase border transition-all ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-gray-300 text-[#1e1e1e] hover:bg-gray-100"
                  }`}
                >
                  Meet Organizing Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Speaker Full Profile Modal */}
      {activeModalSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalSpeaker(null)}
        >
          <div
            className={`max-w-2xl w-full rounded-3xl border shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-[#111111] border-white/20 text-white" : "bg-white border-gray-200 text-[#1e1e1e]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={activeModalSpeaker.avatar}
                  alt={activeModalSpeaker.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#4285f4]"
                />
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border mb-1.5 ${getBadgeStyle(
                      activeModalSpeaker.spotlightBadge
                    )}`}
                  >
                    {activeModalSpeaker.spotlightBadge}
                  </span>
                  <h3 className="text-2xl font-black">{activeModalSpeaker.name}</h3>
                  <div className="text-xs font-bold text-[#4285f4]">{activeModalSpeaker.role}</div>
                  <div className="text-xs text-gray-400 font-semibold">{activeModalSpeaker.company}</div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalSpeaker(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Session Abstract */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <div className="text-[11px] font-black uppercase text-[#ea4335] mb-1">
                Accepted Talk:
              </div>
              <h4 className="text-base font-bold mb-2">"{activeModalSpeaker.topic}"</h4>
              {activeModalSpeaker.description && (
                <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {activeModalSpeaker.description}
                </p>
              )}
            </div>

            {/* Speaker Bio */}
            {activeModalSpeaker.bio && (
              <div className="mb-6">
                <h5 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                  About the Speaker
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {activeModalSpeaker.bio}
                </p>
              </div>
            )}

            {/* Links and Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                {activeModalSpeaker.socials?.linkedin && (
                  <a
                    href={activeModalSpeaker.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-blue-500/10 text-[#4285f4] hover:bg-[#4285f4] hover:text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {activeModalSpeaker.socials?.twitter && (
                  <a
                    href={activeModalSpeaker.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-black hover:text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 fill-current" />
                    <span>X</span>
                  </a>
                )}
                {activeModalSpeaker.socials?.website && (
                  <a
                    href={activeModalSpeaker.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/10 text-[#34a853] hover:bg-[#34a853] hover:text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <GlobeIcon className="w-3.5 h-3.5" />
                    <span>Website</span>
                  </a>
                )}
                {activeModalSpeaker.socials?.blog && (
                  <a
                    href={activeModalSpeaker.socials.blog}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-amber-500/10 text-[#f9ab00] hover:bg-[#f9ab00] hover:text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <BookOpenIcon className="w-3.5 h-3.5" />
                    <span>Blog</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveModalSpeaker(null)}
                className="px-5 py-2 rounded-xl bg-[#1e1e1e] dark:bg-white text-white dark:text-black text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
