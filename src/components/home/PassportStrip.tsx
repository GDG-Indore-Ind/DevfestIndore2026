import Link from "next/link";
import { ArrowRight, Award, QrCode, Sparkles } from "lucide-react";
import ContentAction from "@/components/shared/ContentAction";
import styles from "./PassportStrip.module.css";

const pillars = [
  {
    icon: QrCode,
    tone: "blue",
    title: "Scan at sessions & labs",
    text: "Collect one stamp for every talk, hands-on workshop and exhibit demo you visit.",
  },
  {
    icon: Sparkles,
    tone: "green",
    title: "Complete special missions",
    text: "Check off Cake Wallet and Space Club stops automatically as you scan.",
  },
  {
    icon: Award,
    tone: "yellow",
    title: "Stateless & instant",
    text: "Open it in your browser with your email — no app install, queues offline.",
  },
] as const;

export default function PassportStrip() {
  return (
    <section
      id="passport"
      className={`audience-section ${styles.root}`}
      aria-labelledby="home-passport-title"
    >
      <div className="audience-wrap">
        <div className={styles.panel}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Event-day companion</p>
            <h2 id="home-passport-title">Your DevFest Passport.</h2>
            <p className={styles.lead}>
              Turn your day into an interactive stamp book. Scan activity QRs around the venue to
              track sessions, finish special missions and unlock event-day goodies.
            </p>
            <div className={styles.actions}>
              <Link href="/pass" className="audience-button">
                Open Passport <ArrowRight className="audience-icon" aria-hidden="true" />
              </Link>
              <ContentAction href="/agenda" icon="calendar" tone="blue">
                See stampable activities
              </ContentAction>
            </div>
          </div>
          <ul className={styles.pillars}>
            {pillars.map(({ icon: Icon, tone, title, text }) => (
              <li key={title} className={styles.pillar} data-tone={tone}>
                <span className={styles.tile} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
