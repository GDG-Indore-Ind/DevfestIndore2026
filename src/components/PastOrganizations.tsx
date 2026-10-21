import { DEVFEST_EDITIONS } from "@/content/archive";
import { PAST_SPONSOR_NAMES, ARCHIVE_LOGO_SHEET, PAST_SPONSOR_LOGOS } from "@/content/partners";
import ExternalLink from "@/components/ExternalLink";

export default function PastOrganizations() {
  const partners = new Map<string, Set<string>>();
  DEVFEST_EDITIONS.forEach(event => event.partners.forEach(name => {
    const editions = partners.get(name) ?? new Set<string>();
    editions.add(event.id);
    partners.set(name, editions);
  }));
  return <>
    <ul className="compact-sponsor-grid" aria-label="Past sponsors">
      {PAST_SPONSOR_NAMES.map((name, index) => <li key={name}>
        <div className="compact-sponsor-logo">
          <svg viewBox={PAST_SPONSOR_LOGOS[name].join(" ")} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
            <defs><clipPath id={`sponsor-logo-${index}`}><rect x={PAST_SPONSOR_LOGOS[name][0]} y={PAST_SPONSOR_LOGOS[name][1]} width={PAST_SPONSOR_LOGOS[name][2]} height={PAST_SPONSOR_LOGOS[name][3]} /></clipPath></defs>
            <image href={ARCHIVE_LOGO_SHEET} width="1500" height="844" clipPath={`url(#sponsor-logo-${index})`} />
          </svg>
        </div>
        <span>{name}</span>
      </li>)}
    </ul>
    <div className="compact-archive-footnote"><p>Historical sponsors · <a href={ARCHIVE_LOGO_SHEET}>Original logo sheet</a></p></div>
    <section className="compact-archive-section" aria-labelledby="past-event-partners">
      <h2 id="past-event-partners">Event partners</h2>
      <ul className="compact-name-wall">{[...partners].sort(([a], [b]) => a.localeCompare(b)).map(([name, editions]) => <li key={name}><span>{name}</span><small>{[...editions].sort().reverse().join(" · ")}</small></li>)}</ul>
      <div className="compact-archive-footnote"><p>Official records: {DEVFEST_EDITIONS.map((event, index) => <span key={event.id}>{index > 0 && " · "}<ExternalLink href={event.source}>{event.id}</ExternalLink></span>)}</p></div>
    </section>
  </>;
}
