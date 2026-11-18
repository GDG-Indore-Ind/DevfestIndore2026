import { asc } from "drizzle-orm";
import * as tables from "../../src/db/schema.ts";
import { SITE } from "../../src/content/site.ts";
import { PAGE_COPY, TICKET_COPY, BENEFIT_GROUPS } from "../../src/content/copy.ts";

const defined = (value) =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== null && v !== undefined));
const file = (name, records) => ({ [name]: records });
const groupBy = (rows, key) => Map.groupBy(rows, (item) => item[key]);

/** Build browser-safe publication views. SQLite and its driver never enter the app graph. */
export function projectContent(db) {
  const ordered = (table) => db.select().from(table).orderBy(asc(table.displayOrder)).all();
  const eventRows = ordered(tables.events);
  const personRows = ordered(tables.people);
  const organizationRows = ordered(tables.organizations);
  const sessionRows = ordered(tables.sessions).filter((row) => !SITE.hiddenSessionIds.includes(row.id));
  const sessionById = new Map(sessionRows.map((row) => [row.id, row]));
  const roomRows = ordered(tables.rooms);
  const personById = new Map(personRows.map((row) => [row.id, row]));
  const eventById = new Map(eventRows.map((row) => [row.id, row]));
  for (const event of eventRows)
    if (event.startsAt && event.startDate)
      throw new Error(
        `Event ${event.id}: use starts_at for a timestamp or start_date for date-only evidence, not both.`,
      );
  const roomById = new Map(roomRows.map((row) => [row.id, row]));
  const peopleBySession = groupBy(ordered(tables.sessionPeople), "sessionId");
  const orgsBySession = groupBy(ordered(tables.sessionOrganizations), "sessionId");
  const participationRows = ordered(tables.eventPeople);
  const contributions = db
    .select()
    .from(tables.partnerships)
    .orderBy(asc(tables.partnerships.recordOrder))
    .all();
  const mediaRows = ordered(tables.media);
  const mediaEventId = (row) => {
    const sessionEventId = sessionById.get(row.sessionId)?.eventId;
    if (row.eventId && sessionEventId && row.eventId !== sessionEventId)
      throw new Error(`Media ${row.id}: event_id conflicts with its session's event.`);
    return row.eventId ?? sessionEventId;
  };
  const mediaBySession = groupBy(
    mediaRows.filter((row) => row.sessionId),
    "sessionId",
  );
  const bundles = new Map(
    db
      .select()
      .from(tables.passInclusionSets)
      .all()
      .map((row) => [row.id, row.benefits]),
  );
  const passesByEvent = groupBy(ordered(tables.passes), "eventId");
  const current = eventById.get(SITE.eventId);
  if (!current || current.kind !== "conference")
    throw new Error(`Featured event ${SITE.eventId} is missing.`);

  // Roles are rows; the public contract lists them per person and event in one fixed kind order.
  const roleRows = db.select().from(tables.eventPersonRoles).all();
  const rolesOf = (eventId, personId) =>
    tables.ROLE_KINDS.flatMap((kind) =>
      roleRows
        .filter((row) => row.eventId === eventId && row.personId === personId && row.kind === kind)
        .map((row) =>
          defined({
            kind,
            title: row.title,
            order: row.listingOrder,
            responsibilities: row.responsibilities,
            track: row.track,
            community: row.community,
          }),
        ),
    );
  const roles = participationRows.map((row) => ({
    ...row,
    roles: rolesOf(row.eventId, row.personId),
  }));
  function speaker(eventId, personId) {
    let entry = roles.find((row) => row.eventId === eventId && row.personId === personId);
    if (!entry) {
      entry = { eventId, personId, roles: [] };
      roles.push(entry);
    }
    if (!entry.roles.some((role) => role.kind === "speaker")) entry.roles.push({ kind: "speaker" });
  }
  // Presenter assignment is sufficient. A separately authored speaker role is optional.
  for (const session of sessionRows)
    for (const row of peopleBySession.get(session.id) ?? []) speaker(session.eventId, row.personId);
  for (const row of participationRows)
    if (row.officialSpeakerOrder !== null) speaker(row.eventId, row.personId);
  // Chronological, so a person's history does not depend on which rows happen to be authored.
  const eventStart = (id) => eventById.get(id).startsAt ?? eventById.get(id).startDate;
  roles.sort(
    (a, b) =>
      eventStart(a.eventId).localeCompare(eventStart(b.eventId)) ||
      eventById.get(a.eventId).displayOrder - eventById.get(b.eventId).displayOrder,
  );
  const participationsByPerson = groupBy(roles, "personId");
  const personRecords = personRows.map((row) =>
    defined({
      id: row.id,
      name: row.name,
      kind: "person",
      title: row.jobTitle,
      organization: row.company,
      bio: row.bio,
      photo: row.photoPath,
      links: row.links,
      events: participationsByPerson
        .get(row.id)
        ?.filter((entry) => entry.roles.length)
        .map((entry) =>
          defined({
            eventId: entry.eventId,
            sourceUrl: entry.sourceUrl,
            roles: entry.roles,
            profile: entry.profile,
          }),
        ),
    }),
  );
  const workshopOrganizationIds = new Set(
    sessionRows
      .filter((row) => eventById.get(row.eventId)?.kind === "campus-workshop")
      .flatMap((row) => (orgsBySession.get(row.id) ?? []).map((org) => org.organizationId)),
  );
  for (const row of organizationRows.filter(
    (row) => row.kind === "collective" || workshopOrganizationIds.has(row.id),
  ))
    personRecords.push({ id: row.id, name: row.name, kind: "group" });

  const passRecord = (row) =>
    defined({
      id: row.code,
      name: row.name,
      audience: row.audience,
      visible: row.isPublished,
      summary: row.summary,
      allocation: row.allocation,
      price: row.priceMinor === null ? undefined : row.priceMinor / 100,
      offers: row.offers,
      bookingRoute: row.bookingRoute,
      description: row.description,
      eligibility: row.eligibility,
      benefits: bundles.get(row.inclusionSetId),
      note: row.note,
      soldOut: row.isSoldOut || undefined,
    });
  const eventRecord = (row) => {
    const record = defined({
      id: row.id,
      name: row.name,
      date: row.startsAt ?? row.startDate,
      venue: row.venue,
      type:
        row.attendanceMode === "online"
          ? "online"
          : row.series === "devfest"
            ? "devfest"
            : "community",
      status: row.id === SITE.eventId ? "current" : "past",
      summary: row.summary,
      source: row.sourceUrl,
      series: ["devfest", "ccd"].includes(row.series) ? row.series : undefined,
      cover: row.coverMediaId,
      stats: row.reportedStats,
      theme: row.theme,
      recordingUrl: row.recordingUrl,
    });
    if (row.id === SITE.eventId)
      Object.assign(record, {
        organizer: row.organizer,
        timezone: row.timezone,
        tagline: row.tagline,
        subTagline: row.subTagline,
        contactEmail: row.contactEmail,
        links: row.links,
        tickets: {
          booking: {
            enabled: row.bookingEnabled,
            url: row.bookingUrl,
            widgetUrl: row.bookingWidgetUrl,
          },
          passes: (passesByEvent.get(row.id) ?? []).map(passRecord),
          policies: (row.registrationPolicies ?? []).flatMap((section) => section.policies),
          registrationChecklist: row.registrationChecklist,
          registrationDeclaration: row.registrationDeclaration,
          registration: TICKET_COPY,
          benefitGroups: BENEFIT_GROUPS,
        },
      });
    else
      Object.assign(
        record,
        defined({
          officialSpeakerIds: participationRows
            .filter((p) => p.eventId === row.id && p.officialSpeakerOrder !== null)
            .sort((a, b) => a.officialSpeakerOrder - b.officialSpeakerOrder)
            .map((p) => p.personId),
        }),
      );
    return record;
  };

  const entries = sessionRows.map((row) => {
    const event = eventById.get(row.eventId);
    const presenters = peopleBySession.get(row.id) ?? [];
    const groups = orgsBySession.get(row.id) ?? [];
    if (event.kind === "campus-workshop")
      return defined({
        type: "campus-workshop",
        id: event.id,
        campus: event.venue.name,
        speakerIds: [...presenters.map((p) => p.personId), ...groups.map((o) => o.organizationId)],
        publication: "archived",
        title: row.title,
        date: event.startDate,
        eventUrl: event.sourceUrl,
        legacyId: event.legacyWorkshopId,
        photoIds: (mediaBySession.get(row.id) ?? []).map((photo) => photo.id),
      });
    const base = defined({
      id: row.id,
      eventId: row.eventId,
      publication: row.eventId === SITE.eventId ? "confirmed" : "archived",
      title: row.title,
      description: row.description ?? "",
      hall: roomById.get(row.roomId)?.name,
      slot: row.runningOrder,
      time: row.startTime,
      durationMinutes: row.durationMinutes,
      track: row.track,
      category: row.category,
      level: row.level,
      tags: row.tags,
      resources: row.resources,
      sourceUrl: row.sourceUrl,
      spotlightBadge: row.spotlightBadge,
    });
    const presenterProfiles = presenters.flatMap((presenter) => {
      const eventProfile = participationRows.find(
        (item) => item.eventId === row.eventId && item.personId === presenter.personId,
      )?.profile;
      const merged = { ...eventProfile, ...presenter.profile };
      if (!Object.keys(merged).length) return [];
      const { role, company, ...profile } = merged;
      return [
        defined({
          personId: presenter.personId,
          role,
          company,
          profile: Object.keys(profile).length ? profile : undefined,
        }),
      ];
    });
    // These are presentation adapters, not two domain entities. Topic labels are unrelated.
    const speakerLed =
      groups.length === 0 &&
      (["talk", "keynote"].includes(row.format) ||
        (presenters.length > 0 && ["panel", "workshop"].includes(row.format)));
    if (speakerLed) {
      const first = presenters[0];
      const identity = personById.get(first?.personId);
      const eventProfile = participationRows.find(
        (p) => p.eventId === row.eventId && p.personId === first?.personId,
      )?.profile;
      const profile = { ...eventProfile, ...first?.profile };
      const overrides = defined({
        avatar: profile.avatar,
        bio: profile.bio,
        socials: profile.socials,
      });
      const coProfiles = presenterProfiles.filter(
        (profile) => profile.personId !== first?.personId,
      );
      return defined({
        ...base,
        type: "talk",
        speakerIds: presenters.map((p) => p.personId),
        role: profile.role ?? identity?.jobTitle ?? "",
        company: profile.company ?? identity?.company ?? "",
        spotlightBadge: row.spotlightBadge ?? "",
        format: row.format === "talk" ? undefined : row.format,
        profile: Object.keys(overrides).length ? overrides : undefined,
        speakerProfiles: coProfiles.length ? coProfiles : undefined,
      });
    }
    return defined({
      ...base,
      type: "activity",
      format: row.format,
      organizationIds: groups.length ? groups.map((p) => p.organizationId) : undefined,
      speakerIds: presenters.length ? presenters.map((p) => p.personId) : undefined,
      speakerProfiles: presenterProfiles.length ? presenterProfiles : undefined,
    });
  });

  const pages = structuredClone(PAGE_COPY);
  pages.guidelines.sections = (current.registrationPolicies ?? []).map(
    ({ policies, ...section }) => ({ ...section, policyIds: policies.map((p) => p.id) }),
  );
  pages.agenda.stages = roomRows
    .filter((row) => row.eventId === SITE.eventId)
    .map((row) =>
      defined({ hall: row.name, title: row.title, lead: row.description, numbered: row.numbered }),
    );
  pages.partners.revealed = SITE.partnersRevealed;
  pages.tickets.ambassadorContactEnabled = SITE.ambassadorContactEnabled;
  pages.home.exhibits.confirmed = sessionRows
    .filter((row) => row.eventId === SITE.eventId && row.format === "exhibit" && row.promotion)
    .map((row) => row.promotion);

  return {
    event: file("events", eventRows.filter((row) => row.kind === "conference").map(eventRecord)),
    people: file("people", personRecords),
    programme: file("entries", entries),
    organizations: {
      archiveLogoSheet: SITE.archiveLogoSheet,
      organizations: organizationRows
        .filter((row) => row.kind !== "collective")
        .map((row) =>
          defined({
            id: row.id,
            name: row.name,
            description: row.description,
            logo: row.logoPath,
            logoShape: row.logoShape,
            archiveLogoWindow: row.logoCrop,
            website: row.websiteUrl,
            social: row.socialUrl,
            contributions: contributions
              .filter((c) => c.organizationId === row.id)
              .map((c) =>
                defined({
                  id: c.id,
                  eventId: c.eventId,
                  scope: c.scope === "event" ? undefined : c.scope,
                  type: c.contributionType,
                  title: c.title,
                  status:
                    c.scope === "ecosystem"
                      ? "ecosystem"
                      : c.scope === "historical" || c.eventId !== SITE.eventId
                        ? "archived"
                        : "confirmed",
                  visible: c.isPublished ? undefined : false,
                  order: c.displayOrder,
                  featured: c.featured,
                  source: c.sourceUrl,
                }),
              ),
          }),
        ),
    },
    gallery: {
      photos: mediaRows
        .filter((row) => row.kind === "photo")
        .map((row) =>
          defined({
            id: row.id,
            title: row.title,
            category: row.category,
            eventId: mediaEventId(row),
            imageUrl: row.path,
            caption: row.caption,
            width: row.width,
            height: row.height,
            showInGallery: row.showInGallery,
            source: row.sourceUrl,
          }),
        ),
      press: mediaRows
        .filter((row) => row.kind === "press")
        .map((row) =>
          defined({
            id: row.id,
            title: row.title,
            eventId: mediaEventId(row),
            publication: row.publication,
            imageUrl: row.path,
            width: row.width,
            height: row.height,
            date: row.publishedDate,
          }),
        ),
    },
    pages,
  };
}
