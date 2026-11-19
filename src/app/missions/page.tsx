import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NumberedSteps from "@/components/shared/NumberedSteps";
import SectionHeader from "@/components/shared/SectionHeader";
import PageIntro from "@/components/shared/PageIntro";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import { MISSIONS_COPY as page } from "@/content/copy";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

export const metadata = pageMetadata("/missions", page.title, page.description);

export default function MissionsPage() {
  if (!SITE.missionsEnabled) notFound();
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="tickets" meta={page.hashtag} />
        <section className="audience-section" aria-labelledby="mission-steps-title">
          <div className="audience-wrap">
            <SectionHeader id="mission-steps-title" title={page.stepsTitle} />
            <NumberedSteps steps={page.steps} />
            <blockquote className={styles.example}>“{page.example}”</blockquote>
            <div className={styles.submit}>
              {SITE.missionsFormUrl ? (
                <a
                  href={SITE.missionsFormUrl}
                  className="audience-button space-primary-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.submitLabel}
                  <ArrowUpRight className="audience-icon" aria-hidden="true" />
                </a>
              ) : (
                <p role="status">{page.submitPending}</p>
              )}
            </div>
          </div>
        </section>
        <section className="audience-section" aria-labelledby="mission-judging-title">
          <div className={`audience-wrap ${styles.split}`}>
            <div>
              <h2 id="mission-judging-title">{page.judgingTitle}</h2>
              <p className={styles.lead}>{page.judgingLead}</p>
              <ul className={styles.cards}>
                {page.judging.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{page.rewardsTitle}</h2>
              <ul className={styles.cards}>
                {page.rewards.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>{page.rewardsNote}</p>
              <h2 className={styles.dates}>{page.timelineTitle}</h2>
              <dl className={styles.timeline}>
                {page.timeline.map((item) => (
                  <div key={item.when}>
                    <dt>{item.when}</dt>
                    <dd>{item.what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/agenda" icon="calendar" tone="blue">
            {page.agendaLabel}
          </ContentAction>
          <ContentAction href="/badge" icon="gallery" tone="green">
            {page.badgeLabel}
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
