"use client";
import { useDirectoryFilters } from "@/hooks/useDirectoryFilters";
import Link from "next/link";
import { EVENT } from "@/content/event";
import { participationRoleLabels } from "@/content/participations";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import { DIRECTORY_COPY as copy } from "@/content/directory";
import type { getTeamDirectory } from "@/content/directory";
import styles from "./Directory.module.css";

type Props = { people: ReturnType<typeof getTeamDirectory>; preview: boolean };
export default function TeamDirectory({ people, preview }: Props) {
  const { values, setFilter, clear } = useDirectoryFilters({
    q: "",
    year: preview ? "all" : EVENT.year,
    role: "all",
  });
  const { q: query, year, role } = values;
  const years = [
    ...new Set([
      EVENT.year,
      ...people.flatMap((item) => item.history.map((entry) => entry.event.year)),
    ]),
  ]
    .sort()
    .reverse();
  const filtered = people
    .map((item) => ({
      ...item,
      matches: item.history.filter(
        (entry) =>
          (year === "all" || entry.event.year === year) &&
          (role === "all" || entry.roles.some((r) => r.kind === role)),
      ),
    }))
    .filter(
      (item) =>
        (item.matches.length || (year === "all" && role === "all" && item.legacy.length)) &&
        [
          item.person.name,
          ...item.matches.flatMap((entry) => entry.roles.flatMap(participationRoleLabels)),
          ...item.legacy.map((entry) => entry.role),
        ]
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
      </div>
      <div className={styles.filters} role="group" aria-label={copy.filters.rolesLabel}>
        <button aria-pressed={role === "all"} onClick={() => setFilter("role", "all")}>
          {copy.team.allRoles}
        </button>
        {copy.roles.map((item) => (
          <button
            key={item.id}
            aria-pressed={role === item.id}
            onClick={() => setFilter("role", item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p role="status" className="audience-caption">
        {filtered.length}{" "}
        {filtered.length === 1 ? copy.filters.peopleSingular : copy.filters.peoplePlural}
      </p>
      <div className={styles.list}>
        {filtered.map((item) => (
          <article className={styles.row} key={item.person.id}>
            <CommunityPhoto
              src={item.person.avatar ?? ""}
              alt={item.person.name}
              portrait
              sizes="64px"
            />
            <div>
              <h2>
                {preview || item.approved ? (
                  <Link href={`/people/${item.person.id}`}>{item.person.name}</Link>
                ) : (
                  item.person.name
                )}
              </h2>
              {item.matches.map((entry) => (
                <p key={entry.id}>
                  {entry.event.year} ·{" "}
                  {entry.roles
                    .filter((r) => role === "all" || r.kind === role)
                    .flatMap(participationRoleLabels)
                    .join(" · ")}
                </p>
              ))}
              {year === "all" &&
                role === "all" &&
                item.legacy.map((entry) => <p key={entry.id}>{entry.role}</p>)}
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
