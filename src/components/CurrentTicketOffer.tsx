"use client";

import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import PassBooking from "@/components/PassBooking";
import PageIntro from "@/components/PageIntro";

export default function CurrentTicketOffer() {
  const passes = useTicketRelease();
  return <>
    <PageIntro title="Get tickets" titleId="current-ticket-title" motif="tickets" meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`} lead={passes.length ? "Find your pass. Join the crew." : "This year’s releases have ended. Contact us about your booking."} />
    <section className="audience-section current-ticket-offer" id="ticket-options" aria-label="Pass details"><div className="audience-wrap ticket-summary-list">
      {passes.map(pass => <article key={pass.id} className="ticket-summary-card"><div><p className="ticket-summary-audience">{pass.audience}</p><h2>{pass.name}</h2><p className="audience-body">{pass.summary}</p><Link href={`/tickets/${pass.id}`} className="audience-text-link">Pass details<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div><PassBooking key={pass.id} category={pass.id} /></article>)}
    </div></section>
  </>;
}
