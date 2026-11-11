import type { ReactNode } from "react";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { AGENDA_PAGE } from "@/content/pages";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import AgendaTabs, { type AgendaTab } from "./AgendaTabs";

/** Shared frame for /agenda and its sub-pages: intro, breadcrumb, tabs, content, next steps. */
export default function AgendaShell({
  current,
  title,
  lead,
  meta,
  children,
}: {
  current: AgendaTab;
  title: string;
  lead: string;
  meta?: string;
  children: ReactNode;
}) {
  const nested = current !== "schedule";
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro
          title={title}
          lead={lead}
          motif="events"
          meta={meta ?? `${EVENT_SHORT_DATE} · ${EVENT.venue.name}`}
          trail={
            nested ? (
              <Breadcrumbs
                items={[{ label: AGENDA_PAGE.title, href: "/agenda" }, { label: title }]}
              />
            ) : undefined
          }
        />
        <section className="audience-section" aria-label={title}>
          <div className="audience-wrap">
            <AgendaTabs current={current} />
            {children}
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
