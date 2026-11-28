import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { AgendaFormat, AgendaItem } from "@/content/agenda";
import { AGENDA_PAGE as copy } from "@/content/pages";
import Chip, { type ChipTone } from "@/components/shared/Chip";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ExternalLink from "@/components/shared/ExternalLink";
import ProfileLinks from "@/components/shared/ProfileLinks";
import { endTime, FORMAT_TONES } from "@/lib/agendaFormat";
import styles from "./AgendaSession.module.css";

const tones = FORMAT_TONES as Record<AgendaFormat, ChipTone>;
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

function displayHall(hall?: string) {
  if (!hall || hall === "Sessions") return "Main Stage";
  return hall;
}

export type AgendaRowTone = "red" | "green";

export interface AgendaMilestone {
  id: string;
  time: string;
  durationMinutes?: number;
  title: string;
  subtitle?: string;
  tone?: AgendaRowTone;
}

export function AgendaMilestoneRow({ item }: { item: AgendaMilestone }) {
  const end = item.durationMinutes ? endTime(item.time, item.durationMinutes) : null;
  return (
    <li id={item.id} className={`${styles.overview} ${styles.milestone}`} data-tone={item.tone}>
      <div className={styles.milestoneInner}>
        <span className={styles.time}>
          <span className={styles.timeRange}>
            <time dateTime={item.time}>{item.time}</time>
            {end && (
              <>
                <span aria-hidden="true"> – </span>
                <span className={styles.srOnly}> to </span>
                <time dateTime={end}>{end}</time>
              </>
            )}
          </span>
          {item.durationMinutes && (
            <span className={styles.timeDuration}>
              {item.durationMinutes} {copy.durationLabel}
            </span>
          )}
        </span>
        <span className={styles.stripText}>
          <strong className={styles.stripTitle}>{item.title}</strong>
          {item.subtitle && <span className={styles.stripSchedule}>{item.subtitle}</span>}
        </span>
      </div>
    </li>
  );
}

/** A session summary that expands to the description and speaker profiles. */
export default function AgendaSession({
  item,
  showHall = true,
  tone,
}: {
  item: AgendaItem;
  showHall?: boolean;
  tone?: AgendaRowTone;
}) {
  const end = item.time && item.durationMinutes ? endTime(item.time, item.durationMinutes) : null;
  const soloSpeaker = item.people.length === 1 ? item.people[0] : null;
  const showPanelLineup = item.format === "panel" && item.people.length > 0;
  const hallLabel = displayHall(item.hall);
  const details = (
    <div className={styles.row}>
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
                  {!showPanelLineup && item.people.length > 1 && (
                    <span className={styles.detailPortrait} aria-hidden="true">
                      <CommunityPhoto
                        src={person.avatar}
                        alt=""
                        initialsFor={person.name}
                        portrait
                        sizes="48px"
                      />
                    </span>
                  )}
                  <div className={styles.personMeta}>
                    <p className={styles.name}>
                      <Link href={`/people/${person.id}`} className="audience-text-link">
                        {person.name}
                      </Link>
                    </p>
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
  const speakers = item.people.map((person) => person.name).join(", ");
  const organization = item.organizations.join(", ");
  const sessionType =
    item.format === "keynote" || item.format === "panel" || item.format === "address"
      ? copy.formatLabels[item.format]
      : null;
  return (
    <li
      id={item.id}
      className={[
        styles.overview,
        showPanelLineup && styles.panel,
        (soloSpeaker || showPanelLineup) && styles.withEmbeddedPortrait,
        item.people.length === 0 && styles.noPeople,
        item.people.length > 1 && styles.multi,
      ]
        .filter(Boolean)
        .join(" ")}
      data-tone={tone}
    >
      <details data-agenda-session>
        <summary className={item.time ? styles.timed : undefined}>
          {item.time && (
            <span className={styles.time}>
              <span className={styles.timeRange}>
                <time dateTime={item.time}>{item.time}</time>
                {end && (
                  <>
                    <span aria-hidden="true"> – </span>
                    <span className={styles.srOnly}> to </span>
                    <time dateTime={end}>{end}</time>
                  </>
                )}
              </span>
              {item.durationMinutes && (
                <span className={styles.timeDuration}>
                  {item.durationMinutes} {copy.durationLabel}
                </span>
              )}
            </span>
          )}
          <span className={styles.stripText}>
            {sessionType && item.title !== sessionType && (
              <span className={styles.sessionType}>{sessionType}</span>
            )}
            <strong className={styles.stripTitle}>{item.title ?? copy.sessionPending}</strong>
            {soloSpeaker && !showPanelLineup && (
              <span className={styles.speakerSummary}>
                <span className={styles.speakerPortrait} aria-hidden="true">
                  <CommunityPhoto
                    src={soloSpeaker.avatar}
                    alt=""
                    initialsFor={soloSpeaker.name}
                    portrait
                    sizes="56px"
                  />
                </span>
                <span className={styles.speakerIdentity}>
                  <strong>{soloSpeaker.name}</strong>
                  {(soloSpeaker.company || soloSpeaker.role) && (
                    <span>{soloSpeaker.company || soloSpeaker.role}</span>
                  )}
                </span>
              </span>
            )}
            {!soloSpeaker && !showPanelLineup && (speakers || organization) && (
              <span className={styles.stripPresenter}>
                {speakers && <span className={styles.stripNames}>{speakers}</span>}
                {speakers && organization && ", "}
                {organization}
              </span>
            )}
            {showHall && item.hall && <span className={styles.stripSchedule}>{hallLabel}</span>}
            {showPanelLineup && (
              <span className={styles.lineup}>
                {item.people.map((person) => (
                  <span key={person.id} className={styles.lineupMember}>
                    <span className={styles.lineupPortrait} aria-hidden="true">
                      <CommunityPhoto
                        src={person.avatar}
                        alt=""
                        initialsFor={person.name}
                        portrait
                        sizes="56px"
                      />
                    </span>
                    <strong>{person.name}</strong>
                    {person.role && <span>{person.role}</span>}
                  </span>
                ))}
              </span>
            )}
          </span>
          {!soloSpeaker && !showPanelLineup && <StripMark item={item} />}
        </summary>
        {details}
      </details>
    </li>
  );
}
