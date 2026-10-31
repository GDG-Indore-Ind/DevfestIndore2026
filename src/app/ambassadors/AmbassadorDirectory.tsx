"use client";

import Image from "next/image";
import { useState } from "react";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./page.module.css";

type Ambassador = {
  id: string;
  name: string;
  photo?: string;
  track: string;
  community: string;
  linkedin?: string;
};
type Group = { track: string; title: string; lead: string };
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
  groups,
  copy,
}: {
  ambassadors: Ambassador[];
  groups: Group[];
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
        groups.map(({ track, title, lead }) => {
          const members = matches.filter((ambassador) => ambassador.track === track);
          if (!members.length) return null;
          return (
            <section key={track} className={styles.group} aria-labelledby={`${track}-title`}>
              <h3 id={`${track}-title`}>{title}</h3>
              <p className={styles.groupLead}>{lead}</p>
              <div className={styles.directory}>
                {members.map(({ id, name, photo, community, linkedin }) => (
                  <article key={id} className={styles.profile} aria-labelledby={`${id}-name`}>
                    {photo ? (
                      <Image className={styles.photo} src={photo} alt="" width={48} height={48} />
                    ) : (
                      <span className={styles.initials} aria-hidden="true">
                        {name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    )}
                    <div>
                      <h4 id={`${id}-name`}>{name}</h4>
                      <p>{community}</p>
                      {linkedin && <ProfileLinks socials={{ linkedin }} name={name} iconOnly />}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className={styles.empty}>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyText}</p>
        </div>
      )}
    </>
  );
}
