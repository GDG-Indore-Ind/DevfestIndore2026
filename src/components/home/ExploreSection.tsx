"use client";

import { EVENT } from "@/content/event";
import { useState } from "react";
import { ArrowRight, Bot, Braces, Radio, Satellite } from "lucide-react";
import ExternalLink from "@/components/shared/ExternalLink";

import { THEMES } from "@/content/themes";
import { HOME_PAGE } from "@/content/pages";
const themeIcons = { Satellite, Braces, Bot, Radio };
const TOPICS = THEMES.map((theme) => ({ ...theme, icon: themeIcons[theme.icon] }));

function ThemeScene({ topic }: { topic: (typeof TOPICS)[number] }) {
  const Icon = topic.icon;
  return (
    <div className={`theme-scene theme-scene-${topic.id}`} aria-hidden="true">
      <svg viewBox="0 0 320 160" fill="none" className="theme-scene-lines" focusable="false">
        <ellipse cx="160" cy="88" rx="126" ry="43" transform="rotate(-18 160 88)" />
        <ellipse cx="160" cy="88" rx="81" ry="67" transform="rotate(30 160 88)" />
        <path d="M28 126h58m148-76h58M72 35l23 18m127 78 23 18" />
        <circle cx="52" cy="118" r="7" className="theme-scene-node" />
        <circle cx="269" cy="55" r="5" className="theme-scene-node" />
        <path d="M266 17v18m-9-9h18M39 49v12m-6-6h12" />
      </svg>
      <span className="theme-scene-core">
        <Icon strokeWidth={1.5} />
      </span>
      <span className="theme-scene-signal">{topic.signal}</span>
    </div>
  );
}

export default function ExploreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TOPICS[activeIndex];
  return (
    <section
      className="audience-section engineering-topics edition-themes"
      id="flow"
      aria-labelledby="flow-title"
    >
      <div className="audience-wrap">
        <div className="edition-section-heading programme-heading">
          <h2 id="flow-title">{HOME_PAGE.programmeTitle}</h2>
          <p className="programme-tagline">{HOME_PAGE.programmeTagline}</p>
        </div>
        <div className="engineering-topic-layout">
          <div className="engineering-topic-index" role="group" aria-label="Programme topics">
            {TOPICS.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={activeIndex === index}
                  aria-controls="topic-detail"
                  data-color={topic.color}
                  onClick={() => setActiveIndex(index)}
                >
                  <Icon aria-hidden="true" />
                  <span>{topic.label}</span>
                  <ArrowRight className="theme-choice-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div
            className="engineering-topic-detail theme-story"
            data-color={active.color}
            id="topic-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <ThemeScene topic={active} />
            <div className="theme-story-copy">
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul className="theme-tags" aria-label="Topics to explore">
                {active.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="theme-contribution">
          <p>{HOME_PAGE.programmeStatus}</p>
          <ExternalLink href={EVENT.links.cfp} className="audience-text-link">
            Bring it to the stage
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
