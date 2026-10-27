// Views of the single editable person records for validation and review.
const withoutDisplayOrder = entry => { const result = { ...entry }; delete result.displayOrder; return result; };
export function personProfile(person) {
  const result = { id: person.id, name: person.name, kind: person.kind };
  if (person.photo !== undefined) result.avatar = person.photo;
  if (person.bio !== undefined) result.bio = person.bio;
  if (person.links !== undefined) result.socials = person.links;
  if (person.profession?.title !== undefined) result.role = person.profession.title;
  if (person.profession?.organization !== undefined) result.company = person.profession.organization;
  return result;
}
export function participationRecords(people) {
  return people.flatMap(person => (person.events ?? []).map(({ id, eventId, roles, sourceUrl, displayOrder }) => ({
    id, personId: person.id, eventId, roles, ...(sourceUrl === undefined ? {} : { sourceUrl }), displayOrder,
  }))).sort((a,b) => a.displayOrder-b.displayOrder).map(withoutDisplayOrder);
}
export function legacyTeamRecords(people) {
  return people.flatMap(person => (person.undatedTeam ?? []).map(({ id, ...entry }) => ({ id, personId: person.id, ...entry }))).sort((a,b) => a.order-b.order);
}
export function teamAssignmentRecords(people) {
  return people.flatMap(person => (person.teamAssignments ?? []).map(entry => ({ personId: person.id, ...entry }))).sort((a,b) => a.displayOrder-b.displayOrder).map(withoutDisplayOrder);
}
export function ambassadorRecords(people) {
  return people.flatMap(person => person.ambassador ? [{ personId: person.id, ...person.ambassador }] : []).sort((a,b) => a.order-b.order);
}
