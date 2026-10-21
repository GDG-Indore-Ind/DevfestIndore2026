import ambassadorsFile from "../../content/ambassadors.json";
import { EVENT } from "@/content/event";

export interface Ambassador {
  name: string;
  college: string;
  coupon: string;
  discount: string;
  city?: string;
  avatar?: string;
}

export type AmbassadorsMap = Record<string, Ambassador>;

export const AMBASSADORS: AmbassadorsMap = ambassadorsFile.ambassadors as AmbassadorsMap;

export const KONFHUB_BASE_URL = EVENT.links.booking;
export const REFERRAL_STORAGE_KEY = "devfest_ref_coupon";
export const AMBASSADOR_STORAGE_KEY = "devfest_ref_ambassador";

/**
 * Returns the ambassador by slug, or undefined if not found.
 */
export function getAmbassador(slug: string): Ambassador | undefined {
  return AMBASSADORS[slug.toLowerCase().trim()];
}

/**
 * Generates the dynamic KonfHub checkout URL with coupon attached.
 */
export function getKonfHubUrl(coupon?: string | null): string {
  const code = (coupon ?? "").trim();
  if (!code) return KONFHUB_BASE_URL;
  return `${KONFHUB_BASE_URL}?coupon=${encodeURIComponent(code)}`;
}

/**
 * Safely persists referral data to localStorage on the client.
 */
export function persistReferral(coupon: string, ambassador?: Ambassador): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REFERRAL_STORAGE_KEY, coupon.toUpperCase().trim());
    if (ambassador) {
      localStorage.setItem(AMBASSADOR_STORAGE_KEY, JSON.stringify(ambassador));
    }
    window.dispatchEvent(new Event("devfest-referral-update"));
  } catch (err) {
    console.warn("Could not persist referral to localStorage", err);
  }
}

/**
 * Reads stored referral coupon and ambassador details from localStorage.
 */
export function getStoredReferral(): { coupon: string | null; ambassador: Ambassador | null } {
  if (typeof window === "undefined") return { coupon: null, ambassador: null };
  try {
    const coupon = localStorage.getItem(REFERRAL_STORAGE_KEY);
    const ambRaw = localStorage.getItem(AMBASSADOR_STORAGE_KEY);
    const ambassador = ambRaw ? (JSON.parse(ambRaw) as Ambassador) : null;
    return { coupon, ambassador };
  } catch {
    return { coupon: null, ambassador: null };
  }
}

/**
 * Clears stored referral details from localStorage.
 */
export function clearReferral(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    localStorage.removeItem(AMBASSADOR_STORAGE_KEY);
    window.dispatchEvent(new Event("devfest-referral-update"));
  } catch {
    // ignore
  }
}
