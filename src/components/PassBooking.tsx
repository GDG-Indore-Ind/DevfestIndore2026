"use client";

import { useEffect, useState } from "react";
import { Clock3, ArrowRight } from "lucide-react";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import { EVENT } from "@/content/event";
import { TICKET_BOOKING_URL, TICKET_SALES_OPEN, getPassReleaseStatus } from "@/content/booking";
import { formatPassPrice, getPublicPass, type PublicPassId } from "@/content/tickets";
import { getKonfHubUrl, getStoredReferral } from "@/lib/referral";

const releaseTime = (value: string) => `${new Intl.DateTimeFormat("en-IN", { timeZone: EVENT.timezone, day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(value))} IST`;

export default function PassBooking({ category }: { category: PublicPassId }) {
  const [now, setNow] = useState<number | null>(null);
  const [bookingUrl, setBookingUrl] = useState(TICKET_BOOKING_URL);
  const pass = getPublicPass(category);
  useEffect(() => {
    const sync = () => {
      setNow(Date.now());
      setBookingUrl(getKonfHubUrl(getStoredReferral().coupon));
    };
    const frame = window.requestAnimationFrame(sync);
    const timer = window.setInterval(sync, 30_000);
    window.addEventListener("devfest-referral-update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
      window.removeEventListener("devfest-referral-update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const status = now === null ? "scheduled" : getPassReleaseStatus(pass, now, TICKET_SALES_OPEN);
  const label = status === "open" ? "Booking open" : status === "upcoming" ? "Next release" : status === "closed" ? "Release ended" : "Booking not open";
  return <aside className="ticket-next-step ticket-booking-simple" id={`booking-${category}`} aria-label={`${pass.name} booking`}>
    <p className="pass-booking-status" data-status={status}><span aria-hidden="true" />{label}</p>
    <p className="ticket-price-label">{formatPassPrice(pass)}</p>
    <dl className="ticket-release-times"><div><dt>Scheduled opening</dt><dd><time dateTime={pass.opensAt}>{releaseTime(pass.opensAt)}</time></dd></div><div><dt>Release closes</dt><dd><time dateTime={pass.closesAt}>{releaseTime(pass.closesAt)}</time></dd></div></dl>
    {status === "open" ? <ExternalLink href={bookingUrl} className="audience-button space-primary-button">Continue to KonfHub</ExternalLink> : status === "closed" ? <Link href="/tickets" className="audience-text-link">See current releases<ArrowRight className="audience-icon" aria-hidden="true" /></Link> : <p className="ticket-booking-wait"><Clock3 className="audience-icon" aria-hidden="true" />Booking is not open yet.</p>}
    <p className="audience-caption">{status === "open" ? "Complete registration and payment on KonfHub. Review the total and any applicable discount there." : status === "closed" ? "This release is no longer available." : "Release dates are scheduled. Pricing and checkout will be available once booking opens."}</p>
    <p className="ticket-final-sale">All purchases are final. No refunds or transfers.</p>
    <Link href="/guidelines" className="audience-text-link ticket-guidelines-link">Registration guidelines<ArrowRight className="audience-icon" aria-hidden="true" /></Link>
  </aside>;
}
