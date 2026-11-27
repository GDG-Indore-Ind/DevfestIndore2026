import ExternalLink from "@/components/shared/ExternalLink";
import { LinkedOrganizationLogo } from "@/components/shared/OrganizationLogo";
import { getOrganization } from "@/content/partners";
import { CURRENT_ACTIVITIES } from "@/content/speakers";
import type { AgendaItem } from "@/content/agenda";
import styles from "@/components/home/PartnerList.module.css";
import AgendaSession from "./AgendaSession";

export default function ExhibitList({ items }: { items: AgendaItem[] }) {
  return (
    <ul className={styles.list} data-compact="true">
      {items.map((item) => {
        const id = CURRENT_ACTIVITIES.find((activity) => activity.id === item.id)
          ?.organizationIds?.[0];
        if (!id) return <AgendaSession key={item.id} item={item} />;

        const organization = getOrganization(id);
        const href = organization.websiteUrl;
        return (
          <li className={styles.row} key={item.id} id={item.id}>
            <LinkedOrganizationLogo
              organization={organization}
              href={href}
              className={styles.plate}
              sizes="(max-width: 480px) 120px, 176px"
            />
            <details className={styles.details} data-agenda-session>
              <summary className={styles.summary}>
                <span className={styles.identity}>
                  <strong>{item.title ?? organization.name}</strong>
                </span>
              </summary>
              <div className={styles.expanded}>
                {item.description && <p>{item.description}</p>}
                {href && (
                  <ExternalLink className="audience-text-link" href={href}>
                    Visit {organization.name}
                  </ExternalLink>
                )}
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
