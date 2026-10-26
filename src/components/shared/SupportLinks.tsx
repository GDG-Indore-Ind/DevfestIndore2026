import type { ReactNode } from "react";
import styles from "./SupportLinks.module.css";

export default function SupportLinks({ text, children }: { text: string; children: ReactNode }) {
  return (
    <div className={styles.root}>
      <p>{text}</p>
      <div className={styles.links}>{children}</div>
    </div>
  );
}
