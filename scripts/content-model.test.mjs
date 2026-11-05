import test from 'node:test';
import assert from 'node:assert/strict';
import { readContent, validateContent } from './lib/content.mjs';
import { GalleryFile } from '../src/content/schema/current/gallery.ts';
import { FILE_SCHEMAS, jsonSchema } from './content-schemas.mjs';
import Ajv from 'ajv';
const original = readContent();
const fixture = () => structuredClone(original);
const errors = data => validateContent(data, { checkAssets: false });
test('current gallery Zod schema rejects invalid records while accepting optional press', () => {
  const gallery = structuredClone(original.gallery);
  assert(GalleryFile.safeParse(gallery).success);
  delete gallery.press;
  assert(GalleryFile.safeParse(gallery).success);
  const data = fixture();
  delete data.gallery.press;
  assert.deepEqual(errors(data), []);
  gallery.photos[0].width = 0;
  gallery.photos[0].unexpected = true;
  const result = GalleryFile.safeParse(gallery);
  assert.equal(result.success, false);
  assert(result.error.issues.some(issue => issue.path.includes('width')));
  assert(result.error.issues.some(issue => issue.code === 'unrecognized_keys'));
});
test('Zod and editor schemas reject representative invalid content shapes', () => {
  const cases = [];
  const invalid = (name, mutate) => {
    const value = structuredClone(original[name]);
    mutate(value);
    cases.push([name, value]);
  };
  invalid('event', value => { value.events.find(event => event.status === 'current').tickets.booking.widgetUrl = 'https://example.com'; });
  invalid('event', value => { value.events.find(event => event.status === 'past').date = '2026-02-30'; });
  invalid('people', value => { value.people.find(person => person.events?.length).events[0].roles[0].unexpected = true; });
  invalid('organizations', value => { const item = value.organizations.find(org => org.contributions.some(c => c.eventId)).contributions.find(c => c.eventId); item.scope = 'historical'; });
  invalid('programme', value => { const item = value.entries.find(entry => entry.type === 'campus-workshop'); item.date = '2026-09-01'; delete item.eventUrl; });
  invalid('programme', value => { const item = value.entries.find(entry => entry.type === 'talk'); item.speakerIds.push(item.speakerIds[0]); });
  invalid('pages', value => { delete value.guidelines.title; });
  invalid('pages', value => { const ids = value.guidelines.sections[0].policyIds; ids.push(ids[0]); });
  invalid('gallery', value => { value.photos[0].width = 0; });
  const ajv = new Ajv({ allErrors: true, jsonPointers: true, schemaId: 'auto', format: 'full' });
  for (const [name, value] of cases) {
    assert.equal(FILE_SCHEMAS[name].safeParse(value).success, false, `${name}: Zod accepted invalid data`);
    assert.equal(ajv.compile(jsonSchema(name, FILE_SCHEMAS[name]))(value), false, `${name}: editor schema accepted invalid data`);
  }
});
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
test('each role kind carries only its own fields', () => {
  const data=fixture();
  const roleOf=(kind)=>data.people.people.flatMap(person=>person.events??[]).flatMap(entry=>entry.roles).find(role=>role.kind===kind);
  const ambassador=roleOf('ambassador');
  const {track}=ambassador; delete ambassador.track;
  assert(errors(data).some(error=>error.includes('people.json')));
  ambassador.track=track;
  const team=roleOf('core-team');
  const {responsibilities}=team; delete team.responsibilities;
  assert(errors(data).some(error=>error.includes('people.json')));
  team.responsibilities=responsibilities; team.track='student';
  assert(errors(data).some(error=>error.includes('people.json')));
  delete team.track;
  roleOf('speaker').community='GDG Indore';
  assert(errors(data).some(error=>error.includes('people.json')));
});
test('old per-person blocks are no longer accepted', () => {
  for (const field of ['ambassador','teamAssignments','undatedTeam','profession']) {
    const data=fixture(); data.people.people[0][field]={};
    assert(errors(data).some(error=>error.includes(field)), field);
  }
});
test('one person may have multiple roles at the same event', () => {
  const data=fixture(); const person=data.people.people.find(item=>item.events?.length);
  person.events[0].roles.push({kind:'volunteer',responsibilities:[{area:'Registration',level:'volunteer'}]});
  assert.deepEqual(errors(data), []);
  person.events.push(structuredClone(person.events[0]));
  assert(errors(data).some(error=>error.includes('person event: duplicate')));
});
test('responsibilities support multiple areas and reject duplicate areas on one role', () => {
  const data=fixture();
  const role=data.people.people.find(item=>item.id==='karan-mittal').events.find(item=>item.eventId==='devfest-2026').roles[0];
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
test('photos and press must point at an event that exists', () => {
  const data=fixture();
  data.gallery.photos.find(item=>item.eventId).eventId='devfest-1999';
  data.gallery.press[0].eventId='ccd-1999';
  const found=errors(data);
  assert(found.some(error=>error.includes('photo') && error.includes('unknown reference devfest-1999')));
  assert(found.some(error=>error.includes('press') && error.includes('unknown reference ccd-1999')));
});
test('reported event figures must be consistent', () => {
  const data=fixture();
  const edition=data.event.events.find(item=>item.id==='ccd-2022');
  edition.stats.students+=1;
  assert(errors(data).some(error=>error.includes('professionals and students must add up to attendees')));
  edition.stats.students-=1;
  edition.stats.attendees=edition.stats.registrations+1;
  assert(errors(data).some(error=>error.includes('attendees cannot exceed registrations')));
});
test('an event cover must be a photograph taken at that event', () => {
  const data=fixture();
  const edition=data.event.events.find(item=>item.id==='ccd-2022');
  edition.cover='devfest-2024-community';
  assert(errors(data).some(error=>error.includes('was not taken at this event')));
  edition.cover='no-such-photo';
  assert(errors(data).some(error=>error.includes('unknown cover photo no-such-photo')));
});
