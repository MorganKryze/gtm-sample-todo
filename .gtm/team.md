# Team settings

> How this project weighs its work. Proposed at `/gtm:init` on 2026-10-28, to approve by the
> human, revisited with `/gtm:tune`. Skills pass the role's model and effort on every dispatch.

## Priorities
Weights: low · normal · high. They justify everything below.

| Priority | Weight | Why | Decided |
| --- | --- | --- | --- |
| Security | low | one local user, no server, no secrets, no dependency | 2026-10-28 |
| Data integrity | normal | todo.json is a person's list, but small and local; `save` is a plain overwrite (src/todo.js:9) | 2026-10-28 |
| UX and accessibility | low | CLI text output, no screens | 2026-10-28 |
| Performance | low | a few items in one JSON file | 2026-10-28 |
| Delivery speed | high | tutorial sample: short branches beat ceremony | 2026-10-28 |
| Usage and cost sensitivity | high | a tutorial run should stay cheap | 2026-10-28 |

## Roles
| Role | Model | Effort | Why | Decided |
| --- | --- | --- | --- | --- |
| analyst | opus | medium | clarifies once per request | 2026-10-28 |
| designer | opus | medium | not dispatched while design.screens is false | 2026-10-28 |
| design-critic | opus | high | not dispatched while design.screens is false | 2026-10-28 |
| architect | opus | medium | 64 lines of code: a plan needs little depth | 2026-10-28 |
| implementer | sonnet | medium | small pure functions, the plan carries the thinking; cost high | 2026-10-28 |
| reviewer | opus | medium | runs on every task | 2026-10-28 |
| security-reviewer | opus | high | rare here (dependencies only); low threat model | 2026-10-28 |
| data-reviewer | opus | high | lost data cannot be undone | 2026-10-28 |
| ux-qa | opus | medium | off: no screens | 2026-10-28 |
| final-reviewer | opus | high | once per branch; small branches | 2026-10-28 |
| release-qa | opus | low | no live_url: skipped | 2026-10-28 |

## Specialists
- security-reviewer: on · triggers `^package(-lock)?\.json$` · why: a new dependency is the only new attack surface of a local CLI · 2026-10-28
- data-reviewer: on · triggers `^src/todo\.js$`, `(store|storage|db)/` · why: load/save of the person's file live in src/todo.js:4-11; matches most tasks · 2026-10-28
- ux-qa: off · triggers none · why: no screens · 2026-10-28

## Companions
- impeccable: off · detected skill `impeccable:impeccable` · roles designer, design-critic, ux-qa · why: no screens, none of its roles runs · 2026-10-28
- humanize: on · detected skill `humanize:humanize` · roles ship, implementer · why: keeps commits, README and PR text plain · 2026-10-28

## Gates
- fix rounds per task: 3 · why: past three, the plan is wrong, not the code · 2026-10-28
- fix rounds per standard review: 1 · why: a standard review fixes once, minors go to the ledger · 2026-10-28
- review cadence: reviewer per-wave, ux-qa per-branch, security-reviewer per-task, data-reviewer per-task · why: GTM default; security and data reviewers never lighter · 2026-10-28
- tasks per branch: 5 · why: a 3-file CLI; more than 5 tasks means the slice is too big · 2026-10-28
- Fix track ceiling: 3 files · why: GTM default; the repo has 3 code files · 2026-10-28
- design threshold: 8/10, zero must-fix · why: inactive, design.screens false · 2026-10-28
- design rounds: 3 · why: inactive, design.screens false · 2026-10-28
- replay risky tasks: yes · risky paths `(store|storage|db)/`, `(schema|migrat)` · why: a change to the stored shape must replay on an existing todo.json · 2026-10-28
- budget per task: none · why: no measured run yet; `/gtm:tune` proposes the medians · 2026-10-28
- budget per branch: none · why: no measured run yet; `/gtm:tune` proposes the medians · 2026-10-28

## History
Changes made by `/gtm:tune`, newest last: `- YYYY-MM-DD · <setting>: <old> → <new> · <why>`.
