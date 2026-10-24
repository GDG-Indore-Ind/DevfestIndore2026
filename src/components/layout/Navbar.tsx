"use client";

import { EVENT, EVENT_WEEKDAY_DATE } from "@/content/event";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Rocket,
  CalendarDays,
  MapPin,
  CircleHelp,
  History,
  Users,
  Handshake,
  Layers,
  Monitor,
  Images,
  ClipboardCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_PAGE, AMBASSADORS_PAGE } from "@/content/pages";
import ThemeChoice from "@/components/layout/ThemeChoice";
import ReferralBanner from "@/components/tickets/ReferralBanner";
import SocialLinks from "@/components/shared/SocialLinks";
import OrbitScrollRail, { type FlightStop } from "@/components/layout/OrbitScrollRail";

interface NavbarProps {
  visibleAnchors?: string[];
  flightStops?: readonly FlightStop[] | true;
}

export default function Navbar({ visibleAnchors, flightStops }: NavbarProps) {
  const attendLinks = [
    {
      href: "/ambassadors",
      label: AMBASSADORS_PAGE.navigationLabel,
      detail: AMBASSADORS_PAGE.navigationDetail,
      Icon: Users,
    },
    {
      href: "/tickets",
      label: "Tickets & pass details",
      detail: "Pass inclusions, eligibility and booking information",
      Icon: Rocket,
    },
    {
      href: "/guidelines",
      label: "Registration guidelines",
      detail: "KonfHub details, entry ID and ticket policies",
      Icon: ClipboardCheck,
    },
  ];
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  const discoverLinks = [
    {
      anchor: "flow",
      href: "/#flow",
      label: "Themes",
      detail: "Four frontiers · agenda coming soon",
      Icon: Layers,
    },
    {
      anchor: "exhibits",
      href: "/#exhibits",
      label: HOME_PAGE.exhibits.navigationLabel,
      detail: HOME_PAGE.exhibits.navigationDetail,
      Icon: Monitor,
    },
    {
      anchor: "venue",
      href: "/venue",
      label: "Getting here",
      detail: `${EVENT.venue.name}, ${EVENT.venue.city}`,
      Icon: MapPin,
    },
    {
      anchor: "sponsors",
      href: "/partners",
      label: "Partners & collaborators",
      detail: "This edition’s collaborators and how to get involved",
      Icon: Handshake,
    },
    {
      anchor: "workshops",
      href: "/events",
      label: "Workshops & events",
      detail: "Community sessions and campus workshops",
      Icon: CalendarDays,
    },
    {
      anchor: "faq",
      href: "/faq",
      label: "Common questions",
      detail: "Practical answers before you attend",
      Icon: CircleHelp,
    },
  ].filter(
    (link) =>
      link.anchor === "workshops" ||
      link.anchor === "faq" ||
      !visibleAnchors ||
      visibleAnchors.includes(link.anchor),
  );

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <a className="audience-skip-link" href="#main-content">
        Skip to content
      </a>
      <ReferralBanner />
      <header
        className="audience-header explore-header"
        ref={header}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <div className="audience-wrap audience-header-row">
          <Link
            href="/#hero"
            className="audience-brand"
            aria-label="DevFest Indore home"
            onClick={(event) => {
              setOpen(false);
              if (
                pathname !== "/" ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              document.getElementById("hero")?.scrollIntoView({ block: "start" });
            }}
          >
            <Image src="/gdglogo-removebg-preview.png" alt="" width={36} height={36} />
            <span className="space-header-brand">
              <span className="space-brand-full">
                Google Developer Group<small>Indore</small>
              </span>
              <span className="space-brand-compact">GDG Indore</span>
            </span>
          </Link>

          <SocialLinks primaryOnly className="header-socials" />
          <div className="header-utilities">
            <Link href="/#flow" className="space-header-programme">
              Themes
            </Link>
            <ThemeChoice />
            <button
              className="explore-trigger"
              type="button"
              ref={trigger}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(!open)}
            >
              <span className="explore-trigger-dot" aria-hidden="true" />
              <span>Explore</span>
              <ChevronDown className="audience-icon" aria-hidden="true" />
            </button>
          </div>
          <Link
            href="/tickets"
            className="audience-button space-primary-button header-ticket-cta"
            onClick={() => setOpen(false)}
          >
            Get tickets
          </Link>

          <nav className="explore-panel" id={panelId} aria-label="Explore DevFest" hidden={!open}>
            <div className="explore-panel-top">
              <span>{EVENT.name}</span>
              <span>{EVENT_WEEKDAY_DATE}</span>
            </div>

            <div className="explore-columns">
              <div className="explore-attend">
                <p className="explore-group-label">Attend</p>
                {attendLinks.map(({ href, label, detail, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="explore-attend-link"
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="explore-link-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{label}</strong>
                      <small>{detail}</small>
                    </span>
                    <ArrowRight className="audience-icon" aria-hidden="true" />
                  </Link>
                ))}
              </div>

              <div className="explore-discover">
                <p className="explore-group-label">Discover</p>
                {discoverLinks.map(({ href, label, detail, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    <Icon className="audience-icon" aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      <small>{detail}</small>
                    </span>
                    <ArrowRight className="audience-icon" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="explore-archive">
                <p className="explore-group-label">The archive</p>
                <div>
                  {[
                    { href: "/past-events", label: "Past editions", Icon: History },
                    { href: "/past-speakers", label: "Past speakers", Icon: Users },
                    { href: "/past-sponsors", label: "Past sponsors", Icon: Handshake },
                    { href: "/gallery", label: "Photo gallery", Icon: Images },
                  ].map(({ href, label, Icon }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)}>
                      <Icon className="audience-icon" aria-hidden="true" />
                      {label}
                      <ArrowRight className="audience-icon" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
        {flightStops && (
          <OrbitScrollRail
            stops={flightStops === true ? undefined : flightStops}
            onNavigate={() => setOpen(false)}
          />
        )}
      </header>
    </>
  );
}
