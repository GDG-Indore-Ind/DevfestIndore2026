import peopleFile from "../../content/people.json";
import type { Participation, Person, Socials } from "./model";

type PersonRecord = {
  id: string;
  name: string;
  kind: "person" | "group";
  photo?: string;
  bio?: string;
  links?: Socials;
  profession?: { title?: string; organization?: string };
  events?: (Omit<Participation, "personId"> & { displayOrder: number })[];
  undatedTeam?: { id: string; role: string; team: string; order: number; bio?: string }[];
  teamAssignments?: {
    eventId: string;
    category: string;
    responsibilities: string[];
    displayOrder: number;
  }[];
  ambassador?: {
    track: "professional" | "student";
    community: string;
    contactPlatforms: string[];
    order: number;
  };
};
export const PERSON_RECORDS = peopleFile.people as PersonRecord[];
export const PEOPLE: Person[] = PERSON_RECORDS.map((person) => ({
  id: person.id,
  name: person.name,
  kind: person.kind,
  avatar: person.photo,
  bio: person.bio,
  role: person.profession?.title,
  company: person.profession?.organization,
  socials: person.links,
}));
const people = new Map(PEOPLE.map((person) => [person.id, person]));
export function getPerson(id: string): Person {
  const person = people.get(id);
  if (!person) throw new Error(`Unknown person ${id}. Run npm run content:validate.`);
  return person;
}
export const LEGACY_TEAM = PERSON_RECORDS.flatMap((person) =>
  (person.undatedTeam ?? []).map((entry) => ({ ...entry, personId: person.id })),
).sort((a, b) => a.order - b.order);
export const TEAM_ASSIGNMENTS = PERSON_RECORDS.flatMap((person) =>
  (person.teamAssignments ?? []).map((entry) => ({ ...entry, personId: person.id })),
).sort((a, b) => a.displayOrder - b.displayOrder);
