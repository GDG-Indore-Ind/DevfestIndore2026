import Link from "next/link";
import { AGENDA_PAGE, AMBASSADORS_PAGE, ARCHIVE_PAGE } from "@/content/pages";
import ContentIcon, { type ContentIconName, type IconTone } from "@/components/shared/ContentIcon";
import ThemeChoice from "@/components/layout/ThemeChoice";
import styles from "./ExploreMenu.module.css";

type MenuLink = { href: string; label: string; icon: ContentIconName; exact?: boolean };

type Props = {
  id: string;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
};

export default function ExploreMenu({ id, open, pathname, onNavigate }: Props) {
  const groups: { label: string; tone: IconTone; links: MenuLink[] }[] = [
    {
      label: AGENDA_PAGE.title,
      tone: "blue",
      links: [
        { href: "/agenda", label: AGENDA_PAGE.tabs.schedule, icon: "microphone", exact: true },
        { href: "/agenda/workshops", label: AGENDA_PAGE.tabs.workshops, icon: "calendar" },
        { href: "/agenda/speakers", label: AGENDA_PAGE.tabs.speakers, icon: "people" },
        { href: "/agenda/exhibits", label: AGENDA_PAGE.tabs.exhibits, icon: "exhibits" },
      ],
    },
    {
      label: "Plan your visit",
      tone: "blue",
      links: [
        { href: "/tickets", label: "Tickets", icon: "tickets" },
        { href: "/venue", label: "Venue & directions", icon: "venue" },
        { href: "/faq", label: "FAQ", icon: "help" },
        { href: "/ambassadors", label: AMBASSADORS_PAGE.navigationLabel, icon: "people" },
      ],
    },
    {
      label: "Discover",
      tone: "green",
      links: [
        { href: "/#flow", label: "Themes", icon: "themes" },
        { href: "/partners", label: "Partners & collaborators", icon: "partners" },
        { href: "/team", label: "Meet the team", icon: "people" },
        { href: "/archive", label: ARCHIVE_PAGE.navigationLabel, icon: "history" },
      ],
    },
  ];
  return (
    <nav className={styles.panel} id={id} aria-label="Explore DevFest" hidden={!open}>
      <div className={styles.groups}>
        {groups.map((group) => {
          return (
            <section key={group.label} aria-label={group.label} className={styles.group}>
              <h2>{group.label}</h2>
              <div className={styles.links}>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={
                      !link.href.includes("?") &&
                      !link.href.includes("#") &&
                      (pathname === link.href ||
                        (!link.exact && pathname.startsWith(`${link.href}/`)))
                        ? "page"
                        : undefined
                    }
                  >
                    <ContentIcon name={link.icon} tone={group.tone} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <div className={styles.appearance}>
        <span>Appearance</span>
        <ThemeChoice />
      </div>
    </nav>
  );
}
