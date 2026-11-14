import type { CSSProperties } from "react";
import Link from "next/link";
import { AGENDA_ITEMS, AGENDA_SPEAKERS } from "@/content/agenda";
import { AGENDA_PAGE, HOME_PAGE } from "@/content/pages";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./AgendaPreview.module.css";

const copy = HOME_PAGE.agendaPreview;
const MAX_SPEAKERS = 9;

/** Confirmed speakers with their session, then workshop and exhibit counts, linking to /agenda. */
export default function AgendaPreview() {
  const speakers = AGENDA_SPEAKERS.slice(0, MAX_SPEAKERS);
  if (!speakers.length) return null;
  // Up to six speakers share one desktop row; larger line-ups wrap in fours.
  const columns = speakers.length <= 6 ? Math.max(4, speakers.length) : 4;
  const workshops = AGENDA_ITEMS.filter((item) => item.format === "workshop").length;
  const exhibits = AGENDA_ITEMS.filter((item) => item.format === "exhibit").length;
  const counts = [
    workshops && copy.workshopsLabel.replace("{{count}}", String(workshops)),
    exhibits && copy.exhibitsLabel.replace("{{count}}", String(exhibits)),
  ].filter(Boolean);
  return (
    <section
      id="agenda-preview"
      className={`audience-section ${styles.root}`}
      aria-labelledby="agenda-preview-title"
    >
      <div className="audience-wrap">
        <div className={styles.heading}>
          <h2 id="agenda-preview-title">{copy.title}</h2>
          <p>{copy.lead}</p>
        </div>
        <ul className={styles.grid} style={{ "--columns": columns } as CSSProperties}>
          {speakers.map((speaker) => {
            const item = AGENDA_ITEMS.find((entry) => entry.id === speaker.itemId)!;
            const work = [speaker.role, speaker.company].filter(Boolean).join(", ");
            return (
              <li key={speaker.id}>
                <Link href={`/agenda#${item.id}`} className={styles.card}>
                  <span className={styles.photo}>
                    <CommunityPhoto
                      src={speaker.avatar || undefined}
                      alt=""
                      initialsFor={speaker.name}
                      portrait
                      sizes="(max-width: 599px) 45vw, (max-width: 999px) 30vw, 270px"
                    />
                  </span>
                  <span className={styles.name}>{speaker.name}</span>
                  {work && <span className={styles.work}>{work}</span>}
                  <span className={styles.session}>
                    <span className={styles.format}>{AGENDA_PAGE.formatLabels[item.format]}</span>
                    {item.title && <span className={styles.title}>{item.title}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.footer}>
          {counts.length > 0 && <p>{counts.join(" · ")}</p>}
          <ContentAction href="/agenda" icon="calendar" tone="blue">
            {copy.agendaLabel}
          </ContentAction>
        </div>
      </div>
    </section>
  );
}
