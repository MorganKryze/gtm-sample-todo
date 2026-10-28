# Test guideline

> When to read: architect, implementer, reviewer, ux-qa, release-qa.

- **Test first:** the failing run is captured before the code. Tests assert behaviour and would fail
  without the change; every EARS line of a spec has at least one test.
- **Levels:** unit for rules and pure logic; integration for storage, APIs and contracts; e2e for a
  person's path through a screen. Here: `node:test` with `node:assert/strict` in `test/*.test.js` for the pure functions; integration = run `bin/todo.js` with `TODO_FILE` in a temp dir, never the real `todo.json`. No e2e.
- **Coverage:** every changed behaviour is tested; no percentage target unless set here: none.
- **Accessibility:** no screens; output stays plain text.
- **Flaky tests:** a flake is rerun alone once; if it fails again it is a bug. Known flakes are
  listed below with their symptom and how to confirm; a flake is fixed or deleted within 2 weeks.
- Every commit leaves the gate green.

## Known flakes
none known (2026-10-28).
