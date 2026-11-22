import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import { EVENT } from "@/content/event";
import Link from "next/link";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import { NON_COMMUNITY_EVENT_PARTNERS, partnerProfileHref } from "@/content/partners";
import { PARTNERS_PAGE } from "@/content/pages";
import styles from "./SponsorShowcase.module.css";

export default function SponsorShowcase({ showIntro = true }: { showIntro?: boolean }) {
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
              <SectionHeader
                id="partners-title"
                title="Great missions take more than one crew."
                lead={PARTNERS_PAGE.sponsorshipText}
                action={
                  <ContentAction href="/partners#partner-application" icon="partners" tone="green">
                    {PARTNERS_PAGE.revealButton}
                  </ContentAction>
                }
              />
            ) : (
              <SectionHeader
                id="partners-title"
                title={`${EVENT.year} ${PARTNERS_PAGE.sectionLabel}`}
              />
            )}
            <div
              className={styles.featured}
              role="region"
              aria-label={PARTNERS_PAGE.sectionLabel}
              tabIndex={0}
            >
              {NON_COMMUNITY_EVENT_PARTNERS.map((item) => (
                <article className={styles.card} key={item.id}>
                  <div className={styles.logo}>
                    <OrganizationLogo organization={item} sizes="(max-width: 760px) 85vw, 400px" />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                  {item.description && <p>{item.description}</p>}
                  <ContentAction href={partnerProfileHref(item.organizationId)} icon="partners">
                    About {item.name}
                  </ContentAction>
                </article>
              ))}
            </div>
            {!!NON_COMMUNITY_EVENT_PARTNERS.length && (
              <div className={styles.additional}>
                <div className="event-partner-heading">
                  <h3>{PARTNERS_PAGE.directoryTitle}</h3>
                </div>
                <ul className={styles.supporterGrid}>
                  {NON_COMMUNITY_EVENT_PARTNERS.map((item) => (
                    <li
                      key={item.id}
                      id={!showIntro && item.featured === "space" ? "space-club" : undefined}
                    >
                      <Link href={partnerProfileHref(item.organizationId)} className={styles.tile}>
                        <span className={styles.logo}>
                          <OrganizationLogo organization={item} />
                        </span>
                        <span>{item.name}</span>
                        {!showIntro && <small>{item.role}</small>}
                      </Link>
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
