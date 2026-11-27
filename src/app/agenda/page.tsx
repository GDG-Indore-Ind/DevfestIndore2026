import { Laptop, ScanQrCode } from "lucide-react";
import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE, REGISTRATION_TIME } from "@/content/event";
import { AGENDA_PAGE as page } from "@/content/pages";
import { AGENDA_ITEMS, AGENDA_SECTIONS } from "@/content/agenda";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import ExternalLink from "@/components/shared/ExternalLink";
import AgendaBoard from "@/components/agenda/AgendaBoard";
import styles from "./page.module.css";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  const hasTimings = AGENDA_ITEMS.some(({ format, time }) => format !== "exhibit" && time);
  const salmanSetup = AGENDA_ITEMS.find(
    ({ id }) => id === "devfest-2026-qualcomm-physical-ai-workshop",
  )?.resources;

  return (
    <div className={`audience-site space-subpage ${styles.page}`}>
      <Navbar />
      <main id="main-content">
        <PageIntro
          title={page.title}
          lead={hasTimings ? page.lead : page.timingsPending}
          motif="events"
          meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name} · Check-in from ${REGISTRATION_TIME}`}
        />
        <section className="audience-section" aria-label={page.title}>
          <div className="audience-wrap">
            <aside className={styles.workshopReminder} aria-labelledby="workshop-reminder">
              <div className={styles.reminderIcon}>
                <Laptop size={30} aria-hidden="true" />
              </div>
              <div>
                <h2 id="workshop-reminder">{page.workshopReminder.title}</h2>
                <p>{page.workshopReminder.lead}</p>
                {salmanSetup?.length ? (
                  <div className={styles.workshopSetup}>
                    <h3>{page.workshopReminder.setupTitle}</h3>
                    <ul>
                      {salmanSetup.map((resource) => (
                        <li key={resource.url}>
                          <ExternalLink href={resource.url}>{resource.label}</ExternalLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
            <PageSectionNavigation label={page.tabsLabel}>
              {AGENDA_SECTIONS.map(({ id, title }) => (
                <a key={id} href={`#${id}`}>
                  {title}
                </a>
              ))}
            </PageSectionNavigation>
            <AgendaBoard />
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/tickets" icon="tickets" tone="blue">
            Get tickets
          </ContentAction>
          <ContentAction href="/venue" icon="venue" tone="green">
            Venue & directions
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
      <a className={styles.passport} href="/pass">
        <ScanQrCode size={20} aria-hidden="true" />
        Passport
      </a>
    </div>
  );
}
