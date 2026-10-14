"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const GALLERY_PHOTOS = [
  {
    id: "g-1",
    title: "Keynote Plenary Hall",
    subtitle: "Opening Address & Hall of Innovation",
    src: "/gallery/opt_DSCF7164.JPG",
    category: "Keynote",
    tag: "DevFest 2024",
  },
  {
    id: "g-2",
    title: "Auditorium Energy",
    subtitle: "600+ Developers Engaged in Session",
    src: "/gallery/opt_DSCF7165.JPG",
    category: "Crowd",
    tag: "Main Stage",
  },
  {
    id: "g-3",
    title: "Speaker Stage Discussion",
    subtitle: "Deep-Dive Panel on Cloud Architecture",
    src: "/gallery/opt_DSCF7166.JPG",
    category: "Panel",
    tag: "Live Q&A",
  },
  {
    id: "g-4",
    title: "Hands-on Codelab Arena",
    subtitle: "Real-time AI Model Workflows",
    src: "/gallery/opt_DSCF7167.JPG",
    category: "Workshops",
    tag: "Codelabs",
  },
  {
    id: "g-5",
    title: "Community Huddles & Networking",
    subtitle: "Developers Connecting Over Indori High-Tea",
    src: "/gallery/opt_DSCF7168.JPG",
    category: "Community",
    tag: "Networking",
  },
  {
    id: "g-6",
    title: "Tech Innovation Demos",
    subtitle: "Student Creators & Startup Alley",
    src: "/gallery/opt_DSCF7169.JPG",
    category: "Showcase",
    tag: "Demo Day",
  },
  {
    id: "g-7",
    title: "Speakers & Organizers Plenary",
    subtitle: "GDG Indore Core Leadership Moment",
    src: "/gallery/opt_DSCF7170.JPG",
    category: "Leadership",
    tag: "Stage Finale",
  },
  {
    id: "g-8",
    title: "Cosmic Banquet Lawns",
    subtitle: "Indore Culinary Experience & Dinner",
    src: "/gallery/opt_DSCF7175.JPG",
    category: "Experience",
    tag: "Essentia Arena",
  },
];

export default function GalleryVideoSection() {
  const { isDark } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHoveredMarquee, setIsHoveredMarquee] = useState(false);

  return (
    <section id="recap-gallery" className="pt-4 pb-8 md:pt-6 md:pb-10 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-2 hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 text-[#ea4335]" />
              <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
                Previous Editions • Live Archive
              </span>
              <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className={isDark ? "text-white" : "text-gray-900"}>Moments & Culture From</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#f9ab00] to-[#34a853]">
                Previous Editions
              </span>
            </h2>
            <p className={`mt-1.5 text-sm sm:text-base font-normal max-w-2xl ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Glance through the electricity of past DevFest Indore gatherings, high-octane keynotes, codelab swarms, and memorable community celebrations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase border-2 transition-all group shrink-0 shadow-sm hover:scale-105 active:scale-95 bg-white text-gray-900 border-gray-900 dark:bg-white dark:text-black dark:border-white cursor-pointer"
          >
            <span>View Full 4K Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1-Line Continuous Scrolling Photo Ribbon */}
        <div className="reveal-on-scroll">
          <div
            className={`overflow-hidden relative rounded-3xl border-2 p-3.5 backdrop-blur-md transition-colors ${
              isDark
                ? "border-white/10 bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                : "border-gray-200 bg-white/80 shadow-md"
            }`}
            onMouseEnter={() => setIsHoveredMarquee(true)}
            onMouseLeave={() => setIsHoveredMarquee(false)}
          >
            <div
              className={`flex gap-4 w-max ${
                isHoveredMarquee ? "" : "animate-marquee"
              }`}
            >
              {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((photo, idx) => (
                <div
                  key={`${photo.id}-${idx}`}
                  onClick={() => setSelectedImage(photo.src)}
                  className="relative w-72 sm:w-88 h-52 sm:h-56 rounded-2xl overflow-hidden shrink-0 group cursor-pointer border border-white/20 shadow-lg"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-white text-[10px] font-mono font-bold backdrop-blur-md">
                    {photo.tag}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-sm font-black truncate">{photo.title}</h4>
                    <p className="text-[11px] text-gray-300 truncate font-medium">
                      {photo.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Photo View */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src={selectedImage}
              alt="DevFest Expanded Archive Photo"
              fill
              className="object-contain"
              unoptimized
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center font-bold text-sm hover:bg-white hover:text-black transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
