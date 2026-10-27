import type { ReactNode } from "react";
import type { Organization } from "@/content/model";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import ExternalLink from "@/components/shared/ExternalLink";
import styles from "./LogoRow.module.css";

type RowOrganization = Pick<Organization, "id" | "name" | "logoUrl" | "archiveLogoWindow"> & {
  href?: string;
  detail?: string;
};

export default function LogoRow({
  items,
  label,
  description,
  action,
}: {
  items: RowOrganization[];
  label: string;
  description?: string;
  action?: ReactNode;
}) {
  if (!items.length) return null;
  return (
    <section className={styles.root} aria-label={label}>
      <div className={styles.heading}>
        <div>
          <h3>{label}</h3>
          {description && <p>{description}</p>}
        </div>
        {action && <div className={styles.controls}>{action}</div>}
      </div>
      <div className={styles.window} role="region" aria-label={label} tabIndex={0}>
        <ul className={styles.group}>
          {items.map((item) => {
            const content = (
              <>
                <span className={styles.plate}>
                  <OrganizationLogo organization={item} />
                </span>
                <span className={styles.name}>{item.name}</span>
                {item.detail && <small>{item.detail}</small>}
              </>
            );
            return (
              <li key={item.id}>
                {item.href ? (
                  <ExternalLink href={item.href} className={styles.item}>
                    {content}
                  </ExternalLink>
                ) : (
                  <span className={styles.item}>{content}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
