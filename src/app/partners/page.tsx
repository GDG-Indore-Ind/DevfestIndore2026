import PartnerDirectory from "@/components/directory/PartnerDirectory";
import ReviewNotice from "@/components/directory/ReviewNotice";
import { DIRECTORY_COPY, getPublicOrganizations } from "@/content/directory";
import { DIRECTORY_ACTIVE, DIRECTORY_REVIEW } from "@/lib/directoryAccess";
import ContentAction from "@/components/shared/ContentAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import SponsorShowcase from "@/components/home/SponsorShowcase";
import ExternalLink from "@/components/shared/ExternalLink";
import { EVENT } from "@/content/event";
import { PARTNERS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "/partners",
  page.sectionLabel,
  page.revealed ? page.description : page.revealDescription,
);

export default function PartnersPage() {
  return (
    <div className="audience-site space-subpage practical-page partners-page">
      <ReviewNotice />
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Overview" },
          ...(page.revealed ? [{ id: "current-partners", label: "Our partners" }] : []),
          { id: "partner-application", label: "Get involved" },
        ]}
      />
      <main id="main-content">
        <div id={page.revealed ? undefined : "current-partners"}>
          <PageIntro
            title={DIRECTORY_ACTIVE ? DIRECTORY_COPY.partners.title : page.title}
            lead={
              DIRECTORY_ACTIVE
                ? DIRECTORY_COPY.partners.lead
                : page.revealed
                  ? page.lead
                  : page.revealLead
            }
            motif="partners"
          />
        </div>
        {DIRECTORY_ACTIVE ? (
          <div className="audience-wrap" id="current-partners">
            <PartnerDirectory organizations={getPublicOrganizations()} preview={DIRECTORY_REVIEW} />
          </div>
        ) : (
          page.revealed && (
            <div id="current-partners">
              <SponsorShowcase showIntro={false} showEcosystem={false} />
            </div>
          )
        )}
        <section
          className="audience-section practical-application"
          id="partner-application"
          aria-labelledby="partner-application-title"
        >
          <div className="audience-wrap practical-split">
            <div>
              <h2 id="partner-application-title">{page.applicationTitle}</h2>
              <ul className="practical-contributions">
                {page.applicationPoints.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="partner-application-action">
              <p className="audience-body">{page.applicationText}</p>
              <ExternalLink
                href={EVENT.links.partnerApplication}
                className="audience-button space-primary-button"
              >
                {page.applicationButton}
              </ExternalLink>
            </div>
          </div>
        </section>
        <div className="audience-wrap practical-next-links">
          <ContentAction href="/past-events" icon="history" tone="blue">
            {page.archiveLabel}
          </ContentAction>
          <ContentAction href="/team" icon="people" tone="green">
            Meet the team
          </ContentAction>
        </div>
      </main>
      <Footer />
    </div>
  );
}
