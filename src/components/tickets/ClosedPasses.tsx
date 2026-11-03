import { CLOSED_PASSES as passes, TICKET_REGISTRATION } from "@/content/tickets";
import styles from "./CurrentTicketOffer.module.css";

/** Sold-out passes as one ruled row each, below the booking widget. */
export default function ClosedPasses() {
  if (!passes.length) return null;
  return (
    <section
      className={`audience-section ${styles.closedSection}`}
      id="closed-passes"
      aria-labelledby="closed-passes-title"
    >
      <div className="audience-wrap">
        <h2 id="closed-passes-title" className={styles.closedHeading}>
          {TICKET_REGISTRATION.closedHeading}
        </h2>
        <ul className={styles.closedList}>
          {passes.map((pass) => (
            <li key={pass.id}>
              <span>
                <strong>{pass.name}</strong> {pass.audience}
              </span>
              <span className={styles.status}>{TICKET_REGISTRATION.soldOutLabel}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
