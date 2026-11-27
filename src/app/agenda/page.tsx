import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE, REGISTRATION_TIME } from "@/content/event";
import { AGENDA_PAGE as page } from "@/content/pages";
import { AGENDA_ITEMS } from "@/content/agenda";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import AgendaBoard from "@/components/agenda/AgendaBoard";
import styles from "./page.module.css";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  const hasTimings = AGENDA_ITEMS.some(({ format, time }) => format !== "exhibit" && time);

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
        <section className={`audience-section ${styles.section}`} aria-label={page.title}>
          <div className="audience-wrap">
            <AgendaBoard />
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/pass" icon="qr" tone="blue">
            Open Passport
          </ContentAction>
          <ContentAction href="/tickets" icon="tickets" tone="yellow">
            Observer Pass
          </ContentAction>
          <ContentAction href="/venue" icon="venue" tone="green">
            Venue &amp; directions
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
