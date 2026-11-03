import { ARCHIVED_EVENTS } from "./archive";
import { GALLERY_PHOTOS, PRESS_CLIPPINGS } from "./gallery";
import { getEventPartners } from "./partners";
import { byRoleOrder, PARTICIPATIONS } from "./participations";
import { getPerson } from "./people";
import { getSessionSpeaker, SESSION_RECORDS } from "./speakers";

export function getEditionSpeakers(eventId: string) {
  return PARTICIPATIONS.flatMap((entry) => {
    const role = entry.roles.find((item) => item.kind === "speaker");
    if (entry.eventId !== eventId || !role) return [];
    const sessions = SESSION_RECORDS.filter(
      (session) => session.editionId === eventId && session.speakerIds.includes(entry.personId),
    );
    const person = sessions.length
      ? getSessionSpeaker(sessions[0], entry.personId)
      : getPerson(entry.personId);
    return [{ person, label: role.title, order: role.order, sessions }];
  }).sort(byRoleOrder);
}

/** Everything the archive holds about one past event, from the records tagged with its id. */
export function getEdition(id: string) {
  const event = ARCHIVED_EVENTS.find((item) => item.id === id);
  if (!event) return undefined;
  return {
    event,
    speakers: getEditionSpeakers(id),
    photos: GALLERY_PHOTOS.filter((photo) => photo.eventId === id),
    press: PRESS_CLIPPINGS.filter((clipping) => clipping.eventId === id),
    partners: getEventPartners(id),
    others: ARCHIVED_EVENTS.filter((item) => item.id !== id),
  };
}
