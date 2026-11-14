import { existsSync, readFileSync, writeFileSync, renameSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDatabase, migrateDatabase, DATABASE_PATH, ROOT } from "./lib/database.ts";

export const EXPORT_PATH = path.join(ROOT, "content/database.sql");
const quote = (value) =>
  value === null
    ? "NULL"
    : typeof value === "number"
      ? String(value)
      : `'${String(value).replaceAll("'", "''")}'`;
const identifier = (name) => `"${name.replaceAll('"', '""')}"`;

/** Deterministic data-only SQL: reviewable content diff and recovery source, not a second editor. */
export function exportSql(sqlite) {
  return sqlite.transaction(() => sqlSnapshot(sqlite))();
}

function sqlSnapshot(sqlite) {
  const tables = sqlite
    .prepare(
      "SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__drizzle_%' ORDER BY name",
    )
    .all();
  const lines = [
    "-- Generated from content/devfest.sqlite. Edit the database, then npm run db:export.",
    "-- Schema lives in src/db/migrations; restore into an empty migrated database.",
    "BEGIN TRANSACTION;",
    "PRAGMA defer_foreign_keys = ON;",
  ];
  for (const { name } of tables) {
    const columns = sqlite.prepare(`PRAGMA table_info(${identifier(name)})`).all();
    const keys = columns
      .filter((c) => c.pk)
      .sort((a, b) => a.pk - b.pk)
      .map((c) => identifier(c.name));
    const rows = sqlite
      .prepare(`SELECT * FROM ${identifier(name)} ORDER BY ${keys.join(", ")}`)
      .all();
    lines.push(`\n-- ${name}`);
    for (const row of rows)
      lines.push(
        `INSERT INTO ${identifier(name)} (${columns.map((c) => identifier(c.name)).join(", ")}) VALUES (${columns.map((c) => quote(row[c.name])).join(", ")});`,
      );
  }
  lines.push("COMMIT;", "");
  return lines.join("\n");
}

export function checkDatabase(sqlite) {
  const integrity = sqlite.pragma("integrity_check");
  if (integrity.some((row) => row.integrity_check !== "ok"))
    throw new Error(`SQLite integrity check failed: ${JSON.stringify(integrity)}`);
  const errors = sqlite.pragma("foreign_key_check");
  if (errors.length) throw new Error(`Foreign key violations: ${JSON.stringify(errors)}`);
}

export function restoreDatabase(destination) {
  if (existsSync(destination))
    throw new Error(`Refusing to overwrite ${destination}. Restore to a new --output path.`);
  const temporary = `${destination}.restoring`;
  if (existsSync(temporary)) throw new Error(`Incomplete restore exists: ${temporary}`);
  migrateDatabase(temporary);
  const { sqlite } = openDatabase(temporary, false);
  try {
    sqlite.exec(readFileSync(EXPORT_PATH, "utf8"));
    checkDatabase(sqlite);
    sqlite.close();
    renameSync(temporary, destination);
  } catch (error) {
    if (sqlite.open) sqlite.close();
    rmSync(temporary, { force: true });
    throw error;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const command = process.argv[2];
  if (command === "restore") {
    const i = process.argv.indexOf("--output");
    restoreDatabase(i < 0 ? DATABASE_PATH : path.resolve(process.argv[i + 1]));
    console.log("Restored database from reviewed SQL export.");
  } else if (command === "migrate") {
    migrateDatabase();
    console.log("Database migrations applied.");
  } else {
    const { sqlite } = openDatabase();
    try {
      checkDatabase(sqlite);
      if (command === "export") {
        writeFileSync(EXPORT_PATH, exportSql(sqlite));
        console.log("Updated content/database.sql.");
      } else if (command === "check") {
        if (readFileSync(EXPORT_PATH, "utf8") !== exportSql(sqlite))
          throw new Error(
            "Database content changed. Run npm run db:export to update its reviewable SQL export.",
          );
        console.log("SQLite integrity, foreign keys and SQL export verified.");
      } else
        throw new Error(
          "Usage: node scripts/database.mjs export | check | migrate | restore [--output <new-path>]",
        );
    } finally {
      sqlite.close();
    }
  }
}
