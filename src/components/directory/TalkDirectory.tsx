"use client";
import { useDirectoryFilters } from "@/hooks/useDirectoryFilters";
import Link from "next/link";
import { DIRECTORY_COPY as copy } from "@/content/directory";
import type { getTalks } from "@/content/directory";
import styles from "./Directory.module.css";
export default function TalkDirectory({
  talks,
  approvedPeople,
  preview,
}: {
  talks: ReturnType<typeof getTalks>;
  approvedPeople: readonly string[];
  preview: boolean;
}) {
  const { values, setFilter, clear } = useDirectoryFilters({
    q: "",
    year: "all",
    track: "all",
    event: "all",
  });
  const { q: query, year, track, event: eventId } = values;
  const years = [...new Set(talks.map((talk) => talk.event.year))].sort().reverse();
  const tracks = [...new Set(talks.map((talk) => talk.track || talk.category))].sort();
  const events = [...new Map(talks.map((talk) => [talk.event.id, talk.event])).values()];
  const filtered = talks.filter(
    (talk) =>
      (year === "all" || talk.event.year === year) &&
      (eventId === "all" || talk.event.id === eventId) &&
      (track === "all" || (talk.track || talk.category) === track) &&
      [talk.title, ...talk.speakers.map((person) => person.name)]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <label>
          {copy.filters.searchLabel}
          <input
            type="search"
            placeholder={copy.filters.searchPlaceholder}
            value={query}
            onChange={(e) => setFilter("q", e.target.value)}
          />
        </label>
        <label>
          {copy.filters.yearLabel}
          <select value={year} onChange={(e) => setFilter("year", e.target.value)}>
            <option value="all">{copy.filters.allYears}</option>
            {years.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          {copy.filters.eventLabel}
          <select value={eventId} onChange={(e) => setFilter("event", e.target.value)}>
            <option value="all">{copy.filters.allEvents}</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          {copy.filters.trackLabel}
          <select value={track} onChange={(e) => setFilter("track", e.target.value)}>
            <option value="all">{copy.filters.allTracks}</option>
            {tracks.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="audience-caption">
        {filtered.length}{" "}
        {filtered.length === 1 ? copy.filters.talkSingular : copy.filters.talkPlural}
      </p>
      <div className={styles.list}>
        {filtered.map((talk) => (
          <article key={talk.id} className={`${styles.row} ${styles.talk}`}>
            <div>
              <h2>
                <Link href={`/talks/${talk.id}`}>{talk.title}</Link>
              </h2>
              <p>
                {talk.event.title} · {talk.track || talk.category}
              </p>
              <div className={styles.links}>
                {talk.speakers.map((person) =>
                  preview || approvedPeople.includes(person.id) ? (
                    <Link key={person.id} href={`/people/${person.id}`}>
                      {person.name}
                    </Link>
                  ) : (
                    <span key={person.id}>{person.name}</span>
                  ),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className={styles.empty}>
          <h2>{copy.filters.emptyTitle}</h2>
          <p>{copy.filters.emptyText}</p>
          <button className={styles.clear} onClick={clear}>
            {copy.filters.clearLabel}
          </button>
        </div>
      )}
    </div>
  );
}
