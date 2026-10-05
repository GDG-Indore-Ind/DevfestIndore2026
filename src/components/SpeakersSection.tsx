"use client";

import { useState } from "react";
import Image from "next/image";
import { SPEAKERS, Speaker } from "@/data/devfestData";
import {
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  Mic2,
} from "lucide-react";
import { TwitterIcon, LinkedInIcon, GithubIcon } from "./SocialIcons";
import CardTilt from "./CardTilt";

export default function SpeakersSection() {
  const [filterTrack, setFilterTrack] = useState<string>("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const tracks = [
    "All",
    "GenAI & ML",
    "Cloud & DevOps",
    "Web & Mobile",
    "Product & Design",
  ];

  const filteredSpeakers = SPEAKERS.filter((speaker) => {
    return filterTrack === "All" || speaker.track === filterTrack;
  });

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-[#4285f4]/20 text-[#4285f4] border-[#4285f4]/50";
      case "green":
        return "bg-[#34a853]/20 text-[#34a853] border-[#34a853]/50";
      case "yellow":
        return "bg-[#f9ab00]/20 text-[#f9ab00] border-[#f9ab00]/50";
      case "red":
        return "bg-[#ea4335]/20 text-[#ea4335] border-[#ea4335]/50";
      default:
        return "bg-[#4285f4]/20 text-[#4285f4] border-[#4285f4]/50";
    }
  };

  return (
    <section id="speakers" className="py-20 md:py-28 bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Featured Lineup
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Learn From Industry <span className="text-[#ea4335]">Pioneers & GDEs</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 font-medium leading-relaxed">
            Tech leads, Google Developer Experts, AI researchers, and engineering directors traveling
            from Silicon Valley, Bengaluru, and across India to DevFest Indore 2026.
          </p>
        </div>

        {/* Track Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 reveal-on-scroll">
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setFilterTrack(track)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border-2 cursor-pointer ${
                filterTrack === track
                  ? "bg-white text-black border-white google-pill-shadow scale-105"
                  : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {filteredSpeakers.map((speaker, idx) => (
            <div
              key={speaker.id}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
            >
              <CardTilt
                className="bg-[#0d0d0d] rounded-3xl p-5 border border-white/10 google-card-shadow flex flex-col justify-between h-full group transition-all"
              >
                <div>
                  {/* Speaker Avatar */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/15 mb-4 bg-[#1a1a1a]">
                    <Image
                      src={speaker.avatar}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Corner Badge */}
                    <div
                      className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${getBadgeStyle(
                        speaker.color
                      )}`}
                    >
                      {speaker.tag}
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="mb-3">
                    <h3 className="text-xl font-black text-white leading-snug group-hover:text-[#4285f4] transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs font-bold text-white/50 mt-0.5">{speaker.role}</p>
                    <div className="inline-block mt-1 px-2 py-0.5 rounded bg-white/8 text-[11px] font-extrabold text-white/70 border border-white/10">
                      {speaker.company}
                    </div>
                  </div>

                  {/* Talk Topic */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 mb-4">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-white/40 mb-1">
                      Talk Topic:
                    </span>
                    <p className="text-xs font-bold text-white/90 line-clamp-2 leading-relaxed">
                      {speaker.topic}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#4285f4] hover:text-[#57caff] group/btn cursor-pointer"
                  >
                    <span className="roll-text-container">
                      <span className="roll-text-top">View Bio & Talk</span>
                      <span className="roll-text-bottom text-[#ea4335]">Explore Topic →</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5 text-white/30">
                    {speaker.socials.twitter && (
                      <a
                        href={speaker.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white/8 hover:text-white transition-colors"
                        title="Twitter / X"
                      >
                        <TwitterIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {speaker.socials.linkedin && (
                      <a
                        href={speaker.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white/8 hover:text-[#4285f4] transition-colors"
                        title="LinkedIn"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {speaker.socials.github && (
                      <a
                        href={speaker.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white/8 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </CardTilt>
            </div>
          ))}
        </div>

        {/* CFP Banner — dark glass */}
        <CardTilt className="bg-[#0d0d0d] rounded-3xl p-6 sm:p-10 border border-white/10 google-card-shadow flex flex-col md:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#f9ab00]/20 border border-[#f9ab00]/40 flex items-center justify-center shrink-0 animate-bounce">
              <Mic2 className="w-8 h-8 text-[#f9ab00]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#34a853]/20 border border-[#34a853]/40 text-[11px] font-black text-[#34a853] mb-1.5">
                <span>🎤 Community Stage Open</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Want to Share Your Story at DevFest Indore?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/55 mt-1 max-w-xl">
                We welcome talks on GenAI, Cloud Native, Mobile Engineering, System Architecture, and Open Source.
                First-time speakers are paired with senior speaker mentors!
              </p>
            </div>
          </div>

          <a
            href="https://sessionize.com/devfest-indore-2026/"
            target="_blank"
            rel="noreferrer"
            className="glow-btn shrink-0"
          >
            <span className="glow-btn__surface group !bg-[#ea4335] !text-white !py-3.5 !px-8">
              <span className="roll-text-container">
                <span className="roll-text-top">Submit Your Talk (CFP)</span>
                <span className="roll-text-bottom">Apply on Papercall →</span>
              </span>
              <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </span>
          </a>
        </CardTilt>
      </div>

      {/* Speaker Details Modal — dark glass */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0d0d0d] border border-white/15 max-w-lg w-full rounded-3xl p-6 sm:p-8 google-card-shadow relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/8">
              <div
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getBadgeStyle(
                  selectedSpeaker.color
                )}`}
              >
                {selectedSpeaker.tag}
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 font-bold text-sm hover:bg-white/15 flex items-center justify-center cursor-pointer text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shrink-0">
                <Image
                  src={selectedSpeaker.avatar}
                  alt={selectedSpeaker.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{selectedSpeaker.name}</h3>
                <p className="text-xs font-bold text-white/50">{selectedSpeaker.role}</p>
                <span className="inline-block mt-1 text-xs font-extrabold text-[#4285f4]">
                  {selectedSpeaker.company}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/8 mb-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-white/40 mb-1">
                Session Topic:
              </span>
              <h4 className="text-sm font-extrabold text-white">{selectedSpeaker.topic}</h4>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-white/8 border border-white/15 text-white/60">
                Track: {selectedSpeaker.track}
              </span>
            </div>

            <div className="mb-6">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-white/40 mb-2">
                About the Speaker:
              </span>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                {selectedSpeaker.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedSpeaker.socials.twitter && (
                  <a
                    href={selectedSpeaker.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-white/10 hover:bg-white/8 text-white/50 hover:text-white"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {selectedSpeaker.socials.linkedin && (
                  <a
                    href={selectedSpeaker.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-white/10 hover:bg-white/8 text-white/50 hover:text-[#4285f4]"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedSpeaker(null)}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
