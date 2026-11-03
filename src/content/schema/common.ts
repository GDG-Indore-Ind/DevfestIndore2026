// Building blocks shared by every content schema. Field names follow schema.org
// where a property exists; see docs/content-model.md.
import { z } from "zod";

export const Id = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase kebab-case, e.g. kartikey-rawat")
  .describe("Stable lowercase kebab-case identifier. Never rename it once published.");

export const Text = z.string().trim().min(1);

/** Plain text that may hold several paragraphs separated by a blank line. */
export const LongText = z.string().describe("Plain text; separate paragraphs with a blank line.");

export const WebUrl = z.httpUrl();

export const HttpsUrl = z.url({ protocol: /^https$/ });

/** A file under public/, written as a site-relative path. */
export const ImagePath = z
  .string()
  .regex(
    /^\/(?!\/)\S+\.(?:avif|gif|jpe?g|png|svg|webp)$/i,
    "Use a path under public/, e.g. /images/people/jane-doe.webp",
  )
  .describe("Site-relative path to an image in public/.");

/** Internal page link, e.g. /venue or /events#workshops. */
export const SitePath = z.string().regex(/^\/(?!\/)\S*$/, "Use a site-relative path, e.g. /venue");

export const IsoDate = z.iso.date();

/** A calendar date, or a date and time with its UTC offset. */
export const DateOrDateTime = z.union([
  z.iso.date(),
  z.iso.datetime({ offset: true, local: false }),
]);

export const Order = z
  .int()
  .min(0)
  .describe("Position among siblings, lowest first. Unordered items follow in file order.");

export const Dimensions = {
  width: z.int().positive(),
  height: z.int().positive(),
};

/** Every content file is an object so it can name its JSON Schema for editor autocomplete. */
export const SchemaRef = z.string().describe("Path to this file's JSON Schema.").optional();
