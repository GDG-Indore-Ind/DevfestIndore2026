"use client";

import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { Check, ShieldCheck, Ticket } from "lucide-react";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import PassBooking from "@/components/PassBooking";
import PageIntro from "@/components/PageIntro";
import { TICKETS_PAGE as page } from "@/content/pages";

export default function CurrentTicketOffer() {
  const passes = useTicketRelease();
  return <>
    <PageIntro title={page.title} titleId="current-ticket-title" motif="tickets" meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`} lead={passes.length ? page.lead : page.endedLead} />
    <section className="audience-section current-ticket-offer" id="ticket-options" aria-label="Pass details"><div className="audience-wrap ticket-summary-list">
      {passes.map((pass, index) => <article key={pass.id} className="ticket-summary-card"><div className="ticket-summary-heading"><p className="ticket-summary-audience"><Ticket aria-hidden="true" />{pass.audience}</p><h2>{pass.name}</h2>
        <div className="ticket-summary-eligibility"><ShieldCheck aria-hidden="true" /><div><h3>Who can book</h3><p>{pass.eligibility}</p></div></div>
        {pass.note && <p className="ticket-summary-note">{pass.note}</p>}
      </div>
        <div className="ticket-summary-content">
        <h3 className="ticket-inclusions-heading">What’s included</h3><ul className="ticket-summary-benefits">{pass.benefits.map(benefit => <li key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></li>)}</ul>
      </div><PassBooking key={pass.id} category={pass.id} policyAnchor={index === 0} /></article>)}
      {!passes.length && <PassBooking policyAnchor />}
    </div></section>
  </>;
}
