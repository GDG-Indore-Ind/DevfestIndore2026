import { z } from "zod";

const text = z.string().min(1);
const emphasisText = text.regex(/^(?:[^*]|\*\*[^*]+\*\*)+$/, "Use paired ** markers for emphasis");

const guidelinesSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  navigationLabel: text,
  sections: z
    .array(
      z.strictObject({
        id: z.enum([
          "before-booking",
          "entry",
          "eligibility",
          "workshops",
          "ticket-policy",
          "support",
        ]),
        title: text,
        policyIds: z
          .array(text)
          .min(1)
          .refine(
            (items) => new Set(items.map((item) => JSON.stringify(item))).size === items.length,
            { message: "Array items must be unique" },
          )
          .meta({ uniqueItems: true }),
      }),
    )
    .min(6)
    .max(6),
});
const partnersSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  applicationTitle: text,
  applicationText: text,
  applicationButton: text,
  archiveLabel: text,
  applicationPoints: z
    .array(
      z.strictObject({
        title: text,
        text: text,
      }),
    )
    .min(1),
  revealed: z.boolean(),
  revealTitle: text,
  revealText: text,
  revealButton: text,
  revealLead: text,
  revealDescription: text,
  carousel: z.strictObject({
    label: text,
    previousLabel: text,
    nextLabel: text,
    playLabel: text,
    pauseLabel: text,
    positionLabel: text,
  }),
  sectionLabel: text,
  sponsorshipText: text,
});
const venueSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  mapTitle: text,
  arrivalTitle: text,
  registrationLabel: text,
  entryTitle: text,
  entrySummary: text,
});
const homeSchema = z.strictObject({
  programmeTitle: text,
  programmeTagline: text,
  programmeStatus: text,
  historyTitle: text,
  historyLead: text,
  ecosystemTitle: text,
  ecosystemLead: text,
  heroLead: text,
  heroDescription: text,
  venueLead: text,
  photoArchiveLabel: z.string().min(1),
  themeSelectorLabel: text,
  themeContributionLabel: text,
  exhibits: z.strictObject({
    navigationLabel: text,
    eyebrow: text,
    title: text,
    lead: text,
    body: text,
    mixLabel: text,
    buttonLabel: text,
  }),
  ticketStrip: z.strictObject({
    title: text,
    lead: text,
    studentLabel: text,
    professionalLabel: text,
    allTicketsLabel: text,
  }),
  themes: z
    .array(
      z.strictObject({
        id: z.string().regex(new RegExp("^[a-z0-9][a-z0-9-]*$")),
        label: z.string().min(1),
        icon: z.enum(["Satellite", "Braces", "Bot", "Radio"]),
        color: z.enum(["blue", "red", "yellow", "green"]),
        signal: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        tags: z.array(z.string().min(1)),
      }),
    )
    .min(1),
  agendaLabel: text,
  pressLabel: z.string().min(1),
});
const ticketsSchema = z.strictObject({
  title: text,
  lead: text,
  endedLead: text,
  includedTitle: text,
  studentButtonLabel: text,
  ambassadorContactEnabled: z.boolean(),
});
const faqSchema = z.strictObject({
  title: text,
  lead: text,
  eventTitle: text,
  eventLead: text,
  ticketsTitle: text,
  ticketsLead: text,
  questions: z.array(
    z.strictObject({
      id: z.string().regex(new RegExp("^[a-z0-9][a-z0-9-]*$")),
      question: z.string().min(1),
      answer: emphasisText,
      kind: z.enum(["event", "tickets"]),
      link: z
        .strictObject({
          href: z.string().regex(new RegExp("^/[^ ]*$")),
          label: z.string().min(1),
        })
        .optional(),
    }),
  ),
});
const workshopsSchema = z.strictObject({
  title: text,
  lead: text,
  workshopTitle: text,
  workshopLead: text,
  searchLabel: text,
  searchPlaceholder: text,
  emptyTitle: text,
  emptyText: text,
  clearLabel: text,
  eventLinkLabel: text,
  photoLabel: text,
  photoCloseLabel: text,
  undatedLabel: text,
  communityTitle: text,
  communityLead: text,
  archiveLabel: text,
  ticketTitle: text,
  ticketLead: text,
  ticketLabel: text,
  sessionSingular: text,
  sessionPlural: text,
});
const archiveSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  editionsTitle: text,
  recordLabel: text,
  recordingLabel: text,
  themeLabel: text,
  statsLabel: text,
  statLabels: z.strictObject({
    registrations: text,
    rsvps: text,
    attendees: text,
    speakers: text,
    sessions: text,
    sponsors: text,
    professionals: text,
    students: text,
  }),
  editionBackLabel: text,
  otherEditionsTitle: text,
  partnersTitle: text,
  speakersTitle: text,
  photosTitle: text,
  pressTitle: text,
  pressLead: text,
  pressViewLabel: text,
});
const ambassadorsSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  navigationLabel: text,
  ticketLead: text,
  stepsTitle: text,
  ticketsLabel: text,
  steps: z
    .array(
      z.strictObject({
        title: text,
        text: emphasisText,
      }),
    )
    .min(1),
  directoryTitle: text,
  directoryLead: text,
  searchLabel: text,
  searchPlaceholder: text,
  emptyTitle: text,
  emptyText: text,
  ambassadorSingular: text,
  ambassadorPlural: text,
});
const agendaSchema = z.strictObject({
  title: text,
  description: text,
  lead: text,
  speakersTitle: text,
  sessionPending: text,
  bioLabel: text,
  more: text,
  emptyText: text,
  comingSoon: z.strictObject({
    badge: text,
    title: text,
    lead: text,
    itemsTitle: text,
    pendingLabel: text,
    items: z
      .array(
        z.strictObject({
          id: z.string().regex(new RegExp("^[a-z0-9][a-z0-9-]*$")),
          kind: text,
          title: text,
          description: text,
        }),
      )
      .min(1),
  }),
});

export const PagesFile = z.strictObject({
  $schema: z.string(),
  guidelines: guidelinesSchema,
  partners: partnersSchema,
  venue: venueSchema,
  home: homeSchema,
  tickets: ticketsSchema,
  faq: faqSchema,
  workshops: workshopsSchema,
  archive: archiveSchema,
  ambassadors: ambassadorsSchema,
  agenda: agendaSchema,
});

export type PagesFile = z.infer<typeof PagesFile>;
