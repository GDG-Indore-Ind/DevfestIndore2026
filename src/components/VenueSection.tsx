"use client";

import { useState } from "react";
import { EVENT_DETAILS } from "@/data/devfestData";
import {
  MapPin,
  Plane,
  Train,
  Car,
  Compass,
  ExternalLink,
  SunMedium,
} from "lucide-react";
import CardTilt from "./CardTilt";

export default function VenueSection() {
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
    <section id="venue" className="py-20 md:py-28 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <MapPin className="w-4 h-4 text-[#ea4335]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Venue & Location
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Meet Us at <span className="text-[#ea4335]">Essentia Luxury Hotel Indore</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            Central India's premier event destination featuring state-of-the-art acoustics,
            spacious auditorium halls, dedicated codelab arenas, and outdoor dining lawns.
          </p>
        </div>

        {/* Venue Information — Full Width */}
        <div className="max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <CardTilt className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-[#1e1e1e] google-card-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#4285f4] uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>Conference Destination</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] mb-2">
                Essentia Luxury Hotel Indore (ELH)
              </h3>
              <p className="text-sm font-semibold text-[#5f6368] mb-6">
                Near World Cup Square, Pipliyahana, Ring Road, Indore, Madhya Pradesh 452018
              </p>

              {/* Transit Tabs */}
              <div className="mb-6">
                <span className="block text-xs font-black uppercase tracking-wider text-[#1e1e1e] mb-3">
                  How to Reach the Venue:
                </span>
                <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl mb-4">
                  <button
                    onClick={() => setActiveTab("air")}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "air"
                        ? "bg-white text-[#1e1e1e] shadow-sm border border-gray-300 scale-102"
                        : "text-[#5f6368] hover:text-[#1e1e1e]"
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 text-[#4285f4]" />
                    <span>By Flight</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("train")}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "train"
                        ? "bg-white text-[#1e1e1e] shadow-sm border border-gray-300 scale-102"
                        : "text-[#5f6368] hover:text-[#1e1e1e]"
                    }`}
                  >
                    <Train className="w-3.5 h-3.5 text-[#ea4335]" />
                    <span>By Train</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("cab")}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "cab"
                        ? "bg-white text-[#1e1e1e] shadow-sm border border-gray-300 scale-102"
                        : "text-[#5f6368] hover:text-[#1e1e1e]"
                    }`}
                  >
                    <Car className="w-3.5 h-3.5 text-[#34a853]" />
                    <span>Cab & Metro</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#fafbfc] border border-gray-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-black text-[#1e1e1e]">
                      {transitInfo[activeTab].title}
                    </h4>
                    <span className="text-xs font-bold text-[#4285f4] bg-[#c3ecf6] px-2 py-0.5 rounded">
                      {transitInfo[activeTab].distance}
                    </span>
                  </div>
                  <p className="text-xs text-[#5f6368] font-medium leading-relaxed">
                    {transitInfo[activeTab].desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather & Facilities */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1e1e1e]">
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
        </div>
      </div>
    </section>
  );
}
