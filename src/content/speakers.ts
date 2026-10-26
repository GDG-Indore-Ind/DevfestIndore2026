import sessionsFile from "../../content/sessions.json";
import eventsFile from "../../content/events.json";
import type { PastSpeaker, SessionRecord } from "./model";
import { getPerson } from "./people";
import { EVENT } from "./event";
import { PARTICIPATIONS } from "./participations";

export const SESSION_RECORDS = sessionsFile.sessions as SessionRecord[];
export function getSessionSpeaker(session: SessionRecord, personId: string) {
  const current = getPerson(personId);
  const snapshot = session.speakerProfiles?.find((item) => item.personId === personId);
  const firstSpeaker = session.speakerIds[0] === personId;
  return {
    ...current,
    ...(snapshot?.profile ?? (firstSpeaker ? session.profile : undefined)),
    role: snapshot?.role ?? (firstSpeaker ? session.role : current.role) ?? "",
    company: snapshot?.company ?? (firstSpeaker ? session.company : current.company) ?? "",
  };
}
export function getArchivedSpeakers(): PastSpeaker[] {
  const editions = new Set(
    eventsFile.events.filter((event) => event.kind === "DevFest").map((event) => event.id),
  );
  return SESSION_RECORDS.filter(
    (session) => editions.has(session.editionId) && session.editionId !== EVENT.id,
  ).flatMap((session) =>
    session.speakerIds.map((personId) => {
      const person = getSessionSpeaker(session, personId);
      return {
        id: session.id,
        personId,
        name: person.name,
        role: person.role,
        company: person.company,
        year: session.editionId,
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
    }),
  );
}
export const CURRENT_SPEAKERS = PARTICIPATIONS.filter(
  (item) => item.eventId === EVENT.id && item.roles.some((role) => role.kind === "speaker"),
).map((item) => ({ ...getPerson(item.personId), participationId: item.id }));
export const CURRENT_SESSIONS = SESSION_RECORDS.filter((session) => session.editionId === EVENT.id);
export const ARCHIVED_SPEAKERS = getArchivedSpeakers();
