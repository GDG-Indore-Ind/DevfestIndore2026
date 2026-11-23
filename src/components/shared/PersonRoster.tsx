"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { RosterDetail, Socials } from "@/content/model";
import Chip from "@/components/shared/Chip";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./PersonRoster.module.css";

export type RosterPerson = {
  id: string;
  name: string;
  photo?: string;
  href?: string;
  /** One muted line under the name: a function, college or company. */
  meta: string;
  socials?: Socials;
  /** Short label beside the name, e.g. a level. */
  badge?: string;
  highlight?: "gold" | "silver";
  /** Shown when the line is opened. */
  bio?: string;
  details?: RosterDetail[];
};

function RosterMember({ person }: { person: RosterPerson }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const expandable = Boolean(person.bio || person.details?.length);
  const identity = (
    <span className={styles.identity}>
      <span className={styles.name}>
        {person.name}
        {person.badge && (
          <Chip tone={person.badge === "Lead" ? "blue" : "neutral"}>{person.badge}</Chip>
        )}
      </span>
      <span className={styles.role}>{person.meta}</span>
    </span>
  );

  const opensProfileDetails = Boolean(person.href && expandable);
  const portrait = (
    <CommunityPhoto
      src={person.photo}
      alt=""
      initialsFor={person.name}
      portrait
      sizes={opensProfileDetails ? "88px" : "44px"}
    />
  );

  return (
    <li
      className={styles.member}
      data-highlight={person.highlight}
      data-profile-open={opensProfileDetails && open ? "true" : undefined}
    >
      <div className={styles.row}>
        {(!person.href || opensProfileDetails) && portrait}
        {person.href && !expandable ? (
          <Link href={person.href} className={styles.profileRow}>
            {portrait}
            {identity}
            <ArrowRight aria-hidden="true" className={styles.chevron} />
          </Link>
        ) : expandable ? (
          <button
            type="button"
            className={styles.identityRow}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((current) => !current)}
          >
            {identity}
            <ChevronDown aria-hidden="true" className={styles.chevron} />
          </button>
        ) : (
          <div className={styles.identityRow}>{identity}</div>
        )}
        <ProfileLinks
          socials={person.socials}
          name={person.name}
          iconOnly
          className={styles.socials}
        />
      </div>
      {expandable && (
        <div id={panelId} className={styles.panel} hidden={!open}>
          {person.bio && <p className={styles.bio}>{person.bio}</p>}
          {person.details?.map(({ label, items }) => (
            <div key={label}>
              <p className={styles.detailLabel}>{label}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {person.href && (
            <Link
              href={person.href}
              className={`audience-text-link ${styles.profileLink}`}
              aria-label={`View ${person.name} profile`}
            >
              View profile
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

export default function PersonRoster({ people }: { people: RosterPerson[] }) {
  return (
    <ul className={styles.roster}>
      {people.map((person) => (
        <RosterMember key={person.id} person={person} />
      ))}
    </ul>
  );
}
