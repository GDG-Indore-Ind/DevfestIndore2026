"use client";

import { SPONSORS } from "@/data/devfestData";
import { Handshake, Download, Mail, Sparkles } from "lucide-react";
import CardTilt from "./CardTilt";

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Handshake className="w-4 h-4 text-[#34a853]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Sponsors &amp; Community Ecosystem
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Backed By Global <span className="text-[#4285f4]">Tech Giants</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            Proudly supported by organizations championing open developer communities,
            inclusive technology, and student innovation across India.
          </p>
        </div>

        {/* Title Sponsor Banner with CardTilt 3D */}
        <div className="reveal-on-scroll mb-12">
          <CardTilt className="bg-[#c3ecf6]/30 rounded-3xl border-3 border-[#1e1e1e] google-card-shadow p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285f4] text-white text-xs font-black uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Title Sponsor</span>
            </div>

            <div className="max-w-md mx-auto bg-white py-6 px-8 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1e1e1e] flex items-center justify-center gap-2">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#f9ab00]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
                <span className="text-[#5f6368] text-xl font-normal ml-1">for Developers</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5f6368] max-w-xl mx-auto font-medium">
              Empowering developers with the tools, SDKs, and platform APIs to build the next generation of intelligent software worldwide.
            </p>
          </CardTilt>
        </div>

        {/* Platinum Sponsors with Scroll Reveal */}
        <div className="mb-14 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-[#1e1e1e] border border-gray-300">
              Platinum Sponsors
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SPONSORS.platinum.map((item, idx) => (
              <CardTilt
                key={idx}
                className="bg-white p-6 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow flex flex-col items-center justify-center text-center h-28"
              >
                <span className="text-xl font-black text-[#1e1e1e] tracking-tight">{item.name}</span>
                <span className="text-[11px] font-bold text-[#5f6368] mt-1">Google Ecosystem</span>
              </CardTilt>
            ))}
          </div>
        </div>

        {/* Gold Sponsors with Scroll Reveal */}
        {/* <div className="mb-14 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-[#1e1e1e] border border-gray-300">
              Gold &amp; Tooling Partners
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {SPONSORS.gold.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfc] p-5 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow flex flex-col items-center justify-center text-center h-24 hover:scale-105 transition-transform"
              >
                <span className="text-base font-black text-[#1e1e1e]">{item.name}</span>
                <span className="text-[10px] font-semibold text-[#5f6368] mt-0.5">{item.badge}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Community Partners Grid with Scroll Reveal */}
        <div className="mb-16 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#ccf6c5] text-[#1e1e1e] border border-[#5cdb6d]">
              Collaborating Community &amp; Campus Chapters
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SPONSORS.communityPartners.map((partner, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-gray-300 flex flex-col items-center gap-3 hover:border-[#1e1e1e] hover:scale-[1.02] transition-all text-center"
              >
                <img
                  src={partner.icon}
                  alt={partner.name}
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <img src={partner.icon} alt={partner.name} className="w-10 h-10" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-[#1e1e1e]">{partner.name}</span>
                  <span className="block text-[10px] text-[#5f6368] font-medium mt-0.5">{partner.type}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Callout Box with CardTilt */}
        <CardTilt className="p-8 sm:p-10 rounded-3xl bg-[#ffe7a5]/40 border-3 border-[#1e1e1e] google-card-shadow flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#f9ab00] text-[#1e1e1e] text-xs font-black uppercase tracking-wider mb-2">
              Opportunities Open
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1e1e1e]">
              Partner with DevFest Indore 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1e1e]/80 font-medium max-w-xl mt-1">
              Gain direct visibility among 1,500+ top software developers, tech architects, and hiring-ready engineering talent from Central India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:organizers@gdgindore.in?subject=DevFest%20Indore%202026%20Sponsorship%20Inquiry"
              className="px-6 py-3 rounded-2xl bg-[#1e1e1e] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-black hover:scale-105 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Organizers</span>
            </a>
            <a
              href="#tickets"
              className="px-6 py-3 rounded-2xl bg-white text-[#1e1e1e] text-xs font-black uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#f0f0f0] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Sponsor Deck</span>
            </a>
          </div>
        </CardTilt>
      </div>
    </section>
  );
}
