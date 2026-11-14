import peopleFile from "./generated/people.json";
import { EVENT } from "./event";
import type { Person, Socials } from "./model";
import type { Person as PersonRecord } from "./schema/public/people";
export const PERSON_RECORDS = peopleFile.people as PersonRecord[];
export const PEOPLE: Person[] = PERSON_RECORDS.map((person) => ({
  id: person.id,
  name: person.name,
  kind: person.kind,
  avatar: person.photo,
  bio: person.bio,
  role: person.title,
  company: person.organization,
  socials: person.links,
}));
const people = new Map(PEOPLE.map((person) => [person.id, person]));
export function getPerson(id: string): Person {
  const person = people.get(id);
  if (!person) throw new Error(`Unknown person ${id}. Run npm run content:validate.`);
  return person;
}

/** Approved event-specific details take precedence over a person's current profile. */
export function getEventPerson(id: string, eventId: string): Person {
  const profile = PERSON_RECORDS.find((person) => person.id === id)?.events?.find(
    (entry) => entry.eventId === eventId,
  )?.profile;
  return { ...getPerson(id), ...profile };
}

const profileKey = (href: string) => {
  try {
    const url = new URL(href);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}`.toLowerCase();
  } catch {
    return href;
  }
};
const ORGANIZER_PROFILES = new Set([EVENT.links.instagram, EVENT.links.linkedin].map(profileKey));
/** Profile links without the organizer's own accounts, which some team records use as placeholders. */
export function personalSocials(socials: Socials = {}): Socials {
  return Object.fromEntries(
    Object.entries(socials).filter(([, href]) => href && !ORGANIZER_PROFILES.has(profileKey(href))),
  );
}
