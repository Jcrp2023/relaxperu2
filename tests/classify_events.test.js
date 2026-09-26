import test from 'node:test';
import assert from 'node:assert/strict';
import { applyClassification, buildHashtags, classifyBatch, BATCH_SIZE, MACRO_NODES, MODEL } from '../scripts/classify_events.mjs';

const event = {
  id: 'event-1',
  kind: 'event',
  category: 'shows',
  title: 'Concierto gratuito de salsa',
  description: 'Entrada libre en San Juan de Lurigancho.',
  city: 'Lima',
  district: 'San Juan de Lurigancho',
  venue: 'Plaza',
  dates: ['2026-10-01'],
  source: 'Organizador',
  url: 'https://example.org/evento',
  tags: ['salsa'],
};

test('hashtags are derived from source fields, not invented model output', () => {
  const tags = buildHashtags(event);
  assert.ok(tags.includes('#Salsa'));
  assert.ok(tags.includes('#Gratis'));
  assert.ok(tags.includes('#SJL'));
  assert.ok(tags.includes('#Lima'));
  assert.ok(!tags.includes('#PetFriendly'));
});

test('classification preserves factual event fields and flags low confidence', () => {
  const result = applyClassification([event], [{
    id: 'event-1',
    macroNode: MACRO_NODES[0],
    subcategory: 'Concierto',
    confidence: 'low',
  }])[0];
  assert.equal(result.url, event.url);
  assert.deepEqual(result.dates, event.dates);
  assert.equal(result.macroNode, MACRO_NODES[0]);
  assert.equal(result.classificationNeedsReview, true);
});

test('batch requests use strict structured output and reject partial or invalid IDs', async () => {
  let request;
  const answer = { items: [{ id: 'event-1', macroNode: MACRO_NODES[0], subcategory: 'Concierto', confidence: 'high' }] };
  const result = await classifyBatch([event], {
    apiKey: 'test-key',
    fetchImpl: async (url, options) => {
      request = { url, options, body: JSON.parse(options.body) };
      return { ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(answer) } }] }) };
    },
  });
  assert.equal(result[0].id, event.id);
  assert.equal(request.body.model, MODEL);
  assert.equal(request.body.response_format.json_schema.strict, true);
  assert.equal(request.body.messages[1].content.includes(event.url), false);
  await assert.rejects(classifyBatch(Array(BATCH_SIZE + 1).fill(event), { apiKey: 'x' }), /Batch size/);
  await assert.rejects(classifyBatch([event], {
    apiKey: 'x',
    fetchImpl: async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify({ items: [] }) } }] }) }),
  }), /omitted/);
});
