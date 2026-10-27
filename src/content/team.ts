import approvals from "../../content/approvals.json";
import { EVENT } from "./event";
import { PARTICIPATIONS, participationRoleLabels } from "./participations";
import type { TeamMember } from "./model";
import { getPerson, LEGACY_TEAM, TEAM_ASSIGNMENTS } from "./people";
export function getTeam(): TeamMember[] {
  const legacy = LEGACY_TEAM.map((member) => {
    const person = getPerson(member.personId);
    return {
      id: member.id,
      personId: person.id,
      name: person.name,
      role: member.role,
      team: member.team as TeamMember["team"],
      bio: "bio" in member ? String(member.bio) : (person.bio ?? ""),
      avatar: person.avatar ?? "",
      socials: person.socials ?? {},
      order: member.order,
    };
  });
  const approvedIds = new Set(
    (approvals.people as { personId: string; scope?: "ambassador" }[])
      .filter((entry) => entry.scope !== "ambassador")
      .map((entry) => entry.personId),
  );
  const dated = PARTICIPATIONS.filter(
    (entry) =>
      entry.eventId === EVENT.id &&
      approvedIds.has(entry.personId) &&
      entry.roles.some((role) => role.kind !== "speaker"),
  ).map((entry) => {
    const person = getPerson(entry.personId);
    const roles = entry.roles.filter((role) => role.kind !== "speaker");
    const group =
      roles[0].kind === "core-team"
        ? "Core Organizer"
        : roles[0].kind === "volunteer"
          ? "Volunteers"
          : "Ambassadors";
    return {
      id: entry.id,
      personId: person.id,
      name: person.name,
      role: roles.flatMap(participationRoleLabels).join(" · "),
      team: group as TeamMember["team"],
      bio: person.bio ?? "",
      avatar: person.avatar ?? "",
      socials: person.socials ?? {},
      order: Math.min(...roles.map((role) => role.order)),
    };
  });
  const assignments = new Map(
    TEAM_ASSIGNMENTS.filter((item) => item.eventId === EVENT.id).map((item) => [
      item.personId,
      item,
    ]),
  );
  const existingIds = new Set([...legacy, ...dated].map((member) => member.personId));
  const added = TEAM_ASSIGNMENTS.filter(
    (item) =>
      item.eventId === EVENT.id &&
      !existingIds.has(item.personId) &&
      approvedIds.has(item.personId),
  ).map((item) => {
    const person = getPerson(item.personId);
    return {
      id: `${item.eventId}-${item.personId}`,
      personId: person.id,
      name: person.name,
      role: item.responsibilities.join(" · "),
      team: (item.category === "core-team" ? "Core Team" : "Volunteers") as TeamMember["team"],
      bio: person.bio ?? "",
      avatar: person.avatar ?? "",
      socials: person.socials ?? {},
      order: 10000,
    };
  });
  return [...legacy, ...dated, ...added]
    .map((member) => {
      const assignment = assignments.get(member.personId);
      return assignment
        ? {
            ...member,
            team:
              assignment.category === "core-team"
                ? ("Core Team" as const)
                : ("Volunteers" as const),
            role: assignment.responsibilities.join(" · "),
          }
        : {
            ...member,
            team: member.team === "Core Organizer" ? ("Core Team" as const) : member.team,
          };
    })
    .sort((a, b) => {
      const rank = (personId: string) => {
        const roles = assignments.get(personId)?.responsibilities ?? [];
        if (roles.some((role) => /\bLead$/.test(role) && !/\bCo-Lead$/.test(role))) return 0;
        if (roles.some((role) => /\bCo-Lead$/.test(role))) return 1;
        return 2;
      };
      return rank(a.personId) - rank(b.personId) || a.order - b.order;
    });
}
export const TEAM = getTeam();
