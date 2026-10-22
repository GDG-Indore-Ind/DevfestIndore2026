"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, History, Users, Handshake } from "lucide-react";
import { GALLERY_PHOTOS } from "@/content/gallery";
import { DEVFEST_EDITIONS } from "@/content/archive";
import { HOME_PAGE } from "@/content/pages";

export default function GalleryVideoSection() {
  const rail = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * .8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section className="audience-section engineering-history" aria-labelledby="community-title"><div className="audience-wrap">
    <div className="edition-section-heading history-heading"><div><p className="audience-overline">{HOME_PAGE.historyEyebrow}</p><h2 id="community-title">{HOME_PAGE.historyTitle}</h2></div><p className="audience-body">{HOME_PAGE.historyLead}</p></div>
    <nav className="history-timeline" aria-label={HOME_PAGE.historyRecentLabel}><span className="history-origin">{HOME_PAGE.historySince}<small>Our story begins</small></span>{[...DEVFEST_EDITIONS].sort((a,b)=>a.id.localeCompare(b.id)).map(edition=><Link key={edition.id} href={`/past-events/${edition.id}`}>{edition.id}<small>{edition.kind}</small></Link>)}</nav>
    <div className="history-carousel-heading"><Link href="/gallery" className="audience-text-link">Photo archive<ArrowUpRight className="audience-icon" aria-hidden="true" /></Link><div className="event-partner-controls"><button type="button" aria-label="Previous event photos" onClick={()=>move(-1)}><ChevronLeft aria-hidden="true" /></button><button type="button" aria-label="Next event photos" onClick={()=>move(1)}><ChevronRight aria-hidden="true" /></button></div></div>
    <div className="history-photo-carousel" ref={rail} role="region" aria-label="Community event photographs" tabIndex={0}>{GALLERY_PHOTOS.map(photo=><figure key={photo.id}><Image src={photo.imageUrl} alt={photo.title} width={photo.width ?? 1400} height={photo.height ?? 933} sizes="(max-width: 760px) 85vw, 700px" /><figcaption>{photo.caption}</figcaption></figure>)}</div>
    <nav className="history-directory-links" aria-label="People and organizations from previous editions">{[{ href: "/past-events", label: "Past events", detail: "Recent edition records", Icon: History }, { href: "/past-speakers", label: "Past speakers", detail: "People & sessions", Icon: Users }, { href: "/past-sponsors", label: "Past sponsors", detail: "Organizations & support", Icon: Handshake }].map(({ href, label, detail, Icon }) => <Link href={href} key={href}><Icon aria-hidden="true" /><span>{label}<small>{detail}</small></span><ArrowUpRight aria-hidden="true" /></Link>)}</nav>
  </div></section>;
}
