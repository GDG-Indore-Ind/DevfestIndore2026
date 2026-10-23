import speakersFile from "../../content/speakers.json";
import sessionsFile from "../../content/sessions.json";
import type { PastSpeaker } from "./model";
import type { SpeakerRecord, SessionRecord } from "./model";
import { getPerson } from "./people";
import { EVENT } from "./event";
export const SPEAKER_RECORDS = speakersFile.speakers as SpeakerRecord[];
export const SESSION_RECORDS = sessionsFile.sessions as SessionRecord[];
export function getArchivedSpeakers(): PastSpeaker[] {
  return SESSION_RECORDS.filter((session) => session.publication === "archived").map((session) => {
    const person = { ...getPerson(session.speakerId), ...session.profile };
    return {
      id: session.id,
      personId: session.speakerId,
      name: person.name,
      role: session.role,
      company: session.company,
      year: session.editionId as PastSpeaker["year"],
      topic: session.title,
      description: session.description,
      bio: person.bio,
      avatar: person.avatar ?? "",
      spotlightBadge: session.spotlightBadge,
      category: session.category,
      track: session.track,
      level: session.level,
      socials: person.socials,
    };
  });
}
export const CURRENT_SPEAKERS = SPEAKER_RECORDS.filter(
  (speaker) => speaker.editionId === EVENT.id && speaker.publication === "confirmed",
).map((speaker) => ({ ...getPerson(speaker.personId), participationId: speaker.id }));
export const CURRENT_SESSIONS = SESSION_RECORDS.filter(
  (session) => session.editionId === EVENT.id && session.publication === "confirmed",
);
export const ARCHIVED_SPEAKERS = getArchivedSpeakers();
