import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import SponsorShowcase from "@/components/SponsorShowcase";
import ExternalLink from "@/components/ExternalLink";
import OrbitScrollRail from "@/components/OrbitScrollRail";
import { EVENT } from "@/content/event";
import { PARTNERS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/partners", "Partners & collaborators", page.revealed ? page.description : page.revealDescription);

export default function PartnersPage() {
  return <div className="audience-site space-subpage practical-page partners-page">
    <Navbar /><main id="main-content">
      <PageIntro title={page.title} lead={page.revealed ? page.lead : page.revealLead} motif="partners" meta={<a href="#partner-application" className="audience-text-link">{page.applicationButton}<ArrowRight className="audience-icon" aria-hidden="true" /></a>} />
      <div id="current-partners"><SponsorShowcase showIntro={false} /></div>
      <section className="audience-section practical-application" id="partner-application" aria-labelledby="partner-application-title"><div className="audience-wrap practical-split">
        <div><p className="audience-overline">Call for partners</p><h2 id="partner-application-title">{page.applicationTitle}</h2><p className="audience-body">{page.applicationText}</p><ExternalLink href={EVENT.links.partnerApplication} className="audience-button space-primary-button">{page.applicationButton}</ExternalLink><p className="audience-caption">{page.contactText} <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a></p></div>
        <ul className="practical-contributions">{page.applicationPoints.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>
      </div></section>
      <div className="audience-wrap practical-next-links"><Link href="/past-events" className="audience-text-link">{page.archiveLabel}<ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/team" className="audience-text-link">Meet the team<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div>
    </main><Footer /><OrbitScrollRail stops={[{ id: "page-overview", label: "Overview" }, { id: "current-partners", label: "Our partners" }, { id: "partner-application", label: "Get involved" }]} />
  </div>;
}
