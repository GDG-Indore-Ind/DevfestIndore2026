import ContentAction from "@/components/shared/ContentAction";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ExternalLink from "@/components/shared/ExternalLink";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { GUIDELINES_PAGE as page } from "@/content/pages";
import { REGISTRATION_CHECKLIST, TICKET_POLICIES, getPublicPass } from "@/content/tickets";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/guidelines", page.title, page.description);

export default function GuidelinesPage() {
  return (
    <div className="audience-site space-subpage practical-page">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Overview" },
          { id: "before-booking", label: "Before booking" },
          { id: "entry", label: "Check-in" },
          { id: "eligibility", label: "Pass requirements" },
          { id: "ticket-policy", label: "Ticket policy" },
          { id: "support", label: "Help & conduct" },
        ]}
      />
      <main id="main-content">
        <PageIntro
          title={page.title}
          lead={page.lead}
          motif="guide"
          meta={
            <span>
              {EVENT.name} · {EVENT_SHORT_DATE}
            </span>
          }
        />
        <div className="audience-wrap practical-guide-layout">
          <nav className="practical-guide-nav" aria-label={page.navigationLabel}>
            <p>{page.navigationLabel}</p>
            {page.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
            <Link href="/tickets" className="audience-button space-primary-button">
              Get tickets
            </Link>
          </nav>
          <div className="practical-guide-body">
            {page.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="practical-guide-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.id === "before-booking" && (
                  <>
                    {REGISTRATION_CHECKLIST.map((item) => (
                      <div className="practical-policy" key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </>
                )}
                {section.policyIds.map((id) => {
                  const policy = TICKET_POLICIES.find((item) => item.id === id)!;
                  return (
                    <article className="practical-policy" key={id}>
                      {policy.appliesTo && (
                        <p className="practical-policy-scope">
                          {policy.appliesTo.map((passId) => getPublicPass(passId).name).join(" · ")}
                        </p>
                      )}
                      <h3>{policy.title}</h3>
                      <p>{policy.text}</p>
                    </article>
                  );
                })}
                {section.id === "support" && (
                  <div className="practical-support">
                    <ExternalLink href={EVENT.links.codeOfConduct} className="audience-text-link">
                      Code of conduct
                    </ExternalLink>
                  </div>
                )}
              </section>
            ))}
            <div className="practical-next-links">
              <ContentAction href="/venue" icon="venue" tone="red">
                Plan your arrival
              </ContentAction>
              <ContentAction href="/faq" icon="guidelines" tone="green">
                Common questions
              </ContentAction>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
