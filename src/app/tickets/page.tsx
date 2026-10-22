import type { Metadata } from "next";
import { EVENT } from "@/content/event";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CurrentTicketOffer from "@/components/CurrentTicketOffer";
import OrbitScrollRail from "@/components/OrbitScrollRail";
import { TICKETS_PAGE as page } from "@/content/pages";

export const metadata: Metadata = { title: "Tickets", description: "Join DevFest Indore 2026. View the current pass release, what’s included and booking information for November 28 at Essentia Luxury Hotel." };

export default function TicketsPage() {
  return <div className="audience-site ticket-journey space-subpage"><Navbar /><main id="main-content"><CurrentTicketOffer /><section className="pass-help"><div className="audience-wrap"><p>{page.supportText}</p><a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">{EVENT.contactEmail}</a></div></section></main><Footer /><OrbitScrollRail stops={[{ id: "page-overview", label: "Your pass" }, { id: "ticket-options", label: "Pass details" }, { id: "attendee-policies", label: "Before you book" }]} /></div>;
}
