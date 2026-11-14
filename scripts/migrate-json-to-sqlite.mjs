// One-time importer. Normal builds and development NEVER read the retired JSON sources.
import { readFileSync, existsSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { isDeepStrictEqual } from "node:util";
import { is } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { openDatabase, migrateDatabase, DATABASE_PATH, ROOT } from "./lib/database.ts";
import * as t from "../src/db/schema.ts";
import { projectContent } from "./lib/project-content.mjs";
import { validateContent } from "./lib/content.mjs";

function verifyPublication(source, projected) {
  const normalise = (name, value) => {
    const result = structuredClone(value);
    delete result.$schema;
    if (name === "event")
      for (const event of result.events)
        if (event.status === "current" && event.type === "devfest") event.series ??= "devfest";
    if (name === "event")
      for (const event of result.events)
        if (event.tickets) {
          event.tickets.policies.sort((a, b) => a.id.localeCompare(b.id));
          for (const pass of event.tickets.passes) pass.soldOut = Boolean(pass.soldOut);
        }
    if (name === "programme")
      for (const entry of result.entries) if (entry.type === "talk") entry.format ??= "talk";
    if (name === "organizations")
      for (const org of result.organizations)
        for (const contribution of org.contributions) contribution.visible ??= true;
    if (name === "gallery")
      for (const photo of result.photos)
        photo.eventId ??= source.programme.entries.find((entry) =>
          entry.photoIds?.includes(photo.id),
        )?.id;
    return result;
  };
  for (const name of ["event", "programme", "organizations", "gallery", "pages"]) {
    assert.deepEqual(
      normalise(name, projected[name]),
      normalise(name, source[name]),
      `${name}: source information was not preserved`,
    );
  }
  for (const person of source.people.people) {
    const result = projected.people.people.find((p) => p.id === person.id);
    assert(result, `Missing person/group ${person.id}`);
    for (const [key, value] of Object.entries(person))
      if (key !== "events") assert.deepEqual(result[key], value, `${person.id}.${key}`);
    for (const event of person.events ?? []) {
      const participation = result.events?.find((e) => e.eventId === event.eventId);
      assert(participation, `Missing participation ${event.eventId}/${person.id}`);
      assert.equal(participation.sourceUrl, event.sourceUrl);
      for (const role of event.roles)
        assert(
          participation.roles.some((r) => isDeepStrictEqual(r, role)),
          `Missing role ${event.eventId}/${person.id}/${role.kind}`,
        );
    }
  }
}

export function importJson(sourceDirectory, destination) {
  if (existsSync(destination))
    throw new Error(`Refusing to overwrite ${destination}. Choose a new --output path.`);
  const names = ["event", "people", "programme", "organizations", "gallery", "pages"];
  const source = Object.fromEntries(
    names.map((name) => [
      name,
      JSON.parse(readFileSync(path.join(sourceDirectory, `${name}.json`), "utf8")),
    ]),
  );
  const errors = validateContent(source, { checkAssets: false });
  if (errors.length) throw new Error(errors.join("\n"));
  const temporary = `${destination}.importing`;
  if (existsSync(temporary))
    throw new Error(`Remove the incomplete import ${temporary} before retrying.`);
  migrateDatabase(temporary);
  const { db, sqlite } = openDatabase(temporary, false);
  const insert = (table, value) => db.insert(table).values(value).run();
  const slug = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const report = {
    source: "Canonical content/*.json before SQLite migration",
    records: {},
    transformations: [],
  };
  try {
    db.transaction(() => {
      sqlite.pragma("defer_foreign_keys = ON");
      for (const [i, person] of source.people.people.entries())
        if (person.kind !== "group")
          insert(t.people, {
            id: person.id,
            name: person.name,
            jobTitle: person.title,
            company: person.organization,
            bio: person.bio,
            photoPath: person.photo,
            links: person.links,
            displayOrder: i,
          });
      for (const [i, org] of source.organizations.organizations.entries())
        insert(t.organizations, {
          id: org.id,
          name: org.name,
          logoPath: org.logo,
          description: org.description,
          websiteUrl: org.website,
          socialUrl: org.social,
          logoShape: org.logoShape,
          logoCrop: org.archiveLogoWindow,
          displayOrder: i,
        });
      for (const [i, person] of source.people.people.entries())
        if (person.kind === "group")
          insert(t.organizations, {
            id: person.id,
            name: person.name,
            kind: "collective",
            displayOrder: i,
          });
      for (const [i, event] of source.event.events.entries()) {
        const tickets = event.tickets;
        const policies = tickets
          ? source.pages.guidelines.sections.map((section) => ({
              id: section.id,
              title: section.title,
              policies: section.policyIds.map((id) => tickets.policies.find((p) => p.id === id)),
            }))
          : undefined;
        insert(t.events, {
          id: event.id,
          name: event.name,
          series: event.series ?? (event.type === "devfest" ? "devfest" : undefined),
          attendanceMode: event.type === "online" ? "online" : "in-person",
          startsAt: event.date?.includes("T") ? event.date : undefined,
          startDate: event.date?.includes("T") ? undefined : event.date,
          timezone: event.timezone,
          venue: event.venue,
          organizer: event.organizer,
          tagline: event.tagline,
          subTagline: event.subTagline,
          contactEmail: event.contactEmail,
          summary: event.summary,
          theme: event.theme,
          links: event.links,
          sourceUrl: event.source,
          recordingUrl: event.recordingUrl,
          reportedStats: event.stats,
          coverMediaId: event.cover,
          registrationPolicies: policies,
          registrationChecklist: tickets?.registrationChecklist,
          registrationDeclaration: tickets?.registrationDeclaration,
          bookingEnabled: tickets?.booking.enabled,
          bookingUrl: tickets?.booking.url,
          bookingWidgetUrl: tickets?.booking.widgetUrl,
          displayOrder: i,
        });
      }
      const currentId = source.event.events.find((e) => e.status === "current").id;
      const roomIds = new Map();
      for (const [i, stage] of source.pages.agenda.stages.entries()) {
        const id = `${currentId}-${slug(stage.hall)}`;
        roomIds.set(`${currentId}/${stage.hall}`, id);
        insert(t.rooms, {
          id,
          eventId: currentId,
          name: stage.hall,
          title: stage.title,
          description: stage.lead,
          numbered: stage.numbered,
          displayOrder: i,
        });
      }
      let roleOrder = 0;
      const participationKeys = new Set();
      for (const person of source.people.people)
        for (const entry of person.events ?? []) {
          const event = source.event.events.find((e) => e.id === entry.eventId);
          const assigned = source.programme.entries.some(
            (s) => s.eventId === entry.eventId && s.speakerIds?.includes(person.id),
          );
          const officialOrder = event.officialSpeakerIds?.indexOf(person.id);
          const roles = entry.roles.filter(
            (role) =>
              !(
                role.kind === "speaker" &&
                Object.keys(role).length === 1 &&
                (assigned || officialOrder >= 0)
              ),
          );
          participationKeys.add(`${entry.eventId}/${person.id}`);
          // A presenter assignment alone needs no participation row.
          if (!roles.length && !entry.sourceUrl && !entry.profile && !(officialOrder >= 0)) {
            roleOrder++;
            continue;
          }
          insert(t.eventPeople, {
            eventId: entry.eventId,
            personId: person.id,
            profile: entry.profile,
            sourceUrl: entry.sourceUrl,
            officialSpeakerOrder: officialOrder >= 0 ? officialOrder : undefined,
            displayOrder: roleOrder++,
          });
          for (const role of roles)
            insert(t.eventPersonRoles, {
              eventId: entry.eventId,
              personId: person.id,
              kind: role.kind,
              title: role.title,
              listingOrder: role.order,
              responsibilities: role.responsibilities,
              track: role.track,
              community: role.community,
            });
        }
      for (const event of source.event.events)
        for (const [i, id] of (event.officialSpeakerIds ?? []).entries()) {
          if (!participationKeys.has(`${event.id}/${id}`))
            insert(t.eventPeople, {
              eventId: event.id,
              personId: id,
              officialSpeakerOrder: i,
              displayOrder: roleOrder++,
            });
        }
      for (const [i, entry] of source.programme.entries.entries()) {
        const campus = entry.type === "campus-workshop";
        const eventId = campus ? entry.id : entry.eventId;
        if (campus)
          insert(t.events, {
            id: eventId,
            name: entry.title ? `${entry.title} — ${entry.campus}` : entry.campus,
            kind: "campus-workshop",
            venue: { name: entry.campus },
            startDate: entry.date,
            sourceUrl: entry.eventUrl,
            legacyWorkshopId: entry.legacyId,
            displayOrder: source.event.events.length + i,
          });
        let roomId;
        if (entry.hall) {
          const key = `${eventId}/${entry.hall}`;
          if (!roomIds.has(key)) {
            const id = `${eventId}-${slug(entry.hall)}`;
            insert(t.rooms, {
              id,
              eventId,
              name: entry.hall,
              title: entry.hall,
              displayOrder: roomIds.size,
            });
            roomIds.set(key, id);
          }
          roomId = roomIds.get(key);
        }
        insert(t.sessions, {
          id: entry.id,
          eventId,
          format: entry.format ?? (campus ? "workshop" : "talk"),
          title: entry.title,
          description: entry.description || undefined,
          roomId,
          startTime: entry.time,
          durationMinutes: entry.durationMinutes,
          runningOrder: entry.slot,
          category: entry.category,
          track: entry.track,
          level: entry.level,
          tags: entry.tags,
          resources: entry.resources,
          spotlightBadge: entry.spotlightBadge || undefined,
          sourceUrl: entry.sourceUrl,
          displayOrder: i,
          promotion: source.pages.home.exhibits.confirmed.find(
            (item) =>
              ({
                "qualcomm-arduino": "devfest-2026-qualcomm-arduino-demos",
                "space-club": "devfest-2026-space-club-exhibit",
              })[item.id] === entry.id,
          ),
        });
        for (const [n, id] of (entry.speakerIds ?? []).entries()) {
          const person = source.people.people.find((p) => p.id === id);
          if (person.kind === "group") {
            insert(t.sessionOrganizations, {
              sessionId: entry.id,
              organizationId: id,
              displayOrder: n,
            });
            continue;
          }
          const profile = {};
          if (n === 0 && entry.type === "talk") {
            // Preserve historical assertions even when they match today's identity.
            const historical = entry.eventId !== currentId;
            if (historical || entry.role !== (person.title ?? "")) profile.role = entry.role;
            if (historical || entry.company !== (person.organization ?? ""))
              profile.company = entry.company;
            Object.assign(profile, entry.profile);
          }
          const override = entry.speakerProfiles?.find((p) => p.personId === id);
          if (override)
            Object.assign(profile, override.profile, {
              role: override.role,
              company: override.company,
            });
          insert(t.sessionPeople, {
            sessionId: entry.id,
            personId: id,
            profile: Object.keys(profile).length ? profile : undefined,
            displayOrder: n,
          });
        }
        for (const [n, id] of (entry.organizationIds ?? []).entries())
          insert(t.sessionOrganizations, {
            sessionId: entry.id,
            organizationId: id,
            displayOrder: n,
          });
      }
      for (const [i, org] of source.organizations.organizations.entries())
        for (const [n, c] of org.contributions.entries())
          insert(t.partnerships, {
            id: c.id,
            organizationId: org.id,
            eventId: c.eventId,
            scope: c.eventId ? "event" : c.scope,
            contributionType: c.type,
            title: c.title,
            isPublished: c.visible !== false,
            featured: c.featured,
            sourceUrl: c.source,
            displayOrder: c.order,
            recordOrder: i * 100 + n,
          });
      for (const event of source.event.events.filter((e) => e.tickets)) {
        const inclusionIds = new Map();
        for (const [i, pass] of event.tickets.passes.entries()) {
          const fingerprint = JSON.stringify(pass.benefits);
          if (!inclusionIds.has(fingerprint)) {
            const code = inclusionIds.size === 0 ? "standard" : pass.id;
            const id = `${event.id}-${code}`;
            insert(t.passInclusionSets, {
              id,
              eventId: event.id,
              name: code === "standard" ? "Standard inclusions" : `${pass.name} inclusions`,
              benefits: pass.benefits,
            });
            inclusionIds.set(fingerprint, id);
          }
          insert(t.passes, {
            eventId: event.id,
            code: pass.id,
            name: pass.name,
            audience: pass.audience,
            summary: pass.summary,
            description: pass.description,
            priceMinor: pass.price === undefined ? undefined : Math.round(pass.price * 100),
            allocation: pass.allocation,
            eligibility: pass.eligibility,
            inclusionSetId: inclusionIds.get(fingerprint),
            offers: pass.offers,
            bookingRoute: pass.bookingRoute,
            note: pass.note,
            isPublished: pass.visible,
            isSoldOut: pass.soldOut ?? false,
            displayOrder: i,
          });
        }
      }
      for (const [i, photo] of source.gallery.photos.entries())
        insert(t.media, {
          id: photo.id,
          kind: "photo",
          eventId: photo.eventId,
          sessionId: source.programme.entries.find((s) => s.photoIds?.includes(photo.id))?.id,
          title: photo.title,
          path: photo.imageUrl,
          caption: photo.caption,
          category: photo.category,
          width: photo.width,
          height: photo.height,
          sourceUrl: photo.source,
          showInGallery: photo.showInGallery,
          displayOrder: i,
        });
      for (const [i, photo] of (source.gallery.press ?? []).entries())
        insert(t.media, {
          id: photo.id,
          kind: "press",
          eventId: photo.eventId,
          title: photo.title,
          path: photo.imageUrl,
          width: photo.width,
          height: photo.height,
          publication: photo.publication,
          publishedDate: photo.date,
          displayOrder: i,
        });
    });
    const projected = projectContent(db);
    const projectedErrors = validateContent(projected, { checkAssets: false });
    if (projectedErrors.length) throw new Error(projectedErrors.join("\n"));
    verifyPublication(source, projected);
    for (const [name, table] of Object.entries(t)) {
      if (is(table, SQLiteTable)) report.records[name] = db.select().from(table).all().length;
    }
    report.transformations = [
      "73 person identities and one collective; the collective is now an organization.",
      "13 campus workshops are independent events with sessions; no parent affiliation was invented.",
      "Speaker participation is derived from presenter assignments; announcement metadata is preserved.",
      "Each authored role is one row; a presenter with no other role has no participation row.",
      "Historical/session-specific profiles are preserved on presenter assignments.",
      "Identical pass inclusions share one set; every original entitlement is preserved.",
      "Registration sections own policy wording; editorial copy and switches live in TypeScript.",
      "Exhibit homepage highlights belong to their sessions, so removing an exhibit removes its highlight.",
    ];
    report.verification = {
      sourceDatasets: ["event", "people", "programme", "organizations", "gallery", "pages"],
      method:
        "Full publication comparison, including every authored identity and role, not just record counts.",
      normalisedDefaults: [
        "Talk format defaults to talk",
        "Omitted sold-out/visibility flags retain their defaults",
        "Policy order follows registration document sections",
      ],
      passed: true,
    };
    if (sqlite.pragma("foreign_key_check").length)
      throw new Error("Import contains foreign key violations.");
    sqlite.close();
    renameSync(temporary, destination);
    return report;
  } catch (error) {
    if (sqlite.open) sqlite.close();
    rmSync(temporary, { force: true });
    throw error;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const sourceIndex = process.argv.indexOf("--source");
  if (sourceIndex < 0 || !process.argv[sourceIndex + 1])
    throw new Error(
      "Usage: node scripts/migrate-json-to-sqlite.mjs --source <original-json-directory> [--output <new-database>]",
    );
  const outputIndex = process.argv.indexOf("--output");
  const report = importJson(
    path.resolve(process.argv[sourceIndex + 1]),
    outputIndex < 0 ? DATABASE_PATH : path.resolve(process.argv[outputIndex + 1]),
  );
  writeFileSync(
    path.join(ROOT, "content/migration-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(JSON.stringify(report.records, null, 2));
}
