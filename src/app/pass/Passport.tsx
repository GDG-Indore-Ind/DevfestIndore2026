"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type SubmitEvent } from "react";
import styles from "./passport.module.css";

const EMAIL_KEY = "devfest-pass-email";
const QUEUE_KEY = "devfest-pass-queue";
const kinds = {
  session: "Session or workshop",
  booth: "Exhibit",
  feedback: "Feedback",
  arrival: "Registration desk",
};
const ist = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

type Step = {
  title: string;
  done: boolean;
  kind?: "feedback";
  opensAt?: string;
  closesAt?: string;
  url?: string;
};
type Stamp = { title: string; kind: keyof typeof kinds; at: string };
type Result = {
  result: "added" | "already" | "not_open" | "closed" | "unknown";
  title?: string;
  code?: string;
  mission?: boolean;
  opensAt?: string;
  closesAt?: string;
};
type Profile = {
  status: "ok";
  firstName: string;
  activityCount: number;
  stamps: Stamp[];
  required?: Step[];
  missions: (Step & { steps?: Step[] })[];
  stamp?: Result;
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

function indiaTime(utc?: string) {
  return utc ? `${ist.format(new Date(utc.replace(" ", "T") + "Z"))} IST` : "the scheduled time";
}

function describe(stamp?: Result): Notice | null {
  if (!stamp) return null;
  const { result, title } = stamp;
  if (result === "added")
    return {
      text: `${stamp.mission ? "Mission complete" : "Activity completed"} · ${title}`,
      tone: "ok",
    };
  if (result === "already") return { text: `Already counted · ${title}` };
  if (result === "not_open")
    return { text: `Check-in for ${title} opens at ${indiaTime(stamp.opensAt)}.`, tone: "wait" };
  if (result === "closed")
    return { text: `Check-in for ${title} closed at ${indiaTime(stamp.closesAt)}.`, tone: "bad" };
  return {
    text: `Code ${stamp.code} wasn't recognised. Check the card and try again.`,
    tone: "bad",
  };
}

function ActivityRow({
  title,
  done,
  status,
  children,
}: {
  title: string;
  done: boolean;
  status: string;
  children?: ReactNode;
}) {
  return (
    <li>
      <span className={`${styles.mark} ${done ? styles.done : ""}`} aria-hidden="true">
        {done ? "✓" : "○"}
      </span>
      <div>
        {title}
        <span className={`${styles.muted} ${styles["row-meta"]}`}>{status}</span>
        {children}
      </div>
    </li>
  );
}

export default function Passport() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [synced, setSynced] = useState("");
  const queue = useRef<string[]>([]);
  const savedEmail = useRef("");
  const active = useRef<AbortController | null>(null);

  const saveQueue = useCallback((codes: string[]) => {
    queue.current = codes;
    write(QUEUE_KEY, codes.length ? JSON.stringify(codes) : "");
  }, []);

  const rememberEmail = useCallback((value: string) => {
    savedEmail.current = value;
    write(EMAIL_KEY, value);
  }, []);

  const sync = useCallback(
    async (address: string, name?: string) => {
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
            body: JSON.stringify({ email: address, name, code }),
            signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
          });
          const data: Profile | { status: string } = await response.json();
          if (controller.signal.aborted) return;
          if (data.status === "needs_name") {
            rememberEmail("");
            setNeedsName(true);
            setNotice({ text: "Add your name once to open your passport." });
            return;
          }
          if (data.status === "invalid_email") {
            rememberEmail("");
            setNeedsName(false);
            setNotice({ text: "That email doesn't look right. Please check it.", tone: "bad" });
            return;
          }
          if (!response.ok || data.status !== "ok" || !("stamps" in data))
            throw new Error("Passport unavailable");
          rememberEmail(address);
          setProfile(data);
          setNeedsName(false);
          setSynced(ist.format(new Date()));
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
              : "Couldn’t reach the passport. Refresh when you have signal.",
            tone: "wait",
          });
      } finally {
        if (active.current === controller) {
          active.current = null;
          setBusy(false);
        }
      }
    },
    [rememberEmail, saveQueue],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = clean(params.get("c") || "");
    const pending = readQueue();
    saveQueue(code ? [...new Set([...pending, code])] : pending);
    if (code) {
      const url = new URL(location.href);
      url.searchParams.delete("c");
      history.replaceState(history.state, "", url);
    }
    savedEmail.current = read(EMAIL_KEY) || "";
    setEmail(savedEmail.current);
    if (savedEmail.current) void sync(savedEmail.current);
    else if (code)
      setNotice({ text: `Code ${code} is ready. Enter your email to save this stamp.` });
    else if (params.has("c"))
      setNotice({
        text: "Activity codes use six letters or numbers. Check the card and try again.",
        tone: "bad",
      });

    function retry() {
      if (document.visibilityState === "visible" && savedEmail.current && queue.current.length)
        void sync(savedEmail.current);
    }
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", retry);
    return () => {
      active.current?.abort();
      active.current = null;
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", retry);
    };
  }, [saveQueue, sync]);

  function signIn(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    const address = email.trim().toLowerCase();
    if (!address || active.current) return;
    setEmail(address);
    rememberEmail(address);
    void sync(address, name);
  }

  function addStamp(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = clean(String(new FormData(event.currentTarget).get("code") ?? ""));
    if (!code || !savedEmail.current || active.current) return;
    saveQueue([...new Set([...queue.current, code])]);
    event.currentTarget.reset();
    void sync(savedEmail.current);
  }

  function switchEmail() {
    rememberEmail("");
    saveQueue([]);
    setProfile(null);
    setEmail("");
    setNeedsName(false);
    setNotice(null);
  }

  const latest = profile?.stamps.at(-1);
  return (
    <div>
      {notice && (
        <p className={`${styles.notice} ${notice.tone ? styles[notice.tone] : ""}`} role="status">
          {notice.text}
        </p>
      )}
      {!profile ? (
        <form id="signin" className={styles.panel} aria-labelledby="signin-title" onSubmit={signIn}>
          <h2 id="signin-title">Open your passport</h2>
          <p>Use the same email each time so your stamps and missions stay together.</p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {needsName && (
            <div id="walkin">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={80}
                required
              />
            </div>
          )}
          <button type="submit" disabled={busy}>
            Continue
          </button>
        </form>
      ) : (
        <section aria-label="Your passport">
          <section
            className={`${styles.panel} ${styles["passport-profile"]}`}
            aria-labelledby="greeting"
          >
            <h2 id="greeting">Hi, {profile.firstName}</h2>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span>Completed activities</span>
                <strong>{profile.activityCount}</strong>
              </div>
              {!!profile.missions.length && (
                <div className={`${styles.stat} ${styles["mission-stat"]}`}>
                  <span>Special missions complete</span>
                  <strong>
                    {profile.missions.filter(({ done }) => done).length} / {profile.missions.length}
                  </strong>
                </div>
              )}
            </div>
            {latest && <p className={styles.muted}>Most recent · {latest.title}</p>}
            {!!profile.required?.length && (
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
                    >
                      {feedback && (
                        <>
                          {step.url && (
                            <a className={styles["row-meta"]} href={step.url}>
                              Open feedback form
                            </a>
                          )}
                          <span className={`${styles.muted} ${styles["row-meta"]}`}>
                            After submitting, enter the six-character code you receive in Passport.
                          </span>
                        </>
                      )}
                    </ActivityRow>
                  );
                })}
              </ul>
            )}
            <p className={styles.muted}>Last synced at {synced} IST</p>
          </section>
          {!!profile.missions.length && (
            <section className={styles.panel}>
              <h2>Special missions</h2>
              <p>Scan the activity’s QR to check it off and collect a stamp.</p>
              <ul id="missions">
                {profile.missions.map((mission) =>
                  mission.steps && mission.steps.length >= 2 ? (
                    <li className={styles["mission-group"]} key={mission.title}>
                      <details>
                        <summary>
                          {mission.title} · {mission.steps.filter(({ done }) => done).length} of{" "}
                          {mission.steps.length} complete
                        </summary>
                        <ul className={styles.stamps}>
                          {mission.steps.map((step) => (
                            <ActivityRow
                              key={step.title}
                              title={step.title}
                              status={step.done ? "Complete" : "To do"}
                              done={step.done}
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
                    />
                  ),
                )}
              </ul>
            </section>
          )}
          <form
            className={styles.panel}
            autoComplete="off"
            aria-labelledby="code-title"
            onSubmit={addStamp}
          >
            <h2 id="code-title">Add a stamp</h2>
            <p>Scan the QR with your phone camera, or enter the code printed on the card.</p>
            <label htmlFor="code">Activity code</label>
            <div className={styles.row}>
              <input
                id="code"
                name="code"
                placeholder="Code on the card"
                minLength={6}
                maxLength={6}
                pattern="[A-Za-z0-9]{6}"
                autoCapitalize="characters"
                spellCheck={false}
                required
              />
              <button type="submit" id="code-button" disabled={busy}>
                Add stamp
              </button>
            </div>
          </form>
          <section className={styles.panel}>
            <h2>Your stamps</h2>
            {profile.stamps.length ? (
              <ol className={styles.stamps}>
                {profile.stamps
                  .slice()
                  .reverse()
                  .map((stamp, index) => (
                    <ActivityRow
                      key={`${stamp.title}:${stamp.at}:${index}`}
                      title={stamp.title}
                      status={kinds[stamp.kind]}
                      done
                    />
                  ))}
              </ol>
            ) : (
              <p className={styles.muted}>
                Your first stamp will appear here after you scan an activity QR.
              </p>
            )}
          </section>
          <button
            type="button"
            className={styles.link}
            id="switch"
            disabled={busy}
            onClick={switchEmail}
          >
            Use a different email
          </button>
        </section>
      )}
    </div>
  );
}
