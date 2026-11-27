#!/usr/bin/env node
/**
 * Turns a KonfHub attendee export into local/pass/attendees.sql for the passport database.
 *
 *   npm run pass:attendees -- local/pass/konfhub.csv [--name "Col"] [--email "Col"] [--pass "Col"]
 *
 * Only name, email and ticket name are kept. Rows whose status column mentions cancel or refund are skipped.
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
    "Usage: npm run pass:attendees -- <konfhub-export.csv> [--name Col] [--email Col] [--pass Col]",
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
show("email", emailCol);
show("name", nameCol > -1 ? nameCol : firstCol);
show("pass", passCol);
show("status", statusCol);

if (emailCol === -1 || (nameCol === -1 && firstCol === -1) || passCol === -1) {
  console.error(
    "Could not find the email, name and ticket columns. Pass --email, --name and --pass.",
  );
  process.exit(1);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const seen = new Map();
const skipped = { invalid: 0, duplicate: 0, cancelled: 0 };

for (const row of rows) {
  const cell = (index) => (index > -1 ? (row[index] ?? "").replace(/\s+/g, " ").trim() : "");
  if (statusCol > -1 && /cancel|refund/i.test(cell(statusCol))) {
    skipped.cancelled += 1;
    continue;
  }
  const email = cell(emailCol).toLowerCase();
  const name = (nameCol > -1 ? cell(nameCol) : `${cell(firstCol)} ${cell(lastCol)}`.trim()).slice(
    0,
    80,
  );
  const pass = cell(passCol).slice(0, 60) || "Registered";
  if (!EMAIL.test(email) || !name) {
    skipped.invalid += 1;
    continue;
  }
  if (seen.has(email)) {
    skipped.duplicate += 1;
    continue;
  }
  seen.set(email, { email, name, pass });
}

const sql = [...seen.values()]
  .map(
    ({ email, name, pass }) =>
      `INSERT INTO attendees (email, name, pass) VALUES (${sqlText(email)}, ${sqlText(name)}, ${sqlText(pass)})` +
      " ON CONFLICT (email) DO UPDATE SET name = excluded.name, pass = excluded.pass;",
  )
  .join("\n");
writeFileSync(new URL("../local/pass/attendees.sql", import.meta.url), `${sql}\n`);

const byPass = {};
for (const { pass } of seen.values()) byPass[pass] = (byPass[pass] ?? 0) + 1;
console.log(`\n${seen.size} attendees written to local/pass/attendees.sql`);
console.table(byPass);
console.log(
  `Skipped: ${skipped.invalid} invalid, ${skipped.duplicate} duplicate emails, ${skipped.cancelled} cancelled`,
);
if (statusCol > -1) {
  const statuses = new Set(rows.map((row) => (row[statusCol] ?? "").trim()));
  console.log(`Status values seen: ${[...statuses].join(", ")}`);
}
