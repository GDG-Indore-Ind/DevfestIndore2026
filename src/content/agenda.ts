import { EVENT } from "./event";
import type { Socials } from "./model";
import { getOrganization } from "./partners";
import { AGENDA_PAGE } from "./pages";
import { byRoleOrder, PARTICIPATIONS, roleTitle } from "./participations";
import { getPerson, personalSocials } from "./people";
import { CURRENT_ACTIVITIES, CURRENT_SESSIONS, getSessionSpeaker } from "./speakers";

export type AgendaFormat = "keynote" | "workshop" | "session" | "exhibit";

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
  durationMinutes?: number;
  people: AgendaPerson[];
  organizations: string[];
  order: number;
}
export interface AgendaGroup {
  id: string;
  title: string;
  lead?: string;
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
  const session = CURRENT_SESSIONS.find((item) => item.id === sessionId);
  const person = session ? getSessionSpeaker(session, id) : getPerson(id);
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
  format === "workshop" ? "workshop" : format === "keynote" ? "keynote" : "session";

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
  durationMinutes: session.durationMinutes,
  people: session.speakerIds.map((id) => toPerson(id, session.id)),
  organizations: [],
  order: Math.min(...session.speakerIds.map((id) => speakerRoles.get(id)?.order ?? LAST)),
}));
const withSession = new Set([
  ...CURRENT_SESSIONS.flatMap((session) => session.speakerIds),
  ...CURRENT_ACTIVITIES.flatMap((activity) => activity.speakerIds ?? []),
]);
/** Confirmed speakers whose session title is not announced yet. */
const pendingItems: AgendaItem[] = [...speakerRoles.entries()]
  .filter(([id]) => !withSession.has(id))
  .map(([id, role]) => ({
    id: `speaker-${id}`,
    format: roleTitle(role) === KEYNOTE_LABEL ? "keynote" : "session",
    title: null,
    description: "",
    people: [toPerson(id)],
    organizations: [],
    order: role.order ?? LAST,
  }));
const activityItems: AgendaItem[] = CURRENT_ACTIVITIES.map((activity, index) => ({
  id: activity.id,
  format: activity.format,
  title: activity.title,
  description: activity.description,
  track: activity.track,
  time: activity.time,
  hall: activity.hall,
  durationMinutes: activity.durationMinutes,
  people: (activity.speakerIds ?? []).map((id) => toPerson(id)),
  organizations: activity.organizationIds.map((id) => getOrganization(id).name),
  order: LAST - CURRENT_ACTIVITIES.length + index,
}));

/** Time first when the schedule exists, then the speaker order from people.json. */
const byTimeThenOrder = (a: AgendaItem, b: AgendaItem) =>
  (a.time ?? "~").localeCompare(b.time ?? "~") || byRoleOrder(a, b);

export const AGENDA_ITEMS: AgendaItem[] = [...sessionItems, ...pendingItems, ...activityItems].sort(
  byTimeThenOrder,
);

/** The keynote leads. Everything else is grouped by track, in the order set in pages.json. */
export function agendaGroups(items: AgendaItem[]): AgendaGroup[] {
  const keynotes = items.filter((item) => item.format === "keynote");
  const rest = items.filter((item) => item.format !== "keynote");
  const known = new Set<string>(AGENDA_PAGE.groups.map((group) => group.track));
  const groups: AgendaGroup[] = [
    { id: "keynote", title: AGENDA_PAGE.formatLabels.keynote, items: keynotes },
    ...AGENDA_PAGE.groups.map((group) => ({
      id: group.track,
      title: group.title,
      lead: group.lead,
      items: rest.filter((item) => item.track === group.track),
    })),
    {
      id: "other",
      title: AGENDA_PAGE.otherGroupTitle,
      items: rest.filter((item) => !item.track || !known.has(item.track)),
    },
  ];
  return groups.filter((group) => group.items.length);
}

/** Each confirmed speaker once, in speaker order, with the first agenda row to jump to. */
export const AGENDA_SPEAKERS: (AgendaPerson & { itemId: string })[] = [...speakerRoles.entries()]
  .sort(([, a], [, b]) => byRoleOrder(a, b))
  .flatMap(([id]) => {
    const item = AGENDA_ITEMS.find((entry) => entry.people.some((person) => person.id === id));
    const person = item?.people.find((entry) => entry.id === id);
    return item && person ? [{ ...person, itemId: item.id }] : [];
  });
