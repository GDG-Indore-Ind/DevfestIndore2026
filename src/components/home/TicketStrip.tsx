import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_PAGE } from "@/content/pages";
import { OPEN_PASSES, formatPassPrice } from "@/content/tickets";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./TicketStrip.module.css";

export default function TicketStrip() {
  const copy = HOME_PAGE.ticketStrip;
  if (!OPEN_PASSES.length) return null;
  return (
    <section
      id="home-tickets"
      className={`audience-section ${styles.root}`}
      aria-labelledby="home-tickets-title"
    >
      <div className="audience-wrap">
        <div className={styles.heading}>
          <h2 id="home-tickets-title">{copy.title}</h2>
          <p>{copy.lead}</p>
        </div>
        <ul className={styles.passes}>
          {OPEN_PASSES.map((pass) => {
            const student = pass.bookingRoute === "ambassador";
            return (
              <li key={pass.id} className={styles.pass}>
                <div>
                  <p className={styles.audience}>{pass.audience}</p>
                  <h3>
                    {pass.name} <span>{formatPassPrice(pass)}</span>
                  </h3>
                  {pass.offer && <p className={styles.offer}>{pass.offer}</p>}
                </div>
                <Link
                  href={student ? "/ambassadors" : "/tickets#registration"}
                  className="audience-button space-primary-button"
                >
                  {student ? copy.studentLabel : copy.professionalLabel}
                  <ArrowRight className="audience-icon" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <ContentAction href="/tickets" icon="tickets" tone="blue">
          {copy.allTicketsLabel}
        </ContentAction>
      </div>
    </section>
  );
}
