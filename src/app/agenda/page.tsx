import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { AGENDA_ITEMS, agendaGroups } from "@/content/agenda";
import { AGENDA_PAGE as page } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import AgendaBoard from "@/components/agenda/AgendaBoard";
import AgendaTimetable from "@/components/agenda/AgendaTimetable";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  const groups = agendaGroups(AGENDA_ITEMS);
  return (
    <AgendaShell
      current="schedule"
      title={page.title}
      lead={page.lead}
      meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name} · ${page.meta}`}
    >
      {groups.length ? <AgendaBoard groups={groups} /> : <p>{page.emptyText}</p>}
      <AgendaTimetable />
    </AgendaShell>
  );
}
