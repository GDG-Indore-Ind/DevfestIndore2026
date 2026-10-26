import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { Check } from "lucide-react";
import {
  VISIBLE_PASSES as passes,
  formatPassPrice,
  TICKET_REGISTRATION,
  TICKET_BENEFIT_GROUPS,
} from "@/content/tickets";
import PassBooking from "@/components/tickets/PassBooking";
import PageIntro from "@/components/shared/PageIntro";
import { TICKETS_PAGE as page } from "@/content/pages";
import styles from "./CurrentTicketOffer.module.css";

export default function CurrentTicketOffer() {
  return (
    <>
      <PageIntro
        title={page.title}
        titleId="current-ticket-title"
        motif="tickets"
        meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`}
        lead={passes.length ? page.lead : page.endedLead}
      />
      <section
        className={`audience-section ${styles.root}`}
        id="ticket-options"
        aria-label="Pass details"
      >
        <div className={`audience-wrap ${styles.grid}`}>
          {passes.map((pass) => (
            <article key={pass.id} className={styles.card}>
              <p className={styles.audience}>{pass.audience}</p>
              <h2>{pass.name}</h2>
              {pass.price !== undefined && <p className={styles.price}>{formatPassPrice(pass)}</p>}
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
              ) : (
                <PassBooking name={pass.name} />
              )}
            </article>
          ))}
          {!passes.length && <p role="status">{page.endedLead}</p>}
        </div>
      </section>
    </>
  );
}
