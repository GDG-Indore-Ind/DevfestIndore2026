#!/usr/bin/env node
/**
 * Builds the passport activity list from local/pass/activities.csv (never committed).
 *
 *   npm run pass:activities [-- --base https://<preview>.pages.dev]
 *
 * - Gives each row without a code a random one and writes it back, so printed cards stay valid on reruns.
 * - Writes local/pass/activities.sql for `wrangler d1 execute` (upserts; never deletes).
 * - Writes an A5 print sheet and individual PNG cards under local/pass/.
 * See docs/pass.md.
 */
import { randomInt } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import QRCode from "qrcode";
import sharp from "sharp";
import { csvCell, parseCsv, sqlText } from "./csv.mjs";

const root = new URL("../", import.meta.url);
const file = new URL("local/pass/activities.csv", root);
const event = JSON.parse(
  readFileSync(new URL("src/content/generated/event.json", root), "utf8"),
).events.find((entry) => entry.status === "current");

const baseFlag = process.argv.indexOf("--base");
const base = (baseFlag > -1 ? process.argv[baseFlag + 1] : event.links.website).replace(/\/$/, "");
const day = event.date.slice(0, 10);
const offset = event.date.slice(19) || "+05:30";

const KINDS = new Set(["session", "booth", "feedback"]);
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const SESSION_BUFFER = 15;
const HEADER = [
  "code",
  "kind",
  "title",
  "start",
  "end",
  "mission",
  "card_note",
  "required",
  "agenda_id",
];
const GROUPS = new Set(["cake-wallet", "space-club"]);

if (!existsSync(file)) {
  console.error(`Missing ${file.pathname}. Create it with the header: ${HEADER.join(",")}`);
  process.exit(1);
}

const fail = (line, message) => {
  console.error(`activities.csv line ${line}: ${message}`);
  process.exit(1);
};

const utc = (time, minutes) =>
  new Date(Date.parse(`${day}T${time}${offset}`) + minutes * 60_000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

const ist = new Intl.DateTimeFormat("en-GB", {
  timeZone: event.timezone,
  hour: "2-digit",
  minute: "2-digit",
});
const localTime = (value) => ist.format(new Date(value.replace(" ", "T") + "Z"));

const programme = JSON.parse(
  readFileSync(new URL("src/content/generated/programme.json", root), "utf8"),
).entries;
const agenda = new Map(
  programme
    .filter((entry) => entry.eventId === event.id && entry.publication === "confirmed")
    .map((entry) => [entry.id, entry]),
);

const lines = readFileSync(file, "utf8").split(/\r?\n/);
const used = new Set();
const activities = [];
let sawHeader = false;

const output = lines.map((line, index) => {
  if (!line.trim() || line.trimStart().startsWith("#")) return line;
  const cells = parseCsv(line)[0].map((cell) => cell.trim());
  if (!sawHeader) {
    sawHeader = true;
    if (
      ![5, 6, 7, 8, 9].some(
        (length) => HEADER.slice(0, length).join(",") === cells.join(",").toLowerCase(),
      )
    )
      fail(index + 1, `header must be ${HEADER.join(",")}`);
    return HEADER.join(",");
  }

  let [code, kind, title, start, end, mission = "", cardNote = "", required = "", agendaId = ""] =
    cells;
  mission = mission.toLowerCase();
  if (
    cells.length > HEADER.length ||
    (!["", "yes", "no"].includes(mission) && !GROUPS.has(mission))
  )
    fail(index + 1, "unknown mission");
  if (required && (required !== "yes" || !GROUPS.has(mission)))
    fail(index + 1, "required must be blank or yes on a mission step");
  code = (code || "").toUpperCase();
  if (code && !/^[A-Z0-9]{6}$/.test(code)) fail(index + 1, "code must be six letters or digits");
  if (!KINDS.has(kind)) fail(index + 1, `kind must be session, booth or feedback (got "${kind}")`);
  if (!title) fail(index + 1, "title is required");
  if (agendaId) {
    const entry = agenda.get(agendaId);
    if (kind !== "session" || !entry?.time || !entry.durationMinutes)
      fail(index + 1, "agenda_id must refer to a timed session or workshop in the current agenda");
    start = entry.time;
    end = localTime(utc(start + ":00", entry.durationMinutes));
  }
  for (const time of [start, end]) {
    if (time && !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time))
      fail(index + 1, `times are HH:MM in event time (got "${time}")`);
  }
  if (Boolean(start) !== Boolean(end)) fail(index + 1, "set both times or leave both blank");
  if (start && end && end <= start) fail(index + 1, "end must be after start");

  if (!code) {
    do {
      code = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
    } while (used.has(code));
  }
  if (used.has(code)) fail(index + 1, `duplicate code ${code}`);
  used.add(code);

  const buffer = kind === "session" ? SESSION_BUFFER : 0;
  activities.push({
    code,
    kind,
    title,
    start,
    end,
    mission,
    required: required === "yes",
    cardNote,
    opensAt: start ? utc(start + ":00", -buffer) : utc("00:00:00", 0),
    closesAt: end ? utc(end + ":00", buffer) : utc("23:59:59", 0),
  });
  return [code, kind, title, start, end, mission, cardNote, required, agendaId]
    .map(csvCell)
    .join(",");
});

writeFileSync(file, output.join("\n"));

const sql = activities
  .map(
    (a, index) =>
      `INSERT INTO activities (code, title, kind, opens_at, closes_at) VALUES (${[a.code, a.title, a.kind, a.opensAt, a.closesAt].map(sqlText).join(", ")})\n` +
      "  ON CONFLICT (code) DO UPDATE SET title = excluded.title, kind = excluded.kind, opens_at = excluded.opens_at, closes_at = excluded.closes_at;\n" +
      (a.mission === "yes"
        ? `INSERT OR IGNORE INTO special_missions (code) VALUES (${sqlText(a.code)});`
        : `DELETE FROM special_missions WHERE code = ${sqlText(a.code)};`) +
      "\n" +
      (GROUPS.has(a.mission)
        ? `INSERT INTO passport_mission_steps (code, mission, position, required) VALUES (${sqlText(a.code)}, ${sqlText(a.mission)}, ${index}, ${Number(a.required)}) ON CONFLICT(code) DO UPDATE SET mission = excluded.mission, position = excluded.position, required = excluded.required;`
        : `DELETE FROM passport_mission_steps WHERE code = ${sqlText(a.code)};`),
  )
  .join("\n");
writeFileSync(new URL("local/pass/activities.sql", root), `${sql}\n`);

const escape = (value) =>
  String(value).replace(
    /[&<>"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
  );
const LABELS = { session: "Session", booth: "Exhibit", feedback: "Feedback" };
const feedbackFormUrl = process.env.PASS_FEEDBACK_FORM_URL || "";
if (
  feedbackFormUrl &&
  !/^https:\/\/(?:forms\.gle\/|docs\.google\.com\/forms\/)/i.test(feedbackFormUrl)
) {
  throw new Error("PASS_FEEDBACK_FORM_URL must be a Google Forms link");
}
const host = base.replace(/^https?:\/\//, "");
const cardsDir = new URL("local/pass/qr-cards/", root);
mkdirSync(cardsDir, { recursive: true });

const date = new Intl.DateTimeFormat("en-GB", {
  timeZone: event.timezone,
  day: "numeric",
  month: "long",
}).format(new Date(event.date));
const logo = await sharp(readFileSync(new URL("public/gdg-logo.png", root)))
  .resize(84)
  .png()
  .toBuffer();

function wrapTitle(title) {
  const lines = [""];
  for (const word of title.split(/\s+/)) {
    const last = lines.length - 1;
    if (lines[last] && (lines[last] + " " + word).length > 28) lines.push(word);
    else lines[last] = [lines[last], word].filter(Boolean).join(" ");
  }
  return lines;
}

const cards = await Promise.all(
  activities.map(async (activity, index) => {
    const { code, kind, start, end, mission, cardNote, opensAt, closesAt } = activity;
    const workshop = activity.title.startsWith("Workshop: ");
    const title = activity.title.replace(/^Workshop: /, "");
    const format = workshop ? "Workshop" : LABELS[kind];
    const label = cardNote || (mission === "yes" || GROUPS.has(mission) ? "Special mission" : "");
    const feedback = kind === "feedback";
    const stampUrl = `${base}/pass?c=${code}`;
    const url = feedback ? feedbackFormUrl : stampUrl;
    if (feedback)
      writeFileSync(
        new URL("local/pass/feedback-confirmation.txt", root),
        `Thanks for sharing your feedback. Enter code ${code} in your DevFest Passport to mark feedback complete.\n${base}/pass\n`,
        { mode: 0o600 },
      );
    const action = feedback ? "Complete the feedback form" : "Scan to collect your stamp";
    const instructions = feedback
      ? "After submitting, enter the code you receive at"
      : "Trouble scanning? Enter this code at";
    const next = `${host}/pass`;
    const window = start
      ? `${localTime(opensAt)}–${localTime(closesAt)} IST`
      : `all event day · ${date}`;
    const slot = start ? ` · ${start}–${end} IST` : "";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const filename = `${String(index + 1).padStart(2, "0")}-${slug}.png`;
    const lines = wrapTitle(title);
    const headline = lines
      .map((line, i) => `<tspan x="100" dy="${i ? 68 : 0}">${escape(line)}</tspan>`)
      .join("");
    const timingY = 370 + lines.length * 68;
    const template =
      Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1240" height="1748" viewBox="0 0 1240 1748">
      <rect width="1240" height="1748" fill="#ffffff"/>
      <rect x="52" y="50" width="1136" height="1648" rx="48" fill="#ffffff" stroke="#dadce0" stroke-width="3"/>
      <rect x="100" y="95" width="55" height="8" rx="4" fill="#4285f4"/>
      <rect x="162" y="95" width="55" height="8" rx="4" fill="#ea4335"/>
      <rect x="224" y="95" width="55" height="8" rx="4" fill="#fbbc04"/>
      <rect x="286" y="95" width="55" height="8" rx="4" fill="#34a853"/>
      <image x="1036" y="98" width="86" height="86" xlink:href="data:image/png;base64,${logo.toString("base64")}"/>
      <g font-family="Arial, sans-serif" fill="#202124">
        <text x="100" y="162" font-size="34" font-weight="700">DevFest Indore 2026</text>
        <text x="100" y="210" font-size="32" fill="#4c5159">Activity check-in · ${escape(date)}</text>
        <path d="M100 246H1140" stroke="#dadce0" stroke-width="2"/>
        <text x="100" y="308" font-size="33" font-weight="700" fill="#185abc">${escape(format + slot)}</text>
        <text x="100" y="386" font-size="60" font-weight="700">${headline}</text>
        <text x="100" y="${timingY}" font-size="33" fill="#4c5159">${escape(label)}</text>
        <rect x="100" y="726" width="1040" height="690" rx="38" fill="#e8f0fe"/>
        <text x="620" y="794" text-anchor="middle" font-size="46" font-weight="700" fill="#17356d">${action}</text>
        ${feedback && !url ? '<text x="620" y="1060" text-anchor="middle" font-size="39" fill="#17356d">Ask the event team for the form link.</text>' : ""}
        <text x="620" y="1368" text-anchor="middle" font-size="33" fill="#17356d">${feedback ? "Passport check-in" : "QR accepts scans"} ${escape(window)}</text>
        <text x="620" y="1495" text-anchor="middle" font-size="32" fill="#4c5159">${instructions}</text>
        <text x="620" y="1545" text-anchor="middle" font-size="36" font-weight="700" fill="#185abc">${escape(next)}</text>
        <text x="620" y="1636" text-anchor="middle" font-size="69" font-weight="700" letter-spacing="9">${feedback ? "" : code}</text>
      </g>
    </svg>`);
    const image = sharp(template);
    if (url) {
      const qr = await QRCode.toBuffer(url, { width: 480, margin: 4, errorCorrectionLevel: "M" });
      image.composite([{ input: qr, left: 380, top: 834 }]);
    }
    await image.withMetadata({ density: 212 }).png().toFile(new URL(filename, cardsDir).pathname);
    return { filename, format, title, label, window, url, code: feedback ? "" : code };
  }),
);

writeFileSync(
  new URL("local/pass/cards.html", root),
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>DevFest Passport QR cards</title>
<style>
  @page { size: A5 portrait; margin: 0; }
  body { margin: 0; }
  img { display: block; width: 148mm; height: 210mm; break-after: page; }
  img:last-child { break-after: auto; }
  @media screen { img { max-width: 100%; height: auto; margin: 0 auto 24px; } }
</style></head><body>
${cards.map(({ filename, title }) => `<img src="qr-cards/${filename}" alt="${escape(title)} passport check-in card" />`).join("\n")}
</body></html>
`,
);
writeFileSync(
  new URL("activity-links.csv", cardsDir),
  [
    ["card", "format", "title", "card_note", "check_in_ist", "code", "url"],
    ...cards.map((card) => [
      card.filename,
      card.format,
      card.title,
      card.label,
      card.window,
      card.code,
      card.url,
    ]),
  ]
    .map((row) => row.map(csvCell).join(","))
    .join("\n") + "\n",
);

console.log(
  `Generated ${cards.length} QR cards and the D1 import. Codes are in local/pass/qr-cards/activity-links.csv.`,
);
