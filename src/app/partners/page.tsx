import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import SectionHeader from "@/components/shared/SectionHeader";
import CommunitySupporters from "@/components/home/CommunitySupporters";
import SponsorShowcase from "@/components/home/SponsorShowcase";
import { EVENT } from "@/content/event";
import { PARTNERS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

export const metadata = pageMetadata(
  "/partners",
  page.sectionLabel,
  page.revealed ? page.description : page.revealDescription,
);

export default function PartnersPage() {
  return (
    <div className="audience-site space-subpage practical-page partners-page">
      <Navbar />
      <main id="main-content">
        <div id={page.revealed ? undefined : "current-partners"}>
          <PageIntro
            title={page.title}
            lead={page.revealed ? page.lead : page.revealLead}
            motif="partners"
          >
            <div className={styles.introActions}>
              {page.revealed && (
                <ContentAction href="#current-partners" icon="people">
                  {page.currentPartnersLabel}
                </ContentAction>
              )}
              <ContentAction href="#partner-application" icon="partners" tone="green">
                {page.applicationButton}
              </ContentAction>
            </div>
          </PageIntro>
        </div>
        {page.revealed && (
          <div id="current-partners">
            <SponsorShowcase showIntro={false} />
          </div>
        )}
        <div className="audience-wrap">
          <CommunitySupporters />
        </div>
        <section
          className={`audience-section ${styles.application}`}
          id="partner-application"
          aria-labelledby="partner-application-title"
        >
          <div className="audience-wrap">
            <SectionHeader
              id="partner-application-title"
              title={page.applicationTitle}
              lead={page.applicationText}
              action={
                <ContentAction
                  href={EVENT.links.partnerApplication}
                  icon="partners"
                  tone="green"
                  external
                >
                  {page.applicationButton}
                </ContentAction>
              }
            />
            <ul className={styles.contributions}>
              {page.applicationPoints.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/archive" icon="history" tone="blue">
            {page.archiveLabel}
          </ContentAction>
          <ContentAction href="/team" icon="people" tone="green">
            Team
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
