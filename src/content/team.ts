import { EVENT } from "./event";
import {
  byRoleOrder,
  getRosterDetails,
  PARTICIPATIONS,
  responsibilityAreas,
  topLevelLabel,
} from "./participations";
import type { TeamMember } from "./model";
import { getEventPerson, personalSocials } from "./people";

/** The current event's organisers and volunteers, in the order set by each role's `order`. */
export function getTeam(): TeamMember[] {
  return PARTICIPATIONS.flatMap((entry) => {
    const role = entry.roles.find((item) => item.kind === "core-team" || item.kind === "volunteer");
    if (entry.eventId !== EVENT.id || !role) return [];
    const person = getEventPerson(entry.personId, entry.eventId);
    const sciTeam = role.title === "Space Club of India team";
    return [
      {
        id: entry.id,
        personId: person.id,
        name: person.name,
        role: responsibilityAreas(role),
        badge: sciTeam
          ? [person.role, person.company].filter(Boolean).join(" · ")
          : topLevelLabel(role),
        details: getRosterDetails(person.id, entry.eventId, role),
        team: sciTeam
          ? ("Space Club of India" as const)
          : role.kind === "core-team"
            ? ("Core Team" as const)
            : ("Volunteers" as const),
        bio: person.bio ?? "",
        avatar: person.avatar ?? "",
        socials: personalSocials(person.socials),
        order: role.order,
      },
    ];
  }).sort(byRoleOrder);
}
export const TEAM = getTeam();

export const TEAM_PAGE = {
  title: "Team",
  organizersTitle: "Organizers",
  volunteersTitle: "Volunteers",
  lead: "Meet the people bringing DevFest Indore together.",
} as const;
