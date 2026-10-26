import directory from "../../content/directory.json";
import approvals from "../../content/approvals.json";
import eventsFile from "../../content/events.json";
import teamFile from "../../content/team.json";
import workshopFile from "../../content/workshops.json";
import { EVENT } from "./event";
import { PEOPLE, getPerson } from "./people";
import { PARTICIPATIONS } from "./participations";
import { SESSION_RECORDS } from "./speakers";
import { ORGANIZATIONS } from "./partners";

export const DIRECTORY_COPY = directory;
export const DIRECTORY_ENABLED = directory.enabled;
export const APPROVED_PERSON_IDS: readonly string[] = (
  approvals.people as { personId: string; scope?: "ambassador" }[]
)
  .filter((entry) => entry.scope !== "ambassador")
  .map((entry) => entry.personId);
export const APPROVED_ORGANIZATION_IDS: readonly string[] = approvals.organizations.map(
  (entry: { organizationId: string }) => entry.organizationId,
);
export const DIRECTORY_EVENTS = [
  {
    id: EVENT.id,
    title: EVENT.name,
    year: EVENT.id,
    date: EVENT.startsAt.slice(0, 10),
    venue: EVENT.venue.name,
    kind: "DevFest",
    source: EVENT.links.chapter,
  },
  ...eventsFile.events.map((event) => ({ ...event, year: event.date.slice(0, 4) })),
];
export const getDirectoryEvent = (id: string) => DIRECTORY_EVENTS.find((event) => event.id === id)!;
export const DEVFEST_EVENT_IDS = DIRECTORY_EVENTS.filter((event) => event.kind === "DevFest").map(
  (event) => event.id,
);
export function getPersonHistory(id: string) {
  return PARTICIPATIONS.filter((entry) => entry.personId === id)
    .map((entry) => ({
      ...entry,
      event: getDirectoryEvent(entry.eventId),
    }))
    .sort(
      (a, b) =>
        b.event.year.localeCompare(a.event.year) ||
        String("date" in b.event ? b.event.date : "").localeCompare(
          String("date" in a.event ? a.event.date : ""),
        ),
    );
}
export function getTeamDirectory() {
  return PEOPLE.filter((person) => person.kind === "person")
    .flatMap((person) => {
      const history = getPersonHistory(person.id).filter((entry) => entry.event.kind === "DevFest");
      const legacy = teamFile.members.filter((entry) => entry.personId === person.id);
      return history.length || legacy.length
        ? [{ person, history, legacy, approved: APPROVED_PERSON_IDS.includes(person.id) }]
        : [];
    })
    .sort((a, b) => a.person.name.localeCompare(b.person.name));
}
export function getTalks(scope: "devfest" | "all" = "all") {
  return SESSION_RECORDS.filter(
    (session) => scope === "all" || DEVFEST_EVENT_IDS.includes(session.editionId),
  )
    .map((session) => ({
      ...session,
      event: getDirectoryEvent(session.editionId),
      speakers: session.speakerIds.map(getPerson),
    }))
    .sort((a, b) => b.event.year.localeCompare(a.event.year) || a.title.localeCompare(b.title));
}
export function getPersonWorkshops(id: string) {
  return workshopFile.workshops.filter((workshop) => workshop.speakerIds.includes(id));
}
export function getPublicOrganizations() {
  return ORGANIZATIONS.filter((organization) =>
    organization.partnerships.some((entry) => entry.visible !== false),
  ).map((organization) => ({
    ...organization,
    partnerships: organization.partnerships.filter((entry) => entry.visible !== false),
    approved: APPROVED_ORGANIZATION_IDS.includes(organization.id),
  }));
}
