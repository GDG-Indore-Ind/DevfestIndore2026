import content from "../../content/ambassadors.json";
import { getPerson } from "./people";
import type { Socials } from "./model";

export const AMBASSADOR_DIRECTORY = content.directory.map((entry) => {
  const person = getPerson(entry.personId);
  const socials = Object.fromEntries(
    entry.contactPlatforms
      .map((platform) => [platform, person.socials?.[platform as keyof Socials]])
      .filter(([, url]) => Boolean(url)),
  ) as Socials;
  return { ...entry, person, socials };
});
