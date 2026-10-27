# SwipeHero

1. Copy `SwipeHero.jsx` + `SwipeHero.css` into your components folder.
2. Copy `public/hand-blue.png` + `public/icon.svg` into your site's `public/` folder.
3. Use it inside your section:

```jsx
import SwipeHero from "./SwipeHero";

<SwipeHero height={720} scrollPerService={420} />
```

Props: `height` (px, fixed box height), `scrollPerService` (px of scroll per swipe),
`handSrc`, `iconSrc` (asset URLs, default `/hand-blue.png` and `/icon.svg`), `services` (string array).

Next.js App Router: add `"use client";` as the first line of `SwipeHero.jsx`.
No dependencies beyond React. Scroll-pinned: the section stays fixed while you scroll through the services.
