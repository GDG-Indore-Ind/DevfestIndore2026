import Link from "next/link";
import ExternalLink from "@/components/shared/ExternalLink";
import { LinkedOrganizationLogo } from "@/components/shared/OrganizationLogo";
import { PARTNER_PROFILE_LINKS } from "@/content/copy";
import { getCommunityUrl, partnerProfileHref, type EventPartner } from "@/content/partners";
import { getOrganizationActivities } from "@/content/speakers";
import styles from "./PartnerList.module.css";

export default function PartnerList({
  items,
  compact = false,
  includeSpaceAnchor = false,
}: {
  items: EventPartner[];
  compact?: boolean;
  includeSpaceAnchor?: boolean;
}) {
  return (
    <ul className={styles.list} data-compact={compact}>
      {items.map((item) => {
        const logoUrl = getCommunityUrl(item);
        const activities = getOrganizationActivities(item.organizationId);
        const links = PARTNER_PROFILE_LINKS[item.organizationId] ?? [];

        return (
          <li
            className={styles.row}
            key={item.id}
            id={includeSpaceAnchor && item.featured === "space" ? "space-club" : undefined}
          >
            <LinkedOrganizationLogo
              organization={item}
              href={logoUrl}
              sizes="(max-width: 480px) 120px, 176px"
              className={styles.plate}
            />
            <details className={styles.details}>
              <summary className={styles.summary}>
                <span className={styles.identity}>
                  <strong>{item.name}</strong>
                  {item.editionId !== "ecosystem" && <span>{item.role}</span>}
                </span>
              </summary>
              <div className={styles.expanded}>
                {item.description && <p>{item.description}</p>}
                {activities.length > 0 && (
                  <ul className={styles.activities} aria-label="On the agenda">
                    {activities.map(({ id, title }) => (
                      <li key={id}>
                        <Link className="audience-text-link" href={`/agenda#${id}`}>
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles.links}>
                  <Link
                    className="audience-text-link"
                    href={partnerProfileHref(item.organizationId)}
                    aria-label={`View organization: ${item.name}`}
                  >
                    View organization
                  </Link>
                  {item.socialUrl && item.socialUrl !== logoUrl && (
                    <ExternalLink className="audience-text-link" href={item.socialUrl}>
                      {item.organizationId === "thm-indore"
                        ? "LinkedIn · Indore Chapter"
                        : "Official social profile"}
                    </ExternalLink>
                  )}
                  {links.map(({ label, href }) => (
                    <ExternalLink className="audience-text-link" key={href} href={href}>
                      {label}
                    </ExternalLink>
                  ))}
                </div>
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
