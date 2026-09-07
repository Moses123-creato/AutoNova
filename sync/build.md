# Build record — Autonova

Last updated: 2026-09-06 (initial seed)

## What this project is

Autonova (working name) — stage one: the public web interface. Full description and rules in `agent.md`.

## What is built

- Next.js 16 boilerplate (App Router, TypeScript strict, Tailwind v4, Turbopack), scaffolded with pnpm.
- shadcn/ui initialized in the base-nova style (on `@base-ui/react`) with the core component kit: button, card, input, label, badge, separator, dropdown-menu, avatar, tabs, skeleton, sheet, navigation-menu, tooltip, sonner.
- Theming wired in `src/app/globals.css` (CSS variables, neutral base, dark mode via `.dark`).
- Root layout with Geist fonts and TooltipProvider; metadata set to Autonova.
- Minimal placeholder home page at `src/app/page.tsx` — no real content yet.

## In progress

- Nothing right now.

## Where the work stops / next up

- Stage one scope: Home, Services, About, and Let's Talk (contact) pages with a shared header/nav and footer.
- The next page to build is Home — waiting on the owner to drop design references into `design/home/`.
- Everything beyond stage one is closed (dashboard, auth, agent showcase).

## Conventions

- Read `agent.md` before anything else.
- After every page build: update this file, write the page prompt record into `prompts/`, log any errors in `debug/`, document the work in `documents/`, and update `architect/` if the structure changed.