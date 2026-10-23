"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { EventPartner } from "@/content/model";
import { PARTNERS_PAGE } from "@/content/pages";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./PartnerCarousel.module.css";

const copy = PARTNERS_PAGE.carousel;

export default function PartnerCarousel({ items }: { items: EventPartner[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const multiple = items.length > 1;

  function moveTo(index: number) {
    const node = rail.current;
    const slide = node?.children[index] as HTMLElement | undefined;
    if (!node || !slide) return;
    node.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!multiple || paused || hovered || focused) return;
    const timer = window.setInterval(() => {
      if (
        document.hidden ||
        !inView.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      moveTo((active + 1) % items.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [active, multiple, paused, hovered, focused, items.length]);

  if (!items.length) return null;
  return (
    <div
      className={styles.root}
      role="region"
      aria-label={copy.label}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {multiple && (
        <div className={styles.controls}>
          <button
            type="button"
            aria-label={copy.previousLabel}
            onClick={() => moveTo((active - 1 + items.length) % items.length)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span className={styles.count}>
            {active + 1} / {items.length}
          </span>
          <button
            type="button"
            aria-label={copy.nextLabel}
            onClick={() => moveTo((active + 1) % items.length)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.playback}
            aria-label={paused ? copy.playLabel : copy.pauseLabel}
            aria-pressed={!paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      )}
      <div
        ref={rail}
        className={styles.rail}
        data-multiple={multiple}
        tabIndex={multiple ? 0 : undefined}
        aria-label={copy.label}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            !["ArrowLeft", "ArrowRight"].includes(event.key)
          )
            return;
          event.preventDefault();
          moveTo((active + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length);
        }}
        onScroll={() => {
          const node = rail.current;
          if (!node) return;
          const positions = Array.from(node.children, (child) =>
            Math.abs((child as HTMLElement).offsetLeft - node.scrollLeft),
          );
          setActive(positions.indexOf(Math.min(...positions)));
        }}
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className={styles.card}
            aria-label={`${item.name} (${index + 1}/${items.length})`}
          >
            <div className={styles.logo}>
              {item.logoUrl ? (
                <Image
                  src={item.logoUrl}
                  alt={item.name}
                  width={640}
                  height={400}
                  sizes="(max-width: 760px) 80vw, 460px"
                />
              ) : (
                <span>{item.name}</span>
              )}
            </div>
            <div className={styles.copy}>
              <p className={styles.role}>{item.role}</p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.topics && (
                <dl className={styles.topics}>
                  {item.topics.map((topic) => (
                    <div key={topic.title}>
                      <dt>{topic.title}</dt>
                      <dd>{topic.text}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {item.websiteUrl && (
                <ContentAction
                  href={item.websiteUrl}
                  icon={item.featured === "space" ? "rocket" : "partners"}
                  tone={item.featured === "space" ? "blue" : "green"}
                  external
                >
                  {copy.exploreLabel}
                </ContentAction>
              )}
            </div>
          </article>
        ))}
      </div>
      {multiple && (
        <div className={styles.indicators} aria-label={copy.positionLabel}>
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-label={item.name}
              aria-current={active === index ? "true" : undefined}
              onClick={() => moveTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
