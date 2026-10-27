import { organizationView } from './organization-view.mjs';
import { originalEventId, currentEvent, pastEvents } from './event-view.mjs';
import { talks, workshops } from './programme-view.mjs';
import { personProfile, participationRecords, legacyTeamRecords } from './people-view.mjs';
import { createHash } from 'node:crypto';

// These IDs changed without changing the approved workshop records.
const originalWorkshopIds = new Map(Object.entries({
  'campus-acropolis-2026': 'ws-1', 'campus-iet-davv-2026': 'ws-2',
  'campus-prestige-piemr-2026': 'ws-3', 'campus-sage-indore-2026': 'ws-4',
  'campus-sri-aurobindo-2026': 'ws-5', 'campus-ips-academy-2026': 'ws-6',
  'campus-sgsits-2026': 'ws-7', 'campus-chameli-devi-2026': 'ws-8',
  'campus-iips-davv-2026': 'ws-9', 'campus-medi-caps-2026': 'ws-10',
  'campus-iist-2026': 'ws-11', 'campus-symbiosis-2026': 'ws-13',
  'campus-lnct-indore-2026': 'ws-14',
}));

export function profilePayload(content, kind, id) {
  if (kind === 'organizations') {
    const organization = organizationView(content.organizations.organizations.find(item => item.id === id), { fingerprint: true });
    return { ...organization, partnerships: organization.partnerships.map(item => ({ ...item, editionId: originalEventId(item.editionId) })) };
  }
  const people = content.people.people;
  const participations = participationRecords(people);
  return {
    person: personProfile(people.find(item => item.id === id)),
    team: legacyTeamRecords(people).filter(item => item.personId === id),
    participations: participations.filter(item => item.personId === id).map(item => ({ ...item, eventId: originalEventId(item.eventId) })),
    talks: talks(content).filter(item => item.speakerIds.includes(id)).map(item => ({ ...item, editionId: originalEventId(item.editionId) })),
    workshops: workshops(content).filter(item => item.speakerIds.includes(id)).map(item => ({ ...item, id: originalWorkshopIds.get(item.id) ?? item.id })),
    events: [
      ...pastEvents(content).filter(item => item.officialSpeakerIds.includes(id) || participations.some(entry => entry.personId === id && entry.eventId === item.id)).map(({ id, title, date, kind, source }) => ({ id: originalEventId(id), title, date, kind, source })),
      ...(participations.some(entry => entry.personId === id && entry.eventId === currentEvent(content).id) ? [{ id: originalEventId(currentEvent(content).id), title: currentEvent(content).name, date: currentEvent(content).date.slice(0,10), kind: "DevFest", source: currentEvent(content).links.chapter }] : []),
    ],
  };
}
export function profileHash(content, kind, id) {
  return createHash('sha256').update(JSON.stringify(profilePayload(content, kind, id))).digest('hex');
}
