import { HOME_PAGE } from "@/content/pages";
import { COMMUNITY_PARTNERS, ECOSYSTEM_PARTNERS, partnerProfileHref } from "@/content/partners";
import LogoRow from "./LogoRow";

const communityOrder = [
  "orbitstack",
  "gdg-cloud-indore",
  "tensorflow-user-group-indore",
  "women-techmakers-indore",
  "thm-indore",
  "pydata-indore",
];

function communityPosition(id: string) {
  const position = communityOrder.indexOf(id);
  return position === -1 ? communityOrder.length : position;
}

export default function CommunitySupporters() {
  const communities = [
    ...ECOSYSTEM_PARTNERS,
    ...COMMUNITY_PARTNERS.map((item) => ({ ...item, detail: item.role })),
  ].sort((a, b) => communityPosition(a.organizationId) - communityPosition(b.organizationId));

  return (
    <LogoRow
      label={HOME_PAGE.ecosystemTitle}
      description={HOME_PAGE.ecosystemLead}
      items={communities.map((item) => ({
        ...item,
        href: partnerProfileHref(item.organizationId),
      }))}
    />
  );
}
