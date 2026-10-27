# Hero — LaserFlow background

## What this is

The hero section background is now a single blue laser beam rendered with React Bits
`LaserFlow`. The beam drops from the top of the frame, lands on the control plane panel, and
the light runs along the panel's top edge before spilling over both top corners. Volumetric
fog, drifting dust and fine streaks are lit by the beam.

This replaced a WebGL Aurora shader that previously filled the whole hero.

## Why the beam lands on the panel

`LaserFlow` does not know where anything is. It measures a DOM element passed as `surfaceRef`
and uses that rectangle as the "floor" the beam hits:

```tsx
const controlPlaneRef = useRef<HTMLDivElement>(null);

<LaserFlow surfaceRef={controlPlaneRef} ... />

<div id="interactive-app-card" ref={controlPlaneRef}> ... </div>
```

The measurement happens in `measure()`, which reads `getBoundingClientRect()` of the panel
relative to the canvas container and its computed corner radius. Because the panel is observed
with a `ResizeObserver`, the beam re-measures if the layout changes. If the beam's x position
falls outside the panel's span, the component falls back to a synthetic floor.

Consequence: **the control plane must stay a real, measurable element.** Do not replace it with a
canvas or a background image, or the beam loses its floor.

## What was not changed

The control plane itself is untouched — same tabs, same filters, same task grid, same state, same
`BorderBeam` wrapper. The only edit to that subtree is the added `ref`.

Hero copy is untouched. Only its alignment moved from centre to left, so the beam owns the right
side of the frame instead of crossing the headline.

## Files

| File | Role |
|---|---|
| `src/components/ui/laser-flow.tsx` | The React Bits component, verbatim apart from one fix (below). |
| `src/components/hero.tsx` | Wires the laser in, holds `controlPlaneRef`, left-aligns the copy. |
| `react-bits/aurora.tsx` | The old Aurora shader, archived. Not shipped, not linted, not imported. |
| `eslint.config.mjs` | Adds `react-bits/**` to the ignore list. |

## One deviation from upstream

Upstream assigns to a ref during render:

```tsx
const settingsRef = useRef(settings);
settingsRef.current = settings;   // React 19 lint: "Cannot update ref during render"
```

That trips `react-hooks/refs`. The assignment was moved into the component's existing
per-render effect, which already wakes the render loop, so behaviour is unchanged and the
rule is satisfied.

## Tuning the look

All of these are props in `hero.tsx` and are meant to be adjusted by eye:

| Prop | Effect | Current |
|---|---|---|
| `color` | Every tone in the shader is derived from this | `#1E66D9` |
| `beamPosition` | 0 = left edge, 1 = right edge | `0.72` |
| `intensity` | Overall brightness | `2.4` |
| `fog` | Lit smoke around the beam. `0` disables | `0.45` |
| `pulse` | How much the splash breathes | `2.8` |
| `speed` | Animation rate. `0` freezes it | `1.9` |
| `flare` | Size of the splash where it lands | `2.4` |
| `spread` | How far light runs along the panel | `2.4` |
| `spill` | Light pouring over the corners | `1.4` |
| `dpr` | Render resolution cap | `1.5` |

### Performance

This shader is expensive. It runs `fbm` (5 octaves) several times per pixel over the whole hero.
`dpr` is the main lever — `2` quadruples the fragment count versus `1`. The component also
self-limits via `MAX_RENDER_DIM = 2048`.

The loop pauses when the hero scrolls out of view (`IntersectionObserver`) and when the tab is
hidden (`visibilitychange`), so it costs nothing off-screen.

If the hero ever feels heavy on a low-end machine, lower `dpr` first, then `fog`.