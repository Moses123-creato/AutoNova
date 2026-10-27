# Contact — `/contact` — build spec

**Nothing is built here yet.** This file exists so the folder has a record, and so the first real
build has somewhere to start.

## Status

| | |
|---|---|
| Route | `/contact` |
| Route exists | **No** — no file at `src/app/contact/page.tsx` |
| Design reference supplied | **No** — this folder is empty |
| Component | **None** |

## Intended content

Per `agent.md` §2: *Let's Talk — the contact page.* The nav label is "Let's Talk" and the route
is `/contact`; keep the label and the slug separate.

This is the one page with a known requirement beyond layout: it carries the contact form. The form
posts to a server route, and **that server route is a stub** until the owner picks a delivery
provider. Do not choose a provider and do not install one without asking (see `agent.md` §2, §8).

The nav already has a "Let's Talk" button pointing here, so this route is expected.

## To build it

1. **Design first.** Per `agent.md` §4, UI comes from the owner: desktop reference images plus a
   short prompt. Nothing is written until those land in this folder. If this folder is empty, stop
   and ask.
2. When the design arrives, record the image here under "Reference images used" and write the
   implementation prompt into `prompts/`.
3. Build to the prompt, then update this spec, `sync/progress.md`, `documents/`, and
   `debug/errors-log.md`.
4. Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`.
