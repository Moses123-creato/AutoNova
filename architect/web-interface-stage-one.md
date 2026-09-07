# Architecture — web interface, stage one

Status: current. Last updated: 2026-09-06.

## Context

Stage one of Autonova: the public web interface. Four pages, a shared shell, no backend beyond what the pages need. Full scope and rules in `agent.md`.

## Structure

- Single Next.js app (App Router) under `src/`.
- Routes: `/` (Home), `/services`, `/about`, `/contact` (nav label "Let's Talk"). Everything else is out of scope for stage one.
- `src/app/layout.tsx` — root shell: fonts (Geist), metadata, TooltipProvider wrapper. A shared header/nav and footer will be added as feature components and included in the layout.
- `src/components/ui/` — shadcn base-nova component kit (button, card, input, label, badge, separator, dropdown-menu, avatar, tabs, skeleton, sheet, navigation-menu, tooltip, sonner). Feature components (header, footer, page sections) live in `src/components/`.
- `src/lib/utils.ts` — `cn` helper.
- `globals.css` — Tailwind v4 theme: CSS variables, neutral base, dark mode via `.dark`.

## Boundaries

- Server components by default; `"use client"` only where interactivity requires it (forms, toggles, browser-side animations).
- The contact form validates client-side and posts to a server route; the route is a stub until the delivery provider is decided. The browser never writes data directly and never holds secrets.

## Design

- The visual language is 3D-first and distinctive. The owner supplies the designs (`design/`) and fonts; the agent reproduces them exactly. See `agent.md`, UI work.

## Replaces / revises

- This is the first spec; nothing is replaced.

## Open questions

- Contact form delivery provider (email or other) — decided when the contact page is built.
- Final brand name — not chosen; working name is Autonova.