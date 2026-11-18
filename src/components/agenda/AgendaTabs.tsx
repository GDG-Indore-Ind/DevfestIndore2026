import Link from "next/link";
import { AGENDA_PAGE as copy } from "@/content/pages";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";

import { AGENDA_SECTIONS } from "@/content/agenda";

const tabs = [
  { id: "schedule", href: "/agenda" },
  { id: "workshops", href: "/agenda/workshops" },
  { id: "speakers", href: "/agenda/speakers" },
  { id: "exhibits", href: "/agenda/exhibits" },
] as const;
export type AgendaTab = (typeof tabs)[number]["id"];

/** The views of the agenda: stage jumps on the singular agenda page, tab links on sub-pages. */
export default function AgendaTabs({ current }: { current: AgendaTab }) {
  if (current === "schedule") {
    return (
      <PageSectionNavigation label={copy.tabsLabel}>
        {AGENDA_SECTIONS.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </PageSectionNavigation>
    );
  }
  return (
    <PageSectionNavigation label={copy.tabsLabel}>
      {tabs.map(({ id, href }) => (
        <Link key={id} href={`#${id}`} aria-current={id === current ? "page" : undefined}>
          {copy.tabs[id]}
        </Link>
      ))}
    </PageSectionNavigation>
  );
}
