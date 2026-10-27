import { CAMPUS_WORKSHOPS } from "./programme";
import type { WorkshopItem } from "./model";
import { getPerson } from "./people";
export function getWorkshops(): WorkshopItem[] {
  return CAMPUS_WORKSHOPS.map(({ speakerIds, ...workshop }) => ({
    ...workshop,
    publication: workshop.publication as WorkshopItem["publication"],
    speaker: speakerIds.map((id) => getPerson(id).name).join(" & "),
    displayDate: workshop.date
      ? new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(workshop.date))
      : undefined,
  })).sort(
    (a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.college.localeCompare(b.college),
  );
}
export const WORKSHOPS = getWorkshops();
