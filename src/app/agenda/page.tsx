import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { AGENDA_ITEMS, agendaStages } from "@/content/agenda";
import { AGENDA_PAGE as page } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import AgendaBoard from "@/components/agenda/AgendaBoard";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  const stages = agendaStages(AGENDA_ITEMS);
  return (
    <AgendaShell
      current="schedule"
      title={page.title}
      lead={page.lead}
      meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name} · ${page.meta}`}
    >
      {stages.length ? <AgendaBoard stages={stages} /> : <p>{page.emptyText}</p>}
    </AgendaShell>
  );
}
