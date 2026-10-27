# Hero — LaserFlow background (blue)

Record of the request this page build was executed from.

## Request

- Take the Aurora effect out of the hero. Do not lose it — save it under React Bits.
- Put a blue laser-light animation in its place. Blue is the project's accent/base colour.
- Reproduce the **effect only** from the reference image (`hero section ui design.jfif`).
  The reference is the Huly landing page. Its copy, navbar and layout were deliberately NOT copied.
- Keep the project's own hero copy: "Building systems that move your business." plus its own
  subtitle, CTAs and navbar.
- Keep the control plane exactly as it is. Do not delete it.
- Keep "Why Choose Us" and its cards as they are.
- Move the hero words to the left.
- The laser should drop, then land on **our** control plane and run along its edges.
- Turn up the fog, the flow and the pulse. Keep the cursor/mouse interaction.
- Drafted in Stitch first — then abandoned. No Stitch screen was created; only the effect was wanted.

## What was executed

1. `src/components/ui/laser-flow.tsx` — React Bits `LaserFlow` added (WebGL2, no `ogl`).
2. `react-bits/aurora.tsx` — Aurora archived verbatim, outside `src/`, excluded from eslint.
3. `src/components/ui/aurora.tsx` — removed. Byte-identical to the archive and imported by nothing.
4. `src/components/hero.tsx` — Aurora swapped for LaserFlow; `controlPlaneRef` added to
   `#interactive-app-card`; hero copy block re-aligned left.

## Props chosen

`color #1E66D9` (Nova 400 in design-system.md), `beamPosition 0.72`, `intensity 2.4`,
`beamWidth 1.5`, `flare 2.4`, `spread 2.4`, `spill 1.4`, `fog 0.45`, `dust 2.2`,
`streaks 2.4`, `dots 1.2`, `pulse 2.8`, `speed 1.9`, `seed 3`, `mouseInteraction`,
`intro`, `theme="dark"`, `dpr 1.5`.

## Checks

- `pnpm lint` → 0 errors, 3 pre-existing warnings.
- `pnpm exec tsc --noEmit` → 0 errors under `src/`.
- Visual check in a headless browser: beam renders, lands on the control plane, edges light up.