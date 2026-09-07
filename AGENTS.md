<!-- BEGIN:nextjs-agent-rules -->
@AGENTS.md

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.



# agent.md — Autonova (working name)

This is the file that runs this project. If you are an agent working here, read this whole file before you touch anything — I mean it. Then read `AGENTS.md`; Next.js maintains a set of rules there about the version of Next.js this repo uses, and it regenerates the block on its own, so it is always current. Then go read the actual code.

I wrote this so you always know which stage we are in, what I have decided, and what I have deliberately left open. Do not assume. Do not skip ahead. Do not build the future stages because they sound cool — I will tell you when we get there.

## 1. What this project is

Autonova (working name — the folder and package are called `autonova`; the final brand name is not decided, so do not invent marketing copy) is a system with three parts, built one at a time:

1. **The web interface** — the public site. This is what exists today.
2. **The dashboard** — my control room, where I monitor activity and connect my agents. Planned, not built.
3. **The agent showcase** — a section of the site that displays agents. Planned much later, and we may never build it the way I imagine it today.

Right now we are in stage one: a Next.js application that serves the web interface. That is all. The dashboard, auth, and showcase are closed until I open them.

## 2. What stage one contains

The web interface is a small set of pages:

- **Home** — the front door. Hero, the site's visual language, and whatever sections my design shows.
- **Services** — what we do.
- **About** — who we are.
- **Poject**
- **Let's Talk** — the contact page. It carries the contact form.

That is the whole site for now: four pages, a shared header/nav, a shared footer. No blog, no pricing page, no login, no search, no newsletter. If a design shows something I have not listed here, ask me before building it — do not invent pages to fill space.

Routes live in the App Router: `/`, `/services`, `/about`, and `/contact`. The nav link is labeled "Let's Talk" but the route is `/contact` — keep the label and the slug separate as I have set them.

The contact form needs to eventually do something real, but the delivery mechanism is not decided. So: build the form UI and its validation exactly per the design, post it to a server route, and leave that route as a clearly marked stub until I pick a delivery provider. Do not choose an email provider on your own, and do not install one without asking.

## 3. How to work

The loop, every time:

1. Read this file, then `AGENTS.md`, then any skills (section 5), then `sync/build.md` — know where the project stands before you move.
2. Explore the codebase first, before you assume how anything is shaped. Look at `package.json`, `components.json`, `src/`, the components under `src/components/ui/`, `globals.css`, and the route files. Understand the stack with your own eyes, not from memory.
3. Ask one focused question only if the task is genuinely ambiguous. One. Do not interrogate me.
4. Write an implementation prompt in `prompts/`: the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps. The prompt is the contract between us.
5. Ask me in the question panel, with Yes and No as selectable options: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt. Maintain the project folders (section 7) as part of the build — the paperwork is not an afterthought. Then run the checks (section 12), and close with a short report — bullets only — under three headings:
   - **What I did** — a few one-line bullets.
   - **Test** — numbered steps to run or see.
   - **Needs your attention** — anything I must decide or fix, or say there is nothing.

Keep every line short. Detail and rationale go in the prompt file, not in the report.

No code before the prompt is approved — unless I tell you to skip the prompt.

## 4. UI work

**Design system.** Whenever UI/builds are happening, read and follow `design-system.md` first — it is the binding visual language for this project. Buy into its tokens (colors, typography, spacing, radius & shadows, icons, buttons, inputs, badges/chips, status, progress/HUD, cards, navigation, principles) before writing any component, layout, or markup. Do not invent new tokens, do not pull values from memory, and do not drift from what is defined there.

**No AI slop.** Designs must be deliberate and engineered, not generic AI slop. There are no floating blobs, no overused gradients-as-decoration, no randomly placed glowing elements, no vague "modern" filler. Each surface, each interaction, each animation has a reason. If a design decision cannot be justified against the design system or the page reference, cut it or ask before adding it.

Typography, size, and spacing are exactly what design-system.md specifies —no tiny AI-slop text, no overly tight or cramped type, no spammy upscaling. Fonts are Orbitron for Display 1 / Display 2 / Heading 1, Rajdhani for Heading 2–3, and Inter for body — only these three. Do not substitute, do not invent new families, and do not pick a font because a demo or template uses it.

I do not design UI. Full stop. I give you the design as desktop images plus a short prompt, and you reproduce them exactly: layout, spacing, typography, color, states, the lot. The site's look is deliberately 3D-first and distinctive — not a generic template, not placeholder aesthetics. I supply the fonts too; you do not pick them. There is no mobile reference, so make each page responsive down to mobile by adapting sensibly (stack columns, tighten spacing) while keeping the desktop pixel-exact.

Reuse the components and Tailwind patterns already in the project before you add new ones. When there is a reference image, it is the source of truth — and this file says nothing about visuals on purpose, so do not go looking for visual specs here.

## 5. Skills

The project has its own skills folder: `skills/`. It holds the "how we do things here" files, starting with `skills/architecture-skill.md`. You are expected to create and follow these skills: read the ones that exist and follow them, and when a way of working proves itself and is not yet written down, write it as a skill. Skills are short, concrete, and maintained by the agents doing the work — never by me.

Separately, `.agents/skills/` may hold installable third-party skills; if the project lacks a skill you think you need, say so in the prompt and we decide together. For anything Next.js-specific, read the guides in `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`). For any other package, follow its docs and the patterns already in the repo.

## 6. How the app is structured

A single Next.js app under `src/`:

- `src/app/` — App Router routes and layouts. The root layout is the shell: fonts, metadata, providers.
- `src/components/` — `ui/` holds the shadcn primitives (button, card, input, and the rest). Feature components such as the header, footer, and page sections are yours to organize as they appear.
- `src/lib/` — shared utilities (e.g. `utils.ts` with the `cn` helper).
- `globals.css` — the theme. Tailwind v4 configures itself in CSS here (`@theme`, CSS variables), not in a `tailwind.config` file.
- `components.json` — the shadcn configuration (base-nova style, neutral base color, `@/*` aliases). Check it before adding components.

Boundaries you must respect:

- Server components by default. A component becomes a client component only when it genuinely needs interactivity, and it does so explicitly with `"use client"`.
- Any write — the contact form now, progress and user state later — goes through a server route. The browser never holds secrets and never writes data directly.
- Secrets live in env vars, server-side only. A committed `.env.example` is the canonical list of what the app needs.

## 7. Project folders — part of the job

This project runs on paperwork, and the paperwork is yours. The folders below are part of every build: you populate and maintain them as you go, and you never leave them empty or expect me to document your work. If you finish a build and these folders are untouched, the build is not finished.

- **`skills/`** — the "how we do things here" files. Follow what is in there (start with `architecture-skill.md`), and write a new skill whenever a repeatable pattern proves itself and is not yet written down.
- **`sync/`** — the build record. `sync/build.md` says what is built, what is in progress, and exactly where the work stops. Read it before you start anything; update it as you work and when you finish. This is how a new agent picks up the project without re-reading everything.
- **`debug/`** — every error you hit and fix gets logged in `debug/errors-log.md` with the cause and the fix, newest first. If you fixed it and did not log it, the build is not done.
- **`architect/`** — architecture design specs. When a build changes the structure of the app — new routes, new data flow, components with real scope — write the spec first (or update the existing one), following `skills/architecture-skill.md`, and keep it in step with `sync/build.md`.
- **`documents/`** — documentation of everything done: what was built, how it works, and the decisions behind it. Written by the agent after every page or feature.
- **`design/`** — my design references, one folder per page (`design/home/`, `design/services/`, `design/about/`, `design/contact/`). You build from these exactly; you never design. If a page's folder is empty, stop and ask me for the design.
- **`prompts/`** — two kinds of prompt live here: the implementation prompt you write and get approved before building (section 3), and the page prompt record you write after finishing each page (`prompts/<page>.md`) with the prompt or instructions that page was built from.

The rule, plainly: after building each page, you update `sync/build.md`, write the page's prompt record into `prompts/`, log any errors you hit into `debug/`, document the work in `documents/`, and update `architect/` if the structure changed. Every time. Then you report.

## 8. Tech stack

Decided, in use today:

- Next.js 16 (App Router, Turbopack) on React 19
- TypeScript, strict
- Tailwind CSS v4 (CSS-first configuration)
- shadcn/ui in the **base-nova** style, which sits on `@base-ui/react` — note this is not the classic Radix-based shadcn; read the actual components before assuming patterns
- lucide-react for icons, sonner for toasts, next-themes for theming (installed as part of the component kit)
- pnpm for everything. Do not reach for npm or yarn.

Undecided — decided later, and none of this gets installed now:

- **Auth / login** — when the dashboard stage starts, we pick the provider together. Clerk is the frontrunner in my head, but nothing is signed.
- **Dashboard stack** — same deal; we decide when stage two opens.
- **Contact form delivery** — the form posts to a server route; where submissions land (an email provider or something else) is a decision for that build, not now.
- **3D assets** — the site is 3D-heavy, but the 3D comes from the designs and assets I provide. If a build genuinely needs a 3D library, that is a conversation, not a default install.

Rule of thumb: use freely whatever is already in `package.json`. Anything new goes in the prompt and gets my approval first.

## 9. Decisions already made

These are my calls. Build to them; argue only if something is actually broken:

- UI comes from me, always. Never design, never restyle, never "improve" a design.
- Public browsing. Nothing on the web interface is gated. There is no auth yet, and none is to be added in stage one.
- Contact form: client-side validation plus a server route, and the route is a stub until delivery is decided.
- Keep pages lean and read-mostly. No heavy client libraries for things a server component can do.
- Stage discipline: build only the open stage. The dashboard, auth, and showcase are closed.
- The project folders (section 7) are maintained by you, on every build. Not by me.
- This file is mine. If you think a decision here needs to change, raise it in the report — do not edit the file to match your code.

## 10. What comes later (closed — do not build)

- **The dashboard** — where I watch activity and connect agents. It will monitor the web interface's activity (contact submissions, page behavior) and manage agent connections. Its stack, layout, and auth are decided when we start it.
- **Auth / login** — arrives with the dashboard. Browsing stays public; the dashboard is what gets gated.
- **The agent showcase** — a public section displaying agents. Not now, and maybe not ever as currently imagined.

When a stage opens, I update this file and we go through the normal loop.

## 11. Things that will trip you up

- **Next.js 16 is newer than your training data.** APIs, conventions, and file structure may all differ. Read the docs in `node_modules/next/dist/docs/` before writing code — `AGENTS.md` hammers this too.
- **Tailwind v4 configures itself in CSS.** There is no `tailwind.config.js`. Theme tokens and custom variants live in `globals.css` under `@theme`. Do not go hunting for a config file that does not exist.
- **shadcn here is the base-nova style on `@base-ui/react`**, not Radix. Component APIs differ — for example, `Button` wraps `@base-ui/react/button`. Read `src/components/ui/*` before using them.
- **React 19.** Some old patterns are obsolete. Follow the current docs.
- **TypeScript is strict and the build type-checks.** Fix type errors; do not silence them.
- **`pnpm-workspace.yaml` exists but is not a monorepo setup** — it only carries build allowlist entries from the scaffold. Do not assume a workspace layout, and do not delete files you do not understand.
- **Secrets.** Never put a token or key in client code, and never commit real secrets. `.env.example` is committed; `.env` is not.
- **The contact form does not send yet.** Do not pretend it does. The server route is a stub until I decide the provider.
- **The paperwork folders are mandatory.** An untouched `sync/build.md` or a page with no prompt record means an unfinished build, no matter how good the code looks.
- **Two instruction files.** `AGENTS.md` (Next.js's regenerated rules) and this one. Read both. This file sets scope; `AGENTS.md` sets Next.js ground rules.

## 12. Checks to run

Run these and report the real output. Never claim a check passed without running it.

- Type check: `pnpm exec tsc --noEmit`
- Lint: `pnpm lint`
- Build: `pnpm build` whenever routes, config, or server code change
- Dev server: `pnpm dev`, for manually verifying the pages you touched

## 13. When in doubt

Keep it small. Read the code. Ask me one question. Do not overbuild, do not redesign, do not install dependencies, do not open closed stages. If a design implies something I did not describe, flag it in the prompt. If something in this file is stale, tell me — and let me change it.



<!-- END:nextjs-agent-rules -->
