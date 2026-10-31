import { HOME_PAGE } from "@/content/pages";
import { ECOSYSTEM_PARTNERS, getCommunityUrl } from "@/content/partners";
import LogoRow from "./LogoRow";
import styles from "./CommunitySupporters.module.css";

export default function CommunitySupporters() {
  return (
    <section className={`audience-section ${styles.root}`} aria-label={HOME_PAGE.ecosystemTitle}>
      <div className={`audience-wrap ${styles.rows}`}>
        <LogoRow
          label={HOME_PAGE.ecosystemTitle}
          description={HOME_PAGE.ecosystemLead}
          items={ECOSYSTEM_PARTNERS.map((item) => ({ ...item, href: getCommunityUrl(item) }))}
        />
      </div>
    </section>
  );
}
