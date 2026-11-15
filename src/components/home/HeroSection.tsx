import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "@/content/event";
import { OPEN_PASSES, formatPassPrice } from "@/content/tickets";
import { HOME_PAGE } from "@/content/pages";
import { PAGE_COPY } from "@/content/copy";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import ContentIcon from "@/components/shared/ContentIcon";
import ContentAction from "@/components/shared/ContentAction";

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
        <span aria-hidden="true" />
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

/** Lowest confirmed open price; "from" only when open passes differ. Hidden when none is priced. */
function passPrice() {
  const prices = OPEN_PASSES.flatMap((pass) => (pass.price === undefined ? [] : [pass.price]));
  if (!prices.length) return null;
  const lowest = Math.min(...prices);
  const copy = prices.some((price) => price !== lowest)
    ? HOME_PAGE.heroPriceFrom
    : HOME_PAGE.heroPrice;
  return copy.replace("{{price}}", formatPassPrice({ price: lowest }));
}

export default function HeroSection() {
  const price = passPrice();
  return (
    <section className={styles.root} aria-labelledby="event-title">
      <div className={"audience-wrap" + " " + styles.grid}>
        <div className={styles.copy}>
          <h1 id="event-title" aria-label={EVENT.name}>
            DevFest
            <span className={styles.edition}>
              <span lang="hi">इंदौर</span>
              <span>{EVENT.year}</span>
            </span>
          </h1>
          <p className={styles.lead}>{HOME_PAGE.heroLead}</p>
          <p className="audience-body">{HOME_PAGE.heroDescription}</p>
          <div className={styles.facts}>
            <p>
              <ContentIcon name="calendar" tone="blue" />
              <span>
                <time dateTime={EVENT.startsAt}>{EVENT_DATE}</time>
                {", "}
                <span className={styles.nowrap}>
                  {HOME_PAGE.heroCheckIn.replace("{{registrationTime}}", REGISTRATION_TIME)}
                </span>
              </span>
            </p>
            <p>
              <ContentIcon name="venue" tone="red" />
              <span>
                {EVENT.venue.name}, {EVENT.venue.city}
              </span>
            </p>
            {price && (
              <p>
                <ContentIcon name="tickets" tone="yellow" />
                <span>{price}</span>
              </p>
            )}
          </div>
          <div className={styles.actions}>
            <Link href="/tickets" className="audience-button space-primary-button">
              Get tickets <ArrowRight className="audience-icon" aria-hidden="true" />
            </Link>
            <Link href="/agenda" className="audience-button programme-outline-button">
              {HOME_PAGE.agendaLabel} <ArrowRight className="audience-icon" aria-hidden="true" />
            </Link>
            <ContentAction href="/badge" icon="themes" tone="green">
              {PAGE_COPY.badge.teaserAction}
            </ContentAction>
          </div>
        </div>
        <SpaceArtwork />
      </div>
    </section>
  );
}
