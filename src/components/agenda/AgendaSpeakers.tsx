import { EVENT } from "@/content/event";
import { AGENDA_PAGE as copy } from "@/content/pages";
import { PARTICIPATIONS } from "@/content/participations";
import { getPerson } from "@/content/people";
import { CURRENT_SESSIONS } from "@/content/speakers";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ContentIcon from "@/components/shared/ContentIcon";
import styles from "./AgendaSpeakers.module.css";

const speakers = PARTICIPATIONS.flatMap((entry) => {
  const role = entry.roles.find((item) => item.kind === "speaker");
  if (entry.eventId !== EVENT.id || !role) return [];
  return [
    {
      person: getPerson(entry.personId),
      label: role.title,
      order: role.order,
      sessions: CURRENT_SESSIONS.filter((session) => session.speakerIds.includes(entry.personId)),
    },
  ];
}).sort((a, b) => a.order - b.order);

export default function AgendaSpeakers() {
  return (
    <section
      id="speakers"
      className={`audience-section ${styles.root}`}
      aria-labelledby="speakers-title"
    >
      <div className="audience-wrap">
        <h2 id="speakers-title">
          <ContentIcon name="microphone" tone="red" heading />
          {copy.speakersTitle}
        </h2>
        {speakers.length ? (
          <ul className={styles.list}>
            {speakers.map(({ person, label, sessions }) => (
              <li
                key={person.id}
                className={`${styles.row} ${person.avatar ? styles.withPhoto : ""}`}
              >
                {person.avatar && (
                  <CommunityPhoto src={person.avatar} alt={person.name} portrait sizes="88px" />
                )}
                <div>
                  <p className={styles.label}>{label}</p>
                  <h3>{person.name}</h3>
                  <p className={styles.role}>
                    {[person.role, person.company].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div className={styles.sessions}>
                  {sessions.length ? (
                    sessions.map((session) => (
                      <p key={session.id} className={styles.session}>
                        {session.title}
                      </p>
                    ))
                  ) : (
                    <p className={styles.pending}>{copy.sessionPending}</p>
                  )}
                  {person.bio && (
                    <details className={styles.bio}>
                      <summary>
                        {copy.bioLabel} {person.name}
                      </summary>
                      <p>{person.bio}</p>
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.more}>{copy.emptyText}</p>
        )}
        {!!speakers.length && <p className={styles.more}>{copy.more}</p>}
      </div>
    </section>
  );
}
