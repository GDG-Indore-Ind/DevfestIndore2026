import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ExternalLink from "./ExternalLink";
import ContentIcon, { type ContentIconName, type IconTone } from "./ContentIcon";
import styles from "./ContentAction.module.css";

export default function ContentAction({
  href,
  children,
  icon,
  tone = "blue",
  external = false,
}: {
  href: string;
  children: ReactNode;
  icon: ContentIconName;
  tone?: IconTone;
  external?: boolean;
}) {
  const content = (
    <>
      <ContentIcon name={icon} tone={tone} />
      <span>{children}</span>
    </>
  );
  return external ? (
    <ExternalLink href={href} className={styles.action}>
      {content}
    </ExternalLink>
  ) : (
    <Link href={href} className={styles.action}>
      {content}
      <ArrowRight aria-hidden="true" className={styles.arrow} />
    </Link>
  );
}
