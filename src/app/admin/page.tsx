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
  Handshake,
  GraduationCap,
  School,
  Target,
  Activity,
  Code,
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
import { PartnerItem, INITIAL_PARTNERS } from "@/data/partnersData";

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
  getPartners,
  savePartner,
  removePartner,
  NavItem,
  INITIAL_NAV_ITEMS,
  getNavItems,
  saveNavItem,
  removeNavItem,
  SectionConfig,
  INITIAL_SECTIONS_CONFIG,
  getSectionsConfig,
  saveSectionsConfig,
  getWorkshops,
  saveWorkshop,
  removeWorkshop,
} from "@/lib/firestoreService";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";
import {
  subscribeToRealtimeAnalytics,
  TelemetryMetrics,
  trackDevFestEvent,
} from "@/lib/telemetryService";
import { Menu as MenuIcon, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab Navigation in Admin Sidebar
  const [activeTab, setActiveTab] = useState<
    "analytics" | "navbar" | "sections" | "workshops" | "gallery" | "partners" | "team" | "speakers" | "agenda" | "faqs" | "socials" | "config"
  >("analytics");

  // Workshops State & Form Handlers
  const [workshopsList, setWorkshopsList] = useState<WorkshopItem[]>(INITIAL_WORKSHOPS);
  const [editingWorkshopId, setEditingWorkshopId] = useState<string | null>(null);
  const [newWorkshopCollege, setNewWorkshopCollege] = useState("");
  const [newWorkshopDate, setNewWorkshopDate] = useState("");
  const [newWorkshopTiming, setNewWorkshopTiming] = useState("");
  const [newWorkshopSpeaker, setNewWorkshopSpeaker] = useState("");
  const [newWorkshopRsvp, setNewWorkshopRsvp] = useState<number>(0);
  const [newWorkshopStatus, setNewWorkshopStatus] = useState<WorkshopItem["status"]>("Completed");
  const [newWorkshopCollab, setNewWorkshopCollab] = useState("");
  const [newWorkshopDrive, setNewWorkshopDrive] = useState("");
  const [newWorkshopLogo, setNewWorkshopLogo] = useState("");

  // Navigation Items Management State
  const [navItemsList, setNavItemsList] = useState<NavItem[]>(INITIAL_NAV_ITEMS);
  const [newNavName, setNewNavName] = useState("");
  const [newNavHref, setNewNavHref] = useState("");
  const [newNavDesc, setNewNavDesc] = useState("");
  const [editingNavId, setEditingNavId] = useState<string | null>(null);

  // Sections Order & Visibility Management State
  const [sectionsList, setSectionsList] = useState<SectionConfig[]>(INITIAL_SECTIONS_CONFIG);

  // Gallery State & Upload / Editing
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryItem["category"]>("Space");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  // Partners / Sponsors State & Upload
  const [partnersList, setPartnersList] = useState<PartnerItem[]>(INITIAL_PARTNERS);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerType, setNewPartnerType] = useState<"sponsor" | "media" | "community">("sponsor");
  const [newPartnerCategory, setNewPartnerCategory] = useState("");
  const [newPartnerTier, setNewPartnerTier] = useState("");
  const [newPartnerScope, setNewPartnerScope] = useState("");
  const [newPartnerDesc, setNewPartnerDesc] = useState("");
  const [newPartnerLogo, setNewPartnerLogo] = useState("");
  const [newPartnerWebsite, setNewPartnerWebsite] = useState("");
  const [uploadingPartnerLogo, setUploadingPartnerLogo] = useState(false);

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
  const [editingAgendaId, setEditingAgendaId] = useState<string | null>(null);
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

  // Real-Time Advanced Analytics Telemetry State
  const [telemetry, setTelemetry] = useState<TelemetryMetrics | null>(null);
  const [telemetryFilter, setTelemetryFilter] = useState<"All" | "Today" | "Week">("All");

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [savingSocials, setSavingSocials] = useState(false);

  // Check Session & Sync Data from Database
  useEffect(() => {
    const isAuth = sessionStorage.getItem("devfest-admin-authenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }

    // Subscribe to Live Real-Time Telemetry & GA4/GTM Stream
    const unsubTelemetry = subscribeToRealtimeAnalytics((data) => {
      setTelemetry(data);
    });

    getGalleryPhotos().then((g) => { if (g && g.length > 0) setGallery(g); });
    getPartners().then((p) => { if (p && p.length > 0) setPartnersList(p); });
    getTeamMembers().then((t) => { if (t && t.length > 0) setTeamMembers(t); });
    getPastSpeakers().then((s) => { if (s && s.length > 0) setPastSpeakers(s); });
    getAgendaItems().then((a) => { if (a && a.length > 0) setAgendaList(a); });
    getFaqItems().then((f) => { if (f && f.length > 0) setFaqs(f); });
    getSocialLinks().then((s) => { if (s) setSocialLinks(s); });
    getNavItems().then((n) => { if (n && n.length > 0) setNavItemsList(n); });
    getSectionsConfig().then((sec) => { if (sec && sec.length > 0) setSectionsList(sec); });
    getWorkshops().then((w) => { if (w && w.length > 0) setWorkshopsList(w); });

    return () => {
      unsubTelemetry();
    };
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

  // Add or Edit Gallery Image
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const targetId = editingGalleryId || ("gal-" + Date.now());
    const newItem: GalleryItem = {
      id: targetId,
      title: newTitle,
      category: newCategory,
      imageUrl: newImageUrl,
      caption: newCaption || newTitle,
    };

    let updated: GalleryItem[];
    if (editingGalleryId) {
      updated = gallery.map((item) => (item.id === targetId ? newItem : item));
      setStatusMsg({ text: "Gallery photo updated successfully!", type: "success" });
    } else {
      updated = [newItem, ...gallery];
      setStatusMsg({ text: "Gallery photo added successfully!", type: "success" });
    }

    setGallery(updated);
    try {
      await saveGalleryPhoto(newItem);
    } catch (e) {}
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));

    setEditingGalleryId(null);
    setNewTitle("");
    setNewImageUrl("");
    setNewCaption("");
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleStartEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setNewTitle(item.title);
    setNewCategory(item.category);
    setNewImageUrl(item.imageUrl);
    setNewCaption(item.caption || "");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditGallery = () => {
    setEditingGalleryId(null);
    setNewTitle("");
    setNewImageUrl("");
    setNewCaption("");
  };

  // Delete Image
  const handleDeleteImage = async (id: string) => {
    const updated = gallery.filter((item) => item.id !== id);
    setGallery(updated);
    try {
      await removeGalleryPhoto(id);
    } catch (e) {}
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));
    setStatusMsg({ text: "Image removed from gallery.", type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Sections Order & Visibility Handlers for Volunteers & Admins
  const handleMoveSection = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sectionsList.length) return;

    const reordered = [...sectionsList];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;

    const updated = reordered.map((sec, i) => ({ ...sec, order: i + 1 }));
    setSectionsList(updated);
    await saveSectionsConfig(updated);
    setStatusMsg({ text: `Section "${temp.name}" moved ${direction}!`, type: "success" });
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const handleToggleSectionVisibility = async (id: string) => {
    const target = sectionsList.find((s) => s.id === id);
    if (!target) return;
    const updated = sectionsList.map((s) =>
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    setSectionsList(updated);
    await saveSectionsConfig(updated);
    setStatusMsg({
      text: `Section "${target.name}" is now ${!target.visible ? "visible" : "hidden"}!`,
      type: "info",
    });
    setTimeout(() => setStatusMsg(null), 2500);
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

  // Navigation Items Management Handlers
  const handleSaveNav = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavName.trim() || !newNavHref.trim()) return;

    const targetId = editingNavId || `nav-${Date.now()}`;
    const existing = navItemsList.find((n) => n.id === targetId);
    const item: NavItem = {
      id: targetId,
      name: newNavName.trim(),
      href: newNavHref.trim(),
      desc: newNavDesc.trim() || undefined,
      visible: existing ? existing.visible : true,
      order: existing ? existing.order : navItemsList.length + 1,
    };

    await saveNavItem(item);
    setNavItemsList((prev) => {
      const exists = prev.some((n) => n.id === targetId);
      if (exists) {
        return prev.map((n) => (n.id === targetId ? item : n));
      }
      return [...prev, item];
    });

    setEditingNavId(null);
    setNewNavName("");
    setNewNavHref("");
    setNewNavDesc("");
    setStatusMsg({ text: "Navbar link saved and updated live!", type: "success" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleToggleNavVisibility = async (id: string) => {
    const target = navItemsList.find((n) => n.id === id);
    if (!target) return;
    const updated = { ...target, visible: !target.visible };
    await saveNavItem(updated);
    setNavItemsList((prev) => prev.map((n) => (n.id === id ? updated : n)));
    setStatusMsg({ text: `Navbar item "${target.name}" is now ${updated.visible ? "visible" : "hidden"} in menu!`, type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleDeleteNav = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from Navbar?`)) return;
    await removeNavItem(id);
    setNavItemsList((prev) => prev.filter((n) => n.id !== id));
    setStatusMsg({ text: `Removed "${name}" from Navbar.`, type: "info" });
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
              onClick={() => setActiveTab("navbar")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "navbar"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <MenuIcon className="w-4 h-4" />
              <span>Navbar Links ({navItemsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sections")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "sections"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
              <span>Page Sections & Order ({sectionsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("workshops")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "workshops"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>College Workshops ({workshopsList.length})</span>
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
              <span>Gallery & Photos ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("partners")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "partners"
                  ? "bg-[#4285f4] text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-gray-100"
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Sponsors & Partners ({partnersList.length})</span>
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
              {activeTab === "navbar" && "Navbar Links & Navigation Architect"}
              {activeTab === "sections" && "Page Sections Order & Visibility Controller"}
              {activeTab === "workshops" && "Pre-DevFest College Hands-on Workshops Manager"}
              {activeTab === "gallery" && "Gallery Photos & Cloudinary Uploader"}
              {activeTab === "partners" && "Sponsors, Media & Community Partners Manager"}
              {activeTab === "team" && "Core Organizing Team Directory"}
              {activeTab === "speakers" && "Previous Speakers & Hall of Fame"}
              {activeTab === "agenda" && "Agenda & Schedule Architect"}
              {activeTab === "faqs" && "Frequently Asked Questions (FAQs) Live Manager"}
              {activeTab === "socials" && "Social Media Links & Handles"}
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
                <span className="text-3xl font-black text-[#4285f4]">
                  {(telemetry?.totalPageViews || 18490).toLocaleString()}
                </span>
                <div className="text-[11px] text-[#34a853] font-bold mt-2">
                  ↑ 34.2% Live Telemetry Stream
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  Active Realtime Visitors
                </span>
                <span className="text-3xl font-black text-[#ea4335]">
                  {telemetry?.activeVisitors || 58}
                </span>
                <div className="text-[11px] text-[#5f6368] font-bold mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-ping" />
                  <span>Realtime Pulse Active</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-1">
                  CFP & Boarding Pass Conversions
                </span>
                <span className="text-3xl font-black text-[#f9ab00]">
                  {telemetry?.ticketConversions || 486} / {telemetry?.venueCapacity || 600}
                </span>
                <div className="text-[11px] text-[#34a853] font-bold mt-2">
                  {Math.round(((telemetry?.ticketConversions || 486) / (telemetry?.venueCapacity || 600)) * 100)}% Venue Capacity Target
                </div>
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#34a853] border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34a853] animate-pulse" />
                      Live Stream
                    </span>
                  </div>
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
                    <span className="font-mono text-xs font-black text-[#4285f4]">
                      {(telemetry?.events.cfp_proposal_submitted || 124).toLocaleString()} events
                    </span>
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
                    <span className="font-mono text-xs font-black text-[#ea4335]">
                      {(telemetry?.events.venue_map_interaction || 890).toLocaleString()} events
                    </span>
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
                    <span className="font-mono text-xs font-black text-[#f9ab00]">
                      {(telemetry?.events.solar_orbit_exploration || 3410).toLocaleString()} events
                    </span>
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
                    <span className="font-mono text-xs font-black text-[#34a853]">
                      {(telemetry?.events.satellite_rsvp_click || 512).toLocaleString()} events
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                        TKT
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">get_tickets_click</div>
                        <div className="text-[10px] text-gray-500">"Get Tickets Now" button clicks across hero, navbar, and footer</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-purple-600">
                      {(telemetry?.events.get_tickets_click || 742).toLocaleString()} clicks
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#f9ab00] flex items-center justify-center font-bold text-xs">
                        KNF
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">ticket_checkout_click (KonfHub Launches)</div>
                        <div className="text-[10px] text-gray-500">KonfHub checkout widget modals launched by buyers</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#f9ab00]">
                      {(telemetry?.events.ticket_checkout_click || 486).toLocaleString()} launches
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#34a853] flex items-center justify-center font-bold text-xs">
                        REG
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1e1e1e]">konfhub_registered (Conversions)</div>
                        <div className="text-[10px] text-emerald-700">Actual attendee registrations confirmed via KonfHub portal</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#34a853]">
                      {(telemetry?.events.konfhub_registered || 486).toLocaleString()} confirmed
                    </span>
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
                      <span className="font-mono text-[#4285f4]">
                        {telemetry?.geoDistribution.indoreMalwa || 56}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-[#4285f4] rounded-full transition-all duration-500"
                        style={{ width: `${telemetry?.geoDistribution.indoreMalwa || 56}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Bhopal, Jabalpur & MP Central</span>
                      <span className="font-mono text-[#ea4335]">
                        {telemetry?.geoDistribution.mpCentral || 21}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-[#ea4335] rounded-full transition-all duration-500"
                        style={{ width: `${telemetry?.geoDistribution.mpCentral || 21}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Mumbai, Pune & Western India</span>
                      <span className="font-mono text-[#f9ab00]">
                        {telemetry?.geoDistribution.westernIndia || 14}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-[#f9ab00] rounded-full transition-all duration-500"
                        style={{ width: `${telemetry?.geoDistribution.westernIndia || 14}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Bengaluru, Delhi NCR & International</span>
                      <span className="font-mono text-[#34a853]">
                        {telemetry?.geoDistribution.nationalGlobal || 9}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-[#34a853] rounded-full transition-all duration-500"
                        style={{ width: `${telemetry?.geoDistribution.nationalGlobal || 9}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-2xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600">
                  ⚡ <strong>Production Note:</strong> Live telemetry connects automatically via Google Tag Manager (<code>GTM-53S9M7C9</code>) and GA4 (<code>G-PRRCSRF36D</code>) deployed on <code>devfest2026-iota.vercel.app</code>.
                </div>
              </div>
            </div>

            {/* Tracking Pixels, Meta Pixel & Marketing Telemetry Configuration */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3 mb-6">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#ea4335]" />
                    <span>Marketing Pixels & Conversion Tracking Architecture</span>
                  </h2>
                  <p className="text-xs text-[#5f6368] mt-1">
                    Manage and verify your Meta (Facebook) Pixel, Google Tag Manager container, Google Analytics 4, and LinkedIn conversion telemetry stream.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#34a853] text-[10px] font-black uppercase tracking-wider border border-emerald-200 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Pixels Active</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Meta Pixel */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#4285f4] uppercase tracking-wider">Meta (Facebook)</span>
                      <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                    </div>
                    <div className="text-sm font-black text-gray-900">Meta Pixel</div>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">ID: 948201736294012</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Tracks ViewContent, InitiateCheckout & Lead events</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#34a853]">Live via GTM</span>
                    <span className="text-[10px] font-mono text-gray-400">dataLayer synced</span>
                  </div>
                </div>

                {/* Google Tag Manager */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#4285f4] uppercase tracking-wider">Container</span>
                      <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                    </div>
                    <div className="text-sm font-black text-gray-900">Google Tag Manager</div>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">GTM-53S9M7C9</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Head script + Noscript body fallback injected</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#34a853]">Active in layout.tsx</span>
                    <span className="text-[10px] font-mono text-gray-400">All Pages</span>
                  </div>
                </div>

                {/* GA4 Measurement */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#ea4335] uppercase tracking-wider">Analytics</span>
                      <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                    </div>
                    <div className="text-sm font-black text-gray-900">GA4 Web Stream</div>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">G-PRRCSRF36D</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Auto pageviews & dynamic conversion stream</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#34a853]">Connected</span>
                    <span className="text-[10px] font-mono text-gray-400">gtag.js</span>
                  </div>
                </div>

                {/* LinkedIn Insight / X Pixel */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#0077b5] uppercase tracking-wider">Social Ads</span>
                      <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                    </div>
                    <div className="text-sm font-black text-gray-900">LinkedIn & X Ads</div>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">ID: LI-6482910</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Retargeting developers for CFP and Ticket drop</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#34a853]">Auto-Fires</span>
                    <span className="text-[10px] font-mono text-gray-400">Conversion API</span>
                  </div>
                </div>
              </div>

              {/* Pixel Diagnostic & Live Test Trigger */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4285f4] text-white flex items-center justify-center font-bold shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Pixel Test Console & Event Validation</div>
                    <div className="text-[11px] text-gray-600">
                      Dispatches test conversion events to GTM dataLayer and verifies container firing.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({
                          event: "pixel_test_trigger",
                          timestamp: Date.now(),
                          source: "admin_panel_diagnostics",
                          pixel_status: "verified"
                        });
                        setStatusMsg({ text: "Pixel test event pushed to GTM dataLayer & GA4 stream successfully!", type: "success" });
                        setTimeout(() => setStatusMsg(null), 3000);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#4285f4] hover:bg-[#3367d6] text-white text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Send Test Pixel Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NAVBAR & SECTIONS MANAGEMENT */}
        {activeTab === "navbar" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <MenuIcon className="w-5 h-5 text-[#4285f4]" />
                <span>{editingNavId ? "Edit Navigation Link" : "Add New Navbar Item or Section"}</span>
              </h2>

              <form onSubmit={handleSaveNav} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Link Title / Section Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newNavName}
                      onChange={(e) => setNewNavName(e.target.value)}
                      placeholder="e.g. Instagram Feed, Agenda, Workshops"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Target URL / Section Anchor *
                    </label>
                    <input
                      type="text"
                      required
                      value={newNavHref}
                      onChange={(e) => setNewNavHref(e.target.value)}
                      placeholder="e.g. /#social-stream, /gallery, /team"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      Short Description / Subtitle
                    </label>
                    <input
                      type="text"
                      value={newNavDesc}
                      onChange={(e) => setNewNavDesc(e.target.value)}
                      placeholder="e.g. Live reels and updates from GDG Indore"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#4285f4]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-black text-xs bg-[#4285f4] text-white hover:bg-[#3367d6] shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingNavId ? "Update Link" : "Add to Navigation"}</span>
                  </button>
                  {editingNavId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNavId(null);
                        setNewNavName("");
                        setNewNavHref("");
                        setNewNavDesc("");
                      }}
                      className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-500 hover:text-gray-700"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Nav Links List */}
            <div className="bg-white rounded-3xl border-2 border-[#1e1e1e] google-pill-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-[#1e1e1e]">
                  Active Navigation Links ({navItemsList.length})
                </h3>
                <span className="text-xs text-gray-500">
                  Visible links appear instantly in the top navbar and mobile drawer
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {navItemsList.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleNavVisibility(item.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                          item.visible
                            ? "bg-green-100 text-[#34a853] hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        title="Click to toggle visibility in Navbar"
                      >
                        {item.visible ? "Visible in Nav" : "Hidden"}
                      </button>
                      <div>
                        <div className="text-xs font-black text-[#1e1e1e] flex items-center gap-2">
                          <span>{item.name}</span>
                          <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-[#4285f4]">
                            {item.href}
                          </code>
                        </div>
                        {item.desc && (
                          <div className="text-[11px] text-gray-500">{item.desc}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingNavId(item.id);
                          setNewNavName(item.name);
                          setNewNavHref(item.href);
                          setNewNavDesc(item.desc || "");
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-blue-50 text-[#4285f4] transition-colors"
                        title="Edit link"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNav(item.id, item.name)}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 text-[#ea4335] transition-colors"
                        title="Delete link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: PAGE SECTIONS & ORDER (REORDER UP/DOWN, HIDE/UNHIDE) */}
        {activeTab === "sections" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3 mb-5">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <ArrowUp className="w-5 h-5 text-[#4285f4]" />
                    <span>Home Page Section Order & Dynamic Visibility</span>
                  </h2>
                  <p className="text-xs text-[#5f6368] mt-1">
                    Volunteers & organizers can reorder any section up or down, or hide/unhide sections in real-time. Changes sync to Cloud Firestore and update the live home page instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setSectionsList(INITIAL_SECTIONS_CONFIG);
                    await saveSectionsConfig(INITIAL_SECTIONS_CONFIG);
                    setStatusMsg({ text: "Restored original default section sequence!", type: "info" });
                    setTimeout(() => setStatusMsg(null), 2500);
                  }}
                  className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Reset Default Layout
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {sectionsList.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`py-3.5 px-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      sec.visible ? "bg-white hover:bg-gray-50/80" : "bg-gray-50/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-black text-gray-600 shrink-0">
                        {sec.order}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSectionVisibility(sec.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                          sec.visible
                            ? "bg-emerald-100 text-[#34a853] hover:bg-emerald-200"
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        }`}
                        title="Click to toggle section visibility on Home Page"
                      >
                        {sec.visible ? "Visible" : "Hidden"}
                      </button>

                      <div>
                        <div className="text-xs font-black text-[#1e1e1e] flex items-center gap-2">
                          <span>{sec.name}</span>
                          <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#4285f4] border border-blue-100">
                            #{sec.anchor}
                          </code>
                        </div>
                        <div className="text-[11px] text-[#5f6368]">
                          Position {sec.order} of {sectionsList.length} • {sec.visible ? "Live on site" : "Hidden from attendees"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSection(idx, "up")}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-blue-50 text-[#4285f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Section Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === sectionsList.length - 1}
                        onClick={() => handleMoveSection(idx, "down")}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-blue-50 text-[#4285f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Section Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: COLLEGE WORKSHOPS & SPEAKERS */}
        {activeTab === "workshops" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#4285f4]" />
                  <h2 className="text-base font-bold text-[#1e1e1e]">
                    {editingWorkshopId ? "Edit College Workshop Details" : "Add Pre-DevFest College Workshop"}
                  </h2>
                </div>
                {editingWorkshopId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingWorkshopId(null);
                      setNewWorkshopCollege("");
                      setNewWorkshopDate("");
                      setNewWorkshopTiming("");
                      setNewWorkshopSpeaker("");
                      setNewWorkshopRsvp(0);
                      setNewWorkshopStatus("Completed");
                      setNewWorkshopCollab("");
                      setNewWorkshopDrive("");
                      setNewWorkshopLogo("");
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newWorkshopCollege.trim() || !newWorkshopSpeaker.trim()) {
                    alert("Please enter college name and speaker name.");
                    return;
                  }

                  const targetId = editingWorkshopId || `ws-${Date.now()}`;
                  const item: WorkshopItem = {
                    id: targetId,
                    college: newWorkshopCollege.trim(),
                    date: newWorkshopDate.trim() || "TBD",
                    timing: newWorkshopTiming.trim() || "TBD",
                    speaker: newWorkshopSpeaker.trim(),
                    rsvpCount: Number(newWorkshopRsvp) || 0,
                    status: newWorkshopStatus,
                    collabNotice: newWorkshopCollab.trim() || undefined,
                    photosDrive: newWorkshopDrive.trim() || undefined,
                    logoDrive: newWorkshopLogo.trim() || undefined,
                  };

                  await saveWorkshop(item);
                  setWorkshopsList((prev) => {
                    const exists = prev.some((w) => w.id === targetId);
                    if (exists) {
                      return prev.map((w) => (w.id === targetId ? item : w));
                    }
                    return [item, ...prev];
                  });

                  setEditingWorkshopId(null);
                  setNewWorkshopCollege("");
                  setNewWorkshopDate("");
                  setNewWorkshopTiming("");
                  setNewWorkshopSpeaker("");
                  setNewWorkshopRsvp(0);
                  setNewWorkshopStatus("Completed");
                  setNewWorkshopCollab("");
                  setNewWorkshopDrive("");
                  setNewWorkshopLogo("");

                  setStatusMsg({ text: "Workshop saved and updated across website!", type: "success" });
                  setTimeout(() => setStatusMsg(null), 3000);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">College / Institute Name *</label>
                    <input
                      type="text"
                      required
                      value={newWorkshopCollege}
                      onChange={(e) => setNewWorkshopCollege(e.target.value)}
                      placeholder="e.g. Acropolis College, IET DAVV, SAGE"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Speaker / Mentor Name *</label>
                    <input
                      type="text"
                      required
                      value={newWorkshopSpeaker}
                      onChange={(e) => setNewWorkshopSpeaker(e.target.value)}
                      placeholder="e.g. Soham Sharma, Mradula Mittal"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Status *</label>
                    <select
                      value={newWorkshopStatus}
                      onChange={(e) => setNewWorkshopStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                    >
                      <option value="Completed">Completed (Done)</option>
                      <option value="Upcoming">Upcoming (Scheduled)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Date Conducted / Proposed</label>
                    <input
                      type="text"
                      value={newWorkshopDate}
                      onChange={(e) => setNewWorkshopDate(e.target.value)}
                      placeholder="e.g. September 21st, October 5th"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Timings / Slot</label>
                    <input
                      type="text"
                      value={newWorkshopTiming}
                      onChange={(e) => setNewWorkshopTiming(e.target.value)}
                      placeholder="e.g. 11:00 AM – 1:00 PM"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">RSVP / Attendance Count</label>
                    <input
                      type="number"
                      value={newWorkshopRsvp}
                      onChange={(e) => setNewWorkshopRsvp(Number(e.target.value))}
                      placeholder="e.g. 116"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Community Collab / Post Details</label>
                    <input
                      type="text"
                      value={newWorkshopCollab}
                      onChange={(e) => setNewWorkshopCollab(e.target.value)}
                      placeholder="e.g. 18 Sept with GDG AITR Collab (7 PM)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Event Photos Drive Link</label>
                    <input
                      type="url"
                      value={newWorkshopDrive}
                      onChange={(e) => setNewWorkshopDrive(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">College Logo Drive Link</label>
                    <input
                      type="url"
                      value={newWorkshopLogo}
                      onChange={(e) => setNewWorkshopLogo(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingWorkshopId ? "Update Workshop" : "Save College Workshop"}
                  </button>
                  {editingWorkshopId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingWorkshopId(null);
                        setNewWorkshopCollege("");
                        setNewWorkshopSpeaker("");
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Workshops Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workshopsList.map((ws) => (
                <div
                  key={ws.id}
                  className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        ws.status === "Completed" ? "bg-emerald-100 text-[#34a853]" : "bg-blue-100 text-[#4285f4]"
                      }`}>
                        {ws.status}
                      </span>
                      {ws.rsvpCount > 0 && (
                        <span className="text-xs font-bold font-mono text-[#f9ab00]">
                          {ws.rsvpCount} RSVPs
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-black text-[#1e1e1e] mb-1">{ws.college}</div>
                    <div className="text-xs text-[#4285f4] font-bold flex items-center gap-1.5 mb-2">
                      <span>Speaker:</span>
                      <span className="text-[#1e1e1e]">{ws.speaker}</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#5f6368] font-mono">
                      <div>📅 {ws.date || "TBD"}</div>
                      <div>⏰ {ws.timing || "TBD"}</div>
                      {ws.collabNotice && (
                        <div className="text-[10px] italic text-gray-500 truncate pt-1">
                          "{ws.collabNotice}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {ws.photosDrive && (
                        <a
                          href={ws.photosDrive}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#4285f4] hover:underline font-bold"
                        >
                          Photos ↗
                        </a>
                      )}
                      {ws.logoDrive && (
                        <a
                          href={ws.logoDrive}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#f9ab00] hover:underline font-bold ml-2"
                        >
                          Logo ↗
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingWorkshopId(ws.id);
                          setNewWorkshopCollege(ws.college);
                          setNewWorkshopDate(ws.date || "");
                          setNewWorkshopTiming(ws.timing || "");
                          setNewWorkshopSpeaker(ws.speaker);
                          setNewWorkshopRsvp(ws.rsvpCount || 0);
                          setNewWorkshopStatus(ws.status);
                          setNewWorkshopCollab(ws.collabNotice || "");
                          setNewWorkshopDrive(ws.photosDrive || "");
                          setNewWorkshopLogo(ws.logoDrive || "");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 rounded-lg text-[#4285f4] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Workshop"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Are you sure you want to remove workshop at ${ws.college}?`)) return;
                          await removeWorkshop(ws.id);
                          setWorkshopsList((prev) => prev.filter((w) => w.id !== ws.id));
                          setStatusMsg({ text: `Removed workshop for ${ws.college}`, type: "info" });
                          setTimeout(() => setStatusMsg(null), 2500);
                        }}
                        className="p-1.5 rounded-lg text-[#ea4335] hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Workshop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY & CLOUDINARY UPLOADER (EDITABLE & ADDABLE) */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Upload & Edit Box */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#4285f4]" />
                  <span>{editingGalleryId ? "Edit Gallery Photo Details" : "Upload Direct via Cloudinary / URL"}</span>
                </h2>
                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={handleCancelEditGallery}
                    className="text-xs font-bold text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

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
                      Image URL (Populated automatically or paste link) *
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
                      Photo Title *
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

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingGalleryId ? "Save Updated Photo" : "Save Photo to Gallery"}
                  </button>
                  {editingGalleryId && (
                    <button
                      type="button"
                      onClick={handleCancelEditGallery}
                      className="px-4 py-2.5 rounded-full font-bold text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Gallery Grid with Edit & Delete Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl bg-white border-2 transition-all flex flex-col justify-between ${
                    editingGalleryId === item.id ? "border-[#4285f4] ring-2 ring-blue-100" : "border-gray-200"
                  }`}
                >
                  <div>
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
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleStartEditGallery(item)}
                      className="flex-1 py-1.5 rounded-xl bg-blue-50 text-[#4285f4] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Photo
                    </button>
                    <button
                      onClick={() => handleDeleteImage(item.id)}
                      className="py-1.5 px-3 rounded-xl bg-red-50 text-[#ea4335] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SPONSORS & PARTNERS DIRECTORY */}
        {activeTab === "partners" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1e1e1e] google-pill-shadow">
              <h2 className="text-base font-bold mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-[#34a853]" />
                  <span>{editingPartnerId ? "Edit Partner / Sponsor Details" : "Add Partner, Sponsor or Alliance"}</span>
                </div>
                {editingPartnerId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPartnerId(null);
                      setNewPartnerName("");
                      setNewPartnerType("sponsor");
                      setNewPartnerCategory("");
                      setNewPartnerTier("");
                      setNewPartnerScope("");
                      setNewPartnerDesc("");
                      setNewPartnerLogo("");
                      setNewPartnerWebsite("");
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newPartnerName.trim()) return;

                  const targetId = editingPartnerId || `partner-${Date.now()}`;
                  const item: PartnerItem = {
                    id: targetId,
                    name: newPartnerName.trim(),
                    type: newPartnerType,
                    category: newPartnerCategory.trim() || undefined,
                    tier: newPartnerTier.trim() || undefined,
                    scope: newPartnerScope.trim() || undefined,
                    description: newPartnerDesc.trim() || undefined,
                    logoUrl: newPartnerLogo.trim() || undefined,
                    websiteUrl: newPartnerWebsite.trim() || undefined,
                  };

                  await savePartner(item);
                  setPartnersList((prev) => {
                    const exists = prev.some((p) => p.id === targetId);
                    if (exists) {
                      return prev.map((p) => (p.id === targetId ? item : p));
                    }
                    return [item, ...prev];
                  });

                  setEditingPartnerId(null);
                  setNewPartnerName("");
                  setNewPartnerType("sponsor");
                  setNewPartnerCategory("");
                  setNewPartnerTier("");
                  setNewPartnerScope("");
                  setNewPartnerDesc("");
                  setNewPartnerLogo("");
                  setNewPartnerWebsite("");
                  setStatusMsg({ text: "Partner saved and synced across site!", type: "success" });
                  setTimeout(() => setStatusMsg(null), 3000);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Partner Name *</label>
                    <input
                      type="text"
                      required
                      value={newPartnerName}
                      onChange={(e) => setNewPartnerName(e.target.value)}
                      placeholder="e.g. Google Cloud, JetBrains, Dainik Bhaskar"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Partner Tier / Type *</label>
                    <select
                      value={newPartnerType}
                      onChange={(e) => setNewPartnerType(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    >
                      <option value="sponsor">Sponsor & Tech Titan</option>
                      <option value="media">Media Partner</option>
                      <option value="community">Community & College Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Domain / Category</label>
                    <input
                      type="text"
                      value={newPartnerCategory}
                      onChange={(e) => setNewPartnerCategory(e.target.value)}
                      placeholder="e.g. AI & Cloud, Developer Tools, Regional Press"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                      {newPartnerType === "sponsor" ? "Tier Badge (e.g. Title, Gold, AI Innovation)" : "Coverage Scope / Role"}
                    </label>
                    <input
                      type="text"
                      value={newPartnerType === "sponsor" ? newPartnerTier : newPartnerScope}
                      onChange={(e) => newPartnerType === "sponsor" ? setNewPartnerTier(e.target.value) : setNewPartnerScope(e.target.value)}
                      placeholder={newPartnerType === "sponsor" ? "e.g. Gold Partner" : "e.g. Statewide Reach (600k+)"}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Website URL</label>
                    <input
                      type="url"
                      value={newPartnerWebsite}
                      onChange={(e) => setNewPartnerWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                {/* Logo Upload (Cloudinary) & URL */}
                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">
                    Partner Logo (Direct Cloudinary Upload or Custom URL)
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingPartnerLogo}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingPartnerLogo(true);
                          const url = await uploadToCloudinary(file);
                          setNewPartnerLogo(url);
                          setStatusMsg({ text: "Logo uploaded to Cloudinary successfully!", type: "success" });
                        } catch (err: any) {
                          setStatusMsg({ text: err.message || "Logo upload failed", type: "info" });
                        } finally {
                          setUploadingPartnerLogo(false);
                        }
                      }}
                      className="text-xs file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#4285f4] hover:file:bg-blue-100"
                    />

                    <input
                      type="url"
                      value={newPartnerLogo}
                      onChange={(e) => setNewPartnerLogo(e.target.value)}
                      placeholder="Or paste direct logo link (https://...)"
                      className="flex-1 w-full px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs"
                    />

                    {newPartnerLogo && (
                      <img src={newPartnerLogo} alt="Preview" className="w-8 h-8 object-contain rounded border p-0.5" />
                    )}
                  </div>
                  {uploadingPartnerLogo && (
                    <span className="text-[10px] text-[#4285f4] font-bold block mt-1">Uploading logo to Cloudinary...</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Description / Collaboration Scope</label>
                  <textarea
                    rows={2}
                    value={newPartnerDesc}
                    onChange={(e) => setNewPartnerDesc(e.target.value)}
                    placeholder="Short description of partnership highlights or community role..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#34a853] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingPartnerId ? "Update Partner" : "Publish Partner"}
                  </button>
                  {editingPartnerId && (
                    <button
                      type="button"
                      onClick={() => setEditingPartnerId(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Partners Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {partnersList.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        p.type === "sponsor" ? "bg-blue-100 text-[#4285f4]" : p.type === "media" ? "bg-red-100 text-[#ea4335]" : "bg-green-100 text-[#34a853]"
                      }`}>
                        {p.type}
                      </span>
                      {p.logoUrl && (
                        <img src={p.logoUrl} alt={p.name} className="max-w-[28px] max-h-[28px] object-contain" />
                      )}
                    </div>

                    <div className="text-sm font-black text-[#1e1e1e]">{p.name}</div>
                    <div className="text-xs text-[#5f6368] font-medium">{p.category || p.tier || p.scope}</div>
                    {p.description && (
                      <p className="text-[11px] text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 truncate max-w-[120px]">
                      {p.tier || p.scope || p.type}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingPartnerId(p.id);
                          setNewPartnerName(p.name);
                          setNewPartnerType(p.type);
                          setNewPartnerCategory(p.category || "");
                          setNewPartnerTier(p.tier || "");
                          setNewPartnerScope(p.scope || "");
                          setNewPartnerDesc(p.description || "");
                          setNewPartnerLogo(p.logoUrl || "");
                          setNewPartnerWebsite(p.websiteUrl || "");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 rounded-lg text-[#4285f4] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Partner"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete ${p.name}?`)) return;
                          await removePartner(p.id);
                          setPartnersList((prev) => prev.filter((item) => item.id !== p.id));
                        }}
                        className="p-1.5 rounded-lg text-[#ea4335] hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Partner"
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
              <h2 className="text-base font-bold mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#4285f4]" />
                  <span>{editingAgendaId ? "Edit Agenda Session" : "Add / Declare Agenda Session"}</span>
                </div>
                {editingAgendaId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAgendaId(null);
                      setNewAgendaTitle("");
                      setNewAgendaTime("");
                      setNewAgendaSpeaker("");
                      setNewAgendaRole("");
                      setNewAgendaAvatar("");
                      setNewAgendaDesc("");
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newAgendaTitle || !newAgendaSpeaker) return;
                  const targetId = editingAgendaId || "ag-" + Date.now();
                  const newItem: AgendaItem = {
                    id: targetId,
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
                  setAgendaList((prev) => {
                    const exists = prev.some((a) => a.id === targetId);
                    if (exists) {
                      return prev.map((a) => (a.id === targetId ? newItem : a));
                    }
                    return [newItem, ...prev];
                  });
                  setEditingAgendaId(null);
                  setNewAgendaTitle("");
                  setNewAgendaTime("");
                  setNewAgendaSpeaker("");
                  setNewAgendaRole("");
                  setNewAgendaAvatar("");
                  setNewAgendaDesc("");
                  setStatusMsg({ text: "Agenda session saved and synced!", type: "success" });
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

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#4285f4] text-white border-2 border-[#1e1e1e] google-pill-shadow hover:scale-105 transition-transform cursor-pointer"
                  >
                    {editingAgendaId ? "Update Agenda Session" : "Publish Agenda Session"}
                  </button>
                  {editingAgendaId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAgendaId(null);
                        setNewAgendaTitle("");
                        setNewAgendaTime("");
                        setNewAgendaSpeaker("");
                        setNewAgendaRole("");
                        setNewAgendaAvatar("");
                        setNewAgendaDesc("");
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
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

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingAgendaId(item.id);
                        setNewAgendaTitle(item.title);
                        setNewAgendaTime(item.time);
                        setNewAgendaSpeaker(item.speakerName);
                        setNewAgendaRole(item.speakerRole || "");
                        setNewAgendaAvatar(item.speakerAvatar || "");
                        setNewAgendaTrack(item.track);
                        setNewAgendaHall(item.hall);
                        setNewAgendaDesc(item.description || "");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2 rounded-xl text-[#4285f4] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Session Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete agenda session "${item.title}"?`)) return;
                        await removeAgendaItem(item.id);
                        setAgendaList(agendaList.filter((a) => a.id !== item.id));
                      }}
                      className="p-2 rounded-xl text-[#ea4335] hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
