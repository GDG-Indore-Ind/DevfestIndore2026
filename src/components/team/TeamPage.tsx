"use client";

import { useState } from "react";
import { TEAM } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialGlyph from "@/components/shared/SocialGlyph";
import { CodeXml, Globe, BookOpen } from "lucide-react";
import styles from "./TeamCards.module.css";

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X",
  github: "GitHub",
  website: "Website",
  blog: "Blog",
};

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "linkedin" || platform === "instagram")
    return <SocialGlyph platform={platform} />;
  if (platform === "twitter") return <span aria-hidden="true">𝕏</span>;
  const Icon = platform === "github" ? CodeXml : platform === "blog" ? BookOpen : Globe;
  return <Icon aria-hidden="true" />;
}

export default function TeamPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(TEAM.map((member) => member.team))];
  const members = TEAM.filter((member) => category === "All" || member.team === category);
  return (
    <CommunityPage
      flightStops={[
        { id: "page-overview", label: "Overview" },
        { id: "page-directory", label: "The team" },
      ]}
      compact
      title="DevFest Team"
      lead="Meet the people bringing DevFest Indore together."
    >
      <div className="compact-directory-toolbar">
        <div className="community-filters" role="group" aria-label="Filter team">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "All" ? "Everyone" : item}
            </button>
          ))}
        </div>
        <span className="audience-caption" role="status">
          {members.length} {members.length === 1 ? "person" : "people"}
        </span>
      </div>
      <div className={styles.grid}>
        {members.map((member) => (
          <article className={styles.card} key={member.id}>
            <CommunityPhoto src={member.avatar} alt={member.name} portrait sizes="64px" />
            <div>
              <h2>{member.name}</h2>
              <p>
                {member.role
                  .replace(" & GDG Indore Organizer", "")
                  .replace("GDG Indore Organizer & ", "")
                  .replace("GDG Indore Organizer", "Organizer")
                  .replace("Organizer & ", "")}
              </p>
              <div className={styles.socials}>
                {Object.entries(member.socials)
                  .filter(
                    ([key, href]) =>
                      socialLabels[key] &&
                      href &&
                      /^https?:\/\//.test(href) &&
                      !/^https?:\/\/(?:www\.)?instagram\.com\/gdgindore\/?(?:[?#].*)?$/i.test(href),
                  )
                  .map(([key, href]) => (
                    <ExternalLink
                      key={key}
                      href={href!}
                      aria-label={`${member.name} on ${socialLabels[key]}`}
                      title={`${member.name} on ${socialLabels[key]}`}
                    >
                      <SocialIcon platform={key} />
                    </ExternalLink>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </CommunityPage>
  );
}
