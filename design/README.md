# design

The design references live here. The owner drops in the desktop design images for each page, and the building agent uses them as the source of truth to build the page exactly — no inventing, no restyling.

Organization — each page has its own folder:
- `design/home/` — Home page references
- `design/services/` — Services page references
- `design/about/` — About page references
- `design/contact/` — Let's Talk / contact page references

Rules for the building agent:
- Each page has its own folder; keep every image or visual reference for that page in it.
- Before building a page, check that its design folder has what you need. If it is empty, stop and ask the owner for the design — do not design it yourself (`agent.md`, UI work).
- If a reference is unclear or conflicts with another, ask. Do not guess.
- Organize as you go: if a new page appears later, create its folder.