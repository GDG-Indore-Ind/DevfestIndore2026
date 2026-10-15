"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  UserCheck,
  Users,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Search,
  School,
  FolderOpen,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";
import { getWorkshops } from "@/lib/firestoreService";
import { useTheme } from "@/contexts/ThemeContext";
import CardTilt from "./CardTilt";

export default function CollegeWorkshopsSection() {
  const { isDark } = useTheme();
  const [workshops, setWorkshops] = useState<WorkshopItem[]>(INITIAL_WORKSHOPS);
  const [filterSpeaker, setFilterSpeaker] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Completed" | "Upcoming">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getWorkshops().then((res) => {
      if (res && res.length > 0) setWorkshops(res);
    });
  }, []);

  // Compute unique speakers
  const speakersList = Array.from(
    new Set(workshops.map((w) => w.speaker).filter(Boolean))
  );

  // Statistics
  const completedCount = workshops.filter((w) => w.status === "Completed").length;
  const totalRsvp = workshops.reduce((acc, w) => acc + (w.rsvpCount || 0), 0);

  // Filtered workshops
  const filteredWorkshops = workshops.filter((w) => {
    const matchesSpeaker = filterSpeaker === "All" || w.speaker === filterSpeaker;
    const matchesStatus = filterStatus === "All" || w.status === filterStatus;
    const matchesSearch =
      searchQuery.trim() === "" ||
      w.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.collabNotice && w.collabNotice.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSpeaker && matchesStatus && matchesSearch;
  });

  return (
    <section id="workshops" className="py-14 md:py-20 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 text-[#4285f4]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Campus Codelabs & Pre-DevFest Series
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Hands-on Workshops Across Central India Colleges
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            Leading up to the flagship DevFest Indore 2026 conference, our expert speakers and organizers conducted specialized, hands-on practical codelabs, GenAI bootcamps, and cloud masterclasses across 18+ university campuses.
          </p>
        </div>

        {/* Impact Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 reveal-on-scroll">
          <div className={`p-4 sm:p-5 rounded-2xl border text-center transition-transform hover:-translate-y-1 ${
            isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#4285f4] tracking-tight">
              {workshops.length}
            </div>
            <div className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              Institutes & Colleges
            </div>
            <div className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
              Active Campus Chapters
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border text-center transition-transform hover:-translate-y-1 ${
            isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#34a853] tracking-tight">
              {completedCount}
            </div>
            <div className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              Conducted & Done
            </div>
            <div className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
              Successfully executed
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border text-center transition-transform hover:-translate-y-1 ${
            isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#f9ab00] tracking-tight">
              {totalRsvp > 0 ? `${totalRsvp.toLocaleString()}+` : "1,500+"}
            </div>
            <div className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              Student Engineers
            </div>
            <div className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
              Direct RSVP registrations
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border text-center transition-transform hover:-translate-y-1 ${
            isDark ? "bg-[#0d0d0d]/80 border-white/10" : "bg-white border-gray-200/90 shadow-sm"
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#ea4335] tracking-tight">
              {speakersList.length}
            </div>
            <div className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              Mentors & Speakers
            </div>
            <div className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
              Industry & Community Leads
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Status Tabs */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 w-full md:w-auto ${
            isDark ? "bg-[#0d0d0d] border-white/15" : "bg-gray-100 border-gray-300"
          }`}>
            {(["All", "Completed", "Upcoming"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === st
                    ? "bg-[#4285f4] text-white shadow-sm"
                    : isDark ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-black"
                }`}
              >
                {st === "All" ? `All (${workshops.length})` : st === "Completed" ? `Done (${completedCount})` : `Upcoming (${workshops.length - completedCount})`}
              </button>
            ))}
          </div>

          {/* Speaker Selector & Search Field */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Speaker Filter Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={filterSpeaker}
                onChange={(e) => setFilterSpeaker(e.target.value)}
                className={`w-full sm:w-auto px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                  isDark ? "bg-[#0d0d0d] border-white/15 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All">All Speakers ({speakersList.length})</option>
                {speakersList.map((spk) => (
                  <option key={spk} value={spk}>
                    Speaker: {spk}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Search Input */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border w-full sm:w-64 ${
              isDark ? "bg-[#0d0d0d] border-white/15" : "bg-white border-gray-300"
            }`}>
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college or speaker..."
                className="bg-transparent text-xs w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkshops.map((ws) => (
            <div
              key={ws.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative ${
                isDark
                  ? "bg-[#0d0d0d]/85 border-white/10 hover:border-[#4285f4]/40"
                  : "bg-white border-gray-200/90 shadow-sm hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div>
                {/* Status Badge & RSVP Count */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                    ws.status === "Completed"
                      ? "bg-emerald-500/10 text-[#34a853] border-emerald-500/30"
                      : "bg-blue-500/10 text-[#4285f4] border-blue-500/30"
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{ws.status === "Completed" ? "Workshop Done" : "Upcoming Workshop"}</span>
                  </span>

                  {ws.rsvpCount > 0 && (
                    <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#f9ab00]" />
                      <span>{ws.rsvpCount} RSVPs</span>
                    </span>
                  )}
                </div>

                {/* College Title */}
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-[#4285f4] flex items-center justify-center shrink-0 mt-0.5">
                    <School className="w-4 h-4" />
                  </div>
                  <h3 className={`text-lg font-black tracking-tight leading-snug group-hover:text-[#4285f4] transition-colors ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {ws.college}
                  </h3>
                </div>

                {/* Speaker Info Pill */}
                <div className={`p-3 rounded-2xl border mb-3 flex items-center gap-3 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="w-8 h-8 rounded-full bg-[#34a853]/15 text-[#34a853] flex items-center justify-center font-bold text-xs shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-gray-400 font-bold">
                      Speaker & Mentor
                    </div>
                    <div className={`text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      {ws.speaker}
                    </div>
                  </div>
                </div>

                {/* Schedule & Timing Info */}
                <div className="space-y-1.5 text-xs text-gray-400 mb-3 font-mono">
                  {ws.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#4285f4] shrink-0" />
                      <span className={isDark ? "text-white/80" : "text-gray-700"}>{ws.date}</span>
                    </div>
                  )}
                  {ws.timing && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#ea4335] shrink-0" />
                      <span className={isDark ? "text-white/80" : "text-gray-700"}>{ws.timing}</span>
                    </div>
                  )}
                </div>

                {/* Collab Notice or Highlights */}
                {ws.collabNotice && (
                  <p className={`text-xs leading-relaxed italic ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    "{ws.collabNotice}"
                  </p>
                )}
              </div>

              {/* Action Links */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400">
                  GDG Indore Hands-on Series
                </span>

                <div className="flex items-center gap-2">
                  {ws.photosDrive && (
                    <a
                      href={ws.photosDrive}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-white/10 text-[#4285f4] text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform"
                      title="View Event Photos"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Photos</span>
                    </a>
                  )}

                  {ws.logoDrive && (
                    <a
                      href={ws.logoDrive}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-white/10 text-[#f9ab00] text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform"
                      title="View College Chapter Assets"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Drive</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
