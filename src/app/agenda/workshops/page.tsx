import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import { AGENDA_ITEMS } from "@/content/agenda";
import { EVENT_WORKSHOPS_PAGE as page } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import AgendaSession from "@/components/agenda/AgendaSession";
import styles from "./page.module.css";

export const metadata = pageMetadata("/agenda/workshops", page.title, page.description);

export default function WorkshopsPage() {
  const workshops = AGENDA_ITEMS.filter((item) => item.format === "workshop");
  return (
    <AgendaShell current="workshops" title={page.title} lead={page.lead}>
      {workshops.length ? (
        <ul className={styles.list}>
          {workshops.map((item) => (
            <AgendaSession key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p>{page.emptyText}</p>
      )}
      <p className={styles.past}>
        {page.pastLead} <Link href="/archive#workshops">{page.pastLabel}</Link>
      </p>
    </AgendaShell>
  );
}
