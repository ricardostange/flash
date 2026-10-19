import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DAY, emptyStore, localDate, nextProgress, validateStore } from '../src/scheduler.ts';
import { cards, explanations, subjects, descendantIds, subjectPath } from '../src/content.ts';

test('new cards have predictable review intervals', () => {
  for (const [rating, interval] of [['again', 1 / 1440], ['hard', 1], ['good', 1], ['easy', 4]]) {
    const p = nextProgress(undefined, rating, 1000);
    assert.equal(p.interval, interval);
    assert.equal(p.due, 1000 + interval * DAY);
    assert.equal(p.reviews, 1);
  }
});
test('successful reviews lengthen intervals and again resets them', () => {
  const previous = { interval: 4, reviews: 3, lastReview: 100, due: 200 };
  assert.equal(nextProgress(previous, 'good', 500).interval, 10);
  assert.equal(nextProgress(previous, 'easy', 500).interval, 14);
  assert.equal(nextProgress(previous, 'hard', 500).interval, 5);
  assert.equal(nextProgress(previous, 'again', 500).due, 60500);
  assert.equal(nextProgress(previous, 'good', 500).reviews, 4);
});
test('backup validation rejects malformed or unsafe values', () => {
  assert.ok(validateStore(emptyStore()));
  for (const value of [null, {}, { version: 2 }, { version: 1, progress: [], activity: {} }, { version: 1, progress: { a: { due: Infinity } }, activity: {} }, { version: 1, progress: {}, activity: { today: -1 } }]) assert.equal(validateStore(value), false);
  assert.ok(validateStore({ version: 1, progress: { card: nextProgress(undefined, 'good', 1000) }, activity: { '2026-01-02': 2 } }));
});
test('dates are keyed using local calendar dates', () => {
  assert.equal(localDate(new Date(2026, 0, 2)), '2026-01-02');
});
test('all demo cards belong to leaves and reference existing shared explanations', () => {
  assert.equal(new Set(cards.map(c => c.id)).size, cards.length);
  const ids = subjects.flatMap(descendantIds);
  for (const card of cards) {
    assert.ok(ids.includes(card.subjectId));
    assert.equal(subjectPath(card.subjectId).at(-1).children, undefined);
    assert.ok(explanations.some(e => e.id === card.explanationId));
  }
  assert.ok(cards.filter(c => c.explanationId === 'art1').length > 1);
});
