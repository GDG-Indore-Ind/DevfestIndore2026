import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import { profileHash } from "./profile-review.mjs";

export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const COLLECTIONS = ["event", "people", "participations", "sessions", "team", "partners", "events", "workshops", "gallery", "tickets", "themes", "faqs", "ambassadors", "pages", "directory", "approvals"];
export function readContent(root = PROJECT_ROOT) {
  return Object.fromEntries(COLLECTIONS.map(name => [name, JSON.parse(readFileSync(path.join(root, "content", `${name}.json`), "utf8"))]));
}

/** Validate public records without changing files, fetching URLs or executing content. */
export function validateContent(content, { root = PROJECT_ROOT, checkAssets = true } = {}) {
  const errors = [];
  const ajv = new Ajv({ allErrors: true, jsonPointers: true, schemaId: "auto", format: "full" });
  for (const name of COLLECTIONS) {
    const schema = JSON.parse(readFileSync(path.join(root, "content/schemas", `${name}.schema.json`), "utf8"));
    const validate = ajv.compile(schema);
    if (!validate(content[name])) errors.push(...validate.errors.map(error => `${name}.json${error.dataPath || "/"}: ${error.message}${error.params.additionalProperty ? ` (${error.params.additionalProperty})` : ""}`));
  }
  if (errors.length) return errors;
  const { event, people, participations, sessions, team, partners, events, workshops, gallery, tickets, themes, faqs } = content;
  function unique(items, label, key = item => item.id) {
    const seen = new Set();
    for (const item of items) { const value = key(item); if (seen.has(value)) errors.push(`${label}: duplicate ${value}`); seen.add(value); }
  }
  for (const [name, items] of [["people",people.people],["participations",participations.participations],["sessions",sessions.sessions],["team",team.members],["organizations",partners.organizations],["events",events.events],["workshops",workshops.workshops],["gallery",gallery.photos],["passes",tickets.passes],["themes",themes.themes],["FAQs",faqs.questions]]) unique(items,name);
  unique([event, ...events.events], "event registry");
  unique(participations.participations, "person event", item => `${item.eventId}/${item.personId}`);
  const personIds = new Set(people.people.map(person => person.id));
    const eventIds = new Set([event.id, ...events.events.map(item => item.id)]);
  const speakerParticipation = new Set(participations.participations.filter(item => item.roles.some(role => role.kind === "speaker")).map(item => `${item.eventId}/${item.personId}`));
  const relations = partners.organizations.flatMap(organization => organization.partnerships);
  unique(relations, "partnerships");
  const reference = (set, value, where) => { if (!set.has(value)) errors.push(`${where}: unknown reference ${value}`); };
  function publication(item, where) {
    if (item.publication === "ecosystem" && item.editionId !== "ecosystem") errors.push(`${where}: ecosystem publication requires ecosystem scope`);
  }
  for (const item of participations.participations) {
    reference(personIds,item.personId,`participation ${item.id}`); reference(eventIds,item.eventId,`participation ${item.id}`); unique(item.roles, `participation ${item.id} roles`, role => role.kind);
    for (const role of item.roles) unique(role.responsibilities ?? [], `participation ${item.id} responsibilities`, responsibility => responsibility.area.trim().toLowerCase());
  }
  for (const item of sessions.sessions) {
    reference(eventIds,item.editionId,`session ${item.id}`); publication(item,`session ${item.id}`);
    unique(item.speakerProfiles ?? [], `session ${item.id} speaker profiles`, profile => profile.personId);
    for (const profile of item.speakerProfiles ?? []) reference(new Set(item.speakerIds), profile.personId, `session ${item.id} profile`);
    for (const personId of item.speakerIds) {
      reference(personIds,personId,`session ${item.id}`);
      reference(speakerParticipation,`${item.editionId}/${personId}`,`session ${item.id} speaker participation`);
    }
  }
  for (const item of team.members) reference(personIds,item.personId,`team ${item.id}`);
  unique(team.assignments ?? [], "team assignments", item => `${item.eventId}/${item.personId}`);
  for (const item of team.assignments ?? []) { reference(personIds,item.personId,`team assignment ${item.personId}`); reference(eventIds,item.eventId,`team assignment ${item.personId}`); }
  unique(content.ambassadors.directory, "ambassador directory", item => item.personId);
  for (const item of content.ambassadors.directory) {
    reference(personIds, item.personId, "ambassador directory");
    const person = people.people.find(person => person.id === item.personId);
    for (const platform of item.contactPlatforms) {
      if (!person?.socials?.[platform]) errors.push(`ambassador directory ${item.personId}: missing ${platform} profile`);
    }
  }
  const workshopImages = new Map();
  unique(workshops.workshops.filter(item => item.eventUrl), "workshop event links", item => item.eventUrl.replace(/\/$/, ""));
  for (const item of workshops.workshops) {
    if (!item.speakerIds.length) errors.push(`workshop ${item.id}: at least one speaker or group is required`);
    for (const id of item.speakerIds) reference(personIds,id,`workshop ${item.id}`);
    for (const photo of item.photos ?? []) {
      if (workshopImages.has(photo.imageUrl)) errors.push(`workshop ${item.id}: photograph already assigned to ${workshopImages.get(photo.imageUrl)}`);
      workshopImages.set(photo.imageUrl, item.id);
    }
  }
  for (const item of events.events) {
    for (const id of item.officialSpeakerIds) reference(personIds,id,`event ${item.id}`);
  }
  for (const organization of partners.organizations) {
    unique(organization.partnerships, `organization ${organization.id} relationship`, item => item.editionId);
    if (organization.partnerships.some(item => item.contributions.some(contribution => contribution.kind === "community")) && !organization.websiteUrl && !organization.socialUrl) errors.push(`organization ${organization.id}: communities require a public website or social URL`);
    for (const item of organization.partnerships) {
      unique(item.contributions, `partnership ${item.id} contribution`, contribution => contribution.kind);
      reference(new Set([...eventIds,"historical","ecosystem"]),item.editionId,`partnership ${item.id}`);
      if (item.editionId === "ecosystem") {
        if (item.publication !== "ecosystem") errors.push(`partnership ${item.id}: ecosystem is not a confirmed event sponsor`);
      } else publication(item, `partnership ${item.id}`);
      if (item.publication === "confirmed" && (!organization.logoUrl || !organization.websiteUrl)) errors.push(`organization ${organization.id}: confirmed partners require a logo and website`);
      if (item.publication === "ecosystem" && (!organization.logoUrl || (!organization.websiteUrl && !organization.socialUrl))) errors.push(`organization ${organization.id}: ecosystem logos require a logo and community URL`);
      if (item.editionId === "historical" && !organization.archiveLogoWindow) errors.push(`organization ${organization.id}: logo-sheet sponsors require archiveLogoWindow`);
      if (item.contributions.some(contribution => contribution.kind === "community") && item.publication === "archived" && !organization.logoUrl && !organization.archiveLogoWindow) errors.push(`organization ${organization.id}: archived communities require logo artwork`);
      if (item.featured && (item.publication !== "confirmed" || item.editionId !== event.id)) errors.push(`partnership ${item.id}: only confirmed current partners can be featured`);
    }
  }
  unique(relations.filter(item => item.featured), "featured partner placement", item => item.featured);
  unique(people.people, "people names", item => item.name.toLowerCase().replace(/[^a-z0-9]/g,""));
  unique(content.directory.roles, "directory role categories");
  const organizationIds = new Set(partners.organizations.map(item => item.id));
  unique(content.approvals.emailRedactions ?? [], "email redactions", entry => entry.personId);
  for (const entry of content.approvals.emailRedactions ?? []) {
    reference(personIds, entry.personId, "email redaction");
    const baseline = content.approvals.baselines.people.find(item => item.personId === entry.personId);
    if (!baseline || baseline.recordHash !== entry.baselineHash) errors.push(`email redaction ${entry.personId}: original baseline mismatch`);
    if (people.people.find(item => item.id === entry.personId)?.socials?.email) errors.push(`email redaction ${entry.personId}: email must be absent`);
  }
  for (const [kind, key, ids] of [["people", "personId", personIds], ["organizations", "organizationId", organizationIds]]) {
    unique(content.approvals[kind], `${kind} approvals`, entry => entry[key]);
    unique(content.approvals.baselines[kind], `${kind} public baselines`, entry => entry[key]);
    for (const entry of content.approvals.baselines[kind]) reference(ids, entry[key], `${kind} baseline`);
    for (const id of ids) {
      const baseline = content.approvals.baselines[kind].find(entry => entry[key] === id);
      const approved = content.approvals[kind].find(entry => entry[key] === id);
      const hash = profileHash(content, kind, id);
      const redaction = kind === "people" && content.approvals.emailRedactions?.find(entry => entry.personId === id);
      if (baseline?.recordHash !== hash && approved?.recordHash !== hash && redaction?.recordHash !== hash) errors.push(`${kind} ${id}: changed or new profile requires organizer approval`);
    }
    for (const entry of content.approvals[kind]) {
      reference(ids, entry[key], `${kind} approval`);
      if (entry.scope === "ambassador" && (kind !== "people" || !content.ambassadors.directory.some(item => item.personId === entry.personId))) errors.push(`${kind} approval ${entry[key]}: ambassador scope requires directory membership`);
      if (ids.has(entry[key]) && entry.recordHash !== profileHash(content, kind, entry[key])) errors.push(`${kind} approval ${entry[key]}: profile changed; a fresh organizer approval is required`);
    }
    if (content.directory.enabled) for (const id of ids) {
      if (!content.approvals[kind].some(entry => entry[key] === id && entry.scope !== "ambassador")) errors.push(`directory launch: ${kind} ${id} needs organizer approval`);
    }
  }
  if (content.directory.enabled && team.members.length) errors.push("directory launch: assign approved event roles to the undated legacy team before enabling the new directories");
  unique(tickets.benefitGroups, "ticket benefit groups");
  const benefitGroupIds = new Set(tickets.benefitGroups.map(group => group.id));
  for (const pass of tickets.passes) {
    unique(pass.benefits, `pass ${pass.id} benefits`, benefit => benefit.label);
    for (const benefit of pass.benefits) reference(benefitGroupIds, benefit.group, `pass ${pass.id} benefit ${benefit.label}`);
  }
  if (!tickets.policies.length) errors.push("tickets: at least one booking policy is required");
  unique(tickets.policies, "ticket policies");
  const guidelineSections = content.pages.guidelines.sections;
  unique(guidelineSections, "guideline sections");
  const policyIds = new Set(tickets.policies.map(policy => policy.id));
  const displayedPolicyIds = guidelineSections.flatMap(section => section.policyIds);
  unique(displayedPolicyIds, "guideline policy placement", id => id);
  for (const section of guidelineSections) for (const id of section.policyIds) reference(policyIds, id, `guideline section ${section.id}`);
  for (const id of policyIds) if (!displayedPolicyIds.includes(id)) errors.push(`guidelines: missing policy ${id}`);
  for (const id of ["final-sale", "entry-identification", "workshop-access"]) {
    if (!tickets.policies.some(policy => policy.id === id)) errors.push(`tickets: ${id} policy is required`);
  }
  try { new Intl.DateTimeFormat("en",{timeZone:event.timezone}).format(); } catch { errors.push(`event: unknown timezone ${event.timezone}`); }
  const tokens = new Set(["date","venue","address","registrationTime","entryPolicy","workshopPolicy","finalSalePolicy"]);
  for (const faq of faqs.questions) for (const match of faq.answer.matchAll(/\{\{(\w+)\}\}/g)) if (!tokens.has(match[1])) errors.push(`FAQ ${faq.id}: unknown template token ${match[1]}`);
  const assetKeys = new Set(["avatar","logoUrl","imageUrl","photo","archiveLogoSheet","images","source","collegeLogoUrl"]);
  function walk(value, location = "", key = "") {
    if (typeof value === "string" && assetKeys.has(key) && value.startsWith("/")) {
      const publicRoot = path.join(root,"public");
      const resolved = path.resolve(publicRoot, `.${value}`);
      if (!resolved.startsWith(`${publicRoot}${path.sep}`)) errors.push(`${location}: image path escapes public/`);
      else if (checkAssets && !existsSync(resolved)) errors.push(`${location}: missing asset ${value}`);
    } else if (Array.isArray(value)) value.forEach((item,index) => walk(item,`${location}/${index}`,key));
    else if (value && typeof value === "object") {
      for (const [childKey,child] of Object.entries(value)) {
        if (key === "socials" && typeof child === "string" && child && !/^https?:\/\//i.test(child) && !(childKey === "email" && /^mailto:/.test(child))) errors.push(`${location}/${childKey}: social links must use http(s):// (or mailto: for email)`);
        walk(child,`${location}/${childKey}`,childKey);
      }
    }
  }
  walk(content);
  return errors;
}
