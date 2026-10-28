// A todo list stored as JSON: [{ id, text, done, due? }].
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

export function load(file) {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : []
}

export function save(file, items) {
  writeFileSync(file, JSON.stringify(items, null, 2) + '\n')
}

export function parseDue(text) {
  if (!text) throw new Error('--due needs a date YYYY-MM-DD')
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [y, m, d] = text.split('-').map(Number)
    const day = new Date(Date.UTC(y, m - 1, d))
    if (day.getUTCFullYear() === y && day.getUTCMonth() === m - 1 && day.getUTCDate() === d) return text
  }
  throw new Error(`bad due date ${text}, use YYYY-MM-DD`)
}

export function add(items, text, due) {
  if (!text || !text.trim()) throw new Error('a todo needs some text')
  const extra = due !== undefined ? { due: parseDue(due) } : {}
  const id = items.reduce((max, t) => Math.max(max, t.id), 0) + 1
  return [...items, { id, text: text.trim(), done: false, ...extra }]
}

export function done(items, id) {
  if (!items.some((t) => t.id === id)) throw new Error(`no todo #${id}`)
  return items.map((t) => (t.id === id ? { ...t, done: true } : t))
}

export function format(items) {
  if (!items.length) return 'nothing to do'
  return items.map((t) => `${t.done ? '[x]' : '[ ]'} #${t.id} ${t.text}`).join('\n')
}
