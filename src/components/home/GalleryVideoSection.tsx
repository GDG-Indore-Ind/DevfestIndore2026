import pages from "../../../content/pages.json";
const directory = pages.directory;
import Link from "next/link";
import ContentAction from "@/components/shared/ContentAction";
import ContentIcon from "@/components/shared/ContentIcon";
import PhotoMarquee from "./PhotoMarquee";
import { DEVFEST_EDITIONS } from "@/content/archive";
import { HOME_PAGE } from "@/content/pages";
import { EVENT } from "@/content/event";

const timelineYears = Array.from(
  { length: Number(EVENT.year) - HOME_PAGE.historySince + 1 },
  (_, index) => HOME_PAGE.historySince + index,
);
const editionsByYear = new Map(
  DEVFEST_EDITIONS.map((edition) => [Number(edition.date.slice(0, 4)), edition]),
);

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
                    <Link href={`/past-events/${year}`}>
                      {year}
                      <small>{edition.kind}</small>
                    </Link>
                  ) : year === Number(EVENT.year) ? (
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
        <nav className="venue-actions" aria-label="Explore previous editions">
          <ContentAction href="/past-events" icon="history">
            Past events
          </ContentAction>
          <ContentAction
            href={directory.enabled ? "/talks" : "/past-speakers"}
            icon="people"
            tone="green"
          >
            {directory.enabled ? directory.talks.title : "Past speakers"}
          </ContentAction>
        </nav>
      </div>
    </section>
  );
}
