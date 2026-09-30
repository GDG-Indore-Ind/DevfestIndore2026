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
        return "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]";
      case "green":
        return "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]";
      case "yellow":
        return "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]";
      case "red":
        return "bg-[#f8d8d8] text-[#ea4335] border-[#ff7daf]";
      default:
        return "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]";
    }
  };

  return (
    <section id="speakers" className="py-20 md:py-28 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Featured Lineup
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Learn From Industry <span className="text-[#ea4335]">Pioneers &amp; GDEs</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
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
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border-2 border-[#1e1e1e] cursor-pointer ${
                filterTrack === track
                  ? "bg-[#1e1e1e] text-white google-pill-shadow scale-105"
                  : "bg-white text-[#1e1e1e] hover:bg-[#f0f0f0]"
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Speaker Cards Grid with 3D Tilt & Staggered Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {filteredSpeakers.map((speaker, idx) => (
            <div
              key={speaker.id}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
            >
              <CardTilt
                className={`bg-white rounded-3xl p-5 border-3 border-[#1e1e1e] google-card-shadow flex flex-col justify-between h-full group transition-all`}
              >
                <div>
                  {/* Speaker Avatar Container */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#1e1e1e] mb-4 bg-gray-100">
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
                    <h3 className="text-xl font-black text-[#1e1e1e] leading-snug group-hover:text-[#4285f4] transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs font-bold text-[#5f6368] mt-0.5">{speaker.role}</p>
                    <div className="inline-block mt-1 px-2 py-0.5 rounded bg-gray-100 text-[11px] font-extrabold text-[#1e1e1e] border border-gray-200">
                      {speaker.company}
                    </div>
                  </div>

                  {/* Talk Topic Preview */}
                  <div className="p-3 rounded-xl bg-[#fafbfc] border border-gray-200 mb-4">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#5f6368] mb-1">
                      Talk Topic:
                    </span>
                    <p className="text-xs font-bold text-[#1e1e1e] line-clamp-2 leading-relaxed">
                      {speaker.topic}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions with Roll-up Text */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#4285f4] hover:text-[#3367d6] group/btn cursor-pointer"
                  >
                    <span className="roll-text-container">
                      <span className="roll-text-top">View Bio &amp; Talk</span>
                      <span className="roll-text-bottom text-[#ea4335]">Explore Topic →</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5 text-gray-500">
                    {speaker.socials.twitter && (
                      <a
                        href={speaker.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-[#1e1e1e] transition-colors"
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
                        className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-[#4285f4] transition-colors"
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
                        className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-[#1e1e1e] transition-colors"
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

        {/* Call For Speakers (CFP) Banner with Glow Button */}
        <CardTilt className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-[#1e1e1e] google-card-shadow flex flex-col md:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ffe7a5] border-2 border-[#1e1e1e] flex items-center justify-center shrink-0 animate-bounce">
              <Mic2 className="w-8 h-8 text-[#1e1e1e]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ccf6c5] border border-[#5cdb6d] text-[11px] font-black text-[#1e1e1e] mb-1.5">
                <span>🎤 Community Stage Open</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e1e1e]">
                Want to Share Your Story at DevFest Indore?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#5f6368] mt-1 max-w-xl">
                We welcome talks on GenAI, Cloud Native, Mobile Engineering, System Architecture, and Open Source.
                First-time speakers are paired with senior speaker mentors!
              </p>
            </div>
          </div>

          <a
            href="https://sessionize.com"
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

      {/* Speaker Details Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1e1e1e] google-card-shadow relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getBadgeStyle(
                  selectedSpeaker.color
                )}`}
              >
                {selectedSpeaker.tag}
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 font-bold text-sm hover:bg-[#e5e7eb] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#1e1e1e] shrink-0">
                <Image
                  src={selectedSpeaker.avatar}
                  alt={selectedSpeaker.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1e1e1e]">{selectedSpeaker.name}</h3>
                <p className="text-xs font-bold text-[#5f6368]">{selectedSpeaker.role}</p>
                <span className="inline-block mt-1 text-xs font-extrabold text-[#4285f4]">
                  {selectedSpeaker.company}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafbfc] border border-gray-200 mb-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5f6368] mb-1">
                Session Topic:
              </span>
              <h4 className="text-sm font-extrabold text-[#1e1e1e]">{selectedSpeaker.topic}</h4>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-gray-300 text-[#1e1e1e]">
                Track: {selectedSpeaker.track}
              </span>
            </div>

            <div className="mb-6">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#5f6368] mb-2">
                About the Speaker:
              </span>
              <p className="text-xs sm:text-sm text-[#1e1e1e]/80 leading-relaxed font-medium">
                {selectedSpeaker.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedSpeaker.socials.twitter && (
                  <a
                    href={selectedSpeaker.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100"
                  >
                    <TwitterIcon className="w-4 h-4 text-[#1e1e1e]" />
                  </a>
                )}
                {selectedSpeaker.socials.linkedin && (
                  <a
                    href={selectedSpeaker.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#4285f4]" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedSpeaker(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1e1e1e] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
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
