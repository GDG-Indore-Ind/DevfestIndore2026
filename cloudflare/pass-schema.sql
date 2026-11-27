-- Event-day passport for DevFest Indore 2026, stored in the Cloudflare D1 database bound as `DB`.
-- Apply with: npx wrangler d1 execute devfest-pass --remote --file=cloudflare/pass-schema.sql
-- Holds attendee emails and names, so it is separate from the public content database
-- (content/devfest.sqlite) and is deleted after the event. See docs/pass.md.

CREATE TABLE IF NOT EXISTS attendees (
  email TEXT PRIMARY KEY,                -- trimmed and lower-cased
  name TEXT NOT NULL,
  pass TEXT NOT NULL,                    -- optional imported ticket label or 'Passport' for self-signup
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activities (
  code TEXT PRIMARY KEY,                 -- random, printed on the QR card
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('session', 'booth', 'feedback')),
  opens_at TEXT,                         -- UTC 'YYYY-MM-DD HH:MM:SS'; NULL means no limit
  closes_at TEXT
);

CREATE TABLE IF NOT EXISTS checkins (
  email TEXT NOT NULL REFERENCES attendees (email),
  code TEXT NOT NULL REFERENCES activities (code),
  checked_in_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (email, code)
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

CREATE TABLE IF NOT EXISTS passport_desk (
  email TEXT PRIMARY KEY REFERENCES attendees (email),
  arrived_at TEXT NOT NULL DEFAULT (datetime('now')),
  swag_at TEXT
);
