import Link from "next/link";
import { EVENT } from "@/content/event";
import { NAVIGATION_COPY } from "@/content/pages";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

/** The path to a nested page. The last crumb is the current page and is not a link. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: NAVIGATION_COPY.homeLabel, href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${EVENT.links.website}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };
  return (
    <nav className={styles.root} aria-label={NAVIGATION_COPY.breadcrumbLabel}>
      <ol>
        {trail.map((item, index) => (
          <li key={item.label}>
            {item.href && index < trail.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
