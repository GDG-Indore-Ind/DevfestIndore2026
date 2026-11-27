#!/usr/bin/env node
/**
 * Turns a KonfHub attendee export into local/pass/attendees.sql for the passport database.
 *
 *   npm run pass:attendees -- local/pass/konfhub.csv [--booking "Col"] [--name "Col"] [--email "Col"] [--pass "Col"]
 *
 * Only booking ID, name, email and ticket name are kept. The booking ID is each attendee's sign-in,
 * so it must be unique per ticket; the script stops if one ID appears on rows with different names. Rows whose status column mentions cancel or refund are skipped.
 * Keep the export and the generated SQL in local/ (ignored): both contain personal data. See docs/pass.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseCsv, sqlText } from "./csv.mjs";

const args = process.argv.slice(2);
const flag = (name) => {
  const index = args.indexOf(`--${name}`);
  return index > -1 ? args[index + 1] : undefined;
};
const input = args.find(
  (arg, index) => !arg.startsWith("--") && !args[index - 1]?.startsWith("--"),
);
if (!input) {
  console.error(
    "Usage: npm run pass:attendees -- <konfhub-export.csv> [--booking Col] [--name Col] [--email Col] [--pass Col]",
  );
  process.exit(1);
}

const [header, ...rows] = parseCsv(readFileSync(resolve(input), "utf8"));
const columns = header.map((cell) => cell.trim());
const find = (override, patterns) => {
  if (override) {
    const index = columns.findIndex((column) => column.toLowerCase() === override.toLowerCase());
    if (index === -1) throw new Error(`Column "${override}" not found`);
    return index;
  }
  for (const pattern of patterns) {
    const index = columns.findIndex((column) => pattern.test(column));
    if (index > -1) return index;
  }
  return -1;
};

const bookingCol = find(flag("booking"), [
  /^booking ?id$/i,
  /^ticket ?id$/i,
  /booking ?(id|no|number|ref)/i,
  /ticket ?(id|no|number)/i,
]);
const emailCol = find(flag("email"), [/^(attendee )?e-?mail( address| id)?$/i, /e-?mail/i]);
const nameCol = find(flag("name"), [
  /^(attendee )?(full )?name$/i,
  /^attendee name/i,
  /full name/i,
]);
const firstCol = find(undefined, [/^first name$/i]);
const lastCol = find(undefined, [/^last name$/i]);
const passCol = find(flag("pass"), [/^ticket( name| type| category)?$/i, /ticket/i, /^pass/i]);
const statusCol = find(undefined, [/status/i]);

console.log(`Columns: ${columns.join(" | ")}`);
const show = (label, index) =>
  console.log(`  ${label}: ${index > -1 ? columns[index] : "(not found)"}`);
show("booking", bookingCol);
show("email", emailCol);
show("name", nameCol > -1 ? nameCol : firstCol);
show("pass", passCol);
show("status", statusCol);

if (bookingCol === -1 || emailCol === -1 || (nameCol === -1 && firstCol === -1) || passCol === -1) {
  console.error(
    "Could not find the booking ID, email, name and ticket columns. Pass --booking, --email, --name and --pass.",
  );
  process.exit(1);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Must match bookingKey and BOOKING_PATTERN in functions/api/pass.js.
const BOOKING = /^[A-Z0-9][A-Z0-9._/-]{3,63}$/;
const seen = new Map();
const conflicts = [];
const skipped = { invalid: 0, duplicate: 0, cancelled: 0 };

for (const row of rows) {
  const cell = (index) => (index > -1 ? (row[index] ?? "").replace(/\s+/g, " ").trim() : "");
  if (statusCol > -1 && /cancel|refund/i.test(cell(statusCol))) {
    skipped.cancelled += 1;
    continue;
  }
  const bookingId = cell(bookingCol).replace(/\s+/g, "").toUpperCase();
  const email = cell(emailCol).toLowerCase();
  const name = (nameCol > -1 ? cell(nameCol) : `${cell(firstCol)} ${cell(lastCol)}`.trim()).slice(
    0,
    80,
  );
  const pass = cell(passCol).slice(0, 60) || "Registered";
  if (!BOOKING.test(bookingId) || !EMAIL.test(email) || !name) {
    skipped.invalid += 1;
    continue;
  }
  if (seen.has(bookingId)) {
    skipped.duplicate += 1;
    if (seen.get(bookingId).name !== name) conflicts.push(bookingId);
    continue;
  }
  seen.set(bookingId, { bookingId, email, name, pass });
}

if (conflicts.length) {
  console.error(
    `\n${conflicts.length} booking IDs belong to more than one attendee (for example ${conflicts[0]}).` +
      " This column looks like an order ID shared by a group. Choose the per-ticket ID with --booking.",
  );
  process.exit(1);
}

const sql = [...seen.values()]
  .map(
    ({ bookingId, email, name, pass }) =>
      `INSERT INTO passports (booking_id, name, email, pass) VALUES (${[bookingId, name, email, pass].map(sqlText).join(", ")})` +
      " ON CONFLICT (booking_id) DO UPDATE SET name = excluded.name, email = excluded.email, pass = excluded.pass;",
  )
  .join("\n");
writeFileSync(new URL("../local/pass/attendees.sql", import.meta.url), `${sql}\n`);

const byPass = {};
for (const { pass } of seen.values()) byPass[pass] = (byPass[pass] ?? 0) + 1;
console.log(`\n${seen.size} attendees written to local/pass/attendees.sql`);
console.table(byPass);
console.log(
  `Skipped: ${skipped.invalid} invalid, ${skipped.duplicate} repeated booking IDs, ${skipped.cancelled} cancelled`,
);
if (statusCol > -1) {
  const statuses = new Set(rows.map((row) => (row[statusCol] ?? "").trim()));
  console.log(`Status values seen: ${[...statuses].join(", ")}`);
}
