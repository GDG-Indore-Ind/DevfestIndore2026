"use client";

import { useState } from "react";
import Image from "next/image";
import { EVENT_DETAILS } from "@/data/devfestData";
import {
  MapPin,
  Plane,
  Train,
  Car,
  Compass,
  ExternalLink,
  SunMedium,
  Rocket,
  Wifi,
  Users,
  Mic,
  Coffee,
} from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function VenueSection() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"air" | "train" | "cab">("air");

  const transitInfo = {
    air: {
      title: "From Devi Ahilyabai Holkar Airport (IDR)",
      desc: "Indore's modern airport connects directly to Delhi, Mumbai, Bengaluru, Hyderabad, and Dubai. Cabs (Uber, Ola, Rapido) take approx 25 minutes (14 km) via Super Corridor.",
      distance: "14 km (25-30 mins)",
    },
    train: {
      title: "From Indore Junction Railway Station",
      desc: "Well-connected with Vande Bharat and express superfast trains from across Central and Western India. Essentia Luxury Hotel Indore is located 7 km north via AB Road.",
      distance: "7 km (15-20 mins)",
    },
    cab: {
      title: "City Transit, Metro & Driving",
      desc: "Located strategically in Pipliyahana, Ring Road area. Easy access from Ring Road and Super Corridor. Free on-site parking available for 800+ attendees.",
      distance: "Pipliyahana, Ring Road",
    },
  };

  return (
    <section id="venue" className="py-20 md:py-28 bg-transparent relative overflow-hidden transition-colors">
      {/* Background Orbital Trajectory Graphics */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="25%" cy="30%" rx="420" ry="120" fill="none" stroke="#4285f4" strokeWidth="1.2" strokeDasharray="6 6" />
        <ellipse cx="85%" cy="75%" rx="380" ry="110" fill="none" stroke="#ea4335" strokeWidth="1" strokeDasharray="8 8" />
        <ellipse cx="50%" cy="90%" rx="520" ry="140" fill="none" stroke="#f9ab00" strokeWidth="0.8" strokeDasharray="10 10" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Rocket className="w-4 h-4 text-[#ea4335] animate-bounce" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"
              }`}>
              Mission Launchpad • Coordinates
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Meet Us at <span className="text-[#ea4335]">Essentia Luxury Launchpad</span>
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"
            }`}>
            Central India's premier event space featuring state-of-the-art acoustics,
            spacious auditorium halls, dedicated codelab arenas, and outdoor dining lawns.
          </p>
        </div>

        {/* 2-Column Showcase: Left Transit & Nav | Right Spaceport Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-7 reveal-on-scroll flex flex-col">
            <CardTilt className={`telemetry-card p-6 sm:p-8 rounded-3xl google-card-shadow flex flex-col justify-between h-full transition-all ${isDark ? "bg-[#0d0d0d]/90 border-white/15" : "!bg-white !border-gray-200/90 shadow-xl"
              }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-[#4285f4] uppercase tracking-wider">
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span>Launchpad Sector-01</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isDark ? "bg-white/10 text-white/60" : "bg-gray-100 text-gray-700"
                    }`}>
                    LAT 22.7196° N • LON 75.8577° E
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"
                  }`}>
                  Essentia Luxury Hotel Indore (ELH)
                </h3>
                <p className={`text-sm font-semibold mb-6 ${isDark ? "text-white/45" : "text-gray-500"
                  }`}>
                  Near World Cup Square, Pipliyahana, Ring Road, Indore, Madhya Pradesh 452018
                </p>

                <div className="mb-6">
                  <span className={`block text-xs font-mono font-black uppercase tracking-wider mb-3 ${isDark ? "text-white" : "text-gray-900"
                    }`}>
                    Navigation Transit Routes:
                  </span>
                  <div className={`flex gap-2 p-1.5 rounded-2xl mb-4 ${isDark ? "bg-white/5" : "bg-gray-100"
                    }`}>
                    <button
                      onClick={() => setActiveTab("air")}
                      className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "air"
                        ? isDark
                          ? "bg-[#111] text-white border border-white/20 scale-102 shadow-sm"
                          : "bg-white text-gray-900 border border-gray-300 scale-102 shadow-sm"
                        : isDark ? "text-white/40 hover:text-white" : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      <Plane className="w-3.5 h-3.5 text-[#4285f4]" />
                      <span>Flight Transit</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("train")}
                      className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "train"
                        ? isDark
                          ? "bg-[#111] text-white border border-white/20 scale-102 shadow-sm"
                          : "bg-white text-gray-900 border border-gray-300 scale-102 shadow-sm"
                        : isDark ? "text-white/40 hover:text-white" : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      <Train className="w-3.5 h-3.5 text-[#ea4335]" />
                      <span>Rail Transit</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("cab")}
                      className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "cab"
                        ? isDark
                          ? "bg-[#111] text-white border border-white/20 scale-102 shadow-sm"
                          : "bg-white text-gray-900 border border-gray-300 scale-102 shadow-sm"
                        : isDark ? "text-white/40 hover:text-white" : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      <Car className="w-3.5 h-3.5 text-[#34a853]" />
                      <span>Metro / Cab</span>
                    </button>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/8" : "bg-gray-50 border-gray-200"
                    }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className={`text-sm font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {transitInfo[activeTab].title}
                      </h4>
                      <span className="text-xs font-bold text-[#4285f4] bg-[#4285f4]/15 px-2.5 py-0.5 rounded-full">
                        {transitInfo[activeTab].distance}
                      </span>
                    </div>
                    <p className={`text-xs font-medium leading-relaxed ${isDark ? "text-white/55" : "text-gray-600"
                      }`}>
                      {transitInfo[activeTab].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-bold ${isDark ? "border-white/8 text-white/70" : "border-gray-200 text-gray-700"
                }`}>
                <span className="flex items-center gap-1.5">
                  <SunMedium className="w-4 h-4 text-[#f9ab00] animate-spin-slow" />
                  <span>November Weather: Pleasant 24°C</span>
                </span>
                <a
                  href={EVENT_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#4285f4] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardTilt>
          </div >

          < div className="lg:col-span-5 reveal-on-scroll flex flex-col" >
            <CardTilt className={`telemetry-card p-6 sm:p-7 rounded-3xl google-card-shadow flex flex-col justify-between h-full transition-all ${isDark ? "bg-[#0d0d0d]/90 border-white/15" : "!bg-white !border-gray-200/90 shadow-xl"
              }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-ping" />
                    <span className="text-xs font-mono font-bold text-[#34a853] uppercase tracking-wider">
                      Launchpad Status: Active
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${isDark ? "bg-white/5 border-white/10 text-white/70" : "bg-gray-100 border-gray-200 text-gray-700"
                    }`}>
                    ORION // ELH-01
                  </span>
                </div>

                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white p-2 border border-gray-200/80 shadow-inner group mb-5">
                  <Image
                    src="/images/venue-spaceport-illustration.jpg"
                    alt="DevFest Indore Essentia Luxury Hotel Spaceport Launchpad Illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-mono font-bold border border-white/20 backdrop-blur-md">
                    🚀 SPACEPORT OBSERVATORY & ARENA
                  </div>
                </div>

                <h4 className={`text-lg font-black mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Essentia Spaceport Arena & Amphitheatre
                </h4>
                <p className={`text-xs font-medium leading-relaxed mb-5 ${isDark ? "text-white/60" : "text-gray-600"
                  }`}>
                  Engineered for seamless interplanetary developer collaboration with dedicated keynote auditoriums, interactive workshops, and high-speed telemetry connectivity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-black/5 dark:border-white/10">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Users className="w-4 h-4 text-[#4285f4] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      800+ Devs
                    </span>
                    <span className={`block text-[10px] font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      Full Arena Capacity
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Wifi className="w-4 h-4 text-[#34a853] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      Gigabit WiFi
                    </span>
                    <span className={`block text-[10px] font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      Quantum Link Speed
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Mic className="w-4 h-4 text-[#ea4335] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      3 Tech Tracks
                    </span>
                    <span className={`block text-[10px] font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      Parallel Keynotes
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Coffee className="w-4 h-4 text-[#f9ab00] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      Cosmic Dining
                    </span>
                    <span className={`block text-[10px] font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      Catered Lunch Lawns
                    </span>
                  </div>
                </div>
              </div>
            </CardTilt>
          </div >
        </div>
      </div >
    </section >
  );
}
