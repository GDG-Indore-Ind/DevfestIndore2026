"use client";

import { useState } from "react";
import { TEAM, TEAM_PAGE } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import PersonCard, { PersonGrid } from "@/components/shared/PersonCard";

export default function TeamPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(TEAM.map((member) => member.team))];
  const members = TEAM.filter((member) => category === "All" || member.team === category);
  return (
    <CommunityPage compact title={TEAM_PAGE.title} lead={TEAM_PAGE.lead}>
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
      <PersonGrid>
        {members.map((member) => (
          <PersonCard
            key={member.id}
            name={member.name}
            photo={member.avatar}
            meta={member.role
              .replace(" & GDG Indore Organizer", "")
              .replace("GDG Indore Organizer & ", "")
              .replace("GDG Indore Organizer", "Organizer")
              .replace("Organizer & ", "")}
            socials={member.socials}
            headingLevel="h2"
          />
        ))}
      </PersonGrid>
    </CommunityPage>
  );
}
