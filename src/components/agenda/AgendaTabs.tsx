import Link from "next/link";
import { AGENDA_PAGE as copy } from "@/content/pages";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";

const stageJumps = [
  { id: "main-stage", label: "Main stage", href: "#main-stage" },
  { id: "workshops", label: "Workshops", href: "#workshops" },
  { id: "exhibits", label: "Exhibit Lounge", href: "#exhibit-lounge" },
] as const;

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
        {stageJumps.map(({ id, label, href }) => (
          <a key={id} href={href}>
            {label}
          </a>
        ))}
      </PageSectionNavigation>
    );
  }
  return (
    <PageSectionNavigation label={copy.tabsLabel}>
      {tabs.map(({ id, href }) => (
        <Link key={id} href={href} aria-current={id === current ? "page" : undefined}>
          {copy.tabs[id]}
        </Link>
      ))}
    </PageSectionNavigation>
  );
}
