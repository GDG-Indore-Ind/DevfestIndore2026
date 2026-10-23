import { ArrowDown } from "lucide-react";
import { TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import { TICKET_REGISTRATION } from "@/content/tickets";

import styles from "./CurrentTicketOffer.module.css";

export default function PassBooking({ name }: { name: string }) {
  return TICKET_REGISTRATION_ENABLED ? (
    <a
      href="#registration"
      className={`audience-button ${styles.register}`}
      aria-label={`Register — ${name}`}
    >
      {TICKET_REGISTRATION.buttonLabel}
      <ArrowDown className="audience-icon" aria-hidden="true" />
    </a>
  ) : (
    <p>{TICKET_REGISTRATION.unavailableText}</p>
  );
}
