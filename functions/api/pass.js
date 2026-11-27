/**
 * POST /api/pass — the event-day passport (Cloudflare Pages Function, D1 bound as `DB`).
 *
 * Attendee body: { bookingId, code? } — the booking ID alone opens an existing passport
 *   (name and email from the roster). Unknown IDs return `not_found`; attendees can't create or edit records.
 * - Only staff create passports (`create` with `name`, optional `email` and `bookingId`; a blank
 *   booking ID gets a generated WALK#### ID; arrival is recorded) and correct them (`update`).
 * - A code records a stamp when its activity window is open (repeat scans are harmless).
 * Staff body: { staffAction, staffKey, ... } — see STAFF_ACTIONS.
 * Organizer body: { adminAction: "stats", password, force? }.
 * Every successful call returns minimal-read passport data. See docs/pass.md.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKING_PATTERN = /^[A-Z0-9][A-Z0-9._/-]{3,63}$/;
const CODE_PATTERN = /^[A-Z0-9]{6}$/;
const STAFF_ACTIONS = new Set(["lookup", "create", "arrive", "swag", "activity", "update"]);
/** Unambiguous characters for generated walk-in booking IDs (no 0/O, 1/I/L). */
const WALK_IN_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const MISSION_LABELS = { "cake-wallet": "Cake Wallet", "space-club": "Space Club of India" };
// The 29-row catalog is fixed for the event: re-read every 30 minutes per isolate, or on an unknown code.
const CATALOG_TTL_MS = 30 * 60_000;
const STATS_TTL_MS = 15_000;

let catalogCache = null;
let statsCache = null;

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

async function freeWalkInId(db) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    const id = "WALK" + [...bytes].map((byte) => WALK_IN_ALPHABET[byte % 31]).join("");
    const taken = await db.prepare("SELECT 1 FROM passports WHERE booking_id = ?").bind(id).first();
    if (!taken) return id;
  }
  throw new Error("No free walk-in ID");
}

const utcNow = () => new Date().toISOString().slice(0, 19).replace("T", " ");

function parseTags(raw) {
  if (typeof raw !== "string" || !raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string" && item) : [];
  } catch {
    return [];
  }
}

async function loadCatalog(db, force = false) {
  const now = Date.now();
  if (!force && catalogCache && catalogCache.expiresAt > now) {
    return { catalog: catalogCache, cached: true };
  }
  const { results } = await db
    .prepare(
      `SELECT code, title, kind, format, hall, track, agenda_id AS agendaId,
              tags, mission, mission_position AS missionPosition, required,
              opens_at AS opensAt, closes_at AS closesAt
       FROM activities
       ORDER BY opens_at IS NULL, opens_at, title, code`,
    )
    .all();
  const list = results.map((row) => ({
    ...row,
    tags: parseTags(row.tags),
    required: Boolean(row.required),
  }));
  const byCode = new Map(list.map((entry) => [entry.code, entry]));
  catalogCache = { expiresAt: now + CATALOG_TTL_MS, list, byCode };
  return { catalog: catalogCache, cached: false };
}

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

async function organizerStats(password, force, env) {
  if (!env.PASS_ADMIN_PASSWORD) return json({ status: "admin_not_configured" }, 503);
  if (!(await validKey(password, env.PASS_ADMIN_PASSWORD)))
    return json({ status: "unauthorized" }, 401);
  if (!env.DB) return json({ status: "error" }, 503);

  const now = Date.now();
  if (!force && statsCache && statsCache.expiresAt > now) {
    return json(statsCache.payload);
  }

  try {
    const [activityRows, summaryRows] = await env.DB.batch([
      env.DB.prepare(`
        SELECT a.code, a.title, a.kind, a.format, a.hall, a.track, a.agenda_id AS agendaId,
               a.opens_at AS opensAt, a.closes_at AS closesAt,
               CASE
                 WHEN a.opens_at > datetime('now') THEN 'upcoming'
                 WHEN a.closes_at < datetime('now') THEN 'closed'
                 ELSE 'open'
               END AS state,
               a.mission, a.required,
               a.mission = 'yes' AS specialMission,
               COALESCE(s.checkins, 0) AS checkins,
               s.latest_checkin AS latestCheckin
        FROM activities a
        LEFT JOIN activity_stats s ON s.code = a.code
        ORDER BY a.opens_at IS NULL, a.opens_at, a.title, a.code
      `),
      env.DB.prepare(`
        SELECT datetime('now') AS asOf,
               arrivals,
               swag_handovers AS swagHandovers,
               checkins,
               participants,
               feedback_checkins AS feedbackCheckins
        FROM passport_totals
        WHERE id = 1
      `),
    ]);
    const payload = {
      status: "ok",
      summary: summaryRows.results[0] ?? {
        asOf: utcNow(),
        arrivals: 0,
        swagHandovers: 0,
        checkins: 0,
        participants: 0,
        feedbackCheckins: 0,
      },
      activities: activityRows.results,
    };
    statsCache = { expiresAt: now + STATS_TTL_MS, payload };
    return json(payload);
  } catch (error) {
    console.error("Passport organizer stats query failed", error);
    return json({ status: "error" }, 503);
  }
}

function buildPassportView(catalog, userStamps, arrivedAt, feedbackUrl) {
  const stamped = new Map(userStamps.map((row) => [row.code, row.at]));
  const stamps = [];
  for (const row of userStamps) {
    const activity = catalog.byCode.get(row.code);
    if (!activity) continue;
    stamps.push({
      code: activity.code,
      title: activity.title,
      kind: activity.kind,
      format: activity.format,
      hall: activity.hall,
      track: activity.track,
      agendaId: activity.agendaId,
      tags: activity.tags,
      at: row.at,
    });
  }
  if (arrivedAt) {
    stamps.push({
      code: "ARRIVAL",
      title: "Event arrival",
      kind: "arrival",
      format: "arrival",
      hall: "Registration desk",
      track: "",
      agendaId: "",
      tags: [],
      at: arrivedAt,
    });
  }
  stamps.sort((a, b) => a.at.localeCompare(b.at) || a.title.localeCompare(b.title));

  const required = [];
  const missions = [];

  for (const activity of catalog.list) {
    if (activity.mission === "yes") {
      missions.push({
        title: activity.title,
        done: stamped.has(activity.code),
        format: activity.format,
        hall: activity.hall,
        track: activity.track,
        agendaId: activity.agendaId,
        tags: activity.tags,
      });
    }
  }

  for (const [key, title] of Object.entries(MISSION_LABELS)) {
    const groupRows = catalog.list
      .filter((entry) => entry.mission === key)
      .sort(
        (a, b) =>
          (a.missionPosition ?? Number.MAX_SAFE_INTEGER) -
            (b.missionPosition ?? Number.MAX_SAFE_INTEGER) || a.title.localeCompare(b.title),
      );
    if (!groupRows.length) continue;
    const steps = groupRows.map((entry) => {
      const step = {
        title: entry.title,
        done: stamped.has(entry.code),
        format: entry.format,
        hall: entry.hall,
        track: entry.track,
        agendaId: entry.agendaId,
        tags: entry.tags,
      };
      if (entry.required) required.push(step);
      return step;
    });
    missions.push({ title, done: steps.every((step) => step.done), steps });
  }

  for (const activity of catalog.list) {
    if (activity.kind !== "feedback") continue;
    required.push({
      title: activity.title,
      done: stamped.has(activity.code),
      kind: "feedback",
      format: activity.format,
      hall: activity.hall,
      track: activity.track,
      agendaId: activity.agendaId,
      tags: activity.tags,
      opensAt: activity.opensAt,
      closesAt: activity.closesAt,
      url: feedbackUrl,
    });
  }

  return { stamps, missions, required };
}

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (body?.adminAction === "stats") return organizerStats(body.password, Boolean(body.force), env);
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
    let bookingId = bookingKey(body?.bookingId);
    // Attendees sign in with the booking ID alone; only staff write names and emails.
    const email = staffAction ? text(body?.email, 254).toLowerCase() : "";
    if (email && !EMAIL_PATTERN.test(email)) return json({ status: "invalid_email" }, 400);
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    if (staffAction === "create") {
      if (!text(body?.name, 80)) return json({ status: "needs_name" }, 400);
      // People without a KonfHub booking get a generated ID to open their passport with.
      if (!bookingId) bookingId = await freeWalkInId(db);
    }
    if (!BOOKING_PATTERN.test(bookingId)) return json({ status: "invalid_booking" }, 400);
    if ((code || staffAction === "activity") && !CODE_PATTERN.test(code))
      return json({ status: "invalid_code" }, 400);

    const findPassport = () =>
      db
        .prepare("SELECT name, email, pass FROM passports WHERE booking_id = ?")
        .bind(bookingId)
        .first();
    let passport = await findPassport();

    if (staffAction === "create" && passport) return json({ status: "exists", bookingId }, 409);
    if (!passport) {
      // Only the desk creates records: a walk-in for someone missing from the roster.
      if (staffAction !== "create") return json({ status: "not_found" }, 404);
      const name = text(body?.name, 80);
      await db
        .prepare(
          "INSERT INTO passports (booking_id, name, email, pass) VALUES (?, ?, ?, 'Walk-in') ON CONFLICT (booking_id) DO NOTHING",
        )
        .bind(bookingId, name, email)
        .run();
      passport = await findPassport();
    } else if (staffAction === "update") {
      const name = text(body?.name, 80);
      if (!name) return json({ status: "needs_name" }, 400);
      await db
        .prepare("UPDATE passports SET name = ?, email = ? WHERE booking_id = ?")
        .bind(name, email, bookingId)
        .run();
      passport = await findPassport();
    }

    let desk;
    let swagRecorded;
    if (staffAction) {
      if (staffAction === "arrive" || staffAction === "create") {
        await db
          .prepare("INSERT INTO desk (booking_id) VALUES (?) ON CONFLICT DO NOTHING")
          .bind(bookingId)
          .run();
        statsCache = null;
      }
      if (staffAction === "swag") {
        const result = await db
          .prepare(
            "UPDATE desk SET swag_at = datetime('now') WHERE booking_id = ? AND swag_at IS NULL",
          )
          .bind(bookingId)
          .run();
        swagRecorded = result.meta.changes > 0;
        if (swagRecorded) statsCache = null;
      }
      desk = await db
        .prepare("SELECT arrived_at AS arrivedAt, swag_at AS swagAt FROM desk WHERE booking_id = ?")
        .bind(bookingId)
        .first();
      if (staffAction === "swag" && !desk) return json({ status: "arrival_required" }, 409);
    }

    const needsFullProfile = !staffAction || staffAction === "activity";
    let catalogState =
      needsFullProfile || (code && (!staffAction || staffAction === "activity"))
        ? await loadCatalog(db)
        : null;

    let stamp = null;
    if (code && (!staffAction || staffAction === "activity")) {
      let activity = catalogState.catalog.byCode.get(code);
      if (!activity && catalogState.cached) {
        catalogState = await loadCatalog(db, true);
        activity = catalogState.catalog.byCode.get(code);
      }
      const nowUtc = utcNow();
      const early = Boolean(activity?.opensAt && activity.opensAt > nowUtc);
      const late = Boolean(activity?.closesAt && activity.closesAt < nowUtc);

      if (!activity) {
        stamp = { result: "unknown", code };
      } else if (early || late) {
        stamp = {
          result: early ? "not_open" : "closed",
          title: activity.title,
          opensAt: activity.opensAt,
          closesAt: activity.closesAt,
        };
      } else {
        const insert = await db
          .prepare("INSERT INTO stamps (booking_id, code) VALUES (?, ?) ON CONFLICT DO NOTHING")
          .bind(bookingId, code)
          .run();
        const added = insert.meta.changes > 0;
        if (added) statsCache = null;
        stamp = {
          result: added ? "added" : "already",
          title: activity.title,
          kind: activity.kind,
          format: activity.format,
          hall: activity.hall,
          track: activity.track,
          agendaId: activity.agendaId,
          tags: activity.tags,
          mission: Boolean(activity.mission),
        };
      }
    }

    if (!needsFullProfile) {
      const countRow = await db
        .prepare("SELECT count(*) AS count FROM stamps WHERE booking_id = ?")
        .bind(bookingId)
        .first();
      return json({
        status: "ok",
        bookingId,
        name: passport.name,
        firstName: passport.name.split(" ")[0],
        email: passport.email,
        pass: passport.pass,
        stamp,
        activityCount: Number(countRow?.count ?? 0) + (desk?.arrivedAt ? 1 : 0),
        staff: { arrivedAt: desk?.arrivedAt, swagAt: desk?.swagAt, swagRecorded },
      });
    }

    let userStamps;
    let arrivedAt = desk?.arrivedAt ?? null;
    if (staffAction) {
      const rows = await db
        .prepare("SELECT code, checked_in_at AS at FROM stamps WHERE booking_id = ?")
        .bind(bookingId)
        .all();
      userStamps = rows.results;
    } else {
      const [stampRows, deskRow] = await db.batch([
        db
          .prepare("SELECT code, checked_in_at AS at FROM stamps WHERE booking_id = ?")
          .bind(bookingId),
        db.prepare("SELECT arrived_at AS arrivedAt FROM desk WHERE booking_id = ?").bind(bookingId),
      ]);
      userStamps = stampRows.results;
      arrivedAt = deskRow.results[0]?.arrivedAt ?? null;
    }

    // If a stamp references a newly added activity code not yet in cache, refresh catalog once.
    if (
      catalogState.cached &&
      userStamps.some((row) => !catalogState.catalog.byCode.has(row.code))
    ) {
      catalogState = await loadCatalog(db, true);
    }

    const feedbackUrl = /^https:\/\/(?:forms\.gle\/|docs\.google\.com\/forms\/)/i.test(
      env.PASS_FEEDBACK_FORM_URL || "",
    )
      ? env.PASS_FEEDBACK_FORM_URL
      : undefined;
    const { stamps, missions, required } = buildPassportView(
      catalogState.catalog,
      userStamps,
      arrivedAt,
      feedbackUrl,
    );

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
