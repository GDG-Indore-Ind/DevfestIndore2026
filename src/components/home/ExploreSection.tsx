import { EVENT } from "@/content/event";
import { Bot, Braces, Radio, Satellite } from "lucide-react";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import { THEMES } from "@/content/themes";
import { HOME_PAGE } from "@/content/pages";
import styles from "./ExploreSection.module.css";

const themeIcons = { Satellite, Braces, Bot, Radio };

/** All four themes laid out at once, so nothing is hidden behind a tab. */
export default function ExploreSection() {
  return (
    <section className={`audience-section ${styles.root}`} id="flow" aria-labelledby="flow-title">
      <div className="audience-wrap">
        <SectionHeader
          id="flow-title"
          title={HOME_PAGE.programmeTitle}
          lead={HOME_PAGE.programmeTagline}
        />
        <ul className={styles.grid} aria-label={HOME_PAGE.themeSelectorLabel}>
          {THEMES.map((theme, index) => {
            const Icon = themeIcons[theme.icon];
            return (
              <li key={theme.id} className={styles.card} data-color={theme.color}>
                <svg
                  className={styles.orbit}
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <ellipse cx="150" cy="50" rx="110" ry="38" transform="rotate(-25 150 50)" />
                  <ellipse cx="150" cy="50" rx="70" ry="24" transform="rotate(-25 150 50)" />
                  <circle cx="62" cy="86" r="5" className={styles.node} />
                </svg>
                <div className={styles.top}>
                  <span className={styles.icon}>
                    <Icon aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <span className={styles.index} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className={styles.label}>{theme.label}</p>
                <h3>{theme.title}</h3>
                <p className={styles.description}>{theme.description}</p>
                <ul className={styles.tags} aria-label="Topics to explore">
                  {theme.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className={styles.signal}>{theme.signal}</p>
              </li>
            );
          })}
        </ul>
        <div className={styles.contribution}>
          <p>{HOME_PAGE.programmeStatus}</p>
          <ContentAction href="/agenda" icon="calendar" tone="blue">
            {HOME_PAGE.agendaLabel}
          </ContentAction>
          <ContentAction href={EVENT.links.cfp} icon="microphone" tone="red" external>
            {HOME_PAGE.themeContributionLabel}
          </ContentAction>
        </div>
      </div>
    </section>
  );
}
