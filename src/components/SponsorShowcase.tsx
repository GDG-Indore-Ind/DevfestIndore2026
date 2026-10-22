"use client";

import { EVENT } from "@/content/event";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { EventPartner } from "@/content/model";
import { CONFIRMED_EVENT_PARTNERS, ECOSYSTEM_PARTNERS } from "@/content/partners";
import ExternalLink from "@/components/ExternalLink";

function PartnerLogo({ item, featured = false, decorative = false }: { item: EventPartner; featured?: boolean; decorative?: boolean }) {
  const [failed, setFailed] = useState(false);
  const square = item.featured === "space" || !featured;
  return item.logoUrl && !failed
    ? <Image src={item.logoUrl} alt={decorative ? "" : item.name} width={square ? 240 : 640} height={square ? 240 : 118} sizes={featured ? "(max-width: 760px) 75vw, 420px" : "(max-width: 760px) 88px, 220px"} onError={() => setFailed(true)} />
    : <span className="event-partner-wordmark">{item.name}</span>;
}

export default function SponsorShowcase() {
  const rail = useRef<HTMLUListElement>(null);
  const featured = CONFIRMED_EVENT_PARTNERS.filter(item => item.featured);
  const additional = CONFIRMED_EVENT_PARTNERS.filter(item => !item.featured);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * node.clientWidth, behavior: reducedMotion ? "instant" : "smooth" });
  }
  return <section className="audience-section event-partners-section" aria-labelledby="partners-title"><div className="audience-wrap">
    <div className="edition-section-heading"><div><p className="audience-overline">{EVENT.id} partners & collaborators</p><h2 id="partners-title">Great missions take<br />more than one crew.</h2></div><div><p className="audience-body">Technology, expertise, ideas and support. Help shape what developers discover at DevFest Indore.</p><ExternalLink href={EVENT.links.partnerApplication} className="audience-button space-primary-button">Partner with DevFest</ExternalLink></div></div>
    <div className="featured-partners" aria-label="Featured 2026 collaborators">{featured.map(item => <article key={item.id} className={`partner-feature partner-feature-${item.featured}`}>
      <div className="partner-feature-logo"><ExternalLink href={item.websiteUrl}><PartnerLogo item={item} featured /></ExternalLink></div>
      <div className="partner-feature-copy"><p className="partner-feature-role">{item.role}</p><h3 className={item.featured === "technology" ? "sr-only" : undefined}>{item.name}</h3><p className="partner-feature-description">{item.description}</p>
        {item.topics && <dl className="partner-ai-topics">{item.topics.map(topic => <div key={topic.title}><dt>{topic.title}</dt><dd>{topic.text}</dd></div>)}</dl>}
        <ExternalLink href={item.websiteUrl} className="partner-feature-link">{item.featured === "space" ? "Explore the space community" : "Explore Qualcomm AI"}</ExternalLink>
      </div>
    </article>)}</div>
    {!!additional.length && <div className="additional-partners"><div className="event-partner-heading"><h3>More partners & supporters</h3>{additional.length > 3 && <div className="event-partner-controls"><button type="button" aria-label="Previous partner cards" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button><button type="button" aria-label="Next partner cards" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button></div>}</div>
      <ul ref={rail} className="event-partner-rail" aria-label="More 2026 partners">{additional.map(item => <li key={item.id}><div className="event-partner-logo">{item.websiteUrl ? <ExternalLink href={item.websiteUrl}><PartnerLogo item={item} /></ExternalLink> : <PartnerLogo item={item} />}</div><h3>{item.name}</h3><p>{item.role}</p></li>)}</ul>
    </div>}
    <div className="event-ecosystem-heading"><h3>Our developer ecosystem</h3></div>
    <ul className="community-logo-row" aria-label="Developer community social pages">{ECOSYSTEM_PARTNERS.map(item => <li key={item.id}><ExternalLink href={item.socialUrl} className="community-social-link"><span className="community-social-logo" data-shape={item.logoShape ?? "square"}><PartnerLogo item={item} decorative /></span><span className="community-social-name">{item.name}</span></ExternalLink></li>)}</ul>
    <Link href="/past-sponsors" className="audience-text-link event-past-partners">Meet our past supporters<ArrowRight className="audience-icon" aria-hidden="true" /></Link>
  </div></section>;
}
