import test from 'node:test';
import assert from 'node:assert/strict';
import { inventory, normalizeUrl, sourceState, buildHealth, validateCatalog } from '../scripts/radar_health.mjs';

test('URL deduplication drops tracking but preserves event selection', () => {
  assert.equal(normalizeUrl('https://www.joinnus.com/search/?utm_source=ig&city=Lima#top'), 'https://joinnus.com/search?city=Lima');
  assert.notEqual(normalizeUrl('https://joinnus.com/event?date=7'), normalizeUrl('https://joinnus.com/event?date=9'));
  const inv = inventory({ 'SOURCES.md': 'https://joinnus.com/search https://www.joinnus.com/search/' });
  assert.equal(inv.sources.filter(x => x.url.includes('joinnus')).length, 1);
});

test('Source inventory preserves unnamed routes, social candidates and excluded competitors', () => {
  const inv = inventory({ 'FUENTES_EXPANSION.md': '| 4. K-pop | https://teleticket.com.pe/todos | pendiente |', 'fuentes/Propuesta_Jahel_22_areas_2026-09-25.txt': '### 4. K-pop\n* **ARMY Perú:** Instagram @armyperuoficial\n* **Boletería:** https://www.teleticket.com.pe/todos\nhttps://www.vamoseventos.com/terms' });
  assert.deepEqual(inv.sources.find(x => x.url.includes('teleticket')).areas, [4]);
  assert.equal(inv.unresolvedSources.length, 1);
  assert.equal(inv.sources.find(x => x.url.includes('vamoseventos')).excluded, true);
  assert.ok(inv.sources.some(x => x.url.includes('passline')));
});

test('Domain searches do not count as content review or clear access restrictions', () => {
  const source = { url: 'https://joinnus.com/search', priority: 0 };
  const logs = [{ name: 'old', date: '2026-10-03', sources: [{ url: source.url, status: 'acceso restringido/error', contentReviewedThisRound: false, lastEvidence: '403' }] }, { name: 'recent', date: '2026-10-04', sources: [{ url: source.url, status: 'no revisada', contentReviewedThisRound: false, lastEvidence: 'Búsqueda agrupada por dominio' }] }];
  const result = sourceState(source, logs, '2026-10-04');
  assert.equal(result.pending, true);
  assert.equal(result.lastContentReview, null);
  assert.equal(result.lastAttempt, '2026-10-04');
});

test('Content review expires and an isolated ticket does not complete an agenda', () => {
  const source = { url: 'https://ticketmaster.pe/', priority: 0 };
  const logs = [{ name: 'review', date: '2026-10-04', sources: [{ url: 'https://ticketmaster.pe/event/bts', status: 'revisada con candidatos', contentReviewedThisRound: true, lastEvidence: '7/10 Lima' }] }];
  assert.equal(sourceState(source, logs, '2026-10-04').lastContentReview, null);
  logs[0].sources[0].url = source.url;
  assert.equal(sourceState(source, logs, '2026-10-04').pending, false);
  assert.equal(sourceState(source, logs, '2026-10-05').pending, true);
});

test('Health reports PR/main gap and zero inventory without claiming no events', () => {
  const item = { id: 'bts', kind: 'event', city: 'Lima', category: 'shows', title: 'BTS', tags: [], venue: 'San Marcos', reviewedAt: '2026-10-04', dates: ['2026-10-07'], url: 'https://www.ticketmaster.pe/event/bts' };
  const report = buildHealth({ documents: {}, logs: [], items: [item], baseline: [], today: '2026-10-04' });
  const day = report.calendar.find(d => d.date === '2026-10-07');
  assert.equal(day.proposed, 1); assert.equal(day.main, 0);
  assert.ok(report.warnings.some(w => w.includes('todavía no están integradas')));
  assert.ok(report.warnings.some(w => w.includes('Piura') && w.includes('cobertura por comprobar')));
  assert.equal(report.coverageComplete, false);
});

test('Catalog audit rejects incomplete tickets, duplicate IDs and invented season sessions', () => {
  const item = { id: 'one', kind: 'event', city: 'Lima', venue: 'Local', reviewedAt: '2026-10-04', dates: ['2026-10-07'], url: 'https://teleticket.com.pe/one' };
  assert.deepEqual(validateCatalog([item]), []);
  assert.ok(validateCatalog([item, item]).some(e => e.includes('duplicado')));
  assert.ok(validateCatalog([{ ...item, venue: '' }]).some(e => e.includes('incompleta')));
  assert.ok(validateCatalog([{ ...item, startDate: '2026-10-07', endDate: '2026-10-30' }]).some(e => e.includes('Rango')));
  assert.ok(validateCatalog([{ ...item, url: 'https://teleticket.com.pe.fake.example/event' }]).some(e => e.includes('Dominio')));
  assert.ok(validateCatalog([{ ...item, dates: ['2026-02-31'] }]).some(e => e.includes('Fecha inválida')));
});

test('Historical URLs remain in the queue and partial agenda review stays pending', () => {
  const logs = [{ name: 'coverage', date: '2026-10-05', sources: [{ url: 'https://ticketmaster.pe/', status: 'revisada con candidatos', contentReviewedThisRound: true, reviewScope: 'partial', lastEvidence: 'Solo destacados' }, { url: 'https://apj.org.pe/unresolved', status: 'no revisada' }] }];
  const report = buildHealth({ documents: { 'SOURCES.md': 'https://ticketmaster.pe/' }, logs, items: [], today: '2026-10-05' });
  assert.ok(report.queue.some(s => s.url === 'https://ticketmaster.pe/'));
  assert.ok(report.sources.some(s => s.url === 'https://apj.org.pe/unresolved' && s.observedOnly));
  assert.ok(report.warnings.some(w => w.includes('Agenda pendiente: ticketmaster')));
});

test('Audit flags accidental loss of active events from main', () => {
  const item = { id: 'gtn-new', kind: 'event', city: 'Lima', category: 'shows', title: 'New', tags: [], venue: 'GTN', reviewedAt: '2026-10-05', dates: ['2026-10-06'], url: 'https://granteatronacional.pe/evento/new' };
  const report = buildHealth({ documents: {}, logs: [], items: [], baseline: [item], today: '2026-10-05' });
  assert.ok(report.warnings.some(w => w.includes('gtn-new') && w.includes('pérdida de actualización')));
});
