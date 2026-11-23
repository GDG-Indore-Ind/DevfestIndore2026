import { ACTIVITIES, TALKS } from "./programme";
import type { SessionRecord } from "./model";
import { getEventPerson } from "./people";
import { EVENT } from "./event";
import { PARTICIPATIONS } from "./participations";

export const SESSION_RECORDS = TALKS;
type SpeakerContext = Pick<SessionRecord, "editionId"> &
  Partial<Pick<SessionRecord, "speakerIds" | "speakerProfiles" | "profile" | "role" | "company">>;
export function getSessionSpeaker(session: SpeakerContext, personId: string) {
  const current = getEventPerson(personId, session.editionId);
  const snapshot = session.speakerProfiles?.find((item) => item.personId === personId);
  const firstSpeaker = session.speakerIds?.[0] === personId;
  return {
    ...current,
    ...(snapshot?.profile ?? (firstSpeaker ? session.profile : undefined)),
    role: snapshot?.role ?? (firstSpeaker ? session.role : undefined) ?? current.role,
    company: snapshot?.company ?? (firstSpeaker ? session.company : undefined) ?? current.company,
  };
}
export const CURRENT_SPEAKERS = PARTICIPATIONS.filter(
  (item) => item.eventId === EVENT.id && item.roles.some((role) => role.kind === "speaker"),
).map((item) => ({ ...getEventPerson(item.personId, EVENT.id), participationId: item.id }));
export const CURRENT_SESSIONS = SESSION_RECORDS.filter((session) => session.editionId === EVENT.id);
export const CURRENT_ACTIVITIES = ACTIVITIES.filter(
  (activity) => activity.editionId === EVENT.id && activity.publication === "confirmed",
);

export function getOrganizationActivities(organizationId: string) {
  return CURRENT_ACTIVITIES.filter((activity) =>
    activity.organizationIds?.includes(organizationId),
  );
}
