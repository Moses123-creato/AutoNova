# Architecture skill — how we design and record architecture

Goal: keep the architecture of the web system written down, current, and reviewable, so anyone (or any agent) can see where the system is and where it is going.

## When to use

- Before building any page or feature that changes the structure of the app (new routes, new data flow, components with real scope, new integrations).
- When a stage opens or closes.
- When you update `sync/build.md` and realize the architecture changed under you.

## The steps

1. Read `agent.md` first, then the current specs in `architect/`. Know what is already decided.
2. Read the actual code — routes, components, config. Never design from memory.
3. Design the smallest architecture that does the job. Prefer what already exists.
4. Respect the standing rules: server components by default, writes go through server routes, secrets stay server-side, no new dependencies without approval (`agent.md`, decisions).
5. Write the spec into `architect/` as a new file, or update the existing one if this is a revision. Follow the spec format in `architect/README.md`.
6. Update `sync/build.md` so the build record matches the new architecture.
7. Keep it short. A spec that takes more than a page to explain is probably overbuilt.

## What a spec must contain

- The context: what changed and why.
- The structure: routes, components, data flow — names and responsibilities.
- Boundaries: what is server, what is client, what writes vs what reads.
- What this replaces or revises (name or link the previous spec).
- Open questions, if any. Keep them few.