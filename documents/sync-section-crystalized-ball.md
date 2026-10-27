# Sync section — CrystalizedBall + Autonova write-up

## What this is

A two-column band on the homepage. The left column holds a live, interactive `CrystalizedBall` — a
glass sphere of drifting luminous dust with an electric rim. The right column holds a short
write-up of Autonova.

## Files

| File | Role |
|---|---|
| `src/components/ui/crystalized-ball.tsx` | The React Bits component, verbatim apart from one addition (below). |
| `src/components/sync-section.tsx` | The two-column section. A **server component**. |
| `src/app/page.tsx` | `<SyncSection />` sits after `<PerformanceResults />`. |

`ogl` was already a dependency at `1.0.11` — **no package change was needed**.

## The one change to the upstream component

Upstream declares the component as a bare `const` with only a default export. A named export was
added so it matches the import style of the other components in this project (`aurora.tsx` exports
both a named and a default). No behaviour changed.

## How the ball is configured

Preset `abyss`, with the colour overridden:

| Prop | Value | Why |
|---|---|---|
| `preset` | `abyss` | Already blue, round particles, orbit motion — suits a crystal ball of live dust |
| `color` | `#1E66D9` | Overrides the preset blue so the ball matches the site accent (Nova 400) |
| `size` | `0.68` | Diameter as a fraction of the container's smaller side |
| `fill` | `0.78` | Dust floats high in the ball rather than pooling at the bottom |
| `motion` | `orbit` | Dust loops in small circles |
| `particleShape` | `round` | Soft round dots |
| `depth` / `sway` / `twinkle` / `haze` | `0.8` / `0.7` / `0.55` / `0.6` | Depth cues, turn-back, sparkle, inner glow |
| `glow` / `flares` / `sparks` / `crackle` / `strands` | `0.95` / `0.6` / `0.45` / `0.55` / `5` | Rim behaviour |
| `interactive` / `hoverStrength` | `true` / `0.75` | Cursor interaction stays on |
| `intro` | `true` | Rim powers up and the dust lights from the bottom on mount |

## Interaction

The component is fully interactive on its own:

- Moving the cursor over the ball heats the rim toward it and stirs the dust in its wake.
- Clicking the ball shakes it and throws arcs off the rim.
- The dust is a GPGPU simulation — the cursor's velocity is written into an offset texture and the
  particles are advected by a velocity pass.

`prefers-reduced-motion` is honoured inside the component: the animation freezes, the intro is
skipped and the cursor interaction is disabled.

## Layout

- `lg` and up: two equal columns, ball left, copy right.
- Below `lg`: stacked, **ball first** (`order-1` on the ball, `order-2` on the copy).
- The ball sits in a `max-w-[520px]` square glass box with a faint Nova Blue grid and a deep
  shadow, matching the scorecard's card language.
- A "Live sync" badge overlays the top-left of the box, using the `LIVE NODE` pattern from
  `design-system.md` — Signal Cyan `#00AECF` dot with a ping, `font-mono` uppercase label.

## The copy

Written by the agent, as instructed — the owner asked for "a short write up of autonova" and did
not supply text. It is in the site's voice, but it is **not owner-approved wording**.

- Eyebrow: "One live system"
- Heading: "Everything stays in sync"
- Body: Autonova runs your work and your agents off the same live state.
- Three points: Shared state · No handoffs · Always current

## Open

- The write-up wording needs the owner's sign-off.
- The ball has not been seen rendering. It was verified by served HTML and the compile log only —
  no headless browser was available this session. If the ball does not appear, check the console
  for a WebGL2 failure: `CrystalizedBall` needs WebGL2 with float render targets.