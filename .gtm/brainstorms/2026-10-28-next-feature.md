# Next feature for the todo CLI
- topic: the next useful feature of the todo CLI
- goal: one capability small enough for one tutorial branch (≤ 6 files)
- stance: ideate for me
- techniques: Job to Be Done, Reverse Brainstorming, One Feature Only, Pre-mortem Analysis
- budget spent: 9k of 15k

## Ideas
- Due dates: `todo add buy milk --due 2026-11-02`, `list` shows the date and marks overdue items (lens: Job to Be Done)
- `todo list --open` hides done items, the list stays readable after weeks (lens: Job to Be Done)
- `todo undo <id>` and `todo rm <id>` to fix a slip (lens: Reverse Brainstorming)
- An atomic save (temp file then rename) so a crash never empties the list (lens: Reverse Brainstorming)
- Priorities `!1..!3`, sorted in `list` (lens: One Feature Only)
- Pre-mortem of due dates: an old todo.json without `due` must still load; a bad date must be refused, not stored; time zones must not shift a date (lens: Pre-mortem Analysis)

## Kept ideas
- Due dates: `todo add buy milk --due 2026-11-02`, `list` shows the date and marks overdue items (lens: Job to Be Done)
- Pre-mortem of due dates: an old todo.json without `due` must still load; a bad date must be refused, not stored; time zones must not shift a date (lens: Pre-mortem Analysis)

## Dropped ideas
- `todo list --open` hides done items, the list stays readable after weeks (lens: Job to Be Done)
- `todo undo <id>` and `todo rm <id>` to fix a slip (lens: Reverse Brainstorming)
- An atomic save (temp file then rename) so a crash never empties the list (lens: Reverse Brainstorming)
- Priorities `!1..!3`, sorted in `list` (lens: One Feature Only)

## Open questions
- Is "overdue" judged on the local calendar date (no time of day)?
- Should `list` sort by due date, or keep the id order and only mark overdue?

Status: done
