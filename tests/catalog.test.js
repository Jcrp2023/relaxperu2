import test from 'node:test';
import assert from 'node:assert/strict';
import { activities } from '../src/data/activities.js';
import { datesFor, filterActivities, safeSourceUrl, safePosterUrl, upcomingDate, upcomingSessions } from '../src/catalog.js';

const today = '2026-09-25';

test('Today shows only events with confirmed dates, not evergreen guides', () => {
  const list = filterActivities(activities, { when: 'today' }, today);
  assert.ok(list.every(item => item.kind === 'event' && datesFor(item).includes(today)));
  assert.ok(list.some(item => item.id === 'annie-surco-2026'));
  assert.ok(list.some(item => item.id === 'noche-mali-septiembre-2026'));
});

test('Exact date includes only confirmed events on that day', () => {
  const list = filterActivities(activities, { exactDate: '2026-09-27' }, today);
  assert.ok(list.some(item => item.id === '5sos-costa21-2026'));
  assert.ok(!list.some(item => item.kind !== 'event'));
  assert.ok(!list.some(item => item.id === 'noche-mali-septiembre-2026'));
});

test('Date filters do not imply every day in a festival date range has a session', () => {
  const festival = activities.find(item => item.id === 'suncine-mali-2026');
  assert.deepEqual(datesFor(festival), ['2026-09-26', '2026-09-27']);
  assert.ok(!filterActivities(activities, { when: 'today' }, today).includes(festival));
});

test('Old events expire while destination guides remain discoverable', () => {
  const later = filterActivities(activities, { city: 'Cusco' }, '2026-10-01');
  assert.ok(later.some(item => item.id === 'cusco-rutas'));
  assert.ok(later.some(item => item.id === 'queca-cusco-2026'));
  assert.ok(!filterActivities(activities, {}, '2026-10-01').some(item => item.id === '5sos-costa21-2026'));
  assert.ok(filterActivities(activities, {}, '2026-10-01').some(item => item.id === 'hombres-g-2026'));
});

test('Combined filters and local favorites work without an account', () => {
  const list = filterActivities(activities, { city: 'Lima', category: 'culture', search: 'museo', favoritesOnly: true, favorites: ['mali-colecciones'] }, today);
  assert.deepEqual(list.map(item => item.id), ['mali-colecciones']);
});

test('External links only point to reviewed official source domains', () => {
  assert.ok(activities.every(item => safeSourceUrl(item.url)));
  assert.ok(activities.every(item => !item.imageUrl || safePosterUrl(item.imageUrl)));
  assert.equal(safePosterUrl('https://www.vamoseventos.com/some-poster.jpg'), false);
  assert.equal(safeSourceUrl('https://mali.pe.fake.example/offer'), false);
  assert.equal(safeSourceUrl('javascript:alert(1)'), false);
});

test('Started sessions stop appearing as upcoming while later sessions remain', () => {
  const now = new Date('2026-09-29T20:15:00-05:00');
  const base = { id: 'dated-example', title: 'Example', kind: 'event', tags: [] };
  const started = { ...base, sessions: ['2026-09-29T20:00:00-05:00'] };
  assert.deepEqual(filterActivities([started], { when: 'today' }, '2026-09-29', now), []);
  const later = { ...base, sessions: [...started.sessions, '2026-09-29T21:00:00-05:00', '2026-10-01T20:00:00-05:00'] };
  assert.equal(filterActivities([later], { when: 'today' }, '2026-09-29', now).length, 1);
  assert.equal(upcomingSessions(later, now).length, 2);
  assert.equal(upcomingDate(later, '2026-09-29', new Date('2026-09-29T22:00:00-05:00')), '2026-10-01');
  const unknownTime = { ...base, dates: ['2026-09-29'] };
  assert.equal(filterActivities([unknownTime], { when: 'today' }, '2026-09-29', now).length, 1);
});

test('Lima day survives UTC midnight when filtering confirmed sessions', () => {
  const now = new Date('2026-09-30T01:15:00Z');
  const event = { id: 'evening', title: 'Evening', tags: [], kind: 'event', sessions: ['2026-09-29T21:00:00-05:00'] };
  assert.equal(filterActivities([event], { when: 'today' }, '2026-09-29', now).length, 1);
});
