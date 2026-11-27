import type { TicketBenefit } from "@/content/tickets";
import BenefitGroups from "@/components/tickets/BenefitGroups";
import styles from "./CurrentTicketOffer.module.css";

/** Inclusions common to every open pass, hoisted out of individual pass cards. */
export default function PassInclusions({ benefits }: { benefits: TicketBenefit[] }) {
  if (!benefits.length) return null;
  return (
    <section
      className={`audience-section ${styles.inclusionsSection}`}
      id="pass-inclusions"
      aria-labelledby="every-pass-includes-title"
    >
      <div className="audience-wrap">
        <div className={styles.inclusionsCard}>
          <h2 id="every-pass-includes-title" className={styles.inclusionsTitle}>
            Every pass includes
          </h2>
          <BenefitGroups benefits={benefits} layout="columns" />
        </div>
      </div>
    </section>
  );
}
