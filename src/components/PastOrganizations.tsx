import { DEVFEST_EDITIONS } from "@/content/archive";
import { HISTORICAL_SPONSORS, ARCHIVED_COMMUNITIES, ARCHIVE_LOGO_SHEET } from "@/content/partners";
import ExternalLink from "@/components/ExternalLink";
import OrganizationLogo from "@/components/OrganizationLogo";

export default function PastOrganizations() {
  return <>
    <ul className="compact-sponsor-grid" aria-label="Past sponsors">
      {HISTORICAL_SPONSORS.map(organization => <li key={organization.id}>
        <div className="compact-sponsor-logo"><OrganizationLogo organization={organization} /></div>
        <span>{organization.name}</span>
      </li>)}
    </ul>
    <section className="compact-archive-section" aria-labelledby="past-event-partners">
      <h2 id="past-event-partners">Past communities</h2>
      <ul className="compact-sponsor-grid archived-community-grid">{[...ARCHIVED_COMMUNITIES].sort((a,b) => a.name.localeCompare(b.name)).map(organization => <li key={organization.id}><div className="compact-sponsor-logo"><OrganizationLogo organization={organization} /></div><span>{organization.name}</span><small>{organization.years.join(" · ")}</small></li>)}</ul>
    </section>
    <div className="compact-archive-footnote"><details><summary>Archive sources</summary><a href={ARCHIVE_LOGO_SHEET}>Sponsor artwork</a>{DEVFEST_EDITIONS.map(event => <ExternalLink key={event.id} href={event.source}>{event.id} event record</ExternalLink>)}</details></div>
  </>;
}
