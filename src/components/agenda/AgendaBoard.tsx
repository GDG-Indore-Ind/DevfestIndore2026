import { AGENDA_ITEMS, AGENDA_SECTIONS } from "@/content/agenda";
import { PAGE_COPY } from "@/content/copy";
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
          {id === "activities" && (
            <ul className={styles.activities}>
              {PAGE_COPY.agenda.activities.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          )}
          <ul className={styles.list}>
            {itemsBySection[id].map((item, index) => (
              <AgendaSession
                key={item.id}
                item={item}
                overview
                position={id === "sessions" ? index + 1 : undefined}
                showHall={id !== "sessions"}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
