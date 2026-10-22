"use client";

import { EVENT, EVENT_DATE } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function SpaceArtwork() {
  return (
    <figure className="space-artwork" aria-label="An Android astronaut exploring a new orbit">
      <div className="space-art-grid" aria-hidden="true">
        <div className="space-spark-tile"><svg viewBox="0 0 100 100" focusable="false"><path d="M50 5C50 36 64 50 95 50C64 50 50 64 50 95C50 64 36 50 5 50C36 50 50 36 50 5Z" fill="currentColor" /></svg></div>
        <div className="space-mascot-tile"><span className="space-planet" /><Image src="/images/android-astronaut-2026.webp" alt="" width={1254} height={1254} sizes="(max-width: 760px) 82vw, 480px" preload className="space-astronaut" /></div>
        <div className="space-orbit-tile"><span className="space-orbit-line" /><span className="space-orbit-dot" /></div>
      </div>
      <figcaption><span>{HOME_PAGE.artworkCaption}</span><span className="mission-colors" aria-hidden="true"><i /><i /><i /><i /></span></figcaption>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <section className="space-hero" aria-labelledby="event-title">
      <div className="audience-wrap space-hero-grid">
        <div className="space-hero-copy">
          <h1 id="event-title" aria-label={EVENT.name}>DevFest<span className="space-edition"><span lang="hi">इंदौर</span><span>{EVENT.id}</span></span></h1>
          <p className="space-hero-lead">{HOME_PAGE.heroLead}</p>
          <p className="audience-body">{HOME_PAGE.heroDescription}</p>
          <div className="space-event-facts"><p><CalendarDays aria-hidden="true" /><time dateTime={EVENT.startsAt}>{EVENT_DATE}</time></p><p><MapPin aria-hidden="true" /><span>{EVENT.venue.name}, {EVENT.venue.city}</span></p></div>
          <div className="space-actions"><Link href="/tickets" className="audience-button space-primary-button">Get tickets <ArrowRight className="audience-icon" aria-hidden="true" /></Link><a href="#flow" className="audience-button programme-outline-button">Explore the programme <ArrowRight className="audience-icon" aria-hidden="true" /></a></div>
        </div>
        <SpaceArtwork />
      </div>
    </section>
  );
}
