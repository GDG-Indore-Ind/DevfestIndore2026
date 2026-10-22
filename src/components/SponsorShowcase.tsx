"use client";

import { EVENT } from "@/content/event";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { EventPartner } from "@/content/model";
import { CONFIRMED_EVENT_PARTNERS, ECOSYSTEM_PARTNERS, HISTORICAL_COMMUNITIES } from "@/content/partners";
import { HOME_PAGE, PARTNERS_PAGE } from "@/content/pages";
import ExternalLink from "@/components/ExternalLink";

function PartnerLogo({ item, featured = false, decorative = false }: { item: EventPartner; featured?: boolean; decorative?: boolean }) {
  const [failed, setFailed] = useState(false);
  const square = item.featured === "space" || !featured;
  return item.logoUrl && !failed
    ? <Image src={item.logoUrl} alt={decorative ? "" : item.name} width={square ? 240 : 640} height={square ? 240 : 118} sizes={featured ? "(max-width: 760px) 75vw, 420px" : "(max-width: 760px) 88px, 220px"} onError={() => setFailed(true)} />
    : <span className="event-partner-wordmark">{item.name}</span>;
}

export default function SponsorShowcase({ showIntro = true, showEcosystem = true }: { showIntro?: boolean; showEcosystem?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const featured = CONFIRMED_EVENT_PARTNERS.filter(item => item.featured);
  const additional = CONFIRMED_EVENT_PARTNERS.filter(item => !item.featured);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * node.clientWidth, behavior: reducedMotion ? "instant" : "smooth" });
  }
  return <section className="audience-section event-partners-section" aria-labelledby="partners-title"><div className="audience-wrap">
    {!PARTNERS_PAGE.revealed ? <><p className="audience-overline">{EVENT.id} partners & collaborators</p><div className="partner-reveal"><div className="partner-reveal-backdrop" aria-hidden="true"><span /><span /></div><div className="partner-reveal-message"><span className="partner-reveal-spark" aria-hidden="true">✦</span><h2 id="partners-title">{PARTNERS_PAGE.revealTitle}</h2><p>{PARTNERS_PAGE.revealText}</p><ExternalLink href={EVENT.links.partnerApplication} className="audience-button space-primary-button">{PARTNERS_PAGE.revealButton}</ExternalLink></div></div></> : <>
    {showIntro ? <div className="edition-section-heading"><div><p className="audience-overline">{EVENT.id} partners & collaborators</p><h2 id="partners-title">Great missions take<br />more than one crew.</h2></div><Link href="/partners#partner-application" className="audience-button space-primary-button">{PARTNERS_PAGE.revealButton}<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div> : <h2 id="partners-title" className="practical-partners-heading">{EVENT.id} partners & collaborators</h2>}
    {featured.length > 1 && <div className="event-partner-controls"><button type="button" aria-label="Previous featured partners" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button><button type="button" aria-label="Next featured partners" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button></div>}
    <div ref={rail} className="featured-partners" aria-label="Featured 2026 collaborators" tabIndex={0}>{featured.map(item => <article key={item.id} className={`partner-feature partner-feature-${item.featured}`}>
      <div className="partner-feature-logo"><ExternalLink href={item.websiteUrl}><PartnerLogo item={item} featured /></ExternalLink></div>
      <div className="partner-feature-copy"><p className="partner-feature-role">{item.role}</p><h3 className={item.featured === "technology" ? "sr-only" : undefined}>{item.name}</h3><p className="partner-feature-description">{item.description}</p>
        {item.topics && <dl className="partner-ai-topics">{item.topics.map(topic => <div key={topic.title}><dt>{topic.title}</dt><dd>{topic.text}</dd></div>)}</dl>}
        <ExternalLink href={item.websiteUrl} className="partner-feature-link">{item.featured === "space" ? "Explore the space community" : "Explore Qualcomm AI"}</ExternalLink>
      </div>
    </article>)}</div>
    {!!additional.length && <div className="additional-partners"><div className="event-partner-heading"><h3>More partners & supporters</h3></div>
      <ul className="supporter-logo-grid" aria-label="More 2026 partners">{additional.map(item => <li key={item.id}><div className="event-partner-logo">{item.websiteUrl ? <ExternalLink href={item.websiteUrl}><PartnerLogo item={item} /></ExternalLink> : <PartnerLogo item={item} />}</div><h3>{item.name}</h3><p>{item.role}</p></li>)}</ul>
    </div>}</>}
    {showEcosystem && <><div className="event-ecosystem-heading"><div><h3>{HOME_PAGE.ecosystemTitle}</h3><p>{HOME_PAGE.ecosystemLead}</p></div></div>
    <ul className="community-logo-row" aria-label="Developer community social pages">{ECOSYSTEM_PARTNERS.map(item => <li key={item.id}><ExternalLink href={item.socialUrl} className="community-social-link"><span className="community-social-logo" data-shape={item.logoShape ?? "square"}><PartnerLogo item={item} decorative /></span><span className="community-social-name">{item.name}</span></ExternalLink></li>)}</ul>
    <div className="community-history-network"><p>{HOME_PAGE.ecosystemHistoryLabel}</p><ul>{HISTORICAL_COMMUNITIES.map(item => <li key={item.id}>{item.name}<small>{item.years.join(" · ")}</small></li>)}</ul></div></>}
  </div></section>;
}
