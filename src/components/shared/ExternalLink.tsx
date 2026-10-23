import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<"a">, "target" | "rel">;

/** Keep outbound web links consistent without loading third-party embeds. */
export default function ExternalLink({ children, className = "", ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      className={`audience-external-link ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight className="audience-icon" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
