import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import CommunityPage from "@/components/CommunityPage";
import ExternalLink from "@/components/ExternalLink";
import { DEVFEST_EDITIONS } from "@/content/archive";
import { ARCHIVED_SPEAKERS } from "@/content/speakers";

type Props = { params: Promise<{ year: string }> };
export function generateStaticParams() { return DEVFEST_EDITIONS.map(event => ({ year: event.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { year } = await params; const event = DEVFEST_EDITIONS.find(item => item.id === year); return { title: event?.title ?? "Edition not found", description: event?.summary }; }
export default async function EditionPage({ params }: Props) {
  const { year } = await params;
  const event = DEVFEST_EDITIONS.find(item => item.id === year);
  if (!event) notFound();
  const speakers = [...new Map(ARCHIVED_SPEAKERS.filter(speaker => event.speakerNames?.includes(speaker.name) && speaker.year === year).map(speaker => [speaker.name.toLowerCase(), speaker])).values()];
  return <CommunityPage compact title={event.title} lead={`${event.displayDate} · ${event.venue}`}>
    <div className="compact-edition-links"><Link href="/past-events" className="audience-text-link"><ArrowLeft className="audience-icon" aria-hidden="true" />All editions</Link><ExternalLink href={event.source}>Official event record</ExternalLink></div>
    <div className="compact-edition-highlights"><p className="audience-body">{event.summary}</p>{year === "2025" && <figure className="edition-photo"><Image src="/gallery/opt_DSCF7164.JPG" alt="The DevFest Indore community on stage at the 2025 edition" width={2400} height={1600} sizes="(max-width: 760px) 100vw, 480px" /></figure>}</div>
    {!!speakers.length && <section className="compact-archive-section" aria-labelledby="edition-speakers"><h2 id="edition-speakers">Speakers</h2><ul className="compact-name-wall">{speakers.map(speaker => <li key={speaker.id}><span>{speaker.name}</span>{speaker.company && <small>{speaker.company}</small>}</li>)}</ul></section>}
    <section className="compact-archive-section" aria-labelledby="edition-partners"><h2 id="edition-partners">Event partners</h2><ul className="compact-name-wall">{event.partners.map(name => <li key={name}>{name}</li>)}</ul></section>
    <Link href="/past-speakers" className="audience-text-link">Browse past speakers</Link>
  </CommunityPage>;
}
