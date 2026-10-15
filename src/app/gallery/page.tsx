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
  Plus,
  Trash2,
  Edit3,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";
import { INITIAL_GALLERY_ITEMS, GalleryItem } from "@/data/ecosystemData";
import { getCloudinaryUrl, uploadToCloudinary } from "@/lib/cloudinary";
import { getGalleryPhotos, saveGalleryPhoto, removeGalleryPhoto } from "@/lib/firestoreService";
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

  // In-page Management Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<GalleryItem["category"]>("Keynotes");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    getGalleryPhotos().then((res) => {
      if (res && res.length > 0) {
        setItems(res);
      }
    });
  }, []);

  const categories = [
    "All",
    "Pre-DevFest Workshops",
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
              <button
                onClick={() => {
                  setEditingItem(null);
                  setFormTitle("");
                  setFormCategory("Keynotes");
                  setFormImageUrl("");
                  setFormCaption("");
                  setIsManageModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white shadow-md hover:bg-[#3367d6] hover:scale-105 transition-transform cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Edit Photos</span>
              </button>
            </div>
          </div>

          {notification && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-between">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="p-1 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
                className={`group rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col hover:shadow-2xl ${
                  isDark
                    ? "bg-[#0d0d0d] border-white/10 hover:border-blue-400/50"
                    : "bg-white border-gray-200 hover:border-[#1e1e1e]"
                }`}
              >
                <div
                  onClick={() => setSelectedImage(item)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
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
                    <span className="font-bold text-[#4285f4]">Essentia Luxury Arena</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(item);
                          setFormTitle(item.title);
                          setFormCategory(item.category);
                          setFormImageUrl(item.imageUrl);
                          setFormCaption(item.caption);
                          setIsManageModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10 cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (confirm(`Remove photo "${item.title}"?`)) {
                            await removeGalleryPhoto(item.id);
                            setItems((prev) => prev.filter((p) => p.id !== item.id));
                            setNotification("Photo removed successfully.");
                            setTimeout(() => setNotification(null), 3000);
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Manage / Edit Photo Modal */}
          {isManageModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
              onClick={() => setIsManageModalOpen(false)}
            >
              <div
                className={`max-w-xl w-full rounded-3xl p-6 sm:p-8 border-2 shadow-2xl relative ${
                  isDark ? "bg-[#0d0d0d] border-white/20 text-white" : "bg-white border-[#1e1e1e] text-[#1e1e1e]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#4285f4]" />
                    <span>{editingItem ? "Edit Photo Details" : "Add New Gallery Photo"}</span>
                  </h3>
                  <button
                    onClick={() => setIsManageModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formTitle.trim() || !formImageUrl.trim()) return;

                    const targetId = editingItem ? editingItem.id : `gal-${Date.now()}`;
                    const updatedItem: GalleryItem = {
                      id: targetId,
                      title: formTitle.trim(),
                      category: formCategory,
                      imageUrl: formImageUrl.trim(),
                      caption: formCaption.trim() || "DevFest Indore keynote & community showcase.",
                    };

                    await saveGalleryPhoto(updatedItem);
                    if (editingItem) {
                      setItems((prev) => prev.map((p) => (p.id === targetId ? updatedItem : p)));
                      setNotification("Photo details updated successfully!");
                    } else {
                      setItems((prev) => [updatedItem, ...prev]);
                      setNotification("New photo published to gallery!");
                    }

                    setIsManageModalOpen(false);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold mb-1">Photo Title</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Space Tech Pavilion & Satellite Demos"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                        isDark ? "bg-white/5 border-white/20 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Category / Track</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                          isDark ? "bg-[#141414] border-white/20 text-white" : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="Keynotes">Keynotes</option>
                        <option value="AI & Robotics">AI & Robotics</option>
                        <option value="Space">Space</option>
                        <option value="Showcase">Showcase</option>
                        <option value="Community">Community</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Upload File (Cloudinary)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            setIsUploading(true);
                            const url = await uploadToCloudinary(file);
                            setFormImageUrl(url);
                          } catch (err: any) {
                            alert(err.message || "Upload failed");
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        className="w-full text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#4285f4]"
                      />
                      {isUploading && (
                        <span className="text-[10px] text-[#4285f4] font-bold block mt-1">
                          Uploading image to Cloudinary...
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Image URL</label>
                    <input
                      type="text"
                      required
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or /gallery/..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                        isDark ? "bg-white/5 border-white/20 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Caption / Story</label>
                    <textarea
                      rows={2}
                      value={formCaption}
                      onChange={(e) => setFormCaption(e.target.value)}
                      placeholder="Explain what was happening in this moment..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                        isDark ? "bg-white/5 border-white/20 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsManageModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-6 py-2.5 rounded-xl bg-[#4285f4] hover:bg-[#3367d6] text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {editingItem ? "Update Photo" : "Add to Gallery"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
