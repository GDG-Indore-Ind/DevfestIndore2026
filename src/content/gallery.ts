import galleryFile from "../../content/gallery.json";
import type { GalleryItem } from "./model";
export const ALL_PHOTOS = galleryFile.photos;
export const GALLERY_PHOTOS = ALL_PHOTOS.filter((photo) => photo.showInGallery) as GalleryItem[];
