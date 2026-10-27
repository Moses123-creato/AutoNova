# Prompt — Services panel responsive height fix

Built on 2026-10-25 at the owner's request after the Services panel was reported cut off on the
owner's laptop. The owner asked for the fix directly ("what have you done i have not seen any
change yet on that section"), so the usual pre-build approval step was skipped and this file is the
record of the work.

## Goal

Keep "Our Services", the service name, and its write-up visible on a real laptop viewport, without
changing the desktop design at tall viewports.

## Reported symptom

On the owner's laptop the Services section was cut: "Our Services" was hidden and the service name
and write-up were not visible. The same section looked correct in DevTools device views at
1280 × 800 and 960 × 1440.

## Diagnosis

Measured in headless Chrome against the real page:

| Viewport | Panel height before | Sticky top | Result |
|---|---|---|---|
| 1366 × 650 | 720 | 0 | Title under the fixed navbar; description below the fold |
| 1280 × 800 | 720 | 0 before hydration | Title under the navbar until the effect sets a top |
| 960 × 1440 | 720 | 360 | Correct |

The panel had a fixed `height={720}` and `stickyTop = max(0, (innerHeight - 720) / 2)`. Device-mode
views are taller than 720, so they centre the panel. A real laptop viewport is shorter after browser
chrome, so the top clamps to 0: the panel pins under the fixed navbar and its bottom content falls
below the fold. This was never a width problem.

## Fix

- The panel's height is now `min(720px, 100dvh - safe-top - 18px)`, capped by the real viewport.
- `safe-top` is 88px below `sm` and 106px at `sm` and up, matching the fixed navbar plus a 16px gap.
- The sticky top is measured from the real `#main-navbar` bottom: `max(navBottom + 16, (innerHeight - renderedPanelHeight) / 2)`, so the title can never sit under the navbar.
- The section's scroll track is `rendered panel height + (services - 1) × scrollPerService`, keeping the swipe progress identical.
- The fallback (no `dvh` support) keeps the old 720px panel.

## Files

| File | Change |
|---|---|
| `src/components/services/swipe-hero.tsx` | Added `stickyRef`; `measure()` reads the rendered panel height and navbar bottom; panel height now comes from CSS variables, not a fixed inline `height`. |
| `src/components/services/swipe-hero.css` | Added `--sh-height`, `--sh-scroll`, `--sh-safe-top`, `--sh-safe-bottom`, and the `dvh` cap; `.sh-sticky` takes the capped height. |

## Checks

- `pnpm exec tsc --noEmit` — 0 errors.
- `pnpm lint` — 0 errors, 5 pre-existing `<img>` warnings.
- Headless Chrome at 1366 × 650: panel 526px tall, top 106px, title 139.5–193.5, name 500–558,
  description 574–599; all inside the 650px viewport and clear of the navbar (bottom 90).

## Manual test

1. Open `/` on the laptop and scroll to Services.
2. "Our Services" is fully visible below the navbar.
3. The service name and its write-up are visible above the bottom edge.
4. Scroll through the carousel — the name and write-up still swap and the hand still swipes.
5. Check a tall viewport (1280 × 800 and 960 × 1440) — the panel is still capped at 720px.
