// A todo list stored as JSON: [{ id, text, done }].
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

export function load(file) {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : []
}

export function save(file, items) {
  writeFileSync(file, JSON.stringify(items, null, 2) + '\n')
}

export function add(items, text) {
  if (!text || !text.trim()) throw new Error('a todo needs some text')
  const id = items.reduce((max, t) => Math.max(max, t.id), 0) + 1
  return [...items, { id, text: text.trim(), done: false }]
}

export function done(items, id) {
  if (!items.some((t) => t.id === id)) throw new Error(`no todo #${id}`)
  return items.map((t) => (t.id === id ? { ...t, done: true } : t))
}

export function format(items) {
  if (!items.length) return 'nothing to do'
  return items.map((t) => `${t.done ? '[x]' : '[ ]'} #${t.id} ${t.text}`).join('\n')
}
