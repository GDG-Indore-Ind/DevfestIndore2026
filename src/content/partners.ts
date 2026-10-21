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
const historicalSponsors = getHistoricalSponsors();
export const PAST_SPONSOR_NAMES = historicalSponsors.map(organization => organization.name);
export const PAST_SPONSOR_LOGOS = Object.fromEntries(historicalSponsors.map(organization => [organization.name, organization.archiveLogoWindow!]));
