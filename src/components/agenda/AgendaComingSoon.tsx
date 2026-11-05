import { AGENDA_PAGE } from "@/content/pages";
import styles from "./AgendaComingSoon.module.css";

const copy = AGENDA_PAGE.comingSoon;

export default function AgendaComingSoon() {
  return (
    <section id="coming-soon" className="audience-section" aria-labelledby="coming-soon-title">
      <div className="audience-wrap">
        <p className={styles.badge}>{copy.badge}</p>
        <h2 id="coming-soon-title">{copy.title}</h2>
        <p className={styles.lead}>{copy.lead}</p>
        <h3 className={styles.itemsTitle}>{copy.itemsTitle}</h3>
        <p>{copy.pendingLabel}</p>
        <ul className={styles.list}>
          {copy.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <p className={styles.kind}>{item.kind}</p>
              <h4>{item.title}</h4>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
