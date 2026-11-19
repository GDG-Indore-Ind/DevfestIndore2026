import { Camera, Lightbulb, Users, Utensils } from "lucide-react";
import { PAGE_COPY } from "@/content/copy";
import styles from "./ActivityCards.module.css";

const icons = { lunch: Utensils, community: Users, expert: Lightbulb, photo: Camera };

/** The day's other things to do, one card each, so none is lost in a list. */
export default function ActivityCards() {
  return (
    <ul className={styles.grid}>
      {PAGE_COPY.agenda.activities.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];
        return (
          <li key={item.id} className={styles.card} data-tone={item.tone}>
            <svg className={styles.orbit} viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <ellipse cx="90" cy="30" rx="70" ry="24" transform="rotate(-25 90 30)" />
              <circle cx="40" cy="58" r="4" className={styles.node} />
            </svg>
            <span className={styles.tile}>
              <Icon aria-hidden="true" strokeWidth={1.75} />
            </span>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
