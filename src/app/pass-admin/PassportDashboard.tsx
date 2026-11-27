"use client";

import { useCallback, useEffect, useRef, useState, type SubmitEvent } from "react";
import styles from "./dashboard.module.css";

const labels = {
  session: "Session",
  workshop: "Workshop",
  exhibit: "Exhibit",
  booth: "Exhibit",
  activity: "Activity",
  feedback: "Feedback",
} as const;
const states = { open: "Open", upcoming: "Upcoming", closed: "Closed" } as const;
const stateClasses = { open: styles.statusOpen, upcoming: styles.statusUpcoming, closed: "" };
const totals = {
  arrivals: "Desk arrivals",
  swagHandovers: "Swag handovers",
  checkins: "Activity check-ins",
  participants: "People with check-ins",
  feedbackCheckins: "Feedback check-ins",
};
const missionNames: Record<string, string> = {
  "cake-wallet": "Cake Wallet",
  "space-club": "Space Club of India",
};
const timeFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
  hourCycle: "h23",
});
const numberFormat = new Intl.NumberFormat("en-IN");

type Activity = {
  code: string;
  title: string;
  kind: keyof typeof labels;
  format?: string;
  hall?: string;
  track?: string;
  agendaId?: string;
  state: keyof typeof states;
  opensAt: string | null;
  closesAt: string | null;
  latestCheckin: string | null;
  checkins: number;
  mission: string | null;
  specialMission: number;
  required: number | null;
};

type Stats = {
  status: "ok";
  summary: Record<keyof typeof totals, number> & { asOf: string };
  activities: Activity[];
};

function date(value: string, formatter = dateTimeFormat) {
  return formatter.format(new Date(value.replace(" ", "T") + "Z"));
}

function activityWindow({ opensAt, closesAt }: Activity) {
  if (opensAt && closesAt) return `${date(opensAt, timeFormat)}–${date(closesAt, timeFormat)}`;
  if (opensAt) return `From ${date(opensAt)}`;
  if (closesAt) return `Until ${date(closesAt)}`;
  return "Any time";
}

export default function PassportDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const password = useRef("");
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);

  const lock = useCallback((notice = "") => {
    request.current?.abort();
    request.current = null;
    password.current = "";
    setStats(null);
    setBusy(false);
    setSearch("");
    setType("");
    setState("");
    setMessage(notice);
  }, []);

  const refresh = useCallback(
    async (force = false) => {
      if (!password.current || request.current) return;
      const controller = new AbortController();
      request.current = controller;
      setBusy(true);
      const timeout = window.setTimeout(() => controller.abort(), 10_000);
      try {
        const response = await fetch("/api/pass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminAction: "stats", password: password.current, force }),
          cache: "no-store",
          signal: controller.signal,
        });
        const data: Stats | { status: string } = await response.json();
        if (request.current !== controller) return;
        if (response.status === 401) {
          lock("Incorrect organizer password.");
          return;
        }
        if (data.status === "admin_not_configured") {
          lock("The organizer password is not configured on this deployment.");
          return;
        }
        if (!response.ok || data.status !== "ok" || !("activities" in data))
          throw new Error("Dashboard unavailable");
        setStats(data);
        setMessage("");
      } catch {
        if (request.current === controller) {
          if (input.current) password.current = "";
          setMessage("Couldn’t refresh Passport statistics. Try again.");
        }
      } finally {
        clearTimeout(timeout);
        if (request.current === controller) {
          request.current = null;
          setBusy(false);
        }
      }
    },
    [lock],
  );

  useEffect(
    () => () => {
      const pending = request.current;
      request.current = null;
      pending?.abort();
      password.current = "";
    },
    [],
  );

  function unlock(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.current?.value || request.current) return;
    password.current = input.current.value;
    input.current.value = "";
    void refresh(false);
  }

  const activities = (stats?.activities ?? []).map((activity) => {
    const legacyWorkshop = activity.kind === "session" && activity.title.startsWith("Workshop: ");
    const resolvedType = legacyWorkshop ? "Workshop" : (labels[activity.kind] ?? activity.kind);
    return {
      ...activity,
      title: legacyWorkshop ? activity.title.slice("Workshop: ".length) : activity.title,
      type: resolvedType,
    };
  });
  const visible = activities.filter(
    (activity) =>
      (!type || activity.type === type) &&
      (!state || activity.state === state) &&
      `${activity.title} ${activity.code} ${activity.hall ?? ""} ${activity.track ?? ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <div className={styles.dashboardPage}>
      <main>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.event}>DevFest Indore 2026</p>
            <h1>Passport dashboard</h1>
          </div>
          {stats && (
            <button type="button" className={styles.secondary} onClick={() => lock()}>
              Lock
            </button>
          )}
        </header>
        <noscript>
          <p>Enable JavaScript to use the Passport dashboard.</p>
        </noscript>
        {!stats && (
          <form method="post" className={`${styles.card} ${styles.signIn}`} onSubmit={unlock}>
            <label htmlFor="organizer-password">Organizer password</label>
            <input
              ref={input}
              id="organizer-password"
              type="password"
              autoComplete="current-password"
              maxLength={256}
              required
            />
            <button type="submit" disabled={busy}>
              Unlock dashboard
            </button>
          </form>
        )}
        <p className={styles.message} role="status" hidden={!message}>
          {message}
        </p>
        {stats && (
          <>
            <dl className={styles.metrics} aria-label="Passport totals">
              {(Object.keys(totals) as (keyof typeof totals)[]).map((key) => (
                <div key={key}>
                  <dt>{totals[key]}</dt>
                  <dd>{numberFormat.format(stats.summary[key])}</dd>
                </div>
              ))}
            </dl>
            <section aria-labelledby="activity-title" className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 id="activity-title">Activity check-ins</h2>
                  <p className={styles.muted}>
                    Updated {date(stats.summary.asOf)} IST · Manual refresh
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.secondary}
                  disabled={busy}
                  onClick={() => void refresh(true)}
                >
                  Refresh
                </button>
              </div>
              <div className={styles.filters}>
                <label>
                  Find an activity, hall, track or code
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <label>
                  Activity type
                  <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="">All types</option>
                    <option value="Workshop">Workshops</option>
                    <option value="Session">Sessions</option>
                    <option value="Exhibit">Exhibits</option>
                    <option value="Activity">Activities</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </label>
                <label>
                  Check-in status
                  <select value={state} onChange={(event) => setState(event.target.value)}>
                    <option value="">All statuses</option>
                    {Object.entries(states).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className={styles.muted}>
                {visible.length
                  ? `${visible.length} of ${activities.length} activities`
                  : activities.length
                    ? "No activities match these filters."
                    : "No activity codes have been imported."}
              </p>
              {!!visible.length && (
                <div
                  className={styles.tableWrapper}
                  role="region"
                  aria-label="Activity stats"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        {[
                          "Activity",
                          "Code",
                          "Status",
                          "Check-ins",
                          "Window (IST)",
                          "Latest check-in (IST)",
                        ].map((label) => (
                          <th scope="col" key={label}>
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((activity) => {
                        const flags: string[] = [activity.type];
                        if (activity.hall) flags.push(activity.hall);
                        if (activity.track) flags.push(activity.track);
                        if (activity.mission && activity.mission !== "yes")
                          flags.push(missionNames[activity.mission] ?? activity.mission);
                        else if (activity.specialMission) flags.push("Special mission");
                        if (activity.required || activity.kind === "feedback")
                          flags.push("Required");
                        return (
                          <tr key={activity.code}>
                            <th scope="row">
                              {activity.title}
                              <small>{flags.join(" · ")}</small>
                            </th>
                            <td className={styles.code}>{activity.code}</td>
                            <td>
                              <span className={`${styles.status} ${stateClasses[activity.state]}`}>
                                {states[activity.state]}
                              </span>
                            </td>
                            <td className={styles.numeric}>
                              {numberFormat.format(activity.checkins)}
                            </td>
                            <td>{activityWindow(activity)}</td>
                            <td>{activity.latestCheckin ? date(activity.latestCheckin) : "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
