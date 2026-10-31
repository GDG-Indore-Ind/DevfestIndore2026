import Link from "next/link";
import { EVENT, EVENT_WEEKDAY_DATE } from "@/content/event";
import { AGENDA_PAGE, AMBASSADORS_PAGE, HOME_PAGE } from "@/content/pages";
import ContentIcon, { type ContentIconName, type IconTone } from "@/components/shared/ContentIcon";
import ThemeChoice from "@/components/layout/ThemeChoice";
import styles from "./ExploreMenu.module.css";

type MenuLink = { href: string; label: string; icon: ContentIconName; anchor?: string };

type Props = {
  id: string;
  open: boolean;
  pathname: string;
  visibleAnchors?: string[];
  onNavigate: () => void;
};

export default function ExploreMenu({ id, open, pathname, visibleAnchors, onNavigate }: Props) {
  const groups: { label: string; tone: IconTone; links: MenuLink[] }[] = [
    {
      label: "Plan your visit",
      tone: "blue",
      links: [
        { href: "/tickets", label: "Tickets", icon: "tickets" },
        { href: "/agenda", label: AGENDA_PAGE.title, icon: "microphone" },
        { href: "/venue", label: "Venue & directions", icon: "venue", anchor: "venue" },
        { href: "/faq", label: "FAQ", icon: "help" },
        { href: "/ambassadors", label: AMBASSADORS_PAGE.navigationLabel, icon: "people" },
      ],
    },
    {
      label: "Discover",
      tone: "green",
      links: [
        { href: "/#flow", label: "Themes", icon: "themes", anchor: "flow" },
        {
          href: "/#exhibits",
          label: HOME_PAGE.exhibits.navigationLabel,
          icon: "exhibits",
          anchor: "exhibits",
        },
        { href: "/events", label: "Workshops & events", icon: "calendar" },
        {
          href: "/partners",
          label: "Partners & collaborators",
          icon: "partners",
          anchor: "sponsors",
        },
        { href: "/team", label: "Meet the team", icon: "people" },
        { href: "/archive", label: "Past editions", icon: "history" },
      ],
    },
  ];
  return (
    <nav className={styles.panel} id={id} aria-label="Explore DevFest" hidden={!open}>
      <div className={styles.heading}>
        <span>{EVENT.name}</span>
        <span>{EVENT_WEEKDAY_DATE}</span>
      </div>
      <div className={styles.groups}>
        {groups.map((group) => {
          const links = group.links.filter(
            (link) => !link.anchor || !visibleAnchors || visibleAnchors.includes(link.anchor),
          );
          if (!links.length) return null;
          return (
            <section key={group.label} aria-label={group.label} className={styles.group}>
              <h2>{group.label}</h2>
              <div className={styles.links}>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={
                      !link.href.includes("?") &&
                      !link.href.includes("#") &&
                      (pathname === link.href || pathname.startsWith(`${link.href}/`))
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
