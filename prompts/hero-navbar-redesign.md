# Implementation prompt — Anti-Slop Hero & Liquid Metal Navbar Redesign

## Goal

Purge all generic AI-slop clichés (pulsing status eyebrow, 3-metric hero telemetry block, hallucinated sci-fi HUD card with segmented progress bar, neon cyan/blue drop shadows and glowing blur blobs, and rainbow gradient-clipped text) from the homepage Hero and Navbar. Rebuild both components with strict photographic fidelity to the source assets (`navbar desgin.jpg`, `hompage design video.mp4`, and `3d element.gif`), adhering rigidly to the engineered tokens in `design-system.md` and the stage-one constraints of `agent.md`.

## Skills & references read

- `agent.md` (Stage one boundaries, strict zero-tolerance for AI slop, four routes `/`, `/services`, `/about`, `/contact`, font rules Orbitron/Rajdhani/Inter, paperwork workflow)
- `design-system.md` (Void 950 `#030507`, Void 900 `#0A0E18`, Slate neutrals, Orbitron/Rajdhani/Inter type scales, authentic liquid-metal specular tokens without random glowing elements)
- `skills/architecture-skill.md` (Component modularity, server/client boundaries, zero unsolicited features)
- `sync/build.md` (Current build record)

## Code & assets inspected

1. **`navbar desgin.jpg` (Forensic pixel analysis)**:
   - Dimensions: 734x309 JPEG containing a centered 538x135 floating liquid-metal capsule container.
   - Color profile: Dominated by neutral metallic grey, chrome, and specular silver highlights (`#49494A`, `#666668`, `#A2A2A4`, `#89898B`, `#3C3E41`), with subtle dark smoked glass body.
   - Reality vs Slop: The asset contains ZERO neon cyan (`#00AECF`) borders and ZERO oversaturated blue glow rings. The previous implementation hallucinated neon outlines and glowing drop shadows that made it look like generic AI slop.
2. **`hompage design video.mp4` (Frame analysis at 00:00–00:06)**:
   - Canvas: Deep atmospheric dark void (`#111518` to `#22142B`), pure and calm with subtle specular ambient light, NOT covered in animated spinning grids or neon cyan blobs.
   - Typography: Bold, monumental "PROJECT TWELVE" set in Orbitron (font-black, uppercase, high-contrast clean white with subtle optical reflection, NOT gaudy rainbow text-clip gradients).
   - What the video actually contains:
     - Left: "PROJECT TWELVE" display heading, refined lead description, high-contrast action button group.
     - Right: Smooth, floating `3d element.gif` seamlessly integrated into the viewport.
   - What the video DOES NOT contain (hallucinated AI slop removed):
     - NO "YOUR AUTONOMOUS AI TEAM" pulsing ping dot eyebrow.
     - NO 3-column telemetry metric block ("Latency < 42ms / Uptime 99.99% / Stage 01 ACTIVE").
     - NO floating glassmorphic "NODE 12 ONLINE / NEURAL SYNC" HUD telemetry card with a 12-segment progress bar.
     - NO distracting background architectural grid pattern with radial alpha mask.
3. **`3d element.gif`**:
   - 800x600 fluid chrome metallic animation loop. Must sit cleanly on the canvas without clownish cyan drop-shadows or sci-fi overlay badges.
4. **Existing Codebase**:
   - `src/components/navbar.tsx`: Currently burdened with saturated cyan glows and fake gradient rings.
   - `src/components/hero.tsx`: Currently burdened with the hallucinated eyebrow, HUD card, telemetry bar, and pulsating blur divs.
   - `src/app/globals.css`: Contains unused/excessive glow animation keyframes and text-clip gradient rules.

## Decisions and assumptions

1. **Root Out Every Banned AI-Slop Pattern**:
   - Delete `hero-eyebrow` (banned pattern: "No hero eyebrows - tiny tracked-out uppercase labels above headings with pulsing dots").
   - Delete `hero-telemetry-bar` (banned pattern: "No 'hero metric' blocks - big number + tiny label + 3 stats").
   - Delete `hero-telemetry-hud` (banned pattern: "no randomly placed glowing elements, no vague 'modern' filler").
   - Delete fake neon blur blobs (`blur-[120px] bg-gradient-to-br from-[#1550B8]/30`) and the decorative grid pattern.
   - Delete gradient text (`chrome-gradient-text`) on the headline; replace with crisp, high-contrast white display typography with subtle specular depth.
2. **Navbar Grounded in `navbar desgin.jpg`**:
   - Center-docked floating capsule container.
   - Authentic liquid-metal specular chrome container using neutral silver/slate tones (`#A2A2A4` specular rim, `#49494A` edge bevel, `#0E121B` dark smoked core).
   - Brand mark: Crisp "AUTONOVA" in Orbitron bold with a sleek silver metallic emblem.
   - Nav links: `Home`, `Services`, `About`, `Project` styled in clean Rajdhani/Inter, high-legibility off-white with refined subtle active state (no neon blue pills).
   - Action: Sleek "Let's Talk" button with subtle liquid-metal chrome border and crisp typography.
3. **Hero Composition Grounded in `hompage design video.mp4`**:
   - Clean, asymmetric two-column layout on desktop, stacking naturally on mobile.
   - Left column: Commanding "PROJECT TWELVE" title in Orbitron Black, followed by an elegant, grounded description and a purposeful CTA button linking to `/contact`.
   - Right column: `3d element.gif` displayed cleanly, unobstructed by fake HUD cards, reflecting the pure liquid-metal aesthetic of the source video.
   - Canvas: Deep atmospheric Void 950 (`#030507`) with a restrained, dark specular ambient falloff that matches the video's actual pixel values (`#111518`–`#22142B`).

## Files to touch

| Action | Path | Purpose |
|---|---|---|
| Edit | `src/components/hero.tsx` | Rewrite hero: remove all AI slop (eyebrow, telemetry bar, HUD card, grid, glowing blobs), implement clean, authentic layout |
| Edit | `src/components/navbar.tsx` | Rewrite navbar: replace neon cyan glows with authentic neutral chrome specular capsule from `navbar desgin.jpg` |
| Edit | `src/app/globals.css` | Clean up CSS: remove slop gradient-text and glowing keyframes, retain solid typography variables and clean specular borders |
| Edit | `sync/build.md` | Update build record with anti-slop rebuild notes |
| Create | `documents/hero-navbar-redesign.md` | Document architectural decisions, forensic analysis, and anti-slop corrections |
| Edit | `debug/errors-log.md` | Log user feedback rejection and resolution |

## Requirements

- Eliminate all 5 identified AI-slop clichés.
- Replicate the exact visual tone and palette of `navbar desgin.jpg` and `hompage design video.mp4`.
- Maintain full responsiveness across mobile, tablet, and desktop viewports.
- Touch targets strictly ≥44px.
- Zero console errors, zero build warnings, valid HTML5 semantics.

## Security considerations

- Static presentation layer: zero client-side secrets, zero unvetted external scripts.
- Image optimization enabled with Next.js Image component and local assets.

## Acceptance criteria

1. The hero displays only the genuine elements from the video: commanding "PROJECT TWELVE" typography, concise narrative copy, primary CTA button, and the fluid 3D metallic element.
2. The pulsing eyebrow, 3-stat telemetry bar, and HUD overlay card are completely gone.
3. The floating navbar matches the neutral silver/chrome specular capsule in `navbar desgin.jpg` with zero neon cyan glows.
4. All navigation links (`Home`, `Services`, `About`, `Project`, `Let's Talk`) function properly with designated routes (`/`, `/services`, `/about`, `#project`, `/contact`).
5. `npm run lint` and `npm run build` pass cleanly with 0 errors.

## Checks to run

- `npm run lint`
- `npm run build`

## Manual test steps

1. Open homepage (`/`) in preview viewport.
2. Inspect Navbar: Confirm floating capsule has metallic chrome/silver bevels matching `navbar desgin.jpg` without any glowing cyan borders.
3. Inspect Hero Section: Confirm "PROJECT TWELVE" headline is rendered in high-contrast Orbitron Black without gaudy text gradients.
4. Verify Absence of AI Slop: Confirm that no pulsing status dot, no 3-stat telemetry bar, no HUD card with 12 segments, and no glowing blur blobs appear anywhere on the page.
5. Verify 3D Asset: Confirm `3d element.gif` plays smoothly on the right side of the hero, unobstructed.
6. Test Navigation: Click "Let's Talk" and confirm navigation to `/contact`.
7. Responsive Check: Resize viewport to mobile width (375px) and verify layout stacks smoothly with clean typography and touch-friendly targets.
