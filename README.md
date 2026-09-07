# AutoNova

A web interface for AutoNova — an AI-powered web system that builds full
websites and business systems that move businesses forward and enhance how
they operate.

**V1 scope:** the AutoNova web system. Voice and chat agents come in later
versions.

## Building this project

The default Next.js boilerplate code has been intentionally cleared — app entry
points are empty placeholders ready for a fresh build:

- `src/app/` — page, layout, and global styles
- `src/components/ui/` — UI component entry points
- `src/lib/utils.ts`

Before writing any UI code, read:

1. `design-system.md` — the binding visual language (colors, typography,
   spacing, radius, shadows, components). Do not deviate from it.
2. `agent.md` — build rules, including the no-AI-slop design requirement.

## Stack

- Next.js + TypeScript + Tailwind CSS (config files preserved and untouched)
- pnpm for package management

## Getting started

```bash
pnpm install
pnpm dev
```
