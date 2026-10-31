import { HISTORICAL_SPONSORS, ARCHIVED_COMMUNITIES, getCommunityUrl } from "@/content/partners";
import ExternalLink from "@/components/shared/ExternalLink";
import OrganizationLogo from "@/components/shared/OrganizationLogo";

export default function PastOrganizations() {
  return (
    <>
      <ul className="compact-sponsor-grid" aria-label="Past sponsors">
        {HISTORICAL_SPONSORS.map((organization) => (
          <li key={organization.id}>
            <div className="compact-sponsor-logo">
              <OrganizationLogo organization={organization} />
            </div>
            <span>{organization.name}</span>
          </li>
        ))}
      </ul>
      <section className="compact-archive-section" aria-labelledby="past-event-partners">
        <h2 id="past-event-partners">Past communities</h2>
        <ul className="compact-sponsor-grid archived-community-grid">
          {[...ARCHIVED_COMMUNITIES]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((organization) => (
              <li key={organization.id}>
                <ExternalLink
                  href={getCommunityUrl(organization)}
                  className="archived-community-link"
                >
                  <div className="compact-sponsor-logo">
                    <OrganizationLogo organization={organization} />
                  </div>
                  <span>{organization.name}</span>
                  <small>{organization.years.join(" · ")}</small>
                </ExternalLink>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
