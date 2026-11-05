import { pageMetadata } from "@/lib/pageMetadata";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { AGENDA_PAGE as page, HOME_PAGE } from "@/content/pages";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import AgendaSpeakers from "@/components/agenda/AgendaSpeakers";
import AgendaComingSoon from "@/components/agenda/AgendaComingSoon";

export const metadata = pageMetadata("/agenda", page.title, page.description);

export default function AgendaPage() {
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro
          title={page.title}
          lead={page.lead}
          motif="events"
          meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`}
        />
        <AgendaSpeakers />
        <AgendaComingSoon />
        <ContentActionGroup>
          <ContentAction href="/tickets" icon="tickets" tone="blue">
            Get tickets
          </ContentAction>
          <ContentAction href="/#flow" icon="themes" tone="yellow">
            Explore the themes
          </ContentAction>
          <ContentAction href={EVENT.links.cfp} icon="microphone" tone="red" external>
            {HOME_PAGE.themeContributionLabel}
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
