import partnersFile from "../../content/partners.json";
import type { EventPartner } from "./model";
import type { Organization } from "./model";
import { EVENT } from "./event";
export const ORGANIZATIONS = partnersFile.organizations as Organization[];
export const ARCHIVE_LOGO_SHEET = partnersFile.archiveLogoSheet;
const organizations = new Map(ORGANIZATIONS.map(organization => [organization.id, organization]));
export function getOrganization(id: string): Organization {
  const organization = organizations.get(id);
  if (!organization)
    throw new Error(`Unknown organization ${id}. Run npm run content:validate.`);
  return organization;
}
export function getEventPartners(editionId: string = EVENT.id): EventPartner[] {
  return ORGANIZATIONS.flatMap(organization => organization.partnerships.filter(partnership => partnership.editionId === editionId && (editionId === "ecosystem" ? partnership.publication === "ecosystem" : partnership.publication === "confirmed")).map(partnership => ({ ...organization, id: partnership.id, role: partnership.role, kind: partnership.kind, featured: partnership.featured, order: partnership.order ?? 9999 }))).sort((a, b) => a.order - b.order);
}
export function getHistoricalSponsors() {
  return ORGANIZATIONS.flatMap(organization => organization.partnerships.filter(partnership => partnership.editionId === "historical" && partnership.kind === "sponsor" && partnership.publication === "archived").map(partnership => ({ ...organization, order: partnership.order ?? 9999 }))).sort((a, b) => a.order - b.order);
}
export const CONFIRMED_EVENT_PARTNERS = getEventPartners();
export const ECOSYSTEM_PARTNERS = getEventPartners("ecosystem");
export const ARCHIVED_COMMUNITIES = ORGANIZATIONS.flatMap(organization => {
  const appearances = organization.partnerships.filter(partnership => partnership.kind === "community" && partnership.publication === "archived" && /^20\d\d$/.test(partnership.editionId));
  return appearances.length ? [{ ...organization, years: [...new Set(appearances.map(item => item.editionId))].sort().reverse() }] : [];
});
export const HISTORICAL_COMMUNITIES = ARCHIVED_COMMUNITIES.filter(organization => !organization.partnerships.some(item => item.editionId === "ecosystem"));
export const HISTORICAL_SPONSORS = getHistoricalSponsors();
