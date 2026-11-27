"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode, type SubmitEvent } from "react";
import {
  Award,
  Check,
  Circle,
  Clock,
  Eye,
  EyeOff,
  QrCode,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import styles from "./passport.module.css";

const BOOKING_KEY = "devfest-pass-booking";
const EMAIL_KEY = "devfest-pass-email";
const QUEUE_KEY = "devfest-pass-queue";
const PROFILE_KEY = "devfest-pass-profile";

const kinds = {
  session: "Session",
  workshop: "Workshop",
  exhibit: "Exhibit",
  activity: "Activity",
  feedback: "Feedback",
  arrival: "Registration desk",
} as const;

const formats: Record<string, string> = {
  keynote: "Keynote",
  panel: "Panel",
  address: "Address",
  session: "Session",
  workshop: "Workshop",
  exhibit: "Exhibit",
  activity: "Activity",
  feedback: "Feedback",
  arrival: "Arrival",
};

const ist = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

type ActivityMeta = {
  format?: string;
  hall?: string;
  track?: string;
  agendaId?: string;
  tags?: string[];
};

type Step = ActivityMeta & {
  title: string;
  done: boolean;
  kind?: "feedback";
  opensAt?: string;
  closesAt?: string;
  url?: string;
};

type Stamp = ActivityMeta & {
  code?: string;
  title: string;
  kind: keyof typeof kinds;
  at: string;
};

type Result = ActivityMeta & {
  result: "added" | "already" | "not_open" | "closed" | "unknown";
  title?: string;
  code?: string;
  mission?: boolean;
  opensAt?: string;
  closesAt?: string;
};

type Profile = {
  status: "ok";
  bookingId: string;
  name: string;
  firstName: string;
  email: string;
  pass?: string;
  activityCount: number;
  stamps: Stamp[];
  required?: Step[];
  missions: (Step & { steps?: Step[] })[];
  stamp?: Result;
};

type CachedSnapshot = {
  profile: Profile;
  synced: string;
};

type Notice = { text: string; tone?: "ok" | "bad" | "wait" };

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* A blocked store still allows check-ins while the page is open. */
  }
}

function clean(value: string) {
  const code = value.trim().toUpperCase();
  return /^[A-Z0-9]{6}$/.test(code) ? code : "";
}

function readQueue() {
  try {
    const value: unknown = JSON.parse(read(QUEUE_KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string" && !!clean(item)).map(clean)
      : [];
  } catch {
    return [];
  }
}

function readSnapshot(booking: string, email: string): CachedSnapshot | null {
  try {
    const raw = read(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedSnapshot>;
    if (
      parsed?.profile?.status === "ok" &&
      parsed.profile.bookingId === booking &&
      (!parsed.profile.email || parsed.profile.email.toLowerCase() === email.toLowerCase()) &&
      Array.isArray(parsed.profile.stamps)
    ) {
      return { profile: parsed.profile, synced: parsed.synced || "" };
    }
  } catch {
    /* Ignore malformed cache and fetch fresh. */
  }
  return null;
}

function writeSnapshot(profile: Profile | null, synced: string) {
  if (!profile) {
    write(PROFILE_KEY, "");
    return;
  }
  write(PROFILE_KEY, JSON.stringify({ profile, synced }));
}

function indiaTime(utc?: string) {
  return utc ? `${ist.format(new Date(utc.replace(" ", "T") + "Z"))} IST` : "the scheduled time";
}

function agendaHref(agendaId?: string, kind?: string) {
  if (!agendaId) return "";
  if (kind === "activity" || agendaId === "community-lounge" || agendaId === "expert-lounge") {
    return "/agenda#activities";
  }
  return `/agenda#${encodeURIComponent(agendaId)}`;
}

function describe(stamp?: Result): Notice | null {
  if (!stamp) return null;
  const { result, title } = stamp;
  if (result === "added")
    return {
      text: `${stamp.mission ? "Mission complete" : "Stamp collected"} · ${title}`,
      tone: "ok",
    };
  if (result === "already") return { text: `Already stamped · ${title}` };
  if (result === "not_open")
    return { text: `Check-in for ${title} opens at ${indiaTime(stamp.opensAt)}.`, tone: "wait" };
  if (result === "closed")
    return { text: `Check-in for ${title} closed at ${indiaTime(stamp.closesAt)}.`, tone: "bad" };
  return {
    text: `Code ${stamp.code} wasn't recognised. Check the card and try again.`,
    tone: "bad",
  };
}

function ActivityTags({ item }: { item: ActivityMeta & { kind?: string } }) {
  const chips = [
    item.format && formats[item.format] ? formats[item.format] : "",
    item.hall || "",
    item.track || "",
  ].filter(Boolean);
  const href = agendaHref(item.agendaId, item.kind);
  if (!chips.length && !href) return null;
  return (
    <div className={styles.tagRow}>
      {chips.map((chip) => (
        <span key={chip} className={styles.tagChip}>
          {chip}
        </span>
      ))}
      {href && (
        <Link href={href} className={styles.agendaLink}>
          View on agenda
        </Link>
      )}
    </div>
  );
}

function ActivityRow({
  title,
  done,
  status,
  meta,
  children,
}: {
  title: string;
  done: boolean;
  status: string;
  meta?: ActivityMeta & { kind?: string };
  children?: ReactNode;
}) {
  return (
    <li className={styles.rowItem}>
      <span className={`${styles.mark} ${done ? styles.done : ""}`} aria-hidden="true">
        {done ? <Check size={16} strokeWidth={2.25} /> : <Circle size={14} strokeWidth={1.75} />}
      </span>
      <div className={styles.rowContent}>
        <span className={styles.rowTitle}>{title}</span>
        <span className={styles.rowMeta}>{status}</span>
        {meta && <ActivityTags item={meta} />}
        {children}
      </div>
    </li>
  );
}

export default function Passport() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [synced, setSynced] = useState("");
  const queue = useRef<string[]>([]);
  const savedBooking = useRef("");
  const savedEmail = useRef("");
  const active = useRef<AbortController | null>(null);

  const saveQueue = useCallback((codes: string[]) => {
    queue.current = codes;
    write(QUEUE_KEY, codes.length ? JSON.stringify(codes) : "");
  }, []);

  const rememberCredentials = useCallback((booking: string, address: string) => {
    savedBooking.current = booking;
    savedEmail.current = address;
    write(BOOKING_KEY, booking);
    write(EMAIL_KEY, address);
  }, []);

  const sync = useCallback(
    async (booking: string, address: string, name?: string) => {
      if (active.current) return;
      const controller = new AbortController();
      active.current = controller;
      setBusy(true);
      setNotice({ text: "Syncing your passport…" });
      let latestNotice: Notice | null = null;
      try {
        do {
          const code = queue.current[0];
          const response = await fetch("/api/pass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId: booking, email: address, name, code }),
            signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
          });
          const data: Profile | { status: string } = await response.json();
          if (controller.signal.aborted) return;
          if (data.status === "needs_name") {
            setNeedsName(true);
            setNotice({
              text: "New booking ID—add your name once to open your passport.",
            });
            return;
          }
          if (data.status === "email_mismatch") {
            rememberCredentials("", "");
            writeSnapshot(null, "");
            setProfile(null);
            setNeedsName(false);
            setNotice({
              text: "That email doesn’t match the ticket for this booking ID. Check your KonfHub email or visit the registration desk.",
              tone: "bad",
            });
            return;
          }
          if (data.status === "invalid_booking" || data.status === "invalid_email") {
            rememberCredentials("", "");
            setNeedsName(false);
            setNotice({
              text:
                data.status === "invalid_booking"
                  ? "That doesn’t look like a booking ID. Copy it from your KonfHub ticket email."
                  : "That email doesn’t look right. Please check it.",
              tone: "bad",
            });
            return;
          }
          if (!response.ok || data.status !== "ok" || !("stamps" in data))
            throw new Error("Passport unavailable");
          const nextEmail = data.email || address;
          const syncTime = ist.format(new Date());
          rememberCredentials(data.bookingId, nextEmail);
          setBookingId(data.bookingId);
          setEmail(nextEmail);
          setNeedsName(false);
          setProfile(data);
          setSynced(syncTime);
          writeSnapshot(data, syncTime);
          if (code) {
            saveQueue(queue.current.slice(1));
            latestNotice = describe(data.stamp) ?? latestNotice;
          }
        } while (queue.current.length);
        setNotice(latestNotice);
      } catch {
        if (!controller.signal.aborted)
          setNotice({
            text: queue.current.length
              ? "Couldn’t reach the passport. Your code is queued on this phone. Reopen the passport with a connection before check-in closes."
              : "Couldn’t reach the passport. Tap Refresh when you have signal.",
            tone: "wait",
          });
      } finally {
        if (active.current === controller) {
          active.current = null;
          setBusy(false);
        }
      }
    },
    [rememberCredentials, saveQueue],
  );

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams(location.search);
    const code = clean(params.get("c") || "");
    const hasCodeParam = params.has("c");
    const pending = readQueue();
    const nextQueue = code ? [...new Set([...pending, code])] : pending;
    saveQueue(nextQueue);
    if (code) {
      const url = new URL(location.href);
      url.searchParams.delete("c");
      history.replaceState(history.state, "", url);
    }

    const storedBooking = read(BOOKING_KEY) || "";
    const storedEmail = read(EMAIL_KEY) || "";
    savedBooking.current = storedBooking;
    savedEmail.current = storedEmail;
    const cached = storedBooking && storedEmail ? readSnapshot(storedBooking, storedEmail) : null;

    queueMicrotask(() => {
      if (cancelled) return;
      if (storedBooking) setBookingId(storedBooking);
      if (storedEmail) setEmail(storedEmail);
      if (cached) {
        setProfile(cached.profile);
        setSynced(cached.synced);
      }

      if (storedBooking && storedEmail) {
        // Only hit D1 on load when there is a pending scan or no local snapshot yet.
        if (nextQueue.length > 0 || !cached) {
          void sync(storedBooking, storedEmail);
        }
      } else if (code) {
        setNotice({
          text: `Code ${code} is ready. Enter your booking ID and email to save this stamp.`,
        });
      } else if (hasCodeParam) {
        setNotice({
          text: "Activity codes use six letters or numbers. Check the card and try again.",
          tone: "bad",
        });
      }
    });

    function retry() {
      if (
        document.visibilityState === "visible" &&
        savedBooking.current &&
        savedEmail.current &&
        queue.current.length
      ) {
        void sync(savedBooking.current, savedEmail.current);
      }
    }
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", retry);
    return () => {
      cancelled = true;
      active.current?.abort();
      active.current = null;
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", retry);
    };
  }, [saveQueue, sync]);

  function signIn(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const booking = bookingId.replace(/\s+/g, "").toUpperCase();
    const address = email.trim().toLowerCase();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    if (!booking || !address || active.current) return;
    setBookingId(booking);
    setEmail(address);
    void sync(booking, address, name || undefined);
  }

  function addStamp(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = clean(String(new FormData(event.currentTarget).get("code") ?? ""));
    if (!code || !savedBooking.current || !savedEmail.current || active.current) return;
    saveQueue([...new Set([...queue.current, code])]);
    event.currentTarget.reset();
    void sync(savedBooking.current, savedEmail.current);
  }

  function refreshNow() {
    if (!savedBooking.current || !savedEmail.current || active.current) return;
    void sync(savedBooking.current, savedEmail.current);
  }

  function switchBooking() {
    rememberCredentials("", "");
    writeSnapshot(null, "");
    saveQueue([]);
    setProfile(null);
    setShowcase(false);
    setBookingId("");
    setEmail("");
    setNeedsName(false);
    setNotice(null);
  }

  const latest = profile?.stamps.at(-1);
  const completedMissions = profile?.missions.filter(({ done }) => done).length ?? 0;
  const totalMissions = profile?.missions.length ?? 0;

  return (
    <div className={styles.workspace}>
      {notice && (
        <p className={`${styles.notice} ${notice.tone ? styles[notice.tone] : ""}`} role="status">
          {notice.text}
        </p>
      )}
      {!profile ? (
        <form id="signin" className={styles.panel} aria-labelledby="signin-title" onSubmit={signIn}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon} aria-hidden="true">
              <Sparkles className="audience-icon" />
            </span>
            <div>
              <h2 id="signin-title">Open your passport</h2>
              <p>
                Enter your KonfHub booking ID and email. Each ticket in a group booking has its own
                ID.
              </p>
            </div>
          </div>
          <label className={styles.label} htmlFor="booking">
            KonfHub booking ID
          </label>
          <input
            id="booking"
            className={`${styles.input} ${styles.codeInput}`}
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="e.g. 7D261A35"
            maxLength={64}
            required
            value={bookingId}
            onChange={(event) => {
              setBookingId(event.target.value);
              setNeedsName(false);
            }}
          />
          <label className={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {needsName && (
            <div id="walkin" className={styles.walkin}>
              <label className={styles.label} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                className={styles.input}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                maxLength={80}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className={`audience-button ${styles.submitButton}`}
            disabled={busy}
          >
            Continue to passport
          </button>
        </form>
      ) : (
        <section className={styles.dashboard} aria-label="Your passport">
          <section
            className={`${styles.panel} ${styles.profileCard} ${showcase ? styles.showcaseCard : ""}`}
            aria-labelledby="greeting"
          >
            <div className={styles.profileTop}>
              <div>
                <p className={styles.eyebrow}>
                  {showcase ? "DevFest Indore 2026 · Passport Showcase" : "Event-day Passport"}
                </p>
                <h2 id="greeting">{showcase ? profile.name : `Hi, ${profile.firstName}`}</h2>
                <p className={styles.identity}>
                  {!showcase && (
                    <>
                      {profile.name}
                      {profile.email && <> · {profile.email}</>}
                      <br />
                    </>
                  )}
                  {showcase && profile.email && (
                    <>
                      {profile.email}
                      <br />
                    </>
                  )}
                  Booking ID <strong className={styles.inlineCode}>{profile.bookingId}</strong>
                </p>
              </div>
              <div className={styles.profileBadges}>
                {profile.pass && profile.pass !== "Passport" && (
                  <span className={styles.passTag}>{profile.pass}</span>
                )}
                <button
                  type="button"
                  className={styles.iconAction}
                  onClick={() => setShowcase((value) => !value)}
                  aria-pressed={showcase}
                >
                  {showcase ? (
                    <>
                      <EyeOff size={15} aria-hidden="true" />
                      Standard view
                    </>
                  ) : (
                    <>
                      <Eye size={15} aria-hidden="true" />
                      Showcase
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={`${styles.stat} ${styles.statBlue}`}>
                <span className={styles.statLabel}>
                  <Award size={16} aria-hidden="true" />
                  Stamps collected
                </span>
                <strong>{profile.activityCount}</strong>
              </div>
              {totalMissions > 0 && (
                <div className={`${styles.stat} ${styles.statGreen}`}>
                  <span className={styles.statLabel}>
                    <Sparkles size={16} aria-hidden="true" />
                    Special missions
                  </span>
                  <strong>
                    {completedMissions} / {totalMissions}
                  </strong>
                </div>
              )}
            </div>

            {latest && (
              <p className={styles.latest}>
                Most recent stamp · <strong>{latest.title}</strong>
              </p>
            )}

            {!showcase && !!profile.required?.length && (
              <div className={styles.requiredBlock}>
                <h3 className={styles.subHeading}>Required checkpoints</h3>
                <ul className={styles.stamps} aria-label="Required check-ins">
                  {profile.required.map((step) => {
                    const feedback = step.kind === "feedback" && !step.done;
                    const status = feedback
                      ? `Required · ${indiaTime(step.opensAt)} to ${indiaTime(step.closesAt)}`
                      : `Required check-in · ${step.done ? "Complete" : "To do"}`;
                    return (
                      <ActivityRow
                        key={step.title}
                        title={step.title}
                        status={status}
                        done={step.done}
                        meta={step}
                      >
                        {feedback && (
                          <div className={styles.feedbackActions}>
                            {step.url && (
                              <a className="audience-text-link" href={step.url}>
                                Open feedback form
                              </a>
                            )}
                            <span className={styles.rowMeta}>
                              After submitting, enter the six-character code you receive below.
                            </span>
                          </div>
                        )}
                      </ActivityRow>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className={styles.syncBar}>
              <p className={styles.syncMeta}>
                <Clock size={14} aria-hidden="true" />
                {synced ? `Last synced at ${synced} IST` : "Ready"}
              </p>
              <button
                type="button"
                className={styles.refreshButton}
                disabled={busy}
                onClick={refreshNow}
              >
                <RefreshCw size={14} aria-hidden="true" />
                {busy ? "Syncing…" : "Refresh"}
              </button>
            </div>
          </section>

          {!showcase && (
            <form
              className={styles.panel}
              autoComplete="off"
              aria-labelledby="code-title"
              onSubmit={addStamp}
            >
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon} aria-hidden="true">
                  <QrCode className="audience-icon" />
                </span>
                <div>
                  <h2 id="code-title">Add a stamp</h2>
                  <p>Scan an activity QR with your camera, or enter the 6-character code.</p>
                </div>
              </div>
              <label className={styles.label} htmlFor="code">
                Activity code
              </label>
              <div className={styles.codeRow}>
                <input
                  id="code"
                  name="code"
                  className={`${styles.input} ${styles.codeInput}`}
                  placeholder="e.g. BE6ZA3"
                  minLength={6}
                  maxLength={6}
                  pattern="[A-Za-z0-9]{6}"
                  autoCapitalize="characters"
                  spellCheck={false}
                  required
                />
                <button
                  type="submit"
                  id="code-button"
                  className={`audience-button ${styles.codeButton}`}
                  disabled={busy}
                >
                  Add stamp
                </button>
              </div>
            </form>
          )}

          {totalMissions > 0 && (
            <section className={styles.panel}>
              <h2 className={styles.sectionHeading}>Special missions</h2>
              <p className={styles.sectionLead}>
                Complete mission stops to unlock bonus partner rewards and swag.
              </p>
              <ul id="missions" className={styles.missions}>
                {profile.missions.map((mission) =>
                  mission.steps && mission.steps.length >= 2 ? (
                    <li className={styles.missionGroup} key={mission.title}>
                      <details open={!mission.done || showcase}>
                        <summary className={styles.missionSummary}>
                          <span>{mission.title}</span>
                          <span className={styles.missionCount}>
                            {mission.steps.filter(({ done }) => done).length} of{" "}
                            {mission.steps.length} complete
                          </span>
                        </summary>
                        <ul className={styles.stamps}>
                          {mission.steps.map((step) => (
                            <ActivityRow
                              key={step.title}
                              title={step.title}
                              status={step.done ? "Complete" : "To do"}
                              done={step.done}
                              meta={step}
                            />
                          ))}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <ActivityRow
                      key={mission.title}
                      title={mission.title}
                      status={mission.done ? "Complete" : "Visit the exhibit"}
                      done={mission.done}
                      meta={mission}
                    />
                  ),
                )}
              </ul>
            </section>
          )}

          <section className={styles.panel}>
            <h2 className={styles.sectionHeading}>Your stamps</h2>
            {profile.stamps.length ? (
              <ol className={styles.stamps}>
                {profile.stamps
                  .slice()
                  .reverse()
                  .map((stamp, index) => (
                    <ActivityRow
                      key={`${stamp.title}:${stamp.at}:${index}`}
                      title={stamp.title}
                      status={kinds[stamp.kind] ?? stamp.kind}
                      done
                      meta={stamp}
                    />
                  ))}
              </ol>
            ) : (
              <p className={styles.emptyStamps}>
                Your first stamp will appear here after you scan an activity QR.
              </p>
            )}
          </section>

          <button
            type="button"
            className={`audience-text-link ${styles.switchButton}`}
            id="switch"
            disabled={busy}
            onClick={switchBooking}
          >
            Use a different booking ID
          </button>
        </section>
      )}
    </div>
  );
}
