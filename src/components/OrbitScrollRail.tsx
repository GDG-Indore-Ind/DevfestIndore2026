"use client";

import { memo, useEffect, useRef, type CSSProperties } from "react";
import { Rocket } from "lucide-react";

export interface FlightStop { id: string; label: string }

const homeStops = [
  { id: "hero", label: "Launch" },
  { id: "flow", label: "Themes" },
  { id: "sponsors", label: "Partners & collaborators" },
  { id: "archive", label: "Community" },
  { id: "venue", label: "Venue" },
  { id: "tickets", label: "Tickets" },
] as const;

function FlightPath({ mini = false }: { mini?: boolean }) {
  return (
    <div className={mini ? "flight-path flight-path-mini" : "flight-path"} aria-hidden="true">
      <span className="flight-path-line" />
      <span className="flight-path-travelled" />
      <span className="flight-craft-travel"><span className="flight-craft"><Rocket /><span className="flight-flame" /></span></span>
      {mini && <span className="flight-mini-planet" />}
    </div>
  );
}

function OrbitScrollRail({ stops = homeStops }: { stops?: readonly FlightStop[] }) {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    let frame = 0;
    let maxScroll = 1;
    let destinations: number[] = [];
    let activeId = "";
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>("[data-flight-stop]"));

    function update() {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, maxScroll));
      // Equal visual stops, mapped to real section positions. Short sections
      // still have their own landing point without overlapping click targets.
      let segment = 0;
      while (segment < destinations.length - 2 && y >= destinations[segment + 1]) segment++;
      const start = destinations[segment] ?? 0;
      const end = destinations[segment + 1] ?? maxScroll;
      const part = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      const progress = maxScroll <= 1 ? 0 : y >= maxScroll - 1 ? 1 : (segment + part) / stops.length;
      element!.style.setProperty("--flight-progress", String(progress));
      element!.dataset.arrived = String(y >= maxScroll - 3 && maxScroll > 1);
      const nextId = stops[maxScroll <= 1 ? 0 : Math.min(segment, stops.length - 1)].id;
      if (nextId !== activeId) {
        activeId = nextId;
        links.forEach(link => {
          if (link.dataset.flightStop === nextId) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }

    function measure() {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      destinations = stops.map(stop => {
        const target = document.getElementById(stop.id);
        return Math.min(maxScroll, Math.max(0, (target?.getBoundingClientRect().top ?? 0) + window.scrollY - 104));
      });
      destinations.push(maxScroll);
      schedule();
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [stops]);

  return (
    <div className="orbital-scroll" ref={rail} style={{ "--flight-stop-count": stops.length } as CSSProperties}>
      <nav className="flight-sidebar" aria-label="Explore the page">
        <FlightPath />
        <ol>{stops.map(stop => (
          <li key={stop.id}><a href={`#${stop.id}`} data-flight-stop={stop.id} aria-label={stop.label}>
            <span className="flight-stop-dot" aria-hidden="true" />
            <span className="flight-stop-label">{stop.label}</span>
          </a></li>
        ))}</ol>
        <a href={`#${stops[0].id}`} className="flight-destination" aria-label="Back to launch — return to top">
          <span className="flight-planet" aria-hidden="true"><span /></span>
          <span className="flight-stop-label"><span className="flight-arriving-label">Next stop: the planet</span><span className="flight-arrived-label">Touchdown. Back to top ↑</span></span>
        </a>
      </nav>
      <div className="flight-mobile" aria-hidden="true"><FlightPath mini /></div>
    </div>
  );
}

export default memo(OrbitScrollRail);
