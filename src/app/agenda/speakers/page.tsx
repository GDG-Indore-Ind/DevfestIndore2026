import { pageMetadata } from "@/lib/pageMetadata";
import { AGENDA_SPEAKERS } from "@/content/agenda";
import { EVENT_SPEAKERS_PAGE as page } from "@/content/pages";
import AgendaShell from "@/components/agenda/AgendaShell";
import PersonCard, { PersonGrid } from "@/components/shared/PersonCard";

export const metadata = pageMetadata("/agenda/speakers", page.title, page.description);

export default function SpeakersPage() {
  return (
    <AgendaShell current="speakers" title={page.title} lead={page.lead}>
      {AGENDA_SPEAKERS.length ? (
        <PersonGrid>
          {AGENDA_SPEAKERS.map((speaker) => (
            <PersonCard
              key={speaker.id}
              name={speaker.name}
              photo={speaker.avatar}
              meta={[speaker.role, speaker.company].filter(Boolean).join(", ")}
              socials={speaker.socials}
              href={`/agenda#${speaker.itemId}`}
              headingLevel="h2"
            />
          ))}
        </PersonGrid>
      ) : (
        <p>{page.emptyText}</p>
      )}
    </AgendaShell>
  );
}
