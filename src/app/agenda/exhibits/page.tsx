import { pageMetadata } from "@/lib/pageMetadata";
import { AGENDA_ITEMS } from "@/content/agenda";
import { EVENT } from "@/content/event";
import { EVENT_EXHIBITS_PAGE as page, HOME_PAGE } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import AgendaSession from "@/components/agenda/AgendaSession";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./page.module.css";

export const metadata = pageMetadata("/agenda/exhibits", page.title, page.description);

export default function ExhibitsPage() {
  const exhibits = AGENDA_ITEMS.filter((item) => item.format === "exhibit");
  const invite = HOME_PAGE.exhibits;
  return (
    <AgendaShell current="exhibits" title={page.title} lead={page.lead}>
      {exhibits.length ? (
        <ul className={styles.list}>
          {exhibits.map((item) => (
            <AgendaSession key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p>{page.emptyText}</p>
      )}
      <section className={styles.invite} aria-labelledby="exhibit-invite-title">
        <h2 id="exhibit-invite-title">{invite.title}</h2>
        <p>{invite.body}</p>
        <ContentAction href={EVENT.links.exhibitApplication} icon="exhibits" tone="green" external>
          {invite.buttonLabel}
        </ContentAction>
      </section>
    </AgendaShell>
  );
}
