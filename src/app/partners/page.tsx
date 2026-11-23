import ContentAction from "@/components/shared/ContentAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
        <div id="page-overview">
          <header id="partner-application" className={`audience-wrap ${styles.header}`}>
            <div>
              <h1>{page.title}</h1>
              {!page.revealed && <p>{page.revealText}</p>}
            </div>
            <ContentAction
              href={EVENT.links.partnerApplication}
              icon="partners"
              tone="green"
              external
            >
              {page.applicationButton}
            </ContentAction>
          </header>
        </div>
        <div id="current-partners">{page.revealed && <SponsorShowcase showIntro={false} />}</div>
        <div className={`audience-wrap ${styles.communities}`}>
          <CommunitySupporters headingLevel={2} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
