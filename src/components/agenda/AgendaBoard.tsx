import type { AgendaGroup } from "@/content/agenda";
import AgendaSession from "./AgendaSession";
import styles from "./AgendaBoard.module.css";

/** Agenda rows grouped by track, the keynote first. */
export default function AgendaBoard({ groups }: { groups: AgendaGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <section key={group.id} className={styles.group} aria-labelledby={`group-${group.id}`}>
          <header className={styles.groupHeading}>
            <h2 id={`group-${group.id}`}>{group.title}</h2>
            {group.lead && <p>{group.lead}</p>}
          </header>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <AgendaSession key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
