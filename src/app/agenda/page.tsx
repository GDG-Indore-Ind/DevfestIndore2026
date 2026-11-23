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
import AgendaBoard from "@/components/agenda/AgendaBoard";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  const hasTimings = AGENDA_ITEMS.some(({ format, time }) => format !== "exhibit" && time);

  return (
    <div className="audience-site space-subpage">
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
    </div>
  );
}
