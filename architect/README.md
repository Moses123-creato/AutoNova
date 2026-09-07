# architect

The architecture of the web system lives here as design specs: where the system is, where it is going, and the decisions that got it there.

Rules for the building agent:
- Before a build that changes the structure of the app (new routes, new data flow, components with real scope, new integrations), write or update an architecture spec here first, following `skills/architecture-skill.md`.
- Each spec covers: context, structure (routes, components, data flow), the server/client boundaries, what it replaces or revises, and open questions.
- One spec per subject or stage. Name files clearly, e.g. `web-interface-stage-one.md`.
- When the architecture changes, update the spec and `sync/build.md` together — they must never disagree.
- The owner does not maintain this folder. The agent does.