// Old approval receipts are tied to the former bare-year event IDs.
const originalIds = new Map([2022, 2023, 2024, 2025, 2026].map(year => [`devfest-${year}`, String(year)]));
export const originalEventId = id => originalIds.get(id) ?? id;
export function currentEvent(content) {
  return content.event.events.find(event => event.status === 'current');
}
export function pastEvents(content) {
  return content.event.events.filter(event => event.status === 'past').map(event => ({
    id: event.id, title: event.name, date: event.date, venue: event.venue.name,
    kind: {devfest:'DevFest',community:'Community event',online:'Online session'}[event.type],
    summary: event.summary, source: event.source, publication: 'archived', officialSpeakerIds: event.officialSpeakerIds,
  }));
}
