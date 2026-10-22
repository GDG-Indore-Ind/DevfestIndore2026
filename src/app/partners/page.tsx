import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import SponsorShowcase from "@/components/SponsorShowcase";
import ExternalLink from "@/components/ExternalLink";
import { EVENT } from "@/content/event";
import { PARTNERS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/partners", "Partners & collaborators", page.revealed ? page.description : page.revealDescription);

export default function PartnersPage() {
  return <div className="audience-site space-subpage practical-page partners-page">
    <Navbar flightStops={[{ id: "page-overview", label: "Overview" }, ...(page.revealed ? [{ id: "current-partners", label: "Our partners" }] : []), { id: "partner-application", label: "Get involved" }]} /><main id="main-content">
      <div id={page.revealed ? undefined : "current-partners"}><PageIntro title={page.title} lead={page.revealed ? page.lead : page.revealLead} motif="partners" /></div>
      {page.revealed && <div id="current-partners"><SponsorShowcase showIntro={false} showEcosystem={false} /></div>}
      <section className="audience-section practical-application" id="partner-application" aria-labelledby="partner-application-title"><div className="audience-wrap practical-split">
        <div><h2 id="partner-application-title">{page.applicationTitle}</h2><ul className="practical-contributions">{page.applicationPoints.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul></div>
        <div className="partner-application-action"><p className="audience-body">{page.applicationText}</p><ExternalLink href={EVENT.links.partnerApplication} className="audience-button space-primary-button">{page.applicationButton}</ExternalLink><p className="audience-caption">{page.contactText} <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a></p></div>
      </div></section>
      <div className="audience-wrap practical-next-links"><Link href="/past-events" className="audience-text-link">{page.archiveLabel}<ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/team" className="audience-text-link">Meet the team<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div>
    </main><Footer />
  </div>;
}
