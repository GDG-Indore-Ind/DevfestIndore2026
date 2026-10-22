"use client";

import { BOOKING_STEPS, REGISTRATION_CHECKLIST, getTicketPolicies } from "@/content/tickets";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import { EVENT } from "@/content/event";
import ExternalLink from "@/components/ExternalLink";

export default function TicketBookingGuide() {
  const passes = useTicketRelease();
  const policies = getTicketPolicies(passes.map(pass => pass.id));
  return <>
    <section className="ticket-purchase-guide" aria-labelledby="booking-guide-title"><div className="audience-wrap ticket-purchase-guide-grid"><div><p className="audience-overline">From pass to confirmation</p><h2 id="booking-guide-title">How booking works</h2><p>Choose here. Complete your registration on KonfHub.</p></div><ol>{BOOKING_STEPS.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></section>
    <section className="ticket-policy-compact" id="attendee-policies" aria-label="Booking policies"><div className="audience-wrap"><details><summary>Prepare for checkout</summary><div>{REGISTRATION_CHECKLIST.map(item => <p key={item.title}><strong>{item.title}.</strong> {item.text}</p>)}</div></details><details><summary>Booking policies & entry requirements</summary><div>{policies.map(policy => <p key={policy.title}><strong>{policy.title}.</strong> {policy.text}</p>)}<p>For registration corrections or questions, email <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>.</p><p><ExternalLink href={EVENT.links.codeOfConduct}>Read the code of conduct</ExternalLink></p></div></details></div></section>
  </>;
}
