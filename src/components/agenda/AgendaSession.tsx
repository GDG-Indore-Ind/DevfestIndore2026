import Image from "next/image";
import type { AgendaFormat, AgendaItem } from "@/content/agenda";
import { AGENDA_PAGE as copy } from "@/content/pages";
import Chip, { type ChipTone } from "@/components/shared/Chip";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./AgendaSession.module.css";

const tones: Record<AgendaFormat, ChipTone> = {
  keynote: "yellow",
  panel: "yellow",
  address: "neutral",
  session: "green",
  workshop: "blue",
  exhibit: "red",
};

/**
 * One ruled row: when or in what order, what it is, and who is giving it.
 * `position` is the running-order number shown until a time is set; `showHall` is off when a
 * heading already names the hall; `compact` keeps one column for side-by-side halls.
 */
export default function AgendaSession({
  item,
  position,
  showHall = true,
  compact = false,
}: {
  item: AgendaItem;
  position?: number;
  showHall?: boolean;
  compact?: boolean;
}) {
  const featured = item.format === "keynote";
  const hall = showHall ? item.hall : undefined;
  const order = !item.time && position ? String(position).padStart(2, "0") : undefined;
  const hasRail = Boolean(item.time || hall || order);
  return (
    <li
      id={item.id}
      className={[
        styles.row,
        hasRail && styles.withRail,
        featured && styles.featured,
        compact && styles.compact,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasRail && (
        <p className={styles.rail}>
          {item.time && <time>{item.time}</time>}
          {order && (
            <span className={styles.order}>
              <span className={styles.hidden}>{copy.slotLabel} </span>
              {order}
            </span>
          )}
          {hall && <span>{hall}</span>}
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
          {item.track && <Chip>{item.track}</Chip>}
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
                <div className={styles.personHeader}>
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
                  <div className={styles.personMeta}>
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
                </div>
                {person.bio && <p className={styles.bioText}>{person.bio}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
