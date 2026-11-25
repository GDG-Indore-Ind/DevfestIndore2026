import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { CLOSED_PASSES, OPEN_PASSES as passes } from "@/content/tickets";
import PassCard from "@/components/tickets/PassCard";
import PageIntro from "@/components/shared/PageIntro";
import { TICKETS_PAGE as page } from "@/content/pages";
import styles from "./CurrentTicketOffer.module.css";

export default function CurrentTicketOffer() {
  const standardSoldOut = CLOSED_PASSES.some(
    (pass) => pass.id === "student" || pass.id === "professional",
  );
  return (
    <>
      <PageIntro
        title={page.title}
        titleId="current-ticket-title"
        motif="tickets"
        meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`}
        lead={passes.length ? page.lead : page.endedLead}
      />
      {standardSoldOut && passes.length > 0 && (
        <div className="audience-wrap">
          <aside className={styles.notice} aria-labelledby="sold-out-title">
            <h2 id="sold-out-title">{page.soldOutTitle}</h2>
            <p>{page.soldOutText}</p>
            <ul>
              <li>{page.soldOutFlightDeck}</li>
              <li>{page.soldOutLastOrbit}</li>
              <li>{page.soldOutObserver}</li>
            </ul>
            <p>{page.soldOutPrizes}</p>
          </aside>
        </div>
      )}
      <section
        className={`audience-section ${styles.root}`}
        id="ticket-options"
        aria-label="Pass details"
      >
        <div className={`audience-wrap ${styles.grid}`}>
          {passes.map((pass) => (
            <PassCard key={pass.id} pass={pass} />
          ))}
          {!passes.length && <p role="status">{page.endedLead}</p>}
        </div>
      </section>
    </>
  );
}
