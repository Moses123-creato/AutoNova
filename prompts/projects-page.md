# Implementation prompt — Projects page

## Goal

Add a `/projects` page to the web interface: a portfolio grid of project cards (name, image, short description, external link).

## Skills read

- `agent.md` (sections 2, 3, 4, 7, 8)
- `skills/architecture-skill.md`

## Code inspected

- `sync/build.md` — current build state
- `src/app/page.tsx` — existing page conventions
- `src/components/ui/card.tsx`, `src/components/ui/button.tsx` — shadcn components to reuse
- `src/app/layout.tsx` — root shell (no header/footer yet; just adding the route)

## Decisions and assumptions

- Projects become a stage-one page: agent.md section 2 will be updated from four pages to five.
- No design reference exists yet for this page. This is a structural first pass using the existing Tailwind + shadcn design tokens. The owner will replace the visuals with a proper design later.
- Project data is hardcoded directly in the page as a const array (no CMS yet). Each entry is an object with: `name`, `description`, `image` (placeholder path), and `link` (external URL).
- Placeholder images: solid color blocks via `div` with Tailwind background utility until the owner supplies real assets — avoids needing unused image files.
- The page is a server component (no `"use client"`). External cards open in a new tab with `rel="noopener noreferrer"`.
- Route slug: `/projects` (plural, consistent with `/services`).

## Files to touch

| Action | Path | What |
|--------|------|------|
| New | `src/app/projects/page.tsx` | The Projects page |
| New | `design/projects/.gitkeep` | Design subfolder for this page (per design/README.md) |
| Edit | `agent.md` | Add Projects to section 2 (stage one scope: five pages now) |
| Edit | `sync/build.md` | Update build record after build |

## Requirements

- **Page heading**: "Projects" title + a short subtitle about the portfolio.
- **Card grid**: responsive Tailwind grid — 1 column on mobile, 2 on `md`, 3 on `lg`.
- **Each card** (using `src/components/ui/card.tsx` and `src/components/ui/button.tsx`):
  - Image area (top) — a styled placeholder `div` with a background color and a note; no real image file needed yet.
  - Project name — rendered in a `<CardTitle>`.
  - Short description — rendered in `<CardDescription>`, one paragraph.
  - "View project →" link button — opens the external URL in a new tab.
- **Data**: a hardcoded `const projects` array of 3–4 placeholder entries with TODO comments marking where to swap in real content.
- **Server component**: no `"use client"` directive; no client-side state needed.
- **Responsive**: column layout adapts cleanly from mobile to desktop.

## Security considerations

- All external links use `target="_blank"` with `rel="noopener noreferrer"`.
- No forms, no user input, no secrets — fully read-only page.

## Acceptance criteria

- `/projects` route renders without errors in both dev server and production build.
- Page shows a responsive grid of 3–4 project cards.
- Each card has: a placeholder image area, project name, description, and a working external link.
- Placeholder data is clearly marked with TODO comments so the owner sees where to swap in real content.
- `agent.md` section 2 lists Projects as a stage-one page.
- `design/projects/` folder exists with a `.gitkeep`.

## Checks to run

```bash
pnpm exec tsc --noEmit   # type check
pnpm lint                 # lint
pnpm build                # production build (new route)
pnpm dev                  # confirm the page renders
```

## Manual test steps

1. Run `pnpm dev`.
2. Open `http://localhost:3000/projects`.
3. Confirm page heading and subtitle render.
4. Confirm card grid shows 3–4 cards with placeholder content.
5. Resize browser: 1 column on mobile, 2 on `md`, 3 on `lg`.
6. Click a "View project →" link — confirm it opens in a new tab.
7. Spot the TODO comments in the data array — confirm they are visible and clear.