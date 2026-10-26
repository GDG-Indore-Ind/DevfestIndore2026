"use client";

import { EVENT } from "@/content/event";
import { useState, type KeyboardEvent } from "react";
import { Bot, Braces, Check, Radio, Satellite } from "lucide-react";
import ContentAction from "@/components/shared/ContentAction";
import ContentIcon from "@/components/shared/ContentIcon";
import { THEMES } from "@/content/themes";
import { HOME_PAGE } from "@/content/pages";
import styles from "./ExploreSection.module.css";

const themeIcons = { Satellite, Braces, Bot, Radio };
const TOPICS = THEMES.map((theme) => ({ ...theme, icon: themeIcons[theme.icon] }));

function ThemeScene({ topic }: { topic: (typeof TOPICS)[number] }) {
  const Icon = topic.icon;
  return (
    <div className={styles.scene} aria-hidden="true">
      <svg viewBox="0 0 320 160" fill="none" className={styles.lines} focusable="false">
        <ellipse cx="160" cy="88" rx="126" ry="43" transform="rotate(-18 160 88)" />
        <ellipse cx="160" cy="88" rx="81" ry="67" transform="rotate(30 160 88)" />
        <path d="M28 126h58m148-76h58M72 35l23 18m127 78 23 18" />
        <circle cx="52" cy="118" r="7" className={styles.node} />
        <circle cx="269" cy="55" r="5" className={styles.node} />
        <path d="M266 17v18m-9-9h18M39 49v12m-6-6h12" />
      </svg>
      <span className={styles.core}>
        <Icon strokeWidth={1.5} />
      </span>
      <span className={styles.signal}>{topic.signal}</span>
    </div>
  );
}

export default function ExploreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TOPICS[activeIndex];

  function select(index: number) {
    setActiveIndex(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? TOPICS.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + TOPICS.length) % TOPICS.length;
    const buttons =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button");
    const button = buttons?.[next];
    if (button) {
      button.focus({ preventScroll: true });
      select(next);
    }
  }

  return (
    <section className={`audience-section ${styles.root}`} id="flow" aria-labelledby="flow-title">
      <div className="audience-wrap">
        <div className={styles.heading}>
          <h2 id="flow-title">
            <ContentIcon name="themes" tone="yellow" heading />
            {HOME_PAGE.programmeTitle}
          </h2>
          <p>{HOME_PAGE.programmeTagline}</p>
        </div>
        <p className={styles.swipeHint}>{HOME_PAGE.themeSwipeHint}</p>
        <div className={styles.selectionWindow}>
          <div className={styles.selector} role="group" aria-label={HOME_PAGE.themeSelectorLabel}>
            {TOPICS.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  className={styles.button}
                  type="button"
                  aria-pressed={activeIndex === index}
                  aria-controls="topic-detail"
                  data-color={topic.color}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <Icon aria-hidden="true" />
                  <span>{topic.label}</span>
                  {activeIndex === index && <Check className={styles.check} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
        <div id="topic-detail" aria-live="polite" aria-atomic="true">
          <div key={active.id} className={styles.story} data-color={active.color}>
            <ThemeScene topic={active} />
            <div className={styles.storyCopy}>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul className={styles.tags} aria-label="Topics to explore">
                {active.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.contribution}>
          <p>{HOME_PAGE.programmeStatus}</p>
          <ContentAction href={EVENT.links.cfp} icon="microphone" tone="red" external>
            {HOME_PAGE.themeContributionLabel}
          </ContentAction>
        </div>
      </div>
    </section>
  );
}
