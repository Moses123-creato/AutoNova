# Home — `/` — build spec

**What this page is built from, and what currently exists on it.**
Last updated: 2026-10-10

The page is built from the reference images in this folder. **I do not design** — these images and
the owner's notes are the source of truth. If the code and an image disagree, the image wins and the
code is wrong.

---

## Reference images used

| Image | What it drove |
|---|---|
| [`hero-section-ui-design.jfif`](./hero-section-ui-design.jfif) | **Current hero background.** A single blue laser dropping onto a dark control plane, light running the panel's top edge and spilling both corners. Only the *lighting effect* was reproduced from it — its copy, navbar and layout were deliberately **not** copied. |
| [`homepage-design-video.mp4`](./homepage-design-video.mp4) | Original hero rebuild reference. Supplied the control plane (the "dock"), the Tracker/Issues/Inbox structure, and the task-card layout. |
| [`navbar-design.jpg`](./navbar-design.jpg) | The floating liquid-metal capsule navbar. |
| [`3d-element.gif`](./3d-element.gif) | An earlier hero treatment with a 3D asset. **No longer used** in the hero. Kept for history. |
| [`projects/project-1.png`](./projects/project-1.png), [`projects/project-2.png`](./projects/project-2.png) | Project imagery. Project is a homepage section, not a route (`architect/build-map.md`). Currently unused — the section they fed has been removed. |
| [`performance-scorecard.jfif`](./performance-scorecard.jfif) | The card style for the Performance Results scorecard: glass box, blue glow along the bottom edge, decorative curve with a glowing node, label above a big value. Supplied as the style for **one** card; the section ships **four**. Its "Data updated 2h ago" line and "Monthly" dropdown were cut. |

---

## Sections currently on the page

### 1. Navbar — `src/components/navbar.tsx`
- Floating liquid-metal capsule, `fixed` to the top of the viewport.
- Transparent logo `public/logo-transparent.png`, also at the top of the mobile drawer.
- Spans the viewport: `max-w-7xl`.
- Links Home / Services / About / Project, plus a "Let's Talk" CTA → `/contact`
  (label and route are deliberately different, per `agent.md` §2).
- Mobile: slide-down sheet below `md`.

### 2. Hero — `src/components/hero.tsx`

**Laser background — the headline effect.**
- `LaserFlow` (React Bits, WebGL2) at `src/components/ui/laser-flow.tsx`.
- `surfaceRef` points at the control plane element, so the beam measures the real panel and light
  runs its edges. This coupling is structural — see `documents/hero-laserflow-background.md`.
- Colour `#1E66D9` (Nova 400 in `design-system.md`). Fog, flow and pulse raised above the
  component defaults on request.
- Cursor interaction kept. A five-second intro drop plays on mount.

**Copy — the project's own words, not the reference's.**
- Headline: "Building systems that move your business."
- Subtitle: "Autonova, an open-source autonomous platform, serves as an all-in-one replacement of
  Linear, Jira, Slack, and Notion."
- **Left-aligned.** It was centred until 2026-10-10; it moved left so the laser owns the right of
  the frame instead of crossing the headline.

**Control plane — `#interactive-app-card`.**
- Dark glass panel, `rounded-2xl`, `backdrop-blur-2xl`, wrapped in `BorderBeam` (colorful, `md`).
- Tracker / Issues / Inbox tabs; live "Sync live" indicator; issue filter pills
  (All, Backlog, To Do, In Progress, Done); task grid with toggleable completion, category tags,
  priority badges, assignee and timestamp.
- **Deliberately never redesigned.** Across every visual change on this page it kept its markup and
  behaviour. Only a `ref` was added so the laser could find it.

**CTAs.** "SEE IN ACTION" → `/contact`, wrapped in `BorderBeam` (sunset). "Interactive Dock" →
`#interactive-app-card`.

**Logo loop.** Marquee of the technology stack beneath the control plane.

### 3. Performance Results — `src/components/performance-results.tsx`

The impact scorecard. Four decorative glass cards under a heading.

- **Heading:** "Performance Results", with a two-line summary beneath it.
- **Cards:** `5+` Hours Saved Every Week · `10+` Workflows Simplified · `25+` Leads Generated ·
  `10+` Business Automated. All four the same Nova Blue.
- Each card is glassmorphism — dark surface, large radius, faint blue grid, blue glow along the
  bottom edge, soft bloom at the top — carrying a decorative animated curve with a glowing node at
  its peak, a small uppercase label, and a large value.
- **The curve is ornament, not data.** No series was supplied and none was invented.
- Cut from the reference: the "Data updated 2h ago" line and the "Monthly" dropdown.
- Responsive 1 / 2 / 4 columns. **Not** the reference's portrait proportions.
- Server component; all motion is CSS and stops under `prefers-reduced-motion`.
- **Open:** `Business Automated` carries `10+`, which duplicates `Workflows Simplified`. Needs the
  owner's real number.

### 4. Sync section — `src/components/sync-section.tsx`

Two columns. The **CrystalizedBall** on the left, a short write-up of Autonova on the right.

- The ball is React Bits `CrystalizedBall` (WebGL2 GPGPU, on `ogl`, already a dependency at
  `1.0.11`). Preset `abyss` with the colour overridden to `#1E66D9` so it matches the site accent.
- It is **live and interactive**: the cursor heats the rim and stirs the dust, a click shakes the
  ball. `prefers-reduced-motion` freezes it.
- The ball sits in a square glass box with a faint Nova Blue grid, matching the scorecard's card
  language. A "Live sync" badge overlays the top-left, using the `LIVE NODE` pattern from
  `design-system.md` (Signal Cyan `#00AECF`).
- Right column: eyebrow "One live system", heading "Everything stays in sync", a short body, and
  three points — Shared state, No handoffs, Always current.
- **The copy is agent-written**, at the owner's instruction, and is not owner-approved wording.
- Stacks on mobile with the ball first.
- Full write-up in `documents/sync-section-crystalized-ball.md`.

---

## Sections that were here and are not now

| Section | Status |
|---|---|
| Why Choose Us | **Removed 2026-10-10** at the owner's request — it was not liked and the whole section is being rebuilt. `src/components/why-choose-us.tsx` survives on disk, imported by nothing. See `documents/why-choose-us-removed.md`. |
| Aurora background | Replaced by LaserFlow. Source archived at `react-bits/aurora.tsx`. |
| 3D element | Dropped from the hero; the asset is kept above. |

## Current order down the page

1. Navbar
2. Hero — LaserFlow background, headline, control plane, logo loop
3. Performance Results — four-card impact scorecard
4. Sync section — CrystalizedBall on the left, Autonova write-up on the right

**Why Choose Us is gone**, so the page currently ends after the sync section. It is waiting on a
new design and will be rebuilt.

---

## Open on this page

- The laser's tuning numbers were set in a software-rendered browser and have **not been reviewed
  on real GPU hardware**. They are placeholders until someone looks at them on a real machine.
- The bottom vignette (`to-[#030509]/90`) sits over the beam/control-plane junction and is a
  suspect for dimming it. Not changed yet, on purpose.
- The page currently ends after the hero. The next section is waiting on a new design.

---

## How to change this page

1. Read `agent.md`, then `sync/progress.md`.
2. Write the implementation prompt into `prompts/`.
3. Build strictly to that prompt.
4. Update this spec, `sync/progress.md`, `documents/`, and `debug/errors-log.md`.
5. Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.