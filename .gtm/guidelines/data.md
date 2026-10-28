# Data guideline

> When to read: data reviewer always; architect when a spec touches `load`, `save` or the shape of
> `todo.json`.

## Rules
- No write lost, duplicated or silently altered.
- Stored shape: `[{ id, text, done }]` (src/todo.js:1). A new field is optional on read, so an
  older `todo.json` still loads; a removed field is a ruling.
- Ids are never reused within a file: `max(id) + 1` (src/todo.js:14).
- `save` overwrites the file in place (src/todo.js:9): a crash mid-write can lose the list. A
  change to `save` writes a temp file then renames it.
- Tests never touch `./todo.json`: they use `TODO_FILE` in a temp dir.
