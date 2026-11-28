import type { ChipTone } from "@/components/shared/Chip";

/** Chip tone for each agenda format, shared by the agenda and the Passport. */
export const FORMAT_TONES: Record<string, ChipTone> = {
  keynote: "yellow",
  panel: "yellow",
  address: "neutral",
  session: "green",
  workshop: "blue",
  exhibit: "red",
};

/** "HH:MM" plus a duration in minutes, wrapped past midnight. */
export function endTime(start: string, duration: number) {
  const [hours, minutes] = start.split(":").map(Number);
  const total = (hours * 60 + minutes + duration) % (24 * 60);
  return [Math.floor(total / 60), total % 60]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}
