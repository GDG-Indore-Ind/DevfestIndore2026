// Build/editor tooling only. App components consume the generated public snapshot.
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as schema from "../../src/db/schema.ts";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const DATABASE_PATH = path.join(ROOT, "content/devfest.sqlite");
export const MIGRATIONS_PATH = path.join(ROOT, "src/db/migrations");

export function openDatabase(filename = DATABASE_PATH, readonly = true) {
  const sqlite = new Database(filename, { readonly, fileMustExist: readonly });
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 5000");
  return { sqlite, db: drizzle(sqlite, { schema }) };
}

export function migrateDatabase(filename = DATABASE_PATH) {
  const connection = openDatabase(filename, false);
  try {
    migrate(connection.db, { migrationsFolder: MIGRATIONS_PATH });
  } finally {
    connection.sqlite.close();
  }
}
