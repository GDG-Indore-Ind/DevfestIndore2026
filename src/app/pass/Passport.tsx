"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SubmitEvent,
} from "react";
import {
  Award,
  Check,
  Circle,
  Clock,
  Eye,
  EyeOff,
  Gift,
  MessageSquare,
  QrCode,
  Sparkles,
} from "lucide-react";
import Chip from "@/components/shared/Chip";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import { FORMAT_TONES } from "@/lib/agendaFormat";
import styles from "./passport.module.css";

const BOOKING_KEY = "devfest-pass-booking";
const LEGACY_EMAIL_KEY = "devfest-pass-email";
const QUEUE_KEY = "devfest-pass-queue";
const PROFILE_KEY = "devfest-pass-profile";

type StampKind = "session" | "workshop" | "exhibit" | "activity" | "feedback" | "arrival";

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

/** Stamp groups below the exhibits, in agenda order. */
const stampGroups = [
  ["session", "Sessions"],
  ["workshop", "Workshops"],
  ["activity", "Activities"],
  ["feedback", "Feedback"],
  ["arrival", "Registration desk"],
] as const;

/** Every exhibit, three talks or workshops, and more than ten stamps for the bonus. */
const SESSIONS_NEEDED = 3;
const BONUS_STAMPS = 11;

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
  kind: StampKind;
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
  email?: string;
  pass?: string;
  activityCount: number;
  stamps: Stamp[];
  required?: Step[];
  missions: (Step & { steps?: Step[] })[];
  stamp?: Result;
};

/** Schedule and presenters for one agenda item, prepared by the page. */
export type AgendaEntry = {
  time?: string;
  end?: string;
  people: { name: string; avatar?: string }[];
  byline: string;
  logo?: string;
};
export type AgendaLookup = Record<string, AgendaEntry>;

export type ExhibitTarget = { agendaId: string; title: string; logo: ReactNode };

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

function readSnapshot(booking: string): CachedSnapshot | null {
  try {
    const raw = read(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedSnapshot>;
    if (
      parsed?.profile?.status === "ok" &&
      parsed.profile.bookingId === booking &&
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
      text: `Stamp collected · ${title}`,
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
  const format = item.format && formats[item.format];
  const href = agendaHref(item.agendaId, item.kind);
  if (!format && !item.track && !href) return null;
  return (
    <div className={styles.tagRow}>
      {format && <Chip tone={FORMAT_TONES[item.format ?? ""] ?? "neutral"}>{format}</Chip>}
      {item.track && <span className={styles.tagChip}>{item.track}</span>}
      {href && (
        <Link href={href} className={styles.agendaLink}>
          View on agenda
        </Link>
      )}
    </div>
  );
}

/** Speaker faces or the partner's mark, with the check-in state as a corner badge. */
function RowMark({ done, entry }: { done: boolean; entry?: AgendaEntry }) {
  const people = entry?.people.filter(({ avatar }) => avatar) ?? [];
  const logo = entry?.logo;
  if (!people.length && !logo)
    return (
      <span className={`${styles.mark} ${done ? styles.done : ""}`} aria-hidden="true">
        {done ? <Check size={16} strokeWidth={2.25} /> : <Circle size={14} strokeWidth={1.75} />}
      </span>
    );
  return (
    <span className={styles.rowMark} aria-hidden="true">
      {people.length ? (
        <span className={styles.faces}>
          {people.map((person) => (
            <span key={person.name} className={styles.face}>
              <CommunityPhoto
                src={person.avatar}
                alt=""
                initialsFor={person.name}
                portrait
                sizes="80px"
              />
            </span>
          ))}
        </span>
      ) : (
        logo && (
          <span className={styles.logoMark}>
            <Image src={logo} alt="" width={44} height={44} />
          </span>
        )
      )}
      <span className={`${styles.badge} ${done ? styles.badgeDone : ""}`}>
        {done && <Check size={11} strokeWidth={3} />}
      </span>
    </span>
  );
}

function ActivityRow({
  title,
  done,
  status,
  meta,
  agenda,
  children,
}: {
  title: string;
  done: boolean;
  status: string;
  meta?: ActivityMeta & { kind?: string };
  agenda?: AgendaLookup;
  children?: ReactNode;
}) {
  const entry = meta?.agendaId ? agenda?.[meta.agendaId] : undefined;
  const when = entry?.time ? (entry.end ? `${entry.time}–${entry.end}` : entry.time) : "";
  const place = [when, meta?.hall].filter(Boolean).join(" · ");
  return (
    <li className={styles.rowItem}>
      <RowMark done={done} entry={entry} />
      <div className={styles.rowContent}>
        <span className={styles.rowTitle}>{title}</span>
        {entry?.byline && !title.includes(entry.byline) && (
          <span className={styles.rowByline}>{entry.byline}</span>
        )}
        <span className={styles.rowMeta}>{[status, place].filter(Boolean).join(" · ")}</span>
        {meta && <ActivityTags item={meta} />}
        {children}
      </div>
    </li>
  );
}

function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const percent = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(value, max)}
      style={{ "--progress": `${percent}%` } as CSSProperties}
    >
      <span />
    </div>
  );
}

export default function Passport({
  agenda,
  exhibits,
}: {
  agenda: AgendaLookup;
  exhibits: ExhibitTarget[];
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookingId, setBookingId] = useState("");
  const [showcase, setShowcase] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [synced, setSynced] = useState("");
  const queue = useRef<string[]>([]);
  const savedBooking = useRef("");
  const active = useRef<AbortController | null>(null);

  const saveQueue = useCallback((codes: string[]) => {
    queue.current = codes;
    write(QUEUE_KEY, codes.length ? JSON.stringify(codes) : "");
  }, []);

  const rememberBooking = useCallback((booking: string) => {
    savedBooking.current = booking;
    write(BOOKING_KEY, booking);
  }, []);

  const sync = useCallback(
    async (booking: string) => {
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
            body: JSON.stringify({ bookingId: booking, code }),
            signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
          });
          const data: Profile | { status: string } = await response.json();
          if (controller.signal.aborted) return;
          if (data.status === "not_found" || data.status === "invalid_booking") {
            rememberBooking("");
            writeSnapshot(null, "");
            setProfile(null);
            setNotice({
              text:
                data.status === "not_found"
                  ? `We couldn’t find booking ID ${booking}. Check your KonfHub ticket email, or visit the help desk to set up your passport.`
                  : "That doesn’t look like a booking ID. Copy it from your KonfHub ticket email.",
              tone: "bad",
            });
            return;
          }
          if (!response.ok || data.status !== "ok" || !("stamps" in data))
            throw new Error("Passport unavailable");
          const syncTime = ist.format(new Date());
          rememberBooking(data.bookingId);
          setBookingId(data.bookingId);
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
              : "Couldn’t reach the passport. Try again when you have signal.",
            tone: "wait",
          });
      } finally {
        if (active.current === controller) {
          active.current = null;
          setBusy(false);
        }
      }
    },
    [rememberBooking, saveQueue],
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
    // Earlier versions saved the typed email; sign-in no longer needs it.
    write(LEGACY_EMAIL_KEY, "");
    savedBooking.current = storedBooking;
    const cached = storedBooking ? readSnapshot(storedBooking) : null;

    queueMicrotask(() => {
      if (cancelled) return;
      if (storedBooking) setBookingId(storedBooking);
      if (cached) {
        setProfile(cached.profile);
        setSynced(cached.synced);
      }

      if (storedBooking) {
        // Only hit D1 on load when there is a pending scan or no local snapshot yet.
        if (nextQueue.length > 0 || !cached) {
          void sync(storedBooking);
        }
      } else if (code) {
        setNotice({
          text: `Code ${code} is ready. Enter your booking ID to save this stamp.`,
        });
      } else if (hasCodeParam) {
        setNotice({
          text: "Activity codes use six letters or numbers. Check the card and try again.",
          tone: "bad",
        });
      }
    });

    function retry() {
      if (document.visibilityState === "visible" && savedBooking.current && queue.current.length) {
        void sync(savedBooking.current);
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
    if (!booking || active.current) return;
    setBookingId(booking);
    void sync(booking);
  }

  function addStamp(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = clean(String(new FormData(event.currentTarget).get("code") ?? ""));
    if (!code || !savedBooking.current || active.current) return;
    saveQueue([...new Set([...queue.current, code])]);
    event.currentTarget.reset();
    void sync(savedBooking.current);
  }

  function switchBooking() {
    rememberBooking("");
    writeSnapshot(null, "");
    saveQueue([]);
    setProfile(null);
    setShowcase(false);
    setBookingId("");
    setNotice(null);
  }

  const stamps = profile?.stamps ?? [];
  const stampedAgenda = new Set(stamps.map(({ agendaId }) => agendaId).filter(Boolean));
  const exhibitsVisited = exhibits.filter(({ agendaId }) => stampedAgenda.has(agendaId)).length;
  const sessionsAttended = stamps.filter(
    ({ kind }) => kind === "session" || kind === "workshop",
  ).length;
  const activityCount = profile?.activityCount ?? 0;
  const bonusUnlocked = activityCount >= BONUS_STAMPS;
  const feedback = profile?.required?.find(({ kind, done }) => kind === "feedback" && !done);
  const otherStamps = stamps.filter(({ kind }) => kind !== "exhibit");

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
                Enter the booking ID from your KonfHub ticket. Each ticket in a group booking has
                its own ID.
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
            maxLength={64}
            required
            value={bookingId}
            onChange={(event) => setBookingId(event.target.value)}
          />
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

            <div className={styles.score} data-unlocked={bonusUnlocked || undefined}>
              <div className={styles.scoreHead}>
                <span className={styles.statLabel}>
                  <Award size={16} aria-hidden="true" />
                  Score
                </span>
                <strong className={styles.scoreValue}>
                  {activityCount}
                  <span> stamps</span>
                </strong>
              </div>
              <Progress value={activityCount} max={BONUS_STAMPS} label="Progress to bonus swag" />
              <p className={styles.scoreNote}>
                <Gift size={14} aria-hidden="true" />
                {bonusUnlocked
                  ? "Bonus unlocked · you’re in with a chance at one extra swag"
                  : `${BONUS_STAMPS - activityCount} more for a chance at one extra swag`}
              </p>
            </div>

            <dl className={styles.tally}>
              <div data-met={exhibitsVisited >= exhibits.length || undefined}>
                <dt>Exhibits</dt>
                <dd>
                  {exhibitsVisited} / {exhibits.length}
                </dd>
              </div>
              <div data-met={sessionsAttended >= SESSIONS_NEEDED || undefined}>
                <dt>Sessions</dt>
                <dd>
                  {Math.min(sessionsAttended, SESSIONS_NEEDED)} / {SESSIONS_NEEDED}
                </dd>
              </div>
            </dl>

            {!showcase && (
              <form className={styles.codeForm} autoComplete="off" onSubmit={addStamp}>
                <label className={styles.codeLabel} htmlFor="code">
                  <QrCode size={16} aria-hidden="true" />
                  Add a stamp
                </label>
                <div className={styles.codeRow}>
                  <input
                    id="code"
                    name="code"
                    className={`${styles.input} ${styles.codeInput}`}
                    minLength={6}
                    maxLength={6}
                    pattern="[A-Za-z0-9]{6}"
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-describedby="code-hint"
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
                <p id="code-hint" className={styles.codeHint}>
                  Scan an activity QR with your camera, or type the 6-character code.
                </p>
                {feedback && (
                  <p className={styles.feedbackLine}>
                    <MessageSquare size={14} aria-hidden="true" />
                    <span>
                      Feedback check-in {indiaTime(feedback.opensAt).replace(" IST", "")} to{" "}
                      {indiaTime(feedback.closesAt)}.{" "}
                      {feedback.url && (
                        <>
                          <a className="audience-text-link" href={feedback.url}>
                            Open the form
                          </a>
                          , then enter the code it gives you here.
                        </>
                      )}
                    </span>
                  </p>
                )}
              </form>
            )}

            <div className={styles.syncBar}>
              <p className={styles.syncMeta}>
                <Clock size={14} aria-hidden="true" />
                {synced ? `Last synced at ${synced} IST` : "Ready"}
              </p>
            </div>
          </section>

          {exhibits.length > 0 && (
            <section className={styles.panel} aria-labelledby="exhibits-title">
              <div className={styles.sectionTop}>
                <h2 id="exhibits-title" className={styles.sectionHeading}>
                  Exhibits
                </h2>
                <span className={styles.sectionCount}>
                  {exhibitsVisited} of {exhibits.length} visited
                </span>
              </div>
              <ul className={styles.exhibitGrid}>
                {exhibits.map((exhibit) => {
                  const done = stampedAgenda.has(exhibit.agendaId);
                  return (
                    <li
                      key={exhibit.agendaId}
                      className={styles.exhibitTile}
                      data-done={done || undefined}
                    >
                      <span className={styles.exhibitPlate}>{exhibit.logo}</span>
                      <span className={styles.exhibitName}>{exhibit.title}</span>
                      <span className={styles.exhibitState}>
                        {done ? (
                          <>
                            <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                            Visited
                          </>
                        ) : (
                          "Not yet"
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className={styles.panel} aria-labelledby="sessions-title">
            <div className={styles.sectionTop}>
              <h2 id="sessions-title" className={styles.sectionHeading}>
                Sessions and activities
              </h2>
              {otherStamps.length > 0 && (
                <span className={styles.sectionCount}>{otherStamps.length} stamped</span>
              )}
            </div>
            {otherStamps.length ? (
              stampGroups.map(([kind, label]) => {
                const group = otherStamps.filter((stamp) => stamp.kind === kind).reverse();
                if (!group.length) return null;
                return (
                  <div key={kind} className={styles.stampGroup}>
                    <h3 className={styles.subHeading}>
                      {label} · {group.length}
                    </h3>
                    <ol className={styles.stamps}>
                      {group.map((stamp, index) => (
                        <ActivityRow
                          key={`${stamp.title}:${stamp.at}:${index}`}
                          title={stamp.title}
                          status={`Stamped ${indiaTime(stamp.at)}`}
                          done
                          meta={stamp}
                          agenda={agenda}
                        />
                      ))}
                    </ol>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyStamps}>
                Talks, workshops and lounge visits appear here after you scan their QR.
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
