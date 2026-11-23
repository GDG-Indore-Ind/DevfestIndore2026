import { HOME_PAGE } from "@/content/pages";
import { PARTNER_COMMUNITIES } from "@/content/partners";
import SectionHeader from "@/components/shared/SectionHeader";
import PartnerList from "./PartnerList";

export default function CommunitySupporters({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  if (!PARTNER_COMMUNITIES.length) return null;

  return (
    <section aria-labelledby="partner-communities-title">
      <SectionHeader
        id="partner-communities-title"
        level={headingLevel}
        title={HOME_PAGE.ecosystemTitle}
      />
      <PartnerList items={PARTNER_COMMUNITIES} compact={headingLevel === 2} />
    </section>
  );
}
