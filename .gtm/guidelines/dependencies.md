# Dependency guideline

> When to read: architect and implementer before adding a dependency; reviewer and security
> reviewer when a manifest or lockfile changes.

- A new dependency needs a ruling in the plan: name, size, licence, maintenance, and why the
  standard library or the platform is not enough.
- Licences compatible with MIT (package.json); refused: GPL, AGPL, SSPL.
- Versions pinned by the lockfile; updates in their own commits, one dependency or one group each.
- Remove what is no longer used in the same branch that stops using it.
- Runtime dependencies: none today; adding the first one needs the human's go. Audit: `npm audit` once a lockfile exists.
