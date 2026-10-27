import Link from "next/link";
import pages from "../../../content/pages.json";
const directory = pages.directory;
import { EVENT, EVENT_WEEKDAY_DATE } from "@/content/event";
import { AMBASSADORS_PAGE, HOME_PAGE } from "@/content/pages";
import ContentIcon, { type ContentIconName, type IconTone } from "@/components/shared/ContentIcon";
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
        { href: "/venue", label: "Venue & directions", icon: "venue", anchor: "venue" },
        { href: "/guidelines", label: "Registration guidelines", icon: "guidelines" },
        { href: "/faq", label: "Common questions", icon: "help" },
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
      ],
    },
    {
      label: "Past editions",
      tone: "red",
      links: [
        { href: "/past-events", label: "Past events", icon: "history" },
        {
          href: directory.enabled ? "/talks" : "/past-speakers",
          label: directory.enabled ? directory.talks.title : "Past speakers",
          icon: "microphone",
        },
        {
          href: directory.enabled ? "/partners?year=all&type=sponsor" : "/past-sponsors",
          label: directory.enabled ? "Past partners" : "Past sponsors",
          icon: "partners",
        },
        { href: "/gallery", label: "Photo gallery", icon: "gallery" },
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
    </nav>
  );
}
