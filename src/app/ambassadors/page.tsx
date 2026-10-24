import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ProfileLinks from "@/components/shared/ProfileLinks";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { EVENT } from "@/content/event";
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
            <div className={styles.directory}>
              {AMBASSADOR_DIRECTORY.map(({ person, community, preview, socials }) => (
                <article
                  key={person.id}
                  className={styles.profile}
                  aria-labelledby={`${person.id}-name`}
                >
                  {person.avatar && (
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={160}
                      height={160}
                      className={styles.photo}
                    />
                  )}
                  <div>
                    {preview && <p className={styles.preview}>{page.previewLabel}</p>}
                    <h3 id={`${person.id}-name`}>{person.name}</h3>
                    <p>{community}</p>
                    <ProfileLinks socials={socials} />
                  </div>
                </article>
              ))}
            </div>
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
            <div className={styles.contact}>
              <h2>{page.contactTitle}</h2>
              <p>{page.contactText}</p>
              <div className={styles.actions}>
                <a
                  href={`mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(page.emailSubject)}`}
                  className="audience-button"
                >
                  {page.contactLabel}
                </a>
                <Link href="/tickets" className="audience-text-link">
                  {page.ticketsLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
