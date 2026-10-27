"use client";
import { useDirectoryFilters } from "@/hooks/useDirectoryFilters";
import Link from "next/link";
import { EVENT } from "@/content/event";
import { DIRECTORY_COPY as copy } from "@/content/directory";
import type { getPublicOrganizations } from "@/content/directory";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import styles from "./Directory.module.css";
export default function PartnerDirectory({
  organizations,
  preview,
}: {
  organizations: ReturnType<typeof getPublicOrganizations>;
  preview: boolean;
}) {
  const { values, setFilter, clear } = useDirectoryFilters({
    q: "",
    year: EVENT.year,
    type: "all",
  });
  const { q: query, year, type: kind } = values;
  const years = [
    ...new Set(
      organizations
        .flatMap((organization) => organization.partnerships.map((entry) => entry.editionId))
        .filter((id) => /^devfest-20\d\d$/.test(id))
        .map((id) => id.slice(-4)),
    ),
  ]
    .sort()
    .reverse();
  const filtered = organizations
    .map((organization) => ({
      ...organization,
      matches: organization.partnerships.filter(
        (entry) =>
          (year === "all" || entry.editionId === `devfest-${year}` || entry.editionId === year) &&
          (kind === "all" || entry.contributions.some((item) => item.kind === kind)),
      ),
    }))
    .filter(
      (organization) =>
        organization.matches.length &&
        [
          organization.name,
          ...organization.matches.flatMap((entry) => entry.contributions.map((item) => item.role)),
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
            value={query}
            placeholder={copy.filters.searchPlaceholder}
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
            <option value="historical">{copy.partners.unknownYearLabel}</option>
            <option value="ecosystem">{copy.partners.ecosystemLabel}</option>
          </select>
        </label>
        <label>
          {copy.filters.typeLabel}
          <select value={kind} onChange={(e) => setFilter("type", e.target.value)}>
            <option value="all">{copy.filters.allTypes}</option>
            <option value="sponsor">{copy.filters.sponsorsLabel}</option>
            <option value="collaborator">{copy.filters.collaboratorsLabel}</option>
            <option value="community">{copy.filters.communitiesLabel}</option>
            <option value="media">{copy.filters.mediaLabel}</option>
          </select>
        </label>
      </div>
      <p role="status" className="audience-caption">
        {filtered.length}{" "}
        {filtered.length === 1
          ? copy.filters.organizationSingular
          : copy.filters.organizationPlural}
      </p>
      <div className={styles.list}>
        {filtered.map((organization) => (
          <article className={styles.row} key={organization.id}>
            <div className={styles.logo}>
              <OrganizationLogo organization={organization} />
            </div>
            <div>
              <h2>
                {preview || organization.approved ? (
                  <Link href={`/organizations/${organization.id}`}>{organization.name}</Link>
                ) : (
                  organization.name
                )}
              </h2>
              {organization.matches.map((entry) => (
                <p key={entry.id}>
                  {entry.editionId !== "historical" && (
                    <>
                      {entry.editionId === "ecosystem"
                        ? copy.partners.ecosystemLabel
                        : entry.editionId.replace(/^devfest-/, "")}{" "}
                      ·{" "}
                    </>
                  )}
                  {entry.contributions
                    .filter((item) => kind === "all" || item.kind === kind)
                    .map((item) => item.role)
                    .join(" · ")}
                </p>
              ))}
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
