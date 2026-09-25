import test from 'node:test';
import assert from 'node:assert/strict';
import { activities } from '../src/data/activities.js';
import { datesFor, filterActivities, safeSourceUrl } from '../src/catalog.js';

const today = '2026-09-25';

test('Today shows only events with confirmed dates, not evergreen guides', () => {
  const list = filterActivities(activities, { when: 'today' }, today);
  assert.deepEqual(list.map(item => item.id).sort(), ['ballet-vivaldi-gtn-2026', 'dinosaurios-ica-2026', 'noche-mali-septiembre-2026']);
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
  assert.equal(safeSourceUrl('https://mali.pe.fake.example/offer'), false);
  assert.equal(safeSourceUrl('javascript:alert(1)'), false);
});
