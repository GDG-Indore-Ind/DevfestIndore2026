"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, ExternalLink, Sparkles, Compass } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { useTheme } from "@/contexts/ThemeContext";

interface InstaPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
  date: string;
}

const INSTAGRAM_POSTS: InstaPost[] = [
  {
    id: "post-1",
    image: "/gallery/opt_DSCF7164.JPG",
    caption: "The energy at plenary keynote was out of this world! 600+ developers united under one cosmic roof. 🚀✨ #DevFestIndore #GDGIndore",
    likes: "482",
    comments: "38",
    tag: "@gdgindore",
    date: "DevFest Vibes",
  },
  {
    id: "post-2",
    image: "/gallery/opt_DSCF7166.JPG",
    caption: "Deep dive conversations on Agentic AI & cloud infrastructure with Google Developer Experts! Swipe to see the packed halls. 🔥 #AIIndore",
    likes: "614",
    comments: "45",
    tag: "#DevFest2026",
    date: "Speaker Stage",
  },
  {
    id: "post-3",
    image: "/gallery/opt_DSCF7167.JPG",
    caption: "Codelab swarm arena: real-time models running on local silicon with hands-on mentors guiding every step! 💻⚡ #HandsOnTech",
    likes: "529",
    comments: "29",
    tag: "@googledevs",
    date: "Codelabs Arena",
  },
  {
    id: "post-4",
    image: "/gallery/opt_DSCF7168.JPG",
    caption: "Indori high tea networking breaks + tech discussions = unmatched community warmth. Pure Indore hospitality! ☕🍪 #IndoreCommunity",
    likes: "731",
    comments: "62",
    tag: "#IndoreTech",
    date: "Ecosystem Lawns",
  },
];

export default function InstagramFeedSection() {
  const { isDark } = useTheme();

  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-3 hover:scale-105 transition-transform">
              <InstagramIcon className="w-4 h-4 text-[#e1306c]" />
              <span className={`text-xs font-mono font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
                Social Stream • Live Instagram Reels & Stories
              </span>
              <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className={isDark ? "text-white" : "text-gray-900"}>Live From the</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1306c] via-[#f77737] to-[#fcaf45]">
                #GDGIndore Gram
              </span>
            </h2>

            <p className={`mt-2 text-sm sm:text-base font-normal max-w-2xl ${isDark ? "text-white/80" : "text-gray-700"}`}>
              Catch behind-the-scenes moments, speaker spotlights, reel drops, and developer stories tagged across the community.
            </p>
          </div>

          <a
            href="https://www.instagram.com/gdgindore/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all group shrink-0 shadow-lg hover:scale-105 active:scale-95 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @gdgindore</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4 Instagram Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/gdgindore/"
              target="_blank"
              rel="noreferrer"
              className={`rounded-3xl border-2 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                isDark
                  ? "bg-[#0d0d0d] border-white/10 hover:border-[#e1306c]/40"
                  : "bg-white border-gray-200 hover:border-[#e1306c]/40 shadow-md"
              }`}
            >
              {/* Card Top: Author Tag */}
              <div className="p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ab00] via-[#ea4335] to-[#4285f4] p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-black text-white">
                      GDG
                    </div>
                  </div>
                  <div>
                    <span className={`block text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      gdgindore
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Essentia Arena</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
                  {post.date}
                </span>
              </div>

              {/* Card Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-black">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-[#e1306c]" /> View Reel on Instagram
                  </span>
                </div>
              </div>

              {/* Card Bottom: Likes, Comments, Caption */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1 text-[#ea4335]">
                    <Heart className="w-4 h-4 fill-[#ea4335]" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </span>
                </div>

                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
