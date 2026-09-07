# debug

Every error this project hits gets written down here, with the fix. The next agent that hits the same wall reads the log first instead of re-fighting it.

Rules:
- Every error you hit and fix gets an entry. No exceptions, however small.
- One entry per error, in `errors-log.md`. Newest at the top.
- Keep the format: what broke, what it looked like, what fixed it, and the date.
- If you fixed something and did not log it, the build is not finished. Log first, then report.
- Do not delete entries. The history is part of the value.