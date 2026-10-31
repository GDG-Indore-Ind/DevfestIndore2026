import styles from "./ProfileLinks.module.css";
import type { Socials } from "@/content/model";
import { CodeXml, Globe, BookOpen, MessageCircle } from "lucide-react";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialGlyph from "@/components/shared/SocialGlyph";

const icons = {
  github: CodeXml,
  twitter: MessageCircle,
  website: Globe,
  blog: BookOpen,
};
const labels: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "X",
  instagram: "Instagram",
  website: "Website",
  blog: "Blog",
};
export default function ProfileLinks({
  socials,
  name,
  iconOnly = false,
}: {
  socials?: Socials;
  /** With `iconOnly`, names the person in each link's accessible label. */
  name?: string;
  /** Show the brand symbol alone instead of the platform name. */
  iconOnly?: boolean;
}) {
  return (
    <div className={`${styles.links} ${iconOnly ? styles.iconOnly : ""}`}>
      {Object.entries(socials ?? {})
        .filter(([key, href]) => key in labels && href && /^https?:\/\//.test(href))
        .map(([key, href]) => {
          const glyph =
            key === "linkedin" || key === "instagram" ? (
              <SocialGlyph platform={key} />
            ) : (
              (() => {
                const Icon = icons[key as keyof typeof icons];
                return <Icon className="audience-icon" aria-hidden="true" />;
              })()
            );
          const label = name ? `${name} on ${labels[key]}` : labels[key];
          return (
            <ExternalLink
              key={key}
              href={href}
              {...(iconOnly ? { "aria-label": label, title: label } : {})}
            >
              {glyph}
              {!iconOnly && labels[key]}
            </ExternalLink>
          );
        })}
    </div>
  );
}
