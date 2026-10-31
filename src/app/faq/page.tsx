import ContentAction from "@/components/shared/ContentAction";
import { pageMetadata } from "@/lib/pageMetadata";
import { FAQ_PAGE as page } from "@/content/pages";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import FaqSection from "@/components/shared/FaqSection";
import RegistrationGuidelines from "@/components/tickets/RegistrationGuidelines";

export const metadata = pageMetadata(
  "/faq",
  page.title,
  "Answers about DevFest Indore 2026 plus the full registration guidelines: pass eligibility, photo ID, check-in, workshops and ticket policies.",
);

export default function FaqPage() {
  return (
    <div className="audience-site space-subpage space-faq-page">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Overview" },
          { id: "questions-event", label: "The day" },
          { id: "questions-tickets", label: "Tickets" },
          { id: "registration-guidelines", label: "Guidelines" },
        ]}
      />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="guide" />
        <FaqSection kind="event" />
        <div className="audience-ticket-band">
          <FaqSection kind="tickets" />
        </div>
        <RegistrationGuidelines />
        <div className="audience-wrap practical-next-links">
          <ContentAction href="/tickets" icon="tickets" tone="blue">
            Get tickets
          </ContentAction>
          <ContentAction href="/venue" icon="venue" tone="red">
            Venue & directions
          </ContentAction>
        </div>
      </main>
      <Footer />
    </div>
  );
}
