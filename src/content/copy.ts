// Editorial content and interface wording. Event facts come from SQLite.
export const PAGE_COPY = {
  badge: {
    title: "Make your DevFest badge",
    description:
      "Make your own DevFest Indore badge. Choose a theme, add your name and share your orbit.",
    lead: "Add your name, pick a theme and tell people you’re going. Your orbit is drawn from your name.",
    teaserTitle: "Make your DevFest badge",
    teaserLead: "Add your name, get an orbit of your own and post it on LinkedIn or Instagram.",
    teaserAction: "Make my badge",
    detailsTitle: "Your details",
    nameLabel: "Your name",
    namePlaceholder: "What should we call you?",
    affiliationLabel: "Role or college (optional)",
    affiliationPlaceholder: "Developer, designer, student…",
    photoLabel: "Photo (optional)",
    photoHint: "JPEG, PNG or WebP, up to 12 MB. Cropped to a circle.",
    photoPrivacy:
      "Your photo and details stay in this browser. Nothing is uploaded or saved when you leave.",
    conduct:
      "Use your own name and a photo of yourself. A badge carries the DevFest and GDG Indore names, so keep it free of offensive, sexual or misleading content.",
    conductLink: "Community guidelines",
    photoRemove: "Remove photo",
    themeLabel: "Choose your theme",
    previewLabel: "Your badge preview",
    previewHint:
      "Same name, same orbit. Press and hold the image to save it if a download doesn’t start.",
    previewName: "Your name",
    attending: "I’m going to",
    download: "Download PNG",
    linkedin: "Post on LinkedIn",
    instagram: "Share to Instagram",
    x: "Post on X",
    shareHint:
      "Your phone will ask which app to use and hand it your badge. Some apps need the caption pasted in.",
    shareUnavailable:
      "Each button opens that site in a new tab, saves your badge and copies the caption. Attach the image and post.",
    posted: {
      linkedin: {
        copied: "LinkedIn is open with your caption. Attach the badge we just saved and post.",
        saved: "LinkedIn is open with your caption. Attach the badge we just saved and post.",
      },
      instagram: {
        copied:
          "Instagram is open. Choose Create, add the badge we just saved and paste the caption.",
        saved: "Instagram is open. Choose Create and add the badge we just saved.",
      },
      x: {
        copied: "X is open with your caption. Attach the badge we just saved and post.",
        saved: "X is open with your caption. Attach the badge we just saved and post.",
      },
    },
    captionLabel: "Your caption",
    caption:
      "I’m going to {{event}} on {{date}} in {{city}}! See you in orbit. {{url}}\n\nMake your own badge: {{badgeUrl}}\n\n#DevFestIndore #DevFest #GDGIndore",
    copy: "Copy caption",
    copySuccess: "Caption copied.",
    copyError: "Select the caption below and copy it manually.",
    nameRequired: "Add your name to download or share your badge.",
    preparing: "Drawing your orbit…",
    photoLoading: "Preparing your photo…",
    photoError: "We couldn’t read that photo. Try a JPEG, PNG or WebP image.",
    photoSizeError: "Choose a photo smaller than 12 MB.",
    renderError: "We couldn’t draw your badge. Try another photo or reload the page.",
    downloadSuccess: "Your PNG is ready. Check your downloads.",
    shareSuccess: "Image handed to your share app.",
    shareError: "Sharing didn’t complete. You can download the PNG instead.",
    ticketNote: "This is a social badge. You’ll still need a ticket to attend.",
    ticketAction: "Find your pass",
  },
  guidelines: {
    title: "Registration guidelines",
    description:
      "Booking details, photo ID requirements, pass eligibility and ticket policies for DevFest Indore.",
    lead: "What to know before booking and what to bring on the day.",
    navigationLabel: "Jump to",
  },
  partners: {
    title: "Build this edition with us.",
    description:
      "Meet the sponsors and collaborators contributing to DevFest Indore 2026, and explore sponsorship and partnership opportunities.",
    lead: "Meet this edition’s collaborators and see how your organization can help.",
    applicationTitle: "How you can contribute",
    applicationText: "Share your idea through the form and we’ll find the right fit.",
    applicationPoints: [
      {
        title: "Share your expertise",
        text: "Propose technical knowledge, developer demonstrations or practical learning experiences.",
      },
      {
        title: "Connect communities",
        text: "Bring a relevant developer community, industry network or outreach idea.",
      },
      {
        title: "Support the experience",
        text: "Sponsor the edition financially.",
      },
    ],
    applicationButton: "Sponsor or partner with us",
    archiveLabel: "Past editions",
    revealTitle: "A few surprises.",
    revealText: "Sponsor and partner announcements are coming soon.",
    revealButton: "Sponsor or partner with us",
    revealLead:
      "Support the event through sponsorship, contribute expertise or connect communities. Announcements are coming soon.",
    revealDescription:
      "Explore sponsorship and partnership opportunities with DevFest Indore 2026. Announcements are coming soon.",
    carousel: {
      label: "Featured partners and collaborators",
      previousLabel: "Previous partner",
      nextLabel: "Next partner",
      playLabel: "Play partner slideshow",
      pauseLabel: "Pause partner slideshow",
      positionLabel: "Choose a partner",
    },
    sectionLabel: "Sponsors & partners",
    sponsorshipText: "Sponsor DevFest Indore and support the developer community.",
  },
  venue: {
    title: "Plan your arrival.",
    description:
      "Find Essentia Luxury Hotel, the DevFest Indore 2026 venue, with directions, check-in information and an entry checklist.",
    mapTitle: "Find the venue",
    arrivalTitle: "Arrive ready for check-in.",
    registrationLabel: "Check-in starts at",
    entrySummary:
      "Bring your QR ticket and an original government photo ID matching your registration.",
  },
  home: {
    programmeTitle: "Themes",
    programmeTagline: "New frontiers.",
    programmeStatus: "Have something to share on these themes?",
    historyTitle: "One community. Still building.",
    historyLead: "DevFest and community events every year since 2014.",
    ecosystemTitle: "Communities & ecosystem",
    ecosystemLead: "Communities and networks that connect us.",
    heroLead: "From intelligent software to systems in deep space.",
    heroDescription: "Technical talks and hands-on labs with the developer community.",
    heroCheckIn: "check-in from {{registrationTime}}",
    heroPrice: "Passes {{price}}",
    heroPriceFrom: "Passes from {{price}}",
    venueLead: "Check-in starts at {{registrationTime}}.",
    photoArchiveLabel: "Photo archive",
    pressLabel: "All press coverage",
    themeSelectorLabel: "Explore the themes",
    themeContributionLabel: "Bring it to the stage",
    ticketStrip: {
      title: "Pick your pass.",
      lead: "Sessions, workshops and lunch on 28 November.",
      studentLabel: "Get Cadet code",
      professionalLabel: "Book Commander",
      allTicketsLabel: "Pass details",
    },
    exhibits: {
      navigationLabel: "Exhibits",
      eyebrow: "Call for exhibits",
      title: "Bring what you’re building.",
      lead: "Software, physical AI, space technology—or something we haven’t imagined yet.",
      body: "Developers, makers, startups and companies: tell us you’d like to exhibit. Bring a live demo, working prototype or product.",
      buttonLabel: "Exhibit at DevFest",
      confirmedLabel: "Confirmed so far",
      confirmedLink: "All exhibits",
    },
    themes: [
      {
        id: "space",
        label: "Space systems",
        icon: "Satellite",
        color: "blue",
        signal: "From orbit to insight",
        title: "Your next input might come from orbit.",
        description:
          "A satellite sends a signal. A developer turns it into something useful, often with data that can’t always phone home.",
        tags: ["Telemetry", "Earth observation", "Edge computing"],
      },
      {
        id: "agents",
        label: "AI agents",
        icon: "Braces",
        color: "red",
        signal: "Beyond the chat window",
        title: "Give your model a mission. And a way back.",
        description:
          "An agent can call tools, remember context and take action. The hard part is making it dependable and turning a clever demo into useful software.",
        tags: ["Tool use", "Agent evaluation", "Human oversight"],
      },
      {
        id: "physical",
        label: "Physical AI",
        icon: "Bot",
        color: "yellow",
        signal: "Software, meet gravity",
        title: "The real world doesn’t have an undo button.",
        description:
          "When a model moves a machine, latency becomes distance and a wrong answer can become a wrong turn.",
        tags: ["Robotics", "Perception", "Control loops"],
      },
      {
        id: "systems",
        label: "Cloud & systems",
        icon: "Radio",
        color: "green",
        signal: "Built for the unexpected",
        title: "Houston, we planned for this.",
        description:
          "Networks disappear. Traffic spikes. Hardware has other plans. Build systems that stay useful when the happy path ends, on Earth or at the edge.",
        tags: ["Scalable data", "Reliability", "Observability"],
      },
    ],
    agendaLabel: "See the agenda",
    agendaPreview: {
      title: "Meet the speakers",
      lead: "Confirmed so far. More to be announced.",
      workshopsLabel: "{{count}} hands-on workshops",
      exhibitsLabel: "{{count}} exhibits",
      agendaLabel: "See the full agenda",
    },
  },
  tickets: {
    title: "Tickets",
    lead: "Are you a student? Choose Cadet with an ambassador code. Working professionals can book Commander directly.",
    endedLead: "Check KonfHub below for ticket availability and prices.",
    includedTitle: "Every pass includes",
    studentButtonLabel: "Get Cadet code",
  },
  faq: {
    title: "FAQ",
    lead: "Quick answers, registration guidelines and ticket policies.",
    eventTitle: "Before you come",
    eventLead: "The day, the venue and what to bring.",
    ticketsTitle: "Booking & passes",
    ticketsLead: "For current pass details, visit Tickets.",
    questions: [
      {
        id: "event-1",
        question: "What is GDG DevFest Indore 2026?",
        answer:
          "An annual developer conference by Google Developer Groups, with technical talks and hands-on learning.",
        kind: "event",
      },
      {
        id: "event-2",
        question: "Who can attend DevFest?",
        answer:
          "Developers, researchers, students, tech leads, architects and founders. Choose the pass that matches your eligibility.",
        kind: "event",
      },
      {
        id: "event-3",
        question: "When and where is DevFest?",
        answer: "{{date}} at {{venue}}. Check-in starts at {{registrationTime}}.",
        kind: "event",
        link: {
          href: "/venue",
          label: "Venue & directions",
        },
      },
      {
        id: "event-4",
        question: "Are campus workshops part of the event-day programme?",
        answer:
          "Campus workshops are separate events held before DevFest, with their own dates and registration details.",
        kind: "event",
        link: {
          href: "/archive#workshops",
          label: "Past campus workshops",
        },
      },
      {
        id: "event-5",
        question: "Should I bring a laptop?",
        answer:
          "Bring your laptop and charger if you plan to join a hands-on lab. Setup instructions will be shared with the lab details.",
        kind: "event",
      },
      {
        id: "ticket-current",
        kind: "tickets",
        question: "Which pass should I choose?",
        answer:
          "Students choose Cadet ({{studentPrice}}) with an ambassador code. Working professionals choose Commander ({{professionalPrice}}) and can book directly. Both include the same access.",
        link: {
          href: "/tickets",
          label: "Get tickets",
        },
      },
      {
        id: "ticket-student",
        kind: "tickets",
        question: "How do students get tickets?",
        answer:
          "Ask any listed ambassador for a code, then enter it in the Discount / Access Code field on KonfHub to book Cadet. Bring your **government photo ID** and **original student ID** to check-in.",
        link: {
          href: "/ambassadors",
          label: "Get an ambassador code",
        },
      },
      {
        id: "ticket-group",
        kind: "tickets",
        question: "Are there any discounts?",
        answer:
          "An ambassador code gives 5% off any pass; enter it in the Discount / Access Code field on KonfHub. Commander also offers {{groupOffer}}, applied automatically. Discounts cannot combine, so use the bulk discount for 6–10 tickets.",
        link: {
          href: "/tickets#registration",
          label: "Book Commander",
        },
      },
      {
        id: "ticket-entry",
        kind: "tickets",
        question: "What should I bring for check-in?",
        answer: "Your QR ticket and an original government photo ID matching your registration.",
        link: {
          href: "/faq#eligibility",
          label: "Additional pass requirements",
        },
      },
      {
        id: "ticket-workshops",
        kind: "tickets",
        question: "Does my ticket reserve a workshop seat?",
        answer:
          "Not automatically. Seats are limited, and a conference ticket does not reserve one.",
        link: {
          href: "/faq#workshops",
          label: "Workshop guidelines",
        },
      },
      {
        id: "ticket-final-sale",
        kind: "tickets",
        question: "Can I cancel, refund or transfer my ticket?",
        answer: "No. All sales are final.",
        link: {
          href: "/faq#ticket-policy",
          label: "Ticket policy",
        },
      },
    ],
  },
  workshops: {
    workshopTitle: "Pre-DevFest campus workshops",
    workshopLead: "The Pre-DevFest 2026 campus series.",
    searchLabel: "Find a workshop",
    searchPlaceholder: "College, topic or speaker",
    emptyTitle: "No matching workshops",
    emptyText: "Try another college, topic or speaker.",
    clearLabel: "Clear search",
    eventLinkLabel: "Event page",
    photoLabel: "View workshop photo",
    photoCloseLabel: "Close photograph",
    undatedLabel: "Campus session",
    communityTitle: "Community events",
    sessionSingular: "session",
    sessionPlural: "sessions",
  },
  archive: {
    title: "Archive",
    description:
      "DevFest Indore and Cloud Community Days editions from 2022 to 2025: dates, venues, speakers, photographs and press.",
    lead: "Past editions with their speakers, photos and press.",
    editionsTitle: "Editions",
    recordLabel: "Official event record",
    recordingLabel: "Watch the recording",
    themeLabel: "Theme",
    statsLabel: "Reported by the organizers",
    statLabels: {
      registrations: "Registrations",
      rsvps: "RSVPs",
      attendees: "Attendees",
      speakers: "Speakers",
      sessions: "Sessions",
      sponsors: "Sponsors",
      professionals: "Professionals",
      students: "Students",
    },
    editionBackLabel: "All editions",
    otherEditionsTitle: "Other editions",
    partnersTitle: "Partners & communities",
    speakersTitle: "Speakers",
    photosTitle: "Photos",
    pressTitle: "In the news",
    pressLead: "Newspaper coverage of past editions, with headlines summarized in English.",
    pressViewLabel: "Read clipping",
    navigationLabel: "Past editions",
  },
  ambassadors: {
    title: "Get an ambassador code",
    description: "Ask any listed DevFest Indore ambassador for a code for Cadet or Commander.",
    lead: "Students need a code to book Cadet. Professionals can use one for 5% off Commander.",
    navigationLabel: "Get an ambassador code",
    ticketLead:
      "Connecting through your campus or community? Visit the ambassador programme for help with your next step.",
    stepsTitle: "Get your code",
    steps: [
      {
        title: "Ask an ambassador",
        text: "Ask any listed ambassador for a code.",
      },
      {
        title: "Choose your pass",
        text: "Students choose Cadet; professionals choose Commander.",
      },
      {
        title: "Book on KonfHub",
        text: "Enter it in the Discount / Access Code field on KonfHub. Discount rules are on the Tickets page.",
      },
    ],
    ticketsLabel: "Get tickets",
    directoryTitle: "Meet your ambassadors",
    directoryLead: "Connect on LinkedIn or Instagram.",
    searchLabel: "Find an ambassador",
    searchPlaceholder: "Search by name or college",
    emptyTitle: "No ambassadors found",
    emptyText: "Try a different name or college.",
    ambassadorSingular: "ambassador",
    ambassadorPlural: "ambassadors",
  },
  agenda: {
    title: "Agenda",
    description:
      "Keynote, panel, talks, workshops and exhibits at DevFest Indore 2026 on 28 November, in running order.",
    lead: "The day at a glance. Times will be added once final.",
    sessionPending: "Session to be announced",
    bioLabel: "About",
    emptyText: "Speakers will be announced soon.",
    meta: "Timings to be announced",
    speakerPending: "Speaker to be announced",
    organizerLabel: "Presented by",
    formatLabels: {
      keynote: "Keynote",
      panel: "Panel",
      address: "Address",
      session: "Session",
      workshop: "Workshop",
      exhibit: "Exhibit",
    },
    durationLabel: "min",
    otherGroupTitle: "More to be announced",
    tabsLabel: "Agenda sections",
    tabs: {
      schedule: "Agenda",
      workshops: "Workshops",
      speakers: "Speakers",
      exhibits: "Exhibits",
    },
    slotLabel: "Slot",
  },
  spaceClub: {
    heading: "Space Club of India in Indore",
    body: "Space Club of India will exhibit at DevFest Indore on 28 November, and its founder, Lt Gen PJS Pannu, gives the keynote. Join us for the reveal; how to join will be shared here after the event.",
    linkLabel: "Space Club of India in Indore",
  },
  eventWorkshops: {
    title: "Workshops",
    description:
      "Hands-on workshops at DevFest Indore 2026 on 28 November, including Google ADK agents and Qualcomm's Physical AI workshop.",
    lead: "Hands-on sessions on 28 November. Seats are first come, first served.",
    listTitle: "Confirmed so far",
    emptyText: "Workshops will be announced soon.",
    pastTitle: "Past campus workshops",
    pastLead: "Looking for the Pre-DevFest 2026 campus series? It lives in the archive.",
    pastLabel: "Past workshops",
    agendaLabel: "See the full agenda",
    ticketLabel: "Get tickets",
  },
  navigation: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
  },
  eventSpeakers: {
    title: "Speakers",
    description: "Confirmed speakers at DevFest Indore 2026 on 28 November.",
    lead: "Confirmed speakers so far. More will be announced.",
    emptyText: "Speakers will be announced soon.",
  },
  eventExhibits: {
    title: "Exhibits",
    description:
      "Confirmed exhibits at DevFest Indore 2026, including Qualcomm × Arduino demos and Space Club of India.",
    lead: "Confirmed exhibits so far.",
    emptyText: "Exhibits will be announced soon.",
  },
};

export const TICKET_COPY = {
  buttonLabel: "Book Commander",
  unavailableText: "The registration link will be available here.",
  finalSaleText: "All purchases are final. No refunds or transfers.",
  profileReminder: "Add your own LinkedIn URL to your KonfHub profile before booking.",
  termsLabel: "Read the registration guidelines",
  widgetHeading: "Book your pass",
  widgetLead: "Enter your ambassador code in the Discount / Access Code field on KonfHub.",
  closedHeading: "Closed passes",
  widgetTitle: "Register for GDG Devfest Indore 2026",
  fallbackText: "Trouble with checkout?",
  fallbackLabel: "Open KonfHub directly",
  referralText: "Use the direct KonfHub link to apply your saved referral code.",
  soldOutLabel: "Sold out",
};

export const BENEFIT_GROUPS = [
  {
    id: "access",
    label: "Event access",
  },
  {
    id: "essentials",
    label: "Food & goodies",
  },
  {
    id: "lounges",
    label: "Lounge access",
  },
];
