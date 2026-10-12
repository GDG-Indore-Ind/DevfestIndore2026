"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Award, ArrowLeft } from "lucide-react";
import { PastSpeaker } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { getPastSpeakers } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PastSpeakersPage() {
  const [speakers, setSpeakers] = useState<PastSpeaker[]>(DEV_FEST_PAST_SPEAKERS_FULL);
  const [selectedYear, setSelectedYear] = useState<string>("All");

  useEffect(() => {
    getPastSpeakers().then((res) => {
      if (res && res.length > 0) {
        setSpeakers(res);
      }
    });
  }, []);

  const years = ["All", "2024", "2023", "2022"];

  const filteredSpeakers =
    selectedYear === "All"
      ? speakers
      : speakers.filter((s) => s.year === selectedYear);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e1e1e] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
              <Award className="w-3.5 h-3.5 text-[#f9ab00]" />
              <span>Hall of Fame & Alumni</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#1e1e1e] tracking-tight mb-4">
              Previous Speakers & Spotlights
            </h1>
            <p className="text-base sm:text-lg text-[#5f6368] leading-relaxed">
              Honoring world-class Google Developer Experts, aerospace pioneers, and architects who have inspired thousands of engineers on the DevFest Indore stage.
            </p>
          </div>

          {/* Year Filter */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedYear === year
                    ? "bg-[#1e1e1e] text-white shadow-md"
                    : "bg-white text-[#5f6368] border border-gray-200 hover:border-gray-400"
                }`}
              >
                {year === "All" ? "All Editions" : `DevFest ${year}`}
              </button>
            ))}
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpeakers.map((sp) => (
              <div
                key={sp.id}
                className="p-5 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#1e1e1e] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                      {sp.year}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#1e1e1e] mb-0.5">
                    {sp.name}
                  </h3>
                  <div className="text-xs font-bold text-[#4285f4] mb-1">
                    {sp.role}
                  </div>
                  <div className="text-[11px] text-[#5f6368] font-semibold mb-3">
                    {sp.company}
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#1e1e1e]">
                    "{sp.topic}"
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-[11px]">
                  <span className="text-[#34a853] font-bold">
                    {sp.spotlightBadge}
                  </span>
                  <span className="text-[#5f6368] font-bold">
                    {sp.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
