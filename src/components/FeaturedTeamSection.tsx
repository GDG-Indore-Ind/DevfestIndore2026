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
  Calendar,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from "./SocialIcons";
import { INITIAL_TEAM, TeamMember } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { getTeamMembers } from "@/lib/firestoreService";
import { useTheme } from "@/contexts/ThemeContext";
import CardTilt from "./CardTilt";

export default function FeaturedTeamSection() {
  const { isDark } = useTheme();
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isHoveredTicker, setIsHoveredTicker] = useState(false);
  const [selectedMarqueeYear, setSelectedMarqueeYear] = useState<"All" | "2025" | "2024">("All");

  useEffect(() => {
    getTeamMembers().then((res) => {
      if (res && res.length > 0) setTeam(res);
    });
  }, []);

  const featuredLeads = team.slice(0, 3);
  const allSpeakers = DEV_FEST_PAST_SPEAKERS_FULL;
  const filteredMarqueeSpeakers =
    selectedMarqueeYear === "All"
      ? allSpeakers
      : allSpeakers.filter((s) => s.year === selectedMarqueeYear);

  return (
    <section id="community-leaders" className="py-8 md:py-10 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CURRENT SPEAKERS: "COMING SOON" CURATION SPOTLIGHT CARD */}
        <div className="mb-10 reveal-on-scroll">
          <CardTilt
            className={`p-6 sm:p-10 rounded-3xl border-2 transition-all relative overflow-hidden ${
              isDark
                ? "bg-[#0d0d0d]/90 border-white/15 shadow-[0_0_50px_rgba(66,133,244,0.15)]"
                : "bg-white border-blue-200/90 shadow-[0_15px_40px_rgba(66,133,244,0.08)]"
            }`}
          >
            {/* Top Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ea4335]/15 text-[#ea4335] flex items-center justify-center font-bold">
                  <Mic2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ea4335]">
                    <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-ping" />
                    <span>CURATION IN PROGRESS</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                    DevFest Indore 2026 Speakers — Coming Soon!
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border ${
                  isDark ? "bg-white/5 border-white/15 text-white/80" : "bg-gray-100 border-gray-300 text-gray-800"
                }`}>
                  ✦ Announcement: Wave 1 Dropping Soon
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/85" : "text-gray-700"}`}>
                  We are curating an electrifying lineup of Google Developer Experts, aerospace pioneers from Space Club of India, AI researchers, and engineering leads from Silicon Valley and Central India.
                </p>
                <p className={`text-xs sm:text-sm mt-2 font-medium ${isDark ? "text-white/60" : "text-gray-500"}`}>
                  Have an innovative architecture, AI workflow, or aerospace case study to present? Our Call for Speakers is officially open on Sessionize!
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <a
                  href="https://sessionize.com/devfest-indore-2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#ea4335] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#d93025] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Talk (CFP)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/past-speakers"
                  className={`px-5 py-3 rounded-full text-xs sm:text-[13px] font-black uppercase tracking-wider border flex items-center gap-2 hover:scale-105 transition-all cursor-pointer ${
                    isDark ? "bg-white/10 border-white/20 text-white hover:bg-white/15" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50 shadow-xs"
                  }`}
                >
                  <span>View Past Speakers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Section Header: Steering Committee */}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase border-2 transition-all group shrink-0 shadow-sm hover:scale-105 active:scale-95 bg-white text-gray-900 border-gray-900 dark:bg-white dark:text-black dark:border-white cursor-pointer"
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
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {member.socials?.linkedin && member.socials.linkedin.trim() !== "" && (
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
                    {member.socials?.twitter && member.socials.twitter.trim() !== "" && (
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
                    {member.socials?.github && member.socials.github.trim() !== "" && (
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
                    {member.socials?.instagram && member.socials.instagram.trim() !== "" && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#e1306c] hover:text-white transition-colors"
                        aria-label={`${member.name} Instagram`}
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials?.email && member.socials.email.trim() !== "" && (
                      <a
                        href={member.socials.email.startsWith("mailto:") ? member.socials.email : `mailto:${member.socials.email}`}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-[#34a853] hover:text-white transition-colors"
                        aria-label={`${member.name} Email`}
                      >
                        <MailIcon className="w-3.5 h-3.5" />
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

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Year Toggle Pills */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10">
                {(["All", "2025", "2024"] as const).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedMarqueeYear(year)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedMarqueeYear === year
                        ? "bg-[#4285f4] text-white shadow-sm scale-105"
                        : isDark
                        ? "text-white/70 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {year === "All" ? "All (29)" : `Edition ${year}`}
                  </button>
                ))}
              </div>

              <Link
                href="/past-speakers"
                className="text-xs font-bold text-[#4285f4] hover:underline flex items-center gap-1 shrink-0 cursor-pointer ml-1"
              >
                <span>View All 29 Speakers</span>
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
              {[...filteredMarqueeSpeakers, ...filteredMarqueeSpeakers].map((sp, index) => (
                <div
                  key={`${sp.id}-${index}`}
                  className={`w-[360px] sm:w-[410px] shrink-0 p-5 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${
                    isDark
                      ? "bg-[#0d0d0d] border-white/10 hover:border-[#4285f4]/50 shadow-xl"
                      : "bg-white border-gray-200 hover:border-[#4285f4] shadow-md hover:shadow-xl"
                  }`}
                >
                  <div>
                    {/* Top Row: Large Speaker Avatar + Compact Typography */}
                    <div className="flex items-start gap-4 mb-3.5">
                      {/* Significantly Larger Speaker Avatar (w-24 h-24 sm:w-26 sm:h-26) */}
                      <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-2xl overflow-hidden shrink-0 border-2 border-black/10 dark:border-white/15 shadow-md bg-gray-100 dark:bg-zinc-800">
                        <Image
                          src={sp.avatar}
                          alt={sp.name}
                          fill
                          sizes="110px"
                          className="object-cover"
                          unoptimized
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-xs text-[9px] font-black text-white">
                          {sp.year}
                        </span>
                      </div>

                      {/* Compact Typography Hierarchy */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#4285f4]/10 text-[#4285f4] border border-[#4285f4]/30 truncate max-w-[140px]">
                            {sp.spotlightBadge || "Keynote Speaker"}
                          </span>
                          {sp.track && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                              {sp.track}
                            </span>
                          )}
                        </div>
                        <h4 className={`text-base sm:text-lg font-black truncate leading-tight mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {sp.name}
                        </h4>
                        <p className="text-[11px] text-[#4285f4] font-bold truncate">
                          {sp.role}
                        </p>
                        {sp.company && (
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate mt-0.5">
                            {sp.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Talk Box - Compacted with smaller font */}
                    <div className={`p-2.5 rounded-2xl text-[11px] font-medium leading-snug mb-3 border ${
                      isDark
                        ? "bg-white/[0.04] text-white/90 border-white/10"
                        : "bg-gray-50 text-gray-800 border-gray-200"
                    }`}>
                      <span className="block text-[9px] font-black uppercase text-[#ea4335] mb-0.5">
                        Session Topic:
                      </span>
                      <p className="font-semibold line-clamp-2 text-xs">
                        "{sp.topic}"
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Social Media Links (Only show filled links) */}
                  <div className={`pt-2.5 border-t flex items-center justify-between text-xs ${
                    isDark ? "border-white/10 text-white/60" : "border-gray-100 text-gray-500"
                  }`}>
                    <span className="text-[10px] font-bold text-[#34a853]">
                      DevFest Alumni
                    </span>
                    <div className="flex items-center gap-1.5">
                      {sp.socials?.linkedin && sp.socials.linkedin.trim() !== "" && (
                        <a
                          href={sp.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-blue-500/10 text-[#4285f4] hover:bg-[#4285f4] hover:text-white transition-colors"
                          title="LinkedIn Profile"
                          aria-label={`${sp.name} LinkedIn`}
                        >
                          <LinkedInIcon className="w-3 h-3 fill-current" />
                        </a>
                      )}
                      {sp.socials?.twitter && sp.socials.twitter.trim() !== "" && (
                        <a
                          href={sp.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-gray-500/10 text-gray-700 dark:text-gray-200 hover:bg-black hover:text-white transition-colors"
                          title="Twitter / X"
                          aria-label={`${sp.name} Twitter`}
                        >
                          <TwitterIcon className="w-3 h-3 fill-current" />
                        </a>
                      )}
                      {sp.socials?.blog && sp.socials.blog.trim() !== "" && (
                        <a
                          href={sp.socials.blog}
                          target="_blank"
                          rel="noreferrer"
                          className="px-1.5 h-6 rounded-lg flex items-center justify-center bg-amber-500/10 text-[#f9ab00] hover:bg-[#f9ab00] hover:text-white transition-colors text-[9px] font-bold"
                          title="Blog / Medium"
                          aria-label={`${sp.name} Blog`}
                        >
                          Blog
                        </a>
                      )}
                      {sp.socials?.website && sp.socials.website.trim() !== "" && (
                        <a
                          href={sp.socials.website}
                          target="_blank"
                          rel="noreferrer"
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-emerald-500/10 text-[#34a853] hover:bg-[#34a853] hover:text-white transition-colors"
                          title="Website"
                          aria-label={`${sp.name} Website`}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {sp.socials?.email && sp.socials.email.trim() !== "" && (
                        <a
                          href={sp.socials.email.startsWith("mailto:") ? sp.socials.email : `mailto:${sp.socials.email}`}
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-rose-500/10 text-[#ea4335] hover:bg-[#ea4335] hover:text-white transition-colors"
                          title="Email Speaker"
                          aria-label={`${sp.name} Email`}
                        >
                          <MailIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
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
