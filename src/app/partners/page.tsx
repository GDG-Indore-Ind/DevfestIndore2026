import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
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
    <div className={`audience-site space-subpage practical-page partners-page ${styles.root}`}>
      <Navbar />
      <main id="main-content">
        <div id={page.revealed ? undefined : "current-partners"}>
          <PageIntro
            title={page.title}
            lead={page.revealed ? page.lead : page.revealLead}
            motif="partners"
          />
        </div>
        {page.revealed && (
          <div id="current-partners">
            <SponsorShowcase showIntro={false} />
          </div>
        )}
        <section
          className={`audience-section practical-application ${styles.application}`}
          id="partner-application"
          aria-labelledby="partner-application-title"
        >
          <div className={`audience-wrap practical-split ${styles.split}`}>
            <div>
              <h2 id="partner-application-title">{page.applicationTitle}</h2>
              <ul className={`practical-contributions ${styles.contributions}`}>
                {page.applicationPoints.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`partner-application-action ${styles.action}`}>
              <p className="audience-body">{page.applicationText}</p>
              <ContentAction
                href={EVENT.links.partnerApplication}
                icon="partners"
                tone="green"
                external
              >
                {page.applicationButton}
              </ContentAction>
            </div>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/archive" icon="history" tone="blue">
            {page.archiveLabel}
          </ContentAction>
          <ContentAction href="/team" icon="people" tone="green">
            Meet the team
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
