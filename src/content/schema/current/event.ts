import { z } from "zod";
import { isDate, isDateTime, isEmail, isUri } from "./common.ts";

const emphasisText = z
  .string()
  .min(1)
  .regex(/^(?:[^*]|\*\*[^*]+\*\*)+$/, "Use paired ** markers for emphasis");

// Zod contract for the canonical content/schemas/event.schema.json model.
export const EventFile = z.strictObject({
  $schema: z.string(),
  events: z
    .array(
      z.union([
        z.strictObject({
          id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
          name: z.string().min(1),
          organizer: z.string().min(1),
          timezone: z.string().min(1),
          tagline: z.string().min(1),
          subTagline: z.string().min(1),
          contactEmail: z.string().refine(isEmail, "Invalid email").meta({ format: "email" }),
          venue: z.strictObject({
            name: z.string().min(1),
            fullName: z.string().min(1),
            tag: z.string().min(1),
            address: z.string().min(1),
            streetAddress: z.string().min(1),
            city: z.string().min(1),
            region: z.string().min(1),
            postalCode: z.string().min(1),
            country: z.string().regex(/^[A-Z]{2}$/),
            latitude: z.number().min(-90).max(90),
            longitude: z.number().min(-180).max(180),
            mapUrl: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            photo: z.string().regex(/^(https:\/\/|\/[^\/])/),
          }),
          links: z.strictObject({
            website: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            cfp: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            linkedin: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            instagram: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            chapter: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            youtube: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            github: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            twitter: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            codeOfConduct: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            partnerApplication: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
            exhibitApplication: z
              .string()
              .refine(isUri, "Invalid URI")
              .meta({ format: "uri" })
              .regex(/^https:\/\//),
          }),
          tickets: z.strictObject({
            passes: z.array(
              z.strictObject({
                id: z.enum(["liftoff", "student", "professional", "vip", "last-orbit", "observer"]),
                name: z.string().min(1),
                audience: z.string().min(1),
                visible: z
                  .boolean()
                  .describe(
                    "Show this pass card on the public tickets page. Register links hand off availability to KonfHub.",
                  ),
                summary: z.string().min(1),
                allocation: z
                  .number()
                  .refine(Number.isInteger, "Expected an integer")
                  .meta({ type: "integer" })
                  .min(0),
                price: z
                  .number()
                  .min(0)
                  .optional()
                  .describe(
                    "Approved base price in INR. Omit until confirmed; zero is a real free price.",
                  ),
                offers: z
                  .array(z.string().min(1))
                  .min(1)
                  .optional()
                  .describe(
                    "Short public discount line shown under the price, such as a group discount.",
                  ),
                bookingRoute: z
                  .enum(["konfhub", "ambassador"])
                  .optional()
                  .describe(
                    "Where the pass card sends visitors. Omit for the KonfHub widget; ambassador sends them to the ambassador directory.",
                  ),
                description: z.string().min(1),
                eligibility: z.array(emphasisText).min(1),
                benefits: z.array(
                  z.strictObject({
                    group: z.string().min(1),
                    label: z.string().min(1),
                    detail: z.string().min(1).optional(),
                  }),
                ),
                note: z.string().min(1).optional(),
                soldOut: z
                  .boolean()
                  .optional()
                  .describe(
                    "Show a sold-out label instead of a Register action. Confirm against KonfHub before updating.",
                  ),
              }),
            ),
            policies: z.array(
              z.strictObject({
                title: z.string().min(1),
                text: emphasisText,
                id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
                appliesTo: z
                  .array(
                    z.enum(["liftoff", "student", "professional", "vip", "last-orbit", "observer"]),
                  )
                  .min(1)
                  .refine(
                    (items) => new Set(items).size === items.length,
                    "Must contain unique values",
                  )
                  .meta({ uniqueItems: true })
                  .optional(),
              }),
            ),
            registrationChecklist: z
              .array(z.strictObject({ title: z.string().min(1), text: z.string().min(1) }))
              .min(1),
            registrationDeclaration: z.string().min(1),
            registration: z.strictObject({
              buttonLabel: z.string().min(1),
              unavailableText: z.string().min(1),
              finalSaleText: z.string().min(1),
              profileReminder: z.string().min(1),
              termsLabel: z.string().min(1),
              widgetHeading: z.string().min(1),
              widgetLead: z.string().min(1),
              closedHeading: z.string().min(1),
              widgetTitle: z.string().min(1),
              fallbackText: z.string().min(1),
              fallbackLabel: z.string().min(1),
              referralText: z.string().min(1),
              soldOutLabel: z.string().min(1),
            }),
            benefitGroups: z
              .array(
                z.strictObject({
                  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
                  label: z.string().min(1),
                }),
              )
              .min(1),
            booking: z.strictObject({
              enabled: z.boolean(),
              widgetUrl: z
                .string()
                .refine(isUri, "Invalid URI")
                .meta({ format: "uri" })
                .regex(
                  /^https:\/\/konfhub\.com\/widget\/id\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                ),
              url: z
                .string()
                .refine(isUri, "Invalid URI")
                .meta({ format: "uri" })
                .regex(/^https:\/\//),
            }),
          }),
          date: z.string().refine(isDateTime, "Invalid date-time").meta({ format: "date-time" }),
          type: z.literal("devfest"),
          status: z.literal("current"),
        }),
        z.strictObject({
          id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
          date: z.string().refine(isDate, "Invalid date").meta({ format: "date" }),
          venue: z.strictObject({ name: z.string().min(1) }),
          summary: z.string().min(1),
          source: z
            .string()
            .refine(isUri, "Invalid URI")
            .meta({ format: "uri" })
            .regex(/^https:\/\//),
          officialSpeakerIds: z.array(z.string().regex(/^[a-z0-9][a-z0-9-]*$/)),
          series: z
            .enum(["devfest", "ccd"])
            .optional()
            .describe("Groups editions of the same event: DevFest Indore or Cloud Community Days."),
          cover: z
            .string()
            .regex(/^[a-z0-9][a-z0-9-]*$/)
            .optional()
            .describe(
              "Id of a photograph in gallery.json taken at this event, shown on the archive card. Leave out when there is no photograph yet.",
            ),
          theme: z
            .string()
            .min(1)
            .optional()
            .describe("The edition's central theme, only where the organizers stated one."),
          stats: z
            .strictObject({
              registrations: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              rsvps: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              attendees: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              speakers: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              sessions: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              sponsors: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              professionals: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              students: z
                .number()
                .refine(Number.isInteger, "Expected an integer")
                .meta({ type: "integer" })
                .min(0)
                .optional(),
              approximate: z
                .boolean()
                .optional()
                .describe("True when the organizers rounded the figures, such as '600+'."),
            })
            .optional()
            .describe(
              "Figures reported by the organizers in their event report. Leave out any figure that was not recorded.",
            ),
          recordingUrl: z
            .string()
            .refine(isUri, "Invalid URI")
            .meta({ format: "uri" })
            .regex(/^https:\/\//)
            .optional(),
          name: z.string().min(1),
          type: z.enum(["devfest", "community", "online"]),
          status: z.literal("past"),
        }),
      ]),
    )
    .min(1),
});

export type EventFile = z.infer<typeof EventFile>;
