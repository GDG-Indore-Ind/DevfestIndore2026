import type { ReactNode } from "react";
import styles from "./PageSectionNavigation.module.css";

export default function PageSectionNavigation({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <nav className={styles.nav} aria-label={label}>
      {children}
    </nav>
  );
}
