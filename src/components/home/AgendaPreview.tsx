import Link from "next/link";
import { AGENDA_ITEMS, AGENDA_SPEAKERS } from "@/content/agenda";
import { AGENDA_PAGE, HOME_PAGE } from "@/content/pages";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import styles from "./AgendaPreview.module.css";

const copy = HOME_PAGE.agendaPreview;

/** Every confirmed speaker as a portrait, name and organisation; sessions live on /agenda. */
export default function AgendaPreview() {
  if (!AGENDA_SPEAKERS.length) return null;
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
        <SectionHeader
          id="agenda-preview-title"
          title={copy.title}
          lead={[copy.lead, counts.length ? `${counts.join(" · ")}.` : ""]
            .filter(Boolean)
            .join(" ")}
          action={
            <ContentAction href="/agenda" icon="calendar" tone="blue">
              {copy.agendaLabel}
            </ContentAction>
          }
        />
        <ul className={styles.grid}>
          {AGENDA_SPEAKERS.map((speaker) => {
            const item = AGENDA_ITEMS.find((entry) => entry.id === speaker.itemId)!;
            const organisation = speaker.company || speaker.role;
            return (
              <li key={speaker.id}>
                <Link href={`/agenda#${item.id}`} className={styles.card}>
                  <span className={styles.photo}>
                    <CommunityPhoto
                      src={speaker.avatar || undefined}
                      alt=""
                      initialsFor={speaker.name}
                      portrait
                      sizes="96px"
                    />
                  </span>
                  <span className={styles.name}>{speaker.name}</span>
                  {organisation && <span className={styles.work}>{organisation}</span>}
                  {item.format === "keynote" && (
                    <span className={styles.badge}>{AGENDA_PAGE.formatLabels.keynote}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {exhibits > 0 && (
          <div className={styles.actions}>
            <ContentAction href="/agenda#exhibits" icon="exhibits" tone="blue">
              {HOME_PAGE.exhibits.confirmedLink}
            </ContentAction>
          </div>
        )}
      </div>
    </section>
  );
}
