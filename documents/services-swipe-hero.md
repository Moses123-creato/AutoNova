# Services section — SwipeHero

## What this is

The site's main Services section. A scroll-pinned carousel inside a contained panel: the panel
stays fixed while you scroll through each service, and the service name plus its one-line
description swap as you go.

Ported from `design/services/swipe-hero/`.

## Files

| File | Role |
|---|---|
| `src/components/services/swipe-hero.tsx` | The component, ported to TypeScript. `"use client"`. |
| `src/components/services/swipe-hero.css` | The styles. Imported by the component. |
| `src/components/services-section.tsx` | The section wrapper. Sets the title and eyebrow. |
| `public/hand-blue.webp` | The hand image. |
| `public/icon.svg` | The centre icon. |
| `design/services/swipe-hero/` | The original source, kept for reference. Not imported, not linted. |

## How the scroll works

The section's height is `panelHeight + scrollLength`, where `scrollLength` is
`(services.length - 1) * scrollPerService` — 5 × 420 = 2100px at the current settings.

`measure()` runs on scroll and computes where the pinned panel should be:

```
scrolled = stickyTop - sectionRect.top
target   = clamp(scrolled / scrollLength, 0, 1) * (N - 1)
```

`tick()` then eases `current` toward `target` at 0.14 per frame, so the carousel follows the scroll
with a little weight rather than snapping.

`stickyTop` is `max(navBottom + 16, (innerHeight - panelHeight) / 2)`. Reading the real fixed
navbar is what keeps the section title clear of it on short screens. On a tall viewport the panel
is centred; on a short one it sits below the navbar.

## Responsive height

The source hard-coded `height={720}`. That broke on real laptop viewports shorter than 720px after
browser chrome: the panel pinned at `top: 0`, the navbar covered "Our Services", and the service
name and write-up fell below the fold. DevTools device views at 800px and 1440px tall hid the bug.

The panel is now capped to the real viewport in CSS:

```
--sh-safe-top: 88px;              /* 106px at sm and up */
--sh-safe-bottom: 18px;
--sh-stage-h: min(720px, calc(100dvh - safe-top - safe-bottom));
```

`panelHeight` is the rendered height of `.sh-sticky` (526px at a 650px viewport). The scroll track
uses that same height, so the swipe progress stays aligned. Browsers without `dvh` fall back to the
old 720px panel. The owner asked for this after the laptop cut-off was reported; the fix is recorded
in `prompts/services-responsive-height-fix.md`.

## Typography — the design system, not the source

The source file used `system-ui` plus a Google Fonts link for Inter and JetBrains Mono. Neither is
used here. The site loads its three families through `next/font/google` in `src/app/layout.tsx`:

| Where | Family | Token |
|---|---|---|
| Section title, service names | Orbitron 900 | `--font-orbitron` / `font-display` |
| Body, descriptions | Inter | `--font-inter` / `font-body` |
| Mono (not used here) | system mono | `font-mono` |

The service names use the **design system's wordmark gradient** rather than the source's two-stop
white-to-blue:

```
linear-gradient(180deg, #FFFFFF 0%, #BFE0FF 35%, #3F84EA 75%, #0B2C63 100%)
```

with `filter: drop-shadow(0 0 32px rgba(30,102,217,0.5))`.

### One size change

The service name type is `clamp(22px, 4.2vw, 52px)`, down from the source's
`clamp(28px, 5.4vw, 68px)`. Orbitron is much wider than the source's system font and
"Lead Generation and Follow-Up Systems" overflowed at the original size. This is a consequence of
the font swap, not a redesign.

## The contained box

The source was full-bleed. It is now a box:

- `.sh-stage` is `min(100%, 1040px)`, centred by `.sh-sticky`, with a gutter of
  `clamp(12px, 3vw, 40px)`.
- Rounded corners, a `rgba(30,102,217,0.22)` hairline, and a deep shadow.
- The page's own `#030507` shows around it on every viewport, mobile included.

## Content

Service names are the source's list, unchanged. The descriptions are new — the owner asked for a
description per service and did not supply text, so six one-liners were written in the site's voice.
Both live in plain arrays at the top of `swipe-hero.tsx` and are edited there.

## Accessibility

- `aria-live="polite"` sits on the wrapper holding the name and description, so the swap is
  announced as one unit.
- The service name is an `h3` under the `h2` "Our Services" section title.
- The card carousel is `aria-hidden`; the hand and the centre icon are decorative (`alt=""`).
- `prefers-reduced-motion` disables the slide-in animation and makes the scroll follow snap
  straight to the target instead of easing.

## Weight

The source hand was a 748 KB PNG. It is served as WebP at 191 KB, and the PNG was removed from
`public/`. The centre icon is a 1.5 KB SVG.

## Open

- The descriptions and the "What we build" eyebrow are agent-written and not owner-approved.
- The service names are the source's generic list. If Autonova's real services differ, they need
  replacing in the `SERVICES` array.