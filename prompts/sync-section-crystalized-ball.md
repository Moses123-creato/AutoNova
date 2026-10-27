# Prompt — Sync section (CrystalizedBall + Autonova write-up)

Implementation prompt for the sync section on `/`, written before the build.

## Goal

A two-column section on the homepage. Left: the live `CrystalizedBall` component. Right: a short
write-up of Autonova.

## Skills read

- `agent.md` — scope, the three-font rule, server-components-by-default, no AI slop
- `design-system.md` — Nova Blue scale, glass surfaces, typography, the `LIVE NODE` badge pattern
- `sync/progress.md` — where the build stands

## Component

React Bits `CrystalizedBall` (WebGL2, GPGPU, built on `ogl`). `ogl` is **already installed** at
`1.0.11` — no dependency change was needed.

## Decisions and assumptions

- **Preset `abyss`** with `color` overridden to `#1E66D9`. The `abyss` preset is already blue and
  uses round particles with orbit motion, which suits the "crystal ball of live dust" idea. The
  colour was overridden so the ball matches the site accent rather than the preset's own blue.
- **The write-up copy is mine.** The owner asked for "a short write up of autonova" and did not
  supply text, so it was written in the site's voice.
- The section is a **two-column grid** on `lg` and up, stacked below that. The ball is `order-1`
  and the copy `order-2` on every breakpoint, so the component stays on the left as asked.
- The ball sits in a bordered glass box with a faint grid, matching the scorecard's card language.
- A "Live sync" indicator sits over the top-left of the box, using the `LIVE NODE` badge pattern
  from `design-system.md` (Signal Cyan `#00AECF`).

## Requirements

1. `src/components/ui/crystalized-ball.tsx` — the React Bits component, verbatim, plus a named
   export so it matches the import style of the other components in this project.
2. `src/components/sync-section.tsx` — the two-column section.
3. Added to `src/app/page.tsx` after `<PerformanceResults />`.

## Security

No secrets, no data fetching, no user input. The component is purely visual. Pointer input is
handled entirely in the browser and never sent anywhere.

## Acceptance criteria

- The section renders with the ball on the left and the write-up on the right.
- The ball is animated, interactive (cursor heats the rim and stirs the dust), and blue.
- On mobile the columns stack, ball first.
- `pnpm lint` 0 errors, `tsc --noEmit` 0 errors in `src/`.

## Checks to run

`pnpm exec tsc --noEmit` · `pnpm lint` · `pnpm dev`, then check the section and interact with the ball.

## Manual test steps

1. Open `/` and scroll to the sync section.
2. The ball powers up over ~2 seconds, rim and dust.
3. Move the cursor over the ball — the rim heats toward it and the dust stirs.
4. Click the ball — it shakes and throws arcs.
5. Resize to mobile — the columns stack, ball first.

## Result

Built. `pnpm lint` 0 errors (3 pre-existing warnings), `tsc --noEmit` 0 errors in `src/`, HTTP 200,
section and all copy present in the served HTML.

**Not verified visually** — no headless browser was available in this session, so the render was
confirmed through the served HTML and the compile log, not through a screenshot.