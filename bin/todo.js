#!/usr/bin/env node
// Usage: todo add <text> | todo done <id> | todo list. Data in ./todo.json (TODO_FILE overrides).
import { load, save, add, done, format } from '../src/todo.js'

const file = process.env.TODO_FILE || 'todo.json'
const [cmd, ...rest] = process.argv.slice(2)
try {
  if (cmd === 'add') save(file, add(load(file), rest.join(' ')))
  else if (cmd === 'done') save(file, done(load(file), Number(rest[0])))
  else if (cmd === 'list' || cmd === undefined) console.log(format(load(file)))
  else throw new Error(`unknown command ${cmd}`)
} catch (e) {
  console.error(`todo: ${e.message}`)
  process.exit(1)
}
