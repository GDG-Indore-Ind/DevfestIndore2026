import type { Metadata } from "next";
import { EVENT } from "@/content/event";
import { FAQ_PAGE as page } from "@/content/pages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import OrbitScrollRail from "@/components/OrbitScrollRail";
import FaqSection from "@/components/FaqSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Common questions", description: "Practical answers about DevFest Indore 2026: passes, entry, release dates, student ID, the venue and ticket policies." };

export default function FaqPage() {
  return (
    <div className="audience-site space-subpage space-faq-page">
      <Navbar />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="guide" />
        <FaqSection kind="event" />
        <div className="audience-ticket-band"><FaqSection kind="tickets" /></div>
        <div className="audience-wrap practical-next-links"><Link href="/guidelines" className="audience-text-link">Full registration guidelines<ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/venue" className="audience-text-link">Venue & directions<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div>
        <div className="audience-wrap faq-support-line"><p>{page.contactText}</p><a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">{EVENT.contactEmail}</a></div>
      </main>
      <Footer />
      <OrbitScrollRail stops={[{ id: "page-overview", label: "Overview" }, { id: "questions-event", label: "The day" }, { id: "questions-tickets", label: "Tickets" }]} />
    </div>
  );
}
