import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MISSIONS_COPY } from "@/content/copy";
import { SITE } from "@/content/site";
import styles from "./MissionCta.module.css";

/** Ties the badge to the Pick Your Mission campaign. */
export default function MissionCta() {
  if (!SITE.missionsEnabled) return null;
  return (
    <div className="audience-wrap">
      <Link href="/missions" className={styles.cta}>
        {MISSIONS_COPY.badgeCta} <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
