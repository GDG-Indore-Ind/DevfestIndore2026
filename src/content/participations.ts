import data from "../../content/participations.json";
import type { Participation, ParticipationRole } from "./model";
export const PARTICIPATIONS = data.participations as Participation[];

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
