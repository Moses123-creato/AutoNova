# Performance Results — the impact scorecard

## What this is

A four-card impact scorecard that sits below the Hero on the homepage. Each card is a dark
glassmorphism panel with a decorative blue curve, a glowing node at the curve's peak, a small
uppercase label, and a large value.

Built to [`performance-scorecard.jfif`](./performance-scorecard.jfif), which shows **one** card — it
was supplied as the style for the card, not as the count. The section has four.

## Sections and components

- `src/components/performance-results.tsx` — the whole section. A **server component**; all motion
  is CSS, so there is no `"use client"` and no hydration cost.
- `src/app/globals.css` — the `score-curve`, `score-node` and `score-glow` keyframes plus a
  `prefers-reduced-motion` block that stops all three.
- `src/app/page.tsx` — `<PerformanceResults />` sits between `<Hero />` and the end of `<main>`.

## The four cards

| Value | Label |
|---|---|
| `5+` | Hours Saved Every Week |
| `10+` | Workflows Simplified |
| `25+` | Leads Generated |
| `10+` | Business Automated |

All four are the same Nova Blue. An earlier note asked for mixed colours; the owner settled on all
blue and that is what shipped.

## The curve is decorative

There is no data behind these cards. The paths in `SCORES` are hand-written SVG in a `300 × 120`
viewBox, one per card so they do not all look identical. **Do not wire them to real metrics** — if
they ever need to be real, the component needs a data source and the shapes need to be derived from
it, not hand-placed.

The `node` coordinate on each score is the peak of its path, expressed as a percentage of the viewBox
so the glowing dot lands on the curve after the SVG is stretched by `preserveAspectRatio="none"`.
The stroke carries `vectorEffect="non-scaling-stroke"` so it stays crisp at any width.

## What was cut from the reference

- **"Data updated 2h ago"** — removed at the owner's instruction.
- **The "Monthly ⌄" dropdown** — removed at the owner's instruction.

Neither was a real control; both were part of the picture.

## Responsive behaviour

Deliberately **not** the reference's proportions — that card is portrait and would be wrong here.

| Breakpoint | Columns |
|---|---|
| base | 1 |
| `sm` and up | 2 |
| `xl` and up | 4 |

Cards are landscape, with the curve on top and the label/value beneath. The curve height steps up
from `h-28` to `sm:h-32`, and the value steps from `text-5xl` to `sm:text-6xl`.

## Accessibility

- The curve and every glow layer are `aria-hidden`. The card is announced as label + value.
- All motion is disabled under `prefers-reduced-motion`. The curve is set to draw once and hold
  rather than loop, so reduced-motion users still see it complete.
- The glow is decorative; nothing depends on animation to convey meaning.

## Open

- **`Business Automated` shows `10+`, which duplicates `Workflows Simplified`.** The value came from
  an earlier note in the conversation. It needs the owner's real number before this ships. It is one
  line in `SCORES`.
- The summary copy was written by me, as instructed, not supplied. It is a placeholder until the
  owner signs off on the wording.