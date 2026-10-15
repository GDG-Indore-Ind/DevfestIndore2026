"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  UserCheck,
  CheckCircle2,
  Search,
  School,
  FolderOpen,
  ArrowRight,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  Grid3X3,
  ListOrdered,
  Maximize2,
  ExternalLink,
  Users,
  Compass,
} from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";
import { getWorkshops, subscribeToWorkshops } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapesBackground from "@/components/FloatingShapesBackground";
import InteractiveCursor from "@/components/InteractiveCursor";
import { useTheme } from "@/contexts/ThemeContext";

// Google My Maps Embed URL provided by user
const GOOGLE_MY_MAPS_EMBED_URL =
  "https://www.google.com/maps/d/embed?mid=1JnsmwguL2FJ2noq94FPn0rwIbX3pse4&ehbc=2E312F";

// Campus coordinates & metadata for Interactive Map View
interface CampusPin {
  id: string;
  name: string;
  shortName: string;
  location: string;
  workshopId: string;
  dateStr: string;
  attendees: string;
}

const CAMPUS_PINS: CampusPin[] = [
  {
    id: "pin-acropolis",
    name: "Acropolis Institute of Technology and Research (AITR)",
    shortName: "AITR Campus",
    location: "Bypass Road, Manglia, Indore",
    workshopId: "ws-1",
    dateStr: "Completed • Oct 2026",
    attendees: "450+ Students",
  },
  {
    id: "pin-medicaps",
    name: "Medi-Caps University",
    shortName: "Medi-Caps",
    location: "AB Road, Pigdamber, Rau, Indore",
    workshopId: "ws-10",
    dateStr: "Completed • Jan 2026",
    attendees: "600+ Students",
  },
  {
    id: "pin-iist",
    name: "Indore Institute of Science and Technology (IIST)",
    shortName: "IIST Indore",
    location: "Opposite IIM Indore, Rau Pithampur Road",
    workshopId: "ws-11",
    dateStr: "Completed • Feb 2026",
    attendees: "380+ Students",
  },
  {
    id: "pin-iet",
    name: "Institute of Engineering & Technology, DAVV (IET DAVV)",
    shortName: "IET DAVV",
    location: "Khandwa Road, DAVV Campus, Indore",
    workshopId: "ws-2",
    dateStr: "Completed • 2026",
    attendees: "400+ Students",
  },
  {
    id: "pin-pimr",
    name: "Prestige Institute of Management & Research (PIMR)",
    shortName: "PIMR Indore",
    location: "Scheme 54, Vijay Nagar, Indore",
    workshopId: "ws-3",
    dateStr: "Completed • 2026",
    attendees: "350+ Students",
  },
  {
    id: "pin-sage",
    name: "SAGE University Indore",
    shortName: "SAGE University",
    location: "Kailod Kartal, Bypass Road, Indore",
    workshopId: "ws-4",
    dateStr: "Completed • 2026",
    attendees: "420+ Students",
  },
  {
    id: "pin-sgsits",
    name: "Shri Govindram Seksaria Institute of Technology and Science (SGSITS)",
    shortName: "SGSITS",
    location: "Park Road, Vallabh Nagar, Indore",
    workshopId: "ws-7",
    dateStr: "Completed • 2025",
    attendees: "500+ Students",
  },
  {
    id: "pin-iit",
    name: "Indian Institute of Technology Indore (IIT Indore)",
    shortName: "IIT Indore",
    location: "Khandwa Road, Simrol, Indore",
    workshopId: "ws-12",
    dateStr: "Completed • 2025",
    attendees: "320+ Researchers",
  },
];

export default function WorkshopsPage() {
  const { isDark } = useTheme();
  const [workshops, setWorkshops] = useState<WorkshopItem[]>(INITIAL_WORKSHOPS);
  const [activeTab, setActiveTab] = useState<"map" | "grid" | "timeline">("map");
  const [filterSpeaker, setFilterSpeaker] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Map Interactive Pin State
  const [activePinId, setActivePinId] = useState<string>("pin-acropolis");

  // Modal for previewing workshop photos
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeToWorkshops((items) => {
      if (items && items.length > 0) setWorkshops(items);
    });
    return () => unsub();
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

  // Find active workshop for interactive map preview
  const activePin = CAMPUS_PINS.find((p) => p.id === activePinId) || CAMPUS_PINS[0];
  const activePinWorkshop =
    workshops.find((w) => w.id === activePin.workshopId) ||
    workshops.find((w) => w.college.toLowerCase().includes(activePin.shortName.toLowerCase())) ||
    workshops[0];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors relative selection:bg-[#4285f4]/40 ${
        isDark ? "bg-[#000000] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
      }`}
    >
      {/* Precision Interactive Cursor */}
      <InteractiveCursor />

      {/* Floating 3D Cosmic Mars / Blueprint Background */}
      <FloatingShapesBackground />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home & Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4285f4] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to DevFest Indore 2026 Home</span>
            </Link>
          </div>

          {/* Page Header with Stats Ribbon */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm mb-4 border ${
                isDark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white border-gray-200 text-[#1e1e1e]"
              }`}
            >
              <Compass className="w-4 h-4 text-[#4285f4]" />
              <span>Campus Hands-on Masterclasses • Pre-DevFest 2026 Series</span>
              <span className="text-xs text-[#f9ab00]">✦</span>
            </div>
            <h1
              className={`text-4xl sm:text-6xl font-black tracking-tight mb-4 ${
                isDark ? "text-white" : "text-[#1e1e1e]"
              }`}
            >
              Campus Workshops & Technical Roadshow
            </h1>
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-3xl mx-auto ${
                isDark ? "text-white/80" : "text-[#5f6368]"
              }`}
            >
              Hands-on workshops, technical talks, and community engagements across Central India
              to empower the next generation of AI and space tech engineers.
            </p>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-3xl mx-auto">
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? "bg-[#0d0d0d]/90 border-white/10" : "bg-white border-gray-200 shadow-xs"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-[#4285f4]">18+</div>
                <div className="text-[11px] font-mono text-gray-400 uppercase mt-0.5 font-bold">
                  University Campuses
                </div>
              </div>
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? "bg-[#0d0d0d]/90 border-white/10" : "bg-white border-gray-200 shadow-xs"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-[#34a853]">2,500+</div>
                <div className="text-[11px] font-mono text-gray-400 uppercase mt-0.5 font-bold">
                  Students Reached
                </div>
              </div>
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? "bg-[#0d0d0d]/90 border-white/10" : "bg-white border-gray-200 shadow-xs"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-[#ea4335]">20+</div>
                <div className="text-[11px] font-mono text-gray-400 uppercase mt-0.5 font-bold">
                  Hands-on Codelabs
                </div>
              </div>
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? "bg-[#0d0d0d]/90 border-white/10" : "bg-white border-gray-200 shadow-xs"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-[#f9ab00]">10+</div>
                <div className="text-[11px] font-mono text-gray-400 uppercase mt-0.5 font-bold">
                  Campus GDG Chapters
                </div>
              </div>
            </div>
          </div>

          {/* VIEW SWITCHER TABS (Option C: Map View, Modern Card Grid, Timeline) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
            {/* View Selector Pills */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("map")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "map"
                    ? "bg-[#4285f4] text-white shadow-md scale-[1.02]"
                    : isDark
                    ? "text-white/70 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Indore Journey Map View</span>
              </button>
              <button
                onClick={() => setActiveTab("grid")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "grid"
                    ? "bg-[#4285f4] text-white shadow-md scale-[1.02]"
                    : isDark
                    ? "text-white/70 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Modern Card Grid</span>
              </button>
              <button
                onClick={() => setActiveTab("timeline")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "timeline"
                    ? "bg-[#4285f4] text-white shadow-md scale-[1.02]"
                    : isDark
                    ? "text-white/70 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Timeline View</span>
              </button>
            </div>

            {/* Quick Count & Search */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {activeTab === "grid" && (
                <div
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border w-full sm:w-72 ${
                    isDark ? "bg-[#0d0d0d] border-white/15" : "bg-white border-gray-300"
                  }`}
                >
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search college or topic..."
                    className="bg-transparent text-xs w-full focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: INDORE JOURNEY MAP VIEW (WITH EMBEDDED GOOGLE MY MAPS LAYER & PIN HIGHLIGHTER) */}
          {activeTab === "map" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Header Badge */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#4285f4] bg-blue-500/10 border border-blue-500/20 mb-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>OUR JOURNEY IN INDORE</span>
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-black ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Interactive Campus Map & Locations
                  </h2>
                  <p
                    className={`text-xs sm:text-sm mt-1 max-w-2xl ${
                      isDark ? "text-white/75" : "text-gray-600"
                    }`}
                  >
                    Click any college pin below to highlight its campus layer on the official Google
                    Map and explore the live workshop recap, mentor, and photo gallery.
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/d/u/0/edit?mid=1JnsmwguL2FJ2noq94FPn0rwIbX3pse4&usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#4285f4] text-white hover:bg-[#3367d6] shadow-sm shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Screen My Maps ↗</span>
                </a>
              </div>

              {/* Campus Selector Pills Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CAMPUS_PINS.map((pin) => {
                  const isActive = pin.id === activePinId;
                  return (
                    <button
                      key={pin.id}
                      onClick={() => setActivePinId(pin.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                        isActive
                          ? "bg-[#4285f4] text-white border-[#4285f4] shadow-md scale-105"
                          : isDark
                          ? "bg-[#0d0d0d] text-white/80 border-white/10 hover:border-white/30"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 shadow-xs"
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#ea4335]"}`} />
                      <span>{pin.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Map & Focused Workshop Card Split Screen */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Embedded Google My Maps (7 Columns) */}
                <div
                  className={`lg:col-span-7 rounded-3xl border-2 overflow-hidden shadow-xl relative min-h-[460px] sm:min-h-[560px] ${
                    isDark ? "bg-[#0d0d0d] border-white/15" : "bg-white border-gray-300"
                  }`}
                >
                  <iframe
                    src={GOOGLE_MY_MAPS_EMBED_URL}
                    width="100%"
                    height="560"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="DevFest Indore 2026 Campus Workshops Map"
                    className="w-full h-full min-h-[460px] sm:min-h-[560px]"
                  />
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-md">
                      📍 Live Google My Maps Layer
                    </span>
                  </div>
                </div>

                {/* Highlighted Workshop Details Card (5 Columns) */}
                <div
                  className={`lg:col-span-5 rounded-3xl border-2 p-6 sm:p-7 transition-all duration-300 ${
                    isDark
                      ? "bg-[#0d0d0d]/95 border-white/15 shadow-2xl"
                      : "bg-white border-gray-200 shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{activePin.dateStr}</span>
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 font-bold">
                      {activePin.attendees}
                    </span>
                  </div>

                  {/* Workshop Photo Preview */}
                  {activePinWorkshop && (
                    <div
                      className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-5 bg-black/40 border border-white/10 group cursor-pointer"
                      onClick={() => handleOpenPhotoModal(activePinWorkshop, 0)}
                    >
                      <Image
                        src={
                          activePinWorkshop.images && activePinWorkshop.images.length > 0
                            ? activePinWorkshop.images[0]
                            : "/gallery/opt_DSCF7167.JPG"
                        }
                        alt={activePinWorkshop.college}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-md flex items-center gap-1 border border-white/20">
                          <ImageIcon className="w-3 h-3 text-[#4285f4]" />
                          <span>
                            {activePinWorkshop.images ? activePinWorkshop.images.length : 1} Photos
                          </span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                        {/* Enlarged College Logo */}
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-white/90 shadow-xl flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                          {activePinWorkshop.collegeLogoUrl ? (
                            <img
                              src={activePinWorkshop.collegeLogoUrl}
                              alt="Logo"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <School className="w-7 h-7 text-[#4285f4]" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-mono text-blue-300 font-bold uppercase">
                            Selected Campus
                          </div>
                          <h3 className="text-white text-base font-black leading-snug drop-shadow-md break-words">
                            {activePinWorkshop.college}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Institution & Address */}
                  <div
                    className={`p-3.5 rounded-2xl border mb-3 flex items-start gap-3 ${
                      isDark ? "bg-white/[0.04] border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#ea4335] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold block text-gray-400 text-[10px] uppercase font-mono">
                        Campus Location & Coordinates
                      </span>
                      <span
                        className={`font-semibold leading-relaxed ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {activePin.location}
                      </span>
                    </div>
                  </div>

                  {/* Speaker & Topic */}
                  {activePinWorkshop && (
                    <div className="space-y-3">
                      <div
                        className={`p-3 rounded-2xl border flex items-center gap-3 ${
                          isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#34a853]/15 text-[#34a853] flex items-center justify-center font-bold text-xs shrink-0">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                            Keynote Speaker / Mentor
                          </span>
                          <span
                            className={`text-xs font-black block ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {activePinWorkshop.speaker}
                          </span>
                        </div>
                      </div>

                      {activePinWorkshop.topic && (
                        <div className="flex items-start gap-2.5 pt-1">
                          <BookOpen className="w-4 h-4 text-[#4285f4] shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-mono uppercase text-[#4285f4] font-bold block">
                              Lecture Topic
                            </span>
                            <h4
                              className={`text-xs font-bold leading-snug break-words ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {activePinWorkshop.topic}
                            </h4>
                          </div>
                        </div>
                      )}

                      {activePinWorkshop.description && (
                        <p
                          className={`text-xs leading-relaxed line-clamp-3 ${
                            isDark ? "text-white/70" : "text-gray-600"
                          }`}
                        >
                          {activePinWorkshop.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {activePinWorkshop?.instagramUrl &&
                        activePinWorkshop.instagramUrl.trim() !== "" && (
                          <a
                            href={activePinWorkshop.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-pink-500/30"
                          >
                            <InstagramIcon className="w-3.5 h-3.5" />
                            <span>Instagram</span>
                          </a>
                        )}

                      {activePinWorkshop?.photosDrive &&
                        activePinWorkshop.photosDrive.trim() !== "" && (
                          <a
                            href={activePinWorkshop.photosDrive}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-[#4285f4] hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-500/30"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>Drive</span>
                          </a>
                        )}
                    </div>

                    {activePinWorkshop && (
                      <button
                        onClick={() => handleOpenPhotoModal(activePinWorkshop, 0)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#4285f4] text-white hover:bg-[#3367d6] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Photos</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODERN CARD GRID VIEW (ALL WORKSHOPS WITH ENLARGED LOGOS & FULL DETAILS) */}
          {activeTab === "grid" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWorkshops.map((ws) => {
                  const images =
                    ws.images && ws.images.length > 0 ? ws.images : ["/gallery/opt_DSCF7167.JPG"];
                  const primaryImage = images[0];

                  return (
                    <div
                      key={ws.id}
                      className={`rounded-3xl border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden ${
                        isDark
                          ? "bg-[#0d0d0d]/95 border-white/10 hover:border-[#4285f4]/60 hover:shadow-[0_0_35px_rgba(66,133,244,0.2)]"
                          : "bg-white border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-xl"
                      }`}
                    >
                      <div>
                        {/* Large Visual Image Stage */}
                        <div
                          className="relative h-64 sm:h-72 w-full bg-black/40 overflow-hidden cursor-pointer"
                          onClick={() => handleOpenPhotoModal(ws, 0)}
                        >
                          <Image
                            src={primaryImage}
                            alt={ws.college}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                          {/* Status Badge */}
                          <div className="absolute top-3.5 left-3.5">
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-500 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Workshop Conducted</span>
                            </span>
                          </div>

                          {/* Multi-photo Counter */}
                          <div className="absolute top-3.5 right-3.5">
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/75 text-white backdrop-blur-md flex items-center gap-1.5 border border-white/20 shadow-md">
                              <ImageIcon className="w-3.5 h-3.5 text-[#4285f4]" />
                              <span>
                                {images.length} {images.length === 1 ? "Photo" : "Photos"}
                              </span>
                            </span>
                          </div>

                          {/* College Title & Enlarged Logo Crest on Image */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3.5">
                            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-white/90 shadow-xl flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                              {ws.collegeLogoUrl ? (
                                <img
                                  src={ws.collegeLogoUrl}
                                  alt={`${ws.college} Logo`}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <School className="w-8 h-8 text-[#4285f4]" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                                <span>Campus Chapter</span>
                              </div>
                              <h3 className="text-white text-base sm:text-lg font-black leading-snug drop-shadow-md break-words">
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
                                className="relative w-14 h-11 rounded-lg overflow-hidden border border-white/20 hover:border-[#4285f4] shrink-0 transition-transform hover:scale-105 cursor-pointer"
                              >
                                <Image
                                  src={img}
                                  alt={`Photo ${i + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Details Body */}
                        <div className="p-5 sm:p-6 space-y-3.5">
                          {/* Full College Name Banner */}
                          <div
                            className={`p-3 rounded-2xl border flex items-center gap-3 ${
                              isDark ? "bg-white/[0.04] border-white/10" : "bg-blue-50/60 border-blue-100"
                            }`}
                          >
                            <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                              {ws.collegeLogoUrl ? (
                                <img
                                  src={ws.collegeLogoUrl}
                                  alt="Logo"
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <School className="w-5 h-5 text-[#4285f4]" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono uppercase text-[#4285f4] font-bold block">
                                Institution
                              </span>
                              <div
                                className={`text-xs sm:text-sm font-bold leading-snug break-words ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {ws.college}
                              </div>
                            </div>
                          </div>

                          {/* Speaker Bar */}
                          <div
                            className={`p-3 rounded-2xl border flex items-center gap-3 ${
                              isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-[#34a853]/15 text-[#34a853] flex items-center justify-center font-bold text-xs shrink-0">
                              <UserCheck className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                                Speaker / Mentor
                              </span>
                              <span
                                className={`text-xs sm:text-sm font-black block ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {ws.speaker}
                              </span>
                            </div>
                          </div>

                          {/* Lecture Topic */}
                          {ws.topic && (
                            <div className="flex items-start gap-2.5 pt-1">
                              <BookOpen className="w-4 h-4 text-[#4285f4] shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <div className="text-[10px] font-mono uppercase text-[#4285f4] font-black">
                                  Lecture Topic
                                </div>
                                <h4
                                  className={`text-xs sm:text-sm font-bold leading-snug break-words ${
                                    isDark ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {ws.topic}
                                </h4>
                              </div>
                            </div>
                          )}

                          {/* Description */}
                          {ws.description && (
                            <p
                              className={`text-xs leading-relaxed line-clamp-3 ${
                                isDark ? "text-white/75" : "text-gray-600"
                              }`}
                            >
                              {ws.description}
                            </p>
                          )}

                          {/* Collaboration notice */}
                          {ws.collabNotice && (
                            <div
                              className={`p-2.5 rounded-xl text-[11px] font-mono italic ${
                                isDark
                                  ? "bg-white/[0.03] text-gray-400 border border-white/5"
                                  : "bg-gray-50 text-gray-600 border border-gray-100"
                              }`}
                            >
                              "{ws.collabNotice}"
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Action Links */}
                      <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-2 border-t border-white/5 mt-2">
                        <div className="flex items-center gap-2">
                          {ws.instagramUrl && ws.instagramUrl.trim() !== "" && (
                            <a
                              href={ws.instagramUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-pink-500/30"
                              title="View Instagram Post / Reel"
                            >
                              <InstagramIcon className="w-3.5 h-3.5" />
                              <span>Instagram</span>
                            </a>
                          )}

                          {ws.photosDrive && ws.photosDrive.trim() !== "" && (
                            <a
                              href={ws.photosDrive}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-[#4285f4] hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-500/30"
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
            </div>
          )}

          {/* TAB 3: TIMELINE VIEW (OUR JOURNEY THROUGH THE YEARS) */}
          {activeTab === "timeline" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#34a853] bg-emerald-500/10 border border-emerald-500/20 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>CHRONOLOGICAL ROADSHOW</span>
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Campus Engagements Through The Years
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-1 ${isDark ? "text-white/70" : "text-gray-600"}`}
                >
                  A timeline of hands-on codelabs, campus keynotes, and student collaborations
                  across Indore.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l-2 border-[#4285f4]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
                {workshops.map((ws, index) => {
                  const images =
                    ws.images && ws.images.length > 0 ? ws.images : ["/gallery/opt_DSCF7167.JPG"];
                  const primaryImage = images[0];

                  return (
                    <div key={ws.id} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#4285f4] border-4 border-white dark:border-black shadow-md flex items-center justify-center" />

                      <div
                        className={`rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl ${
                          isDark
                            ? "bg-[#0d0d0d]/90 border-white/10 hover:border-[#4285f4]/50"
                            : "bg-white border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                          {/* Photo Thumbnail (4 cols) */}
                          <div
                            className="md:col-span-4 relative h-48 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer"
                            onClick={() => handleOpenPhotoModal(ws, 0)}
                          >
                            <Image
                              src={primaryImage}
                              alt={ws.college}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 320px"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500 text-white">
                                Workshop #{index + 1}
                              </span>
                            </div>
                            <div className="absolute bottom-2 right-2">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/80 text-white border border-white/20">
                                {images.length} {images.length === 1 ? "Photo" : "Photos"}
                              </span>
                            </div>
                          </div>

                          {/* Info (8 cols) */}
                          <div className="md:col-span-8 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                                {ws.collegeLogoUrl ? (
                                  <img
                                    src={ws.collegeLogoUrl}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <School className="w-6 h-6 text-[#4285f4]" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3
                                  className={`text-base sm:text-lg font-black leading-snug ${
                                    isDark ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {ws.college}
                                </h3>
                                <span className="text-[11px] font-mono text-[#4285f4] font-bold">
                                  Speaker: {ws.speaker}
                                </span>
                              </div>
                            </div>

                            {ws.topic && (
                              <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                📌 {ws.topic}
                              </div>
                            )}

                            {ws.description && (
                              <p
                                className={`text-xs leading-relaxed line-clamp-2 ${
                                  isDark ? "text-white/70" : "text-gray-600"
                                }`}
                              >
                                {ws.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                {ws.instagramUrl && ws.instagramUrl.trim() !== "" && (
                                  <a
                                    href={ws.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 text-xs font-bold flex items-center gap-1 border border-pink-500/20"
                                  >
                                    <InstagramIcon className="w-3 h-3" />
                                    <span>Instagram</span>
                                  </a>
                                )}
                                {ws.photosDrive && ws.photosDrive.trim() !== "" && (
                                  <a
                                    href={ws.photosDrive}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-[#4285f4] text-xs font-bold flex items-center gap-1 border border-blue-500/20"
                                  >
                                    <FolderOpen className="w-3 h-3" />
                                    <span>Drive</span>
                                  </a>
                                )}
                              </div>

                              <button
                                onClick={() => handleOpenPhotoModal(ws, 0)}
                                className="text-xs font-bold text-[#4285f4] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>Explore Gallery</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal for Full Photo Previews */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-[#111111] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative text-white">
            {/* Header with College Logo */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-white/20 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  {selectedWorkshop.collegeLogoUrl ? (
                    <img
                      src={selectedWorkshop.collegeLogoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <School className="w-6 h-6 text-[#4285f4]" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#4285f4] uppercase font-bold block">
                    {selectedWorkshop.college}
                  </span>
                  <h4 className="text-base sm:text-lg font-black">
                    Speaker: {selectedWorkshop.speaker}{" "}
                    {selectedWorkshop.topic ? `— ${selectedWorkshop.topic}` : ""}
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
                {selectedWorkshop.instagramUrl && selectedWorkshop.instagramUrl.trim() !== "" && (
                  <a
                    href={selectedWorkshop.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-pink-500/30"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                )}
                {selectedWorkshop.photosDrive && selectedWorkshop.photosDrive.trim() !== "" && (
                  <a
                    href={selectedWorkshop.photosDrive}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-[#4285f4] hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-500/30"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Drive</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
