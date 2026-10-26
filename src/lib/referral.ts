import { EVENT } from "@/content/event";

export const KONFHUB_BASE_URL = EVENT.links.booking;
export const REFERRAL_STORAGE_KEY = "devfest_ref_coupon";

/**
 * Generates the dynamic KonfHub checkout URL with coupon attached.
 */
export function getKonfHubUrl(coupon?: string | null): string {
  const code = (coupon ?? "").trim();
  if (!code) return KONFHUB_BASE_URL;
  return `${KONFHUB_BASE_URL}?coupon=${encodeURIComponent(code)}`;
}

/**
 * Reads a previously saved referral coupon from localStorage.
 */
export function getStoredReferral(): { coupon: string | null } {
  if (typeof window === "undefined") return { coupon: null };
  try {
    return { coupon: localStorage.getItem(REFERRAL_STORAGE_KEY) };
  } catch {
    return { coupon: null };
  }
}
