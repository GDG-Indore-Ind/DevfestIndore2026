import { EVENT } from "./event";
import { byRoleOrder, PARTICIPATIONS, participationRoleLabels } from "./participations";
import type { TeamMember } from "./model";
import { getPerson, personalSocials } from "./people";

/** The current event's organisers and volunteers, in the order set by each role's `order`. */
export function getTeam(): TeamMember[] {
  return PARTICIPATIONS.flatMap((entry) => {
    const role = entry.roles.find((item) => item.kind === "core-team" || item.kind === "volunteer");
    if (entry.eventId !== EVENT.id || !role) return [];
    const person = getPerson(entry.personId);
    return [
      {
        id: entry.id,
        personId: person.id,
        name: person.name,
        role: participationRoleLabels(role).join(" · "),
        team: role.kind === "core-team" ? ("Core Team" as const) : ("Volunteers" as const),
        bio: person.bio ?? "",
        avatar: person.avatar ?? "",
        socials: personalSocials(person.socials),
        order: role.order,
      },
    ];
  }).sort(byRoleOrder);
}
export const TEAM = getTeam();
