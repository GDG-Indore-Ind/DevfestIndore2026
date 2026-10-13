"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Mic2,
  Play,
  Terminal,
  Code2,
  ChevronRight,
  Layers,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, GithubIcon } from "./SocialIcons";
import { INITIAL_TEAM, TeamMember } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { getTeamMembers } from "@/lib/firestoreService";
import { useTheme } from "@/contexts/ThemeContext";
import CardTilt from "./CardTilt";

export default function FeaturedTeamSection() {
  const { isDark } = useTheme();
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isHoveredTicker, setIsHoveredTicker] = useState(false);

  useEffect(() => {
    getTeamMembers().then((res) => {
      if (res && res.length > 0) setTeam(res);
    });
  }, []);

  const featuredLeads = team.slice(0, 3);
  const speakers = DEV_FEST_PAST_SPEAKERS_FULL;

  return (
    <section id="community-leaders" className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
              <Users className="w-4 h-4 text-[#34a853]" />
              <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
                Organizing Steering Committee
              </span>
              <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className={isDark ? "text-white" : "text-gray-900"}>Meet the</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
                Organizing Leads
              </span>
            </h2>
            <p className={`mt-2 text-sm sm:text-base font-normal max-w-2xl ${isDark ? "text-white/80" : "text-gray-700"}`}>
              The core pioneers driving developer community growth, deep-tech research, and conference operations for Central India.
            </p>
          </div>

          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase border-2 transition-all group shrink-0 shadow-sm hover:scale-105 active:scale-95 bg-white text-gray-900 border-gray-900 dark:bg-white dark:text-black dark:border-white"
          >
            <span>View All Organizers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Main Featured Cards: Tushar Pal, Akash Gangrade, Karan Mittal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-on-scroll">
          {featuredLeads.map((member, idx) => {
            const accentColors = [
              { border: "border-t-[#4285f4]", badge: "bg-[#4285f4]/15 text-[#4285f4] border-[#4285f4]/30" },
              { border: "border-t-[#ea4335]", badge: "bg-[#ea4335]/15 text-[#ea4335] border-[#ea4335]/30" },
              { border: "border-t-[#34a853]", badge: "bg-[#34a853]/15 text-[#34a853] border-[#34a853]/30" },
            ];
            const accent = accentColors[idx % accentColors.length];

            return (
              <CardTilt
                key={member.id}
                className={`rounded-3xl p-6 sm:p-7 border-2 border-t-4 ${accent.border} flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  isDark
                    ? "bg-[#0d0d0d]/90 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    : "bg-white border-gray-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                }`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 border border-black/10 dark:border-white/10 group">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${accent.badge}`}>
                        {member.team}
                      </span>
                    </div>
                  </div>

                  <h3 className={`text-2xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {member.name}
                  </h3>
                  <div className="text-xs font-black text-[#4285f4] mb-3 uppercase tracking-wider">
                    {member.role}
                  </div>
                  <p className={`text-xs sm:text-sm font-normal leading-relaxed mb-6 ${isDark ? "text-white/75" : "text-gray-600"}`}>
                    {member.bio}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${isDark ? "border-white/10" : "border-gray-100"}`}>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? "text-white/60" : "text-gray-500"}`}>
                    Core Organizer • 2026
                  </span>
                  <div className="flex items-center gap-2">
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#4285f4] hover:text-white transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#ea4335] hover:text-white transition-colors"
                        aria-label={`${member.name} X`}
                      >
                        <TwitterIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-black hover:text-white transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </div>

        {/* Continuous Scrolling Keynote Past Speakers Marquee Strip */}
        <div className={`rounded-3xl p-6 sm:p-8 border-2 transition-all ${
          isDark
            ? "bg-[#0a0a0a]/90 border-white/10 shadow-lg"
            : "bg-white border-gray-200/90 shadow-md"
        } reveal-on-scroll`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#f9ab00]/15 text-[#f9ab00] flex items-center justify-center">
                <Mic2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-lg sm:text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                  Hall of Past Keynote Speakers
                </h3>
                <p className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  Continuous alumni stream from previous flagship DevFest editions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ● 40+ Industry Pioneers
              </span>
              <Link
                href="/past-speakers"
                className="text-xs font-bold text-[#4285f4] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View All Speakers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Continuous Running Marquee Tracks */}
          <div
            className="overflow-hidden relative mask-fade-edges"
            onMouseEnter={() => setIsHoveredTicker(true)}
            onMouseLeave={() => setIsHoveredTicker(false)}
          >
            <div
              className={`flex gap-5 w-max py-2 ${
                isHoveredTicker ? "" : "animate-marquee"
              }`}
            >
              {[...speakers, ...speakers].map((sp, index) => (
                <div
                  key={`${sp.id}-${index}`}
                  className={`w-72 sm:w-80 shrink-0 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                      <Image
                        src={sp.avatar}
                        alt={sp.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-black truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                        {sp.name}
                      </h4>
                      <p className="text-[11px] text-[#4285f4] font-bold truncate">
                        {sp.company}
                      </p>
                      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                        Edition {sp.year}
                      </span>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-xl text-[11px] font-medium leading-snug line-clamp-2 ${
                    isDark ? "bg-black/40 text-white/80" : "bg-white text-gray-700 border border-gray-200/60"
                  }`}>
                    "{sp.topic}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
