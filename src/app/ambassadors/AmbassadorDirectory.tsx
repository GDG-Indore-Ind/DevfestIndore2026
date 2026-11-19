"use client";

import { useState } from "react";
import PersonRoster, { type RosterPerson } from "@/components/shared/PersonRoster";
import SectionHeader from "@/components/shared/SectionHeader";
import styles from "./page.module.css";

type Copy = {
  searchLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyText: string;
  ambassadorSingular: string;
  ambassadorPlural: string;
};

export default function AmbassadorDirectory({
  title,
  lead,
  ambassadors,
  copy,
}: {
  title: string;
  lead: string;
  ambassadors: RosterPerson[];
  copy: Copy;
}) {
  const [query, setQuery] = useState("");
  const matches = ambassadors.filter(({ name, meta }) =>
    `${name} ${meta}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <>
      <SectionHeader
        id="ambassador-directory-title"
        title={title}
        lead={lead}
        action={
          <input
            className={styles.search}
            type="search"
            aria-label={copy.searchLabel}
            placeholder={copy.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
      />
      <p className={styles.count} role="status">
        {matches.length} {matches.length === 1 ? copy.ambassadorSingular : copy.ambassadorPlural}
      </p>
      {matches.length ? (
        <PersonRoster people={matches} />
      ) : (
        <div className={styles.empty}>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyText}</p>
        </div>
      )}
    </>
  );
}
