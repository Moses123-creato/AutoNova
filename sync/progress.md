# Progress — Autonova

**This is the single record of the build.** Where the project stands, what has been done, and what
comes next. Updated after every build step.

- Project: Autonova (working name) — stage one, the public web interface
- Rules and scope: `agent.md`
- Last updated: **2026-10-25**

---

## Where we are right now

The homepage renders **Navbar → Hero → Performance Results → Services → Sync section → Dashboard**.
The hero carries a blue `LaserFlow` laser that drops from the top of the frame, lands on the control
plane, and runs light along its top edge and over both corners. Below it sits the four-card impact
scorecard, then the scroll-pinned Services carousel, then the two-column sync section with the live
`CrystalizedBall` on the left and a short Autonova write-up on the right.

Three things are **not** finished:

1. The **LaserFlow has not been confirmed on real GPU hardware.** It renders in a software-rendered
   browser, but the owner reports seeing nothing on their machine. Blocked on the `[LaserFlow]`
   console diagnostic — see *Next up*.
2. The **Why Choose Us section has been removed** and is waiting to be rebuilt from a new design.
3. **`Business Automated` shows `10+`, which duplicates `Workflows Simplified`.** It needs the real
   number. One line in `SCORES` in `src/components/performance-results.tsx`.

---

## What has been done

### Foundation
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4, shadcn base-nova.
- Fonts wired through `next/font/google` in `src/app/layout.tsx`: Orbitron (display), Rajdhani
  (headings), Inter (body). Utilities `font-display` / `font-heading` / `font-body` in `globals.css`.
- Dev server serves on `0.0.0.0:3000`.

### Navbar — `src/components/navbar.tsx`
- Floating liquid-metal capsule, fixed to the top of the viewport.
- Transparent logo `public/logo-transparent.png` on desktop and at the top of the mobile drawer.
- Container widened to `max-w-7xl` so it spans the viewport.
- Links: Home, Services, About, Project; "Let's Talk" CTA routes to `/contact` per `agent.md`.
- Mobile: slide-down sheet below `md`.

### Hero — `src/components/hero.tsx`
- **Headline:** "Building systems that move your business."
- **Subtitle:** "Autonova, an open-source autonomous platform, serves as an all-in-one replacement of
  Linear, Jira, Slack, and Notion."
- Copy block is **left-aligned**, so the laser owns the right of the frame.
- CTAs: "SEE IN ACTION" (wrapped in `BorderBeam`, sunset) and "Interactive Dock".
- **Control plane** (`#interactive-app-card`): Tracker / Issues / Inbox tabs, issue filter pills,
  task grid with toggleable completion, priority badges, "Sync live" indicator. Wrapped in
  `BorderBeam` (colorful). Behaviour and markup unchanged throughout the visual work.
- **Logo loop** marquee of the technology stack, below the control plane.

### LaserFlow — `src/components/ui/laser-flow.tsx`
- React Bits `LaserFlow` (WebGL2, no `ogl`), added verbatim.
- `controlPlaneRef` is attached to `#interactive-app-card`. LaserFlow measures that element's real
  bounding box, so the beam lands on the actual panel and light runs its edges. **If the control
  plane is ever replaced with a canvas or a background image, the beam loses its floor.**
- Colour `#1E66D9` (Nova 400, per `design-system.md`). Fog, flow and pulse dialled up on request.
- Props: `beamPosition 0.72`, `intensity 2.4`, `beamWidth 1.5`, `flare 2.4`, `spread 2.4`,
  `spill 1.4`, `fog 0.45`, `dust 2.2`, `streaks 2.4`, `dots 1.2`, `pulse 2.8`, `speed 1.9`,
  `seed 3`, `mouseInteraction`, `intro`, `theme="dark"`, `dpr 1.5`.
- **Self-diagnosing.** It reports its own health to the console as `[LaserFlow] …`, and the result
  is readable at `window.__laserFlow`. Reports one of `ok`, `no-container`, `no-webgl2`
  (distinguishing WebGL1-only from no WebGL at all) or `shader-failed` (with the real driver
  compile/link log). On success it also lists any uniform that resolved to `null`.
- Two changes from upstream, both recorded in `debug/errors-log.md`: the render-time ref write was
  moved into an effect for the React 19 lint rule, and the diagnostics above were added.

### Performance Results scorecard — `src/components/performance-results.tsx`
- The impact scorecard, sitting below the Hero. Built from `design/home/performance-scorecard.jfif`,
  which supplied the **card style** for one card; the section ships **four**.
- Heading "Performance Results" plus a two-line summary.
- Four glassmorphism cards, all the same Nova Blue: `5+` Hours Saved Every Week, `10+` Workflows
  Simplified, `25+` Leads Generated, `10+` Business Automated.
- Each card carries a decorative animated curve with a glowing node at its peak, a small uppercase
  label, and a large value. **The curve is ornament — there is no data behind it.**
- Cut from the reference at the owner's instruction: the "Data updated 2h ago" line and the
  "Monthly" dropdown.
- Responsive 1 / 2 / 4 columns. Deliberately **not** the reference's portrait proportions.
- **Server component** — all motion is CSS (`score-curve`, `score-node`, `score-glow` keyframes in
  `globals.css`), so there is no client bundle for this section. All three animations stop under
  `prefers-reduced-motion`, and the curve draws once and holds rather than looping.
- Full write-up in `documents/performance-results-section.md`.

### Services section — `src/components/services/swipe-hero.tsx`
- Scroll-pinned service carousel inside a contained panel. The panel stays fixed while the page
  scrolls; the hand swipes, the centre icon spins, and the service name plus its one-line
  description swap.
- Six services from the supplied `SwipeHero` source. Descriptions are agent-written one-liners.
- Fonts are the site system: Orbitron for the display type, Inter for the body. The source's
  `system-ui` and Google Fonts link are not used.
- **Responsive height fix (2026-10-25):** the panel was a fixed 720px, which pinned under the fixed
  navbar on a real laptop (viewport under 720 after browser chrome) and pushed the name and write-up
  below the fold. It is now capped to `min(720px, 100dvh - safe-top - 18px)` and its sticky top is
  measured from the real navbar bottom. Full record in `prompts/services-responsive-height-fix.md`.
- Verified in headless Chrome at 1366 × 650: panel 526px, top 106px, title clear of the navbar,
  description ends at 599px inside the viewport.

### Sync section — `src/components/sync-section.tsx`
- Two columns: the live `CrystalizedBall` on the left, a short Autonova write-up on the right.
- React Bits `CrystalizedBall` at `src/components/ui/crystalized-ball.tsx` — WebGL2 GPGPU on `ogl`,
  which was **already a dependency** at `1.0.11`. No package change was needed.
- Preset `abyss` with `color` overridden to `#1E66D9` so the ball matches the site accent.
  Full prop table in `documents/sync-section-crystalized-ball.md`.
- Fully interactive: the cursor heats the rim and stirs the dust, a click shakes the ball.
  `prefers-reduced-motion` freezes it.
- The ball sits in a square glass box with a faint Nova Blue grid, matching the scorecard's card
  language, with a "Live sync" badge over the top-left in the `LIVE NODE` pattern from
  `design-system.md`.
- The section itself is a **server component**; only the ball is a client component.
- One change to the upstream component: a named export added, so it matches the import style of
  the other components here. No behaviour change.
- **The write-up copy is agent-written** and is not owner-approved wording.

### Removed
- **Aurora shader** — taken out of the hero, not lost. Source preserved verbatim at
  `react-bits/aurora.tsx`, outside `src/`, excluded from lint. Imported by nothing.
- **Why Choose Us section** — removed from the homepage at the owner's request, pending a rebuild.
  `src/components/why-choose-us.tsx` remains on disk as a starting point and is imported by nothing.

---

## Checks — current state

| Check | Result |
|---|---|
| `pnpm lint` | 0 errors, 5 warnings (pre-existing `<img>` warnings in navbar, swipe-hero and logo-loop) |
| `pnpm exec tsc --noEmit` | 0 errors under `src/`. Only errors are pre-existing, inside third-party `skills/` assets |
| `pnpm build` | Not run since the LaserFlow swap |
| Browser render | HTTP 200; Performance Results heading and all four card labels present in the served HTML. LaserFlow confirmed drawing in a software-rendered headless browser only |
| Sync section | HTTP 200; section markup and all copy present in the served HTML. The ball itself has **not** been seen rendering — no headless browser was available this session |
| Responsive | Services section confirmed at 1366 × 650; the rest of the page not re-checked this session |

---

## Next up

1. **Get the `[LaserFlow]` console line from the owner's machine.** Reload the hero, open DevTools →
   Console, and read the line (or type `__laserFlow`). This settles whether the beam is failing to
   start, failing to compile, or simply being dimmed. Everything else is guesswork until then.
2. **Re-verify the shipping config.** The only visual confirmation so far was taken with
   `intro={false}` and `dpr={1}` as a screenshot workaround. The shipped values (`intro`, `dpr 1.5`)
   have never been seen on a real GPU.
3. **The vignette is still `to-[#030509]/90`** across the bottom of the hero, directly over where
   the beam meets the control plane. Left alone deliberately until step 1 reports back.
4. **Rebuild Why Choose Us.** Needs a new design from the owner before any code is written. It was to
   sit between the Hero and the scorecard, or after it — the owner decides.
5. **Confirm the `Business Automated` number.** It currently shows `10+`, duplicating
   `Workflows Simplified`. One line in `SCORES`.
6. **Sign off the scorecard summary copy.** It was written by the agent because the owner delegated
   it, not because it was approved.
7. **Sign off the sync section write-up.** Same — agent-written copy, not approved wording.
8. Run `pnpm build` once the above settle.

### Housekeeping not yet dealt with
- `AGENTS.md` (which holds the `agent.md` rules file) has been updated to name `sync/progress.md` and to
  carry the per-page `<page>-spec.md` rule. **It sits inside the block `next dev` regenerates**, so commit
  it with any work. Verified it survives a `next dev` restart.
- `bun.lock` at the root is stale — the project is pnpm (`pnpm-lock.yaml` is live). Left alone
  rather than deleted.
- `eng.traineddata` (OCR data, 5.5 MB), `metadata.json` and `skills-catalog.html` (1.9 MB) are
  loose at the root with no obvious owning folder. Left alone.
- Roughly 40 `:Zone.Identifier` files are scattered through the tree — Windows metadata created when
  these files were copied via WSL. Safe to delete; not touched without a decision.
- `src/assets/images/lightning_liquid_beam_1788806884987.jpg` is unused (it fed the superseded
  lightning-beam hero treatment).
- 10 references to the old `sync/build.md` remain inside `prompts/`. Those are historical records of past
  builds and were deliberately not rewritten.

---

## Folder conventions

| Folder | Holds |
|---|---|
| `sync/` | This file. The build record. |
| `design/` | Owner-supplied reference images, one folder per page, plus a `<page>-spec.md` per page describing what is actually built against them. |
| `debug/` | `errors-log.md` — every error hit and how it was fixed, newest first. `verification/` for capture evidence. |
| `documents/` | What each feature is and how it works. |
| `prompts/` | The implementation prompt written before a build, and the record of what each page was built from. |
| `architect/` | Architecture specs and the build map. |
| `react-bits/` | Archived third-party React Bits sources. Not shipped, not linted, not imported. |

**Read `agent.md` first. After every build: update this file, write the page prompt record into
`prompts/`, log any errors in `debug/errors-log.md`, document the work in `documents/`, update the
page's spec in `design/`, and update `architect/` if the structure changed.**