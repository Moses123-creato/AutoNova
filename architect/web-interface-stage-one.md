# Architecture — web interface, stage one

Status: current. Last updated: 2026-09-06.

## Context

Stage one of Autonova: the public web interface. Four pages, a shared shell, no backend beyond what the pages need. Full scope and rules in `agent.md`.

## Structure

- Single Next.js app (App Router) under `src/`.
- Routes: `/` (Home), `/services`, `/about`, `/contact` (nav label "Let's Talk"). Everything else is out of scope for stage one.
- `src/app/layout.tsx` — root shell: Google Fonts (`Orbitron`, `Rajdhani`, `Inter`), dark theme default, metadata.
- `src/components/navbar.tsx` — Floating liquid-metal capsule navbar with dual-rim chrome highlights, responsive brand mark, route links, and "Let's Talk" CTA.
- `src/components/hero.tsx` — Homepage hero section reproducing the 00:00–00:06 hero sequence of `hompage design video.mp4` with integrated `3d element.gif` (in `public/3d-element.gif`), live HUD telemetry chip, liquid metal headlines, and action CTAs.
- `src/components/ui/` — shadcn base-nova component kit (button, card, input, label, badge, separator, dropdown-menu, avatar, tabs, skeleton, sheet, navigation-menu, tooltip, sonner).
- `src/lib/utils.ts` — `cn` helper.
- `globals.css` — Tailwind v4 theme: CSS font variables, liquid metal chrome gradient utilities, and dark mode background (#030507).


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