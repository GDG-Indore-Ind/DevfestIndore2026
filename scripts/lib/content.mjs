import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const COLLECTIONS = ["event", "people", "speakers", "sessions", "team", "partners", "events", "workshops", "gallery", "tickets", "themes", "faqs", "ambassadors", "pages"];
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
  const { event, people, speakers, sessions, team, partners, events, workshops, gallery, tickets, themes, faqs } = content;
  function unique(items, label, key = item => item.id) {
    const seen = new Set();
    for (const item of items) { const value = key(item); if (seen.has(value)) errors.push(`${label}: duplicate ${value}`); seen.add(value); }
  }
  for (const [name, items] of [["people",people.people],["speakers",speakers.speakers],["sessions",sessions.sessions],["team",team.members],["organizations",partners.organizations],["events",events.events],["workshops",workshops.workshops],["gallery",gallery.photos],["passes",tickets.passes],["themes",themes.themes],["FAQs",faqs.questions]]) unique(items,name);
  unique(speakers.speakers, "speaker edition", item => `${item.editionId}/${item.personId}`);
  const personIds = new Set(people.people.map(person => person.id));
    const eventIds = new Set([event.id, ...events.events.map(item => item.id)]);
  const participation = new Set(speakers.speakers.map(item => `${item.editionId}/${item.personId}`));
  const relations = partners.organizations.flatMap(organization => organization.partnerships);
  unique(relations, "partnerships");
  const reference = (set, value, where) => { if (!set.has(value)) errors.push(`${where}: unknown reference ${value}`); };
  function publication(item, where) {
    const expected = item.editionId === event.id ? "confirmed" : "archived";
    if (item.publication !== expected) errors.push(`${where}: ${item.editionId} requires publication=${expected}`);
  }
  for (const item of speakers.speakers) { reference(personIds,item.personId,`speaker ${item.id}`); reference(eventIds,item.editionId,`speaker ${item.id}`); publication(item,`speaker ${item.id}`); }
  for (const item of sessions.sessions) {
    reference(personIds,item.speakerId,`session ${item.id}`); reference(eventIds,item.editionId,`session ${item.id}`); publication(item,`session ${item.id}`);
    reference(participation,`${item.editionId}/${item.speakerId}`,`session ${item.id} speaker participation`);
  }
  for (const item of team.members) reference(personIds,item.personId,`team ${item.id}`);
  for (const item of workshops.workshops) {
    if (!item.speakerIds.length) errors.push(`workshop ${item.id}: at least one speaker or group is required`);
    for (const id of item.speakerIds) reference(personIds,id,`workshop ${item.id}`);
  }
  for (const item of events.events) {
    for (const id of item.officialSpeakerIds) reference(personIds,id,`event ${item.id}`);
  }
  for (const organization of partners.organizations) {
    unique(organization.partnerships, `organization ${organization.id} relationship`, item => item.editionId);
    for (const item of organization.partnerships) {
      reference(new Set([...eventIds,"historical","ecosystem"]),item.editionId,`partnership ${item.id}`);
      if (item.editionId === "ecosystem") {
        if (item.publication !== "ecosystem") errors.push(`partnership ${item.id}: ecosystem is not a confirmed event sponsor`);
      } else publication(item, `partnership ${item.id}`);
      if (item.publication === "confirmed" && (!organization.logoUrl || !organization.websiteUrl)) errors.push(`organization ${organization.id}: confirmed partners require a logo and website`);
      if (item.publication === "ecosystem" && (!organization.logoUrl || !organization.socialUrl)) errors.push(`organization ${organization.id}: ecosystem logos require a logo and social URL`);
      if (item.editionId === "historical" && !organization.archiveLogoWindow) errors.push(`organization ${organization.id}: logo-sheet sponsors require archiveLogoWindow`);
      if (item.featured && (item.publication !== "confirmed" || item.editionId !== event.id)) errors.push(`partnership ${item.id}: only confirmed current partners can be featured`);
    }
  }
  unique(relations.filter(item => item.featured), "featured partner placement", item => item.featured);
  unique(people.people, "people names", item => item.name.toLowerCase().replace(/[^a-z0-9]/g,""));
  for (const pass of tickets.passes) if (Date.parse(pass.opensAt) >= Date.parse(pass.closesAt)) errors.push(`pass ${pass.id}: closesAt must be after opensAt`);
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
