-- Event-day passport for DevFest Indore 2026, stored in the Cloudflare D1 database bound as `DB`.
-- Recreate fresh with: npx wrangler d1 execute devfest-pass --remote --file=cloudflare/pass-schema.sql
-- Holds attendee names, emails and KonfHub booking IDs, so it is separate from the public content
-- database (content/devfest.sqlite) and is deleted after the event. See docs/pass.md.
--
-- A passport belongs to one KonfHub booking ID (one per ticket, so each member of a group
-- booking has their own). Attendees sign in with booking ID + email; several passports can share
-- an email address.

CREATE TABLE IF NOT EXISTS passports (
  booking_id TEXT PRIMARY KEY,           -- upper-cased KonfHub booking ID
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',        -- lower-cased; shared by group bookings
  pass TEXT NOT NULL,                    -- ticket name from KonfHub, or 'Passport' / 'Walk-in'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_passports_email ON passports (email);

CREATE TABLE IF NOT EXISTS activities (
  code TEXT PRIMARY KEY,                 -- 6-character code printed on the QR card
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('session', 'workshop', 'exhibit', 'activity', 'feedback')),
  format TEXT NOT NULL DEFAULT 'session',
  hall TEXT NOT NULL DEFAULT '',
  track TEXT NOT NULL DEFAULT '',
  agenda_id TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '[]',       -- JSON array of extra labels/notes
  mission TEXT,                          -- 'cake-wallet', 'space-club', 'yes', or NULL
  mission_position INTEGER,
  required INTEGER NOT NULL DEFAULT 0 CHECK (required IN (0, 1)),
  opens_at TEXT,                         -- UTC 'YYYY-MM-DD HH:MM:SS'; NULL means no limit
  closes_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_activities_kind ON activities (kind, title);

CREATE TABLE IF NOT EXISTS stamps (
  booking_id TEXT NOT NULL REFERENCES passports (booking_id),
  code TEXT NOT NULL REFERENCES activities (code),
  checked_in_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (booking_id, code)
);
CREATE INDEX IF NOT EXISTS idx_stamps_code_at ON stamps (code, checked_in_at);

CREATE TABLE IF NOT EXISTS desk (
  booking_id TEXT PRIMARY KEY REFERENCES passports (booking_id),
  arrived_at TEXT NOT NULL DEFAULT (datetime('now')),
  swag_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_desk_swag ON desk (swag_at) WHERE swag_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS activity_stats (
  code TEXT PRIMARY KEY REFERENCES activities (code) ON DELETE CASCADE,
  checkins INTEGER NOT NULL DEFAULT 0,
  latest_checkin TEXT
);

CREATE TABLE IF NOT EXISTS passport_totals (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  arrivals INTEGER NOT NULL DEFAULT 0,
  swag_handovers INTEGER NOT NULL DEFAULT 0,
  checkins INTEGER NOT NULL DEFAULT 0,
  participants INTEGER NOT NULL DEFAULT 0,
  feedback_checkins INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO passport_totals (id) VALUES (1);

CREATE TRIGGER IF NOT EXISTS trg_stamps_after_insert
AFTER INSERT ON stamps
BEGIN
  INSERT INTO activity_stats (code, checkins, latest_checkin)
  VALUES (NEW.code, 1, NEW.checked_in_at)
  ON CONFLICT (code) DO UPDATE SET
    checkins = checkins + 1,
    latest_checkin = CASE
      WHEN latest_checkin IS NULL OR excluded.latest_checkin > latest_checkin
      THEN excluded.latest_checkin
      ELSE latest_checkin
    END;

  UPDATE passport_totals
  SET
    checkins = checkins + 1,
    participants = participants + CASE
      WHEN EXISTS (
        SELECT 1 FROM stamps WHERE booking_id = NEW.booking_id AND code != NEW.code
      ) THEN 0
      ELSE 1
    END,
    feedback_checkins = feedback_checkins + CASE
      WHEN (SELECT kind FROM activities WHERE code = NEW.code) = 'feedback'
        AND NOT EXISTS (
          SELECT 1
          FROM stamps s
          JOIN activities a ON a.code = s.code
          WHERE s.booking_id = NEW.booking_id
            AND a.kind = 'feedback'
            AND s.code != NEW.code
        )
      THEN 1
      ELSE 0
    END
  WHERE id = 1;
END;

CREATE TRIGGER IF NOT EXISTS trg_stamps_after_delete
AFTER DELETE ON stamps
BEGIN
  UPDATE activity_stats
  SET
    checkins = (SELECT count(*) FROM stamps WHERE code = OLD.code),
    latest_checkin = (SELECT max(checked_in_at) FROM stamps WHERE code = OLD.code)
  WHERE code = OLD.code;

  UPDATE passport_totals
  SET
    checkins = MAX(0, checkins - 1),
    participants = MAX(
      0,
      participants - CASE
        WHEN EXISTS (SELECT 1 FROM stamps WHERE booking_id = OLD.booking_id) THEN 0
        ELSE 1
      END
    ),
    feedback_checkins = MAX(
      0,
      feedback_checkins - CASE
        WHEN (SELECT kind FROM activities WHERE code = OLD.code) = 'feedback'
          AND NOT EXISTS (
            SELECT 1
            FROM stamps s
            JOIN activities a ON a.code = s.code
            WHERE s.booking_id = OLD.booking_id
              AND a.kind = 'feedback'
          )
        THEN 1
        ELSE 0
      END
    )
  WHERE id = 1;
END;

CREATE TRIGGER IF NOT EXISTS trg_desk_after_insert
AFTER INSERT ON desk
BEGIN
  UPDATE passport_totals
  SET
    arrivals = arrivals + 1,
    swag_handovers = swag_handovers + CASE WHEN NEW.swag_at IS NOT NULL THEN 1 ELSE 0 END
  WHERE id = 1;
END;

CREATE TRIGGER IF NOT EXISTS trg_desk_after_swag
AFTER UPDATE OF swag_at ON desk
WHEN OLD.swag_at IS NULL AND NEW.swag_at IS NOT NULL
BEGIN
  UPDATE passport_totals
  SET swag_handovers = swag_handovers + 1
  WHERE id = 1;
END;

CREATE TRIGGER IF NOT EXISTS trg_desk_after_delete
AFTER DELETE ON desk
BEGIN
  UPDATE passport_totals
  SET
    arrivals = MAX(0, arrivals - 1),
    swag_handovers = MAX(0, swag_handovers - CASE WHEN OLD.swag_at IS NOT NULL THEN 1 ELSE 0 END)
  WHERE id = 1;
END;
