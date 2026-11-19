import { AGENDA_ITEMS, AGENDA_SECTIONS } from "@/content/agenda";
import { PAGE_COPY } from "@/content/copy";
import ActivityCards from "./ActivityCards";
import AgendaSession from "./AgendaSession";
import styles from "./AgendaBoard.module.css";

export default function AgendaBoard() {
  const itemsBySection = {
    sessions: AGENDA_ITEMS.filter(
      (item) => item.format !== "workshop" && item.format !== "exhibit",
    ),
    workshops: AGENDA_ITEMS.filter((item) => item.format === "workshop"),
    activities: AGENDA_ITEMS.filter((item) => item.format === "exhibit"),
  };
  return (
    <div className={styles.board}>
      {AGENDA_SECTIONS.map(({ id, title }) => (
        <section key={id} id={id} className={styles.group} aria-labelledby={`agenda-${id}`}>
          <header className={styles.groupHeading}>
            <h2 id={`agenda-${id}`}>{title}</h2>
          </header>
          {id === "activities" && <ActivityCards />}
          {id === "activities" && itemsBySection.activities.length > 0 && (
            <h3 className={styles.subheading}>{PAGE_COPY.agenda.exhibitsHeading}</h3>
          )}
          <ul className={styles.list}>
            {itemsBySection[id].map((item) => (
              <AgendaSession key={item.id} item={item} overview showHall={id !== "sessions"} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
