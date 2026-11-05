import type { ReactNode } from "react";
import styles from "./ContentActionGroup.module.css";

/** A row of related destinations at the end of a page. */
export default function ContentActionGroup({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`audience-wrap ${styles.group} ${compact ? styles.compact : ""}`}>
      {children}
    </div>
  );
}
