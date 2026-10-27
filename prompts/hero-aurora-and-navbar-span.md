# Implementation Prompt: Aurora WebGL Background, Transparent Logo & Expanded Navbar

## Goal
1. Replace the logo background on the navbar by using `public/logo-transparent.png` (with all dark background pixels removed) across both desktop navbar and top of mobile menu drawer.
2. Replace the hero background with the React Bits Aurora WebGL component using `ogl` with parameters `colorStops={["#7cff67", "#B497CF", "#05488e"]}`, `blend={0.5}`, `amplitude={1.0}`, and `speed={1}`.
3. Expand/span the navbar container across the page (`max-w-7xl` / full width with pixel padding) so text, links, and buttons span seamlessly and fit perfectly with the background.
4. Update the Hero main section heading text to: **"Building systems that move your business."**

## Skills & Documentation Read
- `AGENTS.md` (Next.js 16 conventions)
- `sync/build.md` (Current build record)
- `components.json` (shadcn setup)
- `package.json` (installed packages including `ogl`)

## Code Inspected
- `src/components/navbar.tsx`: currently uses logo inside fixed capsule; needs width expanded to `max-w-7xl px-4 sm:px-8` and logo updated to `public/logo-transparent.png`.
- `src/components/hero.tsx`: currently uses Globe component background; needs background replaced with `Aurora` WebGL shader component and title changed to "Building systems that move your business.".
- `src/components/ui/aurora.tsx`: new file to implement the `Aurora` WebGL component using `ogl`.

## Decisions & Assumptions
1. Install `ogl` package (`pnpm add ogl`).
2. Create `src/components/ui/aurora.tsx` with WebGL GLSL shader rendering fluid Aurora light effects (`#7cff67`, `#B497CF`, `#05488e`).
3. Replace the 3D globe background in `src/components/hero.tsx` with `<Aurora colorStops={["#7cff67", "#B497CF", "#05488e"]} blend={0.5} amplitude={1.0} speed={1} />`.
4. Update main hero title to "Building systems that move your business." while maintaining subtitle and CTAs.
5. In `src/components/navbar.tsx`:
   - Use `public/logo-transparent.png` with crisp transparent background.
   - Expand header wrapper from `max-w-5xl` to `max-w-7xl w-full px-4 sm:px-8` so it spans wide across the screen and aligns with the background.
   - Ensure mobile nav drawer top displays `public/logo-transparent.png` cleanly.

## Files Expected to Touch
- `src/components/ui/aurora.tsx`
- `src/components/hero.tsx`
- `src/components/navbar.tsx`
- `public/logo-transparent.png`
- `sync/build.md`
- `documents/hero-aurora-and-navbar-span.md`

## Requirements
- Navbar logo has zero background box/color.
- Hero background features animated WebGL Aurora effect.
- Header/Navbar spans wide across the screen (`max-w-7xl`) with balanced side padding.
- Hero main title updated to "Building systems that move your business."
- Clean compilation, zero TypeScript errors, passing build.

## Acceptance Criteria
- `pnpm exec tsc --noEmit` returns 0 errors.
- `pnpm lint` returns 0 errors.
- `pnpm build` passes cleanly.

## Manual Test Steps
1. Open `http://localhost:3000` in browser.
2. Verify hero background displays glowing WebGL Aurora animation.
3. Verify main hero heading reads "Building systems that move your business."
4. Verify navbar is wide (`max-w-7xl`), spanning nicely across the screen.
5. Verify logo image is transparent on both desktop navbar and top of mobile sidebar drawer.
