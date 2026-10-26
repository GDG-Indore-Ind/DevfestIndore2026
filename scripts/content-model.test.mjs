import test from 'node:test';
import assert from 'node:assert/strict';
import { readContent, validateContent } from './lib/content.mjs';
import { profileHash } from './lib/profile-review.mjs';
const original = readContent();
const fixture = () => structuredClone(original);
const errors = data => validateContent(data, { checkAssets: false });
function approveFixtureChanges(data) {
  for (const [kind,key,records] of [['people','personId',data.people.people],['organizations','organizationId',data.partners.organizations]]) for (const record of records) {
    const hash=profileHash(data,kind,record.id);
    if (hash!==data.approvals.baselines[kind].find(item=>item[key]===record.id)?.recordHash && !data.approvals[kind].some(item=>item[key]===record.id && item.recordHash===hash) && !(kind==='people' && data.approvals.emailRedactions?.some(item=>item.personId===record.id && item.recordHash===hash))) data.approvals[kind].push({[key]:record.id,recordHash:hash,approvedOn:'2026-10-27',approvalReference:'Test fixture only'});
  }
}

test('published baseline survives the format migration', () => assert.deepEqual(errors(original), []));
test('ambassador directory rejects retired invitation records and non-LinkedIn contact options', () => {
  const data=fixture();
  data.ambassadors.ambassadors={ 'old-invitation': { name:'Example',college:'Example',coupon:'EXAMPLE',discount:'Example' } };
  assert(errors(data).some(error=>error.includes('ambassadors')));
  delete data.ambassadors.ambassadors;
  data.ambassadors.directory[0].contactPlatforms=['instagram'];
  assert(errors(data).some(error=>error.includes('contactPlatforms')));
});
test('one person may have multiple roles at the same event', () => {
  const data=fixture(); data.participations.participations[0].roles.push({kind:'volunteer',title:'Volunteer',order:1});
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  data.participations.participations.push(structuredClone(data.participations.participations[0]));
  assert(errors(data).some(error=>error.includes('person event: duplicate')));
});
test('responsibilities support multiple areas and reject duplicate areas on one role', () => {
  const data=fixture();
  const role=data.participations.participations.find(item=>item.id==='2026-karan-mittal').roles[0];
  assert.equal(role.responsibilities.length, 2);
  assert.deepEqual(errors(data), []);
  role.responsibilities.push({area:'programme & speakers',level:'co-lead'});
  assert(errors(data).some(error=>error.includes('responsibilities: duplicate')));
});
test('co-speakers must have participation in the same exact event', () => {
  const data=fixture(), talk=data.sessions.sessions[0];
  const another=data.participations.participations.find(item=>item.eventId===talk.editionId&&!talk.speakerIds.includes(item.personId));
  talk.speakerIds.push(another.personId);
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  data.participations.participations=data.participations.participations.filter(item=>item.id!==another.id);
  assert(errors(data).some(error=>error.includes('speaker participation')));
});
test('a speaker snapshot must belong to a speaker on that talk', () => {
  const data=fixture(); data.sessions.sessions[0].speakerProfiles=[{personId:'missing-person',role:'Example'}];
  assert(errors(data).some(error=>error.includes('profile: unknown reference')));
});
test('one organization may have several different contributions at one event', () => {
  const data=fixture(), relationship=data.partners.organizations[0].partnerships[0];
  relationship.contributions.push({kind:'sponsor',role:'Test sponsorship'});
  approveFixtureChanges(data);
  assert.deepEqual(errors(data), []);
  relationship.contributions.push({kind:'sponsor',role:'Duplicate'});
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
  const data=fixture(), organization=data.partners.organizations[0];
  data.approvals.organizations.push({organizationId:organization.id,recordHash:profileHash(data,'organizations',organization.id),approvedOn:'2026-10-27',approvalReference:'Test fixture only'});
  organization.partnerships[0].contributions[0].role='Changed contribution';
  assert(errors(data).some(error=>error.includes('fresh organizer approval')));
});
test('new public directories cannot launch with unapproved profiles or undated team memberships', () => {
  const data=fixture(); data.directory.enabled=true;
  assert(errors(data).some(error=>error.includes('needs organizer approval')));
  assert(errors(data).some(error=>error.includes('undated legacy team')));
});

test('ambassador-only approval does not authorize a general profile or directory launch', () => {
  const data=fixture();
  const entry=data.approvals.people.find(item=>item.scope==='ambassador');
  assert(entry);
  data.directory.enabled=true;
  assert(errors(data).some(error=>error.includes(`people ${entry.personId} needs organizer approval`)));
  data.directory.enabled=false;
  data.ambassadors.directory=data.ambassadors.directory.filter(item=>item.personId!==entry.personId);
  assert(errors(data).some(error=>error.includes('ambassador scope requires directory membership')));
});

test('an unapproved baseline profile cannot silently change on the existing site', () => {
  const data=fixture(); data.people.people[0].name='Unapproved replacement';
  assert(errors(data).some(error=>error.includes('changed or new profile requires organizer approval')));
});

test('email-only redaction does not approve other profile changes or general directory launch', () => {
  const data=fixture(), receipt=data.approvals.emailRedactions[0];
  const person=data.people.people.find(item=>item.id===receipt.personId);
  assert(person && !person.socials?.email);
  assert.deepEqual(errors(data), []);
  person.name+=' Changed';
  assert(errors(data).some(error=>error.includes(`${person.id}: changed or new profile requires organizer approval`)));
  person.name=person.name.replace(/ Changed$/, '');
  data.directory.enabled=true;
  assert(errors(data).some(error=>error.includes(`people ${person.id} needs organizer approval`)));
  data.directory.enabled=false;
  receipt.baselineHash='0'.repeat(64);
  assert(errors(data).some(error=>error.includes('original baseline mismatch')));
});

test('CCD speaking participation cannot stand in for DevFest participation in the same year', () => {
  const data=fixture();
  const talk=data.sessions.sessions.find(item=>item.id==='ccd-2025-karan-mcp-toolbox');
  assert.equal(talk.editionId,'ccd-2025');
  talk.editionId='2025';
  assert(errors(data).some(error=>error.includes('2025/karan-mittal')));
});
