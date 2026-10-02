"use client";

import { useState } from "react";
import { SATELLITE_EVENTS, SatelliteEvent } from "@/data/devfestData";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle,
  ExternalLink,
  Zap,
  Building,
  ArrowRight,
  Filter,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";

export default function SatelliteEventsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<SatelliteEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");

  const categories = [
    "All",
    "Founders Table",
    "HR Meetup",
    "Influencers Meetup",
    "Startup Pitch Day",
    "Early Startup Showcase",
    "Hands-on Series Workshops",
  ];

  const filteredEvents = SATELLITE_EVENTS.filter((event) => {
    return selectedCategory === "All" || event.category === selectedCategory;
  });

  // Group events by day
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = [];
    }
    acc[event.day].push(event);
    return acc;
  }, {} as Record<string, SatelliteEvent[]>);

  const handleOpenRsvp = (event: SatelliteEvent) => {
    setActiveRsvpEvent(event);
    setRsvpSuccess(false);
  };

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (attendeeName && attendeeEmail) {
      setRsvpSuccess(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
      });
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          headerBg: "bg-[#ffd427] text-[#1e1e1e] border-black",
          badge: "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]",
          accentText: "text-[#f9ab00]",
          borderAccent: "border-l-[#f9ab00]",
          btn: "bg-[#f9ab00] hover:bg-[#e09900] text-[#1e1e1e]",
        };
      case "blue":
        return {
          headerBg: "bg-[#57caff] text-[#1e1e1e] border-black",
          badge: "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]",
          accentText: "text-[#4285f4]",
          borderAccent: "border-l-[#4285f4]",
          btn: "bg-[#4285f4] hover:bg-[#3367d6] text-white",
        };
      case "green":
        return {
          headerBg: "bg-[#5cdb6d] text-[#1e1e1e] border-black",
          badge: "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]",
          accentText: "text-[#34a853]",
          borderAccent: "border-l-[#34a853]",
          btn: "bg-[#34a853] hover:bg-[#2d9247] text-white",
        };
      case "red":
        return {
          headerBg: "bg-[#ff7daf] text-[#1e1e1e] border-black",
          badge: "bg-[#f8d8d8] text-[#ea4335] border-[#ff7daf]",
          accentText: "text-[#ea4335]",
          borderAccent: "border-l-[#ea4335]",
          btn: "bg-[#ea4335] hover:bg-[#d93025] text-white",
        };
      default:
        return {
          headerBg: "bg-gray-100 text-[#1e1e1e] border-black",
          badge: "bg-gray-100 text-[#1e1e1e] border-gray-300",
          accentText: "text-[#4285f4]",
          borderAccent: "border-l-[#4285f4]",
          btn: "bg-[#1e1e1e] text-white",
        };
    }
  };

  return (
    <section id="satellite-events" className="py-20 md:py-28 bg-[#fafbfc] relative overflow-hidden border-t-2 border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Mumbai Tech Week Inspiration) */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#ea4335] animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Pre-DevFest Satellite Week • Nov 11 – 13
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight leading-tight">
            Satellite Events &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">Community Activations</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            Leading up to Saturday&#39;s flagship conference, DevFest Indore takes over the city!
            Join curated partner-hosted meetups, founder dinners, HR roundtables, creator summits, and hands-on workshops across Indore.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1e1e1e] bg-[#ffe7a5] px-4 py-1.5 rounded-full border border-[#ffd427]">
            <span>One City • One Week • Central India Tech Surge</span>
          </div>
        </div>

        {/* Filter Pills Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#1e1e1e] google-pill-shadow mb-12 reveal-on-scroll">
          <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-[#5f6368]">
            <Filter className="w-3.5 h-3.5 text-[#4285f4]" />
            <span>Filter By Activation Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border-2 border-[#1e1e1e] cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1e1e1e] text-white google-pill-shadow scale-102"
                    : "bg-[#fafbfc] text-[#1e1e1e] hover:bg-[#f0f0f0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date-Grouped Timeline Display (MTW Pattern) */}
        <div className="space-y-12">
          {Object.entries(groupedEvents).map(([dayTitle, events], groupIdx) => {
            const firstEvent = events[0];
            const dateBadgeColor =
              groupIdx === 0
                ? "bg-[#ffd427] text-black"
                : groupIdx === 1
                ? "bg-[#57caff] text-black"
                : "bg-[#ff7daf] text-black";

            return (
              <div key={dayTitle} className="reveal-on-scroll">
                {/* Date Banner Header (Mumbai Tech Week style slab) */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl border-3 border-[#1e1e1e] google-pill-shadow mb-4 ${dateBadgeColor}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest px-2.5 py-0.5 rounded-lg bg-black text-white">
                      {firstEvent.dayShort}
                    </span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight">
                      {firstEvent.dateShort}
                    </span>
                    <span className="hidden sm:inline-block w-px h-6 bg-black/30" />
                    <span className="text-xs sm:text-sm font-bold text-black/80">
                      {dayTitle}
                    </span>
                  </div>

                  <span className="text-xs font-black uppercase tracking-wider bg-white/80 border border-black/30 px-3 py-1 rounded-full">
                    {events.length} Activation{events.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Events in this date */}
                <div className="space-y-4">
                  {events.map((event) => {
                    const styles = getColorStyles(event.color);

                    return (
                      <CardTilt
                        key={event.id}
                        className={`bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#1e1e1e] google-card-shadow transition-all border-l-8 ${styles.borderAccent} hover:translate-x-1`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Time & Capacity Column */}
                          <div className="lg:col-span-3 flex flex-col gap-1.5 shrink-0">
                            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#1e1e1e]">
                              <Clock className="w-4 h-4 text-[#4285f4]" />
                              <span>{event.time}</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5f6368]">
                              <Users className="w-3.5 h-3.5 text-[#34a853]" />
                              <span>{event.capacity}</span>
                            </div>

                            <div className="mt-1">
                              <span
                                className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${styles.badge}`}
                              >
                                {event.accessType}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Host, Title, Description, Perks */}
                          <div className="lg:col-span-6 flex flex-col">
                            {/* Host Tag */}
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-[#1e1e1e] border border-gray-300">
                                Host: {event.host}
                              </span>
                              <span className="text-[10px] font-bold text-[#5f6368]">
                                • {event.hostBadge}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-[#1e1e1e] leading-snug mb-2 group-hover:text-[#4285f4] transition-colors">
                              {event.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-[#1e1e1e]/80 font-medium leading-relaxed mb-3">
                              {event.description}
                            </p>

                            {/* Perks Checklist */}
                            <div className="flex flex-wrap gap-2">
                              {event.perks.map((perk, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#fafbfc] border border-gray-200 text-[#1e1e1e]"
                                >
                                  <Check className="w-3 h-3 text-[#34a853]" />
                                  <span>{perk}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right: Location & RSVP Action */}
                          <div className="lg:col-span-3 flex flex-col lg:items-end justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                            <div className="lg:text-right">
                              <div className="flex items-center lg:justify-end gap-1.5 text-xs font-black text-[#ea4335]">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span>{event.location}</span>
                              </div>
                              <span className="block text-[11px] font-semibold text-[#5f6368] mt-0.5">
                                {event.venue}
                              </span>
                            </div>

                            <button
                              onClick={() => handleOpenRsvp(event)}
                              className={`w-full lg:w-auto px-6 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${styles.btn}`}
                            >
                              <span className="roll-text-container">
                                <span className="roll-text-top">
                                  {event.accessType.includes("Curated") ? "Request Invite" : "RSVP Spot"}
                                </span>
                                <span className="roll-text-bottom">Register Now →</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </CardTilt>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* "Host a Satellite Event" Banner (Mumbai Tech Week Pattern) */}
        <CardTilt className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#ffe7a5]/40 border-3 border-[#1e1e1e] google-card-shadow flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ffd427] border-2 border-[#1e1e1e] flex items-center justify-center shrink-0 animate-bounce">
              <Zap className="w-8 h-8 text-[#1e1e1e]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ccf6c5] border border-[#5cdb6d] text-[11px] font-black text-[#1e1e1e] mb-1.5">
                <span>⚡ Community Side Programme</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e1e1e]">
                Want to Host an Official Satellite Activation?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#5f6368] mt-1 max-w-xl">
                Are you a startup, co-working space, venture fund, or developer guild in Indore?
                Host a curated mixer, breakfast round table, or hack session officially listed on the DevFest Indore schedule.
              </p>
            </div>
          </div>

          <a
            href="mailto:organizers@gdgindore.in?subject=Proposal%20to%20Host%20DevFest%20Indore%20Satellite%20Event"
            className="shrink-0 px-8 py-3.5 rounded-2xl bg-[#1e1e1e] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-black hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Propose an Activation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </CardTilt>
      </div>

      {/* RSVP Modal Dialog */}
      {activeRsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1e1e1e] google-card-shadow relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveRsvpEvent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 font-bold text-sm hover:bg-[#e5e7eb] flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            {!rsvpSuccess ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccf6c5] border border-[#5cdb6d] text-xs font-black text-[#1e1e1e] mb-3">
                  <Calendar className="w-3.5 h-3.5 text-[#34a853]" />
                  <span>Satellite Event RSVP</span>
                </div>

                <h3 className="text-2xl font-black text-[#1e1e1e] mb-1">
                  {activeRsvpEvent.title}
                </h3>
                <p className="text-xs font-bold text-[#5f6368] mb-4">
                  {activeRsvpEvent.day} • {activeRsvpEvent.time}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#fafbfc] border border-gray-200 mb-5 text-xs text-[#5f6368]">
                  <div className="flex items-center gap-1.5 font-bold text-[#1e1e1e] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
                    <span>{activeRsvpEvent.venue}, {activeRsvpEvent.location}</span>
                  </div>
                  <p className="text-[11px]">{activeRsvpEvent.description}</p>
                </div>

                <form onSubmit={handleConfirmRsvp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1e1e1e] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyansh Mehta"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 text-xs font-bold text-[#1e1e1e] focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1e1e1e] mb-1">
                      Work Email / Contact
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 text-xs font-bold text-[#1e1e1e] focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1e1e1e] mb-1">
                      Why are you interested in this activation?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Founder scaling GenAI SaaS / HR Lead hiring tech talent"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium text-[#1e1e1e] focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#3367d6] cursor-pointer transition-all active:scale-95"
                  >
                    Confirm My RSVP Registration →
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#ccf6c5] border-2 border-[#34a853] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-9 h-9 text-[#34a853]" />
                </div>
                <h3 className="text-2xl font-black text-[#1e1e1e] mb-2">RSVP Confirmed! 🎉</h3>
                <p className="text-xs sm:text-sm text-[#5f6368] font-medium mb-6">
                  You are registered for <strong>{activeRsvpEvent.title}</strong>.
                  A calendar invite and venue check-in code has been sent to <strong>{attendeeEmail}</strong>!
                </p>
                <button
                  onClick={() => setActiveRsvpEvent(null)}
                  className="w-full py-3 rounded-xl bg-[#1e1e1e] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
