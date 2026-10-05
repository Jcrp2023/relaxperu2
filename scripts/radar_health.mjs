/** Offline editorial audit. Never fetches a source or treats a failure as no events. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { datesFor, filterActivities, limaDate, safeSourceUrl } from '../src/catalog.js';

export const DOCUMENTS = ['SOURCES.md', 'FUENTES_MACRONODULOS.md', 'FUENTES_EXPANSION.md', 'fuentes/Propuesta_Jahel_22_areas_2026-09-25.txt'];
export const TICKETING = ['teleticket.com.pe', 'joinnus.com', 'ticketmaster.pe', 'vaope.com', 'feverup.com', 'eventbrite.com.pe', 'passline.com'];
const REGIONS = ['Lima', 'Cusco', 'Ica', 'Piura', 'Iquitos'];
const CATEGORIES = ['shows', 'travel', 'food', 'culture', 'family', 'wellness', 'sports'];
const URL_RE = /https?:\/\/[^\s<>`\]\)"']+/g;

export function normalizeUrl(value) {
  const u = new URL(value.replace(/[.,;]+$/, ''));
  u.hostname = u.hostname.replace(/^www\./, '');
  u.hash = '';
  for (const key of [...u.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) u.searchParams.delete(key);
  u.searchParams.sort();
  u.pathname = u.pathname.replace(/\/$/, '') || '/';
  return u.href;
}

export function inventory(documents) {
  const urls = new Map(); const areas = new Map(); const unresolved = new Map();
  for (const [document, text] of Object.entries(documents)) {
    let area = null;
    for (const line of text.split('\n')) {
      const heading = line.match(/^### (\d+)\. (.+)/);
      const row = line.match(/^\| (\d+)\. ([^|]+)\|/);
      if (heading) area = Number(heading[1]);
      const number = row ? Number(row[1]) : area;
      if (document === 'FUENTES_EXPANSION.md' && row) areas.set(number, row[2].trim());
      const links = [...line.matchAll(URL_RE)].map(m => m[0]);
      for (const link of links) {
        const url = normalizeUrl(link); const host = new URL(url).hostname;
        const excluded = host === 'vamoseventos.com' || host.endsWith('.vamoseventos.com');
        const referenceOnly = /^(vercel\.com|platform\.openai\.com|github\.com)$/.test(host) || /\/platform\/docs\//.test(url);
        const item = urls.get(url) || { url, areas: [], documents: [], excluded, referenceOnly, priority: TICKETING.includes(host) ? 0 : 1 };
        if ((row || document.endsWith('.txt')) && number >= 1 && number <= 22 && !item.areas.includes(number)) item.areas.push(number);
        if (!item.documents.includes(document)) item.documents.push(document);
        urls.set(url, item);
      }
      if (document.endsWith('.txt') && /^\* \*\*/.test(line) && !links.length) {
        const label = line.replace(/^\* /, '').trim();
        if (!unresolved.has(label)) unresolved.set(label, { label, area: number, status: 'identidad/URL pendiente' });
      }
    }
  }
  // A required public route remains visible even if omitted from the prose.
  const passline = 'https://www.passline.com/';
  const key = normalizeUrl(passline);
  if (!urls.has(key)) urls.set(key, { url: key, areas: [10], documents: ['requisito editorial'], excluded: false, referenceOnly: false, priority: 0 });
  return { sources: [...urls.values()], areas: [...areas].map(([id, label]) => ({ id, label })), unresolvedSources: [...unresolved.values()] };
}

export function sourceState(source, logs, today) {
  let lastAttempt = null; let lastContentReview = null; let latestStatus = 'no revisada'; let evidenceRecord = null; let lastAccessIssue = null; let lastReviewScope = null; let nextAction = 'Revisar agenda oficial vigente y sus fichas individuales.';
  for (const log of [...logs].sort((a, b) => a.name.localeCompare(b.name))) {
    for (const record of log.sources || []) {
      if (!record.url || normalizeUrl(record.url) !== source.url) continue;
      const date = record.consultedAt || log.date;
      if (date && (!lastAttempt || date >= lastAttempt)) { lastAttempt = date; latestStatus = record.status; nextAction = record.nextAction || nextAction; }
      if (record.status === 'acceso restringido/error' && (!lastAccessIssue || date >= lastAccessIssue.date)) lastAccessIssue = { date, error: record.error || record.lastEvidence || 'Error sin detalle', record: log.name };
      // Opening a homepage, a domain search, or reporting an error is not a content review.
      if (record.contentReviewedThisRound === true && /^revisada /.test(record.status || '') && record.lastEvidence && date && (!lastContentReview || date >= lastContentReview)) {
        lastContentReview = date; evidenceRecord = `${log.name}#${source.url}`; lastReviewScope = record.reviewScope || 'content';
      }
    }
  }
  const ageDays = lastContentReview ? Math.floor((Date.parse(today) - Date.parse(lastContentReview.slice(0, 10))) / 86400000) : null;
  const freshnessDays = source.priority === 0 ? 1 : 7;
  const pending = !lastContentReview || ageDays < 0 || ageDays >= freshnessDays || lastReviewScope === 'partial' || !/^revisada /.test(latestStatus || '');
  return { ...source, lastAttempt, lastContentReview, ageDays, latestStatus, lastReviewScope, evidenceRecord, lastAccessIssue, nextAction, pending: source.excluded || source.referenceOnly ? false : pending };
}

export function validateCatalog(items) {
  const errors = []; const ids = new Set();
  const validDate = d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && Number.isFinite(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d;
  for (const item of items) {
    if (!item || !item.id || ids.has(item.id)) errors.push(`ID vacío/duplicado: ${item?.id}`);
    ids.add(item?.id);
    if (!safeSourceUrl(item?.url)) errors.push(`Dominio sin validar: ${item?.id}`);
    if (item?.kind !== 'event') continue;
    if (!item.city || !item.venue || !item.reviewedAt || !datesFor(item).length) errors.push(`Ficha incompleta: ${item.id}`);
    // Explicit dates/sessions only for dated events. Season ranges belong to experiences.
    if (item.startDate || item.endDate) errors.push(`Rango no equivale a sesiones: ${item.id}`);
    if ((item.dates || []).some(d => !validDate(d))) errors.push(`Fecha inválida: ${item.id}`);
    if ((item.sessions || []).some(d => !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-05:00$/.test(d) || !Number.isFinite(Date.parse(d)))) errors.push(`Sesión inválida: ${item.id}`);
  }
  return errors;
}

export function buildHealth({ documents, logs, items, baseline = null, today, revision = null }) {
  const inv = inventory(documents);
  // Keep individual routes and unresolved source history, even after prose changes.
  for (const log of logs) for (const record of log.sources || []) {
    if (!record.url) continue;
    const url = normalizeUrl(record.url); const host = new URL(url).hostname;
    if (!inv.sources.some(s => s.url === url)) inv.sources.push({ url, areas: [], documents: [log.name], observedOnly: true, excluded: host === 'vamoseventos.com' || host.endsWith('.vamoseventos.com'), referenceOnly: false, priority: TICKETING.includes(host) ? 0 : 1 });
  }
  const sources = inv.sources.map(s => sourceState(s, logs, today));
  const dates = Array.from({ length: 8 }, (_, n) => new Date(Date.parse(`${today}T12:00:00Z`) + n * 86400000).toISOString().slice(0, 10));
  const counts = (catalog, date, city) => filterActivities(catalog, { exactDate: date, city }, today).filter(x => x.kind === 'event').length;
  const calendar = dates.map(date => ({ date, proposed: counts(items, date, 'all'), main: baseline ? counts(baseline, date, 'all') : null, cities: Object.fromEntries(REGIONS.map(city => [city, counts(items, date, city)])) }));
  const queue = sources.filter(s => s.pending).sort((a, b) => a.priority - b.priority || (b.ageDays ?? 99999) - (a.ageDays ?? 99999) || a.url.localeCompare(b.url));
  const regionCategories = Object.fromEntries(REGIONS.map(city => [city, Object.fromEntries(CATEGORIES.map(category => [category, filterActivities(items, { city, category, when: 'week' }, today).filter(x => x.kind === 'event').length]))]));
  const warnings = [];
  if (queue.length) warnings.push(`${queue.length} rutas pendientes o desactualizadas; esto no prueba ausencia de eventos.`);
  if (inv.unresolvedSources.length) warnings.push(`${inv.unresolvedSources.length} fuentes nombradas por Jahel requieren identidad/URL.`);
  for (const host of TICKETING) {
    const routes = sources.filter(s => new URL(s.url).hostname === host && !s.observedOnly && !s.excluded && !s.referenceOnly);
    if (!routes.some(s => !s.pending)) warnings.push(`Agenda pendiente: ${host}. Una ficha aislada no completa su cartelera.`);
  }
  for (const area of inv.areas) if (!sources.some(s => s.areas.includes(area.id) && !s.pending && !s.excluded && !s.referenceOnly)) warnings.push(`Área ${area.id}: sin revisión de contenido vigente registrada.`);
  for (const city of REGIONS) if (!calendar.some(day => day.cities[city])) warnings.push(`${city}: sin fichas en los próximos 8 días; cobertura por comprobar.`);
  if (baseline && calendar.some(day => day.proposed > day.main)) warnings.push('Hay altas propuestas que todavía no están integradas en main. No afirmar que se ven en la web.');
  if (baseline) for (const event of baseline.filter(x => x.kind === 'event' && datesFor(x).some(d => d >= today))) {
    if (!items.some(x => x.id === event.id || (x.url && normalizeUrl(x.url) === normalizeUrl(event.url) && datesFor(x).some(d => datesFor(event).includes(d))))) warnings.push(`Ficha vigente de main ausente en la propuesta: ${event.id}. Verificar cancelación o pérdida de actualización.`);
  }
  return { schemaVersion: 1, date: today, timezone: 'America/Lima', revision, coverageComplete: queue.length === 0 && inv.unresolvedSources.length === 0, contentReviews: sources.filter(s => s.lastContentReview).length, sources, queue: queue.map(s => ({ url: s.url, priority: s.priority, areas: s.areas, lastContentReview: s.lastContentReview, nextAction: s.nextAction })), areas: inv.areas, unresolvedSources: inv.unresolvedSources, calendar, regionCategories, warnings, validationErrors: validateCatalog(items) };
}

async function catalogFrom(root, ref = null) {
  const read = p => ref ? execFileSync('git', ['show', `${ref}:${p}`], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) : fs.readFileSync(path.join(root, p), 'utf8');
  const manual = await import(`data:text/javascript;base64,${Buffer.from(read('src/data/activities.js')).toString('base64')}`);
  return [...manual.activities, ...JSON.parse(read('src/data/auto-activities.json')), ...JSON.parse(read('src/data/vaope-activities.json'))];
}

export async function run(root, args) {
  const option = name => args.includes(name) ? args[args.indexOf(name) + 1] : null;
  const today = option('--date') || limaDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || !Number.isFinite(Date.parse(today))) throw new Error('Fecha inválida');
  const documents = Object.fromEntries(DOCUMENTS.map(p => [p, fs.readFileSync(path.join(root, p), 'utf8')]));
  const logs = fs.readdirSync(path.join(root, 'fuentes')).filter(p => /^cobertura-fuentes-.*\.json$/.test(p)).map(name => ({ ...JSON.parse(fs.readFileSync(path.join(root, 'fuentes', name), 'utf8')), name: `fuentes/${name}` }));
  const items = await catalogFrom(root); let baseline = null; const baseRef = option('--base-ref');
  if (baseRef) baseline = await catalogFrom(root, baseRef);
  let revision = null; try { revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); } catch { /* connector workspace */ }
  const report = buildHealth({ documents, logs, items, baseline, today, revision });
  for (const p of ['src/catalog.js', 'src/data/activities.js', 'src/data/auto-activities.json', 'src/data/vaope-activities.json']) if (fs.readFileSync(path.join(root, p), 'utf8') !== fs.readFileSync(path.join(root, 'relaxperu-main', p), 'utf8')) report.validationErrors.push(`Copias distintas: ${p}`);
  if (report.areas.length !== 22) report.validationErrors.push('La matriz debe conservar las 22 áreas.');
  const output = option('--output') || 'fuentes/radar-health.json';
  fs.mkdirSync(path.dirname(path.resolve(root, output)), { recursive: true });
  fs.writeFileSync(path.resolve(root, output), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${report.date}: ${items.length} fichas; ${report.queue.length} rutas pendientes; ${report.unresolvedSources.length} identidades pendientes.`);
  for (const w of report.warnings) console.log(`AVISO: ${w}`);
  if (report.validationErrors.length) throw new Error(report.validationErrors.join('\n'));
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) run(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
