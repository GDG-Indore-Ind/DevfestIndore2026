"use client";

import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { Check } from "lucide-react";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import PassBooking from "@/components/tickets/PassBooking";
import PageIntro from "@/components/shared/PageIntro";
import { TICKETS_PAGE as page } from "@/content/pages";
import styles from "./CurrentTicketOffer.module.css";

export default function CurrentTicketOffer() {
  const { passes } = useTicketRelease();
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
              <ul className={styles.benefits}>
                {pass.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <details className={styles.details}>
                <summary>
                  Pass details<span className="sr-only"> for {pass.name}</span>
                </summary>
                <p>{pass.description}</p>
                <h3>Who can book</h3>
                <p>{pass.eligibility}</p>
                {pass.note && <p>{pass.note}</p>}
              </details>
              <PassBooking name={pass.name} />
            </article>
          ))}
          {!passes.length && <p role="status">{page.endedLead}</p>}
        </div>
      </section>
    </>
  );
}
