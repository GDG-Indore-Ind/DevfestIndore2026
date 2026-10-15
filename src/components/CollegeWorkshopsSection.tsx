"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  School,
  FolderOpen,
  ArrowRight,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";
import { getWorkshops } from "@/lib/firestoreService";
import { useTheme } from "@/contexts/ThemeContext";

export default function CollegeWorkshopsSection() {
  const { isDark } = useTheme();
  const [workshops, setWorkshops] = useState<WorkshopItem[]>(INITIAL_WORKSHOPS);
  const [filterSpeaker, setFilterSpeaker] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal for previewing workshop photos
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  useEffect(() => {
    getWorkshops().then((res) => {
      if (res && res.length > 0) setWorkshops(res);
    });
  }, []);

  // Compute unique speakers
  const speakersList = Array.from(
    new Set(workshops.map((w) => w.speaker).filter(Boolean))
  );

  // Filtered workshops
  const filteredWorkshops = workshops.filter((w) => {
    const matchesSpeaker = filterSpeaker === "All" || w.speaker === filterSpeaker;
    const matchesSearch =
      searchQuery.trim() === "" ||
      w.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.topic && w.topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (w.collabNotice && w.collabNotice.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSpeaker && matchesSearch;
  });

  const handleOpenPhotoModal = (ws: WorkshopItem, idx: number = 0) => {
    setSelectedWorkshop(ws);
    setActivePhotoIdx(idx);
  };

  return (
    <section id="workshops" className="py-14 md:py-24 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 text-[#4285f4]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Campus Hands-on Masterclasses • Pre-DevFest 2026 Series
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Conducted Across 18+ Central India Campuses
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            Leading up to DevFest Indore 2026, our GDG community architects and technical experts conducted specialized hands-on codelabs, GenAI hacklabs, and cloud workshops across universities. Explore lecture recaps, live photos, and student chapters below.
          </p>

          {/* Quick Action to Pre-DevFest Gallery */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/gallery"
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#4285f4] text-white flex items-center gap-2 hover:bg-[#3367d6] shadow-sm hover:scale-105 transition-transform"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Explore Pre-DevFest Photo Gallery ↗</span>
            </Link>
          </div>
        </div>

        {/* Filter & Live Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono uppercase text-[#4285f4] font-black">
              Showing {filteredWorkshops.length} Workshops:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Speaker Filter Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={filterSpeaker}
                onChange={(e) => setFilterSpeaker(e.target.value)}
                className={`w-full sm:w-auto px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                  isDark ? "bg-[#0d0d0d] border-white/15 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All">All Speakers & Mentors ({speakersList.length})</option>
                {speakersList.map((spk) => (
                  <option key={spk} value={spk}>
                    Speaker: {spk}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Search Input */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border w-full sm:w-72 ${
              isDark ? "bg-[#0d0d0d] border-white/15" : "bg-white border-gray-300"
            }`}>
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college, topic, or speaker..."
                className="bg-transparent text-xs w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((ws) => {
            const images = ws.images && ws.images.length > 0 ? ws.images : ["/gallery/opt_DSCF7167.JPG"];
            const primaryImage = images[0];

            return (
              <div
                key={ws.id}
                className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                  isDark
                    ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#4285f4]/50 hover:shadow-[0_0_25px_rgba(66,133,244,0.15)]"
                    : "bg-white border-gray-200/90 shadow-sm hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <div>
                  {/* Visual Image Stage with Thumbnails Preview */}
                  <div className="relative h-48 w-full bg-black/40 overflow-hidden cursor-pointer" onClick={() => handleOpenPhotoModal(ws, 0)}>
                    <Image
                      src={primaryImage}
                      alt={ws.college}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Workshop Conducted</span>
                      </span>
                    </div>

                    {/* Multi-photo Counter / Click to view */}
                    {images.length > 1 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-md flex items-center gap-1 border border-white/20">
                          <ImageIcon className="w-3 h-3 text-[#4285f4]" />
                          <span>{images.length} Photos</span>
                        </span>
                      </div>
                    )}

                    {/* College Title & Logo Overlay on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                      {/* Prominent College Logo Crest */}
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-white/80 shadow-lg flex items-center justify-center shrink-0 overflow-hidden p-1">
                        {ws.collegeLogoUrl ? (
                          <img
                            src={ws.collegeLogoUrl}
                            alt={`${ws.college} Logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <School className="w-6 h-6 text-[#4285f4]" />
                        )}
                      </div>

                      <div className="truncate">
                        <div className="flex items-center gap-1.5 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span>Campus Chapter</span>
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-black leading-tight drop-shadow truncate">
                          {ws.college}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Photo Mini-Gallery Strip */}
                  {images.length > 1 && (
                    <div className="px-5 pt-3 pb-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => handleOpenPhotoModal(ws, i)}
                          className="relative w-12 h-10 rounded-lg overflow-hidden border border-white/20 hover:border-[#4285f4] shrink-0 transition-transform hover:scale-105 cursor-pointer"
                        >
                          <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="48px" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Details Body */}
                  <div className="p-5 space-y-3">
                    {/* College Crest & Speaker Header Bar */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 overflow-hidden ${
                          isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200 shadow-xs"
                        }`}>
                          {ws.collegeLogoUrl ? (
                            <img src={ws.collegeLogoUrl} alt="Logo" className="w-full h-full object-contain p-0.5" />
                          ) : (
                            <School className="w-4 h-4 text-[#4285f4]" />
                          )}
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#4285f4] uppercase tracking-wide truncate max-w-[150px]">
                          {ws.college.split("(")[0].trim()}
                        </span>
                      </div>

                      {ws.collegeLogoUrl && (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-[#4285f4] border border-blue-500/20 shrink-0">
                          Official Chapter
                        </span>
                      )}
                    </div>

                    {/* Speaker Bar */}
                    <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                      isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}>
                      <div className="w-7 h-7 rounded-full bg-[#34a853]/15 text-[#34a853] flex items-center justify-center font-bold text-xs shrink-0">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                          Speaker / Mentor
                        </span>
                        <span className={`text-xs font-black truncate block ${isDark ? "text-white" : "text-gray-900"}`}>
                          {ws.speaker}
                        </span>
                      </div>
                    </div>

                    {/* Lecture Topic */}
                    {ws.topic && (
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-[#4285f4] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#4285f4] font-black">
                            Lecture Topic
                          </div>
                          <h4 className={`text-xs font-bold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
                            {ws.topic}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Description or Collaboration notice */}
                    {ws.description && (
                      <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                        {ws.description}
                      </p>
                    )}

                    {ws.collabNotice && (
                      <div className={`p-2 rounded-lg text-[11px] font-mono italic ${
                        isDark ? "bg-white/[0.03] text-gray-400" : "bg-gray-50 text-gray-600"
                      }`}>
                        "{ws.collabNotice}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-2">
                    {/* Instagram Post Button */}
                    {ws.instagramUrl && (
                      <a
                        href={ws.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-pink-500/30"
                        title="View Instagram Post / Reel"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        <span>Instagram</span>
                      </a>
                    )}

                    {/* Google Drive Link */}
                    {ws.photosDrive && (
                      <a
                        href={ws.photosDrive}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 text-[#4285f4] hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-500/30"
                        title="View Google Drive Photos"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Drive</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenPhotoModal(ws, 0)}
                    className="text-xs font-bold text-[#4285f4] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Photos</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Linking to Gallery Page */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div>
            <div className="flex items-center gap-2 text-[#4285f4] text-xs font-mono font-bold uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Full Visual Archive</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Looking for All Pre-DevFest Workshop Photos?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? "text-white/70" : "text-gray-600"}`}>
              Browse the dedicated gallery page to see high-resolution photo highlights, codelab swarm sessions, and stage moments from all 18+ college activations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="px-6 py-3 rounded-2xl bg-[#4285f4] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3367d6] hover:scale-105 transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Open Pre-DevFest Gallery</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal for Full Photo Previews */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-[#111111] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative text-white">
            {/* Header with College Logo */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-white/20 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  {selectedWorkshop.collegeLogoUrl ? (
                    <img src={selectedWorkshop.collegeLogoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <School className="w-5 h-5 text-[#4285f4]" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#4285f4] uppercase font-bold block">
                    {selectedWorkshop.college}
                  </span>
                  <h4 className="text-base sm:text-lg font-black">
                    Speaker: {selectedWorkshop.speaker} {selectedWorkshop.topic ? `— ${selectedWorkshop.topic}` : ""}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Main Active Photo */}
            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-black flex items-center justify-center">
              {selectedWorkshop.images && selectedWorkshop.images.length > 0 && (
                <Image
                  src={selectedWorkshop.images[activePhotoIdx] || selectedWorkshop.images[0]}
                  alt="Workshop Photo"
                  fill
                  className="object-contain"
                />
              )}

              {/* Prev / Next Controls if multiple photos */}
              {selectedWorkshop.images && selectedWorkshop.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActivePhotoIdx((prev) =>
                        prev === 0 ? selectedWorkshop.images!.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActivePhotoIdx((prev) =>
                        prev === selectedWorkshop.images!.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip & Links */}
            <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d0d0d]">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {selectedWorkshop.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className={`relative w-14 h-11 rounded-lg overflow-hidden border-2 transition-transform cursor-pointer shrink-0 ${
                      activePhotoIdx === i ? "border-[#4285f4] scale-105" : "border-white/20 opacity-60"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {selectedWorkshop.instagramUrl && (
                  <a
                    href={selectedWorkshop.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-400 text-xs font-bold flex items-center gap-1.5 border border-pink-500/30"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>View on Instagram</span>
                  </a>
                )}
                {selectedWorkshop.photosDrive && (
                  <a
                    href={selectedWorkshop.photosDrive}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-[#4285f4] text-xs font-bold flex items-center gap-1.5 border border-blue-500/30"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Drive Folder</span>
                  </a>
                )}
                <Link
                  href="/gallery"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>All Galleries</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
