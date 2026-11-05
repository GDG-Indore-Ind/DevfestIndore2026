"use client";

import ContentAction from "@/components/shared/ContentAction";

import { EVENT } from "@/content/event";
import { useState } from "react";
import Image from "next/image";
import type { EventPartner } from "@/content/model";
import { CONFIRMED_EVENT_PARTNERS } from "@/content/partners";
import { PARTNERS_PAGE } from "@/content/pages";
import ExternalLink from "@/components/shared/ExternalLink";
import PartnerCarousel from "@/components/home/PartnerCarousel";
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
    <span className={styles.wordmark}>{item.name}</span>
  );
}

export default function SponsorShowcase({ showIntro = true }: { showIntro?: boolean }) {
  const featured = CONFIRMED_EVENT_PARTNERS.filter((item) => item.featured);
  const additional = CONFIRMED_EVENT_PARTNERS.filter((item) => !item.featured);
  return (
    <section className="audience-section event-partners-section" aria-labelledby="partners-title">
      <div className="audience-wrap">
        {!PARTNERS_PAGE.revealed ? (
          <>
            <p className="audience-overline">
              {EVENT.year} {PARTNERS_PAGE.sectionLabel}
            </p>
            <div className={styles.reveal}>
              <div className={styles.revealBackdrop} aria-hidden="true">
                <span />
                <span />
              </div>
              <div className={styles.revealMessage}>
                <span className={styles.revealSpark} aria-hidden="true">
                  ✦
                </span>
                <h2 id="partners-title">{PARTNERS_PAGE.revealTitle}</h2>
                <p>{PARTNERS_PAGE.revealText}</p>
                <ContentAction
                  href={EVENT.links.partnerApplication}
                  icon="partners"
                  tone="green"
                  external
                >
                  {PARTNERS_PAGE.revealButton}
                </ContentAction>
              </div>
            </div>
          </>
        ) : (
          <>
            {showIntro ? (
              <div className={`edition-section-heading ${styles.heading}`}>
                <div>
                  <p className="audience-overline">
                    {EVENT.year} {PARTNERS_PAGE.sectionLabel}
                  </p>
                  <h2 id="partners-title">
                    Great missions take
                    <br />
                    more than one crew.
                  </h2>
                </div>
                <ContentAction href="/partners#partner-application" icon="partners" tone="green">
                  {PARTNERS_PAGE.revealButton}
                </ContentAction>
              </div>
            ) : (
              <h2 id="partners-title" className="practical-partners-heading">
                {EVENT.year} {PARTNERS_PAGE.sectionLabel}
              </h2>
            )}
            <p className={styles.lead}>{PARTNERS_PAGE.sponsorshipText}</p>
            <PartnerCarousel items={featured} />
            {!!additional.length && (
              <div className={styles.additional}>
                <div className="event-partner-heading">
                  <h3>More partners & supporters</h3>
                </div>
                <ul className={styles.supporterGrid} aria-label="More 2026 partners">
                  {additional.map((item) => (
                    <li key={item.id}>
                      <div className={styles.logo}>
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
      </div>
    </section>
  );
}
