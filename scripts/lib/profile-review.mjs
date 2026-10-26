import { createHash } from 'node:crypto';

export function profilePayload(content, kind, id) {
  if (kind === 'organizations') return content.partners.organizations.find(item => item.id === id);
  return {
    person: content.people.people.find(item => item.id === id),
    team: content.team.members.filter(item => item.personId === id),
    participations: content.participations.participations.filter(item => item.personId === id),
    talks: content.sessions.sessions.filter(item => item.speakerIds.includes(id)),
    workshops: content.workshops.workshops.filter(item => item.speakerIds.includes(id)),
    events: [
      ...content.events.events.filter(item => item.officialSpeakerIds.includes(id) || content.participations.participations.some(entry => entry.personId === id && entry.eventId === item.id)).map(({ id, title, date, kind, source }) => ({ id, title, date, kind, source })),
      ...(content.participations.participations.some(entry => entry.personId === id && entry.eventId === content.event.id) ? [{ id: content.event.id, title: content.event.name, date: content.event.startsAt.slice(0,10), kind: "DevFest", source: content.event.links.chapter }] : []),
    ],
  };
}
export function profileHash(content, kind, id) {
  return createHash('sha256').update(JSON.stringify(profilePayload(content, kind, id))).digest('hex');
}
