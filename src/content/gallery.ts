import eventFile from "../../content/event.json";
import galleryFile from "../../content/gallery.json";
import type { GalleryItem } from "./model";
export const ALL_PHOTOS = galleryFile.photos;
export const GALLERY_PHOTOS = ALL_PHOTOS.filter((photo) => photo.showInGallery) as GalleryItem[];

export interface PressClipping {
  id: string;
  title: string;
  eventId: string;
  /** The event's name, resolved from `eventId`. */
  event: string;
  publication?: string;
  date?: string;
  imageUrl: string;
  width: number;
  height: number;
}
// "AI Unplugged" is shown with its year so clippings read the same as before.
const eventNames = new Map(
  eventFile.events.map((event) => {
    const year = event.date.slice(0, 4);
    return [event.id, event.name.includes(year) ? event.name : `${event.name} ${year}`];
  }),
);
export const PRESS_CLIPPINGS: PressClipping[] = galleryFile.press.map((clipping) => ({
  ...clipping,
  event: eventNames.get(clipping.eventId) ?? clipping.eventId,
}));
