import Link from "next/link";
import StrongText from "@/components/shared/StrongText";
import { ArrowRight } from "lucide-react";
import { formatPassPrice, type PublicPass, type TicketBenefit } from "@/content/tickets";
import { TICKETS_PAGE } from "@/content/pages";
import { TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import BenefitGroups from "@/components/tickets/BenefitGroups";
import PassBooking from "@/components/tickets/PassBooking";
import styles from "./CurrentTicketOffer.module.css";

const benefitKey = (benefit: TicketBenefit) => `${benefit.group}:${benefit.label}`;

export default function PassCard({
  pass,
  commonBenefits = [],
}: {
  pass: PublicPass;
  commonBenefits?: TicketBenefit[];
}) {
  const commonKeys = new Set(commonBenefits.map(benefitKey));
  const extraBenefits = commonKeys.size
    ? pass.benefits.filter((benefit) => !commonKeys.has(benefitKey(benefit)))
    : pass.benefits;

  return (
    <article
      className={styles.card}
      data-featured={pass.id === "vip" || undefined}
      aria-labelledby={`pass-${pass.id}`}
    >
      <p className={styles.audience}>{pass.audience}</p>
      <div className={styles.title}>
        <h2 id={`pass-${pass.id}`}>{pass.name}</h2>
        {pass.price !== undefined && <p className={styles.price}>{formatPassPrice(pass)}</p>}
      </div>
      {pass.offers?.map((offer) => (
        <p key={offer} className={styles.offer}>
          {offer}
        </p>
      ))}
      {extraBenefits.length > 0 ? (
        <BenefitGroups benefits={extraBenefits} />
      ) : (
        <p className={styles.description}>{pass.description}</p>
      )}
      <ul className={styles.eligibility}>
        {pass.eligibility.map((item) => (
          <li key={item}>
            <StrongText text={item} />
          </li>
        ))}
      </ul>
      {pass.note && (
        <details className={styles.details}>
          <summary>
            Conditions<span className="sr-only"> for {pass.name}</span>
          </summary>
          <p>{pass.note}</p>
        </details>
      )}
      {pass.bookingRoute === "ambassador" ? (
        <>
          <Link
            href="/ambassadors#ambassador-directory-title"
            className={`audience-button space-primary-button ${styles.register}`}
            aria-label={`${TICKETS_PAGE.studentButtonLabel} — ${pass.name}`}
          >
            {TICKETS_PAGE.studentButtonLabel}
            <ArrowRight className="audience-icon" aria-hidden="true" />
          </Link>
          {TICKET_REGISTRATION_ENABLED && (
            <>
              {" "}
              <a href="#registration" className="audience-text-link">
                {TICKETS_PAGE.studentCheckoutLabel}
              </a>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <PassBooking name={pass.name} />
        </>
      )}
    </article>
  );
}
