import { SHARED_BENEFITS } from "@/content/tickets";
import { TICKETS_PAGE } from "@/content/pages";
import BenefitGroups from "@/components/tickets/BenefitGroups";
import styles from "./PassInclusions.module.css";

/** Inclusions common to every open pass, so each card lists only what differs. */
export default function PassInclusions() {
  if (!SHARED_BENEFITS.length) return null;
  return (
    <div className={styles.root} role="group" aria-labelledby="pass-inclusions-title">
      <h2 id="pass-inclusions-title">{TICKETS_PAGE.includedTitle}</h2>
      <BenefitGroups benefits={SHARED_BENEFITS} layout="columns" />
    </div>
  );
}
