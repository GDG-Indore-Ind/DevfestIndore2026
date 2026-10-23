import Link from "next/link";
import ContentAction from "@/components/shared/ContentAction";
import ContentIcon from "@/components/shared/ContentIcon";
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
            <h2 id="community-title">
              <ContentIcon name="people" tone="green" heading />
              {HOME_PAGE.historyTitle}
            </h2>
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
              <ContentAction href="/past-sponsors" icon="partners" tone="yellow">
                {HOME_PAGE.pastSponsorsLink}
              </ContentAction>
            }
          />
        </div>
        <nav className="venue-actions" aria-label="Explore previous editions">
          <ContentAction href="/past-events" icon="history">
            Past events
          </ContentAction>
          <ContentAction href="/past-speakers" icon="people" tone="green">
            Past speakers
          </ContentAction>
        </nav>
      </div>
    </section>
  );
}
