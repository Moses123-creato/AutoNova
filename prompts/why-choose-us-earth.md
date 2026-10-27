# Implementation Prompt: Why Choose Us Section with 3D Earth Video & Liquid Metal Floating Cards

## Goal
Create a new "Why Choose Us" section on the homepage (`src/components/why-choose-us.tsx`) right below the hero & tech stack section, featuring the 3D Earth video loop (`/Earth.mp4`) at center surrounded by 4 glassmorphic floating cards (2 on the left, 2 on the right) wrapped in `BorderBeam` with liquid metal chrome specular highlights.

## Skills & Documentation Read
- `AGENTS.md` (Next.js 16 App Router conventions)
- `sync/build.md` (Current build record & stack)
- `design-system.md` (Tokens, dark celestial background `#030509`, liquid metal chrome effects, Rajdhani/Orbitron typography)
- Reference assets: `public/Earth.mp4`, `public/earth img.png`

## Code Inspected
- `public/Earth.mp4`: verified 3D Earth video asset exists.
- `public/earth img.png`: verified Earth image reference asset exists.
- `src/components/navbar.tsx`: verified liquid metal glassmorphic surface pattern and `BorderBeam` usage.
- `src/app/page.tsx`: root page file rendering sections sequentially.

## Decisions & Assumptions
1. Component location: `src/components/why-choose-us.tsx` exported and rendered in `src/app/page.tsx`.
2. Center Feature: High-definition 3D Earth video (`/Earth.mp4`) with `autoPlay`, `loop`, `muted`, `playsInline`, and poster image (`/earth img.png`).
3. Floating Glassmorphic Cards (4 corners around Earth: 2 left, 2 right):
   - **Card 1 (Top Left - Autonomous Execution)**: 24/7 autonomous dispatch loop running dev, infra, and operations continuously.
   - **Card 2 (Bottom Left - Unified Tooling)**: Single platform replacing Linear, Jira, Slack, and Notion with 0 context switching.
   - **Card 3 (Top Right - Enterprise Security)**: Bank-grade encryption, local key control, and isolated sandbox execution environments.
   - **Card 4 (Bottom Right - Global Scale & Velocity)**: Multi-region instant deployment with sub-10ms response times worldwide.
4. Visual Styling:
   - Glassmorphic card surface: `backdrop-blur-2xl bg-[#06080F]/85 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.8)]`.
   - Liquid metal chrome shimmer overlay (`liquid-metal-chrome mix-blend-overlay`).
   - Wrapped with `<BorderBeam size="md" colorVariant="ocean" strength={0.8} theme="dark" borderRadius={16}>`.
   - Subtle pulse connectors / orbit lines linking cards to Earth.
   - Responsive design: 2-column grid flanking video on desktop/tablet, stacked vertically on mobile.

## Files Expected to Touch
- `src/components/why-choose-us.tsx`
- `src/app/page.tsx`

## Requirements
- Use `/Earth.mp4` video (do not draw or synthesize canvas Earth animation).
- Section title: "Why Choose Us" with badge "ENTERPRISE CAPABILITIES".
- 4 glassmorphic floating cards with liquid metal bloom beam effect.
- 0 TypeScript errors (`pnpm exec tsc --noEmit`).
- Clean production build (`pnpm build`).

## Security Considerations
- No hardcoded secrets.
- Native HTML5 video tag with `muted` and `playsInline` for seamless autoplay across browsers.

## Acceptance Criteria
- Section renders cleanly below Hero/LogoLoop section.
- Video loops smoothly at center.
- 4 cards float on four corners (2 left, 2 right) with liquid metal borders and glowing beams.
- Responsive layout down to mobile.
- `pnpm exec tsc --noEmit` and `pnpm build` pass with 0 errors.

## Manual Test Steps
1. Run `pnpm dev` and navigate to `http://localhost:3000`.
2. Scroll down below the hero section to the "Why Choose Us" section.
3. Verify the 3D Earth video loops smoothly.
4. Verify 4 floating glassmorphic cards display on left and right with liquid metal bloom beams.
5. Resize window to mobile viewport and verify responsive stacking.
