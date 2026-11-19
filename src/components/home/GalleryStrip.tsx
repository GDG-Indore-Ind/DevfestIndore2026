import Image from "next/image";
import Link from "next/link";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import { ALL_PHOTOS, eventTag } from "@/content/gallery";
import styles from "./GalleryStrip.module.css";

const PER_EVENT = 2;
const MAX_PHOTOS = 8;
// Newest editions first; campus visits and one-offs stay in the full archive.
const EVENTS = [
  "devfest-2026",
  "devfest-2025",
  "ccd-2025",
  "devfest-2024",
  "ccd-2024",
  "devfest-2023",
  "ccd-2023",
  "ccd-2022",
];

/** Photos from past editions with only a tiny edition tag, e.g. "DevFest 2025". */
export default function GalleryStrip() {
  const photos = EVENTS.flatMap((id) =>
    ALL_PHOTOS.filter((photo) => photo.eventId === id && photo.showInGallery).slice(0, PER_EVENT),
  ).slice(0, MAX_PHOTOS);
  if (!photos.length) return null;
  return (
    <div className={styles.root}>
      <SectionHeader
        level={3}
        title="Photo archive"
        action={
          <ContentAction href="/archive#photos" icon="gallery" tone="green">
            All photos
          </ContentAction>
        }
      />
      <ul className={styles.grid}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href="/archive#photos" className={styles.card} aria-label={`${photo.caption}`}>
              <span className={styles.thumb}>
                <Image
                  src={photo.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 60vw, (max-width: 1000px) 33vw, 200px"
                />
              </span>
              <span className={styles.tag}>{eventTag(photo.eventId)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
