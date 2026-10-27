# Prompt — Services section (SwipeHero)

Implementation prompt for the Services section on `/`, written before the build.

## Goal

The site's main Services section. A scroll-pinned service carousel in a contained panel: the box
stays fixed while you scroll through each service, and the service name and its description swap
as you go.

## Source

`design/services/swipe-hero/` — a `SwipeHero.jsx` + `SwipeHero.css` pair with two assets
(`public/hand-blue.png`, `public/icon.svg`). Ported to TypeScript.

## Requirements from the owner

- The section is the site's Services section. **Heading: "Our Services".**
- Reproduce the design as it is.
- **Use the site's design-system fonts** — not the fonts the source file brings.
  The source used `system-ui` and a Google Fonts link for Inter + JetBrains Mono.
- **Reduce the width** on both mobile and desktop. It should not cover the whole page; it should
  read as a section in a box.
- Inside that box, there is room for a **description of each tech service** under its name.
- **Place it after Performance Results**, not immediately before the dashboard.

## Skills read

- `agent.md` — scope, the three-font rule, server-components-by-default
- `design-system.md` — Nova Blue scale, the wordmark gradient treatment
- `scripts/react-components-instant-render.txt` — the project brief for instant rendering

## Decisions and assumptions

- **Section order:** Hero → Performance Results → **Services** → Sync section → Dashboard.
- **The service names are the source's list**, unchanged. The owner said "design the way it is" and
  did not supply different services, so no content was invented.
- **The descriptions are new.** The owner asked for a description per service and did not supply
  text, so six one-liners were written in the site's voice. They live in one `DESCRIPTIONS` array.
- **Fonts:** Orbitron (`font-display`) for the display type, Inter (`font-body`) for the body. The
  source's `system-ui` stack and its Google Fonts link are not used. JetBrains Mono is not
  introduced — the design system allows three families only.
- **The headline gradient was replaced** with the design system's wordmark gradient
  (`#FFFFFF → #BFE0FF → #3F84EA → #0B2C63`) instead of the source's simpler two-stop white→blue.
- **Type size reduced** from `clamp(28px, 5.4vw, 68px)` to `clamp(22px, 4.2vw, 52px)`. Orbitron is
  noticeably wider than the source's system font, and the longest service name overflowed at the
  original size. This is a consequence of the font change, not a redesign.
- **The box:** `min(100%, 1040px)` wide, centred, rounded, with a Nova Blue hairline border and a
  deep shadow. The page's own `#030507` shows around it on every viewport.
- **Semantics:** the service name became an `h3` under the new `h2` section title. `aria-live` moved
  from the heading to the wrapper so the name and its description announce together.
- **Hand asset converted** to WebP (`748 KB → 191 KB`) and the PNG removed from `public/`.

## Files

| File | Role |
|---|---|
| `src/components/services/swipe-hero.tsx` | The component, ported to TypeScript. |
| `src/components/services/swipe-hero.css` | The styles, with the design-system fonts and the contained box. |
| `src/components/services-section.tsx` | The section wrapper that sets the title and description. |
| `public/hand-blue.webp` | The hand. Converted from the source PNG. |
| `public/icon.svg` | The centre icon, copied from the source. |
| `design/services/swipe-hero/` | The original source, kept for reference. |

## Accessibility

- `aria-live="polite"` on the name + description wrapper, so the swap is announced.
- The card carousel and the decorative images are `aria-hidden` / `alt=""`.
- `prefers-reduced-motion` disables the name and description slide-in, and the scroll follow snaps
  straight to the target position.

## Acceptance criteria

- The section is a contained box, narrower than the page, on mobile and desktop.
- The heading reads "Our Services".
- Each service shows its name and a one-line description.
- Scrolling through the section swaps the name and description, and the hand swipes.
- `pnpm lint` 0 errors, `tsc --noEmit` 0 errors in `src/`.

## Checks to run

`pnpm exec tsc --noEmit` · `pnpm lint` · `pnpm build` · `pnpm dev`, then scroll the section.

## Manual test steps

1. Open `/` and scroll to the Services section — it sits after Performance Results.
2. The box is centred and does not span the full width.
3. "Our Services" is in the top-left of the box.
4. Keep scrolling: the service name and its description swap, the hand swipes, the centre icon spins.
5. Resize to mobile — the box shrinks with the page and keeps its gutters.
6. Turn on "reduce motion" in the OS and reload — the section renders without the slide-in.

## Result

Built. `pnpm lint` 0 errors (5 warnings, all `<img>` ones), `tsc --noEmit` 0 errors in `src/`,
`pnpm build` succeeds.