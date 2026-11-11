import Image from "next/image";
import type { AgendaFormat, AgendaItem } from "@/content/agenda";
import { AGENDA_PAGE as copy } from "@/content/pages";
import Chip, { type ChipTone } from "@/components/shared/Chip";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./AgendaSession.module.css";

const tones: Record<AgendaFormat, ChipTone> = {
  workshop: "blue",
  session: "green",
  keynote: "yellow",
  exhibit: "red",
};

/** One ruled row: what it is, what it is called, and who is giving it. */
export default function AgendaSession({ item }: { item: AgendaItem }) {
  const featured = item.format === "keynote";
  const hasRail = Boolean(item.time || item.hall);
  return (
    <li
      id={item.id}
      className={`${styles.row} ${hasRail ? styles.withRail : ""} ${featured ? styles.featured : ""}`}
    >
      {hasRail && (
        <p className={styles.rail}>
          {item.time && <time>{item.time}</time>}
          {item.hall && <span>{item.hall}</span>}
        </p>
      )}
      <div className={styles.main}>
        <p className={styles.chips}>
          <Chip tone={tones[item.format]}>{copy.formatLabels[item.format]}</Chip>
          {item.durationMinutes && (
            <Chip>
              {item.durationMinutes} {copy.durationLabel}
            </Chip>
          )}
        </p>
        <h3 className={`${styles.title} ${item.title ? "" : styles.pending}`}>
          {item.title ?? copy.sessionPending}
        </h3>
        {item.description && <p className={styles.description}>{item.description}</p>}
        {item.organizations.length > 0 && (
          <p className={styles.presenter}>
            {copy.organizerLabel} {item.organizations.join(", ")}
          </p>
        )}
      </div>
      {item.people.length > 0 && (
        <div className={styles.aside}>
          <ul className={styles.people}>
            {item.people.map((person) => (
              <li key={person.id} className={styles.person}>
                {person.avatar && (
                  <Image
                    className={styles.avatar}
                    src={person.avatar}
                    alt=""
                    width={96}
                    height={96}
                    sizes="56px"
                  />
                )}
                <div>
                  <p className={styles.name}>{person.name}</p>
                  <p className={styles.role}>
                    {[person.role, person.company].filter(Boolean).join(", ")}
                  </p>
                </div>
                <ProfileLinks
                  socials={person.socials}
                  name={person.name}
                  iconOnly
                  className={styles.links}
                />
              </li>
            ))}
          </ul>
          {item.people
            .filter((person) => person.bio)
            .map((person) => (
              <details key={person.id} className={styles.bio}>
                <summary>
                  {copy.bioLabel} {person.name}
                </summary>
                <p>{person.bio}</p>
              </details>
            ))}
        </div>
      )}
    </li>
  );
}
