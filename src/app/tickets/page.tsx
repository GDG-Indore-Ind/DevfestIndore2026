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
      </main>
      <Footer />
    </div>
  );
}
