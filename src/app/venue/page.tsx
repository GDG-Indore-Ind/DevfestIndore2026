import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import VenueSection from "@/components/VenueSection";
import OrbitScrollRail from "@/components/OrbitScrollRail";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "@/content/event";
import { VENUE_PAGE as page } from "@/content/pages";
import { TICKET_POLICIES } from "@/content/tickets";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/venue", "Venue & directions", page.description);

export default function VenuePage() {
  const entry = TICKET_POLICIES.find(policy => policy.id === "entry-identification")!;
  const map = `https://maps.google.com/maps?q=${EVENT.venue.latitude},${EVENT.venue.longitude}&z=16&output=embed`;
  return <div className="audience-site space-subpage practical-page venue-page">
    <Navbar /><main id="main-content">
      <PageIntro title={page.title} lead={page.lead} motif="guide" meta={<span>{EVENT_DATE}</span>} />
      <VenueSection showDetailsLink={false} />
      <section className="audience-section practical-map-section" id="venue-map" aria-labelledby="venue-map-title"><div className="audience-wrap"><h2 id="venue-map-title">{page.mapTitle}</h2><iframe className="practical-map" title={`Map showing ${EVENT.venue.fullName}`} src={map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></section>
      <section className="audience-section practical-arrival" id="arrival" aria-labelledby="arrival-title"><div className="audience-wrap practical-split">
        <div><h2 id="arrival-title">{page.arrivalTitle}</h2><div className="practical-checkin"><Clock3 className="audience-icon" aria-hidden="true" /><div><p>{page.registrationLabel}</p><strong><time dateTime={EVENT.startsAt}>{REGISTRATION_TIME}</time></strong><span>{EVENT_DATE}</span></div></div><Link href="/guidelines" className="audience-text-link">Registration guidelines<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div>
        <div><h3>{page.entryTitle}</h3><p className="audience-body">{entry.text}</p><Link href="/guidelines#eligibility" className="audience-text-link">Check pass-specific requirements<ArrowRight className="audience-icon" aria-hidden="true" /></Link><div className="practical-support"><h3>{page.supportTitle}</h3><p>{page.supportText}</p><a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">{page.supportLabel}<ArrowRight className="audience-icon" aria-hidden="true" /></a></div></div>
      </div></section>
    </main><Footer /><OrbitScrollRail stops={[{ id: "page-overview", label: "Overview" }, { id: "venue", label: "The venue" }, { id: "venue-map", label: "Map" }, { id: "arrival", label: "Check-in" }]} />
  </div>;
}
