import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Passport from "./Passport";
import styles from "./passport.module.css";

export const metadata: Metadata = {
  title: "DevFest Passport",
  robots: { index: false, follow: false },
};

export default function PassportPage() {
  return (
    <div className={styles.page}>
      <main>
        <header>
          <Link href="/">
            <Image src="/gdg-logo.png" width={28} height={28} alt="" />
            DevFest Indore
          </Link>
          <nav aria-label="Event links">
            <Link href="/agenda">Agenda</Link>
            <a href="#guide">How it works</a>
          </nav>
        </header>
        <div className={styles["intro"]}>
          <div>
            <p className={styles["event-date"]}>DevFest Indore 2026 · 28 November</p>
            <h1>DevFest Passport</h1>
            <p>
              Your event-day record. Collect one stamp for each participating activity you check in
              to.
            </p>
          </div>
          <Image src="/images/android-astronaut-2026.webp" width={200} height={200} alt="" />
        </div>

        <noscript>
          <p className={styles["notice"] + " " + styles["wait"]}>
            Enable JavaScript to collect stamps and view your passport.
          </p>
        </noscript>
        <div className={styles.layout}>
          <Passport />
          <aside
            id="guide"
            className={styles["panel"] + " " + styles["guide"]}
            aria-labelledby="guide-title"
          >
            <h2 id="guide-title">How to collect stamps</h2>
            <ol>
              <li>
                <div>
                  <h3>Pick an activity</h3>
                  <p>
                    Find main-stage talks and workshops in the agenda. Workshops run in Orbit Lab
                    (Hall 1) and Launch Lab (Hall 2). Visit the Exhibit Lounge for demos.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Find the activity QR</h3>
                  <p>
                    Look for a QR card at the session or lab. At a participating booth, ask the
                    volunteer for the QR after the demo.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Scan and check your passport</h3>
                  <p>
                    Each activity adds one stamp. If it’s a special mission, the same scan also
                    checks it off.
                  </p>
                </div>
              </li>
            </ol>
            <nav className={styles["guide-links"]} aria-label="Find activities">
              <Link href="/agenda#sessions">Sessions</Link>
              <Link href="/agenda#workshops">Workshops</Link>
              <Link href="/agenda#exhibits">Exhibits</Link>
            </nav>
            <details>
              <summary>When can I scan?</summary>
              <p>
                Scheduled sessions and workshops open 15 minutes before they start and close 15
                minutes after they end. Booth check-ins follow the hours on their QR cards. All
                times are IST.
              </p>
            </details>
            <details>
              <summary>What if I lose signal?</summary>
              <p>
                If you’re signed in, the passport can save a scan on this phone and retry when your
                connection returns. Reopen the passport before the activity’s check-in closes.
              </p>
            </details>
          </aside>
        </div>
      </main>
    </div>
  );
}
