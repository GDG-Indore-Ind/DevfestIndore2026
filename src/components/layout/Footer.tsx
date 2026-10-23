import Link from "next/link";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialLinks from "@/components/shared/SocialLinks";

export default function Footer() {
  return (
    <footer className="audience-footer culled-footer edition-footer">
      <div className="audience-wrap">
        <div className="edition-footer-top">
          <div>
            <p className="footer-brand">
              See you in the next orbit.
              <span className="space-footer-star" aria-hidden="true">
                ✦
              </span>
            </p>
            <p>
              DevFest Indore · {EVENT_SHORT_DATE} {EVENT.id}
            </p>
          </div>
          <a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">
            {EVENT.contactEmail}
          </a>
        </div>
        <nav className="edition-footer-links" aria-label="Explore DevFest Indore">
          <div className="edition-footer-group" id="tickets">
            <h2>Attend</h2>
            <Link href="/tickets">Tickets & pass details</Link>
            <Link href="/#flow">Programme</Link>
            <Link href="/venue">Venue & directions</Link>
            <Link href="/faq">Common questions</Link>
            <Link href="/guidelines">Registration guidelines</Link>
          </div>
          <div className="edition-footer-group">
            <h2>Get involved</h2>
            <ExternalLink href={EVENT.links.cfp}>Speak at DevFest</ExternalLink>
            <Link href="/partners">Partners & collaborators</Link>
            <ExternalLink href={EVENT.links.partnerApplication}>Partner with DevFest</ExternalLink>
            <Link href="/team">Meet the team</Link>
            <ExternalLink href={EVENT.links.codeOfConduct}>Code of conduct</ExternalLink>
          </div>
          <div className="edition-footer-group">
            <h2>Community</h2>
            <SocialLinks />
            <ExternalLink href={EVENT.links.chapter}>Join GDG Indore</ExternalLink>
          </div>
          <div className="edition-footer-group">
            <h2>Explore more</h2>
            <Link href="/events">Workshops & events</Link>
            <Link href="/gallery">Photo gallery</Link>
            <Link href="/past-events">Past editions</Link>
            <Link href="/past-speakers">Past speakers</Link>
            <Link href="/past-sponsors">Past sponsors</Link>
          </div>
        </nav>
        <p className="audience-caption footer-disclaimer">
          An independent event organized by GDG Indore. Community activities and opinions do not
          represent Google Inc.
        </p>
      </div>
    </footer>
  );
}
