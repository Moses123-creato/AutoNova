# Implementation prompt — Home Page Hero Section & Liquid Metal Navbar

## Goal

Build the liquid-metal navbar and the hero section on the homepage (`/`), faithfully matching the design video (`hompage design video.mp4` hero sequence, timestamps 00:00–00:06), incorporating the 3D fluid metallic chrome asset (`3d element.gif`), and styling the floating capsule navbar per `navbar desgin.jpg`, adhering strictly to `design-system.md` and `agent.md`.

## Skills & references read

- `agent.md` (Stage one boundaries, strictly no AI slop, four routes `/`, `/services`, `/about`, `/contact`, font rules, paperwork workflow)
- `design-system.md` (Void 950 `#030507`, Nova Blue `#0B2C63`–`#1550B8`, Signal Cyan `#00AECF`, Orbitron/Rajdhani/Inter typographic scale, liquid-metal chrome borders, HUD/status tokens, buttons)
- `README.md` (Project overview & guidelines)
- `sync/build.md` (Current build status)
- `skills/architecture-skill.md` (Component architecture & interface guidelines)

## Code & assets inspected

- **`hompage design video.mp4` (Hero sequence analysis, 00:00–00:06)**:
  - **Composition**: Wide cinematic hero section with an asymmetrical split on desktop: prominent high-contrast metallic typography on the left, paired with the animated 3D metallic fluid object on the right.
  - **Atmosphere & Lighting**: Deep Void 950 background (`#030507`) with a localized radial Nova Blue / deep violet ambient illumination centered behind the 3D chrome element, creating rich specular depth without washed-out gradients.
  - **Typography & Hierarchy**:
    - **Eyebrow indicator**: Subtle HUD badge with pulsing status dot (`#00AECF` Signal Cyan) and tracking-widest monospace/Rajdhani text indicating active status.
    - **Main Headline**: Monumental Orbitron display typography ("PROJECT TWELVE" / "AUTONOVA") featuring a brushed liquid-metal chrome gradient fill and crisp specular contrast.
    - **Narrative Subtitle**: Clear, high-readability Inter body copy describing the autonomous AI systems and architectural foundation.
  - **3D Fluid Element Integration**:
    - Uses `3d element.gif` seamlessly integrated on the right half of the hero stage.
    - Overlay/adjacent HUD card: Semi-transparent dark metallic card displaying technical specifications, telemetry, and quick secondary action with subtle hairline borders.
  - **Action Group**: Primary liquid-metal chrome pill button with hover specular sweep, paired with a secondary hollow technical outline button.
- **`navbar desgin.jpg`**:
  - Floating pill/capsule Liquid Metal Navbar navbar centered at the top of the viewport.
  - Dual-rim specular chrome highlight along the top and bottom curved edges (giving the distinctive liquid-metal capsule container look).
  - Brand identity on the left, centered navigation links (`Home`, `Services`, `About`, `Let's Talk`), and an action CTA button on the right.
- **`3d element.gif`**:
  - 800x600 fluid 3D chrome metallic loop with dynamic reflections, prepared for responsive positioning.
- **Codebase inspection**:
  - Next.js 16 App Router with React 19 and Tailwind CSS v4.
  - Google Fonts setup in `layout.tsx` for `Orbitron`, `Rajdhani`, and `Inter`.

## Decisions and assumptions

1. **Strict Stage-One Scope**: Build **only** the floating navbar and hero section on the homepage (`/`). No additional pages, footers, or unrequested sections will be built at this time.
2. **Navigation routes**: Routes strictly match `agent.md`: Home (`/`), Services (`/`), About (`/`), and Let's Talk (`/contact`). The navbar stays fixed/sticky at the top with a floating pill container replicating `navbar desgin.jpg`.
3. **Hero Layout & 3D Integration**:
   - Desktop: Two-column architectural split. The left column hosts the live status eyebrow, high-impact display title, description, and dual CTA buttons. The right column hosts `3d element.gif` surrounded by the ambient glow and technical HUD telemetry card.
   - Mobile: Responsive stack where the 3D element scales cleanly, typography tightens mathematically, and touch targets remain ≥44px.
4. **Visual Language**: Zero AI slop. Adheres 100% to `design-system.md`: exact tokens, no random floating blobs or generic purple gradients, crisp 1px borders with mathematical radius calculation (`Inner Radius = Outer Radius - Padding`).
5. **Asset Pipeline**: Place `3d element.gif` into `public/assets/3d-element.gif` (or `public/3d-element.gif`) for optimal static serving by Next.js.

## Files to touch

| Action | Path | Purpose |
|---|---|---|
| Edit | `src/app/layout.tsx` | Configure Google Fonts (Orbitron, Rajdhani, Inter) and metadata |
| Edit | `src/app/globals.css` | Define font utility classes, theme variables, and liquid-metal specular gradient rules |
| Create | `src/components/navbar.tsx` | Floating liquid-metal capsule navbar matching `navbar desgin.jpg` |
| Create | `src/components/hero.tsx` | Complete hero section matching `hompage design video.mp4` with `3d element.gif` |
| Edit | `src/app/page.tsx` | Assemble the Navbar and Hero components |
| Create | `public/3d-element.gif` | Copy the 3D gif into public directory for zero-latency asset delivery |

## Requirements

- Pixel-precise replication of the layout, hierarchy, and lighting from `hompage design video.mp4`.
- Precision liquid-metal capsule navbar per `navbar desgin.jpg`.
- Smooth playback and proper positioning of `3d element.gif`.
- Fonts Orbitron, Rajdhani, and Inter applied strictly per typographic guidelines.
- Responsive design down to mobile viewports.

## Acceptance criteria

- Floating navbar rendered at top with liquid-metal chrome border highlights and links.
- Hero section rendered with high-contrast chrome typography, ambient Nova Blue illumination, and fluid 3D animated asset.
- Zero console errors, valid HTML semantics, and accessible contrast ratios.
- `npm run lint` and `npm run build` pass cleanly without errors.

## Checks to run

- `npm run lint`
- `npm run build`
