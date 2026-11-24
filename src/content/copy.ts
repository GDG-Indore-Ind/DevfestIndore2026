// Editorial content and interface wording. Event facts come from SQLite.
export const PAGE_COPY = {
  badge: {
    title: "Create your badge",
    description: "Create and share your DevFest Indore attendee badge.",
    lead: "A square badge to share that you’re attending DevFest Indore.",
    teaserTitle: "Create your badge",
    teaserLead: "Make a square attendee badge with your name and photo.",
    teaserAction: "Create your badge",
    detailsTitle: "Your details",
    defaultName: "Your Name",
    defaultDesignation: "Software Developer",
    defaultOrganisation: "Open Source Community",
    nameLabel: "Your name",
    namePlaceholder: "What should we call you?",
    affiliationLabel: "Role or college (optional)",
    affiliationPlaceholder: "Developer, designer, student…",
    designationLabel: "Designation or course",
    organisationLabel: "College or company",
    photoLabel: "Photo (optional)",
    photoPrivacy: "Stays on this device.",
    conductLink: "Community guidelines",
    cityLabel: "Your city",
    missionLabel: "Mission",
    searchMission: "Search missions",
    noMissions: "No matching missions.",
    shuffleMission: "Shuffle mission",
    shareOptionsLabel: "View caption",
    shareLabel: "Share image",
    photoRemove: "Remove photo",
    themeLabel: "Choose your theme",
    previewLabel: "Your badge preview",
    previewName: "Your name",
    attending: "I’m attending",
    download: "Download PNG",
    captionLabel: "Your caption",
    caption:
      "I’m attending {{event}} on {{date}} in {{city}}!\n\nCreate your badge: {{badgeUrl}}\n\n#DevFestIndore #DevFest #GDGIndore",
    copy: "Copy caption",
    copySuccess: "Caption copied.",
    copyError: "Copy the selected caption manually.",
    nameRequired: "Add your name to download.",
    preparing: "Preparing your badge…",
    photoLoading: "Preparing your photo…",
    photoError: "We couldn’t read that photo. Try a JPEG, PNG or WebP image.",
    photoSizeError: "Choose a photo smaller than 12 MB.",
    renderError: "We couldn’t draw your badge. Try another photo or reload the page.",
    downloadSuccess: "Your PNG is ready. Check your downloads.",
    shareSuccess: "Image handed to your share app.",
    shareError: "Sharing didn’t complete. Download the PNG and copy the caption to share it.",
  },
  guidelines: {
    title: "Registration guidelines",
    description:
      "Booking details, photo ID requirements, pass eligibility and ticket policies for DevFest Indore.",
    lead: "What to know before booking and what to bring on the day.",
    navigationLabel: "Jump to",
  },
  partners: {
    viewAllLabel: "View all partners",
    title: "Partners",
    description:
      "Meet the sponsors and collaborators contributing to DevFest Indore 2026, and explore sponsorship and partnership opportunities.",
    applicationButton: "Partner with us",
    revealTitle: "A few surprises.",
    revealText: "Sponsor and partner announcements are coming soon.",
    revealButton: "Sponsor or partner with us",
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
  },
  venue: {
    title: "Plan your arrival.",
    description:
      "Find Essentia Luxury Hotel, the DevFest Indore 2026 venue, with directions, check-in information and an entry checklist.",
    mapTitle: "Find the venue",
    arrivalTitle: "Arrive ready for check-in.",
    registrationLabel: "Check-in starts at",
    entrySummary:
      "Bring your QR ticket and an original government photo ID matching your registration. Cadet pass holders must also bring their original student ID.",
  },
  home: {
    programmeTitle: "Themes",
    programmeTagline: "New frontiers.",
    historyTitle: "One community. Still building.",
    historyLead: "DevFest and community events every year since 2014.",
    ecosystemTitle: "Community & Ecosystem",
    heroLead: "From intelligent software to systems in deep space.",
    heroDescription: "Technical talks and hands-on labs with the developer community.",
    heroCheckIn: "check-in from {{registrationTime}}",
    heroPrice: "Passes {{price}}",
    heroPriceFrom: "Passes from {{price}}",
    venueLead: "Check-in starts at {{registrationTime}}.",
    photoArchiveLabel: "Photo archive",
    pressLabel: "All press coverage",
    themeSelectorLabel: "Explore the themes",
    ticketStrip: {
      title: "Pick your pass.",
      lead: "Cadet and Commander are sold out. Here’s how you can still join us on 28 November.",
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
      confirmedLink: "See the exhibits",
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
    lead: "Cadet and Commander are sold out. Here’s how you can still join us.",
    soldOutTitle: "Thank you for the response",
    soldOutText:
      "Cadet and Commander are sold out, and we’re so glad for the response we’ve received. Here we are with more ways to join: Flight Deck for premium access, Last Orbit for anyone who couldn’t get a ticket earlier, and Observer if you just want to explore DevFest.",
    endedLead: "Check KonfHub below for ticket availability and prices.",
    includedTitle: "Every pass includes",
    studentButtonLabel: "Get Cadet code",
    studentCheckoutLabel: "I have a code",
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
          "Cadet and Commander are sold out. Flight Deck ({{vipPrice}}) is the premium option, Last Orbit ({{lastOrbitPrice}}) is the final general release, and Observer ({{observerPrice}}) covers sessions only for anyone who wants to explore DevFest.",
        link: {
          href: "/tickets",
          label: "See open passes",
        },
      },
      {
        id: "ticket-student",
        kind: "tickets",
        question: "I’m a student. Can I still get a ticket?",
        answer:
          "Cadet is sold out, but Last Orbit and Observer are open to everyone while they last. Cadet pass holders must bring their **government photo ID** and **original student ID** to check-in.",
        link: {
          href: "/tickets",
          label: "See open passes",
        },
      },
      {
        id: "ticket-group",
        kind: "tickets",
        question: "Are there any discounts?",
        answer:
          "An ambassador code gives 5% off any pass; enter it in the Discount / Access Code field on KonfHub. The Commander bulk discount ended when that pass sold out.",
        link: {
          href: "/tickets#registration",
          label: "Book a pass",
        },
      },
      {
        id: "ticket-entry",
        kind: "tickets",
        question: "What should I bring for check-in?",
        answer:
          "Bring your QR ticket and an original government photo ID matching your registration. Cadet pass holders must also bring their **original student ID**.",
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
          "Not automatically. Seats are limited, and a conference ticket does not reserve one. Observer does not include workshop seating.",
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
    speakersTitle: "Workshop speakers",
    workshopSingular: "workshop",
    workshopPlural: "workshops",
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
    allPressLabel: "All press coverage",
    pressLead: "Newspaper coverage of DevFest and GDG Indore community events.",
    pressViewLabel: "Read clipping",
    navigationLabel: "Archive",
  },
  ambassadors: {
    title: "Get an ambassador code",
    description: "Ask a listed DevFest Indore ambassador about passes and discount codes.",
    lead: "Cadet and Commander are sold out. Ambassadors can still help with the passes that remain open.",
    navigationLabel: "Get an ambassador code",
    ticketLead:
      "Connecting through your campus or community? Visit the ambassador programme for help with your next step.",
    stepsTitle: "How to use your code",
    steps: [
      {
        title: "Ask an ambassador",
        text: "Find a campus ambassador or a professional contact.",
      },
      {
        title: "Choose your pass",
        text: "See which passes are still open on the Tickets page.",
      },
      {
        title: "Book on KonfHub",
        text: "If you have a code, enter it in the Discount / Access Code field on KonfHub.",
      },
    ],
    ticketsLabel: "I have a code",
    professionalTitle: "Contact for working professionals",
    professionalNavLabel: "Professional contacts",
    directoryTitle: "Campus ambassadors",
    directoryLead: "Connect on LinkedIn or Instagram.",
    searchLabel: "Find a campus ambassador",
    searchPlaceholder: "Name or college",
    searchEmpty: "No campus ambassadors match your search.",
    resultSingular: "campus ambassador",
    resultPlural: "campus ambassadors",
  },
  agenda: {
    title: "Agenda",
    description: "Keynote, talks, workshops and exhibits at DevFest Indore 2026 on 28 November.",
    lead: "Explore the sessions, workshops and activities at DevFest Indore.",
    activities: [
      {
        id: "lunch",
        icon: "lunch",
        tone: "yellow",
        label: "Lunch",
        text: "Included with your pass.",
      },
      {
        id: "community-lounge",
        icon: "community",
        tone: "green",
        label: "Community Lounge",
        text: "Meet developers from across the community.",
      },
      {
        id: "expert-lounge",
        icon: "expert",
        tone: "blue",
        label: "Expert Lounge",
        text: "Bring your questions to the experts.",
      },
      {
        id: "photo-booths",
        icon: "photo",
        tone: "red",
        label: "Photo booths",
        text: "Take a photo to remember the day.",
      },
    ],
    sections: {
      sessions: "Sessions",
      workshops: "Workshops",
      activities: "Activities",
      exhibits: "Exhibits",
    },
    workshopLead: "Hands-on sessions. Seats are first come, first served.",
    pastWorkshopsLabel: "Past campus workshops",
    workshopsEmpty: "Workshops will be announced soon.",
    exhibitsEmpty: "Exhibits will be announced soon.",
    sessionPending: "Session to be announced",
    bioLabel: "About",
    emptyText: "Speakers will be announced soon.",
    timingsPending: "Session and workshop start times will be announced here.",
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
  },
  navigation: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
  },
};

export const TICKET_COPY = {
  buttonLabel: "Book this pass",
  unavailableText: "The registration link will be available here.",
  finalSaleText: "All purchases are final. No refunds or transfers.",
  profileReminder: "Add your own LinkedIn URL to your KonfHub profile before booking.",
  termsLabel: "Read the registration guidelines",
  widgetHeading: "Book your pass",
  widgetLead:
    "Choose Flight Deck, Last Orbit or Observer below. If Flight Deck shows as full, join its waitlist.",
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

/** "Pick Your Mission" campaign. Dates and rewards stay unannounced until the stage slot is confirmed. */
export const MISSIONS_COPY = {
  title: "Pick your mission",
  description:
    "You have one day at DevFest Indore. Post your mission on LinkedIn, X or Instagram, tag GDG Indore and get featured.",
  lead: "You have one day at DevFest Indore. What’s your mission?",
  hashtag: "#DevFestIndoreMission",
  stepsTitle: "How to enter",
  steps: [
    {
      title: "Hold a pass",
      text: "Any confirmed DevFest pass counts, whichever pass or code you used.",
    },
    {
      title: "Pick one thing",
      text: "Choose a session, workshop or exhibit from the agenda.",
    },
    {
      title: "Write one line",
      text: "Say what you want to learn, build or try. One line is enough.",
    },
    {
      title: "Post it",
      text: "Share it on LinkedIn, X or Instagram, tag GDG Indore and add the hashtag. Your badge is optional.",
    },
    {
      title: "Submit the link",
      text: "Send your post link once, before entries close.",
    },
  ],
  example:
    "I want to see what happens when I interrupt a Gemini voice agent halfway through a tool call.",
  judgingTitle: "How entries are judged",
  judgingLead:
    "These are the only criteria. We pick the three best entries on each platform. Reaction counts are taken once, when entries close, and we publish how the winners were picked after the event.",
  judging: [
    {
      title: "Reactions",
      text: "Likes, reactions and comments on your post when entries close, counted the way each platform shows them. Counted per post, not per follower.",
    },
    {
      title: "Post quality",
      text: "Your mission is specific, tied to a real session, and says what you want to learn, build or try.",
    },
    {
      title: "Community rules",
      text: "Original, on topic and respectful. Engagement pods, bought reactions and spam tagging disqualify an entry.",
    },
  ],
  rewardsTitle: "What you get",
  rewards: [
    {
      title: "Everyone who posts",
      text: "A mission mark on your badge and your name on the mission wall.",
    },
    {
      title: "The Mission Crew",
      text: "Nine winners, three from each platform. You join us on stage together, receive a Mission Patch, get a group photo with the crew, and have your socials shared with everyone. A surprise follows after the event.",
    },
    {
      title: "Most impactful mission",
      text: "One crew member, chosen by the organizers for the mission with the most impact, also receives a Flight Deck pass.",
    },
  ],
  rewardsNote: "Everything above is what we are offering. Nothing is promised beyond DevFest.",
  timelineTitle: "Dates",
  timeline: [
    { when: "20 Nov", what: "Campaign opens" },
    { when: "26 Nov, 8 PM IST", what: "Entries close and reactions are counted" },
    { when: "27 Nov", what: "Winners confirmed privately" },
    { when: "28 Nov", what: "The Mission Crew joins us on stage" },
  ],
  submitLabel: "Submit your post link",
  submitPending: "Mission Crew submissions are currently unavailable.",
  agendaLabel: "Browse the agenda",
  badgeLabel: "Create your badge",
  badgeCta: "See how to enter the Mission Crew challenge",
  homeStrip: {
    title: "Make your badge. Pick your mission.",
    text: "Create your attendee badge, add your mission and post it. Nine winners join us on stage as the Mission Crew.",
    badgeOnlyTitle: "Make your attendee badge",
    badgeOnlyText:
      "Create a square badge with your name and mission to share that you’re attending.",
    badgeLabel: "Create your badge",
    missionLabel: "How to enter",
  },
};

export const PARTNER_PROFILE_LINKS: Record<string, { label: string; href: string }[]> = {
  "thm-indore": [
    { label: "Instagram · Indore Chapter", href: "https://instagram.com/thm.indore" },
    {
      label: "LinkedIn · The Hackers Meetup",
      href: "https://in.linkedin.com/company/the-hackers-meetup",
    },
  ],
};
