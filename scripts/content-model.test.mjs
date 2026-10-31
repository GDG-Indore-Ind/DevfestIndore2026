import test from 'node:test';
import assert from 'node:assert/strict';
import { readContent, validateContent } from './lib/content.mjs';
const original = readContent();
const fixture = () => structuredClone(original);
const errors = data => validateContent(data, { checkAssets: false });
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
test('page content retains validation for themes and FAQs', () => {
  const data=fixture();
  data.pages.home.themes[0].icon='invalid';
  assert(errors(data).some(error=>error.includes('themes')));
  data.pages.home.themes=structuredClone(original.pages.home.themes);
  data.pages.faq.questions[0].answer='Unknown {{invalidToken}}';
  assert(errors(data).some(error=>error.includes('unknown template token')));
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
  assert.deepEqual(errors(data), []);
  organization.contributions.push({...relationship,id:'duplicate-sponsor',type:'sponsor',title:'Duplicate'});
  assert(errors(data).some(error=>error.includes('contribution: duplicate')));
});
test('CCD speaking participation cannot stand in for DevFest participation in the same year', () => {
  const data=fixture();
  const talk=data.programme.entries.find(item=>item.id==='ccd-2025-karan-mcp-toolbox');
  assert.equal(talk.eventId,'ccd-2025');
  talk.eventId='devfest-2025';
  assert(errors(data).some(error=>error.includes('devfest-2025/karan-mittal')));
});
