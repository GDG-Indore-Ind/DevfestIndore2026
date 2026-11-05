import data from "../../content/programme.json";
import type { SessionRecord } from "./model";
import type { ProgrammeFile } from "./schema/current/programme";
import { ALL_PHOTOS } from "./gallery";

type ProgrammeEntry = ProgrammeFile["entries"][number];
type TalkEntry = Extract<ProgrammeEntry, { type: "talk" }>;
type CampusWorkshopEntry = Extract<ProgrammeEntry, { type: "campus-workshop" }>;
const entries = data.entries as (TalkEntry | CampusWorkshopEntry)[];
export const TALKS: SessionRecord[] = entries
  .filter((entry): entry is TalkEntry => entry.type === "talk")
  .map(({ type, eventId, ...entry }) => {
    void type;
    return { ...entry, editionId: eventId };
  });
export const CAMPUS_WORKSHOPS = entries
  .filter((entry): entry is CampusWorkshopEntry => entry.type === "campus-workshop")
  .map(({ type, campus, title, photoIds, ...entry }) => {
    void type;
    const photos = photoIds.map((id) => {
      const photo = ALL_PHOTOS.find((item) => item.id === id);
      if (!photo || !photo.width || !photo.height || !("source" in photo) || !photo.source)
        throw new Error(`Invalid workshop photo ${id}. Run npm run content:validate.`);
      return {
        imageUrl: photo.imageUrl,
        caption: photo.caption,
        width: photo.width,
        height: photo.height,
        source: photo.source,
      };
    });
    return { ...entry, college: campus, topic: title, photos };
  });
