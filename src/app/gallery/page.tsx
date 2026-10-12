"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Image as ImageIcon,
  ArrowLeft,
  Filter,
  Camera,
  Download,
  Share2,
  Rocket,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { INITIAL_GALLERY_ITEMS, GalleryItem } from "@/data/ecosystemData";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("devfest-gallery-items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const categories = [
    "All",
    "Space",
    "AI & Robotics",
    "Keynotes",
    "Showcase",
    "Community",
  ];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e1e1e] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Page Hero Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-gray-200 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#4285f4] mb-4">
                <Camera className="w-3.5 h-3.5" />
                <span>Cloudinary Optimized Media Archive</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-[#1e1e1e] tracking-tight mb-3">
                DevFest Indore Visual Showcase
              </h1>
              <p className="text-base sm:text-lg text-[#5f6368] max-w-2xl leading-relaxed">
                Explore curated moments from space technology showcases, Qualcomm edge demonstrations, keynote sessions, and vibrant community huddles across Indore.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs bg-white text-[#1e1e1e] border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform"
              >
                <ShieldCheck className="w-4 h-4 text-[#34a853]" />
                <span>Upload New Photos</span>
              </Link>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <span className="text-xs font-bold text-[#5f6368] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#4285f4]" /> Filter by Track:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#1e1e1e] text-white shadow-md scale-105"
                    : "bg-white text-[#5f6368] border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* High-Definition Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              // Apply Cloudinary optimization
              const optimizedSrc = getCloudinaryUrl(item.imageUrl, {
                width: 800,
                height: 500,
                crop: "fill",
                format: "auto",
              });

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-white border-2 border-gray-200 hover:border-[#1e1e1e] hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={optimizedSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Click to enlarge
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-lg text-[#1e1e1e] mb-2 group-hover:text-[#4285f4] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#5f6368] leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-[11px] text-[#5f6368]">
                      <span>DevFest Indore 2026 Archive</span>
                      <span className="font-bold text-[#4285f4]">Essentia Hotel</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Lightbox for Fullscreen Image View */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden border-2 border-[#1e1e1e] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-[#4285f4] mb-2 inline-block">
                      {selectedImage.category}
                    </span>
                    <h2 className="text-xl font-black text-[#1e1e1e] mb-1">
                      {selectedImage.title}
                    </h2>
                    <p className="text-xs text-[#5f6368] max-w-xl">
                      {selectedImage.caption}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-5 py-2 rounded-full font-bold text-xs bg-[#1e1e1e] text-white hover:bg-black transition-colors"
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
