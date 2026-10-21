import Link from "next/link";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ExternalLink from "@/components/ExternalLink";

export default function Footer() {
  return <footer className="audience-footer culled-footer edition-footer"><div className="audience-wrap">
    <div className="edition-footer-top"><div><p className="footer-brand">See you in the next orbit.<span className="space-footer-star" aria-hidden="true">✦</span></p><p>DevFest Indore · {EVENT_SHORT_DATE} {EVENT.id}</p></div><a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">{EVENT.contactEmail}</a></div>
    <nav className="edition-footer-links" aria-label="Explore DevFest Indore"><Link href="/tickets">Tickets</Link><Link href="/#flow">Themes</Link><Link href="/#venue">Venue</Link><Link href="/faq">FAQ</Link><Link href="/team">The team</Link><Link href="/past-events">Past editions</Link><Link href="/tickets#attendee-policies">Ticket policies</Link><ExternalLink href={EVENT.links.cfp}>Speak at DevFest</ExternalLink><Link href="/#sponsors">Partners & sponsors</Link><ExternalLink href={EVENT.links.linkedin}>LinkedIn</ExternalLink></nav>
    <p className="audience-caption footer-disclaimer">An independent event organized by GDG Indore. Community activities and opinions do not represent Google Inc.</p>
  </div></footer>;
}
