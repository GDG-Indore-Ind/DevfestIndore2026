"use client";

import { useState } from "react";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./page.module.css";

type Ambassador = { id: string; name: string; community: string; linkedin?: string };
type Copy = {
  searchLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyText: string;
  ambassadorSingular: string;
  ambassadorPlural: string;
};

export default function AmbassadorDirectory({
  ambassadors,
  copy,
}: {
  ambassadors: Ambassador[];
  copy: Copy;
}) {
  const [query, setQuery] = useState("");
  const matches = ambassadors.filter(({ name, community }) =>
    `${name} ${community}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <>
      <label className={styles.search}>
        <span>{copy.searchLabel}</span>
        <input
          type="search"
          placeholder={copy.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <p className={styles.count} role="status">
        {matches.length} {matches.length === 1 ? copy.ambassadorSingular : copy.ambassadorPlural}
      </p>
      {matches.length ? (
        <div className={styles.directory}>
          {matches.map(({ id, name, community, linkedin }) => (
            <article key={id} className={styles.profile} aria-labelledby={`${id}-name`}>
              <span className={styles.initials} aria-hidden="true">
                {name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </span>
              <div>
                <h3 id={`${id}-name`}>{name}</h3>
                <p>{community}</p>
                {linkedin && <ProfileLinks socials={{ linkedin }} />}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyText}</p>
        </div>
      )}
    </>
  );
}
