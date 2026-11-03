// content/photos.json and press.json: shared across editions, tied to one with `about`.
import { z } from "zod";
import { Dimensions, Id, ImagePath, IsoDate, SchemaRef, Text, WebUrl } from "./common.ts";

export const PhotoTopic = z.enum([
  "community",
  "keynote",
  "showcase",
  "space",
  "ai-robotics",
  "workshop",
]);

/** schema.org/ImageObject */
export const Photo = z.strictObject({
  id: Id,
  name: Text,
  caption: Text,
  contentUrl: ImagePath,
  ...Dimensions,
  about: Id.optional().describe("Event or sub-event id the photo shows."),
  keywords: z.array(PhotoTopic).optional(),
  featured: z.boolean().optional().describe("Shows the photo in the home page gallery."),
  isBasedOn: WebUrl.optional().describe("Page the photo was taken from."),
  creditText: Text.optional(),
});
export type Photo = z.infer<typeof Photo>;

/** schema.org/NewsArticle for a scanned newspaper clipping. */
export const PressArticle = z.strictObject({
  id: Id.describe("<event>-<publication>-<short-headline>, matching the image file name."),
  headline: Text.describe("English summary of the printed headline."),
  publisher: Text.optional().describe("Newspaper name, when the clipping shows it."),
  datePublished: IsoDate.optional().describe("When the clipping shows it."),
  inLanguage: z
    .string()
    .regex(/^[a-z]{2}(?:-[A-Z]{2})?$/, "Use a language code, e.g. hi")
    .optional(),
  about: Id.describe("Event id the article covers."),
  image: z.strictObject({ contentUrl: ImagePath, ...Dimensions }),
  url: WebUrl.optional().describe("Online version of the article."),
});
export type PressArticle = z.infer<typeof PressArticle>;

export const PhotosFile = z.strictObject({
  $schema: SchemaRef,
  photos: z.array(Photo),
});

export const PressFile = z.strictObject({
  $schema: SchemaRef,
  articles: z.array(PressArticle),
});
