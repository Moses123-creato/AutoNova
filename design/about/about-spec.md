# About — `/about` — build spec

**Nothing is built here yet.** This file exists so the folder has a record, and so the first real
build has somewhere to start.

## Status

| | |
|---|---|
| Route | `/about` |
| Route exists | **No** — no file at `src/app/about/page.tsx` |
| Design reference supplied | **No** — this folder is empty |
| Component | **None** |

## Intended content

Per `agent.md` §2: *About — who we are.* Nothing else has been decided about this page.

## To build it

1. **Design first.** Per `agent.md` §4, UI comes from the owner: desktop reference images plus a
   short prompt. Nothing is written until those land in this folder. If this folder is empty, stop
   and ask.
2. When the design arrives, record the image here under "Reference images used" and write the
   implementation prompt into `prompts/`.
3. Build to the prompt, then update this spec, `sync/progress.md`, `documents/`, and
   `debug/errors-log.md`.
4. Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`.
