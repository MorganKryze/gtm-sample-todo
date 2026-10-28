# Conventions

> One-table summary of the project's conventions. Each row points at its guideline file. Proposed
> at `/gtm:init`, revisited with `/gtm:tune`. Every row is GTM's default: the history (one commit,
> no PR, no merge) shows no other established practice.

| Area | Convention in one line | File | Decided |
| --- | --- | --- | --- |
| Code | small pure functions in src/, I/O in bin/, stdlib only | guidelines/code.md | 2026-10-28 |
| Tests | test first; node:test units, CLI runs on a temp TODO_FILE | guidelines/tests.md | 2026-10-28 |
| Git | Conventional Commits (no scope, lower case), merge commits, never rewrite pushed history | guidelines/git.md | 2026-10-28 |
| Releases | SemVer from 0.1.0, CHANGELOG, tag on the human's go | guidelines/git.md | 2026-10-28 |
| Docs | README usage block kept in step, same branch | guidelines/docs.md | 2026-10-28 |
| Dependencies | none at runtime; the first needs the human's go | guidelines/dependencies.md | 2026-10-28 |
| Security | local single user, no network; dependencies are the surface | guidelines/security.md | 2026-10-28 |
| Data | todo.json never lost or altered; old files keep loading | guidelines/data.md | 2026-10-28 |
| Language and copy | English, lower-case `todo: <message>` errors | guidelines/i18n.md | 2026-10-28 |
| Voice | text reads like the project's own; plain writing | guidelines/voice.md | 2026-10-28 |
| Work | P0-P3, epics and stories, done per track | guidelines/work.md | 2026-10-28 |

Accessibility and Design have no file: `design.screens` is false.
