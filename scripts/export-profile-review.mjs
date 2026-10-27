import { organizationView } from './lib/organization-view.mjs';
import { pastEvents } from './lib/event-view.mjs';
import { talks as programmeTalks } from './lib/programme-view.mjs';
import { personProfile, participationRecords, legacyTeamRecords } from './lib/people-view.mjs';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { PROJECT_ROOT, readContent, validateContent } from './lib/content.mjs';
import { profileHash } from './lib/profile-review.mjs';
const content = readContent();
const errors = validateContent(content);
if (errors.length) throw new Error(errors.join('\n'));
const reviewRoot = path.join(PROJECT_ROOT, 'docs/profile-review');
const root = path.join(reviewRoot, 'generated');
const peopleLinks = [], organizationLinks = [];
const line = value => String(value || 'Not supplied').replace(/\r?\n/g, ' ');
for (const record of content.people.people) {
  const person = personProfile(record);
  const legacy = legacyTeamRecords(content.people.people).filter(item => item.personId === person.id);
  const appearances = participationRecords(content.people.people).filter(item => item.personId === person.id);
  const talks = programmeTalks(content).filter(item => item.speakerIds.includes(person.id));
  const approval = content.approvals.people.find(item => item.personId === person.id && item.scope !== 'ambassador');
  let text = `# ${person.name} — profile review\n\nStatus: ${approval ? 'Approved for the recorded revision' : 'Awaiting organizer verification and approval'}.\n\n` +
    `Existing public records are the baseline below; migration is not independent verification. No missing titles, employers, years or talks have been inferred.\n\n` +
    `## Identity\n\n- ID: ${person.id}\n- Name: ${person.name}\n- Type: ${person.kind}\n- Photo: ${person.avatar ?? 'Not supplied'}\n- Bio: ${line(person.bio)}\n- Current professional title: ${line(person.role)}\n- Current company: ${line(person.company)}\n\n` +
    `## Public links\n\n${Object.entries(person.socials ?? {}).map(([kind,url]) => `- ${kind}: ${url}`).join('\n') || 'None supplied.'}\n\n` +
    `## Existing organizer membership\n\n${legacy.map(item => `- ${item.role}; existing group: ${item.team}. Exact edition and new category require approval.`).join('\n') || 'No undated team membership.'}\n\n` +
    `## Recorded event appearances\n\n${appearances.map(item => { const event=pastEvents(content).find(event=>event.id===item.eventId); return `- ${event?.title ?? item.eventId}: ${item.roles.flatMap(role=>role.responsibilities?.map(r=>`${r.area} ${{lead:'Lead','co-lead':'Co-Lead',coordinator:'Coordinator','team-member':'Team Member',volunteer:'Volunteer'}[r.level]}`) ?? [role.title]).join(', ')}. ${item.sourceUrl ? `Official record: ${item.sourceUrl}` : 'Source: organizer session archive; independently verify before approval.'}`; }).join('\n') || 'No dated appearances recorded.'}\n\n` +
    `## Recorded talks and workshops\n\n${talks.map(talk => `- ${pastEvents(content).find(event=>event.id===talk.editionId)?.title ?? talk.editionId}: **${talk.title}** (${talk.id}). Historical title/company: ${line(talk.role)} / ${line(talk.company)}. Source: ${talk.sourceUrl ?? 'organizer session archive'}.`).join('\n') || 'No talk records supplied. This does not mean no talks were given.'}\n\n` +
    `## Approval checklist\n\n- Confirm the name, photo, bio and ownership of each public profile link.\n- Confirm each event/year, role category and event-specific title.\n- Confirm historical professional titles separately from current employment.\n- Confirm talk titles, co-speakers and any links to recordings/slides.\n- Supply corrections in this chat; an approval will be recorded only after the organizer explicitly approves this profile.\n\nBaseline revision: \`${profileHash(content,'people',person.id)}\`.\n`;
  if (existsSync(path.join(reviewRoot,'evidence',person.id+'.md'))) text += `\n## Verification notes\n\nSee [verification notes](../../evidence/${person.id}.md). These notes are evidence for review, not approval.\n`;
  const folder=path.join(root,'people');mkdirSync(folder,{recursive:true});writeFileSync(path.join(folder,person.id+'.md'),text);
  peopleLinks.push(`- [${person.name}](people/${person.id}.md) — ${approval?'approved':'awaiting approval'}`);
}
for (const record of content.organizations.organizations) {
  const organization = organizationView(record);
  const approval=content.approvals.organizations.find(item=>item.organizationId===organization.id);
  const text=`# ${organization.name} — organization review\n\nStatus: ${approval?'Approved for the recorded revision':'Awaiting organizer verification and approval'}.\n\n`+
    `- ID: ${organization.id}\n- Name: ${organization.name}\n- Logo: ${organization.logoUrl ?? (organization.archiveLogoWindow?'Organizer-supplied archive logo sheet':'Not supplied')}\n- Website: ${organization.websiteUrl ?? 'Not supplied'}\n- Social URL: ${organization.socialUrl ?? 'Not supplied'}\n- Description: ${line(organization.description)}\n\n## Recorded contributions\n\n`+
    organization.partnerships.map(item=>`- ${item.editionId==='historical'?'Historical — year undocumented':item.editionId==='ecosystem'?'Ecosystem — not event sponsorship':item.editionId}: ${item.contributions.map(contribution=>`${contribution.kind}: ${contribution.role}`).join('; ')}. Reveal: ${item.visible===false?'held back':'existing public listing'}. Source: ${item.source ?? 'Existing organizer records; verify before approval.'}`).join('\n')+
    `\n\nConfirm identity, logo rights/source, URLs, contribution type and exact edition where known. Do not infer financial tiers or a year from another appearance. Approval/reveal are separate; approving a held-back record does not announce it.\n\nBaseline revision: \`${profileHash(content,'organizations',organization.id)}\`.\n`;
  const folder=path.join(root,'organizations');mkdirSync(folder,{recursive:true});writeFileSync(path.join(folder,organization.id+'.md'),text);
  organizationLinks.push(`- [${organization.name}](organizations/${organization.id}.md) — ${approval?'approved':'awaiting approval'}`);
}
writeFileSync(path.join(root,'README.md'),`# Profile review queue\n\nStart with [Karan Mittal](people/karan-mittal.md). Approvals are recorded only from explicit organizer confirmations, never from permission to implement the architecture.\n\nThe new directory launch remains disabled in production. Existing published listings continue to use their current presentation, with individually approved profiles linked as they become ready. Review packets live here, outside application content imports.\n\nFor each approved profile: apply the exact agreed corrections; migrate any approved undated organizer membership into an exact event participation; record its new fingerprint, approval date and chat reference in content/approvals.json. Validation rejects changes to approved profile data until approval is refreshed. The export command never creates approvals.\n\n## People (${peopleLinks.length})\n\n${peopleLinks.join('\n')}\n\n## Organizations (${organizationLinks.length})\n\n${organizationLinks.join('\n')}\n`);
console.log(`Prepared ${peopleLinks.length} people and ${organizationLinks.length} organization review packets in docs/profile-review/generated/. No approvals created.`);
