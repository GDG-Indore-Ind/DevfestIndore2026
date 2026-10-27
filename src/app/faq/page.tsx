import ContentAction from "@/components/shared/ContentAction";
import { pageMetadata } from "@/lib/pageMetadata";
import { FAQ_PAGE as page } from "@/content/pages";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import FaqSection from "@/components/shared/FaqSection";

export const metadata = pageMetadata(
  "/faq",
  "Common questions",
  "Practical answers about DevFest Indore 2026: pass inclusions, entry, student ID, the venue and ticket policies.",
);

export default function FaqPage() {
  return (
    <div className="audience-site space-subpage space-faq-page">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Overview" },
          { id: "questions-event", label: "The day" },
          { id: "questions-tickets", label: "Tickets" },
        ]}
      />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="guide" />
        <FaqSection kind="event" />
        <div className="audience-ticket-band">
          <FaqSection kind="tickets" />
        </div>
        <div className="audience-wrap practical-next-links">
          <ContentAction href="/guidelines" icon="guidelines" tone="blue">
            Full registration guidelines
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
