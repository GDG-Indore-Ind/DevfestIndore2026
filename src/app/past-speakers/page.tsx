"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Award, ArrowLeft } from "lucide-react";
import { PastSpeaker } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { getPastSpeakers } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { TwitterIcon, LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from "@/components/SocialIcons";

export default function PastSpeakersPage() {
  const { isDark } = useTheme();
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
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? "bg-[#000000] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
    }`}>
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm mb-4 border ${
              isDark ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-200 text-[#1e1e1e]"
            }`}>
              <Award className="w-3.5 h-3.5 text-[#f9ab00]" />
              <span>Hall of Fame & Alumni</span>
            </div>
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-[#1e1e1e]"}`}>
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

                <div className={`pt-4 border-t mt-4 flex items-center justify-between text-[11px] ${
                  isDark ? "border-white/10" : "border-gray-100"
                }`}>
                  <span className="text-[#34a853] font-bold">
                    {sp.spotlightBadge}
                  </span>

                  {sp.socials && (
                    <div className="flex items-center gap-1.5">
                      {sp.socials.linkedin && (
                        <a
                          href={sp.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#4285f4] hover:text-white transition-colors"
                          aria-label={`${sp.name} LinkedIn`}
                        >
                          <LinkedInIcon className="w-3 h-3" />
                        </a>
                      )}
                      {sp.socials.twitter && (
                        <a
                          href={sp.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#ea4335] hover:text-white transition-colors"
                          aria-label={`${sp.name} Twitter / X`}
                        >
                          <TwitterIcon className="w-3 h-3" />
                        </a>
                      )}
                      {sp.socials.github && (
                        <a
                          href={sp.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-black hover:text-white transition-colors"
                          aria-label={`${sp.name} GitHub`}
                        >
                          <GithubIcon className="w-3 h-3" />
                        </a>
                      )}
                      {sp.socials.instagram && (
                        <a
                          href={sp.socials.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#e1306c] hover:text-white transition-colors"
                          aria-label={`${sp.name} Instagram`}
                        >
                          <InstagramIcon className="w-3 h-3" />
                        </a>
                      )}
                      {sp.socials.email && (
                        <a
                          href={sp.socials.email}
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#34a853] hover:text-white transition-colors"
                          aria-label={`${sp.name} Email`}
                        >
                          <MailIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
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
