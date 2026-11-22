import type { ReactNode } from "react";
import type { Organization } from "@/content/model";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import styles from "./LogoRow.module.css";

type RowOrganization = Pick<
  Organization,
  "id" | "name" | "logoUrl" | "archiveLogoWindow" | "logoShape"
> & {
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
      <SectionHeader level={3} title={label} lead={description} action={action} />
      <ul className={styles.group}>
        {items.map((item) => {
          const isSquare = item.logoShape === "square";
          const content = (
            <>
              <span
                className={`${styles.plate} ${isSquare ? styles.squarePlate : ""}`}
                data-shape={item.logoShape ?? "wide"}
              >
                <OrganizationLogo organization={item} />
              </span>
              <span className={styles.name}>{item.name}</span>
              {item.detail && <small>{item.detail}</small>}
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <Link href={item.href} className={styles.item}>
                  {content}
                </Link>
              ) : (
                <span className={styles.item}>{content}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
