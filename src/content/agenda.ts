import { EVENT } from "./event";
import type { Socials } from "./model";
import { getOrganization } from "./partners";
import { AGENDA_PAGE } from "./pages";
import { byRoleOrder, PARTICIPATIONS, roleTitle } from "./participations";
import { getEventPerson, personalSocials } from "./people";
import { CURRENT_ACTIVITIES, CURRENT_SESSIONS, getSessionSpeaker } from "./speakers";

export type AgendaFormat = "keynote" | "panel" | "address" | "session" | "workshop" | "exhibit";

export interface AgendaPerson {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  company?: string;
  bio?: string;
  socials: Socials;
}
export interface AgendaItem {
  id: string;
  format: AgendaFormat;
  /** Null until the speaker's session title is confirmed. */
  title: string | null;
  description: string;
  track?: string;
  time?: string;
  hall?: string;
  /** Running order within the hall. */
  slot?: number;
  durationMinutes?: number;
  people: AgendaPerson[];
  organizations: string[];
  /** Logo of the first presenting organization, for rows without a speaker photo. */
  logo?: string;
  order: number;
}
export interface AgendaStage {
  id: string;
  title: string;
  lead?: string;
  numbered: boolean;
  items: AgendaItem[];
}

const KEYNOTE_LABEL = "Keynote speaker";
const LAST = Number.MAX_SAFE_INTEGER;

const speakerRoles = new Map(
  PARTICIPATIONS.flatMap((entry) => {
    const role = entry.roles.find((item) => item.kind === "speaker");
    return entry.eventId === EVENT.id && role ? [[entry.personId, role] as const] : [];
  }),
);
const toPerson = (id: string, sessionId?: string): AgendaPerson => {
  const session = [...CURRENT_SESSIONS, ...CURRENT_ACTIVITIES].find(
    (item) => item.id === sessionId,
  );
  const person = session ? getSessionSpeaker(session, id) : getEventPerson(id, EVENT.id);
  return {
    id,
    name: person.name,
    avatar: person.avatar,
    role: person.role,
    company: person.company,
    bio: person.bio,
    socials: personalSocials(person.socials),
  };
};
const formatOf = (format?: string): AgendaFormat =>
  format === "workshop" ||
  format === "keynote" ||
  format === "panel" ||
  format === "exhibit" ||
  format === "address"
    ? format
    : "session";

const sessionItems: AgendaItem[] = CURRENT_SESSIONS.filter(
  (session) => session.publication === "confirmed",
).map((session) => ({
  id: session.id,
  format: formatOf(session.format),
  title: session.title,
  description: session.description,
  track: session.track,
  time: session.time,
  hall: session.hall,
  slot: session.slot,
  durationMinutes: session.durationMinutes,
  people: session.speakerIds.map((id) => toPerson(id, session.id)),
  organizations: [],
  order: Math.min(...session.speakerIds.map((id) => speakerRoles.get(id)?.order ?? LAST)),
}));
const withSession = new Set([
  ...CURRENT_SESSIONS.flatMap((session) => session.speakerIds),
  ...CURRENT_ACTIVITIES.flatMap((activity) => activity.speakerIds ?? []),
]);
const FIRST_STAGE = AGENDA_PAGE.stages[0].hall;
/** Confirmed speakers whose session title is not announced yet, on the first stage by speaker order. */
const pendingItems: AgendaItem[] = [...speakerRoles.entries()]
  .filter(([id]) => !withSession.has(id))
  .map(([id, role]) => ({
    id: `speaker-${id}`,
    format: roleTitle(role) === KEYNOTE_LABEL ? "keynote" : "session",
    title: null,
    description: "",
    hall: FIRST_STAGE,
    slot: role.order,
    people: [toPerson(id)],
    organizations: [],
    order: role.order ?? LAST,
  }));
const activityItems: AgendaItem[] = CURRENT_ACTIVITIES.map((activity, index) => ({
  id: activity.id,
  format: formatOf(activity.format),
  title: activity.title,
  description: activity.description,
  track: activity.track,
  time: activity.time,
  hall: activity.hall,
  slot: activity.slot,
  durationMinutes: activity.durationMinutes,
  people: (activity.speakerIds ?? []).map((id) => toPerson(id, activity.id)),
  organizations: (activity.organizationIds ?? []).map((id) => getOrganization(id).name),
  logo: activity.organizationIds?.[0] && getOrganization(activity.organizationIds[0]).logoUrl,
  order: LAST - CURRENT_ACTIVITIES.length + index,
}));

/** Time first once the schedule exists, then running order, then speaker announcement order. */
const byRunningOrder = (a: AgendaItem, b: AgendaItem) =>
  (a.time ?? "~").localeCompare(b.time ?? "~") ||
  (a.slot ?? LAST) - (b.slot ?? LAST) ||
  byRoleOrder(a, b);

export const AGENDA_ITEMS: AgendaItem[] = [...sessionItems, ...pendingItems, ...activityItems].sort(
  byRunningOrder,
);

/** One group per event room; anything without a known room goes last. */
export function agendaStages(items: AgendaItem[]): AgendaStage[] {
  const known = new Set<string>(AGENDA_PAGE.stages.map((stage) => stage.hall));
  const stages: AgendaStage[] = [
    ...AGENDA_PAGE.stages.map((stage) => ({
      id: stage.hall.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: stage.title,
      lead: stage.lead,
      numbered: stage.numbered,
      items: items.filter((item) => item.hall === stage.hall),
    })),
    {
      id: "other",
      title: AGENDA_PAGE.otherGroupTitle,
      numbered: false,
      items: items.filter((item) => !item.hall || !known.has(item.hall)),
    },
  ];
  return stages.filter((stage) => stage.items.length);
}

/** Each confirmed speaker once, in speaker order, with the first agenda row to jump to. */
export const AGENDA_SPEAKERS: (AgendaPerson & { itemId: string })[] = [...speakerRoles.entries()]
  .sort(([, a], [, b]) => byRoleOrder(a, b))
  .flatMap(([id]) => {
    const item = AGENDA_ITEMS.find((entry) => entry.people.some((person) => person.id === id));
    const person = item?.people.find((entry) => entry.id === id);
    return item && person ? [{ ...person, itemId: item.id }] : [];
  });
