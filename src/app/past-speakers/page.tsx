"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { PastSpeaker } from "@/content/model";
import { ARCHIVED_SPEAKERS } from "@/content/speakers";
import { DEVFEST_EDITIONS } from "@/content/archive";
import CommunityPage from "@/components/CommunityPage";
import CommunityPhoto from "@/components/CommunityPhoto";
import ProfileLinks from "@/components/ProfileLinks";
import ArchiveNav from "@/components/ArchiveNav";
import ExternalLink from "@/components/ExternalLink";

const identity = (name: string) => name.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
export default function PastSpeakersPage() {
  const speakers: PastSpeaker[] = ARCHIVED_SPEAKERS;
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [year, setYear] = useState("All");
  const archive = speakers;
  const editions = [...new Set(archive.map(speaker => speaker.year))].sort().reverse();
  const tracks = [...new Set(archive.map(speaker => speaker.track || speaker.category))].sort();
  const grouped = new Map<string, PastSpeaker[]>();
  for (const speaker of [...archive].sort((a, b) => b.year.localeCompare(a.year))) {
    const key = identity(speaker.name);
    const appearances = grouped.get(key) ?? [];
    if (!appearances.some(item => item.year === speaker.year && item.topic === speaker.topic)) appearances.push(speaker);
    grouped.set(key, appearances);
  }
  const filtered = [...grouped.entries()].map(([key, appearances]) => ({ key, appearances: appearances.filter(speaker => (year === "All" || speaker.year === year) && (track === "All" || (speaker.track || speaker.category) === track)) })).filter(item => item.appearances.length && item.appearances.some(speaker => [speaker.name, speaker.role, speaker.company, speaker.topic].join(" ").toLowerCase().includes(query.toLowerCase())));
  return <CommunityPage motif="people" title="Past speakers" lead="Explore previous speakers and their sessions. The 2026 lineup will be announced separately.">
    <ArchiveNav current="/past-speakers" />
    <div className="community-search-row"><label className="community-search"><span><Search className="audience-icon" aria-hidden="true" />Search speakers</span><input type="search" placeholder="Name, company or topic" value={query} onChange={event => { setQuery(event.target.value); }} /></label><label>Edition<select value={year} onChange={event => { setYear(event.target.value); }}><option value="All">All editions</option>{editions.map(edition => <option key={edition}>{edition}</option>)}</select></label><label>Track<select value={track} onChange={event => { setTrack(event.target.value); }}><option value="All">All tracks</option>{tracks.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <p className="audience-caption community-results" role="status">{filtered.length} {filtered.length === 1 ? "speaker" : "speakers"}{query && ` matching “${query}”`}</p>
    <div className="speaker-compact-grid">{filtered.map(({ key, appearances }) => { const speaker = appearances[0]; return <article className="speaker-compact" key={key}><CommunityPhoto key={speaker.avatar} src={speaker.avatar} alt={speaker.name} portrait sizes="72px" /><div><p className="audience-caption">{[...new Set(appearances.map(item => item.year))].join(" · ")} / {speaker.track || speaker.category}</p><h2>{speaker.name}</h2><p>{[speaker.role, speaker.company].filter(Boolean).join(" · ")}</p><details className="community-details"><summary>{appearances.length > 1 ? `${appearances.length} sessions & profile` : "Session & profile"}</summary>{appearances.map(item => { const official = DEVFEST_EDITIONS.find(event => event.id === item.year && event.speakerNames?.includes(item.name)); return <div key={item.id} className="speaker-appearance"><p className="audience-caption">{item.year} · {[item.role, item.company].filter(Boolean).join(" · ")}</p><h3>{item.topic}</h3>{item.description && <p>{item.description}</p>}{item.bio && <p>{item.bio}</p>}{official && <ExternalLink href={official.source}>Official speaker listing</ExternalLink>}</div>; })}<ProfileLinks socials={speaker.socials} /></details></div></article>; })}</div>
    {!filtered.length && <div className="community-empty"><h2>No speakers found</h2><p>Try another name or choose a different edition or track.</p><button onClick={() => { setQuery(""); setYear("All"); setTrack("All"); }}>Clear filters</button></div>}
    <p className="audience-caption archive-provenance">Profiles and session descriptions come from the organizer’s speaker archive. Official GDG source links are included where the public listing names the speaker.</p>
  </CommunityPage>;
}
