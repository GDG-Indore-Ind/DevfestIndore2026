// Website selection and presentation/integration switches, not event facts.
export const SITE = {
  eventId: "devfest-2026",
  hiddenSessionIds: [
    "devfest-2026-qualcomm-arduino-demos",
    "devfest-2026-iist-address",
    "devfest-2026-panel-discussion",
  ],
  partnersRevealed: true,
  ambassadorContactEnabled: false,
  // Needs the stage slot confirmed and the entry form link set in missionsFormUrl.
  missionsEnabled: true,
  missionsFormUrl: "",
  archiveLogoSheet: "/images/deck_logos/past_sponsors_grid.png",
};

export const MISSIONS_ACCEPTING_ENTRIES = SITE.missionsEnabled && Boolean(SITE.missionsFormUrl);
