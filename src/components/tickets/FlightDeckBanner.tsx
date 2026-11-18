import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EVENT_TICKETS } from "@/content/event";
import styles from "./FlightDeckBanner.module.css";

const pass = EVENT_TICKETS.passes.find((item) => item.id === "vip");

/** One compact upgrade card on the tickets page that leads to the full Flight Deck details. */
export default function FlightDeckBanner() {
  if (!pass) return null;
  return (
    <div className="audience-wrap">
      <Link href="/flight-deck" className={styles.banner}>
        <span className={styles.copy}>
          <span className={styles.audience}>{pass.audience}</span>
          <span className={styles.name}>{pass.name}</span>
          <span className={styles.summary}>{pass.summary}</span>
        </span>
        <span className={styles.meta}>
          {pass.price !== undefined && (
            <span className={styles.price}>From ₹{pass.price.toLocaleString("en-IN")}</span>
          )}
          <span className={styles.cta}>
            Explore the upgrade <ArrowRight aria-hidden="true" />
          </span>
        </span>
      </Link>
    </div>
  );
}
