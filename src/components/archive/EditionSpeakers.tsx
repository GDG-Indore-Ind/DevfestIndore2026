import { getEditionSpeakers } from "@/content/editions";
import SpeakerList from "./SpeakerList";

export default function EditionSpeakers({ eventId }: { eventId: string }) {
  return (
    <SpeakerList
      items={getEditionSpeakers(eventId).map(({ person, sessions }) => ({
        id: person.id,
        name: person.name,
        talks: sessions.map((session) => ({ id: session.id, title: session.title })),
        socials: person.socials,
      }))}
    />
  );
}
