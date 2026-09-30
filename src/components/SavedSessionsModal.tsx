"use client";

import { SESSIONS, SessionItem } from "@/data/devfestData";
import { Bookmark, Clock, MapPin, Trash2, CalendarPlus, X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1e1e1e] google-card-shadow relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#c3ecf6] border border-[#57caff] flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[#4285f4] fill-[#4285f4]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1e1e1e]">My Saved Schedule</h3>
              <p className="text-xs text-[#5f6368]">
                {savedList.length} session{savedList.length === 1 ? "" : "s"} bookmarked for Nov 14
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 font-bold text-sm hover:bg-[#e5e7eb] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedList.length === 0 ? (
            <div className="text-center py-12 text-[#5f6368]">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#1e1e1e]">No sessions saved yet!</p>
              <p className="text-xs mt-1">
                Explore the Agenda section and click &#34;Bookmark&#34; to build your personal DevFest itinerary.
              </p>
            </div>
          ) : (
            savedList.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-[#fafbfc] border border-gray-200 flex items-start justify-between gap-3 hover:border-gray-400 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#4285f4] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{session.time}</span>
                    <span>•</span>
                    <span className="text-[#5f6368]">{session.hall}</span>
                  </div>
                  <h4 className="text-sm font-black text-[#1e1e1e] leading-snug">{session.title}</h4>
                  <p className="text-xs text-[#5f6368] mt-0.5">By {session.speaker}</p>
                </div>

                <button
                  onClick={() => onRemoveSession(session.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#ea4335] hover:bg-red-50 transition-colors"
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
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-[#ea4335] hover:underline"
            >
              Clear All
            </button>

            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DevFest+Indore+2026&dates=20261114T030000Z/20261114T130000Z&details=GDG+DevFest+Indore+2026+at+Brilliant+Convention+Centre&location=Brilliant+Convention+Centre+Indore"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#3367d6] flex items-center gap-2"
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
