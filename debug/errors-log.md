# Error log

Newest first. One entry per error. The building agent appends to this file and never deletes entries.

```
## Date — short area label
Error: what failed and the error message (paste it).
Cause: why it happened.
Fix: exactly what solved it.
Status: fixed (or worked around).
```

## 2026-10-25 — Services panel cut off on a real laptop viewport
Error: On the owner's laptop, the Services panel clipped "Our Services" under the fixed navbar and
pushed the service name and write-up below the fold. The same section looked correct in DevTools at
1280 × 800 and 960 × 1440.
Cause: The panel used a fixed 720px height and `stickyTop = max(0, (innerHeight - 720) / 2)`. A real
laptop viewport is shorter than 720 after browser chrome, so the top clamped to 0 and the panel pinned
directly under the navbar. The device-mode views were tall enough to centre it, which hid the bug.
Fix: Cap the panel to `min(720px, 100dvh - safe-top - 18px)` in `swipe-hero.css`, and measure the
rendered panel plus the real `#main-navbar` bottom in `swipe-hero.tsx` so `stickyTop` is
`max(navBottom + 16, (innerHeight - panelHeight) / 2)`. The scroll track uses the same panel height.
Verified at 1366 × 650: panel 526px, top 106px, title clear of the navbar (bottom 90), description
ends at 599px inside the 650px viewport. Recorded in `prompts/services-responsive-height-fix.md`.
Status: fixed.

## 2026-10-10 — CrystalizedBall had no named export
Error: `src/components/sync-section.tsx(1,10): error TS2724: '"@/components/ui/crystalized-ball"' has no exported member named 'CrystalizedBall'. Did you mean 'CrystalizedBallProps'?`
Cause: The upstream React Bits component declares `const CrystalizedBall = ...` and exports it only as
the default. The other components in this project (`aurora.tsx`) export both a named and a default, and
`sync-section.tsx` imported the named one.
Fix: Changed the declaration to `export const CrystalizedBall = ...`, keeping the default export intact.
No behaviour change.
Status: fixed.

## 2026-10-10 — Scorecard: "Data updated" and "Monthly" were in the reference but not wanted
Not a runtime error. A deliberate cut, recorded so nobody re-adds them by copying the reference.
The supplied card image (`design/home/performance-scorecard.jfif`) contains a "Data updated 2h ago"
line and a "Monthly ⌄" dropdown. Neither is a real control — both are decoration in the picture — and
the owner asked for the card to be the curve and the number only. Both were left out of
`src/components/performance-results.tsx`.
Status: fixed by omission.

## 2026-10-10 — Duplicate scorecard value
Not a runtime error. `Business Automated` was given as `10+` in an earlier note, which is the same
value as `Workflows Simplified`. Shipped as given and flagged rather than silently invented around.
One line to fix: the `value` field of the fourth entry in `SCORES` in
`src/components/performance-results.tsx`. Awaiting the owner's real number.
Status: open — blocked on the owner.

## 2026-10-10 — agent.md still named the old build record and lacked the design-spec rule
Error: Not a runtime error. `AGENTS.md` (which holds the whole `agent.md` rules file) referred to the build
record as `sync/build.md` in five places after it was renamed to `sync/progress.md`, and §7 described
`design/` as reference images only, with no mention of the per-page `<page>-spec.md` convention.
Risk checked first: `AGENTS.md` wraps the rules between `<!-- BEGIN:nextjs-agent-rules -->` markers, and
`node_modules/next/dist/server/lib/generate-agent-files.js` → `upsertAgentRulesBlock` replaces everything
between those markers with freshly generated content on `next dev`. An edit there could be silently reverted.
Cause: The rules file was not updated when the folder structure was reorganised at the owner's request.
Fix: Owner approved the update. Backed the file up to `/tmp/AGENTS.md.bak`, replaced all five references,
added the `<page>-spec.md` clause to §7, then restarted `next dev` and re-checked: all five references
survived and the `agent.md` section was intact, so the regeneration did not clobber the edit. Also updated the
live convention docs `sync/README.md`, `architect/README.md` and `documents/README.md`.
Left alone on purpose: 10 references inside `prompts/` — those are historical records of past builds and
rewriting them would misstate what was written at the time.
Status: fixed. **Commit AGENTS.md with any work — the generator owns that block, so an uncommitted change
there is fragile by design.**

## 2026-10-10 — Project structure did not match the agreed convention
Not a code error. A restructure at the owner's request.
Cause: The build record was named `sync/build.md` instead of `sync/progress.md`, the per-page spec
files required under `design/<page>/` did not exist, and nine design references plus a build map were
sitting loose at the project root instead of inside the folders that own them.
Fix: `sync/build.md` → `sync/progress.md` and rewritten as the canonical progress record. Wrote
`design/home/home-spec.md` documenting what is actually built on `/` against its reference images,
and `design/{about,services,contact}/<page>-spec.md` recording that those routes do not exist yet.
Moved the loose references into `design/home/` (hero design, navbar design, design video, 3D asset,
project images, video source zip), moved `building.md` → `architect/build-map.md`, and moved the
verification capture into `debug/verification/`. Verified HTTP 200 and `pnpm lint` 0 errors after.
Still loose and deliberately not moved: `eng.traineddata` (OCR data), `metadata.json`, `bun.lock`
(stale, project is pnpm) and `skills-catalog.html`. See `sync/progress.md`.
Status: fixed.

## 2026-10-10 — Why Choose Us rendered below the hero
Not an error. Removal at the owner's request: the section was taken out of `src/app/page.tsx`
because it is being rebuilt. `src/components/why-choose-us.tsx` was intentionally left on disk as a
starting point and is now imported by nothing. See `documents/why-choose-us-removed.md`.

## 2026-10-10 — LaserFlow rendered an almost-black hero in headless Chrome
Error: No console error. Screenshot showed the hero background as plain black with no visible beam.
Cause: Not a bug in the component. Three separate causes stacked up in a software-rendered headless browser:
(1) `LaserFlow` clamps `dt` to `0.05`s per frame, so its 5-second intro only advances 0.05 per drawn frame.
(2) That environment (SwiftShader, no GPU) drew roughly 0.2 frames/sec, so after ~30s of wall time only ~6
frames had rendered — the intro was ~6% complete and the beam was still descending, i.e. mostly off-frame.
(3) Playwright's screenshot budget is 5s, and the shader saturated the compositor, so captures timed out.
Fix: Confirmed rendering was happening by patching `WebGL2RenderingContext.prototype.drawArrays` to call
`readPixels` inside the draw (a plain `readPixels` returns zeros because `preserveDrawingBuffer` is false),
which showed non-zero blue at the beam column and zero off it. Then temporarily set `intro={false}` and `dpr={1}`
to get a settled, cheap frame for the screenshot, and overrode `requestAnimationFrame` to a no-op to freeze the
loop so the compositor could produce a frame. Restored `intro` and `dpr` afterwards.
Status: fixed (component was correct; the diagnosis method is the reusable part).

## 2026-10-10 — LaserFlow ESLint: cannot update ref during render
Error: `src/components/ui/laser-flow.tsx:542:3 error Error: Cannot access refs during render ... settingsRef.current = settings;`
Cause: Upstream React Bits code assigns to a ref in the component body. Valid at runtime, but the React 19
`react-hooks/refs` rule forbids ref writes during render.
Fix: Removed the render-time assignment and folded it into the component's existing per-render effect, which
already calls `wakeRef.current?.()` to restart the loop. Same behaviour, rule satisfied.
Status: fixed.

## 2026-10-10 — Archived Aurora broke lint and the type-check
Error: `src/components/ReactBits/aurora.tsx:134:3 error Cannot access refs during render` and `153:9 prefer-const`
Cause: The archived copy of Aurora was placed inside `src/`, so eslint and `tsc` (`include: **/*.tsx`) both
picked it up. It carries the same two lint errors the original file always had.
Fix: Moved the archive to `react-bits/aurora.tsx` at the project root, outside `src/`, and added `react-bits/**`
to `globalIgnores` in `eslint.config.mjs`. Then removed the now-unused, byte-identical
`src/components/ui/aurora.tsx` (verified nothing imports it) so lint returns to 0 errors.
Status: fixed.

## 2026-09-07 — ESLint unused imports during BorderBeam & Hero rebuild
Error: `src/components/hero.tsx: Sparkles, ChevronRight, Plus is defined but never used; src/components/navbar.tsx: Github is defined but never used`
Cause: Leftover unused Lucide icon imports after refactoring Hero and Navbar.
Fix: Removed unused icon imports from both components and confirmed `pnpm lint` and `compile_applet` passed with 0 errors and 0 warnings.
Status: fixed.

## 2026-09-07 — ESLint unused imports in hero.tsx
Error: `src/components/hero.tsx: 6:36 warning 'Activity' is defined but never used, 6:59 warning 'Terminal' is defined but never used`
Cause: Unused icon imports left in `src/components/hero.tsx`.
Fix: Removed unused `Activity` and `Terminal` imports from `src/components/hero.tsx` and re-ran linting.
Status: fixed.

## 2026-09-07 — Next.js build / Tooltip & cn missing imports
Error: `src/components/ui/tooltip.tsx(8,4): error TS2503: Cannot find namespace 'TooltipPrimitive'. src/components/ui/tooltip.tsx(50,22): error TS2304: Cannot find name 'cn'.`
Cause: `src/components/ui/tooltip.tsx` was missing imports for `@base-ui/react/tooltip` and `cn`, while `src/lib/utils.ts` was an empty placeholder file missing the `cn` utility.
Fix: Installed `tailwind-merge`, implemented `cn` in `src/lib/utils.ts`, added imports for `React`, `TooltipPrimitive` from `@base-ui/react/tooltip`, and `cn` in `src/components/ui/tooltip.tsx`.
Status: fixed.

## 2026-09-06 — project scaffold
Error: `create-next-app` refused to scaffold: "Could not create a project called 'Autonova' because of npm naming restrictions: name can no longer contain capital letters."
Cause: the folder name (Autonova) has capitals, and this version of create-next-app derives the package name from the folder name with no way to override it (no `--name` flag in this version).
Fix: scaffolded into a temporary lowercase folder (`tmp-app`), moved everything including dotfiles into the project root, renamed the package to `autonova` in `package.json`, removed the temp folder.
Status: fixed.

## 2026-09-06 — shadcn init
Error: `shadcn init --base-color neutral` failed with "unknown option '--base-color'".
Cause: the current shadcn CLI replaced the old flags; the base color now comes from a preset instead of a direct flag.
Fix: ran `shadcn init -y -d --no-monorepo`, which produced `components.json` with a neutral base color.
Status: fixed.
