import peopleFile from "../../content/people.json";
import type { Person } from "./model";
export const PEOPLE = peopleFile.people as Person[];
const people = new Map(PEOPLE.map((person) => [person.id, person]));
export function getPerson(id: string): Person {
  const person = people.get(id);
  if (!person) throw new Error(`Unknown person ${id}. Run npm run content:validate.`);
  return person;
}
