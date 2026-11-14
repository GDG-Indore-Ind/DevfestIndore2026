import { EVENT } from "./event";
import { getEventPerson, personalSocials } from "./people";
import { byRoleOrder, PARTICIPATIONS } from "./participations";

const isLinkedInProfile = (value?: string) => {
  try {
    const url = new URL(value ?? "");
    return (
      url.protocol === "https:" &&
      ["linkedin.com", "www.linkedin.com"].includes(url.hostname) &&
      /^\/in\/[^/]+\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
};

/** Current ambassadors with a public LinkedIn profile; anyone without one stays hidden. */
export const AMBASSADOR_DIRECTORY = PARTICIPATIONS.flatMap((entry) =>
  entry.eventId !== EVENT.id
    ? []
    : entry.roles.flatMap((role) =>
        role.kind === "ambassador"
          ? [
              {
                personId: entry.personId,
                track: role.track!,
                community: role.community!,
                order: role.order,
              },
            ]
          : [],
      ),
)
  .sort(byRoleOrder)
  .map((entry) => {
    const person = getEventPerson(entry.personId, EVENT.id);
    const { linkedin, instagram } = personalSocials(person.socials);
    return { ...entry, person, socials: { linkedin, instagram } };
  })
  .filter(({ socials }) => isLinkedInProfile(socials.linkedin));
