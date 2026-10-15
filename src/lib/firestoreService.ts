import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { TeamMember, PastSpeaker, SupportQuery, AgendaItem, INITIAL_TEAM, INITIAL_AGENDA } from "@/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "@/data/pastSpeakersFull";
import { GalleryItem, INITIAL_GALLERY_ITEMS } from "@/data/ecosystemData";
import { FAQS } from "@/data/devfestData";
import { PartnerItem, INITIAL_PARTNERS } from "@/data/partnersData";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/data/workshopsData";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Collection Names
const COLLECTIONS = {
  TEAM: "team_members",
  PAST_SPEAKERS: "past_speakers",
  GALLERY: "gallery_photos",
  SUPPORT: "support_queries",
  CONFIG: "event_config",
  AGENDA: "agenda_sessions",
  FAQS: "faq_items",
  SOCIALS: "social_links",
  PARTNERS: "partners",
  WORKSHOPS: "college_workshops",
};

export interface SocialLinks {
  twitter: string;
  linkedin: string;
  instagram: string;
  github: string;
  youtube: string;
  sessionize: string;
}

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  twitter: "https://x.com/GDG_Indore",
  linkedin: "https://linkedin.com/company/gdg-indore",
  instagram: "https://instagram.com/gdgindore",
  github: "https://github.com/GDG-Indore",
  youtube: "https://youtube.com/@GDGIndore",
  sessionize: "https://sessionize.com/devfest-indore-2026/",
};

/**
 * Fetch Agenda items from Firestore or fallback
 */
export async function getAgendaItems(): Promise<AgendaItem[]> {
  try {
    const colRef = collection(db, COLLECTIONS.AGENDA);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AgendaItem));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-agenda-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_AGENDA;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-agenda-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_AGENDA;
  }
}

/**
 * Save or Update Agenda item
 */
export async function saveAgendaItem(item: AgendaItem): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.AGENDA, item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getAgendaItems();
    const updated = [...current.filter((a) => a.id !== item.id), item];
    localStorage.setItem("devfest-agenda-items", JSON.stringify(updated));
  }
}

/**
 * Remove Agenda item
 */
export async function removeAgendaItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.AGENDA, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getAgendaItems();
    const updated = current.filter((a) => a.id !== id);
    localStorage.setItem("devfest-agenda-items", JSON.stringify(updated));
  }
}

/**
 * Fetch or seed Team Members from Cloud Firestore
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const colRef = collection(db, COLLECTIONS.TEAM);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const remote = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
      // Merge remote with initial so newly added predefined members are always present
      const remoteIds = new Set(remote.map((r) => r.id));
      const combined = [...remote];
      INITIAL_TEAM.forEach((initial) => {
        if (!remoteIds.has(initial.id)) {
          combined.push(initial);
        }
      });
      return combined;
    }
    // Check localStorage fallback or initial seed
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-team-members");
      if (saved) {
        const parsed: TeamMember[] = JSON.parse(saved);
        const parsedIds = new Set(parsed.map((p) => p.id));
        const merged = [...parsed];
        INITIAL_TEAM.forEach((init) => {
          if (!parsedIds.has(init.id)) {
            merged.push(init);
          }
        });
        return merged;
      }
    }
    return INITIAL_TEAM;
  } catch (error) {
    console.warn("Firestore offline or permission notice, fallback to local:", error);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-team-members");
      if (saved) {
        const parsed: TeamMember[] = JSON.parse(saved);
        const parsedIds = new Set(parsed.map((p) => p.id));
        const merged = [...parsed];
        INITIAL_TEAM.forEach((init) => {
          if (!parsedIds.has(init.id)) {
            merged.push(init);
          }
        });
        return merged;
      }
    }
    return INITIAL_TEAM;
  }
}

/**
 * Save or Update Team Member in Firestore and localStorage
 */
export async function saveTeamMember(member: TeamMember): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.TEAM, member.id);
    await setDoc(docRef, member, { merge: true });
  } catch (e) {
    console.warn("Saved to local store:", e);
  }
  if (typeof window !== "undefined") {
    const current = await getTeamMembers();
    const updated = [...current.filter((m) => m.id !== member.id), member];
    localStorage.setItem("devfest-team-members", JSON.stringify(updated));
  }
}

/**
 * Delete Team Member
 */
export async function removeTeamMember(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.TEAM, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getTeamMembers();
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem("devfest-team-members", JSON.stringify(updated));
  }
}

/**
 * Fetch Past Speakers from Firestore or Local Cache
 */
export async function getPastSpeakers(): Promise<PastSpeaker[]> {
  try {
    const colRef = collection(db, COLLECTIONS.PAST_SPEAKERS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PastSpeaker));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-past-speakers");
      if (saved) return JSON.parse(saved);
    }
    return DEV_FEST_PAST_SPEAKERS_FULL;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-past-speakers");
      if (saved) return JSON.parse(saved);
    }
    return DEV_FEST_PAST_SPEAKERS_FULL;
  }
}

/**
 * Save or Update Past Speaker
 */
export async function savePastSpeaker(speaker: PastSpeaker): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.PAST_SPEAKERS, speaker.id);
    await setDoc(docRef, speaker, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getPastSpeakers();
    const updated = [...current.filter((s) => s.id !== speaker.id), speaker];
    localStorage.setItem("devfest-past-speakers", JSON.stringify(updated));
  }
}

/**
 * Delete Past Speaker
 */
export async function removePastSpeaker(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PAST_SPEAKERS, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getPastSpeakers();
    const updated = current.filter((s) => s.id !== id);
    localStorage.setItem("devfest-past-speakers", JSON.stringify(updated));
  }
}

/**
 * Fetch Gallery Photos
 */
export async function getGalleryPhotos(): Promise<GalleryItem[]> {
  try {
    const colRef = collection(db, COLLECTIONS.GALLERY);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-gallery-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_GALLERY_ITEMS;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-gallery-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_GALLERY_ITEMS;
  }
}

/**
 * Save Gallery Photo
 */
export async function saveGalleryPhoto(item: GalleryItem): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.GALLERY, item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getGalleryPhotos();
    const updated = [item, ...current.filter((g) => g.id !== item.id)];
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));
  }
}

/**
 * Delete Gallery Photo
 */
export async function removeGalleryPhoto(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getGalleryPhotos();
    const updated = current.filter((g) => g.id !== id);
    localStorage.setItem("devfest-gallery-items", JSON.stringify(updated));
  }
}

/**
 * Fetch FAQs from Firestore or local fallback
 */
export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    const colRef = collection(db, COLLECTIONS.FAQS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FaqItem));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-faq-items");
      if (saved) return JSON.parse(saved);
    }
    return FAQS.map((f, idx) => ({ id: `faq-${idx + 1}`, ...f }));
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-faq-items");
      if (saved) return JSON.parse(saved);
    }
    return FAQS.map((f, idx) => ({ id: `faq-${idx + 1}`, ...f }));
  }
}

/**
 * Save or Update FAQ item
 */
export async function saveFaqItem(item: FaqItem): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.FAQS, item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getFaqItems();
    const existingIndex = current.findIndex((f) => f.id === item.id);
    let updated: FaqItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = item;
    } else {
      updated = [...current, item];
    }
    localStorage.setItem("devfest-faq-items", JSON.stringify(updated));
  }
}

/**
 * Delete FAQ item
 */
export async function removeFaqItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.FAQS, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getFaqItems();
    const updated = current.filter((f) => f.id !== id);
    localStorage.setItem("devfest-faq-items", JSON.stringify(updated));
  }
}

/**
 * Fetch Social Media links
 */
export async function getSocialLinks(): Promise<SocialLinks> {
  try {
    const docRef = doc(db, COLLECTIONS.CONFIG, "social_media_links");
    const snap = await getDocs(collection(db, COLLECTIONS.CONFIG));
    const socialDoc = snap.docs.find((d) => d.id === "social_media_links");
    if (socialDoc && socialDoc.exists()) {
      return { ...INITIAL_SOCIAL_LINKS, ...socialDoc.data() } as SocialLinks;
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-social-links");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_SOCIAL_LINKS;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-social-links");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_SOCIAL_LINKS;
  }
}

/**
 * Save or Update Social Media links
 */
export async function saveSocialLinks(links: SocialLinks): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.CONFIG, "social_media_links");
    await setDoc(docRef, links, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    localStorage.setItem("devfest-social-links", JSON.stringify(links));
  }
}

/**
 * Fetch Partners (Sponsors, Media, Community)
 */
export async function getPartners(): Promise<PartnerItem[]> {
  try {
    const colRef = collection(db, COLLECTIONS.PARTNERS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PartnerItem));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-partners-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PARTNERS;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-partners-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PARTNERS;
  }
}

/**
 * Save or Update Partner
 */
export async function savePartner(partner: PartnerItem): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.PARTNERS, partner.id);
    await setDoc(docRef, partner, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getPartners();
    const updated = [partner, ...current.filter((p) => p.id !== partner.id)];
    localStorage.setItem("devfest-partners-items", JSON.stringify(updated));
  }
}

/**
 * Remove Partner
 */
export async function removePartner(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PARTNERS, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getPartners();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem("devfest-partners-items", JSON.stringify(updated));
  }
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  desc?: string;
  visible: boolean;
  order: number;
}

export const INITIAL_NAV_ITEMS: NavItem[] = [
  { id: "nav-home", name: "Home", href: "/", desc: "DevFest 2026 flagship vision & home", visible: true, order: 1 },
  { id: "nav-about", name: "About", href: "/#about", desc: "Where modern engineering meets Indore's innovation", visible: true, order: 2 },
  { id: "nav-workshops", name: "Workshops", href: "/#workshops", desc: "Hands-on pre-devfest codelabs across 18+ colleges", visible: true, order: 3 },
  { id: "nav-gallery", name: "Previous Editions", href: "/gallery", desc: "Curated 4K photo archive from previous editions", visible: true, order: 4 },
  { id: "nav-speakers", name: "Speakers", href: "/past-speakers", desc: "Full directory of GDEs & past keynote speakers", visible: true, order: 5 },
  { id: "nav-team", name: "Team", href: "/team", desc: "Core organizers & community leads", visible: true, order: 6 },
  { id: "nav-events", name: "Events", href: "/#satellite-events", desc: "Indore pre-events & community hackathons", visible: true, order: 7 },
  { id: "nav-sponsors", name: "Sponsors", href: "/#sponsors", desc: "Ecosystem catalysts & tech showcases", visible: true, order: 8 },
  { id: "nav-instagram", name: "Instagram Feed", href: "/#social-stream", desc: "Real-time #GDGIndore Instagram reels & updates", visible: true, order: 9 },
];

/**
 * Fetch Navbar items from Firestore or fallback
 */
export async function getNavItems(): Promise<NavItem[]> {
  try {
    const colRef = collection(db, "nav_items");
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as NavItem));
      return items.sort((a, b) => a.order - b.order);
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-nav-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_NAV_ITEMS;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-nav-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_NAV_ITEMS;
  }
}

/**
 * Save or Update Nav item
 */
export async function saveNavItem(item: NavItem): Promise<void> {
  try {
    const docRef = doc(db, "nav_items", item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getNavItems();
    const updated = [...current.filter((n) => n.id !== item.id), item].sort((a, b) => a.order - b.order);
    localStorage.setItem("devfest-nav-items", JSON.stringify(updated));
  }
}

/**
 * Remove Nav item
 */
export async function removeNavItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "nav_items", id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getNavItems();
    const updated = current.filter((n) => n.id !== id);
    localStorage.setItem("devfest-nav-items", JSON.stringify(updated));
  }
}

export interface SectionConfig {
  id: string;
  name: string;
  anchor: string;
  visible: boolean;
  order: number;
}

export const INITIAL_SECTIONS_CONFIG: SectionConfig[] = [
  { id: "sec-hero", name: "3D Mars Launchpad Hero", anchor: "hero", visible: true, order: 1 },
  { id: "sec-marquee", name: "Animated Community Marquee", anchor: "marquee", visible: true, order: 2 },
  { id: "sec-about", name: "About DevFest Indore", anchor: "about", visible: true, order: 3 },
  { id: "sec-flow", name: "3D Journey & Collective Flow", anchor: "flow", visible: true, order: 4 },
  { id: "sec-pillars", name: "5 Strategic Content Pillars", anchor: "pillars", visible: true, order: 5 },
  { id: "sec-space", name: "Space Club of India Alliance", anchor: "space-collaboration", visible: true, order: 6 },
  { id: "sec-workshops", name: "Pre-DevFest College Hands-on Workshops", anchor: "workshops", visible: true, order: 7 },
  { id: "sec-cfp", name: "Call for Speakers (Sessionize Portal)", anchor: "call-for-speakers", visible: true, order: 8 },
  { id: "sec-speakers", name: "Organizing Committee & Past Keynotes Marquee", anchor: "speakers", visible: true, order: 9 },
  { id: "sec-recap-gallery", name: "Curated Editions Photo Stream", anchor: "recap-gallery", visible: true, order: 10 },
  { id: "sec-social", name: "Live Instagram Feed (#GDGIndore)", anchor: "social-stream", visible: true, order: 11 },
  { id: "sec-recap", name: "Executive Recap & Milestones", anchor: "recap", visible: true, order: 12 },
  { id: "sec-satellite", name: "Satellite Events & Hackathons", anchor: "satellite-events", visible: true, order: 13 },
  { id: "sec-tickets", name: "Tickets & Pass Reservation", anchor: "tickets", visible: true, order: 14 },
  { id: "sec-sponsors", name: "Sponsors & Industry Partners", anchor: "sponsors", visible: true, order: 15 },
  { id: "sec-faq", name: "Frequently Asked Questions", anchor: "faq", visible: true, order: 16 },
  { id: "sec-venue", name: "Essentia Hotel Venue & Coordinates", anchor: "venue", visible: true, order: 17 },
];

export async function getSectionsConfig(): Promise<SectionConfig[]> {
  try {
    const colRef = collection(db, "sections_config");
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as SectionConfig));
      return items.sort((a, b) => a.order - b.order);
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-sections-config");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_SECTIONS_CONFIG;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-sections-config");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_SECTIONS_CONFIG;
  }
}

export async function saveSectionsConfig(sections: SectionConfig[]): Promise<void> {
  try {
    for (const sec of sections) {
      const docRef = doc(db, "sections_config", sec.id);
      await setDoc(docRef, sec, { merge: true });
    }
  } catch (e) {}
  if (typeof window !== "undefined") {
    localStorage.setItem("devfest-sections-config", JSON.stringify(sections));
  }
}

/**
 * Fetch Pre-DevFest College Workshops
 */
export async function getWorkshops(): Promise<WorkshopItem[]> {
  try {
    const colRef = collection(db, COLLECTIONS.WORKSHOPS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as WorkshopItem));
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-workshops-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_WORKSHOPS;
  } catch (e) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-workshops-items");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_WORKSHOPS;
  }
}

/**
 * Save or Update College Workshop
 */
export async function saveWorkshop(item: WorkshopItem): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.WORKSHOPS, item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getWorkshops();
    const updated = [item, ...current.filter((w) => w.id !== item.id)];
    localStorage.setItem("devfest-workshops-items", JSON.stringify(updated));
  }
}

/**
 * Remove College Workshop
 */
export async function removeWorkshop(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.WORKSHOPS, id));
  } catch (e) {}
  if (typeof window !== "undefined") {
    const current = await getWorkshops();
    const updated = current.filter((w) => w.id !== id);
    localStorage.setItem("devfest-workshops-items", JSON.stringify(updated));
  }
}

/**
 * Real-time Live Subscriptions (onSnapshot) for Zero-Latency Instant UI Reflection
 */
export function subscribeToWorkshops(callback: (items: WorkshopItem[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTIONS.WORKSHOPS);
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as WorkshopItem));
          callback(items);
        } else {
          callback(INITIAL_WORKSHOPS);
        }
      },
      (err) => {
        console.warn("Workshops subscription notice:", err);
        getWorkshops().then(callback);
      }
    );
  } catch (e) {
    getWorkshops().then(callback);
    return () => {};
  }
}

export function subscribeToPartners(callback: (items: PartnerItem[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTIONS.PARTNERS);
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PartnerItem));
          callback(items);
        } else {
          callback(INITIAL_PARTNERS);
        }
      },
      (err) => {
        console.warn("Partners subscription notice:", err);
        getPartners().then(callback);
      }
    );
  } catch (e) {
    getPartners().then(callback);
    return () => {};
  }
}

export function subscribeToTeamMembers(callback: (items: TeamMember[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTIONS.TEAM);
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
          callback(items);
        } else {
          callback(INITIAL_TEAM);
        }
      },
      (err) => {
        console.warn("Team subscription notice:", err);
        getTeamMembers().then(callback);
      }
    );
  } catch (e) {
    getTeamMembers().then(callback);
    return () => {};
  }
}

export function subscribeToPastSpeakers(callback: (items: PastSpeaker[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTIONS.PAST_SPEAKERS);
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PastSpeaker));
          callback(items);
        } else {
          callback(DEV_FEST_PAST_SPEAKERS_FULL);
        }
      },
      (err) => {
        console.warn("Speakers subscription notice:", err);
        getPastSpeakers().then(callback);
      }
    );
  } catch (e) {
    getPastSpeakers().then(callback);
    return () => {};
  }
}

export function subscribeToGalleryPhotos(callback: (items: GalleryItem[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTIONS.GALLERY);
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
          callback(items);
        } else {
          callback(INITIAL_GALLERY_ITEMS);
        }
      },
      (err) => {
        console.warn("Gallery subscription notice:", err);
        getGalleryPhotos().then(callback);
      }
    );
  } catch (e) {
    getGalleryPhotos().then(callback);
    return () => {};
  }
}

export function subscribeToSectionsConfig(callback: (items: SectionConfig[]) => void): () => void {
  try {
    const colRef = collection(db, "sections_config");
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as SectionConfig));
          items.sort((a, b) => a.order - b.order);
          callback(items);
        } else {
          callback(INITIAL_SECTIONS_CONFIG);
        }
      },
      (err) => {
        console.warn("Sections subscription notice:", err);
        getSectionsConfig().then(callback);
      }
    );
  } catch (e) {
    getSectionsConfig().then(callback);
    return () => {};
  }
}

export function subscribeToNavItems(callback: (items: NavItem[]) => void): () => void {
  try {
    const colRef = collection(db, "navigation_links");
    return onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as NavItem));
          callback(items);
        } else {
          callback(INITIAL_NAV_ITEMS);
        }
      },
      (err) => {
        console.warn("Nav subscription notice:", err);
        getNavItems().then(callback);
      }
    );
  } catch (e) {
    getNavItems().then(callback);
    return () => {};
  }
}
