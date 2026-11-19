import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { AgendaFormat, AgendaItem } from "@/content/agenda";
import { AGENDA_PAGE as copy } from "@/content/pages";
import Chip, { type ChipTone } from "@/components/shared/Chip";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ExternalLink from "@/components/shared/ExternalLink";
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
const MAX_FACES = 3;

/** Who or what the strip is about: up to three speaker photos, or the organisation's mark. */
function StripMark({ item }: { item: AgendaItem }) {
  if (item.people.length) {
    const shown = item.people.slice(0, MAX_FACES);
    const extra = item.people.length - shown.length;
    return (
      <span className={styles.faces} aria-hidden="true">
        {shown.map((person) => (
          <span key={person.id} className={styles.face}>
            <CommunityPhoto
              src={person.avatar}
              alt=""
              initialsFor={person.name}
              portrait
              sizes="112px"
            />
          </span>
        ))}
        {extra > 0 && <span className={`${styles.face} ${styles.more}`}>+{extra}</span>}
      </span>
    );
  }
  return (
    <span className={styles.mark} aria-hidden="true">
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={44}
          height={44}
          unoptimized={!item.logo.startsWith("/")}
        />
      ) : (
        <Sparkles />
      )}
    </span>
  );
}

/**
 * One ruled row. On the agenda board (`overview`) it is a strip (photo, title, speaker, organisation
 * and duration) that opens to the rest; elsewhere it is the open row. The time and hall rail is
 * shown only on open rows, since the strip already carries them. `showHall` is off when a heading
 * already names the hall; `compact` keeps one column for side-by-side halls.
 */
export default function AgendaSession({
  item,
  showHall = true,
  compact = false,
  overview = false,
}: {
  item: AgendaItem;
  showHall?: boolean;
  compact?: boolean;
  overview?: boolean;
}) {
  const featured = item.format === "keynote";
  const hall = showHall ? item.hall : undefined;
  const hasRail = !overview && Boolean(item.time || hall);
  const details = (
    <div
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
        {!overview && (
          <h3 className={`${styles.title} ${item.title ? "" : styles.pending}`}>
            {item.title ?? copy.sessionPending}
          </h3>
        )}
        {item.description && <p className={styles.description}>{item.description}</p>}
        {item.resources?.length ? (
          <ul>
            {item.resources.map((resource) => (
              <li key={resource.url}>
                <ExternalLink href={resource.url}>{resource.label}</ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}
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
                  {!overview && person.avatar && (
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
    </div>
  );
  if (!overview) return <li id={item.id}>{details}</li>;
  const who =
    item.people.length === 1
      ? [item.people[0].name, item.people[0].company].filter(Boolean).join(", ")
      : item.people.map((person) => person.name).join(", ") || item.organizations.join(", ");
  const meta = [
    item.format === "keynote" ? copy.formatLabels.keynote : undefined,
    who,
    item.time,
    hall,
    item.durationMinutes ? `${item.durationMinutes} ${copy.durationLabel}` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <li
      id={item.id}
      className={[
        styles.overview,
        item.people.length === 0 && styles.noPeople,
        item.people.length > 1 && styles.multi,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <details>
        <summary>
          <span className={styles.stripText}>
            <strong>{item.title ?? copy.sessionPending}</strong>
            {meta && <small>{meta}</small>}
          </span>
          <StripMark item={item} />
        </summary>
        {details}
      </details>
    </li>
  );
}
