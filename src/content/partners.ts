import organizationsFile from "../../content/organizations.json";
import type { EventPartner } from "./model";
import type { Organization } from "./model";
import type { Organization as OrganizationRecord } from "./schema/current/organizations";
import { EVENT } from "./event";
export const ORGANIZATIONS = (organizationsFile.organizations as OrganizationRecord[]).map(
  ({ logo, website, social, contributions, ...record }) => {
    const partnerships: Organization["partnerships"] = [];
    for (const item of contributions) {
      const editionId = "eventId" in item ? item.eventId : item.scope;
      const existing = partnerships.find((entry) => entry.editionId === editionId);
      if (existing) existing.contributions.push({ kind: item.type, role: item.title });
      else
        partnerships.push({
          id: item.id,
          editionId,
          publication: item.status,
          order: item.order,
          featured: item.featured,
          visible: item.visible,
          source: item.source,
          contributions: [{ kind: item.type, role: item.title }],
        });
    }
    return { ...record, logoUrl: logo ?? "", websiteUrl: website, socialUrl: social, partnerships };
  },
);
export const ARCHIVE_LOGO_SHEET = organizationsFile.archiveLogoSheet;
const organizations = new Map(ORGANIZATIONS.map((organization) => [organization.id, organization]));
export function getOrganization(id: string): Organization {
  const organization = organizations.get(id);
  if (!organization) throw new Error(`Unknown organization ${id}. Run npm run content:validate.`);
  return organization;
}
export function getEventPartners(editionId: string = EVENT.id): EventPartner[] {
  return ORGANIZATIONS.flatMap((organization) =>
    organization.partnerships
      .filter(
        (partnership) =>
          partnership.editionId === editionId &&
          partnership.visible !== false &&
          (editionId === "ecosystem"
            ? partnership.publication === "ecosystem"
            : editionId === EVENT.id
              ? partnership.publication === "confirmed"
              : partnership.publication !== "ecosystem"),
      )
      .map((partnership) => ({
        ...organization,
        id: partnership.id,
        role: partnership.contributions.map((item) => item.role).join(" · "),
        kind: partnership.contributions[0].kind,
        featured: partnership.featured,
        order: partnership.order ?? 9999,
      })),
  ).sort((a, b) => a.order - b.order);
}
export const CONFIRMED_EVENT_PARTNERS = getEventPartners();
export const ECOSYSTEM_PARTNERS = getEventPartners("ecosystem");
export function getCommunityUrl(
  organization: Pick<Organization, "websiteUrl" | "socialUrl">,
): string | undefined {
  return organization.websiteUrl ?? organization.socialUrl;
}
