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
  Flag,
  Milestone,
  Navigation,
  Award,
} from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";
import { getWorkshops, subscribeToWorkshops } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapesBackground from "@/components/FloatingShapesBackground";
import InteractiveCursor from "@/components/InteractiveCursor";
import CardTilt from "@/components/CardTilt";
import CampusBeacon3D from "@/components/CampusBeacon3D";
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
    dateStr: "Completed • Nov 2025",
    attendees: "320+ Researchers",
  },
];

// Chronological Roadmap Dates & Metadata for Lively Road View
const WORKSHOP_ROAD_METADATA: Record<string, { date: string; year: string; badge: string; milestone: string }> = {
  "ws-1": { date: "October 14, 2026", year: "2026", badge: "GenAI Masterclass", milestone: "Manglia Highway Corridor" },
  "ws-10": { date: "January 22, 2026", year: "2026", badge: "Auditorium Conclave", milestone: "Rau AB Road Conclave" },
  "ws-11": { date: "February 18, 2026", year: "2026", badge: "Machine Learning Lab", milestone: "IIM Road Tech Hub" },
  "ws-2": { date: "March 05, 2026", year: "2026", badge: "Cloud & Firebase", milestone: "DAVV Khandwa Road" },
  "ws-3": { date: "March 24, 2026", year: "2026", badge: "GenAI Hacklab", milestone: "Vijay Nagar Tech Hub" },
  "ws-4": { date: "April 12, 2026", year: "2026", badge: "Autonomous Agents", milestone: "Bypass Junction Track" },
  "ws-5": { date: "April 29, 2026", year: "2026", badge: "Vertex AI APIs", milestone: "Ujjain Road Technology Hub" },
  "ws-6": { date: "May 15, 2026", year: "2026", badge: "Microservices & DevOps", milestone: "Rajendra Nagar Corridor" },
  "ws-7": { date: "October 10, 2025", year: "2025", badge: "Distributed Systems", milestone: "Vallabh Nagar City Hub" },
  "ws-8": { date: "November 04, 2025", year: "2025", badge: "Modern Web & React 19", milestone: "Khandwa Road Central" },
  "ws-9": { date: "November 20, 2025", year: "2025", badge: "Streaming Data Pipelines", milestone: "University Square Campus" },
  "ws-12": { date: "December 08, 2025", year: "2025", badge: "Space Telemetry & Satellite AI", milestone: "Simrol Aerospace Axis" },
  "ws-13": { date: "December 22, 2025", year: "2025", badge: "UI/UX & Flutter Systems", milestone: "Super Corridor Gateway" },
  "ws-14": { date: "January 14, 2025", year: "2025", badge: "Full-Stack Cloud", milestone: "Sector-3 Tech Boulevard" },
  "ws-15": { date: "February 09, 2025", year: "2025", badge: "Physical AI & Edge Robotics", milestone: "Nipania Industrial Axis" },
  "ws-16": { date: "March 02, 2025", year: "2025", badge: "Startup Tech MVP Scaling", milestone: "Super Corridor Tech Park" },
  "ws-17": { date: "April 05, 2024", year: "2024", badge: "Cybersecurity & Open Source", milestone: "Indore West Educational Hub" },
  "ws-18": { date: "May 18, 2024", year: "2024", badge: "Multi-Agent Orchestration", milestone: "Ujjain Road University Campus" },
};

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
                {/* Embedded Google My Maps (7 Columns) with 3D Holographic HUD Frame */}
                <div
                  className={`lg:col-span-7 rounded-3xl border-2 overflow-hidden shadow-2xl relative min-h-[460px] sm:min-h-[580px] group ${
                    isDark ? "bg-[#050505] border-white/15" : "bg-white border-gray-300"
                  }`}
                >
                  {/* Subtle 3D Depth Backdrop Grid */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#4285f4_1px,transparent_1px)] [background-size:16px_16px] z-10" />

                  <iframe
                    src={GOOGLE_MY_MAPS_EMBED_URL}
                    width="100%"
                    height="580"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="DevFest Indore 2026 Campus Workshops Map"
                    className="w-full h-full min-h-[460px] sm:min-h-[580px] relative z-0"
                  />

                  {/* 3D HUD Top Left: Live Layer Tag */}
                  <div className="absolute top-3 left-3 pointer-events-none z-20 flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live 3D Satellite & Google My Maps HUD</span>
                    </span>
                  </div>

                  {/* 3D HUD Top Right: Interactive Campus Holographic Beacon */}
                  <div className="absolute top-3 right-3 pointer-events-none z-20 hidden sm:flex flex-col items-end">
                    <div className="p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 shadow-2xl flex flex-col items-center">
                      <div className="text-[9px] font-mono font-bold text-blue-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#f9ab00]" />
                        <span>3D Telemetry Beacon</span>
                      </div>
                      <CampusBeacon3D
                        color="#4285f4"
                        collegeName={activePin.shortName}
                        badge={activePin.shortName}
                        isDark={isDark}
                      />
                    </div>
                  </div>

                  {/* 3D HUD Bottom Bar: Live Radar Coordinate Telemetry */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-20 flex items-center justify-between gap-2 flex-wrap">
                    <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90 shadow-md flex items-center gap-2">
                      <span className="text-[#4285f4] font-bold">LAT: 22.7196° N</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#34a853] font-bold">LON: 75.8577° E</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#ea4335] font-bold">{activePin.shortName}</span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        activePin.name + " Indore"
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="pointer-events-auto px-3 py-1 rounded-xl bg-[#4285f4]/90 hover:bg-[#4285f4] text-white text-[10px] font-bold shadow-md transition-all flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Directions ↗</span>
                    </a>
                  </div>
                </div>

                {/* Highlighted Workshop Details Card (5 Columns) with 3D Tilt */}
                <div className="lg:col-span-5">
                  <CardTilt maxTilt={4}>
                    <div
                      className={`rounded-3xl border-2 p-6 sm:p-7 transition-all duration-300 ${
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
                  </CardTilt>
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

          {/* TAB 3: TIMELINE VIEW (LIVELY WINDING ROAD WITH DATES & MILESTONES) */}
          {activeTab === "timeline" && (
            <div className="space-y-12 animate-in fade-in duration-300">
              {/* Road Header */}
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#4285f4] bg-blue-500/10 border border-blue-500/20 mb-3 shadow-xs">
                  <Navigation className="w-3.5 h-3.5 animate-pulse text-[#4285f4]" />
                  <span>CHRONOLOGICAL ROADSHOW • THE INDORE HIGHWAY</span>
                </div>
                <h2
                  className={`text-3xl sm:text-4xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Campus Journey Across Indore
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}
                >
                  Follow the chronological road through Central India's premier academic hubs. Every stop represents a live hands-on masterclass, mentor keynote, and student cohort.
                </p>
              </div>

              {/* Road Stats Banner */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/20 max-w-3xl mx-auto">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-[#4285f4]" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Starting Point: <strong className="text-[#4285f4]">SVVV Campus (2024)</strong>
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <Milestone className="w-4 h-4 text-[#f9ab00]" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Total Milestones: <strong className="text-[#f9ab00]">18 Activations</strong>
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#34a853]" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Destination: <strong className="text-[#34a853]">DevFest 2026 Arena</strong>
                  </span>
                </div>
              </div>

              {/* Winding Road Highway Container */}
              <div className="relative max-w-5xl mx-auto py-8">
                {/* Center Road (Asphalt Highway with Animated Dashed Yellow Center Line) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-12 md:-ml-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 rounded-full border-x-4 border-gray-600/40 shadow-2xl flex items-center justify-center overflow-hidden z-0">
                  {/* Dashed Center Road Divider */}
                  <div
                    className="w-1 h-full border-r-2 border-dashed border-[#f9ab00] opacity-80"
                    style={{ strokeDasharray: "8 8" }}
                  />
                  {/* Road Edges Glow */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-white/20" />
                  <div className="absolute inset-y-0 right-0 w-1 bg-white/20" />
                </div>

                {/* Road Stops / Cards */}
                <div className="space-y-12 relative z-10">
                  {workshops.map((ws, index) => {
                    const meta = WORKSHOP_ROAD_METADATA[ws.id] || {
                      date: `Edition ${2026 - (index % 3)}`,
                      year: String(2026 - (index % 3)),
                      badge: "Technical Workshop",
                      milestone: "Indore Campus Track",
                    };
                    const isEven = index % 2 === 0;
                    const images =
                      ws.images && ws.images.length > 0 ? ws.images : ["/gallery/opt_DSCF7167.JPG"];
                    const primaryImage = images[0];

                    return (
                      <div
                        key={ws.id}
                        className={`relative flex flex-col md:flex-row items-center gap-6 ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Milestone Badge on Road Center */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4285f4] via-[#ea4335] to-[#f9ab00] p-0.5 shadow-xl transition-transform hover:scale-110">
                            <div className="w-full h-full bg-[#111] rounded-[14px] flex flex-col items-center justify-center text-white">
                              <span className="text-[9px] font-mono font-bold leading-none text-gray-400">STOP</span>
                              <span className="text-sm font-black leading-tight text-[#f9ab00]">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                          {/* Year Pill Attached to Road Milestone */}
                          <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-black bg-black/90 text-white border border-white/20 shadow-md">
                            {meta.year}
                          </span>
                        </div>

                        {/* Campus Card (Takes 50% width on Desktop, full on mobile with left margin) */}
                        <div
                          className={`w-full md:w-[calc(50%-44px)] pl-16 md:pl-0 ${
                            isEven ? "md:pr-0 md:text-left" : "md:pl-0 md:text-left"
                          }`}
                        >
                          <div
                            className={`rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
                              isDark
                                ? "bg-[#0d0d0d]/95 border-white/10 hover:border-[#4285f4]/60 hover:shadow-[0_0_35px_rgba(66,133,244,0.18)]"
                                : "bg-white border-gray-200 hover:border-blue-400 shadow-md"
                            }`}
                          >
                            {/* Card Top: Date & Corridor Tag */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-100 dark:border-white/10">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4285f4]">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{meta.date}</span>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#f9ab00]/15 text-[#f9ab00] border border-[#f9ab00]/30">
                                {meta.badge}
                              </span>
                            </div>

                            {/* Main Content Grid: Image + Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                              {/* Photo Preview (5 cols on sm) */}
                              <div
                                className="sm:col-span-5 relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                                onClick={() => handleOpenPhotoModal(ws, 0)}
                              >
                                <Image
                                  src={primaryImage}
                                  alt={ws.college}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, 240px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono font-bold">
                                  <span className="bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/20">
                                    {images.length} {images.length === 1 ? "Photo" : "Photos"}
                                  </span>
                                  <span className="text-[#4285f4]">Tap to view ↗</span>
                                </div>
                              </div>

                              {/* Details (7 cols on sm) */}
                              <div className="sm:col-span-7 space-y-2.5">
                                {/* College Name & Logo */}
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
                                      className={`text-sm sm:text-base font-black leading-snug break-words ${
                                        isDark ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      {ws.college}
                                    </h3>
                                    <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                                      📍 {meta.milestone}
                                    </div>
                                  </div>
                                </div>

                                {/* Speaker & Topic */}
                                <div className="text-xs">
                                  <span className="font-bold text-[#4285f4]">Speaker: </span>
                                  <span className={`font-semibold ${isDark ? "text-white/90" : "text-gray-800"}`}>
                                    {ws.speaker}
                                  </span>
                                </div>

                                {ws.topic && (
                                  <div className="text-xs font-bold leading-tight text-gray-700 dark:text-gray-300 line-clamp-2">
                                    📌 {ws.topic}
                                  </div>
                                )}

                                {/* Links */}
                                <div className="flex items-center gap-2 pt-1 flex-wrap">
                                  {ws.instagramUrl && ws.instagramUrl.trim() !== "" && (
                                    <a
                                      href={ws.instagramUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 text-[11px] font-bold flex items-center gap-1 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
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
                                      className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-[#4285f4] text-[11px] font-bold flex items-center gap-1 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                                    >
                                      <FolderOpen className="w-3 h-3" />
                                      <span>Drive</span>
                                    </a>
                                  )}
                                  <button
                                    onClick={() => handleOpenPhotoModal(ws, 0)}
                                    className="text-[11px] font-bold text-[#4285f4] hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                                  >
                                    <span>Gallery</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Spacer for opposite side on Desktop */}
                        <div className="hidden md:block md:w-[calc(50%-44px)]" />
                      </div>
                    );
                  })}
                </div>

                {/* Final Destination Finish Line */}
                <div className="mt-16 text-center relative z-20">
                  <div className="inline-flex flex-col items-center p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl border-2 border-white/20">
                    <Award className="w-10 h-10 mb-2 text-[#f9ab00] animate-bounce" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
                      Destination Reached
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black mt-1">
                      DevFest Indore 2026 Flagship Conclave
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-md mt-1">
                      Essentia Luxury Convention Arena • 600+ Auditorium Developers & Leaders
                    </p>
                    <Link
                      href="/#tickets"
                      className="mt-4 px-6 py-2.5 rounded-full font-bold text-xs bg-white text-gray-900 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                      Reserve Conference Pass ↗
                    </Link>
                  </div>
                </div>
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
