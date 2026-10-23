"use client";

import { EVENT } from "@/content/event";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EventPartner } from "@/content/model";
import {
  CONFIRMED_EVENT_PARTNERS,
  ECOSYSTEM_PARTNERS,
  getCommunityUrl,
  HISTORICAL_COMMUNITIES,
} from "@/content/partners";
import { HOME_PAGE, PARTNERS_PAGE } from "@/content/pages";
import ExternalLink from "@/components/shared/ExternalLink";
import LogoMarquee from "@/components/home/LogoMarquee";
import PartnerCarousel from "@/components/home/PartnerCarousel";
import ContentIcon from "@/components/shared/ContentIcon";
import styles from "./SponsorShowcase.module.css";

function PartnerLogo({
  item,
  featured = false,
  decorative = false,
}: {
  item: EventPartner;
  featured?: boolean;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const square = item.featured === "space" || !featured;
  return item.logoUrl && !failed ? (
    <Image
      src={item.logoUrl}
      alt={decorative ? "" : item.name}
      width={square ? 240 : 640}
      height={square ? 240 : 118}
      sizes={featured ? "(max-width: 760px) 75vw, 420px" : "(max-width: 760px) 88px, 220px"}
      onError={() => setFailed(true)}
    />
  ) : (
    <span className="event-partner-wordmark">{item.name}</span>
  );
}

export default function SponsorShowcase({
  showIntro = true,
  showEcosystem = true,
}: {
  showIntro?: boolean;
  showEcosystem?: boolean;
}) {
  const featured = CONFIRMED_EVENT_PARTNERS.filter((item) => item.featured);
  const additional = CONFIRMED_EVENT_PARTNERS.filter((item) => !item.featured);
  return (
    <section className="audience-section event-partners-section" aria-labelledby="partners-title">
      <div className="audience-wrap">
        {!PARTNERS_PAGE.revealed ? (
          <>
            <p className="audience-overline">
              {EVENT.id} {PARTNERS_PAGE.sectionLabel}
            </p>
            <div className="partner-reveal">
              <div className="partner-reveal-backdrop" aria-hidden="true">
                <span />
                <span />
              </div>
              <div className="partner-reveal-message">
                <span className="partner-reveal-spark" aria-hidden="true">
                  ✦
                </span>
                <h2 id="partners-title">{PARTNERS_PAGE.revealTitle}</h2>
                <p>{PARTNERS_PAGE.revealText}</p>
                <ExternalLink
                  href={EVENT.links.partnerApplication}
                  className="audience-button space-primary-button"
                >
                  {PARTNERS_PAGE.revealButton}
                </ExternalLink>
              </div>
            </div>
          </>
        ) : (
          <>
            {showIntro ? (
              <div className={`edition-section-heading ${styles.heading}`}>
                <div>
                  <p className="audience-overline">
                    {EVENT.id} {PARTNERS_PAGE.sectionLabel}
                  </p>
                  <h2 id="partners-title">
                    <ContentIcon name="partners" tone="yellow" heading />
                    Great missions take
                    <br />
                    more than one crew.
                  </h2>
                </div>
                <Link
                  href="/partners#partner-application"
                  className="audience-button space-primary-button"
                >
                  {PARTNERS_PAGE.revealButton}
                  <ArrowRight className="audience-icon" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <h2 id="partners-title" className="practical-partners-heading">
                {EVENT.id} {PARTNERS_PAGE.sectionLabel}
              </h2>
            )}
            <p className={styles.lead}>{PARTNERS_PAGE.sponsorshipText}</p>
            <PartnerCarousel items={featured} />
            {!!additional.length && (
              <div className="additional-partners">
                <div className="event-partner-heading">
                  <h3>More partners & supporters</h3>
                </div>
                <ul className="supporter-logo-grid" aria-label="More 2026 partners">
                  {additional.map((item) => (
                    <li key={item.id}>
                      <div className="event-partner-logo">
                        {item.websiteUrl ? (
                          <ExternalLink href={item.websiteUrl}>
                            <PartnerLogo item={item} />
                          </ExternalLink>
                        ) : (
                          <PartnerLogo item={item} />
                        )}
                      </div>
                      <h3>{item.name}</h3>
                      <p>{item.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {showEcosystem && (
          <div className="home-community-marquees">
            <LogoMarquee
              label={HOME_PAGE.ecosystemTitle}
              description={HOME_PAGE.ecosystemLead}
              items={ECOSYSTEM_PARTNERS.map((item) => ({ ...item, href: getCommunityUrl(item) }))}
            />
            <LogoMarquee
              label={HOME_PAGE.ecosystemHistoryLabel}
              items={HISTORICAL_COMMUNITIES.map((item) => ({
                ...item,
                href: getCommunityUrl(item),
                detail: item.years.join(" · "),
              }))}
            />
          </div>
        )}
      </div>
    </section>
  );
}
