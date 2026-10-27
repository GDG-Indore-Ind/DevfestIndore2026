"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { PastSpeaker } from "@/content/model";
import { ARCHIVED_SPEAKERS } from "@/content/speakers";
import { DEVFEST_EDITIONS } from "@/content/archive";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import ArchiveNav from "@/components/layout/ArchiveNav";
import ExternalLink from "@/components/shared/ExternalLink";
import { PAST_SPEAKERS_PAGE as page } from "@/content/pages";

export default function PastSpeakersPage() {
  const speakers: PastSpeaker[] = ARCHIVED_SPEAKERS;
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [year, setYear] = useState("All");
  const archive = speakers;
  const editions = [...new Set(archive.map((speaker) => speaker.year))].sort().reverse();
  const tracks = [...new Set(archive.map((speaker) => speaker.track || speaker.category))].sort();
  const grouped = new Map<string, PastSpeaker[]>();
  for (const speaker of [...archive].sort((a, b) => b.year.localeCompare(a.year))) {
    const key = speaker.personId;
    const appearances = grouped.get(key) ?? [];
    if (!appearances.some((item) => item.year === speaker.year && item.topic === speaker.topic))
      appearances.push(speaker);
    grouped.set(key, appearances);
  }
  const filtered = [...grouped.entries()]
    .map(([key, appearances]) => ({
      key,
      appearances: appearances.filter(
        (speaker) =>
          (year === "All" || speaker.year === year) &&
          (track === "All" || (speaker.track || speaker.category) === track),
      ),
    }))
    .filter(
      (item) =>
        item.appearances.length &&
        item.appearances.some((speaker) =>
          [speaker.name, speaker.role, speaker.company, speaker.topic]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        ),
    );
  return (
    <CommunityPage
      flightStops={[
        { id: "page-overview", label: "Overview" },
        { id: "page-directory", label: "Speakers" },
      ]}
      compact
      motif="people"
      title={page.title}
      lead={page.lead}
    >
      <div className="speaker-directory">
        <ArchiveNav current="/past-speakers" />
        <div className="community-search-row">
          <label className="community-search">
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
          <label>
            {page.editionLabel}
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="All">{page.allEditions}</option>
              {editions.map((edition) => (
                <option key={edition}>{edition}</option>
              ))}
            </select>
          </label>
          <label>
            {page.trackLabel}
            <select value={track} onChange={(event) => setTrack(event.target.value)}>
              <option value="All">{page.allTracks}</option>
              {tracks.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="audience-caption community-results" role="status">
          {filtered.length} {filtered.length === 1 ? page.speakerSingular : page.speakerPlural}
        </p>
        <div className="speaker-compact-grid">
          {filtered.map(({ key, appearances }) => {
            const speaker = appearances[0];
            return (
              <article className="speaker-compact" key={key}>
                <CommunityPhoto
                  key={speaker.avatar}
                  src={speaker.avatar}
                  alt={speaker.name}
                  portrait
                  sizes="56px"
                />
                <div>
                  <h2>{speaker.name}</h2>
                  <p>{speaker.company !== "-" && speaker.company}</p>
                  <p className="audience-caption speaker-editions">
                    {[...new Set(appearances.map((item) => item.year))].join(" · ")}
                  </p>
                  <details className="community-details">
                    <summary>
                      {appearances.length > 1
                        ? `${appearances.length} ${page.sessionsLabel}`
                        : page.sessionLabel}
                    </summary>
                    {appearances.map((item) => {
                      const official = DEVFEST_EDITIONS.find(
                        (event) =>
                          event.date.slice(0, 4) === item.year &&
                          event.speakerNames?.includes(item.name),
                      );
                      return (
                        <div key={item.id} className="speaker-appearance">
                          <p className="audience-caption">
                            {item.year} ·{" "}
                            {[item.role, item.company]
                              .filter((value) => value && value !== "-")
                              .join(" · ")}
                          </p>
                          <h3>{item.topic}</h3>
                          {item.description && <p>{item.description}</p>}
                          {item.bio && item.bio !== "-" && <p>{item.bio}</p>}
                          {official && (
                            <ExternalLink href={official.source}>{page.sourceLabel}</ExternalLink>
                          )}
                        </div>
                      );
                    })}
                    <ProfileLinks socials={speaker.socials} />
                  </details>
                </div>
              </article>
            );
          })}
        </div>
        {!filtered.length && (
          <div className="community-empty">
            <h2>{page.emptyTitle}</h2>
            <p>{page.emptyText}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setYear("All");
                setTrack("All");
              }}
            >
              {page.clearLabel}
            </button>
          </div>
        )}
        <p className="audience-caption archive-provenance">{page.provenance}</p>
      </div>
    </CommunityPage>
  );
}
