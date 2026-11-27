-- Event-day passport for DevFest Indore 2026, stored in the Cloudflare D1 database bound as `DB`.
-- Apply with: npx wrangler d1 execute devfest-pass --remote --file=cloudflare/pass-schema.sql
-- Holds attendee names, emails and KonfHub booking IDs, so it is separate from the public content
-- database (content/devfest.sqlite) and is deleted after the event. See docs/pass.md.
--
-- A passport belongs to one KonfHub booking ID (one per ticket, so each member of a group booking
-- has their own). The booking ID is the attendee's sign-in credential; several passports can share
-- an email address.

CREATE TABLE IF NOT EXISTS passports (
  booking_id TEXT PRIMARY KEY,           -- upper-cased KonfHub booking ID
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',        -- lower-cased; shared by group bookings
  pass TEXT NOT NULL,                    -- ticket name from KonfHub, or 'Walk-in' for desk-created passports
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS passports_email ON passports (email);

CREATE TABLE IF NOT EXISTS activities (
  code TEXT PRIMARY KEY,                 -- random, printed on the QR card
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('session', 'booth', 'feedback')),
  opens_at TEXT,                         -- UTC 'YYYY-MM-DD HH:MM:SS'; NULL means no limit
  closes_at TEXT
);

CREATE TABLE IF NOT EXISTS stamps (
  booking_id TEXT NOT NULL REFERENCES passports (booking_id),
  code TEXT NOT NULL REFERENCES activities (code),
  checked_in_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (booking_id, code)
);

CREATE TABLE IF NOT EXISTS special_missions (
  code TEXT PRIMARY KEY REFERENCES activities (code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS passport_mission_steps (
  code TEXT PRIMARY KEY REFERENCES activities (code) ON DELETE CASCADE,
  mission TEXT NOT NULL CHECK (mission IN ('cake-wallet', 'space-club')),
  position INTEGER NOT NULL,
  required INTEGER NOT NULL DEFAULT 0 CHECK (required IN (0, 1))
);

CREATE TABLE IF NOT EXISTS desk (
  booking_id TEXT PRIMARY KEY REFERENCES passports (booking_id),
  arrived_at TEXT NOT NULL DEFAULT (datetime('now')),
  swag_at TEXT
);
