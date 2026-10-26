import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import AmbassadorDirectory from "./AmbassadorDirectory";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

export const metadata = pageMetadata("/ambassadors", page.title, page.description);

export default function AmbassadorsPage() {
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="people" />
        <section className="audience-section" aria-labelledby="ambassador-directory-title">
          <div className="audience-wrap">
            <h2 id="ambassador-directory-title">{page.directoryTitle}</h2>
            <p className={styles.lead}>{page.directoryLead}</p>
            <AmbassadorDirectory
              ambassadors={AMBASSADOR_DIRECTORY.map(({ person, community, socials }) => ({
                id: person.id,
                name: person.name,
                community,
                linkedin: socials.linkedin,
              }))}
              copy={{
                searchLabel: page.searchLabel,
                searchPlaceholder: page.searchPlaceholder,
                emptyTitle: page.emptyTitle,
                emptyText: page.emptyText,
                ambassadorSingular: page.ambassadorSingular,
                ambassadorPlural: page.ambassadorPlural,
              }}
            />
          </div>
        </section>
        <section className="audience-section" aria-labelledby="ambassador-steps-title">
          <div className="audience-wrap">
            <h2 id="ambassador-steps-title">{page.stepsTitle}</h2>
            <ol className={styles.steps}>
              {page.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <Link href="/tickets" className="audience-text-link">
              {page.ticketsLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
