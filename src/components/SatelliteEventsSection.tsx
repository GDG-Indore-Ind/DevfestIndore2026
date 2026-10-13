"use client";

import { useState } from "react";
import Image from "next/image";
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
  Radio,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function SatelliteEventsSection() {
  const { isDark } = useTheme();
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
    <section id="satellite-events" className="py-12 md:py-16 bg-transparent relative overflow-hidden border-t border-black/10 dark:border-white/10 transition-colors">
      {/* Background Orbital Trajectory Graphics */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80%" cy="20%" rx="380" ry="110" fill="none" stroke="#4285f4" strokeWidth="1.2" strokeDasharray="6 6" />
        <ellipse cx="20%" cy="65%" rx="440" ry="130" fill="none" stroke="#ea4335" strokeWidth="1" strokeDasharray="8 8" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Orbital Satellite Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Radio className="w-4 h-4 text-[#4285f4] animate-pulse" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Orbital Satellite Activations • Sep 11 – Nov 28
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            <span className={isDark ? "text-white" : "text-gray-900"}>Satellite Missions</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
              & Citywide Meetups
            </span>
          </h2>

          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            isDark ? "text-white/80" : "text-gray-700"
          }`}>
            Leading up to the main flight on Nov 28, DevFest Indore takes over the city!
            Join partner-hosted satellite meetups, founder dinners, HR roundtables, and hands-on codelabs across Indore.
          </p>
        </div>

        {/* Space Satellite Feature Showcase Card */}
        <div className="mb-14 reveal-on-scroll">
          <CardTilt className={`rounded-3xl p-6 sm:p-8 border overflow-hidden transition-all shadow-xl ${
            isDark
              ? "bg-[#0a0a0a]/90 border-white/15 shadow-[0_0_40px_rgba(66,133,244,0.15)]"
              : "!bg-white !border-gray-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Satellite Illustration */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-white p-2 border border-gray-200/80 shadow-inner group">
                  <Image
                    src="/images/satellite-space-illustration.jpg"
                    alt="DevFest Indore Satellite Space Mission Illustration beaming data to Earth"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />
                  {/* Floating Telemetry Chip */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-mono font-bold border border-white/20 backdrop-blur-md">
                    🛰️ COMMSAT-01 // ORBIT
                  </div>
                </div>
              </div>

              {/* Right Column: Mission Details */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-ping" />
                  <span className="text-xs font-mono font-bold text-[#34a853] uppercase tracking-wider">
                    Orbital Signal: Active & Beaming
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Beaming Tech Across Indore's Ecosystem
                </h3>

                <p className={`text-sm sm:text-base font-normal leading-relaxed mb-5 ${
                  isDark ? "text-white/85" : "text-gray-700"
                }`}>
                  DevFest Indore isn't just a 1-day event — it's an entire season of satellite activations.
                  From AI workshops at IT parks to deep-tech roundtables in Super Corridor, explore the schedule below.
                </p>

                {/* Satellite Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                    <span className="block text-xl sm:text-2xl font-black text-[#4285f4]">6+</span>
                    <span className={`text-xs font-bold uppercase ${
                      isDark ? "text-white/80" : "text-gray-700"
                    }`}>
                      Satellite Nodes
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                    <span className="block text-xl sm:text-2xl font-black text-[#ea4335]">800+</span>
                    <span className={`text-xs font-bold uppercase ${
                      isDark ? "text-white/80" : "text-gray-700"
                    }`}>
                      Pre-Event Devs
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${
                    isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                    <span className="block text-xl sm:text-2xl font-black text-[#34a853]">100%</span>
                    <span className={`text-xs font-bold uppercase ${
                      isDark ? "text-white/80" : "text-gray-700"
                    }`}>
                      Community Free
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Filter Pills Toolbar — space telemetry glass */}
        <div className={`telemetry-card p-4 sm:p-5 rounded-3xl google-pill-shadow mb-12 reveal-on-scroll ${
          isDark ? "bg-[#0d0d0d]/90 border-white/10" : "!bg-white !border-gray-200/90 shadow-md"
        }`}>
          <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#4285f4]" />
            <span className={isDark ? "text-white/85" : "text-gray-800"}>Filter By Activation Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all border-2 cursor-pointer shadow-sm ${
                  selectedCategory === cat
                    ? isDark
                      ? "bg-white text-black border-white shadow-md scale-102"
                      : "bg-[#111827] text-white border-[#111827] shadow-md scale-102"
                    : isDark
                      ? "bg-white/5 text-white/90 border-white/15 hover:bg-white/10 hover:text-white"
                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100 hover:text-black"
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

                  <span className="text-xs font-black uppercase tracking-wider bg-white/80 border border-black/30 px-3 py-1 rounded-full text-black">
                    {events.length} Activation{events.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Events — glass/white cards */}
                <div className="space-y-4">
                  {events.map((event) => {
                    const styles = getColorStyles(event.color);

                    return (
                      <CardTilt
                        key={event.id}
                        className={`rounded-3xl p-5 sm:p-7 border google-card-shadow transition-all border-l-8 ${styles.borderAccent} hover:translate-x-1 ${
                          isDark
                            ? "bg-[#0d0d0d] border-white/10"
                            : "!bg-white !border-gray-200/90 shadow-md"
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Time & Capacity Column */}
                          <div className="lg:col-span-3 flex flex-col gap-1.5 shrink-0">
                            <div className={`inline-flex items-center gap-1.5 text-xs font-black ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}>
                              <Clock className="w-4 h-4 text-[#4285f4]" />
                              <span>{event.time}</span>
                            </div>

                            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                              isDark ? "text-white/75" : "text-gray-600"
                            }`}>
                              <Users className="w-3.5 h-3.5 text-[#34a853]" />
                              <span>{event.capacity}</span>
                            </div>

                            <div className="mt-1">
                              <span
                                className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${styles.badge}`}
                              >
                                {event.accessType}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Host, Title, Description, Perks */}
                          <div className="lg:col-span-6 flex flex-col">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                isDark
                                  ? "bg-white/8 text-white/80 border-white/10"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              }`}>
                                Host: {event.host}
                              </span>
                              <span className={`text-xs font-medium ${
                                isDark ? "text-white/65" : "text-gray-500"
                              }`}>
                                • {event.hostBadge}
                              </span>
                            </div>

                            <h3 className={`text-xl sm:text-2xl font-black leading-snug mb-2 ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}>
                              {event.title}
                            </h3>

                            <p className={`text-sm font-normal leading-relaxed mb-3 ${
                              isDark ? "text-white/85" : "text-gray-700"
                            }`}>
                              {event.description}
                            </p>

                            {/* Perks */}
                            <div className="flex flex-wrap gap-2">
                              {event.perks.map((perk, i) => (
                                <span
                                  key={i}
                                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-md border ${
                                    isDark
                                      ? "bg-white/5 border-white/10 text-white/85"
                                      : "bg-gray-50 border-gray-200 text-gray-700"
                                  }`}
                                >
                                  <Check className="w-3 h-3 text-[#34a853]" />
                                  <span>{perk}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right: Location & RSVP */}
                          <div className={`lg:col-span-3 flex flex-col lg:items-end justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 ${
                            isDark ? "border-white/8" : "border-gray-200"
                          }`}>
                            <div className="lg:text-right">
                              <div className="flex items-center lg:justify-end gap-1.5 text-xs font-black text-[#ea4335]">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span>{event.location}</span>
                              </div>
                              <span className={`block text-xs sm:text-[13px] font-medium mt-0.5 ${
                                isDark ? "text-white/75" : "text-gray-600"
                              }`}>
                                {event.venue}
                              </span>
                            </div>

                            {event.link?.trim() && (
                              <button
                                onClick={() => handleOpenRsvp(event)}
                                className={`w-full lg:w-auto px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-[13px] uppercase tracking-wider border border-white/20 google-pill-shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${styles.btn}`}
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
