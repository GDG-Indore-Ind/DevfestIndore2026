"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mic,
  QrCode,
  ArrowRight,
  Send,
  Upload,
  User,
  Mail,
  Building,
  FileText,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";
import { uploadToCloudinary } from "@/lib/cloudinary";

export interface SpeakerProposal {
  id: string;
  name: string;
  email: string;
  organization: string;
  topic: string;
  track: string;
  format: "Keynote (30m)" | "Deep-Dive Talk (45m)" | "Hands-on Workshop (90m)";
  abstract: string;
  bio: string;
  avatarUrl?: string;
  submittedAt: string;
}

export default function CallForSpeakersSection() {
  const { isDark } = useTheme();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [topic, setTopic] = useState("");
  const [track, setTrack] = useState("AI & Agentic AI");
  const [format, setFormat] = useState<"Keynote (30m)" | "Deep-Dive Talk (45m)" | "Hands-on Workshop (90m)">("Deep-Dive Talk (45m)");
  const [abstract, setAbstract] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const url = await uploadToCloudinary(file);
      setAvatarUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !topic || !abstract) return;

    setSubmitting(true);
    const proposal: SpeakerProposal = {
      id: "cfp-" + Date.now(),
      name,
      email,
      organization,
      topic,
      track,
      format,
      abstract,
      bio,
      avatarUrl,
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Save to LocalStorage for Admin Panel access
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("devfest-speaker-proposals");
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem("devfest-speaker-proposals", JSON.stringify([proposal, ...list]));
    }

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="call-for-speakers"
      className="py-12 md:py-16 relative overflow-hidden transition-colors duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <span className="text-[#f9ab00] cosmic-sparkle text-sm font-black">✦</span>
            <span className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              Speaker Call Open
            </span>
            <span className="text-xs text-gray-400 font-bold">|</span>
            <span className="text-xs font-bold text-[#4285f4]">DevFest Indore 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#f9ab00] to-[#ea4335]">
              Call for Speakers
            </span>
          </h2>
          <p className={`mt-3 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-white/85" : "text-gray-700"
          }`}>
            Submit your session proposal directly below. Our organizing team reviews every submission with direct notifications.
          </p>
        </div>

        {/* 2-Column Showcase: Left Official Poster & Details | Right Interactive Proposal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-on-scroll">
          {/* Left Column: Official DevFest Poster Card */}
          <div className="lg:col-span-5 flex flex-col">
            <CardTilt
              className={`rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden flex flex-col justify-between h-full shadow-xl ${
                isDark
                  ? "bg-[#0a0a0a]/90 border-white/15 shadow-[0_0_50px_rgba(66,133,244,0.15)]"
                  : "!bg-white !border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 rounded-full bg-[#4285f4] -rotate-12" />
                    <span className="w-2.5 h-6 rounded-full bg-[#ea4335] rotate-12" />
                    <span className="w-2.5 h-6 rounded-full bg-[#34a853] -rotate-12" />
                    <span className={`text-xs font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                      GDG Indore • 2026
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#4285f4]">
                    28 Nov 2026
                  </span>
                </div>

                <div className="relative aspect-square max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-white dark:bg-black/40 p-2 border border-gray-100 dark:border-white/10 mb-6 shadow-inner">
                  <Image
                    src={isDark ? "/images/astronaut-mascot-dark.jpg" : "/images/astronaut-mascot-light.jpg"}
                    alt="DevFest Indore Mascot - Call for Speakers"
                    fill
                    sizes="260px"
                    className="object-contain p-1"
                    priority
                    unoptimized
                  />
                </div>

                <h3 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Why Speak at DevFest Indore?
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0" />
                    <span>600+ Professional attendees & engineering leaders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0" />
                    <span>Exclusive VIP Speakers Dinner at Essentia Luxury Hotel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0" />
                    <span>Direct networking with GDEs, Qualcomm & Space Club delegates</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Prefer Sessionize?</span>
                <a
                  href="https://sessionize.com/devfest-indore-2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#4285f4] hover:underline flex items-center gap-1"
                >
                  <span>Apply on Sessionize Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardTilt>
          </div>

          {/* Right Column: Direct Embedded Proposal Submission Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between h-full ${
                isDark ? "bg-[#0d0d0d] border-white/15" : "bg-white border-gray-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-[#ea4335]" />
                    <h3 className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                      Direct Speaker Application Form
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#34a853] bg-[#34a853]/15 px-2.5 py-0.5 rounded-full">
                    Instant Review
                  </span>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmitProposal} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Dr. Priyal Sharma"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Organization / Designation
                        </label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="e.g. Lead AI Architect @ TechCorp"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Target Track *
                        </label>
                        <select
                          value={track}
                          onChange={(e) => setTrack(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                        >
                          <option value="Space Technology">Space Technology</option>
                          <option value="AI & Agentic AI">AI & Agentic AI</option>
                          <option value="Physical AI & Robotics">Physical AI & Robotics</option>
                          <option value="Data & Cloud">Data & Cloud Architecture</option>
                          <option value="Enterprise Innovation">Enterprise Innovation</option>
                          <option value="Modern Web">High-Scale Modern Web</option>
                          <option value="Mobile & Flutter">Android & Flutter Ecosystem</option>
                          <option value="Open Source">Open Source & Community</option>
                          <option value="Workshop Hands-on">Hands-on Workshop Lab</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Proposed Session Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="e.g. Building Resilient Autonomous Agent Swarms with Gemini"
                          className="w-full px-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Format *
                        </label>
                        <select
                          value={format}
                          onChange={(e) => setFormat(e.target.value as any)}
                          className="w-full px-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                        >
                          <option value="Deep-Dive Talk (45m)">Talk (45m)</option>
                          <option value="Keynote (30m)">Keynote (30m)</option>
                          <option value="Hands-on Workshop (90m)">Workshop (90m)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Session Abstract & Takeaways *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        placeholder="What will attendees learn? Provide 2-3 lines about code demos, architecture, or prerequisites..."
                        className="w-full px-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Speaker Bio (2 lines)
                        </label>
                        <input
                          type="text"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Brief introduction or LinkedIn URL"
                          className="w-full px-3.5 py-2 rounded-xl text-xs border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-[#4285f4]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Upload Headshot Photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-[#4285f4]"
                        />
                        {uploadingAvatar && (
                          <span className="text-[10px] text-[#4285f4] font-bold block mt-1">
                            Uploading photo to Cloudinary...
                          </span>
                        )}
                        {avatarUrl && (
                          <span className="text-[10px] text-[#34a853] font-bold block mt-1">
                            ✓ Photo uploaded successfully
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-2xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#3367d6] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Transmitting Proposal..." : "Submit Speaker Proposal"}</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#34a853] mx-auto animate-bounce" />
                    <h4 className="text-base font-black text-green-900 dark:text-green-200">
                      Proposal Received Successfully!
                    </h4>
                    <p className="text-xs text-green-800 dark:text-green-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{name}</strong>. Your proposal for <em>&ldquo;{topic}&rdquo;</em> has been transmitted to the DevFest Indore 2026 organizing team. We will review it in our admin portal and contact you via {email}.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold px-4 py-2 rounded-xl bg-white dark:bg-black/50 border border-green-300 dark:border-green-700 text-green-900 dark:text-green-200 hover:scale-105 transition-transform"
                    >
                      Submit Another Topic
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
