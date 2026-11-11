"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, GraduationCap, Expand } from "lucide-react";
import { WORKSHOPS } from "@/content/workshops";
import { WORKSHOPS_PAGE as page } from "@/content/pages";
import type { WorkshopPhoto } from "@/content/model";
import ExternalLink from "@/components/shared/ExternalLink";
import WorkshopPhotoViewer from "@/components/workshops/WorkshopPhotoViewer";
import styles from "./CampusWorkshops.module.css";

/** The Pre-DevFest campus series: past sessions with photos and official event pages. */
export default function CampusWorkshops() {
  const [query, setQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<WorkshopPhoto | null>(null);
  const filtered = WORKSHOPS.filter((item) =>
    [item.college, item.topic, item.speaker, item.displayDate]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <div className={styles.directory}>
      <div className={styles.directoryHeading}>
        <p>{page.workshopLead}</p>
        <label className="community-search workshop-search">
          <span>
            <Search className="audience-icon" aria-hidden="true" />
            {page.searchLabel}
          </span>
          <input
            type="search"
            placeholder={page.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className={`audience-caption ${styles.directoryResultCount}`} role="status">
        {filtered.length} {filtered.length === 1 ? page.sessionSingular : page.sessionPlural}
      </p>
      <div className={styles.workshopDirectoryGrid}>
        {filtered.map((item) => {
          const photo = item.photos[0];
          return (
            <article className={styles.workshopDirectoryRow} key={item.id} id={item.id}>
              {photo ? (
                <button
                  id={item.legacyId}
                  className={styles.workshopPhotoButton}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`${page.photoLabel}: ${item.college}`}
                >
                  <Image
                    src={photo.imageUrl}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 480px) 76px, 96px"
                  />
                  <Expand aria-hidden="true" />
                </button>
              ) : (
                <div id={item.legacyId} className={styles.workshopPhotoEmpty} aria-hidden="true">
                  <GraduationCap />
                </div>
              )}
              <div className={styles.workshopRowCopy}>
                <p className={styles.workshopRowDate}>
                  {item.date ? (
                    <time dateTime={item.date}>{item.displayDate}</time>
                  ) : (
                    page.undatedLabel
                  )}
                  {item.topic && <span>{item.topic}</span>}
                </p>
                <h3>{item.college}</h3>
                <div className={styles.workshopRowBottom}>
                  <p>{item.speaker}</p>
                  {item.eventUrl && (
                    <ExternalLink href={item.eventUrl}>{page.eventLinkLabel}</ExternalLink>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="community-empty">
          <h3>{page.emptyTitle}</h3>
          <p>{page.emptyText}</p>
          <button type="button" onClick={() => setQuery("")}>
            {page.clearLabel}
          </button>
        </div>
      )}
      <WorkshopPhotoViewer photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
