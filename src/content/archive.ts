import eventsFile from "../../content/events.json";
import type { ArchivedEvent } from "./model";
import type { EventRecord } from "./model";
import { getPerson } from "./people";
import { ORGANIZATIONS } from "./partners";
export function getArchivedEvents(): ArchivedEvent[] {
  return (eventsFile.events as EventRecord[]).map(({ officialSpeakerIds, ...event }) => ({
    ...event,
    displayDate: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(event.date)),
    partners: ORGANIZATIONS.flatMap((organization) =>
      organization.partnerships
        .filter(
          (partnership) =>
            partnership.editionId === event.id && partnership.publication === "archived",
        )
        .map((partnership) => ({ name: organization.name, order: partnership.order ?? 9999 })),
    )
      .sort((a, b) => a.order - b.order)
      .map((partner) => partner.name),
    speakerNames: officialSpeakerIds.length
      ? officialSpeakerIds.map((id) => getPerson(id).name)
      : undefined,
  }));
}
const archivedEvents = getArchivedEvents();
export const DEVFEST_EDITIONS = archivedEvents.filter((event) => event.kind === "DevFest");
export const COMMUNITY_EVENTS = archivedEvents.filter((event) => event.kind !== "DevFest");
