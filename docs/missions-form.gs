/**
 * Creates the "Pick your mission" entry form for DevFest Indore 2026.
 *
 * How to run:
 *  1. Open https://script.google.com while signed in as the GDG Indore account that should own the form.
 *  2. New project, paste this file, press Run on createMissionsForm, and approve the permissions.
 *  3. Open View > Logs (or Execution log) and copy the "Share link" into missionsFormUrl in src/content/site.ts.
 *
 * It also schedules the form to stop accepting answers at 26 Nov 2026, 8 PM IST.
 */
function createMissionsForm() {
  const form = FormApp.create("DevFest Indore 2026: Pick your mission");
  form.setDescription(
    "You have one day at DevFest Indore. What's your mission?\n\n" +
      "Post your mission on LinkedIn, X or Instagram, tag GDG Indore, add #DevFestIndoreMission, " +
      "then submit your public post link here once. Entries close on 26 Nov 2026, 8 PM IST.\n\n" +
      "Winners are the three best entries on each platform, judged on reactions, post quality and " +
      "following the community rules. Your details are used only to run this campaign."
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setProgressBar(false);
  form.setConfirmationMessage("Thanks! Your entry is in. We will confirm winners privately on 27 Nov.");

  form.addTextItem().setTitle("Your full name").setRequired(true);

  form
    .addTextItem()
    .setTitle("Email you used to book your DevFest pass")
    .setHelpText("We use it to confirm you hold a Commander or Cadet pass and to contact winners.")
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form
    .addMultipleChoiceItem()
    .setTitle("Where did you post?")
    .setChoiceValues(["LinkedIn", "X", "Instagram"])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Link to your public post")
    .setHelpText("The post must be public so we can check it. Private accounts cannot be judged.")
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText("Enter the full link, starting with https://")
        .requireTextMatchesPattern("^https://\\S+$")
        .build()
    );

  form
    .addTextItem()
    .setTitle("Which session, workshop or exhibit is your mission about?")
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle("Before you submit")
    .setChoiceValues([
      "My post is public and original.",
      "I will follow the community rules. Engagement pods, bought reactions and spam tagging disqualify an entry.",
      "If I win, GDG Indore may share my name, photo and social links, and photograph me on stage.",
    ])
    .setRequired(true);

  // Stop accepting entries at the published deadline.
  ScriptApp.newTrigger("closeMissionsForm")
    .timeBased()
    .at(new Date("2026-11-26T20:00:00+05:30"))
    .create();
  PropertiesService.getScriptProperties().setProperty("formId", form.getId());

  Logger.log("Share link: " + form.getPublishedUrl());
  Logger.log("Edit link: " + form.getEditUrl());
}

function closeMissionsForm() {
  const id = PropertiesService.getScriptProperties().getProperty("formId");
  FormApp.openById(id).setAcceptingResponses(false);
}
