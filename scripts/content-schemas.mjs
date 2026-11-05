// Generate editor schemas for the six canonical content files from Zod.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { z } from "zod";
import { EventFile } from "../src/content/schema/current/event.ts";
import { PeopleFile } from "../src/content/schema/current/people.ts";
import { ProgrammeFile } from "../src/content/schema/current/programme.ts";
import { OrganizationsFile } from "../src/content/schema/current/organizations.ts";
import { GalleryFile } from "../src/content/schema/current/gallery.ts";
import { PagesFile } from "../src/content/schema/current/pages.ts";

export const FILE_SCHEMAS = {
  event: EventFile,
  people: PeopleFile,
  programme: ProgrammeFile,
  organizations: OrganizationsFile,
  gallery: GalleryFile,
  pages: PagesFile,
};

export function jsonSchema(name, schema) {
  return {
    ...z.toJSONSchema(schema, { target: "draft-7", io: "input" }),
    title: `DevFest ${name}`,
    description: `Generated from the Zod schema for content/${name}.json; do not edit.`,
  };
}

if (import.meta.main) {
  const mode = process.argv[2];
  if (mode !== "--write" && mode !== "--check") {
    console.error("Usage: node scripts/content-schemas.mjs --write | --check");
    process.exitCode = 1;
  } else {
    const dir = fileURLToPath(new URL("../content/schemas/", import.meta.url));
    const changed = [];
    for (const [name, schema] of Object.entries(FILE_SCHEMAS)) {
      const file = path.join(dir, `${name}.schema.json`);
      const expected = `${JSON.stringify(jsonSchema(name, schema), null, 2)}\n`;
      if (mode === "--write") writeFileSync(file, expected);
      else if (readFileSync(file, "utf8") !== expected) changed.push(name);
    }
    if (changed.length) {
      console.error(`Generated schemas are out of date: ${changed.join(", ")}. Run npm run content:schemas.`);
      process.exitCode = 1;
    } else console.log(mode === "--write" ? "Generated six content schemas." : "Content schemas are up to date.");
  }
}
