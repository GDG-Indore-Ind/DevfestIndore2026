import ContentAction from "@/components/shared/ContentAction";
import PressClippings from "@/components/archive/PressClippings";
import { EVENT } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import styles from "./PressStrip.module.css";

export default function PressStrip() {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h3 id="home-press-title">{EVENT.name} in the news</h3>
        <div className={styles.actions}>
          <ContentAction href="/press" icon="history" tone="blue">
            {HOME_PAGE.pressLabel}
          </ContentAction>
        </div>
      </div>
      <PressClippings eventId={EVENT.id} limit={3} showLead={false} headlines />
    </div>
  );
}
