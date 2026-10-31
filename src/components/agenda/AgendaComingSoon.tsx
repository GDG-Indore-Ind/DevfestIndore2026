import { AGENDA_PAGE } from "@/content/pages";
import ContentIcon from "@/components/shared/ContentIcon";
import styles from "./AgendaComingSoon.module.css";

const copy = AGENDA_PAGE.comingSoon;

export default function AgendaComingSoon() {
  return (
    <section
      id="coming-soon"
      className={`audience-section ${styles.root}`}
      aria-labelledby="coming-soon-title"
    >
      <div className="audience-wrap">
        <p className={styles.badge}>{copy.badge}</p>
        <h2 id="coming-soon-title">
          <ContentIcon name="calendar" tone="yellow" heading />
          {copy.title}
        </h2>
        <p className={styles.lead}>{copy.lead}</p>
        <h3 className={styles.itemsTitle}>{copy.itemsTitle}</h3>
        <ul className={styles.list}>
          {copy.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <p className={styles.kind}>{item.kind}</p>
              <h4>{item.title}</h4>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.pending}>{copy.pendingLabel}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
