"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import PersonRoster, { type RosterPerson } from "@/components/shared/PersonRoster";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import styles from "./page.module.css";

export default function AmbassadorSearch({ people }: { people: RosterPerson[] }) {
  const [query, setQuery] = useState("");
  const terms = query.toLowerCase().trim().split(/\s+/);
  const matches = people.filter(({ name, meta }) => {
    const entry = `${name} ${meta}`.toLowerCase();
    return terms.every((term) => entry.includes(term));
  });

  return (
    <>
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
      </div>
      <p className={`audience-caption ${styles.results}`} role="status">
        {matches.length
          ? `${matches.length} ${matches.length === 1 ? page.resultSingular : page.resultPlural}`
          : page.searchEmpty}
      </p>
      {matches.length > 0 && <PersonRoster people={matches} />}
    </>
  );
}
