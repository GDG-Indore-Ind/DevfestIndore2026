"use client";

import { TICKET_POLICIES } from "@/content/tickets";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";

export default function TicketBookingGuide() {
  const passes = useTicketRelease();
  const policies = TICKET_POLICIES.filter((_, index) => index !== 1 || passes.some(pass => pass.id === "student"));
  return <section className="ticket-policy-compact" id="attendee-policies" aria-label="Booking policies"><div className="audience-wrap"><details><summary>Booking policies & entry requirements</summary><div>{policies.map(policy => <p key={policy.title}><strong>{policy.title}.</strong> {policy.text}</p>)}<p>Use each attendee’s own details at checkout. Eligibility, payment and ticket confirmation are handled on KonfHub.</p></div></details></div></section>;
}
