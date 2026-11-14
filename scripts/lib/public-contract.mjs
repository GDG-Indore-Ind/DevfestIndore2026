import { z } from "zod";
import { EventFile } from "../../src/content/schema/public/event.ts";
import { PeopleFile } from "../../src/content/schema/public/people.ts";
import { ProgrammeFile } from "../../src/content/schema/public/programme.ts";
import { OrganizationsFile } from "../../src/content/schema/public/organizations.ts";
import { GalleryFile } from "../../src/content/schema/public/gallery.ts";
import { PagesFile } from "../../src/content/schema/public/pages.ts";

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
    description: `Public ${name} projection contract; generated from Zod.`,
  };
}
