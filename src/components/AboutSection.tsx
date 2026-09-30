"use client";

import Image from "next/image";
import { EVENT_STATS } from "@/data/devfestData";
import {
  Users,
  Sparkles,
  Code2,
  Layers,
  Award,
  Heart,
  BookOpen,
  Coffee,
  Globe2,
  Lightbulb,
} from "lucide-react";
import CardTilt from "./CardTilt";

export default function AboutSection() {
  const iconMap: Record<string, any> = {
    Users: Users,
    Sparkles: Sparkles,
    Code2: Code2,
    Layers: Layers,
    Award: Award,
    Heart: Heart,
  };

  const pillars = [
    {
      title: "Deep-Dive Tech",
      desc: "Cutting-edge keynotes and break-out technical talks on Gemini, Vertex AI, GKE, Flutter, and Next.js from Google Developer Experts.",
      color: "bg-[#c3ecf6] border-[#57caff] text-[#1e1e1e]",
      icon: BookOpen,
      tag: "Learn & Master",
      delay: "delay-100",
    },
    {
      title: "Hands-on Codelabs",
      desc: "Bring your laptop! Step-by-step guided coding arenas with dedicated mentors, free Google Cloud sandbox credits, and verifiable certifications.",
      color: "bg-[#ccf6c5] border-[#5cdb6d] text-[#1e1e1e]",
      icon: Code2,
      tag: "Build Live",
      delay: "delay-200",
    },
    {
      title: "Founder & Dev Network",
      desc: "Connect with 1,500+ developers, tech leads from Indore Super Corridor IT parks, startup founders, and active open-source contributors.",
      color: "bg-[#ffe7a5] border-[#ffd427] text-[#1e1e1e]",
      icon: Globe2,
      tag: "Connect & Grow",
      delay: "delay-300",
    },
    {
      title: "Indori Hospitality",
      desc: "Experience Indore's world-famous cleanliness and culinary culture — steaming Indori Poha & Jalebi, Chappan vibe, and high-energy celebrations.",
      color: "bg-[#f8d8d8] border-[#ff7daf] text-[#ea4335]",
      icon: Coffee,
      tag: "Celebrate Malwa",
      delay: "delay-400",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              About The Festival
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight leading-tight">
            Where Modern Engineering Meets{" "}
            <span className="text-[#34a853]">Indore&#39;s Clean Innovation</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            GDG DevFests are community-led developer conferences hosted across the globe by Google Developer Groups.
            In 2026, <strong>GDG Indore</strong> brings you the grandest celebration of technology, code, and community
            in Central India!
          </p>
        </div>

        {/* Feature Story Banner with Generated Illustration & 3D Tilt */}
        <CardTilt className="bg-white rounded-3xl border-3 border-[#1e1e1e] google-card-shadow p-6 sm:p-10 mb-16 overflow-hidden reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Cultural Illustration */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1e1e1e] bg-[#f0f0f0] group">
              <Image
                src="/images/indore-culture.jpg"
                alt="GDG DevFest Indore Tech and Culture Illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#1e1e1e] flex items-center justify-between text-xs font-bold text-[#1e1e1e]">
                <span>🏛️ Historic Rajwada &amp; Tech Corridor</span>
                <span className="text-[#34a853] font-black">DevFest 2026 Spirit</span>
              </div>
            </div>

            {/* Content & Story */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe7a5] border border-[#ffd427] text-xs font-extrabold text-[#1e1e1e] self-start mb-4">
                <Lightbulb className="w-3.5 h-3.5 text-[#f9ab00]" />
                <span>The Indore Developer Movement</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] mb-4">
                A Festival Built By Developers, For Developers
              </h3>

              <p className="text-sm sm:text-base text-[#1e1e1e]/80 leading-relaxed mb-4">
                Indore has long been celebrated as India&#39;s cleanest city, but today it is also emerging as one of
                the fastest-growing technology and startup capitals in Central India. Home to premier national institutions
                like <strong>IIT Indore</strong> and <strong>IIM Indore</strong>, and the bustling <strong>Super Corridor</strong>,
                the city is brimming with engineering ambition.
              </p>

              <p className="text-sm sm:text-base text-[#1e1e1e]/80 leading-relaxed mb-6">
                <strong>DevFest Indore 2026</strong> gathers top minds from Google, pioneering tech unicorns, and groundbreaking
                startups. From hands-on AI agent architectures to scalable cloud microservices, this is your platform to level up,
                collaborate, and shape tomorrow.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div className="p-3.5 rounded-xl bg-[#c3ecf6]/40 border border-[#57caff]/40 hover:bg-[#c3ecf6]/70 transition-colors">
                  <span className="block text-xl font-black text-[#4285f4]">100% In-Person</span>
                  <span className="text-xs font-semibold text-[#5f6368]">Live Keynotes &amp; Demos</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#ccf6c5]/40 border border-[#5cdb6d]/40 hover:bg-[#ccf6c5]/70 transition-colors">
                  <span className="block text-xl font-black text-[#34a853]">Zero Fluff</span>
                  <span className="text-xs font-semibold text-[#5f6368]">Pure Engineering &amp; Code</span>
                </div>
              </div>
            </div>
          </div>
        </CardTilt>

        {/* 4 Pillars Grid with Tilt and Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`reveal-on-scroll ${pillar.delay}`}
              >
                <CardTilt
                  className={`p-6 rounded-2xl border-2 border-[#1e1e1e] google-pill-shadow flex flex-col justify-between h-full ${pillar.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1e1e1e] flex items-center justify-center text-[#1e1e1e] shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 border border-[#1e1e1e]/30">
                        {pillar.tag}
                      </span>
                    </div>
                    <h4 className="text-xl font-black mb-2 text-[#1e1e1e]">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm font-medium text-[#1e1e1e]/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </CardTilt>
              </div>
            );
          })}
        </div>

        {/* Live Event Stats Counter Strip with Scroll Reveal */}
        <div className="bg-white rounded-3xl border-3 border-[#1e1e1e] google-card-shadow p-6 sm:p-8 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5f6368]">
              DevFest Indore 2026 In Numbers
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {EVENT_STATS.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Sparkles;
              const colorBg =
                stat.color === "blue"
                  ? "bg-[#c3ecf6]"
                  : stat.color === "green"
                  ? "bg-[#ccf6c5]"
                  : stat.color === "yellow"
                  ? "bg-[#ffe7a5]"
                  : "bg-[#f8d8d8]";
              const textColor =
                stat.color === "blue"
                  ? "text-[#4285f4]"
                  : stat.color === "green"
                  ? "text-[#34a853]"
                  : stat.color === "yellow"
                  ? "text-[#f9ab00]"
                  : "text-[#ea4335]";

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 border-[#1e1e1e] ${colorBg} flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${textColor} animate-float-subtle`} />
                  <span className="text-2xl sm:text-3xl font-black text-[#1e1e1e] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-bold text-[#1e1e1e]/75 mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
