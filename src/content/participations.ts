import { PERSON_RECORDS } from "./people";
import type { Participation, ParticipationRole, TeamRoleKind } from "./model";

/** One record per person per event. The id is derived, never authored. */
export const PARTICIPATIONS: Participation[] = PERSON_RECORDS.flatMap((person) =>
  (person.events ?? []).map((entry) => ({
    ...entry,
    id: `${entry.eventId}/${person.id}`,
    personId: person.id,
  })),
);

const levelLabels = {
  lead: "Lead",
  "co-lead": "Co-Lead",
  coordinator: "Coordinator",
  "team-member": "Team Member",
  volunteer: "Volunteer",
} as const;

const defaultTitles: Record<TeamRoleKind, string> = {
  speaker: "Speaker",
  "core-team": "Organizer",
  volunteer: "Volunteer",
  ambassador: "Ambassador",
};

export const roleTitle = (role: ParticipationRole) => role.title ?? defaultTitles[role.kind];

export function participationRoleLabels(role: ParticipationRole): string[] {
  return (
    role.responsibilities?.map(({ area, level }) =>
      level ? `${area} ${levelLabels[level]}` : area,
    ) ?? [roleTitle(role)]
  );
}

/** Lowest `order` first; roles without one keep file order after the ordered ones. */
export const byRoleOrder = (a: { order?: number }, b: { order?: number }) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
