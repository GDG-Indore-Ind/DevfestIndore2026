"use client";

import { useState } from "react";
import Image from "next/image";
import ContentAction from "@/components/shared/ContentAction";
import { Pause, Play } from "lucide-react";
import { GALLERY_PHOTOS } from "@/content/gallery";
import { HOME_PAGE } from "@/content/pages";
import styles from "./PhotoMarquee.module.css";

export default function PhotoMarquee() {
  const [paused, setPaused] = useState(false);
  if (!GALLERY_PHOTOS.length) return null;

  // Keep short collections wider than the viewport too, so the loop has no gap.
  const repetitions = Math.ceil(3 / GALLERY_PHOTOS.length);
  const group = (clone: boolean) => (
    <ul className={styles.group} aria-hidden={clone || undefined} inert={clone || undefined}>
      {Array.from({ length: repetitions }, (_, repeat) =>
        GALLERY_PHOTOS.map((photo) => {
          const decorative = clone || repeat > 0;
          return (
            <li
              key={`${repeat}-${photo.id}`}
              aria-hidden={decorative || undefined}
              inert={decorative || undefined}
              data-repeat={repeat > 0 || undefined}
            >
              <figure>
                <Image
                  src={photo.imageUrl}
                  alt={decorative ? "" : photo.title}
                  width={photo.width ?? 1400}
                  height={photo.height ?? 933}
                  sizes="(max-width: 760px) 85vw, 580px"
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          );
        }),
      )}
    </ul>
  );

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <ContentAction href="/gallery" icon="gallery" tone="green">
          {HOME_PAGE.photoArchiveLabel}
        </ContentAction>
        <button
          type="button"
          className={styles.toggle}
          aria-label={paused ? HOME_PAGE.photoMarqueePlayLabel : HOME_PAGE.photoMarqueePauseLabel}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
      </div>
      <div
        className={styles.window}
        role="region"
        aria-label={HOME_PAGE.photoMarqueeLabel}
        tabIndex={0}
      >
        <div
          className={styles.track}
          data-paused={paused}
          style={{ animationDuration: `${GALLERY_PHOTOS.length * repetitions * 12}s` }}
        >
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
