import { z } from "zod";
import { isDate, isUri } from "./common.ts";

// Zod contract for the canonical content/schemas/programme.schema.json model.
export const ProgrammeFile = z
  .strictObject({
    $schema: z.string(),
    entries: z.array(
      z.union([
        z.strictObject({
          id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
          eventId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
          publication: z.enum(["confirmed", "archived"]),
          title: z.string().min(1),
          role: z.string(),
          company: z.string(),
          description: z.string(),
          spotlightBadge: z.string(),
          category: z.enum([
            "GenAI",
            "Cloud",
            "Mobile & Flutter",
            "Web",
            "Leadership & Ecosystem",
            "Space Technology",
            "Physical AI & Robotics",
            "Data & Systems",
          ]),
          track: z.string().optional(),
          level: z.string().optional(),
          profile: z
            .strictObject({
              avatar: z
                .string()
                .regex(/^(https:\/\/|\/[^\/])/)
                .optional(),
              bio: z.string().optional(),
              socials: z
                .strictObject({
                  linkedin: z.string().optional(),
                  twitter: z.string().optional(),
                  github: z.string().optional(),
                  instagram: z.string().optional(),
                  email: z.string().optional(),
                  website: z.string().optional(),
                  blog: z.string().optional(),
                })
                .optional(),
            })
            .optional(),
          time: z.string().optional(),
          hall: z.string().optional(),
          tags: z.array(z.string().min(1)).optional(),
          speakerIds: z
            .array(z.string().regex(/^[a-z0-9][a-z0-9-]*$/))
            .min(1)
            .refine((items) => new Set(items).size === items.length, "Must contain unique values")
            .meta({ uniqueItems: true }),
          resources: z
            .array(
              z.strictObject({
                label: z.string().min(1),
                url: z
                  .string()
                  .refine(isUri, "Invalid URI")
                  .meta({ format: "uri" })
                  .regex(/^https:\/\//),
              }),
            )
            .optional(),
          speakerProfiles: z
            .array(
              z.strictObject({
                personId: z.string().min(1),
                role: z.string().optional(),
                company: z.string().optional(),
                profile: z
                  .strictObject({
                    avatar: z
                      .string()
                      .regex(/^(https:\/\/|\/[^\/])/)
                      .optional(),
                    bio: z.string().optional(),
                    socials: z
                      .strictObject({
                        linkedin: z.string().optional(),
                        twitter: z.string().optional(),
                        github: z.string().optional(),
                        instagram: z.string().optional(),
                        email: z.string().optional(),
                        website: z.string().optional(),
                        blog: z.string().optional(),
                      })
                      .optional(),
                  })
                  .optional(),
              }),
            )
            .optional(),
          format: z.enum(["talk", "keynote", "panel", "workshop"]).optional(),
          sourceUrl: z
            .string()
            .refine(isUri, "Invalid URI")
            .meta({ format: "uri" })
            .regex(/^https:\/\//)
            .optional(),
          type: z.literal("talk"),
        }),
        z
          .strictObject({
            id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
            campus: z.string().min(1),
            speakerIds: z
              .array(z.string().regex(/^[a-z0-9][a-z0-9-]*$/))
              .min(1)
              .refine((items) => new Set(items).size === items.length, "Must contain unique values")
              .meta({ uniqueItems: true }),
            publication: z.enum(["archived", "confirmed"]),
            title: z.string().min(1).optional(),
            date: z.string().refine(isDate, "Invalid date").meta({ format: "date" }).optional(),
            eventUrl: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\/gdg\.community\.dev\/events\/details\/[^?#]+\/?$/)
              .optional(),
            type: z.literal("campus-workshop"),
            legacyId: z
              .string()
              .regex(/^[a-z0-9][a-z0-9-]*$/)
              .optional(),
            photoIds: z
              .array(z.string().regex(/^[a-z0-9][a-z0-9-]*$/))
              .refine((items) => new Set(items).size === items.length, "Must contain unique values")
              .meta({ uniqueItems: true }),
          })
          .meta({ dependencies: { date: ["eventUrl"] } }),
      ]),
    ),
  })
  .superRefine((file, ctx) => {
    file.entries.forEach((entry, index) => {
      if (entry.type === "campus-workshop" && "date" in entry && !("eventUrl" in entry)) {
        ctx.addIssue({
          code: "custom",
          path: ["entries", index, "eventUrl"],
          message: "eventUrl is required when date is present",
        });
      }
    });
  });

export type ProgrammeFile = z.infer<typeof ProgrammeFile>;
