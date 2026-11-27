import Link from "next/link";
import { QrCode, ScanQrCode, Sparkles } from "lucide-react";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import { pageMetadata } from "@/lib/pageMetadata";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import Passport from "./Passport";
import styles from "./passport.module.css";

export const metadata = pageMetadata(
  "/pass",
  "DevFest Passport",
  "Your event-day passport for DevFest Indore 2026. Scan activity QRs, collect stamps, and complete special missions.",
);

export default function PassportPage() {
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro
          title="DevFest Passport"
          lead="Your event-day stamp book. Check in at talks, workshops and exhibits to collect stamps and unlock special missions."
          motif="tickets"
          meta={`${EVENT_SHORT_DATE} · ${EVENT.venue.name}`}
        />
        <section className={`audience-section ${styles.section}`} aria-label="Passport workspace">
          <div className="audience-wrap">
            <noscript>
              <p className={`${styles.notice} ${styles.wait}`}>
                Enable JavaScript to collect stamps and view your passport.
              </p>
            </noscript>
            <div className={styles.layout}>
              <Passport />
              <aside id="guide" className={styles.guide} aria-labelledby="guide-title">
                <div className={styles.guideHeader}>
                  <span className={styles.guideBadge} aria-hidden="true">
                    <QrCode className="audience-icon" />
                  </span>
                  <div>
                    <h2 id="guide-title">How to collect stamps</h2>
                    <p>No app install needed. Sign in with your KonfHub booking ID and email.</p>
                  </div>
                </div>
                <ol className={styles.steps}>
                  <li>
                    <span className={styles.stepNum} aria-hidden="true">
                      1
                    </span>
                    <div>
                      <h3>Join a session, lab or booth</h3>
                      <p>
                        Explore main-stage talks, hands-on workshops in Orbit Lab (Hall 1) &amp;
                        Launch Lab (Hall 2), and demos in the Exhibit Lounge.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.stepNum} aria-hidden="true">
                      2
                    </span>
                    <div>
                      <h3>Scan the activity QR</h3>
                      <p>
                        Look for the Passport QR card at each hall, or ask a booth volunteer after a
                        demo. Each code counts once.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.stepNum} aria-hidden="true">
                      3
                    </span>
                    <div>
                      <h3>Complete missions &amp; feedback</h3>
                      <p>
                        Participating sessions and booths check off Special Missions automatically.
                        Submit end-of-day feedback to finish your required steps.
                      </p>
                    </div>
                  </li>
                </ol>
                <div className={styles.guideLinks} aria-label="Find activities">
                  <Link href="/agenda#sessions">Sessions</Link>
                  <Link href="/agenda#workshops">Workshops</Link>
                  <Link href="/agenda#exhibits">Exhibits</Link>
                  <Link href="/agenda#activities">Activities</Link>
                </div>
                <div className={styles.faqList}>
                  <details>
                    <summary>When can I scan?</summary>
                    <p>
                      Scheduled sessions and workshops open 15 minutes before start and close 15
                      minutes after they end. Booth check-ins follow the hours on their QR cards.
                      All times are IST.
                    </p>
                  </details>
                  <details>
                    <summary>What if I lose signal?</summary>
                    <p>
                      Once signed in, your Passport queues scans on this device and retries when
                      signal returns. Reopen this page before the activity window closes.
                    </p>
                  </details>
                  <details>
                    <summary>Need a printed code entered?</summary>
                    <p>
                      Use the 6-character code printed below the QR if your camera can’t scan, or
                      visit the registration desk.
                    </p>
                  </details>
                </div>
                <div className={styles.guideNote}>
                  <Sparkles className="audience-icon" aria-hidden="true" />
                  <span>
                    <ScanQrCode className="sr-only" aria-hidden="true" />
                    Stamps are tied to your booking ID, so you can switch devices any time.
                  </span>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/agenda" icon="calendar" tone="blue">
            Browse the agenda
          </ContentAction>
          <ContentAction href="/venue" icon="venue" tone="green">
            Venue &amp; check-in
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
