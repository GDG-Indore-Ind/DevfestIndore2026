"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ExternalLink from "@/components/ExternalLink";
import { TICKET_BOOKING_URL, TICKET_SALES_OPEN, getPassReleaseStatus } from "@/content/booking";
import { getPublicPass, type PublicPassId } from "@/content/tickets";
import { getKonfHubUrl, getStoredReferral } from "@/lib/referral";

export default function PassBooking({ category }: { category: PublicPassId }) {
  const [now, setNow] = useState<number | null>(null);
  const [bookingUrl, setBookingUrl] = useState(TICKET_BOOKING_URL);
  const pass = getPublicPass(category);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setNow(Date.now());
      setBookingUrl(getKonfHubUrl(getStoredReferral().coupon));
    });
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => { window.cancelAnimationFrame(frame); window.clearInterval(timer); };
  }, []);
  const status = now === null ? "scheduled" : getPassReleaseStatus(pass, now, TICKET_SALES_OPEN);
  const label = status === "open" ? "Tickets are live" : status === "upcoming" ? `Opens ${pass.opening}` : status === "closed" ? "This release has ended" : "Booking opens soon";
  return <div className="ticket-next-step ticket-booking-simple" id={`booking-${category}`}>
    <p className="pass-booking-status">{label}</p>
    {status === "open" ? <ExternalLink href={bookingUrl} className="audience-button space-primary-button">Get tickets</ExternalLink> : <button type="button" className="audience-button" disabled>{status === "closed" ? "Release closed" : "Coming soon"}<ArrowUpRight className="audience-icon" aria-hidden="true" /></button>}
    <p className="audience-caption">{status === "open" ? "Booking & payment on KonfHub. All purchases are final." : status === "closed" ? "See the current release for other passes." : "Booking & pricing will be available on KonfHub."}</p>
  </div>;
}
