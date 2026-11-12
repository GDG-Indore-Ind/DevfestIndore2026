import Image from "next/image";
import Link from "next/link";
import { Mic, Users } from "lucide-react";
import { AGENDA_ITEMS, agendaStages } from "@/content/agenda";
import { AGENDA_PAGE, HOME_PAGE } from "@/content/pages";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./AgendaPreview.module.css";

const copy = HOME_PAGE.agendaPreview;
const MAIN_STAGE_ROWS = 8;

/** The first main-stage slots, with counts for workshops and exhibits, linking to /agenda. */
export default function AgendaPreview() {
  const [main] = agendaStages(AGENDA_ITEMS);
  if (!main) return null;
  const rows = main.items.slice(0, MAIN_STAGE_ROWS);
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
        <ol className={styles.list}>
          {rows.map((item, index) => {
            const person = item.people[0];
            const who = person?.name ?? item.organizations[0];
            return (
              <li key={item.id}>
                <Link href={`/agenda#${item.id}`} className={styles.row}>
                  <span className={styles.order}>
                    {item.time ?? String(index + 1).padStart(2, "0")}
                  </span>
                  {person?.avatar || item.logo ? (
                    <Image
                      className={`${styles.avatar} ${person?.avatar ? "" : styles.logo}`}
                      src={(person?.avatar || item.logo)!}
                      alt=""
                      width={96}
                      height={96}
                      sizes="44px"
                    />
                  ) : (
                    <span className={`${styles.avatar} ${styles.icon}`} aria-hidden="true">
                      {item.format === "panel" ? <Users /> : <Mic />}
                    </span>
                  )}
                  <span className={styles.text}>
                    <span className={styles.format}>{AGENDA_PAGE.formatLabels[item.format]}</span>
                    <span className={styles.title}>{item.title ?? AGENDA_PAGE.sessionPending}</span>
                    {who && <span className={styles.who}>{who}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
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
