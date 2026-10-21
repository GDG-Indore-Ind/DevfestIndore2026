import teamFile from "../../content/team.json";
import type { TeamMember } from "./model";
import { getPerson } from "./people";
export function getTeam(): TeamMember[] {
  return teamFile.members.map(member => {
    const person = getPerson(member.personId);
    return { id: member.id, name: person.name, role: member.role, team: member.team as TeamMember["team"], bio: "bio" in member ? String(member.bio) : person.bio ?? "", avatar: person.avatar ?? "", socials: person.socials ?? {}, order: member.order };
  }).sort((a, b) => a.order - b.order);
}
export const TEAM = getTeam();
