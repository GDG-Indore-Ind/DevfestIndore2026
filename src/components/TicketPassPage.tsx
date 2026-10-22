"use client";

import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import RegistrationReminder from "@/components/RegistrationReminder";
import OrbitScrollRail from "@/components/OrbitScrollRail";
import PassBooking from "@/components/PassBooking";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import { getPublicPass, type PublicPassId } from "@/content/tickets";

export default function TicketPassPage({ category }: { category: PublicPassId }) {
  const visiblePasses = useTicketRelease();
  if (!visiblePasses.some((pass) => pass.id === category)) return <div className="audience-site space-subpage"><Navbar /><main id="main-content"><PageIntro title="Find your next orbit." lead="Passes open in phases. See the current release for dates, eligibility and booking details." motif="tickets" /><section className="audience-section"><div className="audience-wrap"><Link href="/tickets" className="audience-button space-primary-button">Get tickets<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div></section></main><Footer /></div>;
  const pass = getPublicPass(category);
  return (
    <div className={`audience-site space-subpage ticket-journey ticket-journey-${category}`}>
      <Navbar />
      <main id="main-content">
        <PageIntro title={pass.name} titleId="pass-title" lead={pass.description} motif="tickets" meta={<><Link href="/tickets" className="space-intro-back"><ArrowLeft className="audience-icon" aria-hidden="true" />All tickets</Link><span>{EVENT_SHORT_DATE} · {EVENT.venue.name}</span></>} />
        <RegistrationReminder />
        <section className="audience-section ticket-pass-content" aria-labelledby="pass-details-title"><div className="audience-wrap ticket-pass-content-grid">
          <div><h2 id="pass-details-title">What’s included</h2><ul className="ticket-detail-benefits">{pass.benefits.map((benefit) => <li key={benefit}><Check className="audience-icon" aria-hidden="true" />{benefit}</li>)}</ul>
            <aside className="ticket-path-eligibility"><ShieldCheck className="audience-icon" aria-hidden="true" /><div><h3>{category === "vip" ? "Private code required" : "Who can book"}</h3><p>{pass.eligibility}</p></div></aside>
            <p className={`pass-detail-note ${category === "observer" ? "pass-detail-exclusion" : ""}`}>{pass.note}</p>
          </div>
          <PassBooking key={category} category={category} />
        </div></section>
        <section className="ticket-path-support" id="pass-support"><div className="audience-wrap"><p>Plan before you book.</p><div><Link href="/tickets">Current release <ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/guidelines">Registration guidelines <ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/venue">Venue & directions <ArrowRight className="audience-icon" aria-hidden="true" /></Link></div></div></section>
      </main><Footer /><OrbitScrollRail stops={[{ id: "page-overview", label: "Your pass" }, { id: "pass-details-title", label: "Pass details" }, { id: "pass-support", label: "More help" }]} />
    </div>
  );
}
