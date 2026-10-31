import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { OPEN_PASSES as passes } from "@/content/tickets";
import PassCard from "@/components/tickets/PassCard";
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
            <PassCard key={pass.id} pass={pass} />
          ))}
          {!passes.length && <p role="status">{page.endedLead}</p>}
        </div>
      </section>
    </>
  );
}
