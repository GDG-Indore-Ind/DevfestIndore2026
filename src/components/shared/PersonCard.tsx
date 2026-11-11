import type { ReactNode } from "react";
import Link from "next/link";
import type { Socials } from "@/content/model";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./PersonCard.module.css";

/** Responsive grid of person cards: three columns on desktop, one on phones. */
export function PersonGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

/** Compact card for a team member or ambassador: photo or initials, name, one detail line, profile links. */
export default function PersonCard({
  name,
  photo,
  meta,
  socials,
  href,
  headingLevel: Heading = "h3",
}: {
  name: string;
  photo?: string;
  /** Role or college, shown muted under the name. */
  meta: string;
  socials?: Socials;
  /** Makes the name a link, e.g. to the person's agenda row. */
  href?: string;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  return (
    <article className={styles.card}>
      <CommunityPhoto src={photo || undefined} alt={name} portrait sizes="48px" />
      <div className={styles.body}>
        <Heading>{href ? <Link href={href}>{name}</Link> : name}</Heading>
        <p>{meta}</p>
        <ProfileLinks socials={socials} name={name} iconOnly className={styles.links} />
      </div>
    </article>
  );
}
