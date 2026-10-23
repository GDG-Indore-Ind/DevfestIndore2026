import type { Metadata } from "next";
import { EVENT } from "@/content/event";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CurrentTicketOffer from "@/components/tickets/CurrentTicketOffer";
import { TICKETS_PAGE as page } from "@/content/pages";
import { TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import { TICKET_REGISTRATION } from "@/content/tickets";

export const metadata: Metadata = {
  title: "Tickets",
  description:
    "Compare DevFest Indore 2026 passes, eligibility, inclusions and booking information for November 28 at Essentia Luxury Hotel.",
};

export default function TicketsPage() {
  return (
    <div className="audience-site ticket-journey space-subpage">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Your pass" },
          { id: "ticket-options", label: "Pass details" },
          ...(TICKET_REGISTRATION_ENABLED
            ? [{ id: "registration", label: TICKET_REGISTRATION.widgetHeading }]
            : []),
        ]}
      />
      <main id="main-content">
        <CurrentTicketOffer />
        <section className="pass-help">
          <div className="audience-wrap">
            <p>{page.supportText}</p>
            <a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">
              {EVENT.contactEmail}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
