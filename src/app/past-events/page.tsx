import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CommunityPage from "@/components/CommunityPage";
import ArchiveNav from "@/components/ArchiveNav";
import { DEVFEST_EDITIONS } from "@/content/archive";

export const metadata: Metadata = { title: "Past events", description: "Explore DevFest Indore editions from 2022 to 2025, with dates, venues and official event records." };
export default function PastEventsPage() {
  return <CommunityPage compact title="Past events" lead="DevFest Indore, 2022–2025.">
    <ArchiveNav current="/past-events" />
    <div className="compact-edition-list">{DEVFEST_EDITIONS.map(event => <Link key={event.id} href={`/past-events/${event.id}`} className="compact-edition-row" aria-label={`Explore ${event.title}`}><span className="compact-edition-year">{event.id}</span><span className="compact-edition-meta"><time dateTime={event.date}>{event.displayDate}</time><small>{event.venue}</small></span><ArrowUpRight aria-hidden="true" /></Link>)}</div>
  </CommunityPage>;
}
