import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import ExternalLink from "@/components/ExternalLink";
import RegistrationReminder from "@/components/RegistrationReminder";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { GUIDELINES_PAGE as page } from "@/content/pages";
import { REGISTRATION_CHECKLIST, TICKET_POLICIES, getPublicPass } from "@/content/tickets";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/guidelines", page.title, page.description);

export default function GuidelinesPage() {
  return <div className="audience-site space-subpage practical-page">
    <Navbar />
    <main id="main-content">
      <PageIntro title={page.title} lead={page.lead} motif="guide" meta={<span>{EVENT.name} · {EVENT_SHORT_DATE}</span>} />
      <div className="audience-wrap practical-guide-layout">
        <nav className="practical-guide-nav" aria-label={page.navigationLabel}>
          <p>{page.navigationLabel}</p>
          {page.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}<ArrowRight aria-hidden="true" /></a>)}
          <Link href="/tickets" className="audience-button space-primary-button">Get tickets</Link>
        </nav>
        <div className="practical-guide-body">
          {page.sections.map(section => <section key={section.id} id={section.id} className="practical-guide-section" aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.id === "before-booking" && <>
              <RegistrationReminder contained />
              {REGISTRATION_CHECKLIST.slice(1).map(item => <div className="practical-policy" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}
            </>}
            {section.policyIds.map(id => {
              const policy = TICKET_POLICIES.find(item => item.id === id)!;
              return <article className="practical-policy" key={id}>
                {policy.appliesTo && <p className="practical-policy-scope">{policy.appliesTo.map(passId => getPublicPass(passId).name).join(" · ")}</p>}
                <h3>{policy.title}</h3><p>{policy.text}</p>
              </article>;
            })}
            {section.id === "support" && <div className="practical-support"><p>{page.supportText}</p><a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">{page.supportLabel}<ArrowRight className="audience-icon" aria-hidden="true" /></a><ExternalLink href={EVENT.links.codeOfConduct} className="audience-text-link">Code of conduct</ExternalLink></div>}
          </section>)}
          <div className="practical-next-links"><Link href="/venue" className="audience-text-link">Plan your arrival<ArrowRight className="audience-icon" aria-hidden="true" /></Link><Link href="/faq" className="audience-text-link">Common questions<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}
