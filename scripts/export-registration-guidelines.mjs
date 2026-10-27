import { currentEvent } from './lib/event-view.mjs';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { PROJECT_ROOT, readContent, validateContent } from './lib/content.mjs';

const content = readContent();
const errors = validateContent(content);
if (errors.length) throw new Error(errors.join('\n'));
const event = currentEvent(content);
const tickets = event.tickets;
const eventDate = new Intl.DateTimeFormat('en-IN', {
  timeZone: event.timezone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(event.date));
const checkIn = new Intl.DateTimeFormat('en-IN', {
  timeZone: event.timezone, hour: 'numeric', minute: '2-digit', hour12: true,
}).format(new Date(event.date)).toUpperCase();
const text = `# ${event.name} — Registration guidelines\n\n` +
  `${eventDate} · ${event.venue.fullName}\n\nRegistration opens at ${checkIn} IST.\n\n` +
  `## Before you book\n\n` + tickets.registrationChecklist.map(item => `**${item.title}.** ${item.text}`).join('\n\n') +
  `\n\n## Choose the right pass\n\n` +
  tickets.passes.map(pass => `### ${pass.name}\n\n${pass.description}\n\n${pass.eligibility}\n\n**Included:** ${pass.benefits.map(benefit => `${benefit.label}${benefit.detail ? ` (${benefit.detail})` : ''}`).join('; ')}.${pass.note ? `\n\n${pass.note}` : ''}`).join('\n\n') +
  `\n\n## Registration and attendance policies\n\n` +
  tickets.policies.map((policy, index) => `### ${index + 1}. ${policy.title}\n\n${policy.text}`).join('\n\n') +
  `\n\n## Registration declaration\n\n${tickets.registrationDeclaration}\n\n` +
  `## Conduct, venue and assistance\n\n[Community code of conduct](${event.links.codeOfConduct})\n\n` +
  `${event.venue.address}\n\nFor registration corrections, accessibility questions or ticket support, contact [${event.contactEmail}](mailto:${event.contactEmail}).\n`;
const output = path.join(PROJECT_ROOT, 'docs/konfhub-guidelines-ready-to-paste.md');
writeFileSync(output, text);
console.log('Exported registration guidelines from canonical event and ticket JSON.');
