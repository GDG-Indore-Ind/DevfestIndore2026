import { z } from "zod";
import { dateOnly, dimension, httpsUrl, id, localImagePath, text } from "./common.ts";

// Browser-safe photo and press projection contracts.
export const GalleryPhoto = z.strictObject({
  id,
  title: text,
  category: z.enum([
    "Space",
    "AI & Robotics",
    "Keynotes",
    "Showcase",
    "Community",
    "Pre-DevFest Workshops",
  ]),
  eventId: id
    .optional()
    .describe("The event the photograph was taken at. Leave out when it is not known."),
  imageUrl: z.string().regex(/^(https:\/\/|\/[^/])/),
  caption: text,
  source: httpsUrl.optional(),
  width: dimension.optional(),
  height: dimension.optional(),
  showInGallery: z.boolean(),
});

export const PressClipping = z.strictObject({
  id,
  title: text.describe("English summary of the headline."),
  eventId: id.describe("The event the coverage is about."),
  publication: text.optional(),
  date: dateOnly.optional(),
  imageUrl: localImagePath,
  width: dimension,
  height: dimension,
});

export const GalleryFile = z.strictObject({
  $schema: z.string().optional(),
  photos: z.array(GalleryPhoto),
  press: z.array(PressClipping).optional(),
});

export type GalleryPhoto = z.infer<typeof GalleryPhoto>;
export type PressClipping = z.infer<typeof PressClipping>;
