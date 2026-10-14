"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  Filter,
  Eye,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { INITIAL_GALLERY_ITEMS, GalleryItem } from "@/data/ecosystemData";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

// Local verified high-resolution fallback photos from previous editions
const LOCAL_GALLERY_FALLBACKS: GalleryItem[] = [
  {
    id: "loc-1",
    title: "Keynote Plenary Hall & Main Stage",
    category: "Keynotes",
    imageUrl: "/gallery/opt_DSCF7164.JPG",
    caption: "Auditorium keynote spotlighting emerging technology ecosystems and developer opportunities.",
  },
  {
    id: "loc-2",
    title: "Auditorium Crowd Energy",
    category: "Community",
    imageUrl: "/gallery/opt_DSCF7165.JPG",
    caption: "Over 600 developers united under one roof engaging with deep-tech presentations.",
  },
  {
    id: "loc-3",
    title: "Speaker Stage Discussion & Panel",
    category: "Keynotes",
    imageUrl: "/gallery/opt_DSCF7166.JPG",
    caption: "Distinguished Google Developer Experts presenting production architectural patterns.",
  },
  {
    id: "loc-4",
    title: "Hands-on Codelab Swarm Arena",
    category: "AI & Robotics",
    imageUrl: "/gallery/opt_DSCF7167.JPG",
    caption: "Real-time AI models running on local silicon with hands-on mentors guiding every step.",
  },
  {
    id: "loc-5",
    title: "Community Huddles & Indori Hospitality",
    category: "Community",
    imageUrl: "/gallery/opt_DSCF7168.JPG",
    caption: "Indori high tea networking breaks + tech discussions = unmatched community warmth.",
  },
  {
    id: "loc-6",
    title: "Tech Innovation Demos & Startup Alley",
    category: "Showcase",
    imageUrl: "/gallery/opt_DSCF7169.JPG",
    caption: "Student creators and startup founders showcasing edge devices and cloud software.",
  },
  {
    id: "loc-7",
    title: "Speakers & Organizers Plenary",
    category: "Keynotes",
    imageUrl: "/gallery/opt_DSCF7170.JPG",
    caption: "GDG Indore core leadership stage finale celebrating ecosystem milestones.",
  },
  {
    id: "loc-8",
    title: "Cosmic Banquet Lawns & Dinner",
    category: "Community",
    imageUrl: "/gallery/opt_DSCF7175.JPG",
    caption: "Essentia Arena dinner gathering celebrating Central India developer solidarity.",
  },
  {
    id: "loc-9",
    title: "Main Stage Visual Production",
    category: "Showcase",
    imageUrl: "/gallery/opt_DSCF7182.JPG",
    caption: "Immersive 4K visual displays and lighting production at DevFest Indore.",
  },
  {
    id: "loc-10",
    title: "Developer Community Solidarity",
    category: "Space",
    imageUrl: "/gallery/opt_DSCF7183.JPG",
    caption: "Space Club of India delegates and aerospace pioneers connecting with software engineers.",
  },
  {
    id: "loc-11",
    title: "Ecosystem Lawns & Breakout Sessions",
    category: "Showcase",
    imageUrl: "/gallery/opt_DSCF7184.JPG",
    caption: "Parallel discussion sessions exploring AI agents, cloud resilience, and open source.",
  },
];

export default function GalleryPage() {
  const { isDark } = useTheme();
  const [items, setItems] = useState<GalleryItem[]>(LOCAL_GALLERY_FALLBACKS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    // If local storage has valid items use them; otherwise defaults to high-res local photos
    const saved = localStorage.getItem("devfest-gallery-items");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const categories = [
    "All",
    "Keynotes",
    "AI & Robotics",
    "Space",
    "Showcase",
    "Community",
  ];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? "bg-[#000000] text-white" : "bg-[#fafbfc] text-[#1e1e1e]"
    }`}>
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Page Hero Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-gray-200 dark:border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-[#4285f4] mb-4">
                <Camera className="w-3.5 h-3.5" />
                <span>Previous Editions Visual Archive</span>
              </div>
              <h1 className={`text-4xl sm:text-6xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-[#1e1e1e]"}`}>
                DevFest Indore Visual Showcase
              </h1>
              <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${isDark ? "text-white/70" : "text-[#5f6368]"}`}>
                Explore curated moments from space technology showcases, keynote plenary sessions, hands-on codelab swarms, and vibrant community huddles across Indore.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs border-2 google-pill-shadow hover:scale-105 transition-transform ${
                  isDark ? "bg-white/10 text-white border-white/20 hover:bg-white/15" : "bg-white text-[#1e1e1e] border-[#1e1e1e]"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#34a853]" />
                <span>Upload New Photos</span>
              </Link>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <span className={`text-xs font-bold mr-2 flex items-center gap-1.5 ${isDark ? "text-white/60" : "text-[#5f6368]"}`}>
              <Filter className="w-3.5 h-3.5 text-[#4285f4]" /> Filter by Track:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
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

          {/* High-Definition Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col hover:scale-[1.02] hover:shadow-2xl ${
                  isDark
                    ? "bg-[#0d0d0d] border-white/10 hover:border-blue-400/50"
                    : "bg-white border-gray-200 hover:border-[#1e1e1e]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to local gallery image if external image fails
                      (e.target as HTMLImageElement).src = "/gallery/opt_DSCF7164.JPG";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#4285f4]" /> Click to enlarge 4K preview
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-black text-lg mb-2 transition-colors ${
                      isDark ? "text-white group-hover:text-[#4285f4]" : "text-[#1e1e1e] group-hover:text-[#4285f4]"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/70" : "text-[#5f6368]"}`}>
                      {item.caption}
                    </p>
                  </div>

                  <div className={`pt-4 border-t mt-4 flex items-center justify-between text-[11px] ${
                    isDark ? "border-white/10 text-white/50" : "border-gray-100 text-[#5f6368]"
                  }`}>
                    <span>DevFest Indore Archive</span>
                    <span className="font-bold text-[#4285f4]">Essentia Luxury Arena</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Lightbox for Fullscreen Image View */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className={`max-w-4xl w-full rounded-3xl overflow-hidden border-2 shadow-2xl ${
                  isDark ? "bg-[#0d0d0d] border-white/20" : "bg-white border-[#1e1e1e]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className={`p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDark ? "bg-[#0d0d0d]" : "bg-white"
                }`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-[#4285f4] mb-2 inline-block border border-blue-500/30">
                      {selectedImage.category}
                    </span>
                    <h2 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-[#1e1e1e]"}`}>
                      {selectedImage.title}
                    </h2>
                    <p className={`text-xs max-w-xl ${isDark ? "text-white/70" : "text-[#5f6368]"}`}>
                      {selectedImage.caption}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-5 py-2 rounded-full font-bold text-xs bg-[#4285f4] text-white hover:bg-[#3367d6] transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
