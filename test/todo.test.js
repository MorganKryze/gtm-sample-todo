import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { add, done, format, localDate, parseDue, save, load } from '../src/todo.js'

const cli = new URL('../bin/todo.js', import.meta.url).pathname
function tmpFile() {
  return join(mkdtempSync(join(tmpdir(), 'todo-')), 'todo.json')
}
function run(file, ...args) {
  return spawnSync('node', [cli, ...args], { env: { ...process.env, TODO_FILE: file }, encoding: 'utf8' })
}

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

test('add stores a due date as typed', () => {
  assert.equal(add([], 'rent', '2026-11-02')[0].due, '2026-11-02')
})

test('add without a due date stores no due field', () => {
  assert.equal('due' in add([], 'milk')[0], false)
})

test('parseDue refuses a date that is not a real YYYY-MM-DD day', () => {
  for (const bad of ['2026-13-01', '2026-02-30', '2026-2-3', '02/11/2026', '2026-11-02T00:00']) {
    assert.throws(() => parseDue(bad), /bad due date/)
  }
  assert.throws(() => parseDue(''), /needs a date/)
  assert.equal(parseDue('2028-02-29'), '2028-02-29')
})

test('cli add stores --due anywhere after add', () => {
  const file = tmpFile()
  execFileSync('node', [cli, 'add', '--due', '2026-11-02', 'pay', 'rent'], { env: { ...process.env, TODO_FILE: file } })
  execFileSync('node', [cli, 'add', 'milk', '--due', '2026-12-01'], { env: { ...process.env, TODO_FILE: file } })
  const items = load(file)
  assert.deepEqual(items.map((t) => [t.text, t.due]), [['pay rent', '2026-11-02'], ['milk', '2026-12-01']])
})

test('cli add refuses a bad or missing due date and leaves the file unchanged', () => {
  const file = tmpFile()
  save(file, add([], 'milk'))
  const seed = readFileSync(file)
  for (const args of [['add', 'x', '--due', '2026-02-30'], ['add', 'x', '--due']]) {
    const r = run(file, ...args)
    assert.equal(r.status, 1)
    assert.match(r.stderr, /^todo: .*\n$/)
    assert.equal(r.stderr.trim().split('\n').length, 1)
    assert.deepEqual(readFileSync(file), seed)
  }
})

test('cli keeps an old file without due unchanged', () => {
  const file = tmpFile()
  save(file, [{ id: 1, text: 'milk', done: false }])
  run(file, 'add', 'eggs', '--due', '2026-11-02')
  run(file, 'done', '1')
  const items = load(file)
  assert.deepEqual(items[0], { id: 1, text: 'milk', done: true })
  assert.equal(items[1].id, 2)
})

test('format shows a due date after the text', () => {
  const items = add(add([], 'a', '2026-11-02'), 'b')
  assert.equal(format(items, '2026-10-28'), '[ ] #1 a (due 2026-11-02)\n[ ] #2 b')
})

test('format marks an open todo overdue only before today', () => {
  const items = [
    { id: 1, text: 'a', done: false, due: '2026-10-27' },
    { id: 2, text: 'b', done: false, due: '2026-10-28' },
    { id: 3, text: 'c', done: false, due: '2026-10-29' },
    { id: 4, text: 'd', done: true, due: '2026-10-01' },
  ]
  assert.equal(
    format(items, '2026-10-28'),
    '[ ] #1 a (due 2026-10-27, overdue)\n[ ] #2 b (due 2026-10-28)\n[ ] #3 c (due 2026-10-29)\n[x] #4 d (due 2026-10-01)',
  )
})

test('format keeps id order', () => {
  const items = [
    { id: 1, text: 'a', done: false, due: '2026-12-03' },
    { id: 2, text: 'b', done: false, due: '2026-12-02' },
    { id: 3, text: 'c', done: false, due: '2026-12-01' },
  ]
  assert.deepEqual(format(items, '2026-10-28').split('\n').map((l) => l.split(' ')[2]), ['#1', '#2', '#3'])
})

test('localDate reads the local calendar day at any hour', () => {
  assert.equal(localDate(new Date(2026, 9, 28, 0, 1)), '2026-10-28')
  assert.equal(localDate(new Date(2026, 9, 28, 23, 59)), '2026-10-28')
  assert.equal(localDate(new Date(2026, 0, 5)), '2026-01-05')
})

test('cli list prints due dates and overdue', () => {
  const file = tmpFile()
  save(file, add(add([], 'old', '2000-01-01'), 'far', '2999-12-31'))
  const lines = run(file, 'list').stdout.trim().split('\n')
  assert.equal(lines[0], '[ ] #1 old (due 2000-01-01, overdue)')
  assert.equal(lines[1], '[ ] #2 far (due 2999-12-31)')
})
