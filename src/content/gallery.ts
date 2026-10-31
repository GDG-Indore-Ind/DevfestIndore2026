import galleryFile from "../../content/gallery.json";
import type { GalleryItem } from "./model";
export const ALL_PHOTOS = galleryFile.photos;
export const GALLERY_PHOTOS = ALL_PHOTOS.filter((photo) => photo.showInGallery) as GalleryItem[];

export interface PressClipping {
  id: string;
  title: string;
  event: string;
  publication?: string;
  date?: string;
  imageUrl: string;
  width: number;
  height: number;
}
export const PRESS_CLIPPINGS: PressClipping[] = galleryFile.press;
