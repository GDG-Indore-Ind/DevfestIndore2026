import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MISSIONS_COPY } from "@/content/copy";
import { SITE } from "@/content/site";
import styles from "./MissionStrip.module.css";

const copy = MISSIONS_COPY.homeStrip;

/** Points attendees to the badge maker and the Pick Your Mission campaign. */
export default function MissionStrip() {
  return (
    <section className="audience-section" id="home-mission" aria-labelledby="home-mission-title">
      <div className="audience-wrap">
        <div className={styles.card}>
          <div className={styles.copy}>
            <h2 id="home-mission-title">
              {SITE.missionsEnabled ? copy.title : copy.badgeOnlyTitle}
            </h2>
            <p>{SITE.missionsEnabled ? copy.text : copy.badgeOnlyText}</p>
          </div>
          <div className={styles.actions}>
            <Link href="/badge" className="audience-button">
              <Sparkles className="audience-icon" aria-hidden="true" />
              {copy.badgeLabel}
            </Link>
            {SITE.missionsEnabled && (
              <Link href="/missions" className="audience-text-link">
                {copy.missionLabel} <ArrowRight className="audience-icon" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
