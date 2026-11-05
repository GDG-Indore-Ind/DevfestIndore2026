"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeChoice from "@/components/layout/ThemeChoice";
import ExploreMenu from "@/components/layout/ExploreMenu";
import ReferralBanner from "@/components/tickets/ReferralBanner";
import OrbitScrollRail, { type FlightStop } from "@/components/layout/OrbitScrollRail";
import styles from "./Navbar.module.css";

interface NavbarProps {
  visibleAnchors?: string[];
  flightStops?: readonly FlightStop[];
}

export default function Navbar({ visibleAnchors, flightStops }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

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
        className={`audience-header explore-header ${styles.root} ${styles.exploreHeader}`}
        ref={header}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <div className={`audience-wrap audience-header-row ${styles.row}`}>
          <Link
            href="/#hero"
            className={`audience-brand ${styles.brand}`}
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
            <Image src="/gdg-logo.png" alt="" width={36} height={36} />
            <span className={`space-header-brand ${styles.brandName}`}>
              <span className={`space-brand-full ${styles.brandFull}`}>
                Google Developer Group<small>Indore</small>
              </span>
              <span className={`space-brand-compact ${styles.brandCompact}`}>GDG Indore</span>
            </span>
          </Link>

          <div className={`header-utilities ${styles.utilities}`}>
            <Link href="/agenda" className={`space-header-programme ${styles.programme}`}>
              Agenda
            </Link>
            <Link href="/#flow" className={`space-header-programme ${styles.programme}`}>
              Themes
            </Link>
            <div className={`header-theme ${styles.theme}`}>
              <ThemeChoice />
            </div>
            <button
              className={`explore-trigger ${styles.trigger}`}
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
            className={`audience-button space-primary-button header-ticket-cta ${styles.ticket}`}
            onClick={() => setOpen(false)}
          >
            <span className={`ticket-cta-full ${styles.ticketFull}`}>Get tickets</span>
            <span className={`ticket-cta-compact ${styles.ticketCompact}`}>Tickets</span>
          </Link>

          <ExploreMenu
            id={panelId}
            open={open}
            pathname={pathname}
            visibleAnchors={visibleAnchors}
            onNavigate={() => setOpen(false)}
          />
        </div>
        {flightStops && flightStops.length >= 4 && (
          <OrbitScrollRail stops={flightStops} onNavigate={() => setOpen(false)} />
        )}
      </header>
    </>
  );
}
