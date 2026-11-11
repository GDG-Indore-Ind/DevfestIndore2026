import Link from "next/link";
import { AGENDA_PAGE as copy } from "@/content/pages";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";

const tabs = [
  { id: "schedule", href: "/agenda" },
  { id: "workshops", href: "/agenda/workshops" },
  { id: "speakers", href: "/agenda/speakers" },
  { id: "exhibits", href: "/agenda/exhibits" },
] as const;
export type AgendaTab = (typeof tabs)[number]["id"];

/** The four views of the agenda, shared by every agenda page. */
export default function AgendaTabs({ current }: { current: AgendaTab }) {
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
