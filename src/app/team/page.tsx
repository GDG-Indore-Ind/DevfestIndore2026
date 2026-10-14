"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Sparkles, ShieldCheck } from "lucide-react";
import { TwitterIcon, LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from "@/components/SocialIcons";
import { INITIAL_TEAM, TeamMember } from "@/data/teamData";
import { getTeamMembers } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [selectedTeam, setSelectedTeam] = useState<string>("All");
  const { isDark } = useTheme();

  useEffect(() => {
    getTeamMembers().then((res) => {
      if (res && res.length > 0) {
        setTeam(res);
      }
    });
  }, []);

  const categories = [
    "All",
    "Core Organizer",
    "Design & Experience",
    "Tech & Operations",
    "Space & Ecosystem",
  ];

  const filteredTeam =
    selectedTeam === "All"
      ? team
      : team.filter((m) => m.team === selectedTeam);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? "bg-[#000000] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
    }`}>
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm mb-4 border ${
              isDark ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-200 text-[#1e1e1e]"
            }`}>
              <Users className="w-3.5 h-3.5 text-[#34a853]" />
              <span>Google Developer Group Indore</span>
            </div>
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-[#1e1e1e]"}`}>
              Meet the Organizers & Visionaries
            </h1>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-white/80" : "text-[#5f6368]"}`}>
              The passionate community leads, engineers, and aerospace advocates orchestrating Central India's premier developer and space technology gathering.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTeam(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedTeam === cat
                    ? "bg-[#4285f4] text-white shadow-md scale-105"
                    : isDark
                      ? "bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 hover:text-white"
                      : "bg-white text-[#5f6368] border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between group hover:scale-[1.02] hover:shadow-xl ${
                  isDark
                    ? "bg-[#0d0d0d] border-white/10 hover:border-white/20"
                    : "bg-white border-gray-200 hover:border-[#1e1e1e]"
                }`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                      isDark
                        ? "bg-black/70 text-white border-white/20"
                        : "bg-white/90 text-[#1e1e1e] border-gray-200"
                    }`}>
                      {member.team}
                    </span>
                  </div>

                  <h3 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-[#1e1e1e]"}`}>
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#4285f4] mb-3">
                    {member.role}
                  </div>
                  <p className={`text-xs leading-relaxed mb-6 ${isDark ? "text-white/75" : "text-[#5f6368]"}`}>
                    {member.bio}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${isDark ? "border-white/10" : "border-gray-100"}`}>
                  <span className="text-[11px] font-bold text-[#34a853]">
                    GDG Indore 2026
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {member.socials?.linkedin && member.socials.linkedin.trim() !== "" && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl transition-colors ${
                          isDark ? "bg-white/10 text-[#4285f4] hover:bg-white/20" : "bg-gray-50 text-[#4285f4] hover:bg-blue-50"
                        }`}
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedInIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials?.twitter && member.socials.twitter.trim() !== "" && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl transition-colors ${
                          isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-50 text-[#1e1e1e] hover:bg-gray-100"
                        }`}
                        aria-label={`${member.name} Twitter / X`}
                      >
                        <TwitterIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials?.github && member.socials.github.trim() !== "" && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl transition-colors ${
                          isDark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-label={`${member.name} GitHub`}
                      >
                        <GithubIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials?.instagram && member.socials.instagram.trim() !== "" && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl transition-colors ${
                          isDark ? "bg-white/10 text-[#e1306c] hover:bg-white/20" : "bg-gray-50 text-[#e1306c] hover:bg-pink-50"
                        }`}
                        aria-label={`${member.name} Instagram`}
                      >
                        <InstagramIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials?.email && member.socials.email.trim() !== "" && (
                      <a
                        href={member.socials.email.startsWith("mailto:") ? member.socials.email : `mailto:${member.socials.email}`}
                        className={`p-2 rounded-xl transition-colors ${
                          isDark ? "bg-white/10 text-[#34a853] hover:bg-white/20" : "bg-gray-50 text-[#34a853] hover:bg-emerald-50"
                        }`}
                        aria-label={`${member.name} Email`}
                      >
                        <MailIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
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
