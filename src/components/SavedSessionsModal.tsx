"use client";

import { SESSIONS } from "@/data/devfestData";
import { Bookmark, Clock, Trash2, CalendarPlus, X } from "lucide-react";

interface SavedSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveSession: (id: string) => void;
  onClearAll: () => void;
}

export default function SavedSessionsModal({
  isOpen,
  onClose,
  savedIds,
  onRemoveSession,
  onClearAll,
}: SavedSessionsModalProps) {
  if (!isOpen) return null;

  const savedList = SESSIONS.filter((s) => savedIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0d0d0d] border border-white/15 max-w-xl w-full rounded-3xl p-6 sm:p-8 google-card-shadow relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4285f4]/20 border border-[#4285f4]/40 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[#4285f4] fill-[#4285f4]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">My Saved Schedule</h3>
              <p className="text-xs text-white/45">
                {savedList.length} session{savedList.length === 1 ? "" : "s"} bookmarked for Nov 28
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 font-bold text-sm hover:bg-white/15 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedList.length === 0 ? (
            <div className="text-center py-12 text-white/45">
              <Bookmark className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-sm font-bold text-white/70">No sessions saved yet!</p>
              <p className="text-xs mt-1">
                Explore the Agenda section and click &#34;Bookmark&#34; to build your personal DevFest itinerary.
              </p>
            </div>
          ) : (
            savedList.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 hover:border-white/25 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#4285f4] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{session.time}</span>
                    <span>•</span>
                    <span className="text-white/40">{session.hall}</span>
                  </div>
                  <h4 className="text-sm font-black text-white leading-snug">{session.title}</h4>
                  <p className="text-xs text-white/45 mt-0.5">By {session.speaker}</p>
                </div>

                <button
                  onClick={() => onRemoveSession(session.id)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-[#ea4335] hover:bg-[#ea4335]/10 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedList.length > 0 && (
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-[#ea4335] hover:underline"
            >
              Clear All
            </button>

            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DevFest+Indore+2026&dates=20261128T030000Z/20261128T130000Z&details=GDG+DevFest+Indore+2026+at+Essentia+Luxury+Hotel+Indore&location=Essentia+Luxury+Hotel+Indore+Pipliyahana"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border border-[#4285f4]/50 shadow-[0_0_15px_rgba(66,133,244,0.4)] hover:bg-[#3367d6] flex items-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add Event to Google Calendar</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
