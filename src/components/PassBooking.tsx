"use client";

import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import { EVENT } from "@/content/event";
import { TICKET_BOOKING_URL, TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import { TICKET_REGISTRATION, getPublicPass, type PublicPassId } from "@/content/tickets";
import { getKonfHubUrl, getStoredReferral } from "@/lib/referral";
import { TICKETS_PAGE } from "@/content/pages";

const releaseTime = (value: string) => `${new Intl.DateTimeFormat("en-IN", { timeZone: EVENT.timezone, day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(value))} IST`;

export default function PassBooking({ category, policyAnchor = false }: { category?: PublicPassId; policyAnchor?: boolean }) {
  const [bookingUrl, setBookingUrl] = useState(TICKET_BOOKING_URL);
  const pass = category ? getPublicPass(category) : undefined;
  useEffect(() => {
    const sync = () => setBookingUrl(getKonfHubUrl(getStoredReferral().coupon));
    const frame = window.requestAnimationFrame(sync);
    window.addEventListener("devfest-referral-update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("devfest-referral-update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return <aside className="ticket-next-step ticket-booking-simple ticket-registration-panel" id={`booking-${category ?? "event"}`} aria-label="KonfHub registration">
    <div className="ticket-registration-action">
      <p className="ticket-registration-reminder"><Link2 aria-hidden="true" /><span>{TICKET_REGISTRATION.profileReminder}</span></p>
      {TICKET_REGISTRATION_ENABLED ? <ExternalLink href={bookingUrl} className="audience-button ticket-register-button">{TICKET_REGISTRATION.buttonLabel}</ExternalLink> : <p className="audience-body">{TICKET_REGISTRATION.unavailableText}</p>}
      <p className="audience-caption">{TICKET_REGISTRATION.handoffText}</p>
    </div>
    {pass && <div className="ticket-registration-schedule"><p>{TICKET_REGISTRATION.scheduleHeading}</p><dl className="ticket-release-times"><div><dt>Opens</dt><dd><time dateTime={pass.opensAt}>{releaseTime(pass.opensAt)}</time></dd></div><div><dt>Closes</dt><dd><time dateTime={pass.closesAt}>{releaseTime(pass.closesAt)}</time></dd></div></dl></div>}
    <p className="ticket-final-sale" id={policyAnchor ? "attendee-policies" : undefined}>{TICKET_REGISTRATION.finalSaleText}</p>
    <Link href="/guidelines" className="audience-text-link ticket-guidelines-link">{TICKETS_PAGE.guidelinesLabel}</Link>
  </aside>;
}
