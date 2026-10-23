import Link from "next/link";
import { ArrowUpRight, History, Users } from "lucide-react";
import PhotoMarquee from "./PhotoMarquee";
import { DEVFEST_EDITIONS } from "@/content/archive";
import { HOME_PAGE } from "@/content/pages";
import { EVENT } from "@/content/event";
import { HISTORICAL_SPONSORS } from "@/content/partners";
import LogoMarquee from "@/components/home/LogoMarquee";

const timelineYears = Array.from(
  { length: Number(EVENT.id) - HOME_PAGE.historySince + 1 },
  (_, index) => HOME_PAGE.historySince + index,
);
const editionsByYear = new Map(DEVFEST_EDITIONS.map((edition) => [Number(edition.id), edition]));

export default function GalleryVideoSection() {
  return (
    <section className="audience-section engineering-history" aria-labelledby="community-title">
      <div className="audience-wrap">
        <div className="edition-section-heading history-heading">
          <div>
            <p className="audience-overline">{HOME_PAGE.historyEyebrow}</p>
            <h2 id="community-title">{HOME_PAGE.historyTitle}</h2>
          </div>
          <p className="audience-body">{HOME_PAGE.historyLead}</p>
        </div>
        <nav className="history-timeline" aria-label={HOME_PAGE.historyRecentLabel} tabIndex={0}>
          <ol style={{ gridTemplateColumns: `repeat(${timelineYears.length}, minmax(76px, 1fr))` }}>
            {timelineYears.map((year) => {
              const edition = editionsByYear.get(year);
              return (
                <li key={year}>
                  {edition ? (
                    <Link href={`/past-events/${edition.id}`}>
                      {year}
                      <small>{edition.kind}</small>
                    </Link>
                  ) : year === Number(EVENT.id) ? (
                    <Link href="/tickets" className="history-current">
                      {year}
                      <small>{HOME_PAGE.historyCurrentLabel}</small>
                    </Link>
                  ) : (
                    <span
                      className={year === HOME_PAGE.historySince ? "history-origin" : undefined}
                    >
                      {year}
                      {year === HOME_PAGE.historySince && (
                        <small>{HOME_PAGE.historyOriginLabel}</small>
                      )}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <PhotoMarquee />
        <div className="history-sponsor-preview">
          <LogoMarquee
            label={HOME_PAGE.pastSponsorsTitle}
            items={HISTORICAL_SPONSORS.slice(0, 6)}
            action={
              <Link href="/past-sponsors" className="audience-text-link">
                {HOME_PAGE.pastSponsorsLink}
                <ArrowUpRight className="audience-icon" aria-hidden="true" />
              </Link>
            }
          />
        </div>
        <nav
          className="history-directory-links"
          aria-label="People and organizations from previous editions"
        >
          {[
            {
              href: "/past-events",
              label: "Past events",
              detail: "Recent edition records",
              Icon: History,
            },
            {
              href: "/past-speakers",
              label: "Past speakers",
              detail: "People & sessions",
              Icon: Users,
            },
          ].map(({ href, label, detail, Icon }) => (
            <Link href={href} key={href}>
              <Icon aria-hidden="true" />
              <span>
                {label}
                <small>{detail}</small>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
