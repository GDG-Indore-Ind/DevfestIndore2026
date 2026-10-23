"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TEAM } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ExternalLink from "@/components/shared/ExternalLink";

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
      title="The team"
      lead="The people bringing DevFest Indore together."
    >
      <div className="compact-directory-toolbar">
        <div className="community-filters" role="group" aria-label="Filter organizers by team">
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
      <div className="compact-team-grid">
        {members.map((member) => {
          const role = member.role
            .replace(" & GDG Indore Organizer", "")
            .replace("GDG Indore Organizer & ", "")
            .replace("GDG Indore Organizer", "Organizer")
            .replace("Organizer & ", "");
          return (
            <article className="compact-team-person" key={member.id}>
              <CommunityPhoto src={member.avatar} alt={member.name} portrait sizes="56px" />
              <div>
                <h2>
                  {member.socials.linkedin ? (
                    <ExternalLink
                      href={member.socials.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      {member.name}
                    </ExternalLink>
                  ) : (
                    member.name
                  )}
                </h2>
                <p>{role}</p>
              </div>
              {member.socials.linkedin && (
                <ArrowUpRight className="compact-person-arrow" aria-hidden="true" />
              )}
            </article>
          );
        })}
      </div>
    </CommunityPage>
  );
}
