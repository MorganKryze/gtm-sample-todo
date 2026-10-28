# Ledger

> Append-only. One line per entry, newest last. Read at plan time (the compound step).
> Superseded entries are struck through (`~~...~~`), never deleted.
> Format: `- YYYY-MM-DD · <slug> · <kind> · <text>`
> Kinds: `lesson` (a rule to keep), `ruling` (a decision taken without the human, with its cost if
> wrong), `minor` (a deferred review finding), `resolved` (closes a minor, names it), `run` (one
> line per delivered branch, `/gtm:tune` reads these), `usage` (a note on cost or limits hit, or a
> budget passed).
> A `run` line: `tasks N · correction rounds per task · findings per reviewer (critical /
> important / minor) · tiers <g>g <s>s · design rounds and score · measured <W>m <T>k <A>a:
> <phase> <w>m <t>k <a>a, ...; roles <role> <p>%, ... · limits 5h +<a>% 7d +<b>% · lenses <role>
> <method name> <n>, ...`, escalated
> counts guarded, from every progress line, a task's runs summed (a `GATED` line has no rounds);
> phases design, spec, plan, tasks (re-run and deferred reviews in), final (re-reviews in), fix,
> in that order, a phase not run left out; minutes to one decimal, tokens in thousands; all
> summed, a wave's minutes are its longest task's; a sum holding a `?` is `?`, a progress line
> without measures reads `?`, a wave's merge-commit line is skipped; `roles` as `/gtm:deliver` §2
> step 3 measures them, once over every progress line's `· run <id>` folder plus `--also
> <role>:<s>:<tokens>` per dispatch (architect, final-reviewer, implementer, a re-run review's
> role), roles at 5% or more, any `?` → `roles ?`; `limits` the difference from the branch's first
> `limits at start` usage line, `?` across a reset or with no reading; `lenses` last, the items
> tagged `(lens: <method name>)` per role and method, every reflex of a role that ran listed, 0
> included: the architect's in the spec and plan, any other role's in its report files; retro and
> tune never appear in a run line (tune counts their tags itself). A `run` line
> without `lenses` (every line before 0.11.0) reads as not measured for lenses, the rest as
> before.
- 2026-10-28 · due-dates · ruling · track: Feature, small (~4 files: src/todo.js, bin/todo.js, test/todo.test.js, README.md), no screen, no schema migration (an optional field); from brainstorm note brainstorms/2026-10-28-next-feature.md; data-reviewer triggered by src/todo.js
- 2026-10-28 · due-dates · ruling · dig on the draft spec (Pre-mortem Analysis, by the orchestrator): 1 finding, "--due before the text" (`todo add --due 2026-11-02 buy milk`) — the plan already rules where --due may stand; left as is
- 2026-10-28 · due-dates · ruling · spec approved on the human's delegation ("fais le max en autonomie"): card 1 A (overdue on the local calendar date), card 2 A (list keeps id order and only marks); plan kept from the one pass
- 2026-10-28 · due-dates · minor · src/todo.js:15-17 parseDue refuses years 0001-0099 (Date.UTC maps 0-99 to 1900s); plan decision 6 says 0001-9999; fix with setUTCFullYear (reviewer, data-reviewer)
- 2026-10-28 · due-dates · minor · bin/todo.js:9 `--due=2026-11-02` is stored as text with no date and exit 0; refuse `--due=` or read it as the option (data-reviewer)
- 2026-10-28 · due-dates · minor · bin/todo.js:9-10 a second `--due` ends up in the text (plan-mandated); test/todo.test.js:52-53 duplicates the run helper (reviewer)
- 2026-10-28 · due-dates · minor · src/todo.js:9 save overwrites in place; two concurrent runs or a crash can lose items (pre-existing, out of scope until save changes; data-reviewer)
- 2026-10-28 · due-dates · minor · src/todo.js:43 overdue compares strings, right only for canonical YYYY-MM-DD; a hand-edited non-canonical due could be marked wrongly; load validates nothing (pre-existing; data-reviewer)
- 2026-10-28 · due-dates · resolved · the duplicated run helper (test:55-56) folded into runEnv in bc2bcc5
- 2026-10-28 · due-dates · minor · test/todo.test.js:131 the TZ loop runs only `list`, never `add`: a TZ shift at store time survives under TZ=UTC; run the add test in the loop when CI exists (final-reviewer)
- 2026-10-28 · due-dates · run · measured ≈20m ≈330k 10a: spec+plan 3m 52k 1a; tasks 9m 120k 6a (2 tasks, CLEAN at 0 rounds, reviewer + data-reviewer); final review 7m 68k fix-first (4 must-fix, tests only: 4 of 8 mutations survived); fix wave 1m 22k; re-review ready; lenses architect Pre-mortem 3, Inversion 2, ADR 2, First Principles 1; final-reviewer Pre-mortem 3, Second-Order 3
- 2026-10-28 · due-dates · run · shipped as PR #1 (merge 4266a86, merge commit), by the orchestrator on the human's delegated autonomy
