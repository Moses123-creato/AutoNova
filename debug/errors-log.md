# Error log

Newest first. One entry per error. The building agent appends to this file and never deletes entries.

```
## Date — short area label
Error: what failed and the error message (paste it).
Cause: why it happened.
Fix: exactly what solved it.
Status: fixed (or worked around).
```

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