# Prompt — Performance Results scorecard section

The implementation prompt for the Performance Results section on `/`, written before the build.

## Goal

Add an impact scorecard section below the Hero on the homepage. Four decorative glass cards in the
project's Nova Blue, under a heading and a two-line summary.

## Skills read

- `agent.md` — scope, the three-font rule, server-components-by-default, no AI slop
- `design-system.md` — Nova Blue scale, glass surfaces, typography
- `sync/progress.md` — where the build stands

## Reference

`design/home/performance-scorecard.jfif` — a single dark glass card: rounded corners, faint grid,
blue glow pooling along the bottom edge, a soft blue bloom at the top, a smooth curve with a glowing
node at its peak, and a label-above-big-number hierarchy. **The reference shows one card as the
style; the section needs four.** Its proportions are not to be copied — the cards are landscape and
must fit every viewport.

## Decisions and assumptions

- **Four cards**, all the same blue. (The request briefly mentioned mixed colours, then settled on
  all blue.)
- Card 4 is **Business Automated**, and its value was given earlier in the conversation as `10+`.
  That duplicates card 2's `10+` — **flagged, needs the owner's real number.**
- The curve is **decorative, not data**. No series was supplied and none was invented.
- "Data updated 2h ago" and the "Monthly" dropdown from the reference were **removed** — the card is
  the curve and the number only.
- Number format confirmed by the owner: big value, small uppercase label above it.
- Summary copy written by me in the site's voice, as instructed, rather than supplied.

## Requirements

1. New component `src/components/performance-results.tsx`, added to `src/app/page.tsx` after `<Hero />`.
2. Four cards, all Nova Blue: `5+` Hours Saved Every Week, `10+` Workflows Simplified, `25+` Leads
   Generated, `10+` Business Automated.
3. Glassmorphism: dark surface, large radius, faint blue grid, blue glow at the bottom edge, soft
   bloom at the top, subtle inner highlight on the top border.
4. Decorative animated curve with a glowing node at its peak.
5. Responsive: one column on mobile, two on tablet, four on desktop. **Not** the reference's
   proportions.
6. No "Data updated" or "Monthly" affordances.

## Security

No secrets, no data fetching, no user input. Static server-rendered markup.

## Acceptance criteria

- Heading "Performance Results" and a two-line summary render above the grid.
- Four cards render, all blue, in a 1 / 2 / 4 column grid.
- Each card shows its curve, glowing node, label and value.
- No layout overflow at 360px, 768px or 1440px.
- `pnpm lint` 0 errors, `tsc --noEmit` 0 errors in `src/`.

## Checks to run

`pnpm exec tsc --noEmit` · `pnpm lint` · `pnpm dev` and check 360 / 768 / 1440.

## Manual test steps

1. Open `/` and scroll past the Hero.
2. Confirm the heading, the summary and four blue cards.
3. Resize to mobile — cards stack one per row, nothing clipped.
4. Resize to desktop — four across.
5. Enable "reduce motion" in the OS and reload — the curve draws in once and stops animating.

## Result

Built. `pnpm lint` 0 errors (3 pre-existing warnings), `tsc --noEmit` 0 errors in `src/`, HTTP 200,
section and all four labels present in the served HTML.