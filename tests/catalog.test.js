import test from 'node:test';
import assert from 'node:assert/strict';
import { activities } from '../src/data/activities.js';
import { datesFor, dedupeActivities, filterActivities, safeSourceUrl, safePosterUrl, upcomingDate, upcomingSessions } from '../src/catalog.js';

const today = '2026-09-25';

test('Catalog contains no holes or duplicate IDs after editorial reconciliation', () => {
  assert.equal(activities.filter(Boolean).length, activities.length);
  assert.equal(new Set(activities.map(item => item.id)).size, activities.length);
});

test('Manual activity wins over an importer copy with the same source URL', () => {
  const manual = { id: 'manual', url: 'https://vaope.com/evento/demo?utm_source=radar', sessions: ['2026-10-11T19:00:00-05:00'] };
  const imported = { id: 'imported', url: 'https://vaope.com/evento/demo/', dates: ['2026-10-11'] };
  assert.deepEqual(dedupeActivities([manual, imported]), [manual]);
});

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
  const mali = { ...activities.find(item => item.id === 'mali-colecciones'), macroNode: 'Arte, Teatro, Cines & Cultura' };
  const list = filterActivities([mali], { city: 'Lima', category: 'culture', search: 'museo', favoritesOnly: true, favorites: ['mali-colecciones'] }, today);
  assert.deepEqual(list.map(item => item.id), ['mali-colecciones']);
});

test('External links only point to reviewed official source domains', () => {
  assert.ok(activities.every(item => safeSourceUrl(item.url)));
  assert.ok(activities.every(item => !item.imageUrl || safePosterUrl(item.imageUrl)));
  assert.equal(safePosterUrl('https://www.vamoseventos.com/some-poster.jpg'), false);
  assert.equal(safeSourceUrl('https://mali.pe.fake.example/offer'), false);
  assert.equal(safeSourceUrl('https://www.ticketmaster.pe/event/bts-world-tour-arirang'), true);
  assert.equal(safeSourceUrl('https://www.joinnus.com/events/example'), true);
  assert.equal(safeSourceUrl('https://www.gob.pe/institucion/igp/campañas/example'), true);
  assert.equal(safeSourceUrl('https://ticketmaster.pe.fake.example/event'), false);
  assert.equal(safeSourceUrl('https://joinnus.com.fake.example/event'), false);
  assert.equal(safeSourceUrl('javascript:alert(1)'), false);
  assert.equal(safeSourceUrl('https://centrocultural.pucp.edu.pe/teatro/item/5383'), true);
  assert.equal(safeSourceUrl('https://rustica.pe/shows/example'), true);
  assert.equal(safeSourceUrl('https://rustica.pe.fake.example/shows'), false);
});
test('CCPUCP October performances use explicit sessions, not calendar header ranges', () => {
  const item = activities.find(x => x.id === 'senor-milagros-ccpucp-oct-2026');
  assert.equal(item.sessions.length, 6);
  assert.deepEqual([...new Set(datesFor(item))], ['2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25', '2026-10-26']);
  assert.ok(!datesFor(item).includes('2026-10-27'));
});
test('October 21 radar additions preserve only explicit sessions', () => {
  const ids = ['mali-redes-codesido-21oct-2026', 'noche-mali-octubre-30oct-2026', 'jarana-pucp-29oct-2026', 'kate-candela-rustica-ica-30oct-2026'];
  assert.deepEqual(ids.map(id => activities.find(item => item.id === id)?.sessions?.length), [1, 1, 1, 1]);
  assert.equal(activities.find(item => item.id === 'jarana-pucp-29oct-2026').sessions[0], '2026-10-29T19:30:00-05:00');
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


test('Macro-node filters only include explicitly classified activities', () => {
  const classified = { ...activities[0], id: 'classified', category: 'shows', macroNode: 'Mascotas & Pet Friendly', dates: ['2026-09-25'] };
  const matches = filterActivities([classified], { category: 'family' }, today);
  assert.deepEqual(matches.map(item => item.id), ['classified']);
  assert.deepEqual(filterActivities([classified], { category: 'shows' }, today), []);
  const legacy = { ...activities[0], id: 'legacy', category: 'culture', dates: ['2026-09-25'] };
  assert.deepEqual(filterActivities([legacy], { category: 'culture' }, today), []);
  assert.deepEqual(filterActivities([legacy], { category: 'all' }, today).map(item => item.id), ['legacy']);
});

