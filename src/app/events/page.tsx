"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, CalendarDays, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { WORKSHOPS } from "@/content/workshops";
import { COMMUNITY_EVENTS } from "@/content/archive";
import CommunityPage from "@/components/CommunityPage";
import ExternalLink from "@/components/ExternalLink";
export default function EventsPage() {
  const workshops = WORKSHOPS;
  const [query, setQuery] = useState("");
  const filtered = workshops.filter(item => [item.college, item.topic, item.speaker].join(" ").toLowerCase().includes(query.toLowerCase()));
  return <CommunityPage motif="events" flightStops={[{ id: "page-overview", label: "Overview" }, { id: "community-events", label: "Community events" }, { id: "workshops", label: "Workshops" }]} title="Workshops & events" lead="Technical sessions, campus workshops and community gatherings beyond the main DevFest day.">
    <nav className="archive-navigation" aria-label="On this page"><a href="#community-events"><CalendarDays className="audience-icon" aria-hidden="true" />Community events</a><a href="#workshops"><GraduationCap className="audience-icon" aria-hidden="true" />Workshops</a><Link href="/past-events">DevFest archive<ArrowRight className="audience-icon" aria-hidden="true" /></Link></nav>
    <section className="archive-subsection" id="community-events"><div className="archive-section-header"><h2>Past community events</h2><span className="audience-caption">Official GDG records</span></div><div className="community-event-list">{COMMUNITY_EVENTS.map(item => <article key={item.id}><CalendarDays aria-hidden="true" /><div><p className="audience-caption"><time dateTime={item.date}>{item.displayDate}</time> / {item.kind}</p><h3>{item.title}</h3><p>{item.summary}</p><p className="event-location"><MapPin className="audience-icon" aria-hidden="true" />{item.venue}</p></div><ExternalLink href={item.source}>Event record</ExternalLink></article>)}</div></section>
    <section className="archive-subsection" id="workshops"><div className="archive-section-header"><h2>Workshops</h2><span className="audience-caption">Campus session directory</span></div><p className="audience-body">Find campus sessions by college, topic or speaker. Follow the linked community updates for dates and details.</p>
      <label className="community-search workshop-search"><span><Search className="audience-icon" aria-hidden="true" />Find a workshop</span><input type="search" placeholder="College, topic or speaker" value={query} onChange={event => { setQuery(event.target.value); }} /></label><p className="audience-caption" role="status">{filtered.length} {filtered.length === 1 ? "session" : "sessions"}</p>
      <div className="workshop-compact-list">{filtered.map(item => <details key={item.id}><summary><GraduationCap aria-hidden="true" /><span><strong>{item.topic || item.college}</strong><small>{item.college} · {item.speaker}</small></span></summary><div className="workshop-details">{item.description && <p>{item.description}</p>}{item.collabNotice && <p>{item.collabNotice}</p>}<div className="community-profile-links">{item.instagramUrl && <ExternalLink href={item.instagramUrl}>Community update</ExternalLink>}{item.photosDrive && <ExternalLink href={item.photosDrive}>Photo album</ExternalLink>}</div></div></details>)}</div>
      {!filtered.length && <div className="community-empty"><h3>No matching workshops</h3><p>Try another college, topic or speaker.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}
    </section><aside className="community-note"><div><h2>Attending DevFest on 28 November?</h2><p>Check the current pass for event-day access and workshop inclusions.</p></div><Link href="/tickets" className="audience-text-link">Get tickets<ArrowRight className="audience-icon" aria-hidden="true" /></Link></aside>
  </CommunityPage>;
}
