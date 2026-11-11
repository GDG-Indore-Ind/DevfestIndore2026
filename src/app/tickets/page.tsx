import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import { pageMetadata } from "@/lib/pageMetadata";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CurrentTicketOffer from "@/components/tickets/CurrentTicketOffer";
import AmbassadorContact from "@/components/tickets/AmbassadorContact";
import ClosedPasses from "@/components/tickets/ClosedPasses";
import KonfHubRegistration from "@/components/tickets/KonfHubRegistration";
import { TICKETS_PAGE as page } from "@/content/pages";

export const metadata = pageMetadata(
  "/tickets",
  "Tickets",
  "Compare DevFest Indore 2026 passes, eligibility, inclusions and booking information for 28 November at Essentia Luxury Hotel.",
);

export default function TicketsPage() {
  return (
    <div className="audience-site ticket-journey space-subpage">
      <Navbar />
      <main id="main-content">
        <CurrentTicketOffer />
        {page.ambassadorContactEnabled && <AmbassadorContact />}
        <KonfHubRegistration />
        <ClosedPasses />
        <ContentActionGroup>
          <ContentAction href="/agenda" icon="microphone" tone="blue">
            See the agenda
          </ContentAction>
          <ContentAction href="/agenda/workshops" icon="calendar" tone="yellow">
            Workshops
          </ContentAction>
          <ContentAction href="/venue" icon="venue" tone="green">
            Venue & directions
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
