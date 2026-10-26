import styles from "./ProfileLinks.module.css";
import type { Socials } from "@/content/model";
import { CodeXml, BriefcaseBusiness, Globe, BookOpen, Camera, MessageCircle } from "lucide-react";
import ExternalLink from "@/components/shared/ExternalLink";

const icons = {
  linkedin: BriefcaseBusiness,
  github: CodeXml,
  twitter: MessageCircle,
  instagram: Camera,
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
export default function ProfileLinks({ socials }: { socials?: Socials }) {
  return (
    <div className={styles.links}>
      {Object.entries(socials ?? {})
        .filter(([key, href]) => key in labels && href && /^https?:\/\//.test(href))
        .map(([key, href]) => {
          const Icon = icons[key as keyof typeof icons];
          return (
            <ExternalLink key={key} href={href}>
              <Icon className="audience-icon" aria-hidden="true" />
              {labels[key]}
            </ExternalLink>
          );
        })}
    </div>
  );
}
