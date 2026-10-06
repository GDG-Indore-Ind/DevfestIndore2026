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
          headerBg: "bg-[#ffd427] text-black border-black",
          badge: "bg-[#f9ab00]/20 text-[#f9ab00] border-[#f9ab00]/40",
          accentText: "text-[#f9ab00]",
          borderAccent: "border-l-[#f9ab00]",
          btn: "bg-[#f9ab00] hover:bg-[#e09900] text-black",
        };
      case "blue":
        return {
          headerBg: "bg-[#57caff] text-black border-black",
          badge: "bg-[#4285f4]/20 text-[#4285f4] border-[#4285f4]/40",
          accentText: "text-[#4285f4]",
          borderAccent: "border-l-[#4285f4]",
          btn: "bg-[#4285f4] hover:bg-[#3367d6] text-white",
        };
      case "green":
        return {
          headerBg: "bg-[#5cdb6d] text-black border-black",
          badge: "bg-[#34a853]/20 text-[#34a853] border-[#34a853]/40",
          accentText: "text-[#34a853]",
          borderAccent: "border-l-[#34a853]",
          btn: "bg-[#34a853] hover:bg-[#2d9247] text-white",
        };
      case "red":
        return {
          headerBg: "bg-[#ff7daf] text-black border-black",
          badge: "bg-[#ea4335]/20 text-[#ea4335] border-[#ea4335]/40",
          accentText: "text-[#ea4335]",
          borderAccent: "border-l-[#ea4335]",
          btn: "bg-[#ea4335] hover:bg-[#d93025] text-white",
        };
      default:
        return {
          headerBg: "bg-white/10 text-white border-white/20",
          badge: "bg-white/10 text-white/70 border-white/15",
          accentText: "text-[#4285f4]",
          borderAccent: "border-l-[#4285f4]",
          btn: "bg-white text-black",
        };
    }
  };

  return (
    <section id="satellite-events" className="py-20 md:py-28 bg-[#000000] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#ea4335] animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Pre-DevFest Satellite Week • Nov 11 – 13
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Satellite Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">- Pre devfest Events Oct-November</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/55 font-medium leading-relaxed">
            Leading up to Saturday's flagship conference, DevFest Indore takes over the city!
            Join curated partner-hosted meetups, founder dinners, HR roundtables, creator summits, and hands-on workshops across Indore.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#f9ab00] bg-[#f9ab00]/15 px-4 py-1.5 rounded-full border border-[#f9ab00]/40">
            <span>One City • One Week • Central India Tech Surge</span>
          </div>
        </div>

        {/* Filter Pills Toolbar — dark glass */}
        <div className="bg-[#0d0d0d] border border-white/10 p-4 sm:p-5 rounded-3xl google-pill-shadow mb-12 reveal-on-scroll">
          <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-white/45">
            <Filter className="w-3.5 h-3.5 text-[#4285f4]" />
            <span>Filter By Activation Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border-2 cursor-pointer ${selectedCategory === cat
                  ? "bg-white text-black border-white google-pill-shadow scale-102"
                  : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date-Grouped Timeline */}
        <div className="space-y-12">
          {Object.entries(groupedEvents).map(([dayTitle, events], groupIdx) => {
            const firstEvent = events[0];
            const isHandsOnGroup = events.some((e) => e.category === "Hands-on Series Workshops");
            const dateBadgeColor =
              groupIdx === 0
                ? "bg-[#ffd427] text-black"
                : groupIdx === 1
                  ? "bg-[#57caff] text-black"
                  : "bg-[#ff7daf] text-black";

            return (
              <div key={dayTitle} className="transition-all duration-300">
                {/* Date Banner Header — keep solid Google colors (pop on dark) */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl border-2 border-black google-pill-shadow mb-4 ${dateBadgeColor}`}
                >
                  {isHandsOnGroup ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 bg-black text-[#ffd427] rounded-xl border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_rgba(255,212,39,0.5)]">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <div className="flex items-center gap-1.5 text-[12px] font-black tracking-tight">
                          <span className="bg-[#ffd427] text-black px-2 py-0.5 rounded-md font-black">10 SEP</span>
                          <span className="text-[#ffd427] text-lg leading-none">→</span>
                          <span className="bg-[#ffd427] text-black px-2 py-0.5 rounded-md font-black">25 OCT</span>
                          <span className="text-[#ffd427]/80 font-bold ml-0.5">2026</span>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-black/70 hidden sm:inline">
                        Hands-on Series Workshops
                      </span>
                    </div>
                  ) : (
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
                  )}

                  <span className="text-xs font-black uppercase tracking-wider bg-white/80 border border-black/30 px-3 py-1 rounded-full">
                    {events.length} Activation{events.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Events — dark glass cards */}
                <div className="space-y-4">
                  {events.map((event) => {
                    const styles = getColorStyles(event.color);

                    return (
                      <CardTilt
                        key={event.id}
                        className={`bg-[#0d0d0d] rounded-3xl p-5 sm:p-7 border border-white/10 google-card-shadow transition-all border-l-8 ${styles.borderAccent} hover:translate-x-1`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Time & Capacity Column */}
                          <div className="lg:col-span-3 flex flex-col gap-1.5 shrink-0">
                            <div className="inline-flex items-center gap-1.5 text-xs font-black text-white">
                              <Clock className="w-4 h-4 text-[#4285f4]" />
                              <span>{event.time}</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/45">
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
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/8 text-white/60 border border-white/10">
                                Host: {event.host}
                              </span>
                              <span className="text-[10px] font-bold text-white/40">
                                • {event.hostBadge}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
                              {event.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-white/65 font-medium leading-relaxed mb-3">
                              {event.description}
                            </p>

                            {/* Perks */}
                            <div className="flex flex-wrap gap-2">
                              {event.perks.map((perk, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                                >
                                  <Check className="w-3 h-3 text-[#34a853]" />
                                  <span>{perk}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right: Location & RSVP */}
                          <div className="lg:col-span-3 flex flex-col lg:items-end justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/8">
                            <div className="lg:text-right">
                              <div className="flex items-center lg:justify-end gap-1.5 text-xs font-black text-[#ea4335]">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span>{event.location}</span>
                              </div>
                              <span className="block text-[11px] font-semibold text-white/40 mt-0.5">
                                {event.venue}
                              </span>
                            </div>

                            {event.link?.trim() && (
                              <button
                                onClick={() => handleOpenRsvp(event)}
                                className={`w-full lg:w-auto px-6 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider border border-white/20 google-pill-shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${styles.btn}`}
                              >
                                <span className="roll-text-container">
                                  <span className="roll-text-top">
                                    {event.accessType.includes("Curated") ? "Request Invite" : "RSVP Spot"}
                                  </span>
                                  <span className="roll-text-bottom">Register Now →</span>
                                </span>
                              </button>
                            )}
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
      </div>

      {/* RSVP Modal — dark glass */}
      {activeRsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0d0d0d] border border-white/15 max-w-md w-full rounded-3xl p-6 sm:p-8 google-card-shadow relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveRsvpEvent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 border border-white/20 font-bold text-sm hover:bg-white/15 flex items-center justify-center cursor-pointer text-white"
            >
              ✕
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34a853]/20 border border-[#34a853]/40 text-xs font-black text-[#34a853] mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Satellite Event RSVP</span>
            </div>
            <iframe src={activeRsvpEvent.link} id="konfhub-widget" title="Register for HR Meetup" width="100%" height="400" allow="payment"></iframe>
            {/* {!rsvpSuccess ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34a853]/20 border border-[#34a853]/40 text-xs font-black text-[#34a853] mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Satellite Event RSVP</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">
                  {activeRsvpEvent.title}
                </h3>
                <p className="text-xs font-bold text-white/45 mb-4">
                  {activeRsvpEvent.day} • {activeRsvpEvent.time}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-5 text-xs text-white/55">
                  <div className="flex items-center gap-1.5 font-bold text-white mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
                    <span>{activeRsvpEvent.venue}, {activeRsvpEvent.location}</span>
                  </div>
                  <p className="text-[11px]">{activeRsvpEvent.description}</p>
                </div>

                <form onSubmit={handleConfirmRsvp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-white mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyansh Mehta"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] text-xs font-bold text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-white mb-1">
                      Work Email / Contact
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] text-xs font-bold text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-white mb-1">
                      Why are you interested in this activation?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Founder scaling GenAI SaaS / HR Lead hiring tech talent"
                      className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#1a1a1a] text-xs font-medium text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border border-[#4285f4]/50 shadow-[0_0_20px_rgba(66,133,244,0.4)] hover:bg-[#3367d6] cursor-pointer transition-all active:scale-95"
                  >
                    Confirm My RSVP Registration →
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#34a853]/20 border border-[#34a853]/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-9 h-9 text-[#34a853]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">RSVP Confirmed! 🎉</h3>
                <p className="text-xs sm:text-sm text-white/55 font-medium mb-6">
                  You are registered for <strong className="text-white">{activeRsvpEvent.title}</strong>.
                  A calendar invite and venue check-in code has been sent to <strong className="text-white">{attendeeEmail}</strong>!
                </p>
                <button
                  onClick={() => setActiveRsvpEvent(null)}
                  className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/90"
                >
                  Done
                </button>
              </div>
            )} */}
          </div>
        </div>
      )}
    </section>
  );
}
