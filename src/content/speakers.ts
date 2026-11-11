import { ACTIVITIES, TALKS } from "./programme";
import type { SessionRecord } from "./model";
import { getPerson } from "./people";
import { EVENT } from "./event";
import { PARTICIPATIONS } from "./participations";

export const SESSION_RECORDS = TALKS;
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
export const CURRENT_SPEAKERS = PARTICIPATIONS.filter(
  (item) => item.eventId === EVENT.id && item.roles.some((role) => role.kind === "speaker"),
).map((item) => ({ ...getPerson(item.personId), participationId: item.id }));
export const CURRENT_SESSIONS = SESSION_RECORDS.filter((session) => session.editionId === EVENT.id);
export const CURRENT_ACTIVITIES = ACTIVITIES.filter(
  (activity) => activity.editionId === EVENT.id && activity.publication === "confirmed",
);
