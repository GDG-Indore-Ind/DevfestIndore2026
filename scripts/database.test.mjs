import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { eq, and } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { openDatabase, MIGRATIONS_PATH } from "./lib/database.ts";
import { EXPORT_PATH, exportSql, checkDatabase, restoreDatabase } from "./database.mjs";
import { projectContent } from "./lib/project-content.mjs";
import { validateContent } from "./lib/content.mjs";
import * as t from "../src/db/schema.ts";
import { SITE } from "../src/content/site.ts";
import { faqPolicyValues, renderFaqAnswer } from "../src/content/faq-template.ts";

const seed = readFileSync(EXPORT_PATH, "utf8");
function fixture(context) {
  const connection = openDatabase(":memory:", false);
  context.after(() => connection.sqlite.close());
  migrate(connection.db, { migrationsFolder: MIGRATIONS_PATH });
  connection.sqlite.exec(seed);
  return connection;
}

test("reviewable SQL restores every table and the complete public publication", (context) => {
  const { db, sqlite } = fixture(context);
  checkDatabase(sqlite);
  assert.equal(exportSql(sqlite), seed);
  assert.deepEqual(validateContent(projectContent(db)), []);
});

test("session-linked photos inherit their event without another authored event reference", (context) => {
  const { db } = fixture(context);
  const photo = db.select().from(t.media).where(eq(t.media.id, "workshop-acropolis")).get();
  assert.equal(photo.eventId, null);
  const session = db.select().from(t.sessions).where(eq(t.sessions.id, photo.sessionId)).get();
  const published = projectContent(db).gallery.photos.find((item) => item.id === photo.id);
  assert.equal(published.eventId, session.eventId);
});

test("a media record cannot publish conflicting event and session associations", (context) => {
  const { db } = fixture(context);
  db.update(t.media)
    .set({ eventId: SITE.eventId })
    .where(eq(t.media.id, "workshop-acropolis"))
    .run();
  assert.throws(() => projectContent(db), /Media workshop-acropolis: event_id conflicts/);
});

test("featured-event selection does not discard event facts that archive records retain", (context) => {
  const { db } = fixture(context);
  const facts = {
    summary: "An approved event summary",
    sourceUrl: "https://example.org/event",
    theme: "Applied systems",
    reportedStats: { sessions: 10 },
    recordingUrl: "https://example.org/recording",
  };
  db.update(t.events).set(facts).where(eq(t.events.id, SITE.eventId)).run();
  const content = projectContent(db);
  const event = content.event.events.find((item) => item.id === SITE.eventId);
  assert.equal(event.summary, facts.summary);
  assert.equal(event.source, facts.sourceUrl);
  assert.equal(event.theme, facts.theme);
  assert.deepEqual(event.stats, facts.reportedStats);
  assert.equal(event.recordingUrl, facts.recordingUrl);
  assert.equal(event.series, "devfest");
  assert.deepEqual(validateContent(content, { checkAssets: false }), []);
});

test("a presenter needs only one assignment, with no duplicate event speaker role", (context) => {
  const { db, sqlite } = fixture(context);
  const session = db.select().from(t.sessions).where(eq(t.sessions.eventId, SITE.eventId)).all()[0];
  const personId = "karan-mittal";
  db.delete(t.eventPeople)
    .where(and(eq(t.eventPeople.eventId, SITE.eventId), eq(t.eventPeople.personId, personId)))
    .run();
  db.insert(t.sessionPeople).values({ sessionId: session.id, personId, displayOrder: 10 }).run();
  assert.equal(
    db
      .select()
      .from(t.eventPeople)
      .where(eq(t.eventPeople.personId, personId))
      .all()
      .some((p) => p.eventId === SITE.eventId),
    false,
  );
  const content = projectContent(db);
  const person = content.people.people.find((p) => p.id === personId);
  assert(
    person.events.some(
      (e) => e.eventId === SITE.eventId && e.roles.some((r) => r.kind === "speaker"),
    ),
  );
  assert.deepEqual(validateContent(content, { checkAssets: false }), []);
  assert.throws(
    () =>
      sqlite
        .prepare("INSERT INTO session_people (session_id, person_id) VALUES (?, ?)")
        .run(session.id, personId),
    /UNIQUE/,
  );
});

test("a speaker announcement remains publishable before a session exists", (context) => {
  const { db } = fixture(context);
  const personId = "lt-gen-pjs-pannu";
  assert.equal(
    db.select().from(t.sessionPeople).where(eq(t.sessionPeople.personId, personId)).all().length,
    0,
  );
  const person = projectContent(db).people.people.find((p) => p.id === personId);
  assert(
    person.events.some(
      (e) => e.eventId === SITE.eventId && e.roles.some((r) => r.kind === "speaker"),
    ),
  );
});

test("a new talk uses the referenced identity without requiring duplicated profile fields or a category", (context) => {
  const { db } = fixture(context);
  db.insert(t.sessions)
    .values({
      id: "test-new-talk",
      eventId: SITE.eventId,
      format: "talk",
      title: "A new talk",
    })
    .run();
  db.insert(t.sessionPeople).values({ sessionId: "test-new-talk", personId: "karan-mittal" }).run();
  const content = projectContent(db);
  const talk = content.programme.entries.find((s) => s.id === "test-new-talk");
  const person = content.people.people.find((p) => p.id === "karan-mittal");
  assert.equal(talk.type, "talk");
  assert.equal(talk.role, person.title);
  assert.equal(talk.company, person.organization);
  assert.deepEqual(validateContent(content, { checkAssets: false }), []);
});

test("topic changes retain an organization's workshop, presenter profiles and source metadata", (context) => {
  const { db } = fixture(context);
  const id = `${SITE.eventId}-qualcomm-physical-ai-workshop`;
  const resources = [{ label: "Workshop notes", url: "https://example.org/workshop" }];
  db.update(t.sessions)
    .set({
      category: "GenAI",
      tags: ["edge"],
      level: "Intermediate",
      resources,
      sourceUrl: "https://example.org/programme",
    })
    .where(eq(t.sessions.id, id))
    .run();
  db.update(t.sessionPeople)
    .set({ profile: { role: "Workshop facilitator", bio: "Session-specific bio" } })
    .where(eq(t.sessionPeople.sessionId, id))
    .run();
  const content = projectContent(db);
  const session = content.programme.entries.find((item) => item.id === id);
  assert.equal(session.type, "activity");
  assert.deepEqual(session.organizationIds, ["qualcomm"]);
  assert.equal(session.category, "GenAI");
  assert.equal(session.level, "Intermediate");
  assert.deepEqual(session.tags, ["edge"]);
  assert.deepEqual(session.resources, resources);
  assert.equal(session.sourceUrl, "https://example.org/programme");
  assert.equal(session.speakerProfiles[0].role, "Workshop facilitator");
  assert.equal(session.speakerProfiles[0].profile.bio, "Session-specific bio");
  assert.deepEqual(validateContent(content, { checkAssets: false }), []);
});

test("categorizing an exhibit cannot turn it into a speaker talk", (context) => {
  const { db } = fixture(context);
  const id = `${SITE.eventId}-space-club-exhibit`;
  db.update(t.sessions).set({ category: "Space Technology" }).where(eq(t.sessions.id, id)).run();
  const content = projectContent(db);
  const session = content.programme.entries.find((item) => item.id === id);
  assert.equal(session.type, "activity");
  assert.equal(session.format, "exhibit");
  assert.deepEqual(session.organizationIds, ["space-club-of-india"]);
  assert.deepEqual(validateContent(content, { checkAssets: false }), []);
});

test("FAQ policy placeholders follow the canonical registration document", (context) => {
  const { db } = fixture(context);
  const event = db.select().from(t.events).where(eq(t.events.id, SITE.eventId)).get();
  const sections = structuredClone(event.registrationPolicies);
  sections
    .flatMap((section) => section.policies)
    .find((policy) => policy.id === "entry-identification").text = "Updated check-in instructions.";
  db.update(t.events)
    .set({ registrationPolicies: sections })
    .where(eq(t.events.id, SITE.eventId))
    .run();
  const policies = projectContent(db).event.events.find((item) => item.status === "current").tickets
    .policies;
  const values = faqPolicyValues(policies);
  const answer = renderFaqAnswer("{{entryPolicy}} {{workshopPolicy}} {{finalSalePolicy}}", values);
  assert(answer.startsWith("Updated check-in instructions."));
  assert(answer.includes(policies.find((policy) => policy.id === "workshop-access").text));
  assert(answer.includes(policies.find((policy) => policy.id === "final-sale").text));
  assert(!answer.includes("{{"));
  assert.throws(
    () => renderFaqAnswer("{{unknown-policy}}", values),
    /Unknown or unresolved FAQ token/,
  );
  assert.throws(() => faqPolicyValues([]), /FAQ policy entry-identification is missing/);
});

test("exhibit highlights follow sessions and cannot remain after session deletion", (context) => {
  const { db } = fixture(context);
  const id = `${SITE.eventId}-surprise-exhibit`;
  const session = db.select().from(t.sessions).where(eq(t.sessions.id, id)).get();
  assert(
    projectContent(db).pages.home.exhibits.confirmed.some(
      (item) => item.id === session.promotion.id,
    ),
  );
  db.delete(t.sessions).where(eq(t.sessions.id, id)).run();
  assert(
    !projectContent(db).pages.home.exhibits.confirmed.some(
      (item) => item.id === session.promotion.id,
    ),
  );
});

test("foreign keys reject orphan presenters and rooms or inclusion sets from another event", (context) => {
  const { db, sqlite } = fixture(context);
  assert.equal(sqlite.pragma("foreign_keys", { simple: true }), 1);
  const session = db.select().from(t.sessions).where(eq(t.sessions.eventId, SITE.eventId)).all()[0];
  assert.throws(
    () =>
      sqlite
        .prepare("INSERT INTO session_people (session_id, person_id) VALUES (?, ?)")
        .run(session.id, "missing-person"),
    /FOREIGN KEY/,
  );
  assert.throws(
    () =>
      sqlite
        .prepare("DELETE FROM people WHERE id = ?")
        .run(db.select().from(t.sessionPeople).all()[0].personId),
    /FOREIGN KEY/,
  );
  assert.throws(
    () =>
      sqlite
        .prepare("UPDATE sessions SET room_id = ? WHERE event_id = ?")
        .run(`${SITE.eventId}-main-stage`, "ccd-2022"),
    /FOREIGN KEY/,
  );
  assert.throws(
    () =>
      sqlite.prepare("UPDATE passes SET event_id = ? WHERE code = ?").run("ccd-2022", "student"),
    /FOREIGN KEY/,
  );
  assert.throws(
    () => sqlite.prepare("UPDATE partnerships SET event_id = NULL WHERE scope = ?").run("event"),
    /CHECK/,
  );
  assert.throws(
    () => sqlite.prepare("UPDATE passes SET price_minor = -1 WHERE code = ?").run("student"),
    /CHECK/,
  );
});

test("roles are rows whose kind decides which details they carry", (context) => {
  const { db, sqlite } = fixture(context);
  const eventId = SITE.eventId;
  const insert = sqlite.prepare(
    "INSERT INTO event_person_roles (event_id, person_id, kind, responsibilities, track, community, listing_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  const role = db
    .select()
    .from(t.eventPersonRoles)
    .all()
    .find((item) => item.eventId === eventId && item.kind === "core-team");
  const area = JSON.stringify([{ area: "Registration" }]);
  // A role needs its participation row, a known kind and exactly that kind's details.
  assert.throws(
    () => insert.run(eventId, "missing-person", "speaker", null, null, null, null),
    /FOREIGN KEY/,
  );
  assert.throws(() => insert.run(eventId, role.personId, "judge", null, null, null, null), /CHECK/);
  assert.throws(
    () => insert.run(eventId, role.personId, "core-team", area, null, null, null),
    /UNIQUE/,
  );
  assert.throws(
    () => insert.run(eventId, role.personId, "volunteer", null, null, null, null),
    /CHECK/,
  );
  assert.throws(
    () => insert.run(eventId, role.personId, "speaker", area, null, null, null),
    /CHECK/,
  );
  assert.throws(
    () => insert.run(eventId, role.personId, "speaker", null, "student", "A college", null),
    /CHECK/,
  );
  assert.throws(() => insert.run(eventId, role.personId, "speaker", null, null, null, 0), /CHECK/);
  insert.run(eventId, role.personId, "speaker", null, null, null, 2);
  const published = projectContent(db)
    .people.people.find((person) => person.id === role.personId)
    .events.find((entry) => entry.eventId === eventId);
  assert.deepEqual(published.roles.map((item) => item.kind).slice(0, 2), ["speaker", "core-team"]);
  assert.equal(published.roles[0].order, 2);
  // Removing the participation removes its roles, never the person.
  db.delete(t.eventPeople)
    .where(and(eq(t.eventPeople.eventId, eventId), eq(t.eventPeople.personId, role.personId)))
    .run();
  assert.equal(
    db
      .select()
      .from(t.eventPersonRoles)
      .all()
      .some((item) => item.eventId === eventId && item.personId === role.personId),
    false,
  );
  checkDatabase(sqlite);
});

test("unknown text is NULL and dates and times have one format", (context) => {
  const { db, sqlite } = fixture(context);
  const session = db.select().from(t.sessions).where(eq(t.sessions.eventId, SITE.eventId)).all()[0];
  const time = sqlite.prepare("UPDATE sessions SET start_time = ? WHERE id = ?");
  for (const value of ["9:30", "09:30 AM", "24:00", "09:60", ""])
    assert.throws(() => time.run(value, session.id), /CHECK/, value);
  time.run("09:30", session.id);
  time.run("23:59", session.id);
  for (const column of ["title", "description", "category", "track", "level", "spotlight_badge"])
    assert.throws(
      () => sqlite.prepare(`UPDATE sessions SET ${column} = '  ' WHERE id = ?`).run(session.id),
      /CHECK/,
      column,
    );
  const event = sqlite.prepare("UPDATE events SET starts_at = ?, start_date = ? WHERE id = ?");
  assert.throws(() => event.run(null, null, "ccd-2022"), /CHECK/);
  assert.throws(() => event.run("2022-09-10T10:00:00+05:30", "2022-09-10", "ccd-2022"), /CHECK/);
  assert.throws(() => event.run(null, "10 September 2022", "ccd-2022"), /CHECK/);
  assert.throws(() => event.run("2022-09-10", null, "ccd-2022"), /CHECK/);
  assert.throws(() => sqlite.prepare("UPDATE partnerships SET featured = 'gold'").run(), /CHECK/);
  assert.deepEqual(validateContent(projectContent(db), { checkAssets: false }), []);
});

test("deleting a session removes its presenter links without deleting people", (context) => {
  const { db, sqlite } = fixture(context);
  const withMedia = new Set(
    db
      .select()
      .from(t.media)
      .all()
      .map((item) => item.sessionId),
  );
  const assignment = db
    .select()
    .from(t.sessionPeople)
    .all()
    .find((item) => !withMedia.has(item.sessionId));
  const count = db.select().from(t.people).all().length;
  // Use a session without media so media ownership remains protected independently.
  assert.equal(
    db.select().from(t.media).where(eq(t.media.sessionId, assignment.sessionId)).all().length,
    0,
  );
  db.delete(t.sessions).where(eq(t.sessions.id, assignment.sessionId)).run();
  assert.equal(
    db
      .select()
      .from(t.sessionPeople)
      .where(eq(t.sessionPeople.sessionId, assignment.sessionId))
      .all().length,
    0,
  );
  assert.equal(db.select().from(t.people).all().length, count);
  checkDatabase(sqlite);
});

test("historical speaker snapshots survive current profile changes", (context) => {
  const { db } = fixture(context);
  const before = projectContent(db).programme.entries.find(
    (s) => s.eventId === "ccd-2022" && s.type === "talk",
  );
  db.update(t.people)
    .set({ jobTitle: "A later job", company: "A later employer" })
    .where(eq(t.people.id, before.speakerIds[0]))
    .run();
  const after = projectContent(db).programme.entries.find((s) => s.id === before.id);
  assert.equal(after.role, before.role);
  assert.equal(after.company, before.company);
});

test("one shared inclusion edit updates standard passes while preserving restricted passes", (context) => {
  const { db } = fixture(context);
  const before = projectContent(db).event.events.find((e) => e.status === "current").tickets.passes;
  const bundle = db
    .select()
    .from(t.passInclusionSets)
    .where(eq(t.passInclusionSets.id, `${SITE.eventId}-standard`))
    .get();
  db.update(t.passInclusionSets)
    .set({ benefits: [...bundle.benefits, { group: "access", label: "Test shared inclusion" }] })
    .where(eq(t.passInclusionSets.id, bundle.id))
    .run();
  const after = projectContent(db).event.events.find((e) => e.status === "current").tickets.passes;
  for (const code of ["liftoff", "student", "professional", "last-orbit"])
    assert(
      after.find((p) => p.id === code).benefits.some((b) => b.label === "Test shared inclusion"),
    );
  for (const code of ["vip", "observer"])
    assert.deepEqual(
      after.find((p) => p.id === code).benefits,
      before.find((p) => p.id === code).benefits,
    );
});

test("failed content transactions roll back every write", (context) => {
  const { db, sqlite } = fixture(context);
  const count = db.select().from(t.people).all().length;
  assert.throws(
    () =>
      db.transaction(() => {
        db.insert(t.people).values({ id: "transaction-test", name: "Test" }).run();
        sqlite
          .prepare("INSERT INTO session_people (session_id, person_id) VALUES (?, ?)")
          .run("missing-session", "transaction-test");
      }),
    /FOREIGN KEY/,
  );
  assert.equal(db.select().from(t.people).all().length, count);
});

test("restore refuses to overwrite an existing database", (context) => {
  const directory = mkdtempSync(path.join(tmpdir(), "devfest-restore-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const filename = path.join(directory, "restored.sqlite");
  restoreDatabase(filename);
  const { sqlite } = openDatabase(filename);
  try {
    assert.equal(exportSql(sqlite), seed);
  } finally {
    sqlite.close();
  }
  assert.throws(() => restoreDatabase(filename), /Refusing to overwrite/);
});

test("SQLite data code is unreachable from browser content modules", () => {
  for (const name of ["event", "people", "programme", "partners", "gallery", "pages"]) {
    const source = readFileSync(new URL(`../src/content/${name}.ts`, import.meta.url), "utf8");
    assert(
      !/better-sqlite3|drizzle-orm|scripts\/lib\/database|content\/[a-z]+\.json/.test(source),
      name,
    );
  }
});
