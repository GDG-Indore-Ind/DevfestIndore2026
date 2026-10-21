import { EVENT } from "@/content/event";
import type { PublicPass } from "@/content/tickets";
export const TICKET_BOOKING_URL = EVENT.links.booking;
// Enable only after final prices and all checkout restrictions are configured.
// A release date alone must never enable an unverified checkout.
export const TICKET_SALES_OPEN = EVENT.booking.enabled;
export function getPassReleaseStatus(pass: Pick<PublicPass, "opensAt" | "closesAt">, now: number, salesEnabled: boolean) {
  if (now < Date.parse(pass.opensAt))
    return "upcoming";
  if (now > Date.parse(pass.closesAt))
    return "closed";
  return salesEnabled ? "open" : "scheduled";
}
