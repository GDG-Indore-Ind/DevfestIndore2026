import { PUBLIC_PASSES, type PublicPass } from "@/content/tickets";
// Keep every still-open or upcoming release visible so attendees can compare
// the approved pass details before choosing a booking window.
export function getVisiblePasses(now: number): readonly PublicPass[] {
  return PUBLIC_PASSES.filter((pass) => pass.visible && now <= Date.parse(pass.closesAt));
}

export function isPassOpen(pass: PublicPass, now: number): boolean {
  return now >= Date.parse(pass.opensAt) && now <= Date.parse(pass.closesAt);
}
