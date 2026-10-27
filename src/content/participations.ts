import { PERSON_RECORDS } from "./people";
import type { Participation, ParticipationRole } from "./model";
export const PARTICIPATIONS: Participation[] = PERSON_RECORDS.flatMap((person) =>
  (person.events ?? []).map((entry) => ({ ...entry, personId: person.id })),
).sort((a, b) => a.displayOrder - b.displayOrder);

const levelLabels = {
  lead: "Lead",
  "co-lead": "Co-Lead",
  coordinator: "Coordinator",
  "team-member": "Team Member",
  volunteer: "Volunteer",
} as const;

export function participationRoleLabels(role: ParticipationRole): string[] {
  return (
    role.responsibilities?.map(({ area, level }) => `${area} ${levelLabels[level]}`) ?? [role.title]
  );
}
