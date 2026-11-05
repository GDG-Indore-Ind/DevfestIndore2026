"use client";

import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, CalendarDays, MapPin, GraduationCap, ArrowRight, Expand } from "lucide-react";
import { WORKSHOPS } from "@/content/workshops";
import { COMMUNITY_EVENTS } from "@/content/archive";
import { WORKSHOPS_PAGE as page } from "@/content/pages";
import type { WorkshopPhoto } from "@/content/model";
import CommunityPage from "@/components/layout/CommunityPage";
import ExternalLink from "@/components/shared/ExternalLink";
import WorkshopPhotoViewer from "@/components/workshops/WorkshopPhotoViewer";
import styles from "./page.module.css";

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<WorkshopPhoto | null>(null);
  const filtered = WORKSHOPS.filter((item) =>
    [item.college, item.topic, item.speaker, item.displayDate]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <CommunityPage compact motif="events" title={page.title} lead={page.lead}>
      <div className={styles.workshopDirectoryPage}>
        <PageSectionNavigation label="On this page">
          <a href="#workshops">
            <GraduationCap className="audience-icon" aria-hidden="true" />
            {page.workshopTitle}
          </a>
          <a href="#community-events">
            <CalendarDays className="audience-icon" aria-hidden="true" />
            {page.communityTitle}
          </a>
          <Link href="/archive">
            {page.archiveLabel}
            <ArrowRight className="audience-icon" aria-hidden="true" />
          </Link>
        </PageSectionNavigation>
        <section
          className="archive-subsection"
          id="workshops"
          aria-labelledby="workshop-directory-title"
        >
          <div className={styles.directoryHeading}>
            <div>
              <h2 id="workshop-directory-title">{page.workshopTitle}</h2>
              <p>{page.workshopLead}</p>
            </div>
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
                    <div
                      id={item.legacyId}
                      className={styles.workshopPhotoEmpty}
                      aria-hidden="true"
                    >
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
        </section>
        <section
          className={`archive-subsection ${styles.compactCommunityEvents}`}
          id="community-events"
          aria-labelledby="community-events-title"
        >
          <div className={styles.directoryHeading}>
            <div>
              <h2 id="community-events-title">{page.communityTitle}</h2>
              <p>{page.communityLead}</p>
            </div>
          </div>
          <div className="community-event-list">
            {COMMUNITY_EVENTS.map((item) => (
              <article key={item.id}>
                <CalendarDays aria-hidden="true" />
                <div>
                  <p className="audience-caption">
                    <time dateTime={item.date}>{item.displayDate}</time>
                  </p>
                  <h3>{item.title}</h3>
                  <p className="event-location">
                    <MapPin className="audience-icon" aria-hidden="true" />
                    {item.venue}
                  </p>
                  <ExternalLink href={item.source}>{page.eventLinkLabel}</ExternalLink>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="community-note">
          <div>
            <h2>{page.ticketTitle}</h2>
            <p>{page.ticketLead}</p>
          </div>
          <Link href="/tickets" className="audience-text-link">
            {page.ticketLabel}
            <ArrowRight className="audience-icon" aria-hidden="true" />
          </Link>
        </aside>
      </div>
      <WorkshopPhotoViewer photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </CommunityPage>
  );
}
