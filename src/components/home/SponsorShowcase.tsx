import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import { EVENT } from "@/content/event";
import { NON_COMMUNITY_EVENT_PARTNERS } from "@/content/partners";
import { PARTNERS_PAGE } from "@/content/pages";
import PartnerList from "./PartnerList";
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
            <PartnerList
              items={NON_COMMUNITY_EVENT_PARTNERS}
              compact={showIntro}
              includeSpaceAnchor={!showIntro}
            />
          </>
        )}
      </div>
    </section>
  );
}
