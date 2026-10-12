"use client";

import { useState, useEffect } from "react";
import { Users, Sparkles, ShieldCheck } from "lucide-react";
import { TwitterIcon, LinkedInIcon, GithubIcon } from "@/components/SocialIcons";
import { INITIAL_TEAM, TeamMember } from "@/data/teamData";
import { getTeamMembers } from "@/lib/firestoreService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

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
    <div className="min-h-screen bg-[#fafbfc] text-[#1e1e1e] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
              <Users className="w-3.5 h-3.5 text-[#34a853]" />
              <span>Google Developer Group Indore</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#1e1e1e] tracking-tight mb-4">
              Meet the Organizers & Visionaries
            </h1>
            <p className="text-base sm:text-lg text-[#5f6368] leading-relaxed">
              The passionate community leads, engineers, and aerospace advocates orchestrating Central India's premier developer and space technology gathering.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTeam(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedTeam === cat
                    ? "bg-[#1e1e1e] text-white shadow-md"
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
                className="p-6 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#1e1e1e] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-gray-100">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1e1e1e] border border-gray-200">
                      {member.team}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#1e1e1e] mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#4285f4] mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#5f6368] leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#34a853]">
                    GDG Indore 2026
                  </span>
                  <div className="flex items-center gap-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-gray-50 text-[#4285f4] hover:bg-blue-50"
                      >
                        <LinkedInIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-gray-50 text-[#1e1e1e] hover:bg-gray-100"
                      >
                        <TwitterIcon className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100"
                      >
                        <GithubIcon className="w-4 h-4 fill-current" />
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
