import { CLOSED_PASSES as passes, TICKET_REGISTRATION } from "@/content/tickets";
import PassCard from "@/components/tickets/PassCard";
import styles from "./CurrentTicketOffer.module.css";

export default function ClosedPasses() {
  if (!passes.length) return null;
  return (
    <section
      className={`audience-section ${styles.root} ${styles.closedSection}`}
      id="closed-passes"
      aria-labelledby="closed-passes-title"
    >
      <div className="audience-wrap">
        <h2 id="closed-passes-title" className={styles.closedHeading}>
          {TICKET_REGISTRATION.closedHeading}
        </h2>
        <div className={styles.grid}>
          {passes.map((pass) => (
            <PassCard key={pass.id} pass={pass} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
