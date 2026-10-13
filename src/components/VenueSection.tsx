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
    <section id="venue" className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors">
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
          <p className={`mt-4 text-base sm:text-lg font-medium leading-relaxed ${isDark ? "text-white/85" : "text-gray-700"
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
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isDark ? "bg-white/10 text-white/75" : "bg-gray-100 text-gray-700"
                    }`}>
                    22.7101° N • 75.9039° E
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"
                  }`}>
                  Essentia Luxury Hotel Indore (ELH)
                </h3>
                <p className={`text-xs sm:text-sm font-semibold mb-4 ${isDark ? "text-white/75" : "text-gray-600"
                  }`}>
                  Near World Cup Square, Pipliyahana, Ring Road, Indore, Madhya Pradesh 452018
                </p>

                {/* Google Map Embedded Iframe */}
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123142.96350579694!2d75.75139283517477!3d22.710130499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3402b359321%3A0xffdc3966fe3eebc9!2sEssentia%20Luxury%20Hotel%20Indore!5e1!3m2!1sen!2sin!4v1791855892034!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Essentia Luxury Hotel Indore Google Map Location"
                    className="w-full h-full block"
                  />
                </div>
              </div>

              <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] font-bold ${isDark ? "border-white/10 text-white/85" : "border-gray-200 text-gray-800"
                }`}>
                <span className="flex items-center gap-1.5">
                  <SunMedium className="w-4 h-4 text-[#f9ab00] animate-spin-slow" />
                  <span>November Weather: Pleasant 24°C</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Essentia+Luxury+Hotel+Indore"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#4285f4] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardTilt>
          </div>

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

                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-md group mb-5">
                  <Image
                    src="/images/essentia-hotel-actual.jpg"
                    alt="Essentia Luxury Hotel Indore - Official Venue"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-mono font-bold border border-white/20 backdrop-blur-md">
                    OFFICIAL CONVENTION VENUE
                  </div>
                </div>

                <h4 className={`text-lg font-black mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Essentia Luxury Convention Arena
                </h4>
                <p className={`text-sm font-normal leading-relaxed mb-5 ${isDark ? "text-white/85" : "text-gray-700"
                  }`}>
                  Central India's premier hospitality and conference destination. Equipped with acoustic auditoriums, executive breakout suites, state-of-the-art audiovisual infrastructure, and sprawling banqueting lawns.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-black/5 dark:border-white/10">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Users className="w-4 h-4 text-[#4285f4] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      600+ Leaders
                    </span>
                    <span className={`block text-[11px] sm:text-xs font-medium ${isDark ? "text-white/75" : "text-gray-600"}`}>
                      Auditorium Capacity
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Wifi className="w-4 h-4 text-[#34a853] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      High-Density Wi-Fi
                    </span>
                    <span className={`block text-[11px] sm:text-xs font-medium ${isDark ? "text-white/75" : "text-gray-600"}`}>
                      Dedicated Enterprise Pipe
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}>
                  <Mic className="w-4 h-4 text-[#ea4335] shrink-0" />
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      Parallel Halls
                    </span>
                    <span className={`block text-[11px] sm:text-xs font-medium ${isDark ? "text-white/75" : "text-gray-600"}`}>
                      Main Keynotes & Codelabs
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
                    <span className={`block text-[11px] sm:text-xs font-medium ${isDark ? "text-white/75" : "text-gray-600"}`}>
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
