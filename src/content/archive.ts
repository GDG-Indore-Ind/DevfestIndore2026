import { PAST_EVENTS } from "./event";
import type { ArchivedEvent } from "./model";
import type { EventRecord } from "./model";
import { ALL_PHOTOS } from "./gallery";
import { ORGANIZATIONS } from "./partners";
export function getArchivedEvents(): ArchivedEvent[] {
  return [...(PAST_EVENTS as EventRecord[])]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ officialSpeakerIds, coverId, ...event }) => {
      void officialSpeakerIds;
      const cover = ALL_PHOTOS.find((photo) => photo.id === coverId);
      return {
        ...event,
        coverImage: cover && { src: cover.imageUrl, alt: cover.caption },
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
                partnership.editionId === event.id &&
                partnership.visible !== false &&
                partnership.publication !== "ecosystem",
            )
            .map((partnership) => ({ name: organization.name, order: partnership.order ?? 9999 })),
        )
          .sort((a, b) => a.order - b.order)
          .map((partner) => partner.name),
      };
    });
}
export const ARCHIVED_EVENTS = getArchivedEvents();
const archivedEvents = ARCHIVED_EVENTS;
export const COMMUNITY_EVENTS = archivedEvents.filter((event) => event.kind !== "DevFest");
