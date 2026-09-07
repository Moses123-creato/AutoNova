# sync

This folder keeps the build record of the project: what has been built, what is being built right now, and exactly where the work stops. The file that matters is `build.md`.

Why this exists: if the owner hands the project to a new agent, that agent reads `agent.md`, then `sync/build.md`, and instantly knows the state of the project without re-reading the whole codebase.

Rules for the building agent:
- Read `sync/build.md` before you start any task.
- Update it as you work: mark what you are starting (in progress), and when you finish, mark it done and note what remains.
- The "where the work stops" section is the handoff point. Keep it accurate at all times.
- Never finish a build with `sync/build.md` untouched. An untouched build record means an unfinished build.
- This is a living file. Keep entries short and factual.