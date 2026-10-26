"use client";

import Link from "next/link";
import ExternalLink from "@/components/shared/ExternalLink";
import { TICKET_REGISTRATION_ENABLED, TICKET_WIDGET_URL } from "@/content/booking";
import { TICKET_REGISTRATION as copy } from "@/content/tickets";
import { useReferral } from "@/hooks/useReferral";

import styles from "./KonfHubRegistration.module.css";

export default function KonfHubRegistration() {
  const referral = useReferral();

  if (!TICKET_REGISTRATION_ENABLED) return null;
  return (
    <section
      className={`audience-section ${styles.root}`}
      id="registration"
      aria-labelledby="registration-title"
    >
      <div className="audience-wrap">
        <div className={styles.heading}>
          <h2 id="registration-title">{copy.widgetHeading}</h2>
          <p>{copy.widgetLead}</p>
        </div>
        <div id="attendee-policies" className={styles.policies}>
          <p className={styles.referral}>{copy.profileReminder}</p>
          <p className={styles.referral}>{copy.finalSaleText}</p>
        </div>
        <p className={styles.terms}>
          <Link href="/guidelines" className="audience-text-link">
            {copy.termsLabel}
          </Link>
        </p>
        {referral.coupon && (
          <p className={styles.referral}>
            <strong>{referral.coupon}</strong> — {copy.referralText}
          </p>
        )}
        <div className={styles.window}>
          <iframe
            src={TICKET_WIDGET_URL}
            id="konfhub-widget"
            title={copy.widgetTitle}
            width="100%"
            height="500"
            allow="payment"
            loading="lazy"
          />
        </div>
        <div className={styles.fallback}>
          <p>{copy.fallbackText}</p>
          <ExternalLink href={referral.url} className="audience-text-link">
            {copy.fallbackLabel}
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
