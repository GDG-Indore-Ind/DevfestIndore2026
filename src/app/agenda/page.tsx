import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { AGENDA_PAGE as page } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import AgendaBoard from "@/components/agenda/AgendaBoard";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  return (
    <AgendaShell
      current="schedule"
      title={page.title}
      lead={page.lead}
      meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name} · ${page.meta}`}
    >
      <AgendaBoard />
    </AgendaShell>
  );
}
