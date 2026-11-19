import Link from "next/link";
import ContentIcon, { type ContentIconName, type IconTone } from "@/components/shared/ContentIcon";
import { SITE } from "@/content/site";
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
      label: "Attend",
      tone: "blue",
      links: [
        { href: "/badge", label: "Badge", icon: "themes" },
        ...(SITE.missionsEnabled
          ? [{ href: "/missions", label: "Missions", icon: "rocket" as ContentIconName }]
          : []),
        { href: "/venue", label: "Venue", icon: "venue" },
        { href: "/faq", label: "FAQ", icon: "help" },
      ],
    },
    {
      label: "Community",
      tone: "green",
      links: [
        { href: "/partners", label: "Partners", icon: "partners" },
        { href: "/team", label: "Team", icon: "people" },
        { href: "/press", label: "Press", icon: "history" },
        { href: "/archive", label: "Archive", icon: "history" },
      ],
    },
  ];

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onNavigate();
    if (href.startsWith("/#") && pathname === "/") {
      event.preventDefault();
      const targetId = href.slice(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    } else if (href.startsWith(`${pathname}#`)) {
      event.preventDefault();
      const targetId = href.split("#")[1];
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav className={styles.panel} id={id} aria-label="Explore DevFest" hidden={!open}>
      <div className={styles.groups}>
        {groups.map((group) => (
          <section key={group.label} aria-label={group.label} className={styles.group}>
            <h2>{group.label}</h2>
            <div className={styles.links}>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
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
        ))}
      </div>
      <div className={styles.appearance}>
        <span>Appearance</span>
        <ThemeChoice />
      </div>
    </nav>
  );
}
