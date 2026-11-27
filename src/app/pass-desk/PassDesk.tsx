"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import styles from "./desk.module.css";

/** The staff key stays in this tab only, so a refresh doesn't need it typed again. */
const KEY_STORAGE = "devfest-pass-desk-key";

type Passport = {
  status: "ok";
  bookingId: string;
  name: string;
  email: string;
  pass: string;
  activityCount: number;
  stamp?: { result: string } | null;
  staff: { arrivedAt?: string; swagAt?: string; swagRecorded?: boolean };
};
type Action = "lookup" | "arrive" | "swag" | "activity" | "update";

const errors: Record<string, string> = {
  unauthorized: "Staff access denied. Check the access key.",
  invalid_booking: "Enter the booking ID exactly as it appears on the ticket.",
  invalid_code: "Enter exactly six letters or numbers.",
  invalid_email: "Enter a valid email, or leave it blank.",
  arrival_required: "Record the attendee’s arrival first.",
  needs_name: "Enter the attendee’s name.",
};
const stampMessages: Record<string, string> = {
  added: "Activity recorded.",
  already: "Activity already recorded.",
  not_open: "This activity is not open yet.",
  closed: "This activity has closed.",
  unknown: "Activity code not recognized.",
};

function readKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

function saveKey(value: string) {
  try {
    if (value) sessionStorage.setItem(KEY_STORAGE, value);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* The key still works for this page view. */
  }
}

export default function PassDesk() {
  const [bookingId, setBookingId] = useState("");
  const [passport, setPassport] = useState<Passport | null>(null);
  const [newId, setNewId] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const keyInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (keyInput.current) keyInput.current.value = readKey();
  }, []);

  async function call(body: Record<string, unknown>) {
    const staffKey = keyInput.current?.value ?? "";
    const response = await fetch("/api/pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, staffKey }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await response.json();
    if (data.status === "unauthorized") saveKey("");
    else saveKey(staffKey);
    return data;
  }

  async function run(task: () => Promise<void>) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setStatus("Saving…");
    try {
      await task();
    } catch {
      setStatus("Couldn’t reach the desk. Retry when you have a connection.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  function act(action: Action, extra: Record<string, string> = {}) {
    const id = (passport?.bookingId ?? bookingId).replace(/\s+/g, "").toUpperCase();
    return run(async () => {
      const data = await call({ staffAction: action, bookingId: id, ...extra });
      if (data.status === "not_found") {
        setPassport(null);
        setNewId(id);
        setStatus(`No passport for ${id}. Check the ticket, or add them under Add a new person.`);
        return;
      }
      if (data.status !== "ok") {
        setStatus(errors[data.status] ?? "The desk is unavailable. Try again.");
        return;
      }
      setPassport(data);
      setBookingId(data.bookingId);
      setStatus(
        {
          lookup: "Passport found.",
          arrive: "Arrival recorded.",
          swag: data.staff.swagRecorded
            ? "Swag handover recorded."
            : "Swag handover was already recorded.",
          activity: stampMessages[data.stamp?.result] ?? "Check the activity code and try again.",
          update: "Name and email updated.",
        }[action],
      );
    });
  }

  function openBooking(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPassport(null);
    void act("lookup");
  }

  function createPerson(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const id = newId.replace(/\s+/g, "").toUpperCase();
    void run(async () => {
      const data = await call({
        staffAction: "create",
        bookingId: id,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
      });
      if (data.status === "exists") {
        const existing = await call({ staffAction: "lookup", bookingId: data.bookingId });
        if (existing.status === "ok") {
          setPassport(existing);
          setBookingId(existing.bookingId);
        }
        setStatus(`${data.bookingId} already has a passport. It’s open below.`);
        return;
      }
      if (data.status !== "ok") {
        setStatus(errors[data.status] ?? "The desk is unavailable. Try again.");
        return;
      }
      formElement.reset();
      setNewId("");
      setPassport(data);
      setBookingId(data.bookingId);
      setStatus(
        id
          ? "Passport created and arrival recorded."
          : `Passport created with booking ID ${data.bookingId}. Give this ID to the attendee to open their passport.`,
      );
    });
  }

  function updateDetails(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void act("update", {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
    });
  }

  function addActivity(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = String(new FormData(form).get("code") ?? "");
    void act("activity", { code }).then(() => form.reset());
  }

  function clear() {
    setPassport(null);
    setNewId("");
    setBookingId("");
    setStatus("");
  }

  const staff = passport?.staff;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>DevFest Indore 2026 · Staff</p>
          <h1>Passport desk</h1>
          <p className={styles.muted}>
            Open a passport by booking ID, add a new person, record arrival and swag, or add an
            activity.
          </p>
        </header>

        <section className={styles.card} aria-labelledby="key-title">
          <h2 id="key-title" className="sr-only">
            Staff access
          </h2>
          <label className={styles.label} htmlFor="staff-key">
            Staff access key
          </label>
          <input
            id="staff-key"
            className={styles.input}
            type="password"
            autoComplete="off"
            ref={keyInput}
            required
          />
        </section>

        <form className={styles.card} onSubmit={openBooking} aria-labelledby="booking-title">
          <h2 id="booking-title">Open by booking ID</h2>
          <label className={styles.label} htmlFor="booking-id">
            Booking ID
          </label>
          <div className={styles.row}>
            <input
              id="booking-id"
              className={`${styles.input} ${styles.code}`}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={64}
              required
              value={bookingId}
              onChange={(event) => {
                setBookingId(event.target.value);
                setPassport(null);
              }}
            />
            <button type="submit" className={styles.primary} disabled={busy}>
              Open passport
            </button>
          </div>
        </form>

        <p className={styles.status} role="status" hidden={!status}>
          {status}
        </p>

        {!passport && (
          <form className={styles.card} onSubmit={createPerson} aria-labelledby="walkin-title">
            <h2 id="walkin-title">Add a new person</h2>
            <p className={styles.muted}>
              For someone missing from the roster. Check their ticket and photo ID. This creates
              their passport and records arrival.
            </p>
            <label className={styles.label} htmlFor="walkin-id">
              Booking ID <span className={styles.muted}>(optional)</span>
            </label>
            <input
              id="walkin-id"
              className={`${styles.input} ${styles.code}`}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={64}
              aria-describedby="walkin-id-hint"
              value={newId}
              onChange={(event) => setNewId(event.target.value)}
            />
            <p id="walkin-id-hint" className={styles.muted}>
              Leave blank if they have no KonfHub booking. The desk will create an ID for them.
            </p>
            <label className={styles.label} htmlFor="walkin-name">
              Attendee name
            </label>
            <input
              id="walkin-name"
              name="name"
              className={styles.input}
              autoComplete="off"
              maxLength={80}
              required
            />
            <label className={styles.label} htmlFor="walkin-email">
              Email <span className={styles.muted}>(optional)</span>
            </label>
            <input
              id="walkin-email"
              name="email"
              className={styles.input}
              type="email"
              autoComplete="off"
              maxLength={254}
            />
            <button type="submit" className={styles.primary} disabled={busy}>
              Add person and record arrival
            </button>
          </form>
        )}

        {passport && staff && (
          <section className={styles.card} aria-labelledby="attendee-name">
            <div className={styles.attendeeHeader}>
              <div>
                <h2 id="attendee-name">{passport.name}</h2>
                <p className={styles.muted}>
                  {passport.bookingId} · {passport.pass}
                  {passport.email && ` · ${passport.email}`}
                </p>
              </div>
              <button type="button" className={styles.secondary} onClick={clear}>
                Next attendee
              </button>
            </div>
            <dl className={styles.facts}>
              <div>
                <dt>Arrival</dt>
                <dd className={staff.arrivedAt ? styles.done : undefined}>
                  {staff.arrivedAt ? "Recorded" : "Pending"}
                </dd>
              </div>
              <div>
                <dt>Swag</dt>
                <dd className={staff.swagAt ? styles.done : undefined}>
                  {staff.swagAt ? "Handed over" : "Pending"}
                </dd>
              </div>
              <div>
                <dt>Stamps</dt>
                <dd>{passport.activityCount}</dd>
              </div>
            </dl>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primary}
                disabled={busy || Boolean(staff.arrivedAt)}
                onClick={() => act("arrive")}
              >
                Record arrival
              </button>
              <button
                type="button"
                className={styles.primary}
                disabled={busy || !staff.arrivedAt || Boolean(staff.swagAt)}
                onClick={() => act("swag")}
              >
                Record swag handover
              </button>
            </div>
            <form className={styles.activity} onSubmit={addActivity}>
              <label className={styles.label} htmlFor="activity-code">
                Activity code
              </label>
              <div className={styles.row}>
                <input
                  id="activity-code"
                  name="code"
                  className={`${styles.input} ${styles.code}`}
                  minLength={6}
                  maxLength={6}
                  pattern="[A-Za-z0-9]{6}"
                  autoCapitalize="characters"
                  spellCheck={false}
                  autoComplete="off"
                  required
                />
                <button type="submit" className={styles.secondary} disabled={busy}>
                  Add activity
                </button>
              </div>
            </form>
            <details className={`${styles.activity} ${styles.details}`}>
              <summary>Edit name or email</summary>
              <form
                key={`${passport.bookingId}:${passport.name}:${passport.email}`}
                onSubmit={updateDetails}
              >
                <p className={styles.muted}>Check photo ID before changing a name.</p>
                <label className={styles.label} htmlFor="edit-name">
                  Attendee name
                </label>
                <input
                  id="edit-name"
                  name="name"
                  className={styles.input}
                  autoComplete="off"
                  maxLength={80}
                  defaultValue={passport.name}
                  required
                />
                <label className={styles.label} htmlFor="edit-email">
                  Email <span className={styles.muted}>(optional)</span>
                </label>
                <input
                  id="edit-email"
                  name="email"
                  className={styles.input}
                  type="email"
                  autoComplete="off"
                  maxLength={254}
                  defaultValue={passport.email}
                />
                <button type="submit" className={styles.secondary} disabled={busy}>
                  Save details
                </button>
              </form>
            </details>
          </section>
        )}
      </main>
    </div>
  );
}
