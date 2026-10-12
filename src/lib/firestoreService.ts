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

// Collection Names
const COLLECTIONS = {
  TEAM: "team_members",
  PAST_SPEAKERS: "past_speakers",
  GALLERY: "gallery_photos",
  SUPPORT: "support_queries",
  CONFIG: "event_config",
  AGENDA: "agenda_sessions",
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
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
    }
    // Check localStorage fallback or initial seed
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-team-members");
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_TEAM;
  } catch (error) {
    console.warn("Firestore offline or permission notice, fallback to local:", error);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devfest-team-members");
      if (saved) return JSON.parse(saved);
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
