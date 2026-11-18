import eventFile from "./generated/event.json";
import galleryFile from "./generated/gallery.json";
import type { GalleryItem } from "./model";
import type { PressClipping as PressRecord } from "./schema/public/gallery";
export const ALL_PHOTOS = galleryFile.photos;
export const GALLERY_PHOTOS = ALL_PHOTOS.filter((photo) => photo.showInGallery) as GalleryItem[];

export interface PressClipping extends PressRecord {
  /** The event's name, resolved from `eventId`. */
  event: string;
}
// "AI Unplugged" is shown with its year so clippings read the same as before.
const eventNames = new Map(
  eventFile.events.map((event) => {
    const year = event.date.slice(0, 4);
    return [event.id, event.name.includes(year) ? event.name : `${event.name} ${year}`];
  }),
);
export const PRESS_CLIPPINGS: PressClipping[] = (galleryFile.press ?? []).map((clipping) => ({
  ...clipping,
  event: eventNames.get(clipping.eventId) ?? clipping.eventId,
}));

/** Short tag for tiny captions: "DevFest 2025", "Cloud Community Days 2024". */
export function eventTag(eventId: string | undefined): string | undefined {
  const event = eventFile.events.find((item) => item.id === eventId);
  if (!event) return undefined;
  return `${event.name
    .replace(/\s*Indore\s*/, " ")
    .replace(/\s+/g, " ")
    .trim()}${event.name.includes(event.date.slice(0, 4)) || event.name.startsWith("Cloud Bytes") ? "" : ` ${event.date.slice(0, 4)}`}`;
}
