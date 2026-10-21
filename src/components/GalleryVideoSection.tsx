import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, History, Users, Handshake } from "lucide-react";
import { GALLERY_PHOTOS } from "@/content/gallery";
export default function GalleryVideoSection() {
  const photo = GALLERY_PHOTOS[0];
  return <section className="audience-section engineering-history" aria-labelledby="community-title"><div className="audience-wrap history-layout"><div><h2 id="community-title">One community.<br />Years of building.</h2><p className="audience-body">Developers, speakers and local communities have shaped DevFest Indore across editions. Explore the people and organizations behind it.</p><nav className="history-links" aria-label="Explore previous editions">{[{ href: "/past-events", label: "Past events", detail: "2022—2025", Icon: History }, { href: "/past-speakers", label: "Past speakers", detail: "People & sessions", Icon: Users }, { href: "/past-sponsors", label: "Past sponsors", detail: "Organizations & support", Icon: Handshake }].map(({ href, label, detail, Icon }) => <Link href={href} key={href}><Icon aria-hidden="true" /><span>{label}<small>{detail}</small></span><ArrowUpRight aria-hidden="true" /></Link>)}</nav></div><figure className="history-photo"><Image src={photo.imageUrl} alt={photo.title} width={2400} height={1600} sizes="(max-width: 760px) 100vw, 56vw" /><figcaption><span>DEVFEST INDORE / 2025</span><Link href="/gallery">Photo archive <ArrowUpRight className="audience-icon" aria-hidden="true" /></Link></figcaption></figure></div></section>;
}
