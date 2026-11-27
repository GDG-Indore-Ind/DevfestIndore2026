/**
 * POST /api/pass — the event-day passport (Cloudflare Pages Function, D1 bound as `DB`).
 *
 * Attendee body: { bookingId, code? }
 * - A passport exists only for an imported KonfHub booking ID or one the desk created.
 *   Unknown booking IDs return { status: "not_found" }; there is no self-signup.
 * - A code records a check-in when its activity window is open (repeat scans are harmless).
 * Staff body: { staffAction, staffKey, ... } — see STAFF_ACTIONS. Organizer body: { adminAction: "stats", password }.
 * Every successful passport call returns the passport. See docs/pass.md.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKING_PATTERN = /^[A-Z0-9][A-Z0-9._/-]{3,63}$/;
const CODE_PATTERN = /^[A-Z0-9]{6}$/;
const STAFF_ACTIONS = new Set(["search", "lookup", "arrive", "swag", "activity"]);
const MISSION_LABELS = { "cake-wallet": "Cake Wallet", "space-club": "Space Club of India" };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const text = (value, max) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** KonfHub booking IDs are compared without spaces and case, so typed IDs still match. */
const bookingKey = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, "").toUpperCase().slice(0, 64) : "";

async function validKey(candidate, secret) {
  if (typeof candidate !== "string" || candidate.length > 256 || !secret) return false;
  const encode = new TextEncoder();
  const [given, expected] = await Promise.all(
    [candidate, secret].map((key) => crypto.subtle.digest("SHA-256", encode.encode(key))),
  );
  const expectedBytes = new Uint8Array(expected);
  let difference = 0;
  new Uint8Array(given).forEach((byte, index) => {
    difference |= byte ^ expectedBytes[index];
  });
  return difference === 0;
}

async function organizerStats(password, env) {
  if (!env.PASS_ADMIN_PASSWORD) return json({ status: "admin_not_configured" }, 503);
  if (!(await validKey(password, env.PASS_ADMIN_PASSWORD)))
    return json({ status: "unauthorized" }, 401);
  if (!env.DB) return json({ status: "error" }, 503);

  try {
    const [activityRows, summaryRows] = await env.DB.batch([
      env.DB.prepare(`
        SELECT a.code, a.title, a.kind, a.opens_at AS opensAt, a.closes_at AS closesAt,
               CASE
                 WHEN a.opens_at > datetime('now') THEN 'upcoming'
                 WHEN a.closes_at < datetime('now') THEN 'closed'
                 ELSE 'open'
               END AS state,
               s.mission, s.required,
               m.code IS NOT NULL AS specialMission,
               count(c.code) AS checkins, max(c.checked_in_at) AS latestCheckin
        FROM activities a
        LEFT JOIN special_missions m ON m.code = a.code
        LEFT JOIN passport_mission_steps s ON s.code = a.code
        LEFT JOIN stamps c ON c.code = a.code
        GROUP BY a.code
        ORDER BY a.opens_at IS NULL, a.opens_at, a.title, a.code
      `),
      env.DB.prepare(`
        SELECT datetime('now') AS asOf,
               (SELECT count(*) FROM desk) AS arrivals,
               (SELECT count(*) FROM desk WHERE swag_at IS NOT NULL) AS swagHandovers,
               (SELECT count(*) FROM stamps) AS checkins,
               (SELECT count(DISTINCT booking_id) FROM stamps) AS participants,
               (SELECT count(DISTINCT c.booking_id) FROM stamps c
                JOIN activities a ON a.code = c.code WHERE a.kind = 'feedback') AS feedbackCheckins
      `),
    ]);
    return json({
      status: "ok",
      summary: summaryRows.results[0],
      activities: activityRows.results,
    });
  } catch (error) {
    console.error("Passport organizer stats query failed", error);
    return json({ status: "error" }, 503);
  }
}

/** Staff only: find booking IDs by exact email or part of a name, for attendees who lost their ID. */
async function searchPassports(db, query) {
  const value = text(query, 254).toLowerCase();
  const byEmail = value.includes("@");
  if (byEmail ? !EMAIL_PATTERN.test(value) : value.length < 3)
    return json({ status: "invalid_search" }, 400);
  const { results } = await db
    .prepare(
      `SELECT booking_id AS bookingId, name, email, pass FROM passports
       WHERE ${byEmail ? "email = ?" : "lower(name) LIKE '%' || ? || '%'"}
       ORDER BY name, booking_id LIMIT 20`,
    )
    .bind(value)
    .all();
  return json({ status: "ok", matches: results });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (body?.adminAction === "stats") return organizerStats(body.password, env);
  const staffAction = body?.staffAction;
  if (
    staffAction &&
    (!STAFF_ACTIONS.has(staffAction) ||
      !(env.PASS_STAFF_KEY?.length >= 24) ||
      !(await validKey(body.staffKey, env.PASS_STAFF_KEY)))
  )
    return json({ status: "unauthorized" }, 401);

  const db = env.DB;
  if (!db) return json({ status: "error", message: "Passport database is not bound." }, 500);

  try {
    if (staffAction === "search") return await searchPassports(db, body.query);

    const bookingId = bookingKey(body?.bookingId);
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    if (!BOOKING_PATTERN.test(bookingId)) return json({ status: "invalid_booking" }, 400);
    if ((code || staffAction === "activity") && !CODE_PATTERN.test(code))
      return json({ status: "invalid_code" }, 400);

    const findPassport = () =>
      db
        .prepare("SELECT name, email, pass FROM passports WHERE booking_id = ?")
        .bind(bookingId)
        .first();
    let passport = await findPassport();

    if (!passport) {
      // Only the desk can add a passport, for a ticket bought after the last roster import.
      if (staffAction !== "arrive") return json({ status: "not_found" }, 404);
      const name = text(body.name, 80);
      const email = text(body.email, 254).toLowerCase();
      if (!name) return json({ status: "needs_name" });
      if (email && !EMAIL_PATTERN.test(email)) return json({ status: "invalid_email" }, 400);
      await db
        .prepare(
          "INSERT INTO passports (booking_id, name, email, pass) VALUES (?, ?, ?, 'Walk-in') ON CONFLICT (booking_id) DO NOTHING",
        )
        .bind(bookingId, name, email)
        .run();
      passport = await findPassport();
    }

    let desk;
    let swagRecorded;
    if (staffAction) {
      if (staffAction === "arrive") {
        await db
          .prepare("INSERT INTO desk (booking_id) VALUES (?) ON CONFLICT DO NOTHING")
          .bind(bookingId)
          .run();
      }
      if (staffAction === "swag") {
        const result = await db
          .prepare(
            "UPDATE desk SET swag_at = datetime('now') WHERE booking_id = ? AND swag_at IS NULL",
          )
          .bind(bookingId)
          .run();
        swagRecorded = result.meta.changes > 0;
      }
      desk = await db
        .prepare("SELECT arrived_at AS arrivedAt, swag_at AS swagAt FROM desk WHERE booking_id = ?")
        .bind(bookingId)
        .first();
      if (staffAction === "swag" && !desk) return json({ status: "arrival_required" }, 409);
    }

    let stamp = null;
    if (code && (!staffAction || staffAction === "activity")) {
      const activity = await db
        .prepare(
          `SELECT title, kind, EXISTS (SELECT 1 FROM special_missions m WHERE m.code = activities.code) AS mission,
             opens_at, closes_at,
             opens_at IS NOT NULL AND opens_at > datetime('now') AS early,
             closes_at IS NOT NULL AND closes_at < datetime('now') AS late
           FROM activities WHERE code = ?`,
        )
        .bind(code)
        .first();

      if (!activity) {
        stamp = { result: "unknown", code };
      } else if (activity.early || activity.late) {
        stamp = {
          result: activity.early ? "not_open" : "closed",
          title: activity.title,
          opensAt: activity.opens_at,
          closesAt: activity.closes_at,
        };
      } else {
        const insert = await db
          .prepare("INSERT INTO stamps (booking_id, code) VALUES (?, ?) ON CONFLICT DO NOTHING")
          .bind(bookingId, code)
          .run();
        stamp = {
          result: insert.meta.changes > 0 ? "added" : "already",
          title: activity.title,
          kind: activity.kind,
          mission: Boolean(activity.mission),
        };
      }
    }

    const [stampRows, missionRows, stepRows, feedbackRows] = await db.batch([
      db
        .prepare(
          `SELECT a.title, a.kind, c.checked_in_at AS at
           FROM stamps c JOIN activities a ON a.code = c.code
           WHERE c.booking_id = ?
           UNION ALL
           SELECT 'Event arrival', 'arrival', arrived_at AS at FROM desk WHERE booking_id = ?
           ORDER BY at, title`,
        )
        .bind(bookingId, bookingId),
      db
        .prepare(
          `SELECT a.title, c.code IS NOT NULL AS done FROM special_missions m
           JOIN activities a ON a.code = m.code
           LEFT JOIN stamps c ON c.code = m.code AND c.booking_id = ?
           ORDER BY a.title, a.code`,
        )
        .bind(bookingId),
      db
        .prepare(
          `SELECT s.mission, s.required, a.title, c.code IS NOT NULL AS done
           FROM passport_mission_steps s JOIN activities a ON a.code = s.code
           LEFT JOIN stamps c ON c.code = s.code AND c.booking_id = ?
           ORDER BY s.position, a.title`,
        )
        .bind(bookingId),
      db
        .prepare(
          `SELECT a.title, a.opens_at AS opensAt, a.closes_at AS closesAt,
                  c.code IS NOT NULL AS done
           FROM activities a
           LEFT JOIN stamps c ON c.code = a.code AND c.booking_id = ?
           WHERE a.kind = 'feedback' ORDER BY a.title`,
        )
        .bind(bookingId),
    ]);

    const stamps = stampRows.results;
    const required = [];
    const missions = missionRows.results.map(({ title, done }) => ({ title, done: Boolean(done) }));
    for (const [key, title] of Object.entries(MISSION_LABELS)) {
      const rows = stepRows.results.filter((row) => row.mission === key);
      if (!rows.length) continue;
      const steps = rows.map((row) => {
        const step = { title: row.title, done: Boolean(row.done) };
        if (row.required) required.push(step);
        return step;
      });
      missions.push({ title, done: steps.every((step) => step.done), steps });
    }
    const feedbackUrl = /^https:\/\/(?:forms\.gle\/|docs\.google\.com\/forms\/)/i.test(
      env.PASS_FEEDBACK_FORM_URL || "",
    )
      ? env.PASS_FEEDBACK_FORM_URL
      : undefined;
    for (const { title, done, opensAt, closesAt } of feedbackRows.results)
      required.push({
        title,
        done: Boolean(done),
        kind: "feedback",
        opensAt,
        closesAt,
        url: feedbackUrl,
      });
    return json({
      status: "ok",
      bookingId,
      name: passport.name,
      firstName: passport.name.split(" ")[0],
      email: passport.email,
      pass: passport.pass,
      stamp,
      stamps,
      activityCount: stamps.length,
      missions,
      required,
      ...(staffAction && {
        staff: { arrivedAt: desk?.arrivedAt, swagAt: desk?.swagAt, swagRecorded },
      }),
    });
  } catch (error) {
    console.error("pass api", error);
    return json({ status: "error" }, 500);
  }
}
