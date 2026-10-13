"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ArrowRight,
  Sparkles,
  Play,
  Film,
  ExternalLink,
  Layers,
  ChevronRight,
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
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHoveredMarquee, setIsHoveredMarquee] = useState(false);

  return (
    <section id="recap-gallery" className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 text-[#ea4335]" />
              <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
                Previous Editions • Live Archive
              </span>
              <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className={isDark ? "text-white" : "text-gray-900"}>Moments, Culture &</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#f9ab00] to-[#34a853]">
                Event Recap Cinema
              </span>
            </h2>
            <p className={`mt-2 text-sm sm:text-base font-normal max-w-2xl ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Glance through the electricity of past DevFest Indore gatherings, high-octane keynotes, codelab swarms, and official event motion.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase border-2 transition-all group shrink-0 shadow-sm hover:scale-105 active:scale-95 bg-white text-gray-900 border-gray-900 dark:bg-white dark:text-black dark:border-white"
          >
            <span>View Full 4K Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1-Line Continuous Scrolling Photo Ribbon (Inspired by Mumbai Tech Week recap strip) */}
        <div className="mb-10 reveal-on-scroll">
          <div
            className="overflow-hidden relative rounded-3xl border-2 border-black/10 dark:border-white/10 p-3 bg-black/20 backdrop-blur-md"
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

        {/* Dedicated 1 Video Cinema Area (Large Panoramic Cinema Screen + Highlights) */}
        <div className="reveal-on-scroll">
          <div className={`p-6 sm:p-10 rounded-3xl border-2 transition-all ${
            isDark
              ? "bg-[#0d0d0d]/90 border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              : "bg-white border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          }`}>
            {/* Header info above the grand video */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/10 dark:border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-black mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cinematic Official Broadcast</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                  Relive the DevFest Velocity & Momentum
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border ${
                  isDark ? "bg-white/5 border-white/10 text-white/80" : "bg-gray-100 border-gray-200 text-gray-800"
                }`}>
                  Resolution: 4K 2160p 60fps
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#ea4335]/15 text-[#ea4335] border border-[#ea4335]/30">
                  Duration: 02:45 min
                </span>
              </div>
            </div>

            {/* Grand Video Cinema Player (Full Width, Large Aspect Ratio) */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-black group mb-6">
              {!isPlayingVideo ? (
                <>
                  {/* Video Thumbnail Backdrop */}
                  <Image
                    src="/gallery/opt_DSCF7182.JPG"
                    alt="DevFest Indore Official Event Motion Recap"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-700 opacity-85"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 group-hover:opacity-80 transition-opacity" />

                  {/* Play Button Trigger */}
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-[0_0_50px_rgba(234,67,53,0.9)] hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                    aria-label="Play DevFest Indore Official Aftermovie"
                  >
                    <Play className="w-10 h-10 ml-1.5 fill-white" />
                  </button>

                  {/* Video Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-[#f9ab00] border border-white/20 mb-2">
                        <Film className="w-4 h-4" />
                        <span>OFFICIAL 4K AFTERMOVIE • CENTRAL INDIA</span>
                      </div>
                      <h4 className="text-lg sm:text-2xl font-black drop-shadow-lg">
                        DevFest Indore Experience, Keynotes & Plenary Energy
                      </h4>
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="DevFest Indore Official Aftermovie"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Footer Telemetry & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDark ? "text-white/60" : "text-gray-500"}`}>Audience Energy</div>
                <div className={`text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>1,500+ Engineers & Creators</div>
              </div>

              <div className={`p-4 rounded-2xl border ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDark ? "text-white/60" : "text-gray-500"}`}>Audio Mastering</div>
                <div className="text-base font-black text-[#34a853]">Dolby Mastered Stereo</div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <div>
                  <div className={`text-xs font-bold mb-1 ${isDark ? "text-white/60" : "text-gray-500"}`}>Full Gallery</div>
                  <div className={`text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>Explore 40+ Photos</div>
                </div>
                <Link
                  href="/gallery"
                  className="px-4 py-2 rounded-xl text-xs font-black bg-[#4285f4] text-white hover:bg-[#3367d6] transition-colors"
                >
                  View All →
                </Link>
              </div>
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
