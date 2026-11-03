// Write the JSON Schemas that editors use for autocomplete, generated from the Zod
// schemas in src/content/schema/. Usage: node scripts/content-schemas.mjs [output folder]
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { Event } from "../src/content/schema/event.ts";
import { FaqFile, ThemesFile } from "../src/content/schema/guide.ts";
import { PhotosFile, PressFile } from "../src/content/schema/media.ts";
import { OrganizationsFile } from "../src/content/schema/organizations.ts";
import { AmbassadorsFile, TeamFile } from "../src/content/schema/participants.ts";
import { PartnersFile } from "../src/content/schema/partners.ts";
import { PeopleFile } from "../src/content/schema/people.ts";
import { SessionsFile, WorkshopsFile } from "../src/content/schema/programme.ts";
import { Site } from "../src/content/schema/site.ts";
import { TicketsFile } from "../src/content/schema/tickets.ts";

/** File name in content/schemas/ → the schema for the content file that names it. */
export const FILE_SCHEMAS = {
  "site.schema.json": [Site, "DevFest site", "content/site.json"],
  "people.schema.json": [PeopleFile, "DevFest people", "content/people.json"],
  "organizations.schema.json": [OrganizationsFile, "DevFest organizations", "content/organizations.json"],
  "photos.schema.json": [PhotosFile, "DevFest photos", "content/photos.json"],
  "press.schema.json": [PressFile, "DevFest press clippings", "content/press.json"],
  "event.schema.json": [Event, "DevFest event", "content/events/<id>/event.json"],
  "sessions.schema.json": [SessionsFile, "DevFest sessions", "content/events/<id>/sessions.json"],
  "workshops.schema.json": [WorkshopsFile, "DevFest campus workshops", "content/events/<id>/workshops.json"],
  "team.schema.json": [TeamFile, "DevFest team", "content/events/<id>/team.json"],
  "ambassadors.schema.json": [AmbassadorsFile, "DevFest ambassadors", "content/events/<id>/ambassadors.json"],
  "partners.schema.json": [PartnersFile, "DevFest partners", "content/events/<id>/partners.json"],
  "tickets.schema.json": [TicketsFile, "DevFest tickets", "content/events/<id>/tickets.json"],
  "faq.schema.json": [FaqFile, "DevFest FAQ", "content/events/<id>/faq.json"],
  "themes.schema.json": [ThemesFile, "DevFest themes", "content/events/<id>/themes.json"],
};

export function jsonSchema(schema, title, file) {
  return {
    ...z.toJSONSchema(schema, { io: "input" }),
    title,
    description: `Schema for ${file}. Generated from src/content/schema/ by scripts/content-schemas.mjs; do not edit.`,
  };
}

if (import.meta.main) {
  const output = path.resolve(process.argv[2] ?? fileURLToPath(new URL("../content/schemas", import.meta.url)));
  mkdirSync(output, { recursive: true });
  for (const [name, [schema, title, file]] of Object.entries(FILE_SCHEMAS)) {
    writeFileSync(path.join(output, name), `${JSON.stringify(jsonSchema(schema, title, file), null, 2)}\n`);
  }
  console.log(`Wrote ${Object.keys(FILE_SCHEMAS).length} JSON Schemas to ${path.relative(process.cwd(), output) || "."}`);
}
