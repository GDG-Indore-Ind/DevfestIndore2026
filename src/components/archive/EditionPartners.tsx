import { getEventPartners, getCommunityUrl } from "@/content/partners";
import ExternalLink from "@/components/shared/ExternalLink";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import styles from "./EditionPartners.module.css";

export default function EditionPartners({ eventId }: { eventId: string }) {
  return (
    <ul className={`${styles.grid} ${styles.archivedGrid}`}>
      {getEventPartners(eventId).map((partner) => {
        const href = getCommunityUrl(partner);
        const content = (
          <>
            <div className={styles.logo}>
              <OrganizationLogo organization={partner} />
            </div>
            <span>{partner.name}</span>
            <small>{partner.role}</small>
          </>
        );
        return (
          <li key={partner.id}>
            {href ? (
              <ExternalLink href={href} className={styles.link}>
                {content}
              </ExternalLink>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
