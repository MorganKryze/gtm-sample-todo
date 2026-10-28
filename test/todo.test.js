import { test } from 'node:test'
import assert from 'node:assert/strict'
import { add, done, format } from '../src/todo.js'

test('add numbers todos from 1 and trims text', () => {
  const items = add(add([], ' milk '), 'eggs')
  assert.deepEqual(items.map((t) => [t.id, t.text]), [[1, 'milk'], [2, 'eggs']])
})

test('add refuses empty text', () => {
  assert.throws(() => add([], '  '), /needs some text/)
})

test('done marks one todo and refuses an unknown id', () => {
  const items = done(add([], 'milk'), 1)
  assert.equal(items[0].done, true)
  assert.throws(() => done(items, 9), /no todo #9/)
})

test('format shows checkboxes, or a line when empty', () => {
  assert.equal(format([]), 'nothing to do')
  assert.equal(format(done(add(add([], 'a'), 'b'), 2)), '[ ] #1 a\n[x] #2 b')
})
