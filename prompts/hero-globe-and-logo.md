# Implementation Prompt: 3D Globe Background & AutoNova Logo Integration

## Goal
1. Configure `components.json` with React Bits Pro registries and add `@reactbits-starter/globe-tw` (Interactive 3D globe with animated arcs and location markers).
2. Replace the background in `src/components/hero.tsx` with the 3D globe model, adapting it to Autonova design tokens and dark celestial theme.
3. Update `src/components/navbar.tsx` to display `public/logo.png` without black background box on desktop navbar and on top of the mobile drawer menu when opened.

## Skills & Documentation Read
- `AGENTS.md` (Next.js 16 conventions & rule loop)
- `sync/build.md` (Current build state)
- `components.json` (shadcn registry configuration)
- `package.json` (dependencies)
- React Bits Pro Docs (`https://pro.reactbits.dev/docs/installation`, `https://pro.reactbits.dev/docs/components/globe`)

## Code Inspected
- `components.json`: needs `registries` section configured for `@reactbits-starter` (`https://pro.reactbits.dev`).
- `src/components/hero.tsx`: currently uses video loop background; needs to be replaced with 3D Globe background component.
- `src/components/navbar.tsx`: currently uses placeholder emblem text; needs `public/logo.png` with background transparency (`mix-blend-screen` / `mix-blend-lighten`) on main navbar and on top of mobile menu drawer.
- `public/logo.png`: Verified exists in project root `public/logo.png`.

## Decisions & Assumptions
1. Configure `components.json` with `@reactbits-starter` registry. Run `npx shadcn@latest add @reactbits-starter/globe-tw`. If cobe dependency is required, install `cobe`.
2. Adapt the 3D Globe in `src/components/hero.tsx` as an interactive, glowing 3D canvas background with ambient particles, arcs, and location markers behind the hero headline and interactive dock.
3. In `src/components/navbar.tsx`:
   - Replace the SVG emblem with `public/logo.png` using `mix-blend-screen` (or `mix-blend-lighten` CSS) so the black box background is transparent while the cyan/blue AutoNova logo glows seamlessly.
   - For mobile navbar: ensure `public/logo.png` is displayed at the top of the mobile sidebar drawer when opened.

## Files Expected to Touch
- `components.json`
- `src/components/ui/globe.tsx` (or React Bits Globe component file)
- `src/components/hero.tsx`
- `src/components/navbar.tsx`
- `sync/build.md`
- `documents/hero-globe-and-logo.md`

## Requirements
- 3D Globe component integrated into hero section background with animated arcs and location markers.
- AutoNova logo (`public/logo.png`) displayed cleanly without background on desktop nav bar.
- AutoNova logo displayed at top of mobile nav bar sidebar when opened.
- TypeScript strict compliance (0 type errors).
- Clean `pnpm build` output.

## Security Considerations
- No hardcoded secrets or API keys. `.env.local` used for environment variables if needed.

## Acceptance Criteria
- `pnpm exec tsc --noEmit` passes with 0 errors.
- `pnpm lint` passes with 0 errors.
- `pnpm build` passes with 0 errors.
- 3D Globe renders interactively in hero section background.
- Desktop and mobile navigation display AutoNova logo cleanly.

## Manual Test Steps
1. Run `pnpm dev` and visit `http://localhost:3000`.
2. Inspect Hero section background to verify 3D interactive Globe with animated arcs.
3. Verify desktop header navigation logo shows AutoNova image with transparent background.
4. Click mobile hamburger toggle to open mobile menu sidebar; verify AutoNova logo is displayed at top of sidebar drawer.
