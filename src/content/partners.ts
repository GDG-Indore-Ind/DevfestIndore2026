import organizationsFile from "../../content/organizations.json";
import type { EventPartner } from "./model";
import type { Organization } from "./model";
import { EVENT } from "./event";
type Contribution = {
  id: string;
  eventId?: string;
  scope?: "historical" | "ecosystem";
  status: "confirmed" | "archived" | "ecosystem";
  type: "sponsor" | "collaborator" | "community" | "media";
  title: string;
  order?: number;
  source?: string;
  featured?: "space" | "technology";
  visible?: boolean;
};
type OrganizationRecord = Omit<
  Organization,
  "partnerships" | "logoUrl" | "websiteUrl" | "socialUrl"
> & {
  logo?: string;
  website?: string;
  social?: string;
  contributions: Contribution[];
};
export const ORGANIZATIONS = (organizationsFile.organizations as OrganizationRecord[]).map(
  ({ logo, website, social, contributions, ...record }) => {
    const partnerships: Organization["partnerships"] = [];
    for (const item of contributions) {
      const editionId = item.eventId ?? item.scope!;
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
export function getHistoricalSponsors() {
  return ORGANIZATIONS.flatMap((organization) =>
    organization.partnerships
      .filter(
        (partnership) =>
          partnership.editionId === "historical" &&
          partnership.contributions.some((item) => item.kind === "sponsor") &&
          partnership.publication === "archived",
      )
      .map((partnership) => ({ ...organization, order: partnership.order ?? 9999 })),
  ).sort((a, b) => a.order - b.order);
}
export const CONFIRMED_EVENT_PARTNERS = getEventPartners();
export const ECOSYSTEM_PARTNERS = getEventPartners("ecosystem");
export const ARCHIVED_COMMUNITIES = ORGANIZATIONS.flatMap((organization) => {
  const appearances = organization.partnerships.filter(
    (partnership) =>
      partnership.contributions.some((item) => item.kind === "community") &&
      partnership.publication !== "ecosystem" &&
      partnership.editionId !== EVENT.id &&
      partnership.visible !== false &&
      /^devfest-20\d\d$/.test(partnership.editionId),
  );
  return appearances.length
    ? [
        {
          ...organization,
          years: [...new Set(appearances.map((item) => item.editionId.replace(/^devfest-/, "")))]
            .sort()
            .reverse(),
        },
      ]
    : [];
});
export const HISTORICAL_COMMUNITIES = ARCHIVED_COMMUNITIES.filter(
  (organization) => !organization.partnerships.some((item) => item.editionId === "ecosystem"),
);
export const HISTORICAL_SPONSORS = getHistoricalSponsors();
export function getCommunityUrl(
  organization: Pick<Organization, "websiteUrl" | "socialUrl">,
): string | undefined {
  return organization.websiteUrl ?? organization.socialUrl;
}
