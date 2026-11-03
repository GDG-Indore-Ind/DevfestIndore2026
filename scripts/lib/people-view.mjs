// Views of the single editable person records for validation and review.
export function personProfile(person) {
  const result = { id: person.id, name: person.name, kind: person.kind };
  if (person.photo !== undefined) result.avatar = person.photo;
  if (person.bio !== undefined) result.bio = person.bio;
  if (person.links !== undefined) result.socials = person.links;
  if (person.title !== undefined) result.role = person.title;
  if (person.organization !== undefined) result.company = person.organization;
  return result;
}
/** One record per person per event; the id is derived, never authored. */
export function participationRecords(people) {
  return people.flatMap(person => (person.events ?? []).map(({ eventId, roles, sourceUrl }) => ({
    id: `${eventId}/${person.id}`, personId: person.id, eventId, roles, ...(sourceUrl === undefined ? {} : { sourceUrl }),
  })));
}
export function ambassadorRecords(people) {
  return participationRecords(people).flatMap(({ personId, eventId, roles }) => roles.filter(role => role.kind === "ambassador").map(role => ({ personId, eventId, ...role })));
}
