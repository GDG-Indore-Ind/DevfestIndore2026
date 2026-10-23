"use client";

import { memo, useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { Rocket } from "lucide-react";

export interface FlightStop {
  id: string;
  label: string;
}

const homeStops = [
  { id: "hero", label: "Launch" },
  { id: "flow", label: "Programme" },
  { id: "sponsors", label: "Partners" },
  { id: "archive", label: "Community" },
  { id: "venue", label: "Venue" },
] as const;

function OrbitScrollRail({
  stops = homeStops,
  onNavigate,
}: {
  stops?: readonly FlightStop[];
  onNavigate?: () => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  function returnToTop(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    window.history.replaceState(window.history.state, "", `#${stops[0].id}`);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  useEffect(() => {
    const element = rail.current;
    if (!element || !stops.length) return;
    const header = document.querySelector<HTMLElement>(".audience-header");
    const site = element.closest<HTMLElement>(".audience-site");
    let frame = 0;
    let maxScroll = 1;
    let destinations: number[] = [];
    let activeId = "";
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>("[data-flight-stop]"));

    function update() {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, maxScroll));
      let segment = 0;
      while (segment < destinations.length - 2 && y + 2 >= destinations[segment + 1]) segment++;
      const start = destinations[segment] ?? 0;
      const end = destinations[segment + 1] ?? maxScroll;
      const part = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      const progress =
        maxScroll <= 1 ? 0 : y >= maxScroll - 1 ? 1 : (segment + part) / stops.length;
      element!.style.setProperty("--flight-progress", String(progress));
      element!.dataset.arrived = String(y >= maxScroll - 3 && maxScroll > 1);
      const nextId = stops[maxScroll <= 1 ? 0 : Math.min(segment, stops.length - 1)].id;
      if (nextId !== activeId) {
        activeId = nextId;
        links.forEach((link) => {
          if (link.dataset.flightStop === nextId) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }

    function measure() {
      const headerHeight = header?.getBoundingClientRect().height ?? 80;
      element!.style.setProperty(
        "--flight-distance",
        `${element!.querySelector(".flight-path")?.getBoundingClientRect().width ?? 0}px`,
      );
      site?.style.setProperty("--flight-header-height", `${headerHeight}px`);
      const offset = headerHeight + 16;
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      destinations = stops.map((stop) => {
        const target = document.getElementById(stop.id);
        return Math.min(
          maxScroll,
          Math.max(0, (target?.getBoundingClientRect().top ?? 0) + window.scrollY - offset),
        );
      });
      destinations.push(maxScroll);
      schedule();
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    if (header) observer.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      site?.style.removeProperty("--flight-header-height");
    };
  }, [stops]);

  if (!stops.length) return null;
  return (
    <div
      className="orbital-scroll"
      ref={rail}
      style={
        {
          "--flight-stop-count": stops.length,
          "--flight-edge": `${50 / (stops.length + 1)}%`,
        } as CSSProperties
      }
    >
      <nav className="flight-navigation" aria-label="Explore the page">
        <div className="flight-path" aria-hidden="true">
          <span className="flight-path-line" />
          <span className="flight-path-travelled" />
          <span className="flight-craft-travel">
            <span className="flight-craft">
              <Rocket />
              <span className="flight-flame" />
            </span>
          </span>
        </div>
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            data-flight-stop={stop.id}
            aria-label={stop.label}
            onClick={index === 0 ? returnToTop : onNavigate}
          >
            <span className="flight-stop-dot" aria-hidden="true" />
            <span className="flight-stop-label">{stop.label}</span>
          </a>
        ))}
        <a
          href={`#${stops[0].id}`}
          className="flight-destination"
          aria-label="Back to launch — return to top"
          onClick={returnToTop}
        >
          <span className="flight-planet" aria-hidden="true">
            <span />
          </span>
          <span className="flight-stop-label">
            <span className="flight-arriving-label">Touchdown</span>
            <span className="flight-arrived-label">Back to top ↑</span>
          </span>
        </a>
      </nav>
    </div>
  );
}

export default memo(OrbitScrollRail);
