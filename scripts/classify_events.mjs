import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const MODEL = 'gpt-4o-mini';
export const BATCH_SIZE = 25;
export const MACRO_NODES = [
  'Música, Conciertos & Salsódromos',
  'Gastronomía, Huariques, Catas & Viñedos',
  'Arte, Teatro, Cines & Cultura',
  'Estilo de Vida, Solteros, K-Pop & Geek',
  'Mascotas & Pet Friendly',
  'Deporte, Fitness & Running Clubs',
  'Turismo Regional, Naturaleza & Agendas Municipales',
];

const responseSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          macroNode: { type: 'string', enum: MACRO_NODES },
          subcategory: { type: 'string' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['id', 'macroNode', 'subcategory', 'confidence'],
        additionalProperties: false,
      },
    },
  },
  required: ['items'],
  additionalProperties: false,
};

const safeText = value => typeof value === 'string' ? value : '';
const normalize = value => safeText(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function buildHashtags(event) {
  const values = new Set();
  const candidates = [...(Array.isArray(event.tags) ? event.tags : [])];
  const place = [event.district, event.city].filter(Boolean);
  for (const label of [...candidates, ...place]) {
    const clean = safeText(label).replace(/^#+/, '').trim();
    if (!clean) continue;
    const slug = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '');
    if (slug && slug.length <= 32) values.add(`#${slug}`);
  }

  const evidence = normalize([event.title, event.description, ...candidates].join(' '));
  if (/\b(gratis|gratuito|gratuita|free|entrada libre)\b/.test(evidence)) values.add('#Gratis');
  if (/pet[ -]?friendly|mascotas/.test(evidence)) values.add('#PetFriendly');
  if (/\b(k-pop|kpop)\b/.test(evidence)) values.add('#KPop');
  if (/\b(salsa|salsodromo)\b/.test(evidence)) values.add('#Salsa');
  if (/\b(running|carrera|trote)\b/.test(evidence)) values.add('#Running');
  if (/\b(ajedrez)\b/.test(evidence)) values.add('#Ajedrez');
  if (normalize(event.district).includes('san juan de lurigancho')) values.add('#SJL');

  return [...values];
}

export async function classifyBatch(events, { apiKey, fetchImpl = fetch }) {
  if (!Array.isArray(events) || events.length < 1 || events.length > BATCH_SIZE) {
    throw new Error(`Batch size must be between 1 and ${BATCH_SIZE}`);
  }
  const input = events.map(({ id, kind, category, title, titleEn, description, city, district, venue, tags }) => ({
    id, kind, category, title, titleEn, description, city, district, venue, tags,
  }));

  const response = await fetchImpl('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: 'Clasifica cada actividad usando exclusivamente la información recibida. No investigues ni inventes datos del evento. Asigna exactamente uno de los siete macro-nódulos permitidos y una subcategoría breve. Usa confidence low si el texto no permite clasificarla con seguridad. Devuelve todos los IDs una sola vez.',
        },
        { role: 'user', content: JSON.stringify(input) },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'relaxperu_classifications', strict: true, schema: responseSchema },
      },
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`OpenAI request failed (${response.status}): ${detail}`);
  }
  const payload = await response.json();
  const raw = payload.choices?.[0]?.message?.content;
  if (!raw) throw new Error('OpenAI returned an empty classification response');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.items)) throw new Error('Structured response is missing items');

  const requestedIds = new Set(events.map(event => event.id));
  const seen = new Set();
  for (const item of parsed.items) {
    if (!requestedIds.has(item.id) || seen.has(item.id)) throw new Error('Response contains an unknown or repeated event ID');
    if (!MACRO_NODES.includes(item.macroNode) || !safeText(item.subcategory).trim()) throw new Error('Response contains an invalid classification');
    seen.add(item.id);
  }
  if (seen.size !== requestedIds.size) throw new Error('Response omitted one or more event IDs');
  return parsed.items;
}

export function applyClassification(events, classifications) {
  const byId = new Map(classifications.map(item => [item.id, item]));
  return events.map(event => {
    const result = byId.get(event.id);
    if (!result) return event;
    return {
      ...event,
      macroNode: result.macroNode,
      subcategory: result.subcategory.trim().slice(0, 80),
      classificationConfidence: result.confidence,
      classificationNeedsReview: result.confidence === 'low',
      hashtags: buildHashtags(event),
    };
  });
}

async function classifyFile(file, apiKey) {
  const original = JSON.parse(await readFile(file, 'utf8'));
  if (!Array.isArray(original)) throw new Error(`Expected an array in ${file}`);
  let events = original;
  const pending = events.filter(event => !event.macroNode);
  if (!pending.length) return { file, classified: 0, failed: 0 };

  let classified = 0;
  let failed = 0;
  for (let start = 0; start < pending.length; start += BATCH_SIZE) {
    const batch = pending.slice(start, start + BATCH_SIZE);
    try {
      const result = await classifyBatch(batch, { apiKey });
      const ids = new Set(result.map(item => item.id));
      events = applyClassification(events, result);
      classified += ids.size;
      await writeFile(file, `${JSON.stringify(events, null, 2)}\n`);
    } catch (error) {
      failed += batch.length;
      console.error(`Classification skipped for ${file} batch ${Math.floor(start / BATCH_SIZE) + 1}: ${error.message}`);
    }
  }
  return { file, classified, failed };
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('OPENAI_API_KEY is not configured; skipping optional classification.');
    return;
  }

  const files = ['src/data/auto-activities.json', 'src/data/vaope-activities.json'];
  let total = 0;
  for (const file of files) {
    const result = await classifyFile(file, apiKey);
    total += result.classified;
    console.log(`${result.file}: ${result.classified} classified, ${result.failed} left unchanged`);
  }

  for (const source of files) {
    const duplicate = path.join('relaxperu-main', source);
    try { await copyFile(source, duplicate); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  console.log(`New classifications added: ${total}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
