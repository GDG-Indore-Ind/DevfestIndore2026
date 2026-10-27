import data from "../../content/programme.json";
import type { SessionRecord } from "./model";
import { ALL_PHOTOS } from "./gallery";

type TalkEntry = Omit<SessionRecord, "editionId"> & { type: "talk"; eventId: string };
type CampusWorkshopEntry = {
  type: "campus-workshop";
  id: string;
  legacyId?: string;
  campus: string;
  title?: string;
  speakerIds: string[];
  publication: "archived" | "confirmed";
  date?: string;
  eventUrl?: string;
  photoIds: string[];
};
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
