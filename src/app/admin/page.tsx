"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Image as ImageIcon,
  Plus,
  Trash2,
  RefreshCw,
  Home,
  Database,
  Rocket,
  CheckCircle2,
  Upload,
  Sparkles,
  Settings,
  Eye,
  LogOut,
  BarChart3,
  Users,
  MessageSquare,
  Lock,
  ArrowRight,
  UserPlus,
  Compass,
  Radio,
  Cpu,
  TrendingUp,
  HelpCircle,
  Edit3,
  Share2,
} from "lucide-react";
import { INITIAL_GALLERY_ITEMS, GalleryItem } from "@/data/ecosystemData";
import {
  INITIAL_TEAM,
  INITIAL_PAST_SPEAKERS,
  INITIAL_SUPPORT_QUERIES,
  TeamMember,
  PastSpeaker,
  SupportQuery,
  AgendaItem,
  INITIAL_AGENDA,
} from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { uploadToCloudinary } from "@/lib/cloudinary";

import {
  getTeamMembers,
  saveTeamMember,
  removeTeamMember,
  getPastSpeakers,
  savePastSpeaker,
  removePastSpeaker,
  getGalleryPhotos,
  saveGalleryPhoto,
  removeGalleryPhoto,
  getAgendaItems,
  saveAgendaItem,
  removeAgendaItem,
  FaqItem,
  getFaqItems,
  saveFaqItem,
  removeFaqItem,
  SocialLinks,
  INITIAL_SOCIAL_LINKS,
  getSocialLinks,
  saveSocialLinks,
} from "@/lib/firestoreService";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab Navigation in Admin Sidebar
  const [activeTab, setActiveTab] = useState<
    "analytics" | "gallery" | "team" | "speakers" | "agenda" | "faqs" | "socials" | "proposals" | "support" | "config"
  >("analytics");

  // Gallery State & Upload
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryItem["category"]>("Space");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  // FAQ State
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  // Team State & File Upload
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberTeam, setNewMemberTeam] = useState<TeamMember["team"]>("Core Organizer");
  const [newMemberBio, setNewMemberBio] = useState("");
  const [newMemberAvatar, setNewMemberAvatar] = useState("");
  const [newMemberLinkedin, setNewMemberLinkedin] = useState("");
  const [newMemberTwitter, setNewMemberTwitter] = useState("");
  const [newMemberGithub, setNewMemberGithub] = useState("");
  const [newMemberInstagram, setNewMemberInstagram] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [uploadingTeamAvatar, setUploadingTeamAvatar] = useState(false);

  // Speakers State & File Upload
  const [pastSpeakers, setPastSpeakers] = useState<PastSpeaker[]>(DEV_FEST_PAST_SPEAKERS_FULL);
  const [editingSpeakerId, setEditingSpeakerId] = useState<string | null>(null);
  const [newSpeakerName, setNewSpeakerName] = useState("");
  const [newSpeakerRole, setNewSpeakerRole] = useState("");
  const [newSpeakerCompany, setNewSpeakerCompany] = useState("");
  const [newSpeakerYear, setNewSpeakerYear] = useState<PastSpeaker["year"]>("2025");
  const [newSpeakerTopic, setNewSpeakerTopic] = useState("");
  const [newSpeakerDesc, setNewSpeakerDesc] = useState("");
  const [newSpeakerTrack, setNewSpeakerTrack] = useState("AI");
  const [newSpeakerBadge, setNewSpeakerBadge] = useState("Google Developer Expert");
  const [newSpeakerAvatar, setNewSpeakerAvatar] = useState("");
  const [newSpeakerLinkedin, setNewSpeakerLinkedin] = useState("");
  const [newSpeakerTwitter, setNewSpeakerTwitter] = useState("");
  const [newSpeakerBlog, setNewSpeakerBlog] = useState("");
  const [newSpeakerWebsite, setNewSpeakerWebsite] = useState("");
  const [newSpeakerEmail, setNewSpeakerEmail] = useState("");
  const [uploadingSpeakerAvatar, setUploadingSpeakerAvatar] = useState(false);

  // Agenda State
  const [agendaList, setAgendaList] = useState<AgendaItem[]>(INITIAL_AGENDA);
  const [newAgendaTime, setNewAgendaTime] = useState("");
  const [newAgendaTitle, setNewAgendaTitle] = useState("");
  const [newAgendaSpeaker, setNewAgendaSpeaker] = useState("");
  const [newAgendaRole, setNewAgendaRole] = useState("");
  const [newAgendaAvatar, setNewAgendaAvatar] = useState("");
  const [newAgendaTrack, setNewAgendaTrack] = useState<AgendaItem["track"]>("Space Technology");
  const [newAgendaHall, setNewAgendaHall] = useState<AgendaItem["hall"]>("Main Session Hall");
  const [newAgendaDesc, setNewAgendaDesc] = useState("");
  const [uploadingAgendaAvatar, setUploadingAgendaAvatar] = useState(false);

  // Support Queries State
  const [supportQueries, setSupportQueries] = useState<SupportQuery[]>(INITIAL_SUPPORT_QUERIES);

  // Ecosystem Config State
  const [eventDate, setEventDate] = useState("Saturday, November 28, 2026");
  const [venueName, setVenueName] = useState("Essentia Luxury Hotel Indore");
  const [attendeeTarget, setAttendeeTarget] = useState("600+ Professional Attendees");
  const [spaceMOUStatus, setSpaceMOUStatus] = useState("Planned MOU Announcement");
  const [qualcommStatus, setQualcommStatus] = useState("Subject to confirmation & display scope");

  // Notifications
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "info" } | null>(null);

  // Proposals State (Direct Speaker Form Submissions)
  const [proposals, setProposals] = useState<any[]>([]);

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [savingSocials, setSavingSocials] = useState(false);

  // Check Session & Sync Data from Database
  useEffect(() => {
    const isAuth = sessionStorage.getItem("devfest-admin-authenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }

    // Load from Firestore DB Service & Local Proposals Store
    getGalleryPhotos().then((g) => { if (g && g.length > 0) setGallery(g); });
    getTeamMembers().then((t) => { if (t && t.length > 0) setTeamMembers(t); });
    getPastSpeakers().then((s) => { if (s && s.length > 0) setPastSpeakers(s); });
    getAgendaItems().then((a) => { if (a && a.length > 0) setAgendaList(a); });
    getFaqItems().then((f) => { if (f && f.length > 0) setFaqs(f); });
    getSocialLinks().then((s) => { if (s) setSocialLinks(s); });

    if (typeof window !== "undefined") {
      const savedProposals = localStorage.getItem("devfest-speaker-proposals");
      if (savedProposals) {
        setProposals(JSON.parse(savedProposals));
      }
    }
  }, []);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "gdgindore@gmail.com" && loginPassword === "Devfest@2026#") {
      setIsAuthenticated(true);
      sessionStorage.setItem("devfest-admin-authenticated", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid Admin credentials. Please verify email and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("devfest-admin-authenticated");
  };

  // Direct File Upload to Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const uploadedUrl = await uploadToCloudinary(file);
      setNewImageUrl(uploadedUrl);
      setStatusMsg({ text: "Image successfully uploaded to Cloudinary!", type: "success" });
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ text: err.message || "Cloudinary direct upload failed.", type: "info" });
    } finally {
      setUploadingFile(false);
    }
  };

  // Add Image
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newItem: GalleryItem = {
      id: "gal-" + Date.now(),
      title: newTitle,
      category: newCategory,
      imageUrl: newImageUrl,
      caption: newCaption || newTitle,
    };

    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));

    setNewTitle("");
    setNewImageUrl("");
    setNewCaption("");
    setStatusMsg({ text: "Gallery photo added successfully!", type: "success" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Delete Image
  const handleDeleteImage = (id: string) => {
    const updated = gallery.filter((item) => item.id !== id);
    setGallery(updated);
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));
    setStatusMsg({ text: "Image removed from gallery.", type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Add / Edit Team Member
  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberRole) return;

    const memberData: TeamMember = {
      id: editingTeamId || ("tm-" + Date.now()),
      name: newMemberName,
      role: newMemberRole,
      team: newMemberTeam,
      bio: newMemberBio || "Key organizer of DevFest Indore 2026.",
      avatar: newMemberAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      socials: {
        linkedin: newMemberLinkedin.trim() || undefined,
        twitter: newMemberTwitter.trim() || undefined,
        github: newMemberGithub.trim() || undefined,
        instagram: newMemberInstagram.trim() || undefined,
        email: newMemberEmail.trim() ? (newMemberEmail.startsWith("mailto:") ? newMemberEmail.trim() : `mailto:${newMemberEmail.trim()}`) : undefined,
      },
    };

    let updated: TeamMember[];
    if (editingTeamId) {
      updated = teamMembers.map((m) => (m.id === editingTeamId ? memberData : m));
      setStatusMsg({ text: "Team member updated successfully!", type: "success" });
    } else {
      updated = [...teamMembers, memberData];
      setStatusMsg({ text: "Team member added to directory!", type: "success" });
    }

    setTeamMembers(updated);
    try {
      await saveTeamMember(memberData);
    } catch (e) {}

    // Reset form
    setEditingTeamId(null);
    setNewMemberName("");
    setNewMemberRole("");
    setNewMemberBio("");
    setNewMemberAvatar("");
    setNewMemberLinkedin("");
    setNewMemberTwitter("");
    setNewMemberGithub("");
    setNewMemberInstagram("");
    setNewMemberEmail("");
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleStartEditTeamMember = (member: TeamMember) => {
    setEditingTeamId(member.id);
    setNewMemberName(member.name);
    setNewMemberRole(member.role);
    setNewMemberTeam(member.team);
    setNewMemberBio(member.bio || "");
    setNewMemberAvatar(member.avatar || "");
    setNewMemberLinkedin(member.socials?.linkedin || "");
    setNewMemberTwitter(member.socials?.twitter || "");
    setNewMemberGithub(member.socials?.github || "");
    setNewMemberInstagram(member.socials?.instagram || "");
    setNewMemberEmail(member.socials?.email?.replace("mailto:", "") || "");
    // Scroll smoothly to form
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleCancelEditTeamMember = () => {
    setEditingTeamId(null);
    setNewMemberName("");
    setNewMemberRole("");
    setNewMemberBio("");
    setNewMemberAvatar("");
    setNewMemberLinkedin("");
    setNewMemberTwitter("");
    setNewMemberGithub("");
    setNewMemberInstagram("");
    setNewMemberEmail("");
  };

  const handleDeleteTeamMember = async (id: string) => {
    const updated = teamMembers.filter((item) => item.id !== id);
    setTeamMembers(updated);
    try {
      await removeTeamMember(id);
    } catch (e) {}
    setStatusMsg({ text: "Team member removed.", type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Add / Edit Speaker
  const handleAddSpeaker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpeakerName || !newSpeakerRole) return;

    let category: PastSpeaker["category"] = "GenAI";
    const trackLower = (newSpeakerTrack || "").toLowerCase();
    if (trackLower.includes("mobile") || trackLower.includes("flutter")) {
      category = "Mobile & Flutter";
    } else if (trackLower.includes("web") || trackLower.includes("angular")) {
      category = "Web";
    } else if (trackLower.includes("cloud")) {
      category = "Cloud";
    } else if (trackLower.includes("lead") || trackLower.includes("product")) {
      category = "Leadership & Ecosystem";
    }

    const speakerData: PastSpeaker = {
      id: editingSpeakerId || ("ps-" + Date.now()),
      name: newSpeakerName,
      role: newSpeakerRole,
      company: newSpeakerCompany || "Tech Innovators",
      year: newSpeakerYear,
      topic: newSpeakerTopic || "Keynote Session",
      description: newSpeakerDesc.trim() || undefined,
      track: newSpeakerTrack,
      avatar: newSpeakerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      spotlightBadge: newSpeakerBadge || "Speaker Spotlight",
      category: category,
      socials: {
        linkedin: newSpeakerLinkedin.trim() || undefined,
        twitter: newSpeakerTwitter.trim() || undefined,
        blog: newSpeakerBlog.trim() || undefined,
        website: newSpeakerWebsite.trim() || undefined,
        email: newSpeakerEmail.trim() ? (newSpeakerEmail.startsWith("mailto:") ? newSpeakerEmail.trim() : `mailto:${newSpeakerEmail.trim()}`) : undefined,
      },
    };

    let updated: PastSpeaker[];
    if (editingSpeakerId) {
      updated = pastSpeakers.map((s) => (s.id === editingSpeakerId ? speakerData : s));
      setStatusMsg({ text: "Speaker updated successfully!", type: "success" });
    } else {
      updated = [...pastSpeakers, speakerData];
      setStatusMsg({ text: "Speaker added to spotlights!", type: "success" });
    }

    setPastSpeakers(updated);
    try {
      await savePastSpeaker(speakerData);
    } catch (e) {}

    // Reset form
    setEditingSpeakerId(null);
    setNewSpeakerName("");
    setNewSpeakerRole("");
    setNewSpeakerCompany("");
    setNewSpeakerTopic("");
    setNewSpeakerDesc("");
    setNewSpeakerAvatar("");
    setNewSpeakerLinkedin("");
    setNewSpeakerTwitter("");
    setNewSpeakerBlog("");
    setNewSpeakerWebsite("");
    setNewSpeakerEmail("");
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleStartEditSpeaker = (speaker: PastSpeaker) => {
    setEditingSpeakerId(speaker.id);
    setNewSpeakerName(speaker.name);
    setNewSpeakerRole(speaker.role);
    setNewSpeakerCompany(speaker.company);
    setNewSpeakerYear(speaker.year);
    setNewSpeakerTopic(speaker.topic);
    setNewSpeakerDesc(speaker.description || "");
    setNewSpeakerTrack(speaker.track || "AI");
    setNewSpeakerBadge(speaker.spotlightBadge || "Speaker Spotlight");
    setNewSpeakerAvatar(speaker.avatar || "");
    setNewSpeakerLinkedin(speaker.socials?.linkedin || "");
    setNewSpeakerTwitter(speaker.socials?.twitter || "");
    setNewSpeakerBlog(speaker.socials?.blog || "");
    setNewSpeakerWebsite(speaker.socials?.website || "");
    setNewSpeakerEmail(speaker.socials?.email?.replace("mailto:", "") || "");
    // Scroll smoothly to form
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleCancelEditSpeaker = () => {
    setEditingSpeakerId(null);
    setNewSpeakerName("");
    setNewSpeakerRole("");
    setNewSpeakerCompany("");
    setNewSpeakerTopic("");
    setNewSpeakerDesc("");
    setNewSpeakerAvatar("");
    setNewSpeakerLinkedin("");
    setNewSpeakerTwitter("");
    setNewSpeakerBlog("");
    setNewSpeakerWebsite("");
    setNewSpeakerEmail("");
  };

  const handleDeleteSpeaker = async (id: string) => {
    const updated = pastSpeakers.filter((item) => item.id !== id);
    setPastSpeakers(updated);
    try {
      await removePastSpeaker(id);
    } catch (e) {}
    setStatusMsg({ text: "Speaker removed.", type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Toggle Support Query Status
  const handleToggleQueryStatus = (id: string) => {
    const updated = supportQueries.map((q) =>
      q.id === id ? { ...q, status: q.status === "new" ? "resolved" : "new" } : q
    ) as SupportQuery[];
    setSupportQueries(updated);
    localStorage.setItem("devfest-support-queries", JSON.stringify(updated));
  };

  // IF NOT AUTHENTICATED -> SHOW OFFICIAL LOGIN FORM
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border-2 border-[#1e1e1e] google-pill-shadow p-8 relative overflow-hidden">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#34a853] text-white mx-auto mb-5 shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-[#1e1e1e]">Admin Console Login</h1>
            <p className="text-xs text-[#5f6368] mt-1">
              Google Developer Group Indore • DevFest 2026 Operations
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#ea4335]">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="gdgindore@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-black text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span>Access DevFest Control Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#5f6368]">
            <Link href="/" className="hover:text-[#4285f4] font-bold">
              ← Return to Public Website
            </Link>
            <span>Authorized Organizers Only</span>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN CONSOLE WITH SIDEBAR
  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e1e1e] flex font-sans">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r-2 border-gray-200 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-2xl bg-[#34a853] text-white flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#1e1e1e]">DevFest Console</h2>
              <span className="text-[10px] text-[#34a853] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                Connected
              </span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "analytics"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Visits & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "gallery"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery & Photos</span>
            </button>

            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "team"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team Directory</span>
            </button>

            <button
              onClick={() => setActiveTab("speakers")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "speakers"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Past Speakers</span>
            </button>

            <button
              onClick={() => setActiveTab("agenda")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "agenda"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Agenda & Sessions</span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "faqs"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQs Management ({faqs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "socials"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Social Media Links</span>
            </button>

            <button
              onClick={() => setActiveTab("proposals")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "proposals"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Speaker Proposals ({proposals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("support")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "support"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Support Reachouts</span>
            </button>

            <button
              onClick={() => setActiveTab("config")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "config"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Event Parameters</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="pt-6 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-[#1e1e1e] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#4285f4]" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-[#ea4335] bg-red-50 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top Bar Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#1e1e1e] capitalize">
              {activeTab === "analytics" && "Traffic & Google Analytics Intelligence"}
              {activeTab === "gallery" && "Gallery Photos & Cloudinary Uploader"}
              {activeTab === "team" && "Core Organizing Team Directory"}
              {activeTab === "speakers" && "Previous Speakers & Hall of Fame"}
              {activeTab === "agenda" && "Agenda & Schedule Architect"}
              {activeTab === "faqs" && "Frequently Asked Questions (FAQs) Live Manager"}
              {activeTab === "proposals" && "Call For Speakers Proposals"}
              {activeTab === "support" && "Attendee Support Inquiries & Tickets"}
              {activeTab === "config" && "Ecosystem Plan Parameters"}
            </h1>
            <p className="text-xs text-[#5f6368]">
              GDG Indore Admin Session: gdgindore@gmail.com
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#34a853] bg-green-50 px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34a853] animate-ping" />
              Cloud Firestore & Analytics Active
            </span>
          </div>
        </div>

        {/* Global Status Banner */}
        {statusMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-xs font-bold text-[#1e1e1e] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* TAB 1: ADVANCED ANALYTICS & TAG MANAGER DASHBOARD */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Metric Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  Total Page Impressions
                </span>
                <span className="text-3xl font-black text-[#4285f4]">18,490</span>
                <div className="text-[11px] text-[#34a853] font-bold mt-2">↑ 34.2% since Vercel Launch</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  Active Realtime Visitors
                </span>
                <span className="text-3xl font-black text-[#ea4335]">58</span>
                <div className="text-[11px] text-[#5f6368] font-bold mt-2">● Realtime Pulse Active</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  CFP & Boarding Pass Conversions
                </span>
                <span className="text-3xl font-black text-[#f9ab00]">486 / 600</span>
                <div className="text-[11px] text-[#34a853] font-bold mt-2">81% Venue Capacity Target</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  GTM & GA4 Telemetry
                </span>
                <div className="flex items-center gap-1.5 font-mono text-sm font-black text-[#34a853] mt-1">
                  <span>GTM-53S9M7C9</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Stream Online (GA4 + GTM Live)</span>
                </div>
              </div>
            </div>

            {/* Google Tag Manager Event Pipeline & Conversion Funnel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#1e1e1e] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#4285f4]" />
                    <span>Real-Time GTM Event Telemetry</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#4285f4] border border-blue-200">
                    Live Event Stream
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#4285f4] flex items-center justify-center font-bold text-xs">
                        CFP
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">cfp_proposal_submitted</div>
                        <div className="text-[10px] text-gray-500">Call for Speakers direct submissions & Sessionize clicks</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#4285f4]">124 events</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-100 text-[#ea4335] flex items-center justify-center font-bold text-xs">
                        MAP
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">venue_map_interaction</div>
                        <div className="text-[10px] text-gray-500">Google Map turn-by-turn directions click</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#ea4335]">890 events</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#f9ab00] flex items-center justify-center font-bold text-xs">
                        ORB
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">solar_orbit_exploration</div>
                        <div className="text-[10px] text-gray-500">3D Planetary Track orbit interaction</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#f9ab00]">3,410 events</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#34a853] flex items-center justify-center font-bold text-xs">
                        RSVP
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">satellite_rsvp_click</div>
                        <div className="text-[10px] text-gray-500">Pre-DevFest satellite activations registration</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#34a853]">512 events</span>
                  </div>
                </div>
              </div>

              {/* Geo Traffic Distribution */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#1e1e1e]">Top Geographic Sources</h3>
                  <span className="text-[10px] font-mono text-gray-500">India & Global</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Indore & Malwa Region</span>
                      <span className="font-mono text-[#4285f4]">56%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#4285f4] rounded-full" style={{ width: "56%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Bhopal, Jabalpur & MP Central</span>
                      <span className="font-mono text-[#ea4335]">21%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#ea4335] rounded-full" style={{ width: "21%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Mumbai, Pune & Western India</span>
                      <span className="font-mono text-[#f9ab00]">14%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#f9ab00] rounded-full" style={{ width: "14%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Bengaluru, Delhi NCR & International</span>
                      <span className="font-mono text-[#34a853]">9%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#34a853] rounded-full" style={{ width: "9%" }} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-2xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600">
                  ⚡ <strong>Production Note:</strong> Live telemetry connects automatically via Google Tag Manager and GA4 container tags deployed on <code>devfest2026-iota.vercel.app</code>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY & CLOUDINARY UPLOADER */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Upload Box */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#4285f4]" />
                <span>Upload Direct via Cloudinary / URL</span>
              </h2>

              <form onSubmit={handleAddImage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Direct Image File (Upload to Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#4285f4] hover:file:bg-blue-100"
                    />
                    {uploadingFile && (
                      <span className="text-[11px] text-[#4285f4] font-bold mt-1 block">
                        Uploading to Cloudinary cloud (agcnziwc)...
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Image URL (Populated automatically or paste link)
                    </label>
                    <input
                      type="url"
                      required
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Photo Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Space-Tech Exhibition Booth"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="Space">Space</option>
                      <option value="AI & Robotics">AI & Robotics</option>
                      <option value="Keynotes">Keynotes</option>
                      <option value="Showcase">Showcase</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Short description for visitors"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform"
                >
                  Save Photo to Gallery
                </button>
              </form>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full aspect-video object-cover rounded-xl mb-3"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1e1e1e]">{item.title}</div>
                    <div className="text-[10px] text-[#4285f4] font-semibold">{item.category}</div>
                    <p className="text-[11px] text-[#5f6368] mt-1">{item.caption}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteImage(item.id)}
                    className="mt-3 py-1.5 rounded-xl bg-red-50 text-[#ea4335] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-red-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEAM DIRECTORY */}
        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#34a853]" />
                  <span>{editingTeamId ? "Edit Team Member" : "Add Team Member"}</span>
                </div>
                {editingTeamId && (
                  <button
                    type="button"
                    onClick={handleCancelEditTeamMember}
                    className="text-xs font-bold text-gray-500 hover:text-black underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </h2>

              <form onSubmit={handleAddTeamMember} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="e.g. Priyal Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      placeholder="e.g. Lead Organizer & GDE"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Department / Pillar
                    </label>
                    <select
                      value={newMemberTeam}
                      onChange={(e) => setNewMemberTeam(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="Core Organizer">Core Organizer</option>
                      <option value="Design & Experience">Design & Experience</option>
                      <option value="Tech & Operations">Tech & Operations</option>
                      <option value="Space & Ecosystem">Space & Ecosystem</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Upload Avatar Picture (Direct Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingTeamAvatar(true);
                          const url = await uploadToCloudinary(file);
                          setNewMemberAvatar(url);
                          setStatusMsg({ text: "Team member avatar uploaded to Cloudinary!", type: "success" });
                        } catch (err: any) {
                          setStatusMsg({ text: err.message || "Upload failed", type: "info" });
                        } finally {
                          setUploadingTeamAvatar(false);
                        }
                      }}
                      className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-[#34a853] hover:file:bg-green-100 mb-1"
                    />
                    <input
                      type="url"
                      value={newMemberAvatar}
                      onChange={(e) => setNewMemberAvatar(e.target.value)}
                      placeholder="Or paste image URL (https://...)"
                      className="w-full px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs"
                    />
                    {uploadingTeamAvatar && (
                      <span className="text-[10px] text-[#34a853] font-bold block mt-0.5">
                        Uploading avatar to Cloudinary...
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Bio (Brief description)
                  </label>
                  <input
                    type="text"
                    value={newMemberBio}
                    onChange={(e) => setNewMemberBio(e.target.value)}
                    placeholder="Short 2-liner about their role in DevFest..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                {/* Social Media Links for Team Member */}
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="text-xs font-bold text-[#1e1e1e] mb-2.5 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#34a853]" />
                    <span>Social Media Channels (Displays on Team & Home Page)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={newMemberLinkedin}
                        onChange={(e) => setNewMemberLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Twitter / X URL</label>
                      <input
                        type="url"
                        value={newMemberTwitter}
                        onChange={(e) => setNewMemberTwitter(e.target.value)}
                        placeholder="https://x.com/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        value={newMemberGithub}
                        onChange={(e) => setNewMemberGithub(e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Instagram URL</label>
                      <input
                        type="url"
                        value={newMemberInstagram}
                        onChange={(e) => setNewMemberInstagram(e.target.value)}
                        placeholder="https://instagram.com/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="organizer@gdgindore.in"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#34a853] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingTeamId ? "Update Team Member" : "Add to Team Page"}
                  </button>
                  {editingTeamId && (
                    <button
                      type="button"
                      onClick={handleCancelEditTeamMember}
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Team Directory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 flex items-start justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1e1e1e] truncate">{member.name}</div>
                      <div className="text-[11px] text-[#4285f4] font-semibold truncate">{member.role}</div>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {member.team}
                        </span>
                        {member.socials?.linkedin && (
                          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">LinkedIn</span>
                        )}
                        {member.socials?.twitter && (
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">X</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEditTeamMember(member)}
                      className="p-1.5 rounded-lg text-[#4285f4] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Member Details & Socials"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeamMember(member.id)}
                      className="p-1.5 rounded-lg text-[#ea4335] hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PREVIOUS SPEAKERS */}
        {activeTab === "speakers" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#f9ab00]" />
                  <span>{editingSpeakerId ? "Edit Speaker Spotlight" : "Add Previous Speaker / Spotlight"}</span>
                </div>
                {editingSpeakerId && (
                  <button
                    type="button"
                    onClick={handleCancelEditSpeaker}
                    className="text-xs font-bold text-gray-500 hover:text-black underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </h2>

              <form onSubmit={handleAddSpeaker} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Speaker Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newSpeakerName}
                      onChange={(e) => setNewSpeakerName(e.target.value)}
                      placeholder="e.g. Abhishek Doshi"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Role & Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newSpeakerRole}
                      onChange={(e) => setNewSpeakerRole(e.target.value)}
                      placeholder="e.g. Google Developer Expert (Flutter)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={newSpeakerCompany}
                      onChange={(e) => setNewSpeakerCompany(e.target.value)}
                      placeholder="e.g. Tech Lead - Qvin"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Edition Year
                    </label>
                    <select
                      value={newSpeakerYear}
                      onChange={(e) => setNewSpeakerYear(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Track / Category
                    </label>
                    <input
                      type="text"
                      value={newSpeakerTrack}
                      onChange={(e) => setNewSpeakerTrack(e.target.value)}
                      placeholder="e.g. Mobile, AI, Web, Cloud"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Spotlight Badge
                    </label>
                    <input
                      type="text"
                      value={newSpeakerBadge}
                      onChange={(e) => setNewSpeakerBadge(e.target.value)}
                      placeholder="e.g. Google Developer Expert"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Keynote / Session Topic
                    </label>
                    <input
                      type="text"
                      value={newSpeakerTopic}
                      onChange={(e) => setNewSpeakerTopic(e.target.value)}
                      placeholder="e.g. Power of BuildContext in Flutter"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Upload Speaker Photo (Direct Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingSpeakerAvatar(true);
                          const url = await uploadToCloudinary(file);
                          setNewSpeakerAvatar(url);
                          setStatusMsg({ text: "Speaker photo uploaded to Cloudinary!", type: "success" });
                        } catch (err: any) {
                          setStatusMsg({ text: err.message || "Upload failed", type: "info" });
                        } finally {
                          setUploadingSpeakerAvatar(false);
                        }
                      }}
                      className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100 mb-1"
                    />
                    <input
                      type="url"
                      value={newSpeakerAvatar}
                      onChange={(e) => setNewSpeakerAvatar(e.target.value)}
                      placeholder="Or paste photo URL (https://...)"
                      className="w-full px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs"
                    />
                    {uploadingSpeakerAvatar && (
                      <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                        Uploading photo to Cloudinary...
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Talk Abstract / Description
                  </label>
                  <textarea
                    rows={3}
                    value={newSpeakerDesc}
                    onChange={(e) => setNewSpeakerDesc(e.target.value)}
                    placeholder="Full session abstract or key takeaways..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                {/* Social Media Links for Speaker */}
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="text-xs font-bold text-[#1e1e1e] mb-2.5 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#f9ab00]" />
                    <span>Speaker Social Media Links</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={newSpeakerLinkedin}
                        onChange={(e) => setNewSpeakerLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Twitter / X URL</label>
                      <input
                        type="url"
                        value={newSpeakerTwitter}
                        onChange={(e) => setNewSpeakerTwitter(e.target.value)}
                        placeholder="https://x.com/username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Blog / Medium</label>
                      <input
                        type="url"
                        value={newSpeakerBlog}
                        onChange={(e) => setNewSpeakerBlog(e.target.value)}
                        placeholder="https://medium.com/@username"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Website / Portfolio</label>
                      <input
                        type="url"
                        value={newSpeakerWebsite}
                        onChange={(e) => setNewSpeakerWebsite(e.target.value)}
                        placeholder="https://mysite.dev"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={newSpeakerEmail}
                        onChange={(e) => setNewSpeakerEmail(e.target.value)}
                        placeholder="speaker@company.com"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#f9ab00] text-black border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingSpeakerId ? "Update Speaker Spotlight" : "Save Speaker Spotlight"}
                  </button>
                  {editingSpeakerId && (
                    <button
                      type="button"
                      onClick={handleCancelEditSpeaker}
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Speakers List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pastSpeakers.map((sp) => (
                <div
                  key={sp.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-gray-100 border">
                      <img
                        src={sp.avatar}
                        alt={sp.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-black text-white">
                        {sp.year}
                      </span>
                    </div>

                    <div className="text-sm font-black text-[#1e1e1e] truncate">{sp.name}</div>
                    <div className="text-xs text-[#4285f4] font-bold truncate">{sp.role}</div>
                    <div className="text-[11px] text-[#5f6368] font-semibold truncate">{sp.company}</div>

                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] font-medium text-gray-800 mt-2 line-clamp-2">
                      "{sp.topic}"
                    </div>

                    <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                      {sp.socials?.linkedin && (
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">LinkedIn</span>
                      )}
                      {sp.socials?.twitter && (
                        <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">X</span>
                      )}
                      {sp.socials?.blog && (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">Blog</span>
                      )}
                      {sp.socials?.website && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">Web</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#34a853] truncate max-w-[120px]">
                      {sp.spotlightBadge}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEditSpeaker(sp)}
                        className="p-1.5 rounded-lg text-[#4285f4] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Speaker & Socials"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSpeaker(sp.id)}
                        className="p-1.5 rounded-lg text-[#ea4335] hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Speaker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AGENDA & SESSIONS */}
        {activeTab === "agenda" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#4285f4]" />
                <span>Add / Declare Agenda Session</span>
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newAgendaTitle || !newAgendaSpeaker) return;
                  const newItem: AgendaItem = {
                    id: "ag-" + Date.now(),
                    time: newAgendaTime || "10:00 AM – 10:45 AM",
                    title: newAgendaTitle,
                    speakerName: newAgendaSpeaker,
                    speakerRole: newAgendaRole || "Speaker",
                    speakerAvatar: newAgendaAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                    track: newAgendaTrack,
                    hall: newAgendaHall,
                    description: newAgendaDesc || "Interactive session at DevFest Indore 2026.",
                    tags: [newAgendaTrack, newAgendaHall],
                  };
                  await saveAgendaItem(newItem);
                  setAgendaList([newItem, ...agendaList]);
                  setNewAgendaTitle("");
                  setNewAgendaSpeaker("");
                  setNewAgendaRole("");
                  setNewAgendaAvatar("");
                  setNewAgendaDesc("");
                  setStatusMsg({ text: "Agenda session added and synced!", type: "success" });
                  setTimeout(() => setStatusMsg(null), 3000);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Session Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newAgendaTitle}
                      onChange={(e) => setNewAgendaTitle(e.target.value)}
                      placeholder="e.g. Scaling LLM Inference on Edge Silicon"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      required
                      value={newAgendaTime}
                      onChange={(e) => setNewAgendaTime(e.target.value)}
                      placeholder="e.g. 11:00 AM – 12:00 PM"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Declared Speaker Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAgendaSpeaker}
                      onChange={(e) => setNewAgendaSpeaker(e.target.value)}
                      placeholder="e.g. Dr. Ananya Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Speaker Title / Company
                    </label>
                    <input
                      type="text"
                      value={newAgendaRole}
                      onChange={(e) => setNewAgendaRole(e.target.value)}
                      placeholder="e.g. Google Developer Expert"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Content Pillar / Track
                    </label>
                    <select
                      value={newAgendaTrack}
                      onChange={(e) => setNewAgendaTrack(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="Space Technology">Space Technology</option>
                      <option value="AI & Agentic AI">AI & Agentic AI</option>
                      <option value="Physical AI & Robotics">Physical AI & Robotics</option>
                      <option value="Data & Cloud">Data & Cloud</option>
                      <option value="Enterprise Innovation">Enterprise Innovation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Hall / Stage Location
                    </label>
                    <select
                      value={newAgendaHall}
                      onChange={(e) => setNewAgendaHall(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="Main Session Hall">Main Session Hall (Keynotes)</option>
                      <option value="Workshop Track 1">Workshop Track 1 (Hands-on Lab)</option>
                      <option value="Workshop Track 2">Workshop Track 2 (Robotics & Space)</option>
                      <option value="Space Engagement Corner">Space Engagement Corner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Upload Speaker Photo (Direct Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingAgendaAvatar(true);
                          const url = await uploadToCloudinary(file);
                          setNewAgendaAvatar(url);
                          setStatusMsg({ text: "Speaker photo uploaded to Cloudinary!", type: "success" });
                        } catch (err: any) {
                          setStatusMsg({ text: err.message || "Upload failed", type: "info" });
                        } finally {
                          setUploadingAgendaAvatar(false);
                        }
                      }}
                      className="w-full text-xs file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#4285f4] hover:file:bg-blue-100 mb-1"
                    />
                    <input
                      type="url"
                      value={newAgendaAvatar}
                      onChange={(e) => setNewAgendaAvatar(e.target.value)}
                      placeholder="Or paste photo URL (https://...)"
                      className="w-full px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs"
                    />
                    {uploadingAgendaAvatar && (
                      <span className="text-[10px] text-[#4285f4] font-bold block mt-0.5">
                        Uploading photo to Cloudinary...
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Session Description
                  </label>
                  <textarea
                    rows={2}
                    value={newAgendaDesc}
                    onChange={(e) => setNewAgendaDesc(e.target.value)}
                    placeholder="Key takeaways, live code details, or prerequisites..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform"
                >
                  Publish Agenda Session
                </button>
              </form>
            </div>

            {/* Existing Agenda List */}
            <div className="space-y-3">
              {agendaList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    {item.speakerAvatar && (
                      <img
                        src={item.speakerAvatar}
                        alt={item.speakerName}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1e1e1e]">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#4285f4]">
                          {item.hall}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5f6368] mt-0.5">
                        By <strong>{item.speakerName}</strong> ({item.speakerRole}) • <span className="text-[#34a853] font-bold">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 max-w-xl">{item.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await removeAgendaItem(item.id);
                      setAgendaList(agendaList.filter((a) => a.id !== item.id));
                    }}
                    className="p-2 rounded-xl text-[#ea4335] hover:bg-red-50"
                    title="Remove Session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: FAQS MANAGEMENT */}
        {activeTab === "faqs" && (
          <div className="space-y-8">
            {/* Create or Edit FAQ Form */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#f9ab00]" />
                <span>{editingFaqId ? "Edit FAQ Item" : "Create New FAQ Protocol"}</span>
              </h2>
              <p className="text-xs text-[#5f6368] mb-6">
                Add or modify questions and answers displayed in the public FAQ Accordion on the landing page.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;

                  const targetId = editingFaqId || `faq-${Date.now()}`;
                  const item: FaqItem = {
                    id: targetId,
                    question: newFaqQuestion.trim(),
                    answer: newFaqAnswer.trim(),
                  };

                  await saveFaqItem(item);

                  if (editingFaqId) {
                    setFaqs(faqs.map((f) => (f.id === targetId ? item : f)));
                    setStatusMsg({ text: `Updated FAQ: "${item.question.slice(0, 30)}..."`, type: "success" });
                  } else {
                    setFaqs([...faqs, item]);
                    setStatusMsg({ text: `Added new FAQ successfully!`, type: "success" });
                  }

                  setNewFaqQuestion("");
                  setNewFaqAnswer("");
                  setEditingFaqId(null);
                  setTimeout(() => setStatusMsg(null), 4000);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Question Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="e.g. Can I transfer my ticket to a friend or colleague?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Detailed Answer & Instructions
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    placeholder="Provide clear, concise guidance for attendees..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#111827] text-white text-xs font-bold flex items-center gap-2 hover:bg-black transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingFaqId ? "Save Changes" : "Publish FAQ"}</span>
                  </button>

                  {editingFaqId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaqId(null);
                        setNewFaqQuestion("");
                        setNewFaqAnswer("");
                      }}
                      className="px-4 py-2.5 rounded-2xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing FAQs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1e1e1e]">
                  Active FAQs ({faqs.length})
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  Synced with landing page
                </span>
              </div>

              {faqs.map((faq, idx) => (
                <div
                  key={faq.id || idx}
                  className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#4285f4] bg-blue-50 px-2 py-0.5 rounded-md">
                        #{idx + 1}
                      </span>
                      <h4 className="text-sm font-black text-gray-900">{faq.question}</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed pl-7">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingFaqId(faq.id);
                        setNewFaqQuestion(faq.question);
                        setNewFaqAnswer(faq.answer);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete this FAQ: "${faq.question.slice(0, 30)}..."?`)) {
                          await removeFaqItem(faq.id);
                          setFaqs(faqs.filter((f) => f.id !== faq.id));
                          setStatusMsg({ text: "FAQ deleted successfully.", type: "info" });
                          setTimeout(() => setStatusMsg(null), 3000);
                        }
                      }}
                      className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SOCIAL MEDIA LINKS MANAGEMENT */}
        {activeTab === "socials" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#4285f4]" />
                  <span>Official Social Media & Sessionize URLs</span>
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#4285f4]">
                  Live Website Sync
                </span>
              </div>
              <p className="text-xs text-[#5f6368] mb-6">
                Update community handles, broadcast channels, and submission endpoints. Changes instantly reflect in the global footer, header, and CFP portal.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSavingSocials(true);
                  try {
                    await saveSocialLinks(socialLinks);
                    setStatusMsg({ text: "Social media links updated successfully!", type: "success" });
                    setTimeout(() => setStatusMsg(null), 3500);
                  } catch (err) {
                    setStatusMsg({ text: "Error saving links. Saved to local storage.", type: "info" });
                  } finally {
                    setSavingSocials(false);
                  }
                }}
                className="space-y-4 max-w-2xl"
              >
                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    placeholder="https://instagram.com/gdgindore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Used by Instagram feed and footer channels</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Twitter / X Profile URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    placeholder="https://x.com/GDG_Indore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    LinkedIn Company URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/company/gdg-indore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    GitHub Organization URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.github}
                    onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                    placeholder="https://github.com/GDG-Indore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    placeholder="https://youtube.com/@GDGIndore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Call for Speakers (Sessionize) URL
                  </label>
                  <input
                    type="url"
                    required
                    value={socialLinks.sessionize}
                    onChange={(e) => setSocialLinks({ ...socialLinks, sessionize: e.target.value })}
                    placeholder="https://sessionize.com/devfest-indore-2026/"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={savingSocials}
                    className="px-6 py-2.5 rounded-2xl bg-[#4285f4] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#3367d6] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{savingSocials ? "Saving..." : "Save Social Media Links"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSocialLinks(INITIAL_SOCIAL_LINKS);
                    }}
                    className="px-4 py-2.5 rounded-2xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors"
                  >
                    Reset Defaults
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB: SPEAKER PROPOSALS */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#ea4335]" />
                  <span>Call for Speakers — Submitted Proposals</span>
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#4285f4]">
                  {proposals.length} Total Submissions
                </span>
              </div>
              <p className="text-xs text-[#5f6368] mb-6">
                Direct submissions received via the Call for Speakers portal form. Review talk abstracts, formats, and speaker headshots.
              </p>

              {proposals.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-500">
                  No direct speaker proposals submitted yet. Submissions from the CFP form will appear here instantly.
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((prop: any) => (
                    <div
                      key={prop.id}
                      className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        {prop.avatarUrl ? (
                          <img
                            src={prop.avatarUrl}
                            alt={prop.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shrink-0 shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#4285f4] font-black shrink-0">
                            {prop.name.charAt(0)}
                          </div>
                        )}

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-extrabold text-sm text-[#1e1e1e]">{prop.name}</span>
                            <span className="text-xs text-gray-500">({prop.email})</span>
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#4285f4]">
                              {prop.track}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              {prop.format}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-gray-700 mb-1">
                            Topic: <span className="text-[#1e1e1e]">{prop.topic}</span>
                          </div>

                          {prop.organization && (
                            <div className="text-[11px] text-gray-500 mb-2">
                              Organization: {prop.organization}
                            </div>
                          )}

                          <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed mb-2 max-w-2xl">
                            {prop.abstract}
                          </p>

                          {prop.bio && (
                            <div className="text-[11px] text-gray-500 italic">
                              Bio: {prop.bio}
                            </div>
                          )}

                          <span className="text-[10px] text-gray-400 block mt-2">
                            Submitted on {prop.submittedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const updated = proposals.filter((p: any) => p.id !== prop.id);
                            setProposals(updated);
                            localStorage.setItem("devfest-speaker-proposals", JSON.stringify(updated));
                          }}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Proposal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SUPPORT REACHOUTS */}
        {activeTab === "support" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-2">Attendee & Partner Inquiries</h2>
              <p className="text-xs text-[#5f6368] mb-6">
                Direct queries submitted via public help forms for ticketing, corporate registrations, and showcase booths.
              </p>

              <div className="space-y-4">
                {supportQueries.map((query) => (
                  <div
                    key={query.id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-[#1e1e1e]">{query.name}</span>
                        <span className="text-[10px] text-[#5f6368]">({query.email})</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#4285f4]">
                          {query.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#1e1e1e] font-medium leading-relaxed">
                        &ldquo;{query.message}&rdquo;
                      </p>
                      <span className="text-[10px] text-[#5f6368] mt-1 block">
                        Received on {query.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleQueryStatus(query.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          query.status === "resolved"
                            ? "bg-green-100 text-[#34a853]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {query.status === "resolved" ? "✓ Resolved" : "Pending"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EVENT PARAMETERS */}
        {activeTab === "config" && (
          <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow max-w-2xl">
            <h2 className="text-base font-bold mb-4">Ecosystem Configuration Parameters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                  Confirmed Event Date
                </label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                  Venue Property
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                  Target Attendees
                </label>
                <input
                  type="text"
                  value={attendeeTarget}
                  onChange={(e) => setAttendeeTarget(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                  Space Club of India MOU Status
                </label>
                <input
                  type="text"
                  value={spaceMOUStatus}
                  onChange={(e) => setSpaceMOUStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                  Qualcomm Showcase Status
                </label>
                <input
                  type="text"
                  value={qualcommStatus}
                  onChange={(e) => setQualcommStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "devfest-event-config",
                    JSON.stringify({ eventDate, venueName, attendeeTarget, spaceMOUStatus, qualcommStatus })
                  );
                  setStatusMsg({ text: "Parameters saved!", type: "success" });
                  setTimeout(() => setStatusMsg(null), 3000);
                }}
                className="w-full py-2.5 rounded-full font-bold text-xs bg-[#1e1e1e] text-white hover:bg-black"
              >
                Save Configuration
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
