import { getEventPartners, getCommunityUrl } from "@/content/partners";
import ExternalLink from "@/components/shared/ExternalLink";
import OrganizationLogo from "@/components/shared/OrganizationLogo";

export default function EditionPartners({ eventId }: { eventId: string }) {
  return (
    <ul className="compact-sponsor-grid archived-community-grid">
      {getEventPartners(eventId).map((partner) => {
        const href = getCommunityUrl(partner);
        const content = (
          <>
            <div className="compact-sponsor-logo">
              <OrganizationLogo organization={partner} />
            </div>
            <span>{partner.name}</span>
            <small>{partner.role}</small>
          </>
        );
        return (
          <li key={partner.id}>
            {href ? (
              <ExternalLink href={href} className="archived-community-link">
                {content}
              </ExternalLink>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
