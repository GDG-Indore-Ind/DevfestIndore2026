"use client";

import Image from "next/image";
import { EVENT_STATS, EVENT_DETAILS } from "@/data/devfestData";
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
      color: "bg-[#4285f4]/12 border-[#4285f4]/35 text-white",
      icon: BookOpen,
      tag: "Learn & Master",
      delay: "delay-100",
    },
    {
      title: "Hands-on Codelabs",
      desc: "Bring your laptop! Step-by-step guided coding arenas with dedicated mentors, free Google Cloud sandbox credits, and verifiable certifications.",
      color: "bg-[#34a853]/12 border-[#34a853]/35 text-white",
      icon: Code2,
      tag: "Build Live",
      delay: "delay-200",
    },
    {
      title: "Founder & Dev Network",
      desc: "Connect with 1,500+ developers, tech leads from Indore Super Corridor IT parks, startup founders, and active open-source contributors.",
      color: "bg-[#f9ab00]/12 border-[#f9ab00]/35 text-white",
      icon: Globe2,
      tag: "Connect & Grow",
      delay: "delay-300",
    },
    {
      title: "Indori Hospitality",
      desc: "Experience Indore's world-famous cleanliness and culinary culture — steaming Indori Poha & Jalebi, Chappan vibe, and high-energy celebrations.",
      color: "bg-[#ea4335]/12 border-[#ea4335]/35 text-white",
      icon: Coffee,
      tag: "Celebrate Malwa",
      delay: "delay-400",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              About The Festival
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Where Modern Engineering Meets{" "}
            <span className="text-[#34a853]">Indore's Clean Innovation</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 font-medium leading-relaxed">
            GDG DevFests are community-led developer conferences hosted across the globe by Google Developer Groups.
            In 2026, <strong className="text-white">GDG Indore</strong> brings you the grandest celebration of technology, code, and community
            in Central India!
          </p>
        </div>

        {/* Feature Story Banner with 3D Tilt — dark glass */}
        <CardTilt className="bg-[#0d0d0d] rounded-3xl border border-white/10 google-card-shadow p-6 sm:p-10 mb-16 overflow-hidden reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Cultural Illustration */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d0d] group">
              <Image
                src={EVENT_DETAILS.aboutImageUrl}
                alt="GDG DevFest Indore Tech and Culture Illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                unoptimized
              />
              <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-bold text-white">
                <span>🏛️ Historic Rajwada & Tech Corridor</span>
                <span className="text-[#34a853] font-black">DevFest 2026 Spirit</span>
              </div>
            </div>

            {/* Content & Story */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9ab00]/15 border border-[#f9ab00]/40 text-xs font-extrabold text-[#f9ab00] self-start mb-4">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>The Indore Developer Movement</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                A Festival Built By Developers, For Developers
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
                Indore has long been celebrated as India's cleanest city, but today it is also emerging as one of
                the fastest-growing technology and startup capitals in Central India. Home to premier national institutions
                like <strong className="text-white">IIT Indore</strong> and <strong className="text-white">IIM Indore</strong>, and the bustling <strong className="text-white">Super Corridor</strong>,
                the city is brimming with engineering ambition.
              </p>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                <strong className="text-white">DevFest Indore 2026</strong> gathers top minds from Google, pioneering tech unicorns, and groundbreaking
                startups. From hands-on AI agent architectures to scalable cloud microservices, this is your platform to level up,
                collaborate, and shape tomorrow.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/8">
                <div className="p-3.5 rounded-xl bg-[#4285f4]/10 border border-[#4285f4]/25 hover:bg-[#4285f4]/15 transition-colors">
                  <span className="block text-xl font-black text-[#4285f4]">100% In-Person</span>
                  <span className="text-xs font-semibold text-white/45">Live Keynotes & Demos</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#34a853]/10 border border-[#34a853]/25 hover:bg-[#34a853]/15 transition-colors">
                  <span className="block text-xl font-black text-[#34a853]">Zero Fluff</span>
                  <span className="text-xs font-semibold text-white/45">Pure Engineering & Code</span>
                </div>
              </div>
            </div>
          </div>
        </CardTilt>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`reveal-on-scroll ${pillar.delay}`}
              >
                <CardTilt
                  className={`p-6 rounded-2xl border-2 google-pill-shadow flex flex-col justify-between h-full ${pillar.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                        {pillar.tag}
                      </span>
                    </div>
                    <h4 className="text-xl font-black mb-2 text-white">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm font-medium text-white/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </CardTilt>
              </div>
            );
          })}
        </div>

        {/* Stats Counter Strip — dark glass */}
        <div className="bg-[#0d0d0d] rounded-3xl border border-white/10 google-card-shadow p-6 sm:p-8 reveal-on-scroll">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/45">
              DevFest Indore 2026 In Numbers
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {EVENT_STATS.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Sparkles;
              const colorBg =
                stat.color === "blue"
                  ? "bg-[#4285f4]/15 border-[#4285f4]/35"
                  : stat.color === "green"
                    ? "bg-[#34a853]/15 border-[#34a853]/35"
                    : stat.color === "yellow"
                      ? "bg-[#f9ab00]/15 border-[#f9ab00]/35"
                      : "bg-[#ea4335]/15 border-[#ea4335]/35";
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
                  className={`p-4 rounded-2xl border-2 ${colorBg} flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${textColor} animate-float-subtle`} />
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-bold text-white/55 mt-1">
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
