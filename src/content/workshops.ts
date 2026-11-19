import { CAMPUS_WORKSHOPS } from "./programme";
import type { WorkshopItem } from "./model";
import { getPerson, personalSocials } from "./people";
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

/** Everyone who led a campus workshop, most workshops first, with how many they led. */
export function getWorkshopSpeakers() {
  const counts = new Map<string, number>();
  for (const { speakerIds } of CAMPUS_WORKSHOPS)
    for (const id of speakerIds) counts.set(id, (counts.get(id) ?? 0) + 1);
  return [...counts.entries()]
    .map(([id, count]) => {
      const person = getPerson(id);
      return { person, count, socials: personalSocials(person.socials) };
    })
    .sort((a, b) => b.count - a.count || a.person.name.localeCompare(b.person.name));
}
export const WORKSHOP_SPEAKERS = getWorkshopSpeakers();
