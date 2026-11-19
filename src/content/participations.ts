import { PAST_EVENTS } from "./event";
import { PERSON_RECORDS } from "./people";
import type {
  Participation,
  ParticipationRole,
  Responsibility,
  RosterDetail,
  TeamRoleKind,
} from "./model";

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
  "team-member": "Executive",
  volunteer: "Community Helper",
} as const;

const defaultTitles: Record<TeamRoleKind, string> = {
  speaker: "Speaker",
  "core-team": "Organizer",
  volunteer: "Community Helper",
  ambassador: "Ambassador",
};

export const roleTitle = (role: ParticipationRole) => role.title ?? defaultTitles[role.kind];

/** Highest first: the badge on a card is the most senior level the person holds. */
const levelRank = ["lead", "co-lead", "coordinator", "team-member", "volunteer"] as const;

export function topLevelLabel(role: ParticipationRole): string | undefined {
  const levels = role.responsibilities?.flatMap(({ level }) => (level ? [level] : [])) ?? [];
  const top = levelRank.find((level) => levels.includes(level));
  return top && levelLabels[top];
}

/** Function names without their level, e.g. "Design & Creative · Technology & Production". */
export const responsibilityAreas = (role: ParticipationRole) =>
  role.responsibilities?.map(({ area }) => area).join(" · ") ?? roleTitle(role);

const responsibilityLine = ({ area, level }: Responsibility) =>
  level && levelLabels[level] !== area ? `${area}, ${levelLabels[level]}` : area;

const roleSummary = (role: ParticipationRole) =>
  role.kind === "ambassador" && role.community
    ? `${roleTitle(role)}, ${role.community}`
    : role.responsibilities
      ? role.responsibilities.map(responsibilityLine).join(" · ")
      : roleTitle(role);

/**
 * Detail groups for an expanded card: the person's functions (with levels), their other roles at
 * this event, and what they did at earlier events. `shown` is the role the card is already about.
 */
export function getRosterDetails(
  personId: string,
  eventId: string,
  shown: ParticipationRole,
): RosterDetail[] {
  const entries = PARTICIPATIONS.filter((entry) => entry.personId === personId);
  const details: RosterDetail[] = [];
  const functions = shown.responsibilities?.map(responsibilityLine);
  if (functions?.length) details.push({ label: "Functions", items: functions });
  const alsoNow = entries
    .filter((entry) => entry.eventId === eventId)
    .flatMap((entry) => entry.roles.filter((role) => role.kind !== shown.kind).map(roleSummary));
  if (alsoNow.length) details.push({ label: "Also this year", items: alsoNow });
  const earlier = entries
    .filter((entry) => entry.eventId !== eventId)
    .flatMap((entry) => {
      const title = PAST_EVENTS.find((event) => event.id === entry.eventId)?.title;
      return title ? entry.roles.map((role) => `${roleTitle(role)}, ${title}`) : [];
    });
  if (earlier.length) details.push({ label: "Earlier", items: earlier });
  return details;
}

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
