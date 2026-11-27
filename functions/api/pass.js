/**
 * POST /api/pass — the event-day passport (Cloudflare Pages Function, D1 bound as `DB`).
 *
 * Body: { email, name?, code? }
 * - Unknown email without a name returns { status: "needs_name" } so the page can ask for a name.
 * - Unknown email with a name starts a passport.
 * - A code records a check-in when its activity window is open (repeat scans are harmless).
 * Every successful call returns the attendee's passport. See docs/pass.md.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const text = (value, max) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

const CODE_PATTERN = /^[A-Z0-9]{6}$/;
const STAFF_ACTIONS = new Set(["lookup", "arrive", "swag", "activity"]);
const MISSION_LABELS = { "cake-wallet": "Cake Wallet", "space-club": "Space Club of India" };

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
        LEFT JOIN checkins c ON c.code = a.code
        GROUP BY a.code
        ORDER BY a.opens_at IS NULL, a.opens_at, a.title, a.code
      `),
      env.DB.prepare(`
        SELECT datetime('now') AS asOf,
               (SELECT count(*) FROM passport_desk) AS arrivals,
               (SELECT count(*) FROM passport_desk WHERE swag_at IS NOT NULL) AS swagHandovers,
               (SELECT count(*) FROM checkins) AS checkins,
               (SELECT count(DISTINCT email) FROM checkins) AS participants,
               (SELECT count(DISTINCT c.email) FROM checkins c
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

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (body?.adminAction === "stats") return organizerStats(body.password, env);
  const email = text(body?.email, 254).toLowerCase();
  const name = text(body?.name, 80);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  const staffAction = body?.staffAction;
  if (
    staffAction &&
    (!STAFF_ACTIONS.has(staffAction) ||
      !(env.PASS_STAFF_KEY?.length >= 24) ||
      !(await validKey(body.staffKey, env.PASS_STAFF_KEY)))
  )
    return json({ status: "unauthorized" }, 401);
  if ((code || staffAction === "activity") && !CODE_PATTERN.test(code))
    return json({ status: "invalid_code" }, 400);

  if (!EMAIL_PATTERN.test(email)) return json({ status: "invalid_email" }, 400);

  const db = env.DB;
  if (!db) return json({ status: "error", message: "Passport database is not bound." }, 500);

  try {
    let attendee = await db
      .prepare("SELECT name, pass FROM attendees WHERE email = ?")
      .bind(email)
      .first();

    if (!attendee) {
      if (!name || (staffAction && staffAction !== "arrive")) return json({ status: "needs_name" });
      await db
        .prepare(
          "INSERT INTO attendees (email, name, pass) VALUES (?, ?, 'Passport') ON CONFLICT (email) DO NOTHING",
        )
        .bind(email, name)
        .run();
      attendee = await db
        .prepare("SELECT name, pass FROM attendees WHERE email = ?")
        .bind(email)
        .first();
    }

    let desk;
    let swagRecorded;
    if (staffAction) {
      if (staffAction === "arrive") {
        await db
          .prepare("INSERT INTO passport_desk (email) VALUES (?) ON CONFLICT DO NOTHING")
          .bind(email)
          .run();
      }
      if (staffAction === "swag") {
        const result = await db
          .prepare(
            "UPDATE passport_desk SET swag_at = datetime('now') WHERE email = ? AND swag_at IS NULL",
          )
          .bind(email)
          .run();
        swagRecorded = result.meta.changes > 0;
      }
      desk = await db
        .prepare(
          "SELECT arrived_at AS arrivedAt, swag_at AS swagAt FROM passport_desk WHERE email = ?",
        )
        .bind(email)
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
          .prepare("INSERT INTO checkins (email, code) VALUES (?, ?) ON CONFLICT DO NOTHING")
          .bind(email, code)
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
           FROM checkins c JOIN activities a ON a.code = c.code
           WHERE c.email = ?
           UNION ALL
           SELECT 'Event arrival', 'arrival', arrived_at AS at FROM passport_desk WHERE email = ?
           ORDER BY at, title`,
        )
        .bind(email, email),
      db
        .prepare(
          `SELECT a.title, c.code IS NOT NULL AS done FROM special_missions m
        JOIN activities a ON a.code = m.code LEFT JOIN checkins c ON c.code = m.code AND c.email = ?
        ORDER BY a.title, a.code`,
        )
        .bind(email),
      db
        .prepare(
          `SELECT s.mission, s.required, a.title, c.code IS NOT NULL AS done
           FROM passport_mission_steps s JOIN activities a ON a.code = s.code
           LEFT JOIN checkins c ON c.code = s.code AND c.email = ?
           ORDER BY s.position, a.title`,
        )
        .bind(email),
      db
        .prepare(
          `SELECT a.title, a.opens_at AS opensAt, a.closes_at AS closesAt,
                  c.code IS NOT NULL AS done
           FROM activities a
           LEFT JOIN checkins c ON c.code = a.code AND c.email = ?
           WHERE a.kind = 'feedback' ORDER BY a.title`,
        )
        .bind(email),
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
      firstName: attendee.name.split(" ")[0],
      email,
      pass: attendee.pass,
      stamp,
      stamps,
      activityCount: stamps.length,
      missions,
      required,
      ...(staffAction && {
        staff: {
          name: attendee.name,
          arrivedAt: desk?.arrivedAt,
          swagAt: desk?.swagAt,
          swagRecorded,
        },
      }),
    });
  } catch (error) {
    console.error("pass api", error);
    return json({ status: "error" }, 500);
  }
}
