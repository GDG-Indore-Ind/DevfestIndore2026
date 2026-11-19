import CommunityPage from "@/components/layout/CommunityPage";
import PressClippings from "@/components/archive/PressClippings";
import { PRESS_CLIPPINGS } from "@/content/gallery";
import { EVENT } from "@/content/event";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/archive/Archive.module.css";

const title = "Press coverage";
const lead = "DevFest Indore and GDG Indore community events in the news.";
export const metadata = pageMetadata("/press", title, lead);

export default function PressPage() {
  const editions = new Map(PRESS_CLIPPINGS.map((item) => [item.eventId, item.event]));
  const sorted = [...editions].sort(
    ([a], [b]) =>
      Number(b === EVENT.id) - Number(a === EVENT.id) || Number(b.slice(-4)) - Number(a.slice(-4)),
  );
  return (
    <CommunityPage title={title} lead={lead} compact>
      {sorted.map(([id, name]) => (
        <section key={id} className={styles.section}>
          <h2>{name}</h2>
          <PressClippings eventId={id} showLead={false} headlines />
        </section>
      ))}
    </CommunityPage>
  );
}
