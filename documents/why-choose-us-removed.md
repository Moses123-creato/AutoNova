# Why Choose Us — removed from the homepage

## What happened

At the owner's request the Why Choose Us section was taken out of the homepage. It was not liked
and the whole section is being rebuilt.

## What changed

`src/app/page.tsx` only:

- Removed `import { WhyChooseUs } from "@/components/why-choose-us";`
- Removed `<WhyChooseUs />` from `<main>`

That was the whole change. The section was the last element in `<main>`, so nothing else moved —
the homepage is now `Navbar` + `Hero` and simply ends after the hero.

Verified after the change: the served HTML contains no `why-choose-us` markup, and the page
payload dropped from 176,874 to 133,799 bytes.

## What was deliberately NOT done

`src/components/why-choose-us.tsx` was **left on disk**. It is no longer imported by any route,
so it ships nothing, but the owner is rebuilding this section and may want the existing structure
as a starting point. Deleting it is a one-line job whenever it is wanted.

## To rebuild it

The section needs a design before code. Per `agent.md`, UI comes from the owner — reference images
plus a short prompt. Until that exists there is nothing to implement.

When the design arrives the new section gets its own component under `src/components/` and is
added back into `<main>` in `src/app/page.tsx`.

## Anchors that no longer resolve

The removed markup carried `id="why-choose-us"` and `id="why-choose-us-title"`. Nothing in the
project links to them, but if any anchor is added later, do not assume these ids still exist.