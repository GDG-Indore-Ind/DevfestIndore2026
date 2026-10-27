import pages from "../../../content/pages.json";
import { HOME_PAGE } from "@/content/pages";
import {
  ECOSYSTEM_PARTNERS,
  getCommunityUrl,
  HISTORICAL_COMMUNITIES,
  HISTORICAL_SPONSORS,
} from "@/content/partners";
import ContentAction from "@/components/shared/ContentAction";
import LogoRow from "./LogoRow";
import styles from "./CommunitySupporters.module.css";

export default function CommunitySupporters() {
  return (
    <section
      className="audience-section"
      aria-label={`${HOME_PAGE.ecosystemTitle} · ${HOME_PAGE.pastSponsorsTitle}`}
    >
      <div className={`audience-wrap ${styles.rows}`}>
        <LogoRow
          label={HOME_PAGE.ecosystemTitle}
          description={HOME_PAGE.ecosystemLead}
          items={ECOSYSTEM_PARTNERS.map((item) => ({ ...item, href: getCommunityUrl(item) }))}
        />
        <LogoRow
          label={HOME_PAGE.ecosystemHistoryLabel}
          items={HISTORICAL_COMMUNITIES.map((item) => ({
            ...item,
            href: getCommunityUrl(item),
            detail: item.years.join(" · "),
          }))}
        />
        <LogoRow
          label={HOME_PAGE.pastSponsorsTitle}
          items={HISTORICAL_SPONSORS.slice(0, 6)}
          action={
            <ContentAction
              href={pages.directory.enabled ? "/partners?year=all&type=sponsor" : "/past-sponsors"}
              icon="partners"
              tone="yellow"
            >
              {HOME_PAGE.pastSponsorsLink}
            </ContentAction>
          }
        />
      </div>
    </section>
  );
}
