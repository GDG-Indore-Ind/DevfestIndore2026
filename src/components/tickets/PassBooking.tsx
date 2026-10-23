"use client";

import { ArrowDown, Link2 } from "lucide-react";
import Link from "next/link";
import { EVENT } from "@/content/event";
import { TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import { TICKET_REGISTRATION, getPublicPass, type PublicPassId } from "@/content/tickets";
import ExternalLink from "@/components/shared/ExternalLink";
import { useReferral } from "@/hooks/useReferral";
import { isPassOpen } from "@/content/ticketRelease";

const releaseDateFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: EVENT.timezone,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const releaseTime = (value: string) => `${releaseDateFormat.format(new Date(value))} IST`;

export default function PassBooking({
  category,
  now,
  policyAnchor = false,
}: {
  category?: PublicPassId;
  now: number;
  policyAnchor?: boolean;
}) {
  const pass = category ? getPublicPass(category) : undefined;
  const canBook = !pass || isPassOpen(pass, now);
  const referral = useReferral();
  return (
    <aside
      className="ticket-next-step ticket-booking-simple ticket-registration-panel"
      id={`booking-${category ?? "event"}`}
      aria-label="KonfHub registration"
    >
      <div className="ticket-registration-action">
        {canBook && (
          <p className="ticket-registration-reminder">
            <Link2 aria-hidden="true" />
            <span>{TICKET_REGISTRATION.profileReminder}</span>
          </p>
        )}
        {TICKET_REGISTRATION_ENABLED ? (
          !canBook ? (
            <button
              type="button"
              disabled
              className="audience-button ticket-register-button ticket-register-button-disabled"
              aria-describedby={`ticket-terms-${category ?? "event"}`}
            >
              Opens {pass?.opening}
              <sup aria-hidden="true">*</sup>
            </button>
          ) : referral.coupon ? (
            <ExternalLink
              href={referral.url}
              className="audience-button ticket-register-button"
              aria-describedby={`ticket-terms-${category ?? "event"}`}
            >
              Continue with saved code<sup aria-hidden="true">*</sup>
            </ExternalLink>
          ) : (
            <Link
              href="#registration"
              className="audience-button ticket-register-button"
              aria-describedby={`ticket-terms-${category ?? "event"}`}
            >
              {TICKET_REGISTRATION.buttonLabel}
              <sup aria-hidden="true">*</sup>
              <ArrowDown className="audience-icon" aria-hidden="true" />
            </Link>
          )
        ) : (
          <p className="audience-body">{TICKET_REGISTRATION.unavailableText}</p>
        )}
        <p className="audience-caption">
          {!canBook
            ? "This pass is listed now and will be bookable when its release opens."
            : referral.coupon
              ? "Opens KonfHub with your saved referral code so it can be applied at checkout."
              : TICKET_REGISTRATION.handoffText}
        </p>
      </div>
      {pass && (
        <div className="ticket-registration-schedule">
          <p>{TICKET_REGISTRATION.scheduleHeading}</p>
          <dl className="ticket-release-times">
            <div>
              <dt>Opens</dt>
              <dd>
                <time dateTime={pass.opensAt}>{releaseTime(pass.opensAt)}</time>
              </dd>
            </div>
            <div>
              <dt>Closes</dt>
              <dd>
                <time dateTime={pass.closesAt}>{releaseTime(pass.closesAt)}</time>
              </dd>
            </div>
          </dl>
        </div>
      )}
      <p className="ticket-final-sale" id={policyAnchor ? "attendee-policies" : undefined}>
        {TICKET_REGISTRATION.finalSaleText}
      </p>
      <p className="ticket-terms" id={`ticket-terms-${category ?? "event"}`}>
        <span aria-hidden="true">*</span>{" "}
        <Link href="/guidelines" className="audience-text-link ticket-guidelines-link">
          {TICKET_REGISTRATION.termsLabel}
        </Link>
      </p>
    </aside>
  );
}
