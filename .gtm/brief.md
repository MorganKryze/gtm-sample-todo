# gtm-sample-todo: brief

> One page. The project's constitution: every GTM agent reads it. Amend rarely, and log each
> amendment in the ledger as a ruling.

## Purpose
A tiny command-line todo list: `todo add <text>`, `todo done <id>`, `todo list` (bin/todo.js:2).
It is the sample project for the GentleTeaM tutorial (README.md:3), so it stays small and readable.

## Users
One person at a terminal, on their own machine, in English. The one to never forget: the
reader of the tutorial, who must understand every file at a glance.

## Principles
- Standard library only: no runtime dependency (package.json has none).
- Pure functions in `src/todo.js`, I/O only in `load`/`save` and `bin/todo.js`.
- Every error reaches the user as one `todo: <message>` line and exit code 1 (bin/todo.js:12-14).
- Each file stays short enough to read in one screen.
- Every behaviour has a `node --test` test.

## Non-negotiables
- Security: one local user, no server, no network, no secrets; inputs are argv and `TODO_FILE`.
- Data integrity: `todo.json` is the person's list: no item lost, duplicated or silently altered.
- Accessibility: plain-text output a screen reader reads in order; meaning never by symbol alone
  beyond `[ ]`/`[x]`.

## Non-goals
No server, sync, accounts, GUI or web screens; no runtime dependency.

## Stack
- Node >= 22, ES modules (package.json `engines`, `"type": "module"`).
- Logic `src/todo.js`, entry `bin/todo.js`, tests `test/*.test.js` with `node:test`.
- Data: `./todo.json` (gitignored), overridden by `TODO_FILE`.
