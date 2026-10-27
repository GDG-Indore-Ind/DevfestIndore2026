import { getPerson, PERSON_RECORDS } from "./people";
import type { Socials } from "./model";

export const AMBASSADOR_DIRECTORY = PERSON_RECORDS.flatMap((person) =>
  person.ambassador ? [{ ...person.ambassador, personId: person.id }] : [],
)
  .sort((a, b) => a.order - b.order)
  .map((entry) => {
    const person = getPerson(entry.personId);
    const socials = Object.fromEntries(
      entry.contactPlatforms
        .map((platform) => [platform, person.socials?.[platform as keyof Socials]])
        .filter(([, url]) => Boolean(url)),
    ) as Socials;
    return { ...entry, person, socials };
  })
  .filter(({ socials }) => {
    try {
      const url = new URL(socials.linkedin ?? "");
      return (
        url.protocol === "https:" &&
        ["linkedin.com", "www.linkedin.com"].includes(url.hostname) &&
        /^\/in\/[^/]+\/?$/.test(url.pathname)
      );
    } catch {
      return false;
    }
  });
