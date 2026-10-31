import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  formatPassPrice,
  TICKET_BENEFIT_GROUPS,
  TICKET_REGISTRATION,
  type PublicPass,
} from "@/content/tickets";
import { TICKETS_PAGE } from "@/content/pages";
import PassBooking from "@/components/tickets/PassBooking";
import styles from "./CurrentTicketOffer.module.css";

export default function PassCard({
  pass,
  headingLevel: Heading = "h2",
}: {
  pass: PublicPass;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article className={`${styles.card} ${pass.soldOut ? styles.closed : ""}`}>
      <p className={styles.audience}>{pass.audience}</p>
      <Heading>{pass.name}</Heading>
      {pass.price !== undefined && <p className={styles.price}>{formatPassPrice(pass)}</p>}
      {pass.offer && !pass.soldOut && <p className={styles.offer}>{pass.offer}</p>}
      <div className={styles.benefitGroups}>
        {TICKET_BENEFIT_GROUPS.map((group) => {
          const benefits = pass.benefits.filter((benefit) => benefit.group === group.id);
          if (!benefits.length) return null;
          return (
            <div key={group.id} className={styles.benefitGroup}>
              <h3>{group.label}</h3>
              <ul className={styles.benefits}>
                {benefits.map((benefit) => (
                  <li key={benefit.label}>
                    <Check aria-hidden="true" />
                    <span>
                      {benefit.label}
                      {benefit.detail && <small>{benefit.detail}</small>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className={styles.eligibility}>{pass.eligibility}</p>
      {pass.note && (
        <details className={styles.details}>
          <summary>
            Conditions<span className="sr-only"> for {pass.name}</span>
          </summary>
          <p>{pass.note}</p>
        </details>
      )}
      {pass.soldOut ? (
        <p className={styles.status}>{TICKET_REGISTRATION.soldOutLabel}</p>
      ) : pass.bookingRoute === "ambassador" ? (
        <Link
          href="/ambassadors"
          className={`audience-button ${styles.register}`}
          aria-label={`${TICKETS_PAGE.studentButtonLabel} — ${pass.name}`}
        >
          {TICKETS_PAGE.studentButtonLabel}
          <ArrowRight className="audience-icon" aria-hidden="true" />
        </Link>
      ) : (
        <PassBooking name={pass.name} />
      )}
    </article>
  );
}
