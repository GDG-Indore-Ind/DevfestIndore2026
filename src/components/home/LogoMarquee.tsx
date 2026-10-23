"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { HOME_PAGE } from "@/content/pages";
import type { Organization } from "@/content/model";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import ExternalLink from "@/components/shared/ExternalLink";

import styles from "./LogoMarquee.module.css";

export type MarqueeOrganization = Pick<
  Organization,
  "id" | "name" | "logoUrl" | "archiveLogoWindow"
> & { href?: string; detail?: string };

export default function LogoMarquee({
  items,
  label,
  description,
  action,
}: {
  items: MarqueeOrganization[];
  label: string;
  description?: string;
  action?: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  if (!items.length) return null;
  // Each visual group spans the site's widest content area, including short lists.
  const repetitions = Math.ceil(7 / items.length);
  const group = (clone: boolean) => (
    <ul className={styles.group} aria-hidden={clone || undefined} inert={clone || undefined}>
      {Array.from({ length: repetitions }, (_, repeat) =>
        items.map((item) => {
          const decorative = clone || repeat > 0;
          const content = (
            <>
              <span className={styles.plate}>
                <OrganizationLogo organization={item} />
              </span>
              <span className={styles.name}>{item.name}</span>
              {item.detail && <small>{item.detail}</small>}
            </>
          );
          return (
            <li
              key={`${repeat}-${item.id}`}
              aria-hidden={decorative || undefined}
              inert={decorative || undefined}
              data-repeat={repeat > 0 || undefined}
            >
              {item.href && !decorative ? (
                <ExternalLink href={item.href} className={styles.item}>
                  {content}
                </ExternalLink>
              ) : (
                <span className={styles.item}>{content}</span>
              )}
            </li>
          );
        }),
      )}
    </ul>
  );
  return (
    <section className={styles.root} aria-label={label}>
      <div className={styles.heading}>
        <div>
          <h3>{label}</h3>
          {description && <p>{description}</p>}
        </div>
        <div className={styles.controls}>
          {action}
          <button
            type="button"
            className={styles.toggle}
            aria-label={`${paused ? HOME_PAGE.marqueePlayLabel : HOME_PAGE.marqueePauseLabel}: ${label}`}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={styles.window}>
        <div className={styles.track} data-paused={paused}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
