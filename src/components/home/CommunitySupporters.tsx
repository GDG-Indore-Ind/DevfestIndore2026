import { HOME_PAGE } from "@/content/pages";
import { ECOSYSTEM_PARTNERS, getCommunityUrl } from "@/content/partners";
import LogoRow from "./LogoRow";

export default function CommunitySupporters() {
  return (
    <LogoRow
      label={HOME_PAGE.ecosystemTitle}
      description={HOME_PAGE.ecosystemLead}
      items={ECOSYSTEM_PARTNERS.map((item) => ({ ...item, href: getCommunityUrl(item) }))}
    />
  );
}
