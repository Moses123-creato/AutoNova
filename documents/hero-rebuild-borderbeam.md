# Documentation — Hero Rebuild & BorderBeam Integration

## Summary

Rebuilt the entire homepage Hero section and Navbar to match the user's uploaded video reference, integrated the `border-beam` package from Libraries.dev, recreated the vertical lighting design with background video (`/lightning-beam.mp4`), and added liquid metal chrome effects across the lightning pillar and the navbar.

## Architecture & Components

1. **`border-beam` integration**:
   - Installed `border-beam` npm package.
   - Wrapped the floating navbar with `<BorderBeam size="md" colorVariant="ocean" strength={0.85} theme="dark" borderRadius={9999}>`.
   - Wrapped the primary CTA button with `<BorderBeam size="sm" colorVariant="sunset" strength={0.85} theme="dark" borderRadius={9999}>`.
   - Wrapped the interactive dock card with `<BorderBeam size="md" colorVariant="colorful" strength={0.75} theme="dark" borderRadius={20}>`.

2. **Recreated Lighting Design & Liquid Metal**:
   - Generated high-resolution asset and encoded a seamless 60fps MP4 video loop (`/lightning-beam.mp4`) with poster fallback (`/lightning-beam.jpg`).
   - Layered a vertical lightning beam with a liquid metal chrome distortion wave (`animate-liquid-flow`) and liquid mercury ripples (`animate-pulse`).
   - SVG liquid refraction filter (`#liquid-refraction`) providing physics-based optical distortion.

3. **Hero Content & Typography**:
   - Title: "Everything App for your teams" in high-contrast display typography.
   - Subtitle: "Autonova, an open-source autonomous platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion."
   - Action: "SEE IN ACTION →" button with warm sunset glow.

4. **Interactive App Dock**:
   - Matches the dock shown in the video at 00:09–00:13.
   - Live switchable tabs: Tracker, Issues, Inbox.
   - Issues filter: All, Backlog, To Do, In Progress, Done.
   - Interactive task cards with toggleable completion states and priority badges.
   - Live sync indicator with audio wave status.
