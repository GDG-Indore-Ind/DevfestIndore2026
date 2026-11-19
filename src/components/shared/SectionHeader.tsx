import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  /** One optional "see all" link, kept in the same place on every section. */
  action?: ReactNode;
  /** Id for the heading, so the section can name itself with aria-labelledby. */
  id?: string;
  /** 2 for a section title, 3 for a block inside a section. */
  level?: 2 | 3;
};

/** The one heading used by every home section: title and lead on the left, one action on the right. */
export default function SectionHeader({ title, lead, action, id, level = 2 }: Props) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className={`${styles.root} ${level === 3 ? styles.block : ""}`}>
      <div className={styles.text}>
        <Heading id={id}>{title}</Heading>
        {lead && <p>{lead}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
