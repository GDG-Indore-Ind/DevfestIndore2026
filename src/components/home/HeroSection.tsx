import { EVENT, EVENT_DATE } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function SpaceArtwork() {
  return (
    <figure className={styles.artwork} aria-label="An Android astronaut exploring a new orbit">
      <div className={styles.artGrid} aria-hidden="true">
        <div className={styles.spark}>
          <svg viewBox="0 0 100 100" focusable="false">
            <path
              d="M50 5C50 36 64 50 95 50C64 50 50 64 50 95C50 64 36 50 5 50C36 50 50 36 50 5Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.mascot}>
          <span className={styles.planet} />
          <Image
            src="/images/android-astronaut-2026.webp"
            alt=""
            width={1254}
            height={1254}
            sizes="(max-width: 760px) 82vw, 480px"
            preload
            className={styles.astronaut}
          />
        </div>
        <div className={styles.orbit}>
          <span className={styles.orbitLine} />
          <span className={styles.orbitDot} />
        </div>
      </div>
      <figcaption>
        <span>{HOME_PAGE.artworkCaption}</span>
        <span className="mission-colors" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </figcaption>
    </figure>
  );
}

import styles from "./HeroSection.module.css";
import ContentIcon from "@/components/shared/ContentIcon";

export default function HeroSection() {
  return (
    <section className={styles.root} aria-labelledby="event-title">
      <div className={"audience-wrap" + " " + styles.grid}>
        <div className={styles.copy}>
          <h1 id="event-title" aria-label={EVENT.name}>
            DevFest
            <span className={styles.edition}>
              <span lang="hi">इंदौर</span>
              <span>{EVENT.id}</span>
            </span>
          </h1>
          <p className={styles.lead}>{HOME_PAGE.heroLead}</p>
          <p className="audience-body">{HOME_PAGE.heroDescription}</p>
          <div className={styles.facts}>
            <p>
              <ContentIcon name="calendar" tone="blue" />
              <time dateTime={EVENT.startsAt}>{EVENT_DATE}</time>
            </p>
            <p>
              <ContentIcon name="venue" tone="red" />
              <span>
                {EVENT.venue.name}, {EVENT.venue.city}
              </span>
            </p>
          </div>
          <div className={styles.actions}>
            <Link href="/tickets" className="audience-button space-primary-button">
              Get tickets <ArrowRight className="audience-icon" aria-hidden="true" />
            </Link>
            <a href="#flow" className="audience-button programme-outline-button">
              Explore the themes <ArrowRight className="audience-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
        <SpaceArtwork />
      </div>
    </section>
  );
}
