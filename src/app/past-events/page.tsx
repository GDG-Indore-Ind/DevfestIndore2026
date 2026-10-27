import { pageMetadata } from "@/lib/pageMetadata";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CommunityPage from "@/components/layout/CommunityPage";
import ArchiveNav from "@/components/layout/ArchiveNav";
import { DEVFEST_EDITIONS } from "@/content/archive";
import { HOME_PAGE } from "@/content/pages";

export const metadata = pageMetadata(
  "/past-events",
  "Past events",
  "Explore DevFest Indore editions from 2022 to 2025, with dates, venues and official event records.",
);
export default function PastEventsPage() {
  return (
    <CommunityPage
      flightStops={[
        { id: "page-overview", label: "Overview" },
        { id: "page-directory", label: "Editions" },
      ]}
      compact
      title="Past events"
      lead={`Our story began in ${HOME_PAGE.historySince}. Browse the recent edition records from 2022–2025.`}
    >
      <ArchiveNav current="/past-events" />
      <div className="compact-edition-list">
        {DEVFEST_EDITIONS.map((event) => (
          <Link
            key={event.id}
            href={`/past-events/${event.date.slice(0, 4)}`}
            className="compact-edition-row"
            aria-label={`Explore ${event.title}`}
          >
            <span className="compact-edition-year">{event.date.slice(0, 4)}</span>
            <span className="compact-edition-meta">
              <time dateTime={event.date}>{event.displayDate}</time>
              <small>{event.venue}</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </CommunityPage>
  );
}
