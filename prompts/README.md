# prompts

Every prompt this project builds from lives here, in two kinds:

1. **Implementation prompts** — written before a build, per `agent.md` (How to work): the goal, the skills read, the code inspected, decisions and assumptions, files to touch, requirements, security considerations, acceptance criteria, checks to run, and manual test steps. These get the owner's approval before any code is written.
2. **Page prompt records** — after the agent finishes building a page, it writes `prompts/<page>.md` recording the prompt or instructions that page was built from. This is the receipt of how the page came to be.

Rules for the building agent:
- Before building: write the implementation prompt here and get the owner's approval.
- After building: create the page record (e.g. `prompts/home.md`) with the prompt or instructions used to build that page.
- Never leave a page without its prompt record. If you built it, you documented the prompt for it — the owner does not do this for you.