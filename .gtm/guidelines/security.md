# Security guideline

> When to read: security reviewer always; architect when a spec touches a trust boundary, secrets
> or a dependency; final reviewer.

## Threat model
A local CLI run by its own user: no server, no network, no account, no secret. Inputs are argv
and `TODO_FILE` (bin/todo.js:5), both from that same user. The real risks are a malicious
dependency and a crafted `todo.json` crashing or misleading the CLI.

## Rules
- No network access and no shell-out from the CLI.
- `todo.json` is parsed with `JSON.parse` only, never evaluated; a malformed file gives one
  `todo: <message>` line, not a stack trace.
- Secrets never in code, logs or reports (there are none today).
- Any dependency goes through `dependencies.md`.
