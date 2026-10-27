# Services — `/services` — build spec

**Nothing is built here yet.** This file exists so the folder has a record, and so the first real
build has somewhere to start.

## Status

| | |
|---|---|
| Route | `/services` |
| Route exists | **No** — no file at `src/app/services/page.tsx` |
| Design reference supplied | **No** — this folder is empty |
| Component | **None** |

## Used on the homepage

The `swipe-hero/` source in this folder is the design for the **Services section on `/`**, not the
`/services` route. That section is built at `src/components/services/swipe-hero.tsx`; see
`prompts/services-swipe-hero.md` and `documents/services-swipe-hero.md`. The `/services` route
itself is still not built.

## Intended content

Per `agent.md` §2: *Services — what we do.* Nothing else has been decided about this page.

Note: the navbar already carries a Services link, so the nav is pointing at a route that does not
exist yet.

## To build it

1. **Design first.** Per `agent.md` §4, UI comes from the owner: desktop reference images plus a
   short prompt. Nothing is written until those land in this folder. If this folder is empty, stop
   and ask.
2. When the design arrives, record the image here under "Reference images used" and write the
   implementation prompt into `prompts/`.
3. Build to the prompt, then update this spec, `sync/progress.md`, `documents/`, and
   `debug/errors-log.md`.
4. Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`.
