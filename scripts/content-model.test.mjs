import test from 'node:test';
import assert from 'node:assert/strict';
import { readContent, validateContent } from './lib/content.mjs';
import { profileHash } from './lib/profile-review.mjs';
const original = readContent();
const fixture = () => structuredClone(original);
const errors = data => validateContent(data, { checkAssets: false });
function approveFixtureChanges(data) {
  for (const [kind,key,records] of [['people','personId',data.people.people],['organizations','organizationId',data.organizations.organizations]]) for (const record of records) {
    const hash=profileHash(data,kind,record.id);
    if (hash!==data.approvals.baselines[kind].find(item=>item[key]===record.id)?.recordHash && !data.approvals[kind].some(item=>item[key]===record.id && item.recordHash===hash) && !(kind==='people' && data.approvals.emailRedactions?.some(item=>item.personId===record.id && item.recordHash===hash))) data.approvals[kind].push({[key]:record.id,recordHash:hash,approvedOn:'2026-10-27',approvalReference:'Test fixture only'});
  }
}

test('published baseline survives the format migration', () => assert.deepEqual(errors(original), []));
test('event ticket settings and archived event references remain validated', () => {
  const data=fixture();
  data.event.events.find(item=>item.status==='current').tickets.booking.widgetUrl='https://example.com/widget';
  assert(errors(data).some(error=>error.includes('/tickets/booking/widgetUrl')));
  data.event.events.find(item=>item.status==='current').tickets.booking.widgetUrl=original.event.events.find(item=>item.status==='current').tickets.booking.widgetUrl;
  data.event.events.find(item=>item.status==='past').id=data.event.events.find(item=>item.status==='current').id;
  assert(errors(data).some(error=>error.includes('event registry: duplicate')));
});
test('event records have one current event and distinct explicit IDs', () => {
  const data=fixture();
  assert(data.event.events.some(item=>item.id==='devfest-2026' && item.status==='current'));
  assert(data.event.events.some(item=>item.id==='devfest-2025'));
  assert(data.event.events.some(item=>item.id==='ccd-2025'));
  data.event.events=data.event.events.filter(item=>item.status!=='current');
  assert(errors(data).some(error=>error.includes('exactly one current event')));
});
test('programme entries have valid types and unique IDs across the list', () => {
  const data=fixture();
  const workshop=data.programme.entries.find(item=>item.type==='campus-workshop');
  workshop.id=data.programme.entries.find(item=>item.type==='talk').id;
  assert(errors(data).some(error=>error.includes('programme entries: duplicate')));
  workshop.type='unknown';
  assert(errors(data).some(error=>error.includes('programme.json')));
});
test('old workshop links cannot collide with another programme ID', () => {
  const data=fixture();
  const workshop=data.programme.entries.find(item=>item.type==='campus-workshop');
  workshop.legacyId=data.programme.entries.find(item=>item.type==='talk').id;
  assert(errors(data).some(error=>error.includes('programme IDs and old links: duplicate')));
});
test('workshop photos resolve from the gallery independently of gallery visibility', () => {
  const data=fixture();
  const workshop=data.programme.entries.find(item=>item.type==='campus-workshop' && item.photoIds.length);
  const photo=data.gallery.photos.find(item=>item.id===workshop.photoIds[0]);
  photo.showInGallery=false;
  assert.deepEqual(errors(data), []);
  workshop.photoIds=['missing-photo'];
  assert(errors(data).some(error=>error.includes('unknown photo missing-photo')));
});
test('page content retains validation for themes, FAQs and the directory switch', () => {
  const data=fixture();
  data.pages.home.themes[0].icon='invalid';
  assert(errors(data).some(error=>error.includes('themes')));
  data.pages.home.themes=structuredClone(original.pages.home.themes);
  data.pages.faq.questions[0].answer='Unknown {{invalidToken}}';
  assert(errors(data).some(error=>error.includes('unknown template token')));
  data.pages.faq.questions=structuredClone(original.pages.faq.questions);
  data.pages.directory.enabled='yes';
  assert(errors(data).some(error=>error.includes('/directory/enabled')));
});
test('ambassador contact selection rejects unsupported platforms', () => {
  const data=fixture();
  const person=data.people.people.find(item=>item.ambassador);
  person.ambassador.contactPlatforms=['instagram'];
  assert(errors(data).some(error=>error.includes('contactPlatforms')));
});
test('one person may have multiple roles at the same event', () => {
  const data=fixture(); const person=data.people.people.find(item=>item.events?.length);
  person.events[0].roles.push({kind:'volunteer',title:'Volunteer',order:1});
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  person.events.push(structuredClone(person.events[0]));
  assert(errors(data).some(error=>error.includes('person event: duplicate')));
});
test('responsibilities support multiple areas and reject duplicate areas on one role', () => {
  const data=fixture();
  const role=data.people.people.find(item=>item.id==='karan-mittal').events.find(item=>item.id==='2026-karan-mittal').roles[0];
  assert.equal(role.responsibilities.length, 2);
  assert.deepEqual(errors(data), []);
  role.responsibilities.push({area:'programme & speakers',level:'co-lead'});
  assert(errors(data).some(error=>error.includes('responsibilities: duplicate')));
});
test('co-speakers must have participation in the same exact event', () => {
  const data=fixture(), talk=data.programme.entries.find(item=>item.type==='talk');
  const another=data.people.people.find(person=>!talk.speakerIds.includes(person.id) && person.events?.some(item=>item.eventId===talk.eventId && item.roles.some(role=>role.kind==='speaker')));
  talk.speakerIds.push(another.id);
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  another.events=another.events.filter(item=>item.eventId!==talk.eventId);
  assert(errors(data).some(error=>error.includes('speaker participation')));
});
test('a speaker snapshot must belong to a speaker on that talk', () => {
  const data=fixture(); data.programme.entries.find(item=>item.type==='talk').speakerProfiles=[{personId:'missing-person',role:'Example'}];
  assert(errors(data).some(error=>error.includes('profile: unknown reference')));
});
test('one organization may have several different contributions at one event', () => {
  const data=fixture(), organization=data.organizations.organizations[0], relationship=organization.contributions[0];
  organization.contributions.push({...relationship,id:'test-sponsor',type:'sponsor',title:'Test sponsorship'});
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  organization.contributions.push({...relationship,id:'duplicate-sponsor',type:'sponsor',title:'Duplicate'});
  assert(errors(data).some(error=>error.includes('contribution: duplicate')));
});
test('approval is tied to the complete profile revision', () => {
  const data=fixture(), person=data.people.people[0];
  data.approvals.people.push({personId:person.id,recordHash:profileHash(data,'people',person.id),approvedOn:'2026-10-27',approvalReference:'Test fixture only'});
  assert.deepEqual(errors(data), []);
  person.bio='A changed biography';
  assert(errors(data).some(error=>error.includes('fresh organizer approval')));
});
test('a new organization contribution invalidates its old approval', () => {
  const data=fixture(), organization=data.organizations.organizations[0];
  data.approvals.organizations.push({organizationId:organization.id,recordHash:profileHash(data,'organizations',organization.id),approvedOn:'2026-10-27',approvalReference:'Test fixture only'});
  organization.contributions[0].title='Changed contribution';
  assert(errors(data).some(error=>error.includes('fresh organizer approval')));
});
test('new public directories cannot launch with unapproved profiles or undated team memberships', () => {
  const data=fixture(); data.pages.directory.enabled=true;
  assert(errors(data).some(error=>error.includes('needs organizer approval')));
  assert(errors(data).some(error=>error.includes('undated legacy team')));
});

test('ambassador-only approval does not authorize a general profile or directory launch', () => {
  const data=fixture();
  const entry=data.approvals.people.find(item=>item.scope==='ambassador');
  assert(entry);
  data.pages.directory.enabled=true;
  assert(errors(data).some(error=>error.includes(`people ${entry.personId} needs organizer approval`)));
  data.pages.directory.enabled=false;
  delete data.people.people.find(person=>person.id===entry.personId).ambassador;
  assert(errors(data).some(error=>error.includes('ambassador scope requires directory membership')));
});

test('an unapproved baseline profile cannot silently change on the existing site', () => {
  const data=fixture(); data.people.people[0].name='Unapproved replacement';
  assert(errors(data).some(error=>error.includes('changed or new profile requires organizer approval')));
});

test('email-only redaction does not approve other profile changes or general directory launch', () => {
  const data=fixture(), receipt=data.approvals.emailRedactions[0];
  const person=data.people.people.find(item=>item.id===receipt.personId);
  assert(person && !person.links?.email);
  assert.deepEqual(errors(data), []);
  person.name+=' Changed';
  assert(errors(data).some(error=>error.includes(`${person.id}: changed or new profile requires organizer approval`)));
  person.name=person.name.replace(/ Changed$/, '');
  data.pages.directory.enabled=true;
  assert(errors(data).some(error=>error.includes(`people ${person.id} needs organizer approval`)));
  data.pages.directory.enabled=false;
  receipt.baselineHash='0'.repeat(64);
  assert(errors(data).some(error=>error.includes('original baseline mismatch')));
});

test('CCD speaking participation cannot stand in for DevFest participation in the same year', () => {
  const data=fixture();
  const talk=data.programme.entries.find(item=>item.id==='ccd-2025-karan-mcp-toolbox');
  assert.equal(talk.eventId,'ccd-2025');
  talk.eventId='devfest-2025';
  assert(errors(data).some(error=>error.includes('devfest-2025/karan-mittal')));
});
