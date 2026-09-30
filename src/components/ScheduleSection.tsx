"use client";

import { useState } from "react";
import { SESSIONS, SessionItem } from "@/data/devfestData";
import {
  Clock,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Info,
} from "lucide-react";

interface ScheduleSectionProps {
  savedSessionIds: string[];
  onToggleSaveSession: (id: string) => void;
}

export default function ScheduleSection({
  savedSessionIds,
  onToggleSaveSession,
}: ScheduleSectionProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const [selectedHall, setSelectedHall] = useState<string>("All");
  const [activeModalSession, setActiveModalSession] = useState<SessionItem | null>(null);

  const tracks = [
    "All",
    "GenAI & ML",
    "Cloud & DevOps",
    "Web & Mobile",
    "Keynote & Community",
  ];

  const halls = [
    "All",
    "Hall A: Rajwada Auditorium",
    "Hall B: Malwa Tech Stage",
    "Hall C: Codelab Arena",
  ];

  const filteredSessions = SESSIONS.filter((session) => {
    const trackMatch = selectedTrack === "All" || session.track === selectedTrack;
    const hallMatch = selectedHall === "All" || session.hall === selectedHall;
    return trackMatch && hallMatch;
  });

  const getBorderColor = (color: string) => {
    switch (color) {
      case "blue":
        return "border-l-[6px] border-l-[#4285f4]";
      case "green":
        return "border-l-[6px] border-l-[#34a853]";
      case "yellow":
        return "border-l-[6px] border-l-[#f9ab00]";
      case "red":
        return "border-l-[6px] border-l-[#ea4335]";
      default:
        return "border-l-[6px] border-l-[#4285f4]";
    }
  };

  const getHallBadgeColor = (hall: string) => {
    if (hall.includes("Hall A")) return "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]";
    if (hall.includes("Hall B")) return "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]";
    return "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]";
  };

  return (
    <section id="agenda" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#4285f4]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Curated Agenda &amp; Tracks
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight">
            One Day. 3 Stages. <span className="text-[#4285f4]">Infinite Learning.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            From deep-dive multi-agent AI architecture to zero-downtime Kubernetes microservices
            and hands-on codelabs. Customize your DevFest Indore schedule!
          </p>
        </div>

        {/* Filter Toolbar with Reveal */}
        <div className="bg-[#fafbfc] p-4 sm:p-6 rounded-3xl border-2 border-[#1e1e1e] google-pill-shadow mb-12 reveal-on-scroll">
          {/* Tracks Filter */}
          <div className="mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5f6368] block mb-2.5">
              Filter By Track:
            </span>
            <div className="flex flex-wrap gap-2">
              {tracks.map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border-2 border-[#1e1e1e] cursor-pointer ${
                    selectedTrack === track
                      ? "bg-[#4285f4] text-white google-pill-shadow scale-105"
                      : "bg-white text-[#1e1e1e] hover:bg-[#f0f0f0]"
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>

          {/* Hall Filter */}
          <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5f6368] mr-2">
                Filter Stage:
              </span>
              {halls.map((hall) => (
                <button
                  key={hall}
                  onClick={() => setSelectedHall(hall)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedHall === hall
                      ? "bg-[#1e1e1e] text-white border-[#1e1e1e]"
                      : "bg-white text-[#5f6368] border-gray-300 hover:border-[#1e1e1e]"
                  }`}
                >
                  {hall.replace("Hall A: ", "").replace("Hall B: ", "").replace("Hall C: ", "")}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-[#5f6368]">
              Showing <span className="text-[#1e1e1e] font-extrabold">{filteredSessions.length}</span> sessions
            </div>
          </div>
        </div>

        {/* Sessions Timeline Cards */}
        <div className="space-y-4">
          {filteredSessions.map((session, idx) => {
            const isSaved = savedSessionIds.includes(session.id);

            return (
              <div
                key={session.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#1e1e1e] google-pill-shadow transition-all spotlight-card reveal-on-scroll ${getBorderColor(
                  session.color
                )} hover:translate-x-1.5`}
                style={{ transitionDelay: `${(idx % 4) * 70}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Time & Stage */}
                  <div className="lg:w-1/4 flex flex-col gap-1.5 shrink-0">
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1e1e1e]">
                      <Clock className="w-4 h-4 text-[#4285f4]" />
                      <span>{session.time}</span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold self-start ${getHallBadgeColor(
                        session.hall
                      )}`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{session.hall}</span>
                    </div>
                  </div>

                  {/* Middle: Title, Speaker & Tags */}
                  <div className="lg:w-2/4 flex flex-col">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-[#5f6368] border border-gray-200">
                        {session.track}
                      </span>
                      <span className="text-[11px] font-bold text-[#34a853] bg-[#ccf6c5] px-2 py-0.5 rounded border border-[#5cdb6d]">
                        {session.level}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#1e1e1e] leading-snug mb-2">
                      {session.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#5f6368] mb-3">
                      By <span className="text-[#1e1e1e] font-bold">{session.speaker}</span> ({session.speakerRole})
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {session.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#fafbfc] border border-gray-200 text-[#5f6368]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="lg:w-1/4 flex items-center justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => onToggleSaveSession(session.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                        isSaved
                          ? "bg-[#ccf6c5] text-[#1e1e1e] border-[#1e1e1e] google-pill-shadow scale-105"
                          : "bg-white text-[#1e1e1e] border-gray-300 hover:border-[#1e1e1e]"
                      }`}
                      title={isSaved ? "Saved to My Schedule" : "Bookmark this session"}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 text-[#34a853]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4 text-[#5f6368]" />
                          <span>Bookmark</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveModalSession(session)}
                      className="p-2 rounded-xl bg-[#f0f0f0] hover:bg-[#e5e7eb] text-[#1e1e1e] border border-gray-300 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Codelab Arena Callout Box with Scroll Reveal */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#c3ecf6]/40 border-2 border-[#1e1e1e] google-pill-shadow flex flex-col sm:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#1e1e1e] flex items-center justify-center shrink-0 animate-bounce">
              <Sparkles className="w-7 h-7 text-[#4285f4]" />
            </div>
            <div>
              <h4 className="text-xl font-black text-[#1e1e1e]">Attending Hall C Codelab Arena?</h4>
              <p className="text-xs sm:text-sm font-medium text-[#5f6368]">
                Remember to bring your laptop and charger! Free sandbox cloud credits, starter code repos, and mentors will be waiting.
              </p>
            </div>
          </div>
          <a
            href="#tickets"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#3367d6] transition-all"
          >
            Claim Workshop Seat →
          </a>
        </div>
      </div>

      {/* Session Details Modal */}
      {activeModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1e1e1e] google-card-shadow relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">
                {activeModalSession.track}
              </span>
              <button
                onClick={() => setActiveModalSession(null)}
                className="w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 font-bold text-sm hover:bg-[#e5e7eb] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#c3ecf6] text-xs font-bold text-[#1e1e1e] mb-3">
              <Clock className="w-3.5 h-3.5 text-[#4285f4]" />
              <span>{activeModalSession.time}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
              <span>{activeModalSession.hall}</span>
            </div>

            <h3 className="text-2xl font-black text-[#1e1e1e] mb-3 leading-snug">
              {activeModalSession.title}
            </h3>

            <div className="p-3.5 rounded-2xl bg-[#fafbfc] border border-gray-200 mb-4">
              <span className="block text-xs font-semibold text-[#5f6368]">Speaker</span>
              <span className="text-base font-extrabold text-[#1e1e1e]">{activeModalSession.speaker}</span>
              <span className="block text-xs text-[#5f6368]">{activeModalSession.speakerRole}</span>
            </div>

            <p className="text-sm text-[#1e1e1e]/85 font-medium leading-relaxed mb-6">
              {activeModalSession.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeModalSession.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-[#1e1e1e] border border-gray-200"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleSaveSession(activeModalSession.id);
                  setActiveModalSession(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow cursor-pointer"
              >
                {savedSessionIds.includes(activeModalSession.id) ? "Remove Bookmark" : "Bookmark Session"}
              </button>
              <button
                onClick={() => setActiveModalSession(null)}
                className="px-4 py-2 text-xs font-bold text-[#5f6368] hover:text-[#1e1e1e] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
