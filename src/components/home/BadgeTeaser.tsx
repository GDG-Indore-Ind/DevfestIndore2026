import { Orbit } from "lucide-react";
import ContentAction from "@/components/shared/ContentAction";
import { PAGE_COPY } from "@/content/copy";
import styles from "./BadgeTeaser.module.css";

export default function BadgeTeaser() {
  const copy = PAGE_COPY.badge;
  return (
    <section className="audience-section" aria-labelledby="badge-teaser-title">
      <div className={`audience-wrap ${styles.row}`}>
        <Orbit className={styles.orbit} aria-hidden="true" strokeWidth={1} />
        <div className={styles.copy}>
          <h2 id="badge-teaser-title">{copy.teaserTitle}</h2>
          <p>{copy.teaserLead}</p>
        </div>
        <ContentAction href="/badge" icon="themes" tone="green">
          {copy.teaserAction}
        </ContentAction>
      </div>
    </section>
  );
}
