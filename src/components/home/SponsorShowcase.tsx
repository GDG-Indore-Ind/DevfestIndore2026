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
            <SectionHeader
              id="partners-title"
              title={
                showIntro
                  ? PARTNERS_PAGE.sectionLabel
                  : `${EVENT.year} ${PARTNERS_PAGE.sectionLabel}`
              }
              action={
                showIntro && (
                  <ContentAction href="/partners" icon="partners" tone="green">
                    {PARTNERS_PAGE.viewAllLabel}
                  </ContentAction>
                )
              }
            />
            <ul className={showIntro ? styles.supporterGrid : styles.directoryGrid}>
              {NON_COMMUNITY_EVENT_PARTNERS.map((item) => (
                <li
                  key={item.id}
                  id={!showIntro && item.featured === "space" ? "space-club" : undefined}
                >
                  {showIntro ? (
                    <Link href={partnerProfileHref(item.organizationId)} className={styles.tile}>
                      <span className={styles.logo}>
                        <OrganizationLogo organization={item} sizes="160px" />
                      </span>
                      <strong className={styles.name}>{item.name}</strong>
                      <small>{item.role}</small>
                    </Link>
                  ) : (
                    <article className={styles.card}>
                      <div className={styles.logo}>
                        <OrganizationLogo
                          organization={item}
                          sizes="(max-width: 400px) 80vw, 340px"
                        />
                      </div>
                      <h3>{item.name}</h3>
                      <p className={styles.role}>{item.role}</p>
                      {item.description && <p>{item.description}</p>}
                      <ContentAction href={partnerProfileHref(item.organizationId)} icon="partners">
                        About {item.name}
                      </ContentAction>
                    </article>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
