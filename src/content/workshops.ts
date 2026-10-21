import workshopsFile from "../../content/workshops.json";
import type { WorkshopItem } from "./model";
import { getPerson } from "./people";
export function getWorkshops(): WorkshopItem[] {
  return workshopsFile.workshops.map(({ speakerIds, ...workshop }) => ({ ...workshop, speaker: speakerIds.map(id => getPerson(id).name).join(" & ") }));
}
export const WORKSHOPS = getWorkshops();
