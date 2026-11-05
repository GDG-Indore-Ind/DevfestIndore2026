"use client";

import { useState } from "react";
import PersonCard, { PersonGrid } from "@/components/shared/PersonCard";
import styles from "./page.module.css";

type Ambassador = {
  id: string;
  name: string;
  photo?: string;
  track: string;
  community: string;
  socials: { linkedin?: string; instagram?: string };
};
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
        <PersonGrid>
          {matches.map(({ id, name, photo, community, socials }) => (
            <PersonCard
              key={id}
              name={name}
              photo={photo}
              meta={community}
              socials={socials}
              headingLevel="h3"
            />
          ))}
        </PersonGrid>
      ) : (
        <div className={styles.empty}>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyText}</p>
        </div>
      )}
    </>
  );
}
