import directory from "../../../content/directory.json";
import Link from "next/link";
import { HOME_PAGE } from "@/content/pages";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialLinks from "@/components/shared/SocialLinks";
import ContentIcon from "@/components/shared/ContentIcon";
import styles from "./Footer.module.css";

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
          <div className={styles.contact}>
            <span>Need help?</span>
            <a href={`mailto:${EVENT.contactEmail}`} className="audience-text-link">
              <ContentIcon name="mail" />
              {EVENT.contactEmail}
            </a>
          </div>
        </div>
        <nav
          className={`edition-footer-links ${styles.navigation}`}
          aria-label="Explore DevFest Indore"
        >
          <div className="edition-footer-group" id="tickets">
            <h2 className={styles.groupHeading}>
              <ContentIcon name="tickets" /> Attend
            </h2>
            <Link href="/tickets">Tickets</Link>
            <Link href="/#flow">Themes</Link>
            <Link href="/venue">Venue & directions</Link>
            <Link href="/faq">Common questions</Link>
            <Link href="/guidelines">Registration guidelines</Link>
          </div>
          <div className="edition-footer-group">
            <h2 className={styles.groupHeading}>
              <ContentIcon name="partners" tone="green" /> Get involved
            </h2>
            <ExternalLink href={EVENT.links.cfp}>Speak at DevFest</ExternalLink>
            <Link href="/partners">Partners & collaborators</Link>
            <ExternalLink href={EVENT.links.exhibitApplication}>
              {HOME_PAGE.exhibits.buttonLabel}
            </ExternalLink>
            <ExternalLink href={EVENT.links.partnerApplication}>Partner with DevFest</ExternalLink>
            <Link href="/team">{directory.enabled ? directory.team.title : "Meet the team"}</Link>
          </div>
          <div className="edition-footer-group">
            <h2 className={styles.groupHeading}>
              <ContentIcon name="history" tone="red" /> Explore more
            </h2>
            <Link href="/events">Workshops & events</Link>
            <Link href="/gallery">Photo gallery</Link>
            <Link href="/past-events">Past events</Link>
            <Link href={directory.enabled ? "/talks" : "/past-speakers"}>
              {directory.enabled ? directory.talks.title : "Past speakers"}
            </Link>
            <Link href={directory.enabled ? "/partners?year=all&type=sponsor" : "/past-sponsors"}>
              {directory.enabled ? directory.partners.title : "Past sponsors"}
            </Link>
          </div>
        </nav>
        <div className={styles.community}>
          <div className={styles.communityIntro}>
            <h2 className={styles.groupHeading}>
              <ContentIcon name="people" tone="yellow" /> Community
            </h2>
            <p className={styles.socialLabel}>Follow GDG Indore</p>
          </div>
          <SocialLinks className={styles.socials} />
          <ExternalLink href={EVENT.links.chapter}>Join GDG Indore</ExternalLink>
        </div>
        <div className={styles.closing}>
          <p className="audience-caption footer-disclaimer">
            An independent event organized by GDG Indore. Community activities and opinions do not
            represent Google Inc.
          </p>
          <ExternalLink href={EVENT.links.codeOfConduct}>Code of conduct</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
