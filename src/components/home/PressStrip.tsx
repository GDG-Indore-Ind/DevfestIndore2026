import ContentAction from "@/components/shared/ContentAction";
import PressClippings from "@/components/archive/PressClippings";
import SectionHeader from "@/components/shared/SectionHeader";
import { EVENT } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import styles from "./PressStrip.module.css";

export default function PressStrip() {
  return (
    <div className={styles.root}>
      <SectionHeader
        level={3}
        title={`${EVENT.name} in the news`}
        action={
          <ContentAction href="/press" icon="history" tone="blue">
            {HOME_PAGE.pressLabel}
          </ContentAction>
        }
      />
      <PressClippings eventId={EVENT.id} limit={3} showLead={false} headlines />
    </div>
  );
}
